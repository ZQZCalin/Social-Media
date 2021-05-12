import css from 'style/Post.module.css';

import publicURL from 'utils/publicURL';
import timespan from 'utils/timespan';
import PostThumbnail from './PostThumbnail';
import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import { StoreContext } from 'contexts/StoreContext';

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
    // state hook
    const [toggleComment, setToggleComment] = useState(false);
    const [comment, setComment] = useState("");
    const {addLike, removeLike, addComment} = useContext(StoreContext);
    
    function handleLike() {
        if (!props.likes.self) {
            // if currently unlike => like
            addLike(props.post.id);
        } else {
            // if ucrrently liked => unlike
            removeLike(props.post.id);
        }
    }

    function handleAddComment() {
        setToggleComment(!toggleComment);
    }

    function handleCommentHeight(textarea) {
        const style = window.getComputedStyle(textarea);
        textarea.style.height = 0;
        // line height & scroll height
        let lineHeight = (style.lineHeight==="normal") ?
            parseInt(style.fontSize) : parseInt(style.lineHeight);
        const scrollHeight = textarea.scrollHeight;
        // change height
        const numRow = Math.round(
            Math.max(1, scrollHeight / lineHeight)
        );
        const fontRatio = 56/48; // This ratio is the "mysterious" line spacinig-ratio
        textarea.style.height = numRow * lineHeight * fontRatio + "px";
    }

    function handleSubmitComment(event) {
        // validation
        if (comment.trim().length == 0) {

        } else {
            // set state
            addComment(props.post.id, comment);
            // reset comment
            setToggleComment(false);
            setComment("");
        }
        // disable refresh
        event.preventDefault();
    }

    return (
        <div className={css.post}>
            <div className={css.user}>
                <img className={css.userPhoto} src={publicURL(props.user.photo)} alt={props.user.id}/>
                <Link to={'/profile/'+props.user.id} className={css.userName}>
                    <strong>{props.user.id}</strong>
                </Link>
            </div>
                
            {/* <img className={css.postPhoto} src={publicURL(props.post.photo)} alt="Photo"/> */}

            <div className={css.postPhoto}>
                <PostThumbnail src={props.post.photo} alt="Photo"/>
            </div>

            <div className={css.like}>
                <button>
                    <img src={(props.likes.self) ? 
                        publicURL("/assets/unlike.svg")
                        :publicURL("/assets/like.svg")}
                        onClick={handleLike}
                    />
                </button>
                <button>
                    <img src={publicURL("/assets/comment.svg")}
                        onClick={handleAddComment}/>
                </button>
                <strong>{`${props.likes.count} like${(props.likes.count>=2) ? "s":""}`}</strong>
            </div>

            <div className={css.comments}>
                <ul>
                    {props.post.desc!='' &&
                        <li>
                            <Link to={'/profile/'+props.post.userId}><strong>{props.post.userId}</strong> </Link>
                            {props.post.desc}
                        </li>
                    }
                    {props.comments.map((comment, i) => (
                        <li key={i}>
                            <Link to={'/profile/'+comment.userId}>
                                <strong>{comment.userId} </strong> 
                            </Link>
                            {comment.text}
                        </li>
                    ))}
                </ul>
            </div>

            <div className={css.timespan}>
                {timespan(props.post.datetime)} ago
            </div>

            {toggleComment &&
            <form className={css.addComment}>
                {/* <input type="text"
                    maxLength = "300"
                    value={comment}
                    placeholder="Add a new comment..."
                    onChange={e => setComment(e.target.value)}/> */}
                <textarea
                    maxLength = "300"
                    value = {comment}
                    rows = "1"
                    placeholder = "Add a new comment..."
                    onChange = {e => {
                        setComment(e.target.value); 
                        handleCommentHeight(e.target);
                    }}
                />
                <button type="submit" onClick={handleSubmitComment}>Post</button>
            </form>
            }
        </div>
    );
}