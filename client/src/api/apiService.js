import axios from 'axios';

const API_URL = 'http://localhost:3001/api/transaction';

async function insertTransaction(transaction) {
  const response = await axios.post(API_URL, transaction);
  return response.data.id;
}
async function updateTransaction(transaction) {
  const response = await axios.patch(API_URL, transaction);
  return response.data;
}
async function deleteTransaction(id) {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}
export {
  insertTransaction,
  updateTransaction,
  deleteTransaction,
};