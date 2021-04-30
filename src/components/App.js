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

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "home",
        };
        this.setPage = this.setPage.bind(this);
    }

    setPage(targetPage) {
        this.setState({
            page: targetPage.toLowerCase()
        });
        // Example: asynchronous update
        if (false) console.log(this.state.page); // state is not updated by now
    }

    renderPage(page) {
        switch(page) {
            case "home": return <Home/>;
            case "explore": return <Explore />;
            case "newpost": return <NewPost />;
            case "activity": return <Activity />;
            case "profile": return <Profile />;
            default: return <Home/>;
        }
    }

    render() {
        // Example: render will wait until state has been changed
        if (false) console.log(this.state.page); // state is updated now
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
