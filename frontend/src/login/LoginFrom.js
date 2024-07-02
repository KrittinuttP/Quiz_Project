import React, { useState } from 'react';
import './css/LoginFrom.css'; // Import your CSS file for styling
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';

function LoginFrom() {
    const [signMode, setSignMode] = useState('SignIn');
    const [UserAuth, setUserAuth] = useState();
    return (

        <div className="login-container">
            <div className="card-box">
                {
                    (signMode === 'Home' ?
                        <Home UserAuth={UserAuth} setSignMode={setSignMode} />
                        :
                        signMode === 'SignIn' ?
                            <SignIn setSignMode={setSignMode} UserAuth={UserAuth} setUserAuth={setUserAuth} /> :
                            <SignUp setSignMode={setSignMode} />
                    )
                }



            </div>
        </div >
    );
}

export default LoginFrom;