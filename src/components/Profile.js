import css from 'style/Profile.module.css';
import React from 'react';
import PostThumbnail from './PostThumbnail';
import publicURL from 'utils/publicURL';
import FancyFont from 'utils/FancyFont';

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
    const user = findUser(props.store);
    const posts = findPosts(props.store);
    const follows = findFollows(props.store);

    const stats = [
        {name: "posts", value: posts.length},
        {name: "followers", value: follows.followers.length},
        {name: "followings", value: follows.followings.length},
    ];

    if (false) console.log(user, posts, follows);

    return (<div className={css.container}>
        <div className={css.user}>
            <div className={css.userTitle}>
                <img className={css.userPhoto} src={publicURL(user.photo)} alt="photo"/>
                <FancyFont className={css.userName} style="lightBold">{user.id}</FancyFont>
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
                        <span>{stat.name}</span>
                    </div>
                ))
            }
        </div>

        <div className={css.thumbnail}>
            {
                posts.map(post => (
                    <PostThumbnail src={post.photo} alt={post.id} key={post.id}/>
                ))
            }
        </div>
    </div>);
}

function findUser(store) {
    return store.users.find(user => user.id === store.currentUserId);
}

function findPosts(store) {
    return store.posts.filter(post => post.userId === store.currentUserId);
}

function findFollows(store) {
    return ({
        followers: store.followers
            .filter(follow => follow.userId === store.currentUserId)
            .map(follow => follow.followerId),
        followings: store.followers
            .filter(follow => follow.followerId === store.currentUserId)
            .map(follow => follow.userId),
    });
}