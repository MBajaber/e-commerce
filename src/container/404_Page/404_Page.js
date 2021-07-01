import React from 'react';
import './404_Page.css';

function Not_Find() {
    return (
        <div className='not_find'>
            <div className="img">
                <img src={`${process.env.PUBLIC_URL}/images/404/404_page.png`} alt="Page Not Fount" loading='lazy' />
            </div>
            <p className="text">page not found</p>
        </div>
    )
}

export default Not_Find;
