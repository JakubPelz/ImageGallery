import ImageMain from '../components/assets/images/image-text.png';
import '../components/assets/showGalleries.css';
import { Link } from 'react-router-dom';
import { Gallery, ShowGalleries } from '../reducers/actions';

const GalleriesShow = (props: ShowGalleries) => {
  return (
    <>
      {props.galleries.map((gallery: Gallery) => {
        return (
          <div className="five wide column" key={gallery._id}>
            <div className="ui card" id="card">
              <div className="content">
                <div className="header">
                  <img
                    src={ImageMain}
                    className="ui small image"
                    id="alignedItem"
                    alt={gallery.gallery_name}
                  />
                </div>
                <div>
                  <h3>"{gallery.gallery_name}"</h3>
                </div>
                <div className="description" id="alignedItem">
                  {gallery.gallery_description}
                </div>
                <Link to={`/gallery/${gallery._id}`}>
                  <div className="ui button">Show Gallery Details</div>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default GalleriesShow;
