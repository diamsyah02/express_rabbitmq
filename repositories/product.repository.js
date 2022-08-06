"use strict"

const db = require('@configs/db')
const table = 'product'

const getAll = async () => {
  try {
    return await db.select().table(table)
  } catch(e) {
    return e.sqlMessage
  }
}

const getDetail = async (req) => {
  const { id } = req.params
  try {
    return await db(table).where('id', id)
  } catch(e) {
    return e.sqlMessage
  }
}

const store = async (req) => {
  try {
    return await db(table).insert(req.body)
  } catch(e) {
    return e.sqlMessage
  }
}

const update = async (req) => {
  const { id } = req.params
  try {
    return await db(table).where('id', id).update(req.body)
  } catch(e) {
    return e.sqlMessage
  }
}

const remove = async (req) => {
  const { id } = req.params
  try {
    return await db(table).where('id', id).del()
  } catch(e) {
    return e.sqlMessage
  }
}

module.exports = {
  getAll,
  getDetail,
  store,
  update,
  remove
}