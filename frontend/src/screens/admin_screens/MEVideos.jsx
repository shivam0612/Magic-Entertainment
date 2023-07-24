import React, { useState, useEffect } from 'react';

const MEVideos = () => {
    const [videos, setVideos] = useState([]);

    // Fetch all videos from the database
    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const response = await fetch('/api/video/getvideostoadmin'); // Replace this with your actual API endpoint to fetch videos
            const data = await response.json();
            setVideos(data.videos);

            console.log(data)
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    const handleDelete = async (videoId) => {
        try {
            // Replace the endpoint with your actual API endpoint to delete the video
            await fetch(`/api/videos/deletevideo/${videoId}`, {
                method: 'DELETE',
            });
            // Update the list of videos after deletion
            fetchVideos();
        } catch (error) {
            console.error('Error deleting video:', error);
        }
    };

    return (
        <div className='body-tag1 vh-100' style={{ display: 'flex', justifyContent: 'center' }}>
            <div className='MEVideos'>
                <h1 className='MEVideos-title'>Video List</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Thumbnail</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {videos.map((video) => (
                            <tr key={video._id}>
                                <td>{video.title}</td>
                                <td>{video.description}</td>
                                <td>
                                    <img src={`http://localhost:5000/${video.thumbnail}`} alt='Thumbnail' style={{ width: '100px', height: 'auto' }} />
                                </td>
                                <td>{video.category}</td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => handleDelete(video._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MEVideos;
