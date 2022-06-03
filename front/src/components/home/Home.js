import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Burger from '../Burger';
import Menu from '../Menu';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper';

import './Home.css';

import { StartButton } from '../../styledCompo/homeStyle/Homestyle';

import img_1 from '../../img/landMark1.jpg';
import img_2 from '../../img/landMark2.jpg';
import img_3 from '../../img/landMark3.jpg';

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
};

const Home = () => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const node = React.useRef();
  useOnClickOutside(node, () => setOpen(false));

  const image = [img_1, img_2, img_3];

  const imageRender = image.map((item, idx) => {
    return (
      <SwiperSlide key={idx}>
        <StartButton onClick={() => navigate('/main')}>시작하기</StartButton>
        <img src={item} />
      </SwiperSlide>
    );
  });
  return (
    <>
      <section />
      <div ref={node}>
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </div>
      <Swiper
        rewind={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        style={{ '--swiper-navigation-color': '#e1f0fb' }}
      >
        {imageRender}
      </Swiper>
    </>
  );
};

export default Home;
