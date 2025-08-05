import { useEffect } from 'react';

const useFadeIn = () => {
  useEffect(() => {
    const fadeInElements = document.querySelectorAll('.fade-in');

    const checkFadeIn = () => {
      fadeInElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight && elementBottom >= 0) {
          element.classList.add('visible');
        } else {
          element.classList.remove('visible'); // Remove class when out of view
        }
      });
    };

    window.addEventListener('scroll', checkFadeIn);
    window.addEventListener('resize', checkFadeIn);
    checkFadeIn(); // Initial check on page load

    return () => {
      window.removeEventListener('scroll', checkFadeIn);
      window.removeEventListener('resize', checkFadeIn);
    };
  }, []);
};

export default useFadeIn;