// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const MuseumHome = () => {
//   const [artworks, setArtworks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const apiKey = '1XhjQJNH';
//         const apiUrl = 'https://www.rijksmuseum.nl/api/en/collection';

//         const response = await axios.get(apiUrl, {
//           params: {
//             key: apiKey,
//             format: 'json',
//             imgonly: true,
//           },
//         });

//         const responseData = response.data.artObjects || [];
//         setArtworks(responseData);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setError('An error occurred while fetching data.');
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       <h2 style={{ textAlign: 'center' }}>Rijksmuseum Artworks</h2>
//       <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
//         {artworks.map((artwork) => (
//           <div key={artwork.id} style={{ margin: '10px', width: '300px' }}>
//             <img
//               src={artwork.webImage.url}
//               alt={artwork.title}
//               style={{ width: '100%', height: 'auto' }}
//             />
//             <div>
//               <h3>{artwork.title}</h3>
//               <p>{artwork.description}</p>
//               <p>Artist: {artwork.principalOrFirstMaker}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MuseumHome;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MuseumHome = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects';

        const response = await axios.get(apiUrl, {
          params: {
            hasImages: true,
            isPublicDomain: true,
          },
        });

        const objectIDs = response.data.objectIDs || [];
        const randomObjectIDs = getRandomObjectIDs(objectIDs, 8);
        const artworkData = await Promise.all(
          randomObjectIDs.map(async (objectID) => {
            const artworkResponse = await axios.get(`${apiUrl}/${objectID}`);
            return artworkResponse.data;
          })
        );

        setArtworks(artworkData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('An error occurred while fetching data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getRandomObjectIDs = (objectIDs, count) => {
    const shuffledIDs = objectIDs.sort(() => 0.5 - Math.random());
    return shuffledIDs.slice(0, count);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Online Virtual Museum</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {artworks.map((artwork) => (
          <div key={artwork.objectID} style={{ margin: '10px', width: '300px' }}>
            <img
              src={artwork.primaryImage}
              alt={artwork.title}
              style={{ width: '100%', height: 'auto' }}
            />
            <div>
              <h3>{artwork.title}</h3>
              <p>{artwork.objectDate}</p>
              <p>{artwork.artistDisplayName}</p>
              <p>{artwork.culture}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MuseumHome;
