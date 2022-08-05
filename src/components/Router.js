//import {useState} from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
//import { HashRouter as Router, Route, Switch } from "react-router-dom";
//import Auth from "../routes/Auth"
//import Home from "../routes/Home"
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "./Navigation";
import Profile from "components/Profile";


const AppRouter = ( {isLoggedIn, userObj }) => {
    //const [isLoggedIn, setIsLoggedIn] = useState(false); // eslint-disable-line no-unused-vars
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? (
                    <div
                        style={{
                            maxWidth: 890,
                            width: "100%",
                            margin: "0 auto",
                            marginTop: 80,
                            display: "flex",
                            justifyContent: "center",
                        }} >
                        <Route exact path="/">
                            <Home userObj = {userObj}/>
                        </Route>
                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                    </div>
                ) : (
                    <Route exact path="/">
                        <Auth />
                    </Route>
                )}
                <Redirect from="*" to="/" />
            </Switch>
        </Router>
    ); 
};

export default AppRouter;