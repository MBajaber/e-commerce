import React from 'react';
import './FailPage.css';
import { Link } from 'react-router-dom';

function FailPage() {
    return (
        <div className='Fail_page'>
            <div className="msg">
                <div className="image">
                    <img src={process.env.PUBLIC_URL + 'images/sign/wrong.png'} alt="wrong sign" loading='lazy' />
                </div>
                <p className="text">Sorry! something Wrong try again</p>
            </div>
            <div className="go_main">
                <Link to='/' >go to Main</Link>
            </div>
        </div>
    )
}

export default FailPage