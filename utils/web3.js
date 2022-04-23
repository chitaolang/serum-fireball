import { PublicKey } from "@solana/web3.js";
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

        const ownerPublicKey = new PublicKey(owner);
        const mintPublicKey = new PublicKey(mint);
        const ATA = (await getAssociatedTokenAddress(ownerPublicKey, mintPublicKey)).toString();
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