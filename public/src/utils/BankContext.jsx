import { createContext, useContext, useState } from "react";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
  

const BankContext = createContext();

export const useBankContext = () => useContext(BankContext);

export const BankProvider = ({ children }) => {
    const [bank, setBank] = useState({
        loggedInUser: null
    });

    const setLoggedInUser = (user) => {
        setBank({
            loggedInUser: user,
        });
    }

    const firebaseConfig = {
        apiKey: "AIzaSyAHVz16jq7U9wqfPpECrnOa4QTfkCTP1aQ",
        authDomain: "courso-18766.firebaseapp.com",
        projectId: "courso-18766",
        storageBucket: "courso-18766.appspot.com",
        messagingSenderId: "224457010172",
        appId: "1:224457010172:web:ec0bd6b7cadd156ec36079"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    return (
        <BankContext.Provider value={{
            bank,
            setLoggedInUser,
            auth,
        }}>
            {children}
        </BankContext.Provider>
    );
}

export const Card= (props)=> {
    function classes(){
      const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
      const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
      return 'card border-danger border-5 mb-3 mx-auto position-absolute start-50 translate-middle' + bg + txt;
    }

    function size(){
        const width = props.width;
        const height = props.height;
        return {width: + width + 'rem', height: + height + 'px' };
    }

    return (
      <div className={classes() } style={size()} >
        <div className="card-header">{props.photo} {props.header}</div>
        <div className="card-body">
          {props.title && (<div className="card-title">{props.title}</div>)}
          {props.text && (<div className="card-text">{props.text}</div>)} 
          {props.body}
          {props.status && (<div id='createStatus'>{props.status}</div>)}
        </div>
      </div>    
    );    
}
