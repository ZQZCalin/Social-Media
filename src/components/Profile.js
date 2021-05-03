import css from 'style/Profile.module.css';
import React, {useState} from 'react';
import PostThumbnail from './PostThumbnail';
import publicURL from 'utils/publicURL';
import FancyFont from 'utils/FancyFont';
import {Link, useParams} from 'react-router-dom';

export default Profile;

/* Profile Structure
Profile.state = {
    user: {
        id:"judy",
        email:"judy@bc.edu",
        photo:"/assets/user1.png",
        name: "Judy Hopps",
        bio:"The first rabbit officer of the Zootopia Police Department. 
            Judy is determined to make the world a better place while breaking 
            preconceptions about other species.",    
    },
    follows: {
        followers: [
            "flash",
            ...
        ],
        followings: [
            "nick",
            ...
        ],
    },
    posts: [
        {
            id:"post-4",
            userId:"judy",
            photo:"/assets/post4.png",
            desc:"Just trying to make a #friend",
            datetime: "2020-02-06T22:45:28Z",
        },
        ...
    ],
}
*/

function Profile(props) {
    let {userId} = useParams();
    userId = userId ? userId : props.store.currentUserId;
    const user = findUser(props.store);
    const posts = findPosts(props.store);
    const follows = findFollows(props.store);
    const [toggleFollow, setToggleFollow] = useState(
        props.store.followers
        .some(follow => follow.userId===userId && follow.followerId===props.store.currentUserId)
    ); // false if currently unfollow

    function findUser(store) {
        return store.users.find(user => user.id === userId);
    }
    
    function findPosts(store) {
        return store.posts.filter(post => post.userId === userId);
    }
    
    function findFollows(store) {
        return ({
            followers: store.followers
                .filter(follow => follow.userId === userId)
                .map(follow => follow.followerId),
            followings: store.followers
                .filter(follow => follow.followerId === userId)
                .map(follow => follow.userId),
        });
    }

    function handleFollow() {
        if (!toggleFollow) {
            props.onFollow(userId) // follow
        } else {
            props.onUnfollow(userId) // unfollow
        }
        // change state
        setToggleFollow(!toggleFollow);
    }

    const stats = [
        {name: "post", value: posts.length},
        {name: "follower", value: follows.followers.length},
        {name: "following", value: follows.followings.length},
    ];

    if (false) console.log(user, posts, follows);

    return (<div className={css.container}>
        <div className={css.user}>
            <div className={css.userTitle}>
                <img className={css.userPhoto} src={publicURL(user.photo)} alt="photo"/>
                <div>
                    <FancyFont className={css.userName} style="lightBold">{user.id}</FancyFont>
                    {useParams().userId &&
                    <button onClick={handleFollow} 
                        className={!toggleFollow ? css.followBtn : css.unfollowBtn}
                    >
                        {!toggleFollow ? 'Follow' : 'Unfollow'}
                    </button>
                    }
                </div>
            </div>
            <div className={css.userBio}>
                <FancyFont style="semiBold">{user.name}</FancyFont> <br/>
                <FancyFont style="lightBold">{user.bio}</FancyFont>
            </div>
        </div>

        <div className={css.stats}>
            {
                stats.map(stat => (
                    <div className={css.statItem} key={stat.name}>
                        <span>{stat.value}</span> <br/>
                        <span>{stat.name+((stat.value>1)?"s":"")}</span>
                    </div>
                ))
            }
        </div>

        <div className={css.thumbnail}>
            {
                posts.map(post => (
                <Link to={'/'+post.id} key={post.id}>
                    <PostThumbnail src={post.photo} alt={post.id}/>
                </Link>
                ))
            }
        </div>
    </div>);
}