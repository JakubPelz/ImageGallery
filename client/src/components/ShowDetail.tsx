import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../components/assets/imageList.css';
import ImageMain from '../components/assets/images/image-square.png';
import '../components/assets/showDetail.css';

const ShowDetail = (props: any) => {
  const { id } = useParams();
  const [gallery_name, setGalleryName] = useState('');
  const [gallery_description, setGalleryDescription] = useState('');
  const [photos, setPhotos] = useState([]);
  const [galleryId, setID] = useState(Number);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `http://localhost:8000/api/gallery/${id}`
      );

      setGalleryName(data.gallery_name);
      setGalleryDescription(data.gallery_description);
      setPhotos(data.photos);
      setID(data._id);
    })();
  }, []);

  return (
    <>
      <div className="ui vertical footer segment">
        <div className="ui container">
          <div className="content">
            <div className="header">"{gallery_name}"</div>
            <div className="description" id="alignedItem">
              {gallery_description}
            </div>
          </div>
          <div className="ui bottom attached buttons" id="buttonField">
            <button className="ui button" id="buttonDetail">
              Add Images
            </button>
            <Link to={`/gallery/edit/${galleryId}`}>
              <button className="ui button" id="buttonDetail">
                Edit Gallery
              </button>
            </Link>
            <button className="ui button" id="buttonDetail">
              Delete Gallery
            </button>
          </div>
        </div>
      </div>
      <div className="ui grid" id="imageGrid">
        {photos.map((image) => {
          return (
            <div className="three wide column" key={image}>
              <img
                src={ImageMain}
                className="ui small image"
                id="alignedItem"
                alt={image}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ShowDetail;
