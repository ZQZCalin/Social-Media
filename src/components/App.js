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
// data
import initStore from 'utils/initialStore';


function App(props) {
    const [page, setPage] = useState("home");
    const [store, setStore] = useState(initStore);

    // debugger
    if (false) console.log(page); // page
    if (false) console.log(store); // store

    // keep these functions in App:
    // stay in scope of states
    function renderMain(page) {
        switch(page.toLowerCase()) {
            case "home": 
                return <Home store={store}
                onLike={addLike} onUnlike={removeLike}
                onComment={addComment}/>;
            case "explore": 
                return <Explore />;
            case "newpost": 
                return <NewPost onSubmit={addPost} onPageChange={setPage}/>;
            case "activity": 
                return <Activity />;
            case "profile": 
                return <Profile store={store}/>;
            default: 
                return null;
        }
    }

    function addLike(postId) {
        const newLike = {
            userId: store.currentUserId,
            postId: postId,
            datetime: new Date().toISOString(),
        };
        
        setStore({
            ...store,
            likes: store.likes.concat(newLike) 
        });
    }
    
    function removeLike(postId) {
        const unlikedList = store.likes
            .filter(like => !(like.userId===store.currentUserId && like.postId===postId));
        setStore({
            ...store,
            likes: unlikedList,
        });
    }

    function addComment(postId, text) {
        const newComment = {
            userId: store.currentUserId,
            postId: postId,
            text: text,
            datetime: new Date().toISOString(),
        };
        setStore({
            ...store,
            comments: store.comments.concat(newComment),
        });
    }

    function addPost(photo, description) {
        const newPost = {
            id: uniqueId("post-"),
            userId: store.currentUserId,
            photo: photo,
            desc: description,
            datetime: new Date().toISOString(),
        };
        setStore({
            ...store,
            posts: store.posts.concat(newPost),
        });
    }

    return(
        <div className={css.container}>
            <Header/>
            <div className={css.content}>
                {renderMain(page)}
            </div>
            <Navbar onNavChange={setPage}/>
        </div>
    );

}


export default App;
