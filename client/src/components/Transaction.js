import React from 'react'
import * as api from '../api/apiService'

export default function Transaction({ transaction, onDelete }) {
  const handleEditClick = (event) => {
    if (event.target.matches('#deleteButton')) return;
    console.log('EDIT');
  }
  const handleDeleteClick = async () => {
    const { id } = transaction
    const response = await api.deleteTransaction(id)
    onDelete(id)
    console.log(response);
  }

  const { id, description, value, category, year, month, day, yearMonth, yearMonthDay, type } = transaction
  return (
    <div
      key={id}
      style={type === '+' ? styles.receita : styles.despesa}
      onClick={handleEditClick}>
      <div style={{ margin: '5px', padding: '5px' }}>
        <span>{day} - </span>
        <span>{description} - </span>
        <span>R$ {value}</span>
        <i
          className="material-icons"
          onClick={handleDeleteClick}
          id='deleteButton'
        >delete</i>
        <div> <span>{category}</span></div>
      </div>
      <div style={type === '+' ? styles.greenBar : styles.redBar}></div>
    </div>
  )
}

const styles = {
  receita: {
    textAlign: 'left',
    border: 'solid 1px black',
    margin: '5px'

  },
  despesa: {
    textAlign: 'left',
    border: 'solid 1px black',
    margin: '5px'
  },
  greenBar: {
    backgroundColor: 'green',
    height: '5px'

  },
  redBar: {
    backgroundColor: 'red',
    height: '5px'
  }
};
