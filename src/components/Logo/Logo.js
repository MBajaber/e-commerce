import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';
import { useDispatch } from 'react-redux';
import { navToggle } from '../../store/actions/UserActions';

function Logo() {
    const dispatch = useDispatch()
    return (
        <Link to='/' className='logo' onClick={() => dispatch(navToggle(false))}>
            <img src={process.env.PUBLIC_URL + 'images/logo/logo.png'} alt='logo' loading='lazy' />
        </Link>
    )
}

export default Logo
