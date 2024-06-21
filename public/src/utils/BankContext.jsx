import { createContext, useContext, useState } from "react";

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

    return (
        <BankContext.Provider value={{
            bank,
            setLoggedInUser,
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
