import css from 'style/Post.module.css';

import publicURL from 'utils/publicURL';
import timespan from 'utils/timespan';
import PostThumbnail from './PostThumbnail';
import React from 'react';

export default Post;

/*
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

function Post(props) {
    
    function handleLikeChange(self, postId) {
        if (!self) {
            // if currently unlike => like
            return props.onLike(postId);
        } else {
            // if ucrrently liked => unlike
            return props.onUnlike(postId);
        }
    }

    return (
        <div className={css.post}>
            <div className={css.user}>
                <img className={css.userPhoto} src={publicURL(props.user.photo)} alt={props.user.id}/>
                <strong className={css.userName}>{props.user.id}</strong>
            </div>
                
            {/* <img className={css.postPhoto} src={publicURL(props.post.photo)} alt="Photo"/> */}

            <div className={css.postPhoto}>
                <PostThumbnail src={props.post.photo} alt="Photo"/>
            </div>

            <div className={css.like}>
                <button>
                    <img src={(props.likes.self) ? publicURL("/assets/unlike.svg"):publicURL("/assets/like.svg")}
                        onClick={()=>handleLikeChange(props.likes.self, props.post.id)}/>
                </button>
                <button>
                    <img src={publicURL("/assets/comment.svg")}/>
                </button>
                <strong>{`${props.likes.count} like${(props.likes.count>=2) ? "s":""}`}</strong>
            </div>

            <div className={css.comments}>
                <ul>
                    <li><strong>{props.post.userId}</strong> {props.post.desc}</li>
                    {props.comments.map((comment, i) => (
                        <li key={i}>
                            <strong>{comment.userId}</strong> {comment.text}
                        </li>
                    ))}
                </ul>
            </div>

            <div className={css.timespan}>
                {timespan(props.post.datetime)} ago
            </div>
        </div>
    );
}