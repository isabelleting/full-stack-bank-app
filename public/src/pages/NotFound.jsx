import { Card } from "../utils/BankContext";

function NotFound(){
    return (
        <Card
          width="40"
          height="250"
          txtcolor="black"
          photo={(<img src="bank.png" width="40px" height="40"/>)}
          header="Error"
          body={
            <div>
              <br></br>
              <br></br>
              <h2>Page Not Found</h2>
            </div>
          }
      />    
    ); 
  }

  export default NotFound;
  