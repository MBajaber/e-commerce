import React, { useState, useEffect, useMemo } from 'react';
import './SignIn.css';
import { Link } from 'react-router-dom';
import { facebookProvider, googleProvider, auth } from '../../../Firebase/Firebase';
import Loading from '../../../components/Loading/Loading';
import { getUser } from '../../../store/actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';

function SignIn({ history }) {
    const [email, setEmail] = useState('');
    const [touchEmail, setTouchEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [touchPassword, setTouchPassword] = useState(false);
    const [successForm, setSuccessForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const dispatch = useDispatch();

    const products = useSelector(state => state.product.products);
    const pageInfo = useSelector(state => state.user.pageInfo);

    const emailChangeHandler = (e) => {
        setTouchEmail(true);
        setEmail(e)
    }

    const passwordChangeHandler = (e) => {
        setTouchPassword(true);
        setPassword(e);
    }

    const validEmail = useMemo(() => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }, [email]);

    const validPassword = useMemo(() => password.length >= 6, [password]);

    useEffect(() => {
        if (email.length === '' && password.length === '') {
            setSuccessForm(false);
        } else if (email.length > 0 && password.length > 0) {
            if (validEmail && validPassword) {
                setSuccessForm(true);
            } else {
                setSuccessForm(false);
            }
        }
    }, [validEmail, validPassword]);

    const facebookHandler = () => {
        setIsLoading(true);
        setErrorMsg('');
        auth.signInWithPopup(facebookProvider)
            .then(({ user }) => {
                dispatch(getUser({
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                }));
                setEmail('');
                setTouchEmail(false);
                setPassword('');
                setTouchPassword(false);
                setSuccessForm(false);
                setIsLoading(false);
                setErrorMsg('');
                if (pageInfo === 'card' && products.length > 0) {
                    history.push('/card');
                } else {
                    history.push('/');
                }
            })
            .catch(({ message }) => {
                setPassword('');
                setErrorMsg(message);
                setIsLoading(false);
            })
    }

    const googleHandler = () => {
        setIsLoading(true);
        setErrorMsg('');
        auth.signInWithPopup(googleProvider)
            .then(({ user }) => {
                dispatch(getUser({
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                }));
                setEmail('');
                setTouchEmail(false);
                setPassword('');
                setTouchPassword(false);
                setSuccessForm(false);
                setIsLoading(false);
                setErrorMsg('');
                if (pageInfo === 'card' && products.length > 0) {
                    history.push('/card');
                } else {
                    history.push('/');
                }
            })
            .catch(({ message }) => {
                setPassword('');
                setErrorMsg(message);
                setIsLoading(false);
            });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg('');
        auth.signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(getUser({
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                }));
                setEmail('');
                setTouchEmail(false);
                setPassword('');
                setTouchPassword(false);
                setSuccessForm(false);
                setIsLoading(false);
                setErrorMsg('');
                if (pageInfo === 'card' && products.length > 0) {
                    history.push('/card');
                } else {
                    history.push('/');
                }
            })
            .catch(({ message }) => {
                setPassword('');
                setErrorMsg(message);
                setIsLoading(false);
            })
    }

    return (
        <div className='sign_in'>
            <h1 className="title">sign in</h1>
            {errorMsg && <div className="error_msg_content">{errorMsg}</div>}
            <div className="facebook_google">
                <button onClick={facebookHandler} className="social_btn face_btn">Facebook</button>
                <button onClick={googleHandler} className="social_btn google_btn">Google</button>
            </div>
            <p className='or_login_with'>or login with</p>
            <div className="form">
                <form onSubmit={submitHandler}>
                    <div className="form_group">
                        <input type="email" style={touchEmail && !validEmail ? { border: '1px solid rgb(220, 53, 69)' } : { borderBottom: '1px solid #d1d5db' }} placeholder='Email' value={email} onChange={e => emailChangeHandler(e.target.value)} />
                    </div>
                    <div className="form_group">
                        {touchPassword && !validPassword && <p className="error">At Leats 6 Characeters</p>}
                        <input type="password" style={touchPassword && !validPassword ? { border: '1px solid rgb(220, 53, 69)' } : { borderBottom: '1px solid #d1d5db' }} placeholder='Password' value={password} onChange={e => passwordChangeHandler(e.target.value)} />
                    </div>
                    <button className={`submit ${successForm ? '' : 'disabled'}`} disabled={successForm ? false : true}>
                        {isLoading ? <Loading largeSize='25px' smallSize='15px' /> : 'Sign In'}
                    </button>
                </form>
            </div>
            <p className='link'>if you dont't have account <Link to='signUp'>Sign Up</Link></p>
        </div>
    )
}

export default SignIn
