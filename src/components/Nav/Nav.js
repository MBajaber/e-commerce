import React, { useState } from 'react'
import './Nav.css';
import Logo from '../Logo/Logo';
import { ImSearch } from 'react-icons/im';
import { BsListNested } from 'react-icons/bs';
import { ImCart } from 'react-icons/im';
import * as pdoductActions from '../../store/actions/PdoductActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import { navToggle } from '../../store/actions/UserActions';

function Navigation() {
    const productsCount = useSelector(state => state.product.products.length);
    const [search, setSearch] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
    }

    const dispatch = useDispatch();
    const toggleNav = useSelector(state => state.user.toggleNav)
    const onChangeHandler = (e) => {
        setSearch(e);
        dispatch(pdoductActions.searchProducts(e))
    }
    
    const user = useSelector(state => state.user.user)

    const getClass = (classValue) => {
        if(classValue === 'close_btn' || classValue === 'sidebar') {
            dispatch(navToggle(false));
        }
    }

    return (
        <div className="navbar">
            {toggleNav && <Sidebar getClass={getClass} />}
            <div className='nav'>
                <div className="sections">
                    <div className="nav_section">
                        <Logo />
                        <div className="search">
                            <form onSubmit={submitHandler}>
                                <input type='text' placeholder='search...' onChange={e => onChangeHandler(e.target.value)} value={search} />
                                <button type='submit'>
                                    <ImSearch />
                                </button>
                            </form>
                        </div>
                        <div className="icon_cart">
                            {
                                user && 
                                <div className="user_name">
                                    {
                                        user.displayName !== null ? user.displayName > 10 ? `${user.displayName.slice(0, 10)}...` : user.displayName : 
                                        user.email.length > 10 ? `${user.email.slice(0, 10)}...` : user.email
                                    }
                                </div>
                            }
                            <Link to='/card' className='shopping_cart'>
                                <ImCart />
                                <div className='counter'>
                                    <span>{productsCount}</span>
                                </div>
                            </Link>
                            <div className="navbar_icon" onClick={() => dispatch(navToggle())}>
                                <BsListNested />
                            </div>
                        </div>
                    </div>
                    <div className="search_sm">
                        <form onSubmit={submitHandler}>
                            <input type='text' placeholder='search...' onChange={e => onChangeHandler(e.target.value)} value={search} />
                            <button type='submit'>
                                <ImSearch />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navigation
