import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleCardClick = (pageUrl) => {
    navigate(pageUrl);
  };

  const handleSearch = () => {
    // Perform search based on the searchQuery
    // Example: navigate(`/search?query=${searchQuery}`);
    console.log('Performing search for:', searchQuery);
  };

  return (
    <div className="service-page-container body-tag vh-100" style={{ marginTop: '17rem' }}>
     
      <div className="row">
        <ServiceCard
          title="Online Games"
          description="Explore and play a wide variety of online games."
          imageUrl="https://mdbcdn.b-cdn.net/img/new/standard/nature/111.webp"
          onClick={() => handleCardClick('/games')}
        />
        <ServiceCard
          title="Online Karaoke"
          description="Sing your heart out with our online karaoke service."
          imageUrl="https://mdbcdn.b-cdn.net/img/new/standard/nature/111.webp"
          onClick={() => handleCardClick('/karaoke')}
        />
        <ServiceCard
          title="Online Movies/TV/Songs Exploration"
          description="Discover a vast collection of movies, TV shows, and songs online."
          imageUrl="https://mdbcdn.b-cdn.net/img/new/standard/nature/111.webp"
          onClick={() => handleCardClick('/mshome')}
        />
      </div>
      <div className="row">
        <ServiceCard
          title="Others"
          description="Explore other online services we offer."
          imageUrl="https://mdbcdn.b-cdn.net/img/new/standard/nature/111.webp"
          onClick={() => handleCardClick('/other')}
        />
      </div>

    </div>
  );
};

const ServiceCard = ({ title, description, imageUrl, onClick }) => {
  return (
    <div className="col-sm-4" onClick={onClick}>
      <div className="card">
        <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
          <img src={imageUrl} className="img-fluid" alt="Card background" />
          <a href="#!">
            <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
          </a>
        </div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceScreen;
