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
import React from 'react';
// data
import initStore from 'utils/initialStore';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "home",
            store: initStore,
        };
        this.setPage = this.setPage.bind(this);
        this.addLike = this.addLike.bind(this);
        this.removeLike = this.removeLike.bind(this);
    }

    setPage(targetPage) {
        this.setState({
            page: targetPage.toLowerCase()
        });
        // Example: asynchronous update
        if (false) console.log(this.state.page); // state is not updated by now
    }

    addLike(postId) {
        this.setState(state => {
            const newLike = {
                userId: state.store.currentUserId,
                postId: postId,
                datetime: new Date().toISOString(),
            };
            return (
            {
                store: {
                    // ... syntax: spread out properties
                    ...state.store,
                    likes: state.store.likes.concat(newLike) 
                    // push() changes the array directly, so not valid here
                    // instead, we should use concat()
                }
            });
        });
    }

    removeLike(postId) {
        this.setState(state => {
            const unlikedList = state.store.likes
                .filter(like => !(like.userId===state.store.currentUserId && like.postId===postId));
            return ({
                store: {
                    ...state.store,
                    likes: unlikedList,
                }
            });
        });
    }

    renderPage(page) {
        switch(page) {
            case "home": 
                return this.renderHome();
            case "explore": 
                return <Explore />;
            case "newpost": 
                return <NewPost />;
            case "activity": 
                return <Activity />;
            case "profile": 
                return <Profile store={this.state.store}/>;
            default: 
                return this.renderHome();
        }
    }

    renderHome() {
        return <Home store={this.state.store}
            onLike={this.addLike} onUnlike={this.removeLike}/>;
    }

    render() {
        // Example: render will wait until state has been changed
        if (false) console.log(this.state.page); // state is updated now
        if (false) console.log(this.state.store); // debugger
        return(
            <div className={css.container}>
                <Header/>
                <div className={css.content}>
                    {this.renderPage(this.state.page)}
                </div>
                <Navbar onNavChange={this.setPage}/>
            </div>
        );
    }
}

export default App;
