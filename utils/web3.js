import { PublicKey, Transaction } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from "@solana/spl-token";
import { abbreviate } from ".";

export const WSOL_MINT_ADDRESS = new PublicKey(
  'So11111111111111111111111111111111111111112'
);
export const getSolanaTokenList = () => {
  return fetch('https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json')
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      return data.tokens;
    });
}

export const getTokenAccounts = async (conn, publicKey) => {
  const tokenList = await getSolanaTokenList();
  const accountInfo = await conn.getAccountInfo(publicKey);
  let lamports = null
  if (accountInfo) {
    lamports = accountInfo.lamports;
  }

  const tokenAccounts = await conn
    .getParsedTokenAccountsByOwner(
      publicKey,
      {
        programId: TOKEN_PROGRAM_ID
      },
      'confirmed'
    ).then(async (parsedTokenAccounts) => {
      const { value } = parsedTokenAccounts;
      const tokenAccounts = [];
      if (lamports) {
        const solAmount = lamports / Math.pow(10, 9);
        tokenAccounts.push({
          label: `SOL (${solAmount})`,
          name: "SOL",
          symbol: "SOL",
          mint: publicKey.toString(),
          meta: publicKey.toString(),
          decimals: 9,
          owner: publicKey.toString(),
          amount: lamports / Math.pow(10, 9),
          associated: true,
        });
      }
      for (const token of value) {
        const {
          account: {
            data: {
              parsed: {
                info: {
                  mint,
                  owner,
                  tokenAmount: {
                    uiAmount,
                    decimals
                  }
                }
              }
            }
          },
          pubkey
        } = token;

        const mintPublicKey = new PublicKey(owner);
        const ATA = (await getAssociatedTokenAddress(publicKey, mintPublicKey)).toString();
        const meta = pubkey.toString()

        const tokenAccountInList = tokenList.find(token => token.address === mint);

        if (tokenAccountInList) {
          const {
            name,
            symbol,
          } = tokenAccountInList;
          tokenAccounts.push({
            label: name + ` (${uiAmount})`,
            name,
            symbol,
            mint,
            meta,
            decimals,
            owner,
            amount: uiAmount,
            associated: meta === ATA
          });
        } else {
          tokenAccounts.push({
            label: abbreviate(mint) + ` (${uiAmount})`,
            name: abbreviate(mint),
            symbol: abbreviate(mint),
            mint,
            meta,
            decimals,
            owner,
            amount: uiAmount,
            associated: meta === ATA
          });

        }
      }
      return tokenAccounts
    });


  return tokenAccounts;
};

export const optimallySizeTricks = async (conn, feePayer, txs) => {
  const attemptedTx = {
    transaction: new Transaction(),
    signers: [],
  };
  txs.forEach((b) => {
    attemptedTx.transaction.add(b.transaction);
    attemptedTx.signers.push(...b.signers)
  });
  attemptedTx.transaction.recentBlockhash = (await conn.getRecentBlockhash())
    .blockhash;
  attemptedTx.transaction.feePayer = feePayer;

  try {
    const buf = attemptedTx.transaction.serialize({
      verifySignatures: false,
    });
    return [attemptedTx];
  } catch (e) {
    const middle = Math.ceil(txs.length / 2);
    const left = txs.splice(0, middle);
    const right = txs.splice(-middle);
    return [
      ...(await optimallySizeTricks(conn, feePayer, left)),
      ...(await optimallySizeTricks(conn, feePayer, right)),
    ];
  }
}

export async function sendSignedTransaction({
  connection,
  signedTransaction,
}) {
  const rawTransaction = signedTransaction.serialize();
  const txid = await connection.sendRawTransaction(
    rawTransaction,
    {
      skipPreflight: true,
    },
  );

  return txid;
}

export async function signAndSendTransaction({
  connection,
  wallet,
  transaction,
  signers,
  skipPreflight = false,
}) {
  const tx = new Transaction();
  tx.add(transaction);
  tx.recentBlockhash = (
    await connection.getRecentBlockhash('max')
  ).blockhash;

  console.log(signers)
  tx.setSigners(
    // fee payed by the wallet owner
    wallet.publicKey,
    ...signers.map((s) => s.publicKey),
  );

  if (signers.length > 0) {
    tx.partialSign(...signers);
  }

  const signedTx = await wallet.signTransaction(tx);
  const rawTransaction = signedTx.serialize();
  return await connection.sendRawTransaction(rawTransaction, {
    skipPreflight,
    preflightCommitment: 'single',
  });
};

export async function signAndSendTransactions({
  connection,
  wallet,
  feepayer,
  transactions,
}) {
  const unsignedTxns = [];
  const block = await connection.getRecentBlockhash('max');

  const optTx = await optimallySizeTricks(connection, feepayer.publicKey, transactions);
  for (let i = 0; i < optTx.length; i++) {
    const tx = optTx[i].transaction
    const signers = optTx[i].signers;
    tx.recentBlockhash = block.blockhash;
    tx.setSigners(
      // fee payed by the wallet owner
      feepayer.publicKey,
      ...signers.map(s => s.publicKey),
    );

    if (signers.length > 0) {
      tx.partialSign(...signers);
    }
    unsignedTxns.push(tx);
  }

  const isBlocto = window.solana?.isBlocto;
  if (isBlocto) {
    if (unsignedTxns.length > 1) {
      throw Error('Blocto wallet doesnt support sign mulitple at once!')
    }

    const signedTx = await wallet.sendTransaction(
      unsignedTxns[0],
      connection,
    )

    return [signedTx]
  }

  const signedTxns = await wallet.signAllTransactions(unsignedTxns);
  const txIds = [];
  for (const signedTxn of signedTxns) {
    try {
      const txId = await sendSignedTransaction({
        connection,
        signedTransaction: signedTxn,
      });
      txIds.push(txId);
    } catch (e) {
      throw Error(e);
    }
  }

  return txIds;
};