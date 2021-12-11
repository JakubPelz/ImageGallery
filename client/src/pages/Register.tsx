import React, { Component, SyntheticEvent } from 'react';
import '../components/assets/register.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

class Register extends Component {
  first_name = '';
  last_name = '';
  email = '';
  password = '';
  password_confirm = '';
  state = {
    redirect: false,
  };

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post('http://localhost:8000/api/register', {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password,
      password_confirm: this.password_confirm,
    });

    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to={'/login'} />;
    }
    return (
      <div>
        <div className="ui vertical footer segment" id="margin-top">
          <div className="ui center aligned container">
            <div className="ui stackable inverted divided grid">
              <div className="eight wide column">
                <div className="ui left aligned container">
                  <form className="ui form" onSubmit={this.submit}>
                    <div className="field">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="First name"
                        placeholder="First Name"
                        id="First name"
                        required
                        onChange={(e) => (this.first_name = e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="Last name"
                        placeholder="Last Name"
                        id="Last name"
                        required
                        onChange={(e) => (this.last_name = e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label>Email</label>
                      <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        id="email"
                        required
                        onChange={(e) => (this.email = e.target.value)}
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
                        onChange={(e) => (this.password = e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label>Password Confirm</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Password Confirm"
                        id="password_confirm"
                        required
                        onChange={(e) =>
                          (this.password_confirm = e.target.value)
                        }
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
  }
}

export default Register;
