import React from 'react';
import Giphy from './components/Giphy';
import "./App.css" 
import Signup from './components/Signup';
import AuthProvider from './contexts/AuthContext';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/Login';
import Profile from './components/Profile';

const App = () => {

    return (
        <div>
            <Router>

                <AuthProvider>
                    <Switch>
                        <Route path="/profile" component={Profile}/>
                        <Route exact path ="/" component={Giphy} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/login" component={Login} />
                    </Switch> 
                </AuthProvider>

            </Router>
        </div>
    )
}
export default App;