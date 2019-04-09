'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
    Product(){
        return this.belongsTo('App/Models/Product')
    }
}

module.exports = Order
