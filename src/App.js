import React, {useState, useEffect} from 'react';

function App() {
    const [artworks, setArtworks] = useState([]);

    useEffect(() => { 
      fetch("https://api.artic.edu/api/v1/artworks")
      .then((response) => response.json())
      .then(setArtworks)
      .catch((error) => {
        console.log(error);
      });
    }, []);

    return (
      <>
      <ArtButton />
      <ul> 
        {artworks.map((art, index) => <ArtButton art={art} key={index} />)}
      </ul>
      </>
    )
};

function ArtButton({art, key}) { 
  const [clicked, setClicked] = useState(false);
  const [imgUrl, setImgUrl] = useState('');

  const handleClick = () => {
    setClicked(!clicked);
  }

  useEffect(() => {
    if (clicked) {
      const getAlbumCover = async () => {
        const artId = art.id;
        await fetch(`https://api.artic.edu/api/v1/artworks/${artId}?fields=id,title,image_id`)
        .then((response) => response.json())
        .then((res) => {
          const image_id = res.data.image_id;
          const iiif_url = res.config.iiif_url;
          setImgUrl(`${iiif_url}/${image_id}/full/200,/0/default.jpg`);
        })
      };
      getAlbumCover();
    }
  },[clicked, art.id]);

  return (
    <li key={key}>
      <button onClick={handleClick}>Click Me</button>
      {clicked ? <img src={imgUrl} alt={art.title}/> : <></>}
    </li>

  );
  }

  export default App;