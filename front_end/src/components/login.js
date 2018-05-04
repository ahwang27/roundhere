import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import decode from 'jwt-decode';
import jwt from 'jsonwebtoken';

// Components imported
import TitleBar from './title-bar'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            correctPassword: false,
            registerClicked: false,
            loginClicked: false
        }
    }



    logIn = async () => {
        // send login info to User API
        try {
            // login call
            let response = await axios.post(`http://localhost:4000/users/login`, {
                username: this.state.username,
                password: this.state.password
            });

            // result of login
            const correctPassword = response.data.success;
            const loginClicked = true;

            if (correctPassword) {
                // save token to computer
                localStorage.setItem('bearer', response.data.token);
            }

            this.setState({
                correctPassword,
                loginClicked
            });

        } catch (err) {
            console.log("AXIOS ERROR:", err.message);
        }
    }

    register() {
        this.setState({ registerClicked: true });
    }



    render() {
        if (this.state.correctPassword) {
            return (
                <Redirect to="/dashboard" />
            )
        }

        if (this.state.registerClicked) {
            return (
                // <Redirect to="/register" />
                console.log('register button clicked')
            )
        }

        return (
            <div className="container col-md-6 card" style={{ marginTop: '5em', backgroundColor: 'lightblue' }} >
                <div className="container col-md-auto" style={{ marginTop: '2em' }} >
                    <TitleBar />
                </div>

                <div className="col-md-auto" style={{ marginTop: '2em' }}>
                    <form className="col-sm-12">
                        {/* Username Input Field */}
                        <div className="form-group row" >
                            <label htmlFor="username-input" className="col-md-3 col-form-label">Username</label>
                            <div className="col-md-9">
                                <input
                                    onChange={(e) => { this.setState({ username: e.target.value }) }}
                                    value={this.state.username}
                                    className="form-control"
                                    placeholder="username" />
                            </div>

                        </div>
                        {/* Email Input Field End */}
                        {/* Password Input Field */}
                        <div className="form-group row " >
                            <label htmlFor="password-input" className="col-md-3 col-form-label">Password</label>
                            <div className="col-md-9">
                                <input onChange={(e) => { this.setState({ password: e.target.value }) }} value={this.state.password} type="password" className="form-control" id="password-input" placeholder="password" />
                            </div>
                        </div>
                        {/* Password Inout Field End */}

                        <div>
                            {
                                (!this.state.correctPassword && this.state.loginClicked) ? <div style={{ color: 'red' }} >incorrect username or password</div> : ""
                            }
                        </div>

                    </form>
                    {/* Log In Button */}
                    <div className="row justify-content-center" style={{ marginTop: '1.5em' }} >
                        <button
                            onClick={e => this.logIn()}
                            className="btn btn-success"
                        >Log In</button>
                    </div>
                    {/* Log In Button End */}
                    <div className="text-center" style={{ marginTop: '0.5em', marginBottom: '2em' }} >
                        <a href="null" style={{ color: 'gray' }} onClick={e => this.register()}  >Register New User</a>
                    </div>
                </div>
            </div>
        )
    }


}

export default Login