import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, Navigate } from 'react-router-dom';
import '../components/assets/imageList.css';
import '../components/assets/showDetail.css';
import { getBasePath } from '../utils/PathHelper';
import { Image } from '../reducers/actions';
import Pagination from './Pagination';
import DisplayPhotos from './DisplayPhotos';

const ShowDetail = (props: any) => {
  const { id } = useParams();
  const [gallery_name, setGalleryName] = useState('');
  const [gallery_description, setGalleryDescription] = useState('');
  const [photos, setPhotos] = useState<Image[]>([]);
  const [galleryId, setID] = useState(Number);
  const [redirect, setRedirect] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [galleriesPerPage] = useState(10);

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

  //Pagination
  const indexOfLastPost = currentPage * galleriesPerPage;
  const indexOfFirstPost = indexOfLastPost - galleriesPerPage;
  const currentGalleries = photos.slice(indexOfFirstPost, indexOfLastPost);
  // @ts-ignore
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            <p style={{ paddingLeft: 10 }}>
              "In the gallery is <strong>{photos.length}</strong> uploaded
              photos for now."
            </p>
          </div>
          <div className="ui item center aligned segment">
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
      </div>
      <DisplayPhotos photos={currentGalleries} />
      <Pagination
        postsPerPage={galleriesPerPage}
        totalPosts={photos.length}
        paginate={paginate}
      />
    </>
  );
};

export default ShowDetail;
