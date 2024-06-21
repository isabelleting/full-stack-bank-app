import { useBankContext } from "../utils/BankContext";

function MyNavbar(){

  const { bank } = useBankContext();

  return(
  <>
  <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-white">
    <div className="container-fluid">
      <a className="navbar-brand" id="nav-top" href="#">
      <img src="bank.png" alt="bank photo" width="30" height="30"/>Belle Bank 
      </a>
      <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" id="createaccount" href="#/CreateAccount/">Create Account</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="login" href="#/login/">Login</a>
          </li>
          { bank.loggedInUser && ( 
            <>
              <li className="nav-item">
                <a className="nav-link" id="deposit" href="#/deposit/">Deposit</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="withdraw" href="#/withdraw/">Withdraw</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="data" href="#/data/">Balance</a>
              </li>  
          </>
          )} 
        </ul>
      </div>
    </div>
  </nav>
  </> 
  );
}

export default MyNavbar;