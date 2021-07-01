import React from 'react';
import Logo from '../../Logo/Logo';
import './Sidebar.css'
import { AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { navToggle, logOutUser } from '../../../store/actions/UserActions';
import { auth } from '../../../Firebase/Firebase';

function Sidebar({getClass}) {
    const dispatch = useDispatch();
    const toggleNav = useSelector(state => state.user.toggleNav);
    const classes = ['main_box'];
    toggleNav ? classes.push('open') : classes.pop();
    const user = useSelector(state => state.user.user);

    const logout = () => {
        auth.signOut();
        dispatch(logOutUser());
        dispatch(navToggle(false));
    }

    return (
        <div className='sidebar' onClick={e => getClass(e.target.className)}>
            <div className={classes.join(' ')}>
                <div className="close_btn">X</div>
                <div className="logo_box">
                    <Logo />
                    <h2 className="logo_text">shopp<span>ing</span></h2>
                </div>
                {
                    user !== null && (
                        <div className="user_box">
                            <div className="img">
                                {
                                    user.photoURL === null
                                    ? <AiOutlineUser size size={24} />
                                    : <img src={user.photoURL} alt='persone' loading='lazy' />
                                }
                            </div>
                            <div className="user_name">
                                {
                                    user.displayName !== null ? user.displayName > 10 ? `${user.displayName.slice(0, 10)}...` : user.displayName : 
                                    user.email.length > 10 ? `${user.email.slice(0, 10)}...` : user.email
                                }
                            </div>
                        </div>
                    )
                }
                {
                    user === null
                    && (
                        <div className="sign_in_sign_up">
                            <Link to='/signIn' className="sign_in_link" onClick={() => dispatch(navToggle(false))}>Sign In</Link>
                            <Link to='/signUp' className="sign_up_link" onClick={() => dispatch(navToggle(false))}>Sign Up</Link>
                        </div>
                    )
                }
                {
                    user !== null && (
                        <div className="logout">
                            <button onClick={logout}>Logout</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Sidebar
