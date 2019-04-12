'use strict'

const Product = use('App/Models/Product')

class ProductController {

    async index ({response}){
        // let products = await Product.all()
        const products = await Product.query().with('cart').fetch();
                return response.json(products)
    }

    async store({request, response}){
        const productInfo = request.only(['id', 'name', 'image', 'price', 'details'])
        
        const product = new Product()
        
        product.id = productInfo.id
        product.name = productInfo.name
        product.image = productInfo.image
        product.price = productInfo.price     
        product.details = productInfo.details  
        await product.save()
        
        return response.status(201).json(product)
    }

    async show({params, response}){
        const product = await Product.find(params.id)
        return response.json(product)
    }

    async update ({params, request, response}){
        // const productInfo = request.only(['id', 'name', 'image', 'price', 'desc'])
        const product = await Product.find(params.id)
        if(!product){
            return response.status(404).json({data: 'Resource not found'})
        }
        // product.id = request.input("id")
        product.name = request.input("name")
        product.image = request.input("image")
        product.price = request.input("price")
        product.details = request.input("details")
        // product.merge(request.all());

        await product.save()
        return response.json(product)
    }

    async destroy ({params, response}){
        const product = await Product.find(params.id)
        if(!product){
            return response.status(404).json({data: 'Resource not found'})
        }
        await product.delete()
        return response.status(204).json(null)
    }
}

module.exports = ProductController
