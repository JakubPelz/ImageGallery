import { Image } from '../reducers/actions';
import ImageMain from '../components/assets/images/image-square.png';
import axios from 'axios';
import { getBasePath } from '../utils/PathHelper';

export interface IShowPhotos {
  photos: Image[];
}
const DisplayPhotos = (props: IShowPhotos) => {
  const del = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this Photo?')) {
      const det = await axios.get(`${getBasePath()}/api/photo/${id}`, {
        params: {
          id,
        },
      });
      console.log(det);
      /* .then((res) => {
          let newImage = props.photos.filter((item) => item._id !== id);

        })
        .catch((error) => {
          console.log(error);
        }); */
    }
  };
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
