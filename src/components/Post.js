import css from 'style/Post.module.css';

import publicURL from 'utils/publicURL';
import timespan from 'utils/timespan';
import React from 'react';

export default Post;

function Post(props) {
    return (
        <div className={css.post}>
            <div className={css.user}>
                <img className={css.userPhoto} src={publicURL(props.user.photo)} alt={props.user.id}/>
                <strong className={css.userName}>{props.user.id}</strong>
            </div>
                
            <img className={css.postPhoto} src={publicURL(props.post.photo)} alt="Photo"/>

            <div className={css.like}>
                <button>
                    <img src={(props.likes.self) ? publicURL("/assets/unlike.svg"):publicURL("/assets/like.svg")}/>
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