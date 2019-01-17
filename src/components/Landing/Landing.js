import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './Landing.scss';
import PicSlider from '../PicSlider/PicSlider';
import gloves from './gloves.jpg';

export default class Landing extends Component {
    render() {
        return (
            <div className="landing-container">
                <div className='pic-slider'>
                    <PicSlider/>
                </div>
                <div className='ad-container'>
                    <div className='ad2'>
                        <h1>Durable</h1>
                        <h1>Affordable</h1>
                        <h1>Custom</h1>
                        
                    </div>
                    <div className='ad1'>
                    <img src="https://9b16f79ca967fd0708d1-2713572fef44aa49ec323e813b06d2d9.ssl.cf2.rackcdn.com/1140x_a10-7_cTC/baseball0302-1532126889.jpg" alt='homeplate'/>
                    </div>
                </div>
            </div>
        )
    }
}