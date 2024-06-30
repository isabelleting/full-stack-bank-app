import { useState, useEffect } from "react";
import { useBankContext, Card } from "../utils/BankContext";

import {
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [disable, setDisable]     = useState(false);
    const [show, setShow] = useState(true);
    const { bank, setLoggedInUser, auth } = useBankContext();

    useEffect(() => {
        if(bank.loggedInUser){
          setShow(false);
        }
    },[bank]);

    const handleChange = (event) =>{
        const { name, value } = event.target;
        if (name==='email') {
            setEmail(value);
        }
        else {
            setPassword(value);
        }
        
        if(!value){
            setDisable(false);
        }
        else{
            setDisable(true)
        }

        setErrorMessage('');
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        setErrorMessage('');
        setSuccessMessage('');

        if(!email){
            setErrorMessage('Pleast enter Email')
            return false;
        } 
        if(password.trim().length < 8){
            setErrorMessage('Password must be at least 8 characters');
            return false;
        } 

        fetch(`/account/login/${email}/${password}`)
        .then(response => response.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
                setDisable(false);
                setSuccessMessage('You have signed in!');
                setEmail('');
                setPassword('');
                setShow(false);

                setLoggedInUser(data);

            } catch(err) {
                console.log('err:', text);

                if(text === 'Login failed: wrong password'){
                    setErrorMessage('Incorrect Password');
                }
                if(text === 'Login failed: user not found'){
                    setErrorMessage('Could not find user!');
                }
            }
        });
    }

    const handleGoogleSubmit = (event) => {
        console.log("Google sign in clicked");
        event.preventDefault();

        setSuccessMessage('');
        
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            const user = result.user;

            fetch(`/account/google/${user.displayName}/${user.email}`)
            .then(response => response.text())
            .then(text => {
                try {
                    const data = JSON.parse(text);
                    setSuccessMessage('You have signed in!')
        
                    setLoggedInUser(data);
                } catch(err) {
                    console.log('err:', text);
                }
            });

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }
   
    auth.onAuthStateChanged((firebaseUser) => {
        if (firebaseUser){
            console.log("Google user signed in");
        }
        else {
            console.log("Google user signed out");
        }
    });

    function clearForm(){
        setEmail('');
        setPassword('');
        setShow(true);
        
        auth.signOut();
        setLoggedInUser('');
      }
      
    return (
        <Card
            width="55"
            txtcolor="black"
            photo={(<img src="bank.png" width="40px" height="40"/>)}
            header= {show ? ( 
                "Sign in"
            ):(
                "Sign Out"
            )}
            body={ show ? (
                <form>
                    <div className="mb-3">
                        <label htmlFor="inputUsername" className="form-label">Email</label>
                        <input type="text" className="form-control" id="inputUsername" name="email" value={email} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPassword" className="form-label">Password</label>
                        <input type="password" className="form-control" id="inputPassword" name="password" value={password} onChange={handleChange} />
                    </div>
                    <button type="button" id="signin-submit-btn" disabled={!disable} className="btn btn-light" onClick={handleSubmit}>Sign In</button>
                    <br></br>
                    <br></br>
                    <button type="button" id="google-submit-btn" className="btn btn-light" onClick={handleGoogleSubmit}>Sign In with Google</button>
                    <br></br>
                    {errorMessage && (
                        <div className="mt-2 alert alert-danger" id ="errorAlert" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <br></br>
                </form>
            ):(
                <>
                     <br></br>
                    {successMessage && (
                        <div className="alert alert-success" id="successAlert" role="alert">
                             <strong>{successMessage}</strong>            
                        </div> 
                    )}
                     <br></br>
                    {bank.loggedInUser && (
                        <div className="alert alert-light" id="sign-in-alert" role="alert">
                            <strong>Welcome: {bank.loggedInUser.name}</strong>            
                        </div>      
                     )}
                    <br></br>
                    <button type="button" id="account-submit-btn" className="btn btn-light" onClick={clearForm}>Sign Out</button>
                    <br></br>
                    <br></br>
                </>
             )}
        />
    )
};

export default Login;