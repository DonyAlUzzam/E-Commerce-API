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
const Cart = use('App/Models/Cart')
const User = use('App/Models/User');

const Factory = use('Factory')

class DummySeeder {
  async run () {
    const prod1 = new Product();
    prod1.name = 'Runshake Soes';
    prod1.image = '121.jpg';
    prod1.price = 200000;
    prod1.details = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
    await prod1.save();

    const prod2 = new Product();
    prod2.name = 'Salvo Shoes';
    prod2.image = 'kasual.jpg';
    prod2.price = 150000;
    prod2.details = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
    await prod2.save();

    const prod3 = new Product();
    prod3.name = 'Faster Shoes';
    prod3.image = 'sepatuFaster.jpg';
    prod3.price = 160000;
    prod3.details = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
    await prod3.save();

    const prod4 = new Product();
    prod4.name = 'Shoes Pan SOS';
    prod4.image = 'sepatuJG.jpg';
    prod4.price = 170000;
    prod4.details = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
    await prod4.save();

    const prod5 = new Product();
    prod5.name = 'Sepatu Karma';
    prod5.image = 'slip.jpg';
    prod5.price = 120000;
    prod5.details = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
    await prod5.save();

    const prod6 = new Product();
    prod6.name = 'Puman Shoes';
    prod6.image = 'sneaker.jpg';
    prod6.price = 120000;
    prod6.details = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
    await prod6.save();
    
    const user1 = new User();
    user1.username = 'Dony';
    user1.email = 'mkhairiusman@gmail.com';
    user1.password = 'doni123';
    await user1.save();

    const cartuser1 = new Cart();
    cartuser1.product_id = prod1.id;
    cartuser1.user_id = user1.id;
    cartuser1.qty = 3;
    cartuser1.price = cartuser1.qty * prod1.price;
    await cartuser1.save();

  }
}

module.exports = DummySeeder
