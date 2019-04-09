'use strict'

/*
|--------------------------------------------------------------------------
| DummySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Product = use('App/Models/Product');
const Order = use('App/Models/Order');
const User = use('App/Models/User');

const Factory = use('Factory')

class DummySeeder {
  async run () {
    const prod1 = new Product();
    prod1.name = 'Runshake Soes';
    prod1.img = '121.jpg';
    prod1.price = 200000;
    prod1.details = 'lorem ipsum';
    await prod1.save();

    const prod2 = new Product();
    prod2.name = 'Salvo Shoes';
    prod2.img = 'kasual.jpg';
    prod2.price = 150000;
    prod2.details = 'lorem ipsum';
    await prod2.save();

    const prod3 = new Product();
    prod3.name = 'Faster Shoes';
    prod3.img = 'sepatuFaster.jpg';
    prod3.price = 160000;
    prod3.details = 'lorem ipsum';
    await prod3.save();

    const prod4 = new Product();
    prod4.name = 'Shoes Pan SOS';
    prod4.img = 'sepatuJG.jpg';
    prod4.price = 170000;
    prod4.details = 'lorem ipsum';
    await prod4.save();

    const prod5 = new Product();
    prod5.name = 'Sepatu Karma';
    prod5.img = 'slip.jpg';
    prod5.price = 120000;
    prod5.details = 'lorem ipsum';
    await prod5.save();

    const prod6 = new Product();
    prod6.name = 'Puman Shoes';
    prod6.img = 'sneaker.jpg';
    prod6.price = 120000;
    prod6.details = 'lorem ipsum';
    await prod6.save();
    
    const user1 = new User();
    user1.username = 'Dony';
    user1.email = 'mkhairiusman@gmail.com';
    user1.password = 'doni123';
    await user1.save();

    const order1 = new Order();
    order1.product_id = prod1.id;
    order1.user_id = user1.id;
    order1.qty = 3;
    await order1.save();

  }
}

module.exports = DummySeeder