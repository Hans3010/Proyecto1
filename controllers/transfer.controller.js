const { response } = require('express');
const Transfer = require('../models/transfer.model');
const User = require('../models/user.model');

exports.createTransfer = async (req, res = response) => {
  try {
    const { amount, senderUserId } = req.body;
    //Tuve que borrar el accounNumber porque me daba un error que no pude solucionar.
    //Aparte el userR me detecta un id random y no se por que no suma la cantidad enviada pero si se resta del que envio.
    const userR = await User.findOne({
      where: {
        status: true,
      },
    });
    const recieverUserId = userR.id;
    const userT = await User.findOne({
      where: {
        status: true,
        id: senderUserId,
      },
    });
    if (amount > userT.amount) {
      return res.status(400).json({
        status: 'error',
        message: 'You do not have the amount to transfer',
      });
    }
    if (recieverUserId === senderUserId) {
      return res.status(400).json({
        status: 'error',
        message: 'You can not send money to your own account',
      });
    }
    const newAmountUserT = userT.amount - amount;
    const newAmountUserR = userR.amount + amount;
    await userT.update({ amount: newAmountUserT });
    await userR.update({ amount: newAmountUserR });
    const newTransfer = await Transfer.create({
      recieverUserId,
      senderUserId,
      amount,
    });
    res.status(201).json({
      status: 'success',
      message: 'The transfer was created sucessfully',
      newTransfer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
