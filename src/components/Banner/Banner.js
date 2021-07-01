import React from 'react';
import './Banner.css';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Banner() {
    return (
        <div className='banner'>
            <Carousel 
                autoPlay
                infiniteLoop
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                interval={10000}
            >
                <div>
                    <img src={process.env.PUBLIC_URL + '/images/caursol_banners/b1.jpg'} loading='lazy' alt='Banner 1'/>
                </div>
                <div>
                    <img src={process.env.PUBLIC_URL + '/images/caursol_banners/b2.jpg'} loading='lazy' alt='Banner 2'/>
                </div>
                <div>
                    <img src={process.env.PUBLIC_URL + '/images/caursol_banners/b3.jpg'} loading='lazy' alt='Banner 3'/>
                </div>
                <div>
                    <img src={process.env.PUBLIC_URL + '/images/caursol_banners/b4.jpg'} loading='lazy' alt='Banner 1'/>
                </div>
                <div>
                    <img src={process.env.PUBLIC_URL + '/images/caursol_banners/b5.jpg'} loading='lazy' alt='Banner 2'/>
                </div>
                <div>
                    <img src={process.env.PUBLIC_URL + '/images/caursol_banners/b6.jpg'} loading='lazy' alt='Banner 3'/>
                </div>
                <div>
                    <img src={process.env.PUBLIC_URL + '/images/caursol_banners/b7.jpg'} loading='lazy' alt='Banner 1'/>
                </div>
                <div>
                    <img src={process.env.PUBLIC_URL + '/images/caursol_banners/b8.jpg'} loading='lazy' alt='Banner 2'/>
                </div>
                <div>
                    <img src={process.env.PUBLIC_URL + '/images/caursol_banners/b9.jpg'} loading='lazy' alt='Banner 3'/>
                </div>
            </Carousel>
        </div>
    )
}

export default Banner;
