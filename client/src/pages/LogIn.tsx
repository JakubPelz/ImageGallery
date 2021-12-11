import React, { SyntheticEvent, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPaswword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post('http://localhost:8000/api/login', {
      email,
      password,
    });
    setRedirect(true);
  };
  if (redirect) {
    return <Navigate to={'/'} />;
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
                    <label>Email</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      id="email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      id="password"
                      required
                      onChange={(e) => setPaswword(e.target.value)}
                    />
                  </div>
                  <button className="ui button" type="submit">
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

export default LogIn;
