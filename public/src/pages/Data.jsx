import { useBankContext, Card } from "../utils/BankContext";
import { Row, Col, Container } from "react-bootstrap";
import { useState, useEffect } from "react";

const Data = () => {
  const { bank } = useBankContext();
  const [amount, setAmount] = useState('');
  const [login, setLogin] = useState(false);

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

  return (
      <Card
        width="60"
        txtcolor="black"
        photo={<img src="bank.png" width="40px"/>}
        header="Bank Balance"
        body={ login ? (
              <Container>
                <Row>
                  <Col>
                  <br></br>
                    <h3>Welcome: {bank.loggedInUser.name}</h3>
                    <br></br>
                    <h4>Account Balance: ${amount}</h4>
                    <br></br>
                  </Col>
                </Row>
              </Container>
            ):(
              <div>
                  <br></br>
                  <br></br>
                  <h3>Please sign in or create an account to check account balance.</h3>
                  <br></br>
                  <br></br>
              </div>
        )}
      />
  );
};

export default Data;
