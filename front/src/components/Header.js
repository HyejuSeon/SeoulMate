import React, { useEffect, useState } from 'react';

import { throttle } from 'lodash';

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener('scroll', throttle(updateScroll, 300));
    return () => {
      window.removeEventListener('scroll', throttle(updateScroll, 300));
    };
  }, []);

  return <div>sssdsdsd</div>;
};

export default Header;
