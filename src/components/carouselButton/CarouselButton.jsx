import React from "react";

const CarouselButton = ({ styles }) => {
  const handleScroll = () => {
    const categoriesElement = document.getElementById("categoriesScroll");
    if (categoriesElement) {
      const scrollAmount = 300; // Adjust this value to control scroll distance
      categoriesElement.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <button 
      className={styles.navButton} 
      aria-label="Scroll right"
      onClick={handleScroll}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
  );
};

export default CarouselButton;