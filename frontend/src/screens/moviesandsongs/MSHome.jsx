
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGetVideosQuery } from '../../slices/videoApiSlice';
import {uploadfolder}  from '../../config_path/path.js'; // Import the uploadfolder variable

// r
const MSHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeSection, setActiveSection] = useState('online');


  const { data: videoss, isLoading, isError, refetch } = useGetVideosQuery();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await refetch();
        console.log(res)
      } catch (error) {
        console.log(error);
        alert('Error occurred while fetching data');
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCSHTFvOfMLUKXXQCZHsCVT6uyLZqf5Ykk&part=snippet&type=video&q=${searchQuery}`
      );

      setVideos(response.data.items);
      setSelectedVideo(null); // Reset selected video when performing a new search
    } catch (error) {
      console.log(error);
    }
  };

  const openVideo = (videoId) => {
    setSelectedVideo(videoId);
  };

  const renderVideos = () => {
    if (videos.length === 0) {
      return <p>No videos found.</p>;
    }

    return videos.map((video) => (
      <div
        key={video.id.videoId}
        className="card mb-3 p-2 shadow"
        style={{ width: '80%', margin: 'auto' }}
      >
        <div className="row no-gutters">
          <div className="col-md-4">
            <div className="position-relative">
              <img
                src={video.snippet.thumbnails.medium.url}
                className="card-img"
                alt={video.snippet.title}
                onClick={() => openVideo(video.id.videoId)}
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{video.snippet.title}</h5>
              <p className="card-text">{video.snippet.description}</p>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const renderVideosFromDatabase = () => {
    if (isLoading) {
      return <p>Loading videos...</p>;
    }

    if (isError) {
      return <p>Error occurred while fetching videos.</p>;
    }

    if (!videoss || videoss.length === 0) {
      return <p>No videos found.</p>;
    }

    return videoss.videos.map((video) => (

      <div
        key={video._id}
        className="card mb-3 p-2 shadow"
        style={{ width: '80%', margin: 'auto' }}
      >
        <div className="row no-gutters">
          <div className="col-md-4">
            <div className="position-relative">
              <img
                src={uploadfolder + video.thumbnail}
                className="card-img"
                alt={video.title}
                onClick={() => openVideo(video._id)}
                onLoad={() => console.log("Image loaded:", uploadfolder + video.thumbnail)}
                onError={() => console.log("Error loading image:", uploadfolder + video.thumbnail)}
              />
              <p>{uploadfolder + video.thumbnail}</p>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{video.title}</h5>
              <p className="card-text">{video.description}</p>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const handleOnlineVideosClick = () => {
    setActiveSection('online');
  };

  const handleMeVideosClick = () => {
    setActiveSection('me');
  };

  return (
    <div style={{ width: '90%', margin: 'auto' }}>

      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1' }} className="mt-5 ms-5">
          {/* Video Player */}
          {selectedVideo ? (
            <div>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${selectedVideo}`}
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div>
              <img
                src="https://media.giphy.com/media/ITRemFlr5tS39AzQUL/giphy.gif"
                alt="GIF"
                width="560"
                height="315"
              />
            </div>
          )}
          <button className="mt-5" onClick={() => setSelectedVideo(null)}>
            Close Video
          </button>
        </div>
        <div className="pt-5" style={{ flex: '1', textAlign: 'center' }}>

          {activeSection === 'online' ? (
            <div>
              <div >
                <button style={{ marginBottom: '10px' }} onClick={handleOnlineVideosClick}>
                  Online Videos
                </button>
                <button onClick={handleMeVideosClick}>ME Videos</button>
              </div>
              <h2>Search Videos Online</h2>
              <div className="mt-3 mb-4">
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0%' }}>
                {renderVideos()}
              </div>
            </div>
          ) : (
            <div>
              <div >
                <button style={{ marginBottom: '10px' }} onClick={handleOnlineVideosClick}>
                  Online Videos
                </button>
                <button onClick={handleMeVideosClick}>ME Videos</button>
              </div>
              <h2>ME Videos</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0%' }}>
                {renderVideosFromDatabase()}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default MSHome;
