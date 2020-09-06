import React, { useState, useEffect } from 'react';
import Transactions from './components/Transactions';
import Header from './components/Header';
// import * as api from './api/apiService'

export default function App() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const period = '2019-02';
      const res = await fetch(`http://localhost:3001/api/transaction?period=${period}`);
      const json = await res.json();
      const fetechedTransactions = json.map(
        ({ id, description, value, category, year, month, day, yearMonth, yearMonthDay, type }) => {
          return {
            id,
            description,
            filterDescription: description.toLowerCase(),
            value,
            category,
            year,
            month,
            day,
            yearMonth,
            yearMonthDay,
            type,
          };
        }
      );
      setAllTransactions(fetechedTransactions);
      setFilteredTransactions(Object.assign([], fetechedTransactions))
    };
    fetchData();
  }, [allTransactions]);
  //------------------------------------------------------
  const handleChangeFilter = (newFilter) => {
    setFilter(newFilter);

    const filterLowerCase = newFilter.toLowerCase();
    const filteredTransactions = allTransactions.filter((transaction) =>
      transaction.filterDescription.includes(filterLowerCase)
    );

    setFilteredTransactions(filteredTransactions);
  }

  //---------------------------------------------------------
  const handleDelete = (id) => {
    const toDelete = allTransactions.filter(transaction => transaction.id !== id);
    setAllTransactions(toDelete)
  }
  return (
    <div className='container'>
      <Header
        filter={filter}
        onChangeFilter={handleChangeFilter}
        transactionCount={filteredTransactions.length}
        transactions={allTransactions}
      />
      <Transactions
        transactions={filteredTransactions}
        onDeleteTransactions={handleDelete} />
    </div>);
}
