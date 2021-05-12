// style
import 'index.css';
import css from 'style/App.module.css';
// header and navbar
import Header from './Header';
import Navbar from './Navbar';
// main page
import Home from './Home';
import Explore from './Explore';
import NewPost from './NewPost';
import Activity from './Activity';
import Profile from './Profile';
// others
import React, {useState} from 'react';
import uniqueId from 'utils/uniqueId';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
// data
import initStore from 'utils/initialStore';
import StoreContextProvider from 'contexts/StoreContext';


function App(props) {
    return(
    <Router basename={process.env.PUBLIC_URL}>
        <StoreContextProvider>
            <div className={css.container}>
                <Header/>
                <div className={css.content}>
                    <Switch>
                        <Route path='/explore'>
                            <Explore />
                        </Route>

                        <Route path='/new-post'>
                            <NewPost />
                        </Route>

                        <Route path='/activity'>
                            <Activity />
                        </Route>

                        <Route path='/profile/:userId?'>
                            <Profile />
                        </Route>

                        <Route path='/:postId?'>
                            <Home />
                        </Route>
                    </Switch>
                </div>
                <Navbar />
            </div>
        </StoreContextProvider>
    </Router>
    );
}


export default App;
