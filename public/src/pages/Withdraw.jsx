import { useState, useEffect } from "react";
import { useBankContext, Card } from "../utils/BankContext";

function Withdraw(){
  const [deposit, setDeposit] = useState('');
  const [validTransaction, setValidTransaction] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [login, setLogin] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const { bank } = useBankContext();
  const [amount, setAmount] = useState(0);

  let status = `Account Balance: $ ${amount} `;

  useEffect(() => {
    if(bank.loggedInUser){

      fetch(`/account/find/${bank.loggedInUser.email}`)
      .then(response => response.text())
      .then(text => {
          try {
              const data = JSON.parse(text);
              setAmount(data[0].balance);
          } catch(err) {
              console.log('err:', text);
          }
      });
      setLogin(true);
    }
  },[bank]);

  const handleChange = (event) => {
    setDeposit(event.target.value);

    setErrorMessage('');
    setSuccessMessage('');
    setVisibleAlert(false)

    if(!event.target.value){
      setErrorMessage('');
      return setValidTransaction(false);
    }

    else if (Number(event.target.value) <= 0){
      setErrorMessage('Please enter positive numbers');
      return setValidTransaction(false);
    } 

    else if (Number(event.target.value) > amount){
      setErrorMessage('Insuffcient Account Balance');
      return setValidTransaction(false);
    } 
   
   else if(isNaN(event.target.value)){
      setErrorMessage('Please enter numbers only');
      return setValidTransaction(false);
   }

    else{
      return setValidTransaction(true);
    }    
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSuccessMessage('');

    fetch(`/account/update/${bank.loggedInUser.email}/-${Number(deposit)}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            setSuccessMessage(`-$${deposit} Withdraw Processed!`);
            setVisibleAlert(true);
            setValidTransaction(false);
  
            setAmount(data.value.balance - (Number(deposit))); 
            setDeposit(''); 
        } catch(err) {
            console.log('err:', text);
            setErrorMessage('Withdraw Failed!')
        }
    });
  };

  return (       
    <Card
      width="55"
      height="400"
      txtcolor="black"
      photo={(<img src="bank.png" width="40px"/>)}
      header=" Withdraw"
      body={ login ? (
                <form onSubmit={handleSubmit}>
                  <br></br>
                  <br></br>
                  <h2 id="total">{status}</h2>
                  <h3> Welcome: {bank.loggedInUser.name}</h3> 
                    <label className="label huge">
                        <h3>Withdraw</h3>
                        <input id="number-input" type="number" width="200" onChange={handleChange} value={deposit}></input>
                        <button type="submit"  disabled={!validTransaction} id="submit-input-btn" className="btn btn-light">Withdraw</button>
                    </label>
                    {errorMessage && (
                        <div className="mt-2 alert alert-danger" id="errorAlert" role="alert">
                          <strong>{errorMessage}</strong>
                        </div>                     
                    )}
                    {visibleAlert && (
                        <div className="alert alert-success alert-dismissible col-md-3 fade show" id="successAlert" role="alert">
                          <strong>{successMessage}</strong>
                          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setVisibleAlert(false)}></button>
                        </div>
                    )}
                </form>
              ):(
                <div>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <h3>Please sign in or create an account to make a withdraw.</h3>
                </div>
         )}
    />    
  );
};

export default Withdraw;
  