import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    const handleAddToCart = (product) => {
        // cart.push(product); 

        let newCart = [];
        // const newCart = [...cart, product];
        // if product dosent exist in the cart,then set quantity =1
        // if exist update the quantity by 1
        const exists = cart.find(pd => pd.id === product.id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id)
            newCart = [...remaining, exists];
        }
        setCart(newCart);
        addToDb(product.id);
    }

    useEffect(() => {
        const storeCart = getShoppingCart();
        const saveCart = [];

        //step-1: get id of the addedProduct

        for (const id in storeCart) {
            //step-2: get product from products by using id
            const addedProduct = products.find(product => product.id === id)
            if (addedProduct) {
                // step-3: add quantity

                const quantity = storeCart[id];
                addedProduct.quantity = quantity;
                // step-4: add the addedProduct to the saveed card
                saveCart.push(addedProduct)
            }
            console.log('added Product', addedProduct)
        }
        // step-5: set the cart
        setCart(saveCart);

    }, [products])

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};



export default Shop;