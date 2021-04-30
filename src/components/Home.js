import css from 'style/Home.module.css';
import publicURL from 'utils/publicURL';
import Post from './Post'
import React from 'react';

export default Home;

var post = {
	user:{
		id:"judy",
		photo:"/assets/user1.png",
	},
	post:{
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
	comments:[
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

function Home() {
    return (
        <Post
            user={post.user}
            likes={post.likes}
            post={post.post}
            comments={post.comments}
        />
    );
}

