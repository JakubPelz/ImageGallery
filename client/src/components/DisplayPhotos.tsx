import { useState, useEffect } from 'react';
import { Image } from '../reducers/actions';
import ImageMain from '../components/assets/images/image-square.png';
import axios from 'axios';
import { getBasePath } from '../utils/PathHelper';
import { useParams, Navigate } from 'react-router-dom';

export interface IShowPhotos {
  photos: Image[];
}
const DisplayPhotos = (props: IShowPhotos) => {
  const [pageId, setPageId] = useState<any>();
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    // @ts-ignore
    setPageId(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const del = async (id: any) => {
    if (window.confirm('Are you sure you want to delete this Photo?')) {
      await axios.delete(`${getBasePath()}/api/gallery/${pageId}/photo/${id}`, {
        params: id,
      });
    }
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={`/show-galleries`} />;
  }

  return (
    <div className="ui grid center aligned segment" id="imageGrid">
      {props.photos.map((image, index) => {
        return (
          <div className="three wide column" key={index}>
            <div className="ui card">
              <div className="content">
                <i
                  className="right floated trash icon"
                  onClick={() => del(image._id)}
                ></i>
                <i className="right floated like icon"></i>
                <i className="right floated star icon"></i>

                <div className="header">Image Name</div>
                <div className="description">
                  <img
                    src={ImageMain}
                    className="ui small image"
                    id="alignedItem"
                    alt={`${image.register_date}`}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayPhotos;
