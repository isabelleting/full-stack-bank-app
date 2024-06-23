import { useState, useEffect } from "react";
import { Card, useBankContext, } from "../utils/BankContext";

function Home(){
  const [show, setShow] = useState(true);
  const { bank, setLoggedInUser, auth } = useBankContext();

  useEffect(() => {
    if(bank.loggedInUser){
      setShow(false);
    }
  },[bank]);

  function clearForm(){
    setShow(true);

    auth.signOut();
    setLoggedInUser('');
  }

  return ( 
      <Card
      txtcolor="black"
      width="60"
      photo={(<img src="bank.png" width="40px"/>)}
      header="Belle Bank"
      title= { show ? (
            <> <br></br> <h3>Welcome to Belle Bank</h3> </>
              ):(
            <> <br></br> <h3>Welcome to Belle Bank {bank.loggedInUser.name}.</h3> </> 
      )}
      text={ show ? ( 
            <h4>Please sign in or create an account to make a transaction.</h4>
            ):( 
            <>
            <br></br>
            <h4>Deposit, Withdraw, or Check Account Balance.</h4>
            <br></br>
            <button type="submit" id="account-submit-btn" className="btn btn-light" onClick={clearForm}>Sign Out</button>
            </>
      )}
      body={(<img src="bank.png" width="300px" className="img-fluid" alt="Bank Photo"/>)} 
    />    
  );  
}

export default Home;
  