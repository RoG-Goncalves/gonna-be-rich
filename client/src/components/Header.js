import React, { Component } from 'react'

export default class Header extends Component {
  //---------------------------------------------------
  handleFilterChange = (event) => {
    this.props.onChangeFilter(event.target.value);
  };
  //---------------------------------------------------
  totalIncomes = (transactions) => {
    const filteringTransactions = transactions.filter(transaction => transaction.type === '+')
    const incomesSum = filteringTransactions.reduce((acc, curr) => {
      return acc + curr.value
    }, 0
    );
    return incomesSum
  }
  //---------------------------------------------------
  totalOutcomes = (transactions) => {
    const filteringTransactions = transactions.filter(transaction => transaction.type === '-')
    const outcomesSum = filteringTransactions.reduce((acc, curr) => {
      return acc + curr.value
    }, 0
    );
    return outcomesSum
  }
  //---------------------------------------------------
  render() {
    const { filter, transactionCount, transactions } = this.props;
    const totalIncomes = this.totalIncomes(transactions);
    const totalOutcomes = this.totalOutcomes(transactions)
    const remaining = totalIncomes - totalOutcomes
    return (
      <div>
        <div> <span>Total de Transações: {transactionCount}</span></div>
        <div><span>Receitas: R$ {totalIncomes}</span></div>
        <div><span>Despesas: R$ {totalOutcomes}</span></div>
        <div><span>Saldo: R$ {remaining}</span></div>
        <input type="month" id="date"></input>
        <input
          type="text"
          onChange={this.handleFilterChange}
          value={filter}
        >
        </input>
      </div>
    )
  }
}
