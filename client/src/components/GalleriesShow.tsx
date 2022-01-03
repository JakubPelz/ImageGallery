import ImageMain from '../components/assets/images/image-text.png';
import '../components/assets/showGalleries.css';
import { Link } from 'react-router-dom';
import { Gallery, ShowGalleries, Image } from '../reducers/actions';
import { getImagePath } from '../utils/PathHelper';

export interface ImageDisplay {
  address: string;
  _id: any;
  register_date: Date;
}

const GalleriesShow = (props: ShowGalleries) => {
  return (
    <>
      {props.galleries.map((gallery: Gallery) => {
        return (
          <div className="five wide column" key={gallery._id}>
            <div className="ui card" id="card">
              <div className="content">
                <div className="header">
                  {gallery.photos[0].address === null ||
                  gallery.photos[0].address === undefined ? (
                    <img
                      src={ImageMain}
                      className="ui small image"
                      id="alignedItem"
                      alt={'FakeImage'}
                    />
                  ) : (
                    <img
                      src={`${getImagePath()}${gallery.photos[0].address}`}
                      className="ui small image"
                      id="alignedItem"
                      alt={'haha'}
                    />
                  )}
                  {/* <img
                    src={`${getImagePath()}${gallery.photos[0].address}`}
                    className="ui small image"
                    id="alignedItem"
                    alt={gallery.photos[0].address}
                  /> */}
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
