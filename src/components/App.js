import { useState, useEffect } from "react";
//import AppRouter from "./Router"
import AppRouter from "components/Router";
import { authService } from "fbase"

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // eslint-disable-line no-unused-vars
  const [userObj, setUserObj] = useState(null); // eslint-disable-line no-unused-vars

  //setInterval(() => console.log(authService.currentUser), 2000);
  useEffect(()=> {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(user);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
        setUserObj(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
          <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> 
          //<AppRouter userObj={userObj}/> 
      ) : ( "initializing...")}
    </>
  )
}

export default App; 
