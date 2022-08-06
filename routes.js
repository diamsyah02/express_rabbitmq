"use strict"

const response = require('@helpers/WebResponse')
const controller = require('@controllers/product.controller')

const routes = async function (app) {
    await app.route('/').get(function (req, res) {
        res.status(200).send(response(200, 'Clean architecture express js', null))
    });

    await app.route('/product').get(controller.getAll)
    await app.route('/product/:id').get(controller.getDetail)
    await app.route('/product').post(controller.store)
    await app.route('/product/:id').post(controller.update)
    await app.route('/product-delete/:id').get(controller.remove)
}

module.exports = routes