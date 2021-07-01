import React, { useEffect, useState } from 'react';
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../ProductItem/ProductItem';
import { currentProductNull } from '../../store/actions/PdoductActions';
import axios from 'axios';

function Products() {

    const [products, setProducts] = useState([]); 
    const [isThereProduct, setIsThereProduct] = useState(false); 
    const search = useSelector(state => state.product.search);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios('https://fakestoreapi.com/products');
                const response = await request.data;
                setProducts(response)
            } catch(error) {
                alert(error)
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        setIsThereProduct(document.getElementById('products').childElementCount === 0);
        dispatch(currentProductNull());
    }, [search]);

    return (
        <div className='container products' id='products'>
            {isThereProduct && <div className='product_item no_items'>No Item There</div>}
            {products.slice(0, 4).map(({ id, category, description, image, price, title }) => {
                return (
                    <ProductItem
                        key={id}
                        id={id}
                        category={category}
                        description={description}
                        image={image}
                        price={price}
                        title={title}
                        search={search}
                    />
                )
            })}
            {
                search === '' && (
                    <>
                        <div className="full_image">
                            <img src={process.env.PUBLIC_URL + '/images/caursol_banners/b10.jpg'} alt='Full Banner' loading='lazy' />
                        </div>
                        <div className='small_product'>
                            {products.slice(4, 5).map(({ id, category, description, image, price, title }) => {
                                return (
                                    <ProductItem
                                        key={id}
                                        id={id}
                                        category={category}
                                        description={description}
                                        image={image}
                                        price={price}
                                        title={title}
                                        search={search}
                                    />
                                )
                            })}
                        </div>
                    </>
                )
            }
            {products.slice(6).map(({ id, category, description, image, price, title }) => {
                return (
                    <ProductItem
                        key={id}
                        id={id}
                        category={category}
                        description={description}
                        image={image}
                        price={price}
                        title={title}
                        search={search}
                    />
                )
            })}

        </div>
    )
}

export default Products
