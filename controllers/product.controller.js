"use strict"

const service = require('@services/product.service')

const getAll = async (req, res) => {
  const data = await service.getAll()
  res.send(data).status(data.statusCode)
}

const getDetail = async (req, res) => {
  const data = await service.getDetail(req)
  res.send(data).status(data.statusCode)
}

const store = async (req, res) => {
  const data = await service.store(req)
  res.send(data).status(data.statusCode)
}

const update = async (req, res) => {
  const data = await service.update(req)
  res.send(data).status(data.statusCode)
}

const remove = async (req, res) => {
  const data = await service.remove(req)
  res.send(data).status(data.statusCode)
}

module.exports = {
  getAll,
  getDetail,
  store,
  update,
  remove
}