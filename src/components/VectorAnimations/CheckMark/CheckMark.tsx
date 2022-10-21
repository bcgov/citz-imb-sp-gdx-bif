import lottie from 'lottie-web';
import { useEffect } from 'react';
import checkMark from './checkmark.json';
export const CheckMark = () => {
  useEffect(() => {
    lottie.loadAnimation({
      //@ts-expect-error a previous if statement ensures results is a property
      container: document.querySelector('#AnimatedCheckMark'),
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: checkMark, // the path to the animation json
    });
  }, []);

  return (
    <div style={{ width: '60px', height: '60px' }} id='AnimatedCheckMark' />
  );
};
