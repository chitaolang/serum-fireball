import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

export default function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('Missing global context');
  }
  const {
    tokenList,
    tokenAccounts,
    setTokenAccounts,
  } = context;

  return {
    tokenList,
    tokenAccounts,
    setTokenAccounts,
  };
}