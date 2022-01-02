import { SyntheticEvent } from 'react';
import axios from 'axios';
import { getBasePath } from '../utils/PathHelper';
import { useParams, Link } from 'react-router-dom';

const AddPhoto = () => {
  const { id } = useParams();

  const submit = async (e: SyntheticEvent) => {
    const formData = new FormData();
    // @ts-ignore
    formData.append('file', e.target.files[0]);
    try {
      await axios.post(`${getBasePath()}/api/${id}/photo`, formData);
      await axios.patch(`${getBasePath()}/api/${id}/addPhoto`, formData);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div>
      <div>
        <div className="ui vertical footer segment" id="margin-top">
          <div className="ui center aligned container">
            <div className="ui stackable inverted divided grid">
              <div className="eight wide column">
                <div className="ui left aligned container">
                  <form
                    className="ui form"
                    onSubmit={submit}
                    encType="multipart/form-data"
                  >
                    {
                      <div>
                        Upload Image
                        <div>
                          <input
                            type="file"
                            name="image"
                            multiple
                            onChange={submit}
                          />
                        </div>
                      </div>
                    }
                    <button
                      className="ui button"
                      type="submit"
                      id="submit"
                      style={{ margin: '10px' }}
                    >
                      Add Image
                    </button>
                    <Link to={`/gallery/${id}`}>
                      <button
                        className="ui button"
                        type="submit"
                        id="submit"
                        style={{ margin: '10px' }}
                      >
                        Back to the Gallery
                      </button>
                    </Link>
                  </form>
                </div>
              </div>
            </div>
            <div className="eight wide column"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPhoto;
