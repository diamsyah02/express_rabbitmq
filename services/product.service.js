"use strict"

const rabbit_sender = require('@rabbits/sender')
const response = require('@helpers/WebResponse')
const repo = require('@repositories/product.repository')

const getAll = async () => {
  const data = await repo.getAll()
  if(data == undefined) {
    return response(500, `Opss.. something's wrong with your database`, [])
  } else {
    if(typeof data === 'object') {
     /**
      * kirim message ke sender
      * parameter pertama sebagai exchange name
      * parameter kedua sebagai pesan yang akan dikirim
      */
      rabbit_sender.send('Product', JSON.stringify({msg: `Get all data pegawai`, action: `Get All`}))
      return response(200, 'Get data pegawai successfully', data)
    } else  {
      return response(500, data, [])
    }
  }
}

const getDetail = async (req) => {
  const data = await repo.getDetail(req)
  if(data == undefined) {
    return response(500, `Opss.. something's wrong with your database`, [])
  } else {
    if(typeof data === 'object') {
      /**
      * kirim message ke sender
      * parameter pertama sebagai exchange name
      * parameter kedua sebagai pesan yang akan dikirim
      */
      rabbit_sender.send('Product', JSON.stringify({msg: `Get data pegawai id = ${req.params.id}`, action: `Get Detail`}))
      return response(200, `Get data pegawai with id = ${req.params.id} successfully`, data[0])
    } else  {
      return response(500, data, [])
    }
  }
}

const store = async (req) => {
  const data = await repo.store(req)
  if(data == undefined) {
    return response(500, `Opss.. something's wrong with your database`, [])
  } else {
    if(typeof data === 'object') {
      /**
      * kirim message ke sender
      * parameter pertama sebagai exchange name
      * parameter kedua sebagai pesan yang akan dikirim
      */
      rabbit_sender.send('Product', JSON.stringify({msg: `Insert data pegawai`, action: `Insert`}))
      return response(200, 'Insert data pegawai successfully', data)
    } else  {
      return response(500, data, [])
    }
  }
}

const update = async (req) => {
  const data = await repo.update(req)
  if(data == undefined) {
    return response(500, `Opss.. something's wrong with your database`, [])
  } else {
    if(typeof data === 'string') {
      return response(500, data, [])
    } else  {
      /**
      * kirim message ke sender
      * parameter pertama sebagai exchange name
      * parameter kedua sebagai pesan yang akan dikirim
      */
      rabbit_sender.send('Product', JSON.stringify({msg: `Update data pegawai id = ${req.params.id}`, action: `Update`}))
      return response(200, `Update data pegawai with id = ${req.params.id}`, data)
    }
  }
}

const remove = async (req) => {
  const data = await repo.remove(req)
  if(data == undefined) {
    return response(500, `Opss.. something's wrong with your database`, [])
  } else {
    if(typeof data === 'string') {
      return response(500, data, [])
    } else  {
      /**
      * kirim message ke sender
      * parameter pertama sebagai exchange name
      * parameter kedua sebagai pesan yang akan dikirim
      */
      rabbit_sender.send('Product', JSON.stringify({msg: `Delete data pegawai id = ${req.params.id}`, action: `Delete`}))
      return response(200, `Delete data pegawai with id = ${req.params.id}`, data)
    }
  }
}

module.exports = {
  getAll,
  getDetail,
  store,
  update,
  remove
}