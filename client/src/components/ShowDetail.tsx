import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, Navigate } from 'react-router-dom';
import '../components/assets/imageList.css';
import ImageMain from '../components/assets/images/image-square.png';
import '../components/assets/showDetail.css';
import { getBasePath } from '../utils/PathHelper';
import { Image } from '../reducers/actions';

const ShowDetail = (props: any) => {
  const { id } = useParams();
  const [gallery_name, setGalleryName] = useState('');
  const [gallery_description, setGalleryDescription] = useState('');
  const [photos, setPhotos] = useState<Image[]>([]);
  const [galleryId, setID] = useState(Number);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${getBasePath()}/api/gallery/${id}`);

      setGalleryName(data.gallery_name);
      setGalleryDescription(data.gallery_description);
      setPhotos(data.photos);
      setID(data._id);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const del = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this Gallery?')) {
      await axios.delete(`${getBasePath()}/api/gallery/${id}`);
    }
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={'/show-galleries'} />;
  }

  return (
    <>
      <div className="ui vertical footer segment">
        <div className="ui container">
          <div className="content">
            <div className="header">
              <h3>{gallery_name}</h3>
            </div>
            <div className="description" id="alignedItem">
              {gallery_description}
            </div>
          </div>
          <div className="ui bottom attached buttons" id="buttonField">
            <Link to={`/gallery/edit/${galleryId}`}>
              <button className="ui button" id="buttonDetail">
                Edit Gallery || Add Image
              </button>
            </Link>
            <button
              className="ui button"
              id="buttonDetail"
              onClick={() => del(galleryId)}
            >
              Delete Gallery
            </button>
          </div>
        </div>
      </div>
      <div className="ui grid center aligned segment" id="imageGrid">
        {photos.map((image, index) => {
          return (
            <div className="three wide column" key={index}>
              <img
                src={ImageMain}
                className="ui small image"
                id="alignedItem"
                alt={`${image.register_date}`}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ShowDetail;
