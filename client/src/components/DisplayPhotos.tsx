import { useState, useEffect } from 'react';
import { Image } from '../reducers/actions';
import axios from 'axios';
import { getBasePath, getImagePath } from '../utils/PathHelper';
import { useParams } from 'react-router-dom';

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
              id="ResizeImage"
              alt={image.address}
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
      {/*    {props.photos.map((image, index) => {
        return (
          <div className="three wide column" key={index}>
            <div className="ui card">
              <div className="content">
                <i
                  className="right floated trash icon"
                  onClick={() => {
                    del(image._id);
                    refreshPage();
                  }}
                ></i>
                <i className="right floated like icon"></i>
                <i className="right floated star icon"></i>

                <div className="header">Image Name</div>
                <div className="description">
                  <img
                    src={ImageMain}
                    //className="ui small image"
                    id="alignedItem"
                    alt={`${image.register_date}`}
                    onClick={handleOnItemclick}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })} */}
    </div>
  );
};

export default DisplayPhotos;
