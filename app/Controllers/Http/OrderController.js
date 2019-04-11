'use strict'

const Order = use('App/Models/Order')
const Product = use('App/Models/Product')
const { validate } = use('Validator')

class OrderController {

    async index ({ request, response, view, auth }){
        // const getUser = await auth.getUser();
        const order = await Order.query()
            // .with('user')
            .with('product')
            .where('user_id', 1)
            .fetch();

            const totalOrder = await Order.query()
            .where('user_id', 1)
            .sum('price as total');

        return response.json({ status: 1, data: order, total: totalOrder[0].total });
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

        const checkOrder = await Order.query()
        .where('product_id', product_id)
        .where('user_id', user_id)
        .fetch();
        const dataProduct = await Product.find(product_id);
        if(checkOrder.rows.length === 0){
            const order = new Order();
            order.product_id = product_id;
            order.user_id = user_id;
            order.qty = qty;
            order.price = dataProduct.price * qty;

        await order.save();
        return response.json({
            status: 1,
            condition: 'added to new cart',
            data: order
        });
        } else{
            const order = await Order.find(checkOrder.rows[0].id);
            order.qty = order.qty + qty;
            order.price= dataProduct.price * order.qty;
            await order.save();
            return response.json({
                status: 1,
                condition: 'added quantity',
                data: order
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

        const order = await Order.find(params.id);
        const dataProduct = await Product.find(order.product_id);

        order.qty = request.input('qty');
        order.price = dataProduct.price * order.qty;
        await order.save();

        const getUser = await auth.getUser();
        const orderReturn = await Order.query()
        .where('id', order.id)
        .with('user')
        .with('product')
        .where('user_id', getUser.id)
        .fetch();

        const totalOrder = await Order.query()
        .where('user_id', getUser.id)
        .sum('price as total');

        return response.json({
            status: 1,
            data : orderReturn.rows[0],
            total: totalOrder[0].total
        });
    }

    async destroy({ params, request, response }){
        const order = await Order.find(params.id);
        const oldOrder =order;
        if(!order) return response.status(404).json({ status: 0 });

        await order.delete();
        return response.status(200).json({
            status: 1,
            data: oldOrder
        });
    }
}

module.exports = OrderController
