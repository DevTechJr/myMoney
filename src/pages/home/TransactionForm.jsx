import React from "react";
import { useState } from "react";
import styles from "./Home.module.css";
import { useFireStore } from "../../hooks/useFirestore";
import { useEffect } from "react";

export default function TransactionForm({ uid }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { addDocument, response } = useFireStore("transactions");
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Transaction Reason + Cost : ${name} - $${amount}`);
    addDocument({ uid, name, amount });
    alert("Transaction request sent to database.");
  };

  useEffect(() => {
    if (response.success) {
      setName("");
      setAmount("");
    }
  }, [response.success]);
  return (
    <>
      <h3 className={styles.textcenter}>Add A Transaction :</h3>
      <form onSubmit={handleSubmit}>
        {/* Next entry */}
        <label>
          <span>Transaction Name :</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        {/* Next entry */}
        <label>
          <span>Transaction Amount :</span>
          <input
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        <button>Add Transaction</button>
      </form>
    </>
  );
}
