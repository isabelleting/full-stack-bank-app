import { useBankContext, Card } from "../utils/BankContext";
import { Row, Col, Container } from "react-bootstrap";
import { useState, useEffect } from "react";

const Data = () => {
  const { bank } = useBankContext();
  const [amount, setAmount] = useState('');

    useEffect(() => {
      if(bank.loggedInUser){
        
        fetch(`/account/find/${bank.loggedInUser.email}`)
        .then(response => response.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
                console.log('User:', data[0]);
                setAmount(data[0].balance);
    
            } catch(err) {
                console.log('err:', text);
            }
        });
      }
    },[bank]);

  return (
    <>
      <Card
        width="60"
        txtcolor="black"
        photo={<img src="bank.png" width="40px"/>}
        header="Bank Balance"
        body={
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
        }
      />
    </>
  );
};

export default Data;
