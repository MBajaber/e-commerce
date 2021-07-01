import React, { useEffect } from 'react'
import './Home.css';
import Banner from '../../components/Banner/Banner';
import Products from '../../components/Products/Products';
import { pageInfo } from '../../store/actions/UserActions';
import { useDispatch } from 'react-redux';

function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(pageInfo('home'));
    }, [])
    return (
        <div className='home'>
            <Banner />
            <Products />
        </div>
    )
}
export default Home