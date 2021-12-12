import { SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom';
import { getBasePath } from '../utils/PathHelper';

const EditGallery = () => {
  const { id } = useParams();
  const [gallery_name, setGalleryName] = useState('');
  const [gallery_description, setGalleryDescription] = useState('');
  const [photos, setPhotos] = useState({});
  const [galleryId, setID] = useState(Number);
  const [redirect, setRedirect] = useState(false);

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
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put(`${getBasePath()}/api/gallery/${id}`, {
      gallery_name,
      gallery_description,
      photos,
      galleryId,
    });
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={'/show-galleries'} />;
  }

  return (
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
                  <div className="field">
                    <label>Gallery Name</label>
                    <input
                      type="text"
                      name="gallery_name"
                      id="gallery_name"
                      placeholder={gallery_name}
                      onChange={(e) => setGalleryName(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Gallery Description</label>
                    <input
                      type="text"
                      name="gallery_description"
                      id="gallery_description"
                      placeholder={gallery_description}
                      onChange={(e) => setGalleryDescription(e.target.value)}
                    />
                  </div>
                  <div>
                    Upload Image
                    <div>
                      <input
                        type="file"
                        name="image"
                        multiple
                        onChange={async (e) => {
                          const formData = new FormData();
                          // @ts-ignore
                          formData.append('file', e.target.files[0]);
                          try {
                            await axios.post(
                              `${getBasePath()}/api/photo`,
                              formData
                            );
                          } catch (e) {
                            console.log('e', e);
                          }
                        }}
                      />
                      Add Images
                    </div>
                  </div>
                  <button className="ui button" type="submit" id="submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="eight wide column"></div>
        </div>
      </div>
    </div>
  );
};

export default EditGallery;
