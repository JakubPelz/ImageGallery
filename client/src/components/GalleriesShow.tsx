import { useSelector } from 'react-redux';
import ImageMain from '../components/assets/images/image-text.png';
import '../components/assets/showGalleries.css';
import { Link } from 'react-router-dom';
import { ShowGalleries, Gallery } from '../reducers/actions';

const GalleriesShow = () => {
  const Galleries = useSelector<ShowGalleries, Gallery[]>(
    (state) => state.galleries
  );

  return (
    <>
      {Galleries.map((gallery: Gallery) => {
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
                  "{gallery.gallery_name}"
                </div>
                <div className="description" id="alignedItem">
                  {gallery.gallery_description}
                </div>
                <div className="ui two bottom attached buttons">
                  <Link to={`/gallery/${gallery._id}`}>
                    <div className="ui button">Show Gallery Details</div>
                  </Link>
                  <div className="ui button">Add Photo</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default GalleriesShow;
