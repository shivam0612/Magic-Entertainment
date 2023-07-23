import React from 'react';
import { useNavigate } from 'react-router-dom';

const GameHome = () => {
const navigate = useNavigate()

  const gamesData = [
    {
      id: 1,
      name: 'Snake Game',
      description: 'Description of Game 1',
      imageUrl: 'https://neave.com/assets/images/home/snake.png',
      route: '/snakegame'
    },
    {
      id: 2,
      name: 'TIC TAC TOE',
      description: 'Description of Game 2',
      imageUrl: 'https://neave.com/assets/images/home/snake.png',
      route: '/tttgame'
    }, {
      id: 2,
      name: 'Game 2',
      description: 'Description of Game 2',
      imageUrl: 'https://neave.com/assets/images/home/snake.png',
      route: '/snakegame'
    }, {
      id: 2,
      name: 'Game 2',
      description: 'Description of Game 2',
      imageUrl: 'https://neave.com/assets/images/home/snake.png',
      route: '/snakegame'
    },
    // Add more game objects as needed
  ];

  const handleCardClick = (route) => {
    navigate(route); 
  };


  return (
    <>
      <div className='body-tag ' style={{height: "max-content", paddingBottom:"2rem"}}>
        <h3 className="title gamehometitle pt-5">GAMES</h3>

        <div className="game-home-container">
          <div className="game-cards">
            {gamesData.map((game) => (
              <div key={game.id}
                onClick={() => handleCardClick(game.route)}
                className="game-card">
                <img src={game.imageUrl} alt={game.name} className="game-image" />
                <h1 className="game-name text-info">{game.name}</h1>
                <p className="game-description">{game.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div></>
  );
};

export default GameHome;
