import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'antd';

const MuseumHome = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = '1XhjQJNH';
        const apiUrl = 'https://www.rijksmuseum.nl/api/en/collection';

        const response = await axios.get(apiUrl, {
          params: {
            key: apiKey,
            format: 'json',
            imgonly: true,
            ps: 100,
          },
        });
        
        const responseData = response.data.artObjects || [];
        setArtworks(responseData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('An error occurred while fetching data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
<section className='body-tag ' style={{ paddingBottom: '2rem' }}>
  <div className='museum-container'>
    <h2 className='museum-heading pt-5'>Online Virtual Museum</h2>
    <div className='museum-card'>
      <Row gutter={[16, 16]}>
        {artworks.map((artwork) => (
          <Col span={8} key={artwork.id}>
            <Card className='museum-card'>
              <img
                src={artwork.webImage.url}
                alt={artwork.title}
                style={{ width: '100%' }}
              />
              <div className='artwork-desc'>
                <p className='artwork-title'>{artwork.title}</p>
                {/* <p>{artwork.description}</p> */}
                <p className='artwork-title'><strong>Artist: </strong> {artwork.principalOrFirstMaker}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  </div>
</section>
  );
};

export default MuseumHome;
