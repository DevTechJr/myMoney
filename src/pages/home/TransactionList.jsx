import React from "react";
import styles from "./Home.module.css";
import { useFireStore } from "../../hooks/useFirestore";
export default function TransactionList({ transactions }) {
  const { deleteDocument,response } = useFireStore("transactions");
  return (
    <div>
      <ul className={styles.transactions}>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <p className={styles.name}>{transaction.name}</p>
            <p className={styles.amount}>${transaction.amount}</p>
            <button onClick={() => deleteDocument(transaction.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
