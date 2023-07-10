import React from 'react';
import Gaming from '../images/gaming.png';
import karaoke from '../images/Karaoke.jpg';
import MandS from '../images/manss.jpg';
import { useNavigate } from 'react-router-dom';

const ServiceScreen = () => {
  const navigate = useNavigate();

  const handleCardClick = (serviceName) => {
    // Redirect to the service page based on the clicked card
    navigate(`/${serviceName}`);
  };

  return (
    <>
      <div className="custom-container body-tag vh-100">
        <h3 className="title">OUR SERVICES</h3>

        <div className="product-container">
          <div className="product shadow" data-name="p-1" onClick={() => handleCardClick('gaming')}>
            <img src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="" />
            <h3>Gaming</h3>
            <div className="availability">Play, Win, Repeat, Dominate, Conquer</div>
          </div>

          <div className="product shadow" data-name="p-2" onClick={() => handleCardClick('karaoke')}>
            <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="" />
            <h3>Karaoke</h3>
            <div className="availability">Sing Your Heart Out, Everywhere</div>
          </div>

          <div className="product shadow" data-name="p-3" onClick={() => handleCardClick('mshome')}>
            <img src="https://img.freepik.com/free-vector/cinema-movie-illustration_24908-57118.jpg?w=740&t=st=1688944189~exp=1688944789~hmac=c299f60948806e79623d5a2d99771b817e9c9d409fcc80e59825a2a8c44513ee" alt="" />
            <h3>Movies and Songs</h3>
            <div className="desc">Unlimited Entertainment at Your Fingertips</div>
          </div>

          <div className="product shadow" data-name="p-4" onClick={() => handleCardClick('others')}>
            <img
              src="https://images.unsplash.com/photo-1497005367839-6e852de72767?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=867&q=80"
              alt=""
            />
            <h3>Others</h3>
            <div className="desc">Watch Online</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceScreen;
