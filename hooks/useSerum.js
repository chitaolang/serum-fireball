import { useContext } from 'react';
import { SerumContext } from '../context/SerumContext';

export default function useSerum() {
  const context = useContext(SerumContext);
  if (!context) {
    throw new Error('Missing serum context');
  }
  const {
    market
  } = context;

  return {
    market
  };
}