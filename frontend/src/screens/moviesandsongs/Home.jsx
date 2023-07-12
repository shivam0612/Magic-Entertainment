import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 3);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {currentSlide === 0 && (
        <div>
          <img
            className="d-block w-100"
            style={{
              height: '55vh',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            src="https://assets.nflxext.com/ffe/siteui/vlv3/bff5732c-7d13-45d1-9fab-476db25a1827/9d801cfd-47dc-45a4-823d-b2dd11daadf1/CA-en-20230710-popsignuptwoweeks-perspective_alpha_website_large.jpg"
            alt="First slide"
          />
        </div>
      )}
      {currentSlide === 1 && (
        <div>
          <img
            className="d-block w-100"
            style={{
              height: '55vh',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            src="https://storage.googleapis.com/kaggle-datasets-images/2587299/4416293/715bb18a4917ad2d3e8b9bd678f31d10/dataset-cover.jpg?t=2022-10-29-03-36-49"
            alt="Second slide"
          />
        </div>
      )}
      {currentSlide === 2 && (
        <div>
          <img
            className="d-block w-100"
            style={{
              height: '55vh',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            src="https://www.fullsail.edu/assets/ext/about/about-fsStories-hero/2022-holiday-blockbusters-grads-credited-on-multiple-hit-films-and-shows-hero.jpg"
            alt="Third slide"
          />
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleGetStartedClick = () => {
    navigate('/mshome');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div >
      <Slideshow />
      <div className="centered-text mb-5">
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
