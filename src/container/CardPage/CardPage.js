import React, { useState, useEffect } from 'react';
import './CardPage.css';
import CartItem from '../../components/CartItem/CartItem';
import { HiEmojiSad } from 'react-icons/hi';
import Currency from 'react-currency-formatter';
import { getTotal } from '../../store/actions/PdoductActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from'react-router-dom';
import { pageInfo } from '../../store/actions/UserActions';
import { loadStripe } from '@stripe/stripe-js';
import { publicKey } from './checkoutInfo';
import axios from 'axios';

const stripePromise = loadStripe(publicKey);

function CartPage() {
    const products = useSelector(state => state.product.products);
    const [total, setTotal] = useState(0);
    const user = useSelector(state => state.user.user)
    const email = useSelector(state => user ? state.user.user.email : null);
    const displayName = useSelector(state => user ? state.user.user.displayName : null);

    const checkoutHandler = async () => {

        const stripe = await stripePromise;
        // Send To Backend
        
        // const checkoutSession = await axios.post('http://localhost:4000/payment', {
        const checkoutSession = await axios.post('https://e-commerce-shopping-m.herokuapp.com/payment', {
            products: products,
            email: email !== null ? email : displayName
        });

        const resault = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        });

        if(resault.error) {
            alert(resault.error.message);
        }
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(pageInfo('card'));
    }, []);

    useEffect(() => {
        let allTotalPrice = [];
        products.map(el => allTotalPrice.push(el.price * el.quantity));
        let reduseAllValue = +allTotalPrice.reduce((a,b) => a + b, 0).toFixed(2);
        dispatch(getTotal(reduseAllValue));
        setTotal(reduseAllValue);
    }, [products]);

    return (
        <div className='container'>
            <div className='cart'>
                <div className="products_container">
                    {
                        products.length > 0
                        ? products.map(item => (
                            <CartItem
                                key={item.id}
                                id={item.id}
                                image={item.image}
                                category={item.category}
                                title={item.title}
                                price={item.price}
                                quantity={item.quantity}
                            />             
                            ))
                        :
                        <div className='no_items_cart'>No Items In The Cart... <HiEmojiSad /></div>
                    }
                </div>
                <div className="total">Total: <span>{<Currency quantity={total} currency='usd' />}</span></div>
                {
                    products.length > 0
                    ?   (
                            <div className="checkout">
                                {
                                    user !== null
                                    ? <button role='link' onClick={checkoutHandler} >checkout</button>
                                    : <Link to='signIn'>Sign In to Checkout</Link>
                                }
                            </div>
                        )
                    :  null
                }
            </div>
        </div>
    )
}

export default CartPage;
