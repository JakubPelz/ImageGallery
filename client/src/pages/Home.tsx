import { NavLink } from 'react-router-dom';
import '../components/assets/home.css';

const Home = () => {
  return (
    <>
      <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui text container" id="midCenter">
          <h1 className="ui inverted header">Images-Library</h1>
          <h2>As easy as it can be ...</h2>
          <NavLink to="/show-galleries">
            <div className="ui huge primary button" id="topButton">
              "Show galleries"
              <i className="right arrow icon" />
            </div>
          </NavLink>
          <NavLink to="/create-gallery">
            <div className="ui huge primary button" id="topButton">
              "Create Gallery"
              <i className="right arrow icon" />
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Home;
