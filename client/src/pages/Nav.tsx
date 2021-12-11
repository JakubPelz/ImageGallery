import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="ui inverted vertical masthead center aligned segment">
      <div className="ui container">
        <div className="ui large secondary inverted pointing menu">
          <div className="left item">
            <Link to="/">
              <button className="ui inverted button" id="topButton">
                Home
              </button>
            </Link>
            <Link to="/create-gallery">
              <button className="ui inverted button" id="topButton">
                Create a Gallery
              </button>
            </Link>
            <Link to="/show-galleries">
              <button className="ui inverted button" id="topButton">
                Show Galleries
              </button>
            </Link>
          </div>
          <div className="right item">
            <Link to="/login">
              <button className="ui inverted button" id="topButton">
                Log in
              </button>
            </Link>
            <Link to="/register">
              <button className="ui inverted button" id="topButton">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
