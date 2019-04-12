'use strict'
const Cart =use('App/Models/Cart')
const Product = use('App/Models/Product')
const { validate } = use('Validator')

class CartController {
    async index ({ request, response, view, auth }){
        // const getUser = await auth.getUser();
        const cart = await Cart.query()
            // .with('user')
            .with('product')
            .where('user_id', 1)
            .fetch();

            const totalCart = await Cart.query()
            .where('user_id', 1)
            .sum('price as total');

        return response.json({ status: 1, data: cart, total: totalCart[0].total });
    }

    async store({request, auth, response}){
        // const getUser = await auth.getUser();
        const rules = {
            product_id: 'required',
            qty: 'required'
        };

        const validation = await validate(request.all(), rules);
        if (validation.fails()){
            return response
                .status(400).json({ status: 0, message: validation.messages() });
        }

        const product_id = request.input('product_id');
        const user_id = 1;
        const qty = request.input('qty');

        const checkCart = await Cart.query()
        .where('product_id', product_id)
        .where('user_id', user_id)
        .fetch();
        const dataProduct = await Product.find(product_id);
        if(checkCart.rows.length === 0){
            const cart = new Cart();
            cart.product_id = product_id;
            cart.user_id = user_id;
            cart.qty = qty;
            cart.price = dataProduct.price * qty;

        await cart.save();
        return response.json({
            status: 1,
            condition: 'added to new cart',
            data: cart
        });
        } else{
            const cart = await Cart.find(checkCart.rows[0].id);
            cart.qty = cart.qty + qty;
            cart.price= dataProduct.price * cart.qty;
            await cart.save();
            return response.json({
                status: 1,
                condition: 'added quantity',
                data: cart
            });
        }
    }

    async update({ params, request, auth, response }){
        const rules = {
            qty: 'required|number'
        };
        const validation = await validate(request.all(), rules);
        if(validation.fails()){
            return response
            .status(400).json({ status: 0, message: validation.messages() });
        }

        const cart = await Cart.find(params.id);
        const dataProduct = await Product.find(cart.product_id);

        cart.qty = request.input('qty');
        if(cart.qty < 1) {
            qty=1;
            cart.price = dataProduct.price * qty;
            await cart.save();
        } else {
        cart.price = dataProduct.price * cart.qty;
        await cart.save();
        }

        // const getUser = await auth.getUser();
        const cartReturn = await Cart.query()
        .where('id', cart.id)
        .with('user')
        .with('product')
        .where('user_id', 1)
        .fetch();

        const totalCart = await Cart.query()
        .where('user_id', 1)
        .sum('price as total');

        return response.json({
            status: 1,
            data : cartReturn.rows[0],
            total: totalCart[0].total
        });
    }

    async destroy({ params, request, response }){
        const cart = await Cart.find(params.id);
        const oldCart =cart;
        if(!cart) return response.status(404).json({ status: 0 });

        await cart.delete();
        return response.status(200).json({
            status: 1,
            data: oldCart
        });
    }
}

module.exports = CartController
