import { useState, useEffect } from "react";
import { useBankContext, Card } from "../utils/BankContext";

function CreateAccount(){
  const [show, setShow]           = useState(true);
  const [name, setName]           = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { bank, setLoggedInUser, auth } = useBankContext();

  useEffect(() => {
    if(bank.loggedInUser){
      setShow(false);
    }
  },[bank]);

  function validate(field, label){
    setErrorMessage('');

      if (!field) {
        setErrorMessage('Please enter ' + label);
        return false;
      }
      return true;
  }

  function validatePass(field){
    setErrorMessage('');

    if(field.trim().length < 8){
      setErrorMessage('Password must be at least 8 characters');
      return false;
    } 
    return true;
  }

  const handleChange = (e) =>{
    const { name, value } = e.target;
    if (name==='name') {
      setName(value);
    }
    if (name==='email'){
      setEmail(value);
    }
    if (name==='password') {
      setPassword(value);
    }

    setErrorMessage('')
  }

  function handleCreate(event){
    event.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');
   
    if (!validate(name,     'Full Name'))   return;
    if (!validate(email,    'Email'))       return;
    if (!validate(password, 'Password'))    return;
    if (!validatePass(password))            return;

    fetch(`/account/create/${name}/${email}/${password}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            setSuccessMessage('Account Created!')

            setLoggedInUser(data);
            setShow(false);
        } catch(err) {
            console.log('err:', text); 
            setErrorMessage('User already exists. Please Sign in.');
            setName('');
            setEmail('');
            setPassword('');
        }
    });
  }    

  function clearForm(){
    setName('');
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
        photo={(<img src="bank.png" width="40px"/>)}
        header="Create Account"
        body={ show ? (
                  <>
                  <form onSubmit={handleCreate}>
                      <div className="mb-3">
                          <label htmlFor="iputUsername" className="form-label">Name</label>
                          <input type="text" className="form-control" id="inputUsername" name="name" value={name} onChange={e => handleChange(e)} />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="inputEmail" className="form-label">Email</label>
                          <input type="text" className="form-control" id="inputEmail" name="email" value={email} onChange={e => handleChange(e)} />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="inputPassword" className="form-label">Password</label>
                          <input type="password" className="form-control" id="inputPassword" name="password" value={password} onChange={e => handleChange(e)} />
                      </div>
                      <button type="submit" disabled={!name && !email && !password} id="account-submit-btn" className="btn btn-light">Create Account</button> 
                      {errorMessage && (
                          <div className="mt-2 alert alert-danger" id="errorAlert" role="alert">
                              {errorMessage}
                          </div>
                      )}
                      <br></br>
                  </form>
                  </>
               ):(
                  <> 
                      <br></br>
                    {successMessage && (
                        <div className="mt-2 alert alert-success" id="successAlert" role="alert">{successMessage}</div>
                    )} 
                      <br></br>
                   {bank.loggedInUser && (
                        <div className="alert alert-light" id="sign-in-alert" role="alert">
                            <strong>Welcome: {bank.loggedInUser.name}</strong>            
                        </div>      
                    )}
                      <br></br>
                  <button type="submit" id="account-submit-btn" className="btn btn-light" onClick={clearForm}>Sign Out</button>
                      <br></br>
                      <br></br>
                  </>
             )}            
    />
  )
}

export default CreateAccount;