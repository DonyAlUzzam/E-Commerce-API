'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      // table.integer('product_id')
      // .unsigned()
      // .references('id')
      // .inTable('products')
      // .onDelete('CASCADE');
      // table.integer('user_id')
      // .unsigned()
      // .references('id')
      // .inTable('users')
      // .onDelete('CASCADE');
      // table.integer('qty').notNullable()
      // table.double('price');
      table.timestamps()
    })
    // this.alter("orders", table=>{
    //   table.foreign("product_id").references('id').inTable('products').onDelete('CASCADE');
    // })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
