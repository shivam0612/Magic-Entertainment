import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const HomeScreen = () => {
  const images = [
    // Add your image URLs here
    'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
'https://img.freepik.com/free-vector/cinema-movie-illustration_24908-57118.jpg?w=740&t=st=1688944189~exp=1688944789~hmac=c299f60948806e79623d5a2d99771b817e9c9d409fcc80e59825a2a8c44513ee',    
'https://images.unsplash.com/photo-1513038630932-13873b1a7f29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TXVzZXVtfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    // Add more images as needed
  ];
  const services = [
    {
      title: 'Online Games',
      description: 'Explore a wide variety of online games and enjoy hours of entertainment.',
    },
    {
      title: 'Online Movies',
      description: 'Watch the latest movies and shows online from the comfort of your home.',
    },
    {
      title: 'Virtual Museum',
      description: 'Explore historical artifacts and artworks through our immersive virtual museum experience.',
    },
    // Add more services as needed
  ];

  const renderServiceItems = () => {
    return images.map((image, index) => (
      <Card className="service-item mx-3 border-0" key={index}>
        <Card.Img className='shadow' variant="top" src={image} alt={`Service ${index + 1}`} />
        <Card.Body>
          <Card.Title className='fw-bold'>{services[index].title}</Card.Title>
          <Card.Text>{services[index].description}</Card.Text>
        </Card.Body>
      </Card>
    ));
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Function to auto-slide images every 3 seconds (adjust the interval as needed)
    const slideTimer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(slideTimer);
  }, [images.length]);

  const [showGlobalChat, setShowGlobalChat] = useState(false);
  const [showInterestChat, setShowInterestChat] = useState(false);

  const handleGlobalChatClick = () => {
    setShowGlobalChat(true);
    setShowInterestChat(false);
  };

  const handleInterestChatClick = () => {
    setShowInterestChat(true);
    setShowGlobalChat(false);
  };

  return (
    <>
      <div className="container-fluid home">
        <div className="left-side"></div>
        <div className="right-side"></div>
        <div className="welcome-text text-center ">
          <span>
            <p className='mb-2'>Welcome To Our Portal</p>
            <a href='#service' className='text-decoration-none'>
              <FontAwesomeIcon
                icon={faChevronDown}
                size="3x"
                style={{ color: 'black' }}
                className='pt-3'
                bounce />
            </a>
          </span>
        </div>
        <div>
        </div>
        <div className="backwrap gradient">
        </div>
      </div>

      <div id='service' className='vh-100 service-section text-center' style={{alignItems:"center", display:"flex"}}>
        <Container>
          <h2 className='mt-0'>Our Services</h2>
          <div className="mt-4 d-flex justify-content-center">
            {renderServiceItems()}
          </div>
        </Container>
      </div>

      {/* Chat section */}
      <div className="chat-section vh-100 text-center">
        <Container>
          <h2 className='chatname mb-5'>Chat Features</h2>
          <div className=" d-flex justify-content-center">
            <Card className="chat-option mx-3 border-0">
              <Card.Body>
                <Card.Title className='fw-bold'>Chat with Global Users</Card.Title>
                <Card.Text>
                  Chat with users from all around the world and make new friends.
                </Card.Text>
                <Button variant="primary" onClick={handleGlobalChatClick}>
                  Start Global Chat
                </Button>
              </Card.Body>
            </Card>
            <Card className="chat-option mx-3 border-0">
              <Card.Body>
                <Card.Title className='fw-bold'>Chat with Similar Interest Users</Card.Title>
                <Card.Text>
                  Connect with users who share similar interests and hobbies.
                </Card.Text>
                <Button variant="primary" onClick={handleInterestChatClick}>
                  Find Interest Chat
                </Button>
              </Card.Body>
            </Card>
          </div>
          {/* Chat components based on user selection */}
          {showGlobalChat && <GlobalChatComponent />}
          {showInterestChat && <InterestChatComponent />}
        </Container>

        <div className=' contact-section text-center'>
          <Container>
            <h2 className='contactsec'>Contact Us</h2>
            <div className="mt-4">
              <p>If you have any questions or need assistance, feel free to contact us:</p>
              <Button variant="primary">Contact</Button>
            </div>
          </Container>
        </div>
      </div>

    </>
  );
};

const GlobalChatComponent = () => {
  // Implement your global chat component here
  return <p>Global Chat Component</p>;
};

const InterestChatComponent = () => {
  // Implement your interest chat component here
  return <p>Interest Chat Component</p>;
};

export default HomeScreen;
