import React from 'react';
import './SuccessPage.css';
import { Link } from 'react-router-dom';

function SuccessPage() {
    return (
        <div className='success_page'>
            <div className="msg">
                <div className="image">
                    <img src={process.env.PUBLIC_URL + 'images/sign/correct.png'} alt="correct sign" loading='lazy' />
                </div>
                <p className="text">Thank you, you'r order has been confirmed!</p>
            </div>
            <div className="go_main">
                <Link to='/' >go to Main</Link>
            </div>
        </div>
    )
}

export default SuccessPage
