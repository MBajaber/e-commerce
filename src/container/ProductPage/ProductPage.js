import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AiTwotoneStar } from 'react-icons/ai';
import { ImCart } from 'react-icons/im';
import './ProductPage.css';
import Currency from 'react-currency-formatter';
import { useDispatch,  } from 'react-redux';
import { removeFromProducts, addToProducts } from '../../store/actions/PdoductActions'
import ImageZoom from 'react-image-zoom';

function ProductPage() {
    
    const { id, category, description, image, price, title, randomStars, randompeople, hasPrime } = useSelector(state => state.product.currentProduct);
    const dispatch = useDispatch();
    const productsStore = useSelector(state => state.product.products);
    const [isAddToCart, setIsAddToCart] = useState(false);

    useMemo(() => {
        let val = productsStore.some(item => item.id === id && item.image === image);
        setIsAddToCart(val);
    }, [productsStore]);

    const addToCart = (item) => {
        dispatch(addToProducts(item));
    }
    
    const removeFromProductsFunc = (item) => {
        dispatch(removeFromProducts(item));
    }

    return (
        <div className="container">
            <div className='single_item'>
                <div className="img_product" style={{ width: 200, height: 100 }}>
                    <ImageZoom 
                        width={200}
                        img={image}
                    />
                </div>
                <div className="info">
                    <div className="text">
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
                        <p className='description'>{description}</p>
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
                    </div>
                    <div className="buttons_section">
                        {
                            !isAddToCart
                            ? (
                                <button className="button_item add_to_cart" onClick={() => addToCart({
                                    id: id,
                                    category: category,
                                    description: description,
                                    image: image,
                                    price: price,
                                    title: title
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
        </div>
    )
}

export default ProductPage
