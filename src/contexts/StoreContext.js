import React, { createContext, useEffect, useState } from 'react';
import initialStore from 'utils/initialStore';
import uniqueId from 'utils/uniqueId';

export const StoreContext = createContext();

const StoreContextProvider = (props) => {

    const [store, setStore] = useState(() => {
        return JSON.parse(window.localStorage.getItem('store')) || initialStore;
    });

    useEffect(()=>{
        window.localStorage.setItem('store', JSON.stringify(store));
    }, [store]);

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

    function addFollow(followId) {
        const newFollow = {
            userId: followId,
            followerId: store.currentUserId,
        }
        setStore({
            ...store,
            followers: store.followers.concat(newFollow),
        });
    }

    function removeFollow(followId) {
        const removedFollowList = store.followers
            .filter(follow => 
                !(follow.userId===followId && follow.followerId===store.currentUserId)
            );
        setStore({
            ...store,
            followers: removedFollowList,
        });
    }

    return (
        <StoreContext.Provider value={{
            store, addLike, removeLike, addComment, addPost, addFollow, removeFollow
        }}>
            {props.children}
        </StoreContext.Provider>
    );
}

export default StoreContextProvider;