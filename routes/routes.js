const express = require('express');
const TransactionModel = require('../models/TransactionModel.js');

const transactionRouter = express.Router();
//CREATE------------------------------------------------------------------------
transactionRouter.put('/', async (req, res) => {
  const { description, value, category, year, month, day, yearMonth, yearMonthDay, type } = req.body;
  const transaction = new TransactionModel({
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type
  })
  try {
    const data = await transaction.save((err) => {
      if (err) {
        throw err;
      }
      res.status(200).send(data);
    })
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
  }
})
//GET ALL ----------------------------------------------------------------------
// transactionRouter.get('/', async (_req, res) => {
//   try {
//     const transactions = await TransactionModel.find({});
//     res.send(transactions);
//   } catch (error) {
//     res
//       .status(500)
//       .send({ message: error.message || 'Erro ao listar todos os documentos' });
//   }
// });
//GET ALL WITHIN A PERIOD-------------------------------------------------------
transactionRouter.get('/', async (req, res) => {
  try {
    const period = req.query.period
    if (!period) {
      res.status(400).send({ message: 'É necessário informar o período no formato AAAA-MM' })
    }
    const transactions = await TransactionModel.find({ yearMonth: period });
    res.send(transactions);

  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
  }
});
//GET ALL ----------------------------------------------------------------------
// transactionRouter.get('/', async (_req, res) => {
//   try {
//     const transactions = await TransactionModel.find({});
//     res.send(transactions);
//   } catch (error) {
//     res
//       .status(500)
//       .send({ message: error.message || 'Erro ao listar todos os documentos' });
//   }
// });
//UPDATE------------------------------------------------------------------------
transactionRouter.patch('/:id', async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {
    const data = await TransactionModel.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!data) {
      return res.status(400).send(
        'Dados para atualizacao vazio'
      );
    } else {
      res.send(data)
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
  }
})
//DELETE------------------------------------------------------------------------
transactionRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const data = await TransactionModel.findByIdAndRemove({ _id: id });
    if (!data) {
      return res.status(400).send(
        'Dados para atualizacao vazio'
      );
    } else {
      res.send('Registro deletado com sucesso');
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
  }
})
module.exports = transactionRouter;
