import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSliderButtonClick = (index) => {
    setCurrentSlide(index);
  };

  const handleGetStartedClick = () => {
    navigate('/mshome');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const slides = document.querySelectorAll('.slide');

    slides.forEach((slide, index) => {
      slide.style.opacity = index === currentSlide ? 1 : 0;
    });
  }, [currentSlide]);

  return (
    <div>
      <div className="hero">
        <div className="slide" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=867&q=80")` }}></div>
        <div className="slide" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1598805538557-c09c3390f5e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1175&q=80")` }}></div>
        <div className="slide" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80")` }}></div>
        <div className="slider-buttons">
          <div
            className={`slider-button ${currentSlide === 0 ? 'active' : ''}`}
            onClick={() => handleSliderButtonClick(0)}
          ></div>
          <div
            className={`slider-button ${currentSlide === 1 ? 'active' : ''}`}
            onClick={() => handleSliderButtonClick(1)}
          ></div>
          <div
            className={`slider-button ${currentSlide === 2 ? 'active' : ''}`}
            onClick={() => handleSliderButtonClick(2)}
          ></div>
        </div>
      </div>
      <div className="centered-text">
        <h2>Welcome to Magic Entertainment!</h2>
        <p>We offer a wide range of movies and songs on our online platform.</p>
        <button className="get-started-button" onClick={handleGetStartedClick}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
