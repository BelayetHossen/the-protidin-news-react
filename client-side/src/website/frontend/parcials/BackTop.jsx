import React, { useState, useEffect } from 'react';

const BackTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Function to check scroll position and toggle visibility
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // Event listener to check scroll position
        window.addEventListener('scroll', toggleVisibility);

        // Clean up
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // Function to scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`${isVisible ? 'fixed bottom-4 right-4' : 'hidden'
                } bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-full transition duration-300 animate-bounce`}
        >
            <i className="fa-regular fa-circle-up text-3xl"></i>
        </button>
    );
};

export default BackTop;