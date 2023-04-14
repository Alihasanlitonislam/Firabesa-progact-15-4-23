import React, { useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from '../Firabesa/Firabesa.init';
const Login = () => {
    const [user, setUser] = useState(null)
    const googlePropvider = new GoogleAuthProvider()
    const githubProvider = new GithubAuthProvider()
    const auth = getAuth(app)

    const googleHendela = () => {
        signInWithPopup(auth, googlePropvider)
            .then(result => {
                const loginUser = result.user;
                console.log(loginUser)
                setUser(loginUser)
            })
            .catch(error => {
                console.log(error.message)
            })
    }
    const googleLogout = () => {
        signOut(auth)
            .then(result => {
                console.log('google logout in successfull', result);
                setUser(null)
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    const githubLogin = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                const githubUser = result.user;
                setUser(githubUser)
            })
            .catch(error => {
                console.log(error.message)
            })
    }
    const githubLogOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result);
                setUser(null)
            })
            .catch(error => {
                console.log(error.message)
            })
    }
    console.log(user);
    return (
        <div>
            {
                user ? <div>
                    <button onClick={googleLogout}>Google Logout</button>
                    <button onClick={githubLogOut}>Github Logout</button>
                </div>
                    : <div>
                        <button onClick={googleHendela}>Google Login</button>
                        <button onClick={githubLogin}>Github Login</button>
                    </div>

            }
            {
                user && <div>
                    <h1>{user.displayName}</h1>
                    <h1>{user.email}</h1>
                    <img src={user.photoURL} alt="" />
                </div>
            }
        </div>
    );
};

export default Login;