import { useState, useEffect } from 'react';
import { Image } from '../reducers/actions';
import axios from 'axios';
import { getBasePath, getImagePath } from '../utils/PathHelper';
import { useParams } from 'react-router-dom';
import '../components/assets/lightBox.css';

export interface IShowPhotos {
  photos: Image[];
}
const DisplayPhotos = (props: IShowPhotos) => {
  const [pageId, setPageId] = useState<string>();
  const { id } = useParams();

  useEffect(() => {
    setPageId(id);
  }, [id]);

  const delFromGalery = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this Photo?')) {
      await axios.delete(`${getBasePath()}/api/gallery/${pageId}/photo/${id}`, {
        params: id,
      });
    }
  };

  const delFromImage = async (id: number) => {
    await axios.delete(`${getBasePath()}/api/photo/${id}`, {
      params: id,
    });
  };

  function refreshPage() {
    window.location.reload();
  }

  const handleOnItemclick = () => {};

  return (
    <div className="ui grid center aligned segment" id="imageGrid">
      {props.photos.map((image, index) => {
        return (
          <div className="six wide column" key={index}>
            <img
              src={`${getImagePath()}${image.address}`}
              className="ui small bordered image"
              alt={image.address}
              id="ResizeImage"
              onClick={handleOnItemclick}
              key={index}
            />
            <i
              className="right floated trash icon"
              id="IconsPosition"
              onClick={() => {
                delFromGalery(image._id);
                delFromImage(image._id);
                refreshPage();
              }}
            ></i>
            <i className="right floated like icon"></i>
            <i className="right floated star icon"></i>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayPhotos;
