import React from 'react'


const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = React.useState(false);
  
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
  
    React.useEffect(() => {
      window.addEventListener('scroll', toggleVisibility);
      return () => {
        window.removeEventListener('scroll', toggleVisibility);
      };
    }, []);
  
    return (
      <button
        onClick={scrollToTop}
        className={`scroll-to-top ${isVisible ? 'visible' : 'hidden'} fixed bottom-4 right-4 bg-indigo-500 text-white p-2 rounded-full shadow-lg transition-opacity duration-300`}
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        ↑
      </button>
    );
  };
  
  export default ScrollToTopButton;
