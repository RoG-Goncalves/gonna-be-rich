import React from 'react';
import Transaction from './Transaction.js';


export default function Transactions(props) {
  const { transactions, onDelete } = props;


  return (
    <div className='container' >

      {transactions.map((transaction) => {
        return <Transaction
          key={transaction.id}
          transaction={transaction}
          onDelete={props.onDeleteTransactions}
        />;
      })}
    </div>
  )
}

