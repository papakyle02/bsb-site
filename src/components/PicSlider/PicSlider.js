import React from "react";
import Slider from "react-slick";
import pic1 from './Curtis1.jpg';
import pic2 from './Rabinowitz1.jpg';
import pic3 from './Wilson1.jpg';
import './PicSlider.scss'

export default class PicSlider extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3500,
    };
    return (
      <Slider {...settings}>
        <div className='slider-pic1'>
          <img src={pic1} alt='pic1'/>
          <h1>Marketing is hard!</h1>
        </div>
        <div className='slider-pic2'>
          <img src={pic2} alt='pic2'/>
          <h1>You should buy things.</h1>
        </div>
        <div className='slider-pic3'>
          <img src={pic3} alt='pic3'/>
          <h1>Spend money here.</h1>
        </div>
      </Slider>
    );
  }
}