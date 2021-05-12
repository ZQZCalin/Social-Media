import css from 'style/Home.module.css';
import publicURL from 'utils/publicURL';
import Post from './Post'
import React, { useContext } from 'react';
import {useParams} from 'react-router-dom';
import { StoreContext } from 'contexts/StoreContext';

export default Home;

/* Data Structure
Post.props = {
    user: {
		id:"judy",
		photo:"/assets/user1.png",
	},
	post: {
		id:"post-1",
        userId:"judy",
        photo:"/assets/post1.png",
        desc:"#zootopia #excited",
		datetime: "2020-02-09T22:45:28Z"
	},
	likes: {
		self: true,
		count:1
	},
	comments: [
		{
            userId:"nick",
            text:"Welcome to Zootopia!"
        },
        {
            userId:"judy",
            text:"Thanks!😁Looking forward to meeting you!"
        }
	]
} 
*/

function Home(props) {
    const {store} = useContext(StoreContext);
    const {postId} = useParams();

    return (
        <div>
            {
                store.posts
                .filter(post => !postId || post.id===postId) // filter post
                .sort((a,b) => new Date(b.datetime) - new Date(a.datetime)) // sort by time
                .map(post => 
                    <Post key = {post.id}
                        user = {findUser(store.users, post)}
                        likes = {findLikes(store.likes, post, store.currentUserId)}
                        post = {post}
                        comments = {findComments(store.comments, post)}
                    />
                )
            }
        </div>
    );
}

function findUser(users, post) {
    return users.find(user => user.id === post.userId);
}

function findLikes(likes, post, currentUserId) {
    const likeThisPost = likes.filter(like => like.postId === post.id);
    return {
        self: likeThisPost.some(like => like.userId === currentUserId),
        count: likeThisPost.length,
    };
}

// sorted by time
function findComments(comments, post) {
    return comments.filter(comment => comment.postId === post.id)
        .sort((a,b) => new Date(a.datetime) - new Date(b.datetime));
}