import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../components/assets/showGalleries.css';
import GalleriesShow from '../components/GalleriesShow';
import { fetchGalleries, Gallery, ShowGalleries } from '../reducers/actions';

const ShowGallery = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGalleries());
  }, [dispatch]);

  const Galleries = useSelector<ShowGalleries, Gallery[]>(
    (state) => state.galleries
  );

  return (
    <div>
      <div className="ui item center aligned segment">
        <h1>Display all Galleries</h1>
        {Galleries.length}
      </div>
      <div className="ui grid center aligned segment">
        <GalleriesShow />
      </div>
      <div className="ui item center aligned segment">
        Here will be paginator
      </div>
    </div>
  );
};

export default ShowGallery;

/* const _ShowGalleries: FC<ShowGalleryProps> = ({ galleries }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGalleries());
  }, [dispatch]);

  const Galleries = galleries;

  return (
    <div>
      <div className="ui item center aligned segment">
        <h1>Display all Galleries</h1>
      </div>
      <div className="ui grid">
        {Galleries.map((gallery: Gallery) => {
          return (
            <div className="five wide column" key={gallery.id}>
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
                    <div className="ui button">Edit Gallery</div>
                    <div className="ui button">Add Photo</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="ui item center aligned segment">
        Here will be paginator
      </div>
    </div>
  );
};

const mapStateToProps = ({
  galleries,
}: StoreState): { galleries: Gallery[] } => {
  return { galleries };
};

export const ShowGallery = connect(mapStateToProps, {
  fetchGalleries,
})(_ShowGalleries);

export default ShowGallery; */
