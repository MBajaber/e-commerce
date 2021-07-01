import React, { useState } from 'react';
import './CartItem.css';
import Currency from 'react-currency-formatter';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { removeFromProducts, increaseQuantity, decreaseQuantity } from '../../store/actions/PdoductActions';

function CartItem({ id, image, title, category, price, quantity }) {
    const [selectValue, setSelectValue] = useState('M');
    const dispatch = useDispatch();

    const increaseValue = () => {
        if(quantity < 20) {
            dispatch(increaseQuantity({id, image, price, quantity}));
        }
    }
    
    const decreaseValue = () => {
        if(quantity > 1) {
            dispatch(decreaseQuantity({id, image, price, quantity}));
        }
    }

    const removeItem = () => {
        dispatch(removeFromProducts({
            id: id,
            image: image
        }));
    }

    return (
        <div className="product">
            <div className="info_desc">
                <div className="img">
                    <img src={image} alt={title} loading='lazy' />
                </div>
                <div className="title_category">
                    <h2>{title}</h2>
                    <p>Category: <span>{category}</span></p>
                </div>
            </div>
            <div className="details">
                <div className="quantity_size">
                    <div className="quantity">
                        <h6 className='title_section'>quantity:</h6>
                        <div className="buttons">
                            <button className="increase" onClick={increaseValue}>+</button>
                            <div className="counter">{quantity}</div>
                            <button className="decrease" onClick={decreaseValue}>-</button>
                        </div>
                    </div>
                    <div className="size">
                    <h6 className='title_section'>size:</h6>
                        <select value={selectValue} onChange={e => setSelectValue(e.target.value)}>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                    </div>
                </div>
                <div className="currency">
                    <h6 className='title_section'>price:</h6>
                    <p>
                        <Currency quantity={price} currency='usd' />{quantity > 1 && ` X ${quantity}`}
                    </p>
                </div>
                <div className="delete">
                    <h6 className='title_section'>delete:</h6>
                    <button onClick={removeItem}><MdDelete /></button>
                </div>
            </div>
        </div>
    )
}

export default CartItem
