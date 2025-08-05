import { useEffect } from 'react';

const useScrollAnimation = () => {
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.scroll-animate');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // When element comes into view (adjust threshold as needed)
        if (elementPosition < windowHeight - 100) {
          // Apply the animation class based on data attribute
          const animation = element.dataset.animation;
          element.classList.add(animation);
          element.classList.remove('opacity-0');
        }
      });
    };

    // Run once on load
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Cleanup
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);
};

export default useScrollAnimation;