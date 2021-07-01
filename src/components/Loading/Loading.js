import React from 'react';
import './Loading.css';

function Loading({ smallSize, largeSize }) {
    return (
        <div className='loader' style={{width: largeSize, height: largeSize }} >
            <div style={{width: smallSize, height: smallSize }}></div>
            <div style={{width: smallSize, height: smallSize }}></div>
            <div style={{width: smallSize, height: smallSize }}></div>
            <div style={{width: smallSize, height: smallSize }}></div>
        </div>
    )
}

export default Loading;
