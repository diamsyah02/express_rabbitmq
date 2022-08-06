"use strict"

const db = require('@configs/db')
const table = 'log'

const store = async (param) => {
    try {
        return await db(table).insert(param)
    } catch (e) {
        return e.sqlMessage
    }
}

module.exports = { store }