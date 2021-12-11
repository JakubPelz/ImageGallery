import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import '../components/assets/createGallery.css';
import { Navigate } from 'react-router-dom';

const Home: React.FunctionComponent<{}> = (props) => {
  const [gallery_name, setGalleryName] = useState('');
  const [gallery_description, setGalleryDescription] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post('http://localhost:8000/api/create-gallery', {
      gallery_name,
      gallery_description,
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
                <form className="ui form" onSubmit={submit}>
                  <div className="field">
                    <label>Gallery Name</label>
                    <input
                      type="text"
                      name="gallery_name"
                      required
                      id="gallery_name"
                      onChange={(e) => setGalleryName(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Gallery Description</label>
                    <input
                      type="text"
                      name="gallery_description"
                      id="gallery_description"
                      required
                      onChange={(e) => setGalleryDescription(e.target.value)}
                    />
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

export default Home;
