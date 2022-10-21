import lottie from 'lottie-web';
import { useEffect } from 'react';
import xMark from './xmark.json';
export const XMark = () => {
  useEffect(() => {
    lottie.loadAnimation({
      //@ts-expect-error a previous if statement ensures results is a property
      container: document.querySelector('#AnimatedXMark'),
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: xMark, // the path to the animation json
    });
  }, []);

  return <div style={{ width: '40px', height: '40px' }} id='AnimatedXMark' />;
};
