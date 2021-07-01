import React, { useState, useMemo } from 'react';
import './ProductItem.css';
import { AiTwotoneStar } from 'react-icons/ai';
import { ImCart } from 'react-icons/im';
import Currency from 'react-currency-formatter';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromProducts, addToProducts, currentProduct } from '../../store/actions/PdoductActions'
import { Link } from 'react-router-dom';

function ProductItem({ id, category, description, image, price, title, search }) {

    const [isAddToCart, setIsAddToCart] = useState(false)
    const dispatch = useDispatch();
    const productsStore = useSelector(state => state.product.products)
    useMemo(() => {
        let val = productsStore.some(item => item.id === id && item.image === image);
        setIsAddToCart(val);
    }, [productsStore]);
    const [randomStars] = useState(Math.ceil(Math.random() * 5));
    const [randompeople] = useState(Math.ceil(Math.random() * 10000));
    const [hasPrime] = useState(Math.random() > .5);

    
    const textFunc = () => description.length > 150 ? `${description.slice(0, 150)} ...` : description;
    const searchValue = search === '' ? true : title.toLowerCase().includes(search.toLowerCase()) ? true : false;

    const addToCart = (item) => {
        dispatch(addToProducts(item));
    }
    
    const removeFromProductsFunc = (item) => {
        dispatch(removeFromProducts(item));
    }

    return searchValue ? (
        <div className='product_item'>
            <span className='category'>{category}</span>
            <div className="sections">
                <Link to={`/${encodeURI(title).toLocaleLowerCase()}`} className="top_section" onClick={() => dispatch(currentProduct({
                    id,
                    category,
                    description,
                    image,
                    price,
                    title,
                    isAddToCart: isAddToCart,
                    randomStars: randomStars,
                    randompeople: randompeople,
                    hasPrime: hasPrime
                }))}>
                    <div className='main_image'>
                        <img src={image} alt={description} loading='lazy' />
                    </div>
                    <div className='rating_People'>
                        <ul>
                            {Array(randomStars).fill().map((star, index) => (
                                <li key={index}>
                                    <AiTwotoneStar />
                                </li>
                            ))}
                        </ul>
                        <span className='ratting'>({randompeople})</span>
                    </div>
                    <h4 className='title'>{title}</h4>
                    <p className='description'>{textFunc()}</p>
                    <div className='currency'>
                        <Currency 
                            quantity={price}
                            currency='usd'
                        />
                    </div>
                    {hasPrime && (
                        <div className="prime">
                            <div className="image_prime">
                                <img src={process.env.PUBLIC_URL + 'images/primeLogo/prime.png'} alt='Prime Logo' loading='lazy' />
                            </div>
                            <p>FREE Next-day Delivery</p>
                        </div>
                    )}
                    </Link>
                <div className="bottom_section">
                    {
                        !isAddToCart
                        ? (
                            <button className="button_item add_to_cart" onClick={() => addToCart({
                                id: id,
                                category: category,
                                description: description,
                                image: image,
                                price: price,
                                title: title,
                                quantity: 1
                            })}>
                                <span>Add To Cart</span>
                                {<ImCart />}
                            </button>
                        )
                        : (
                            <button className="button_item remove_from_cart" onClick={() => removeFromProductsFunc({
                                id: id,
                                image: image
                            })}>
                                <span>Remove From Cart</span>
                                {<ImCart />}
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    ) : null;
}

export default ProductItem
