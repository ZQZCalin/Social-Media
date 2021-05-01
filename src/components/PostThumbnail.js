import React from 'react';
import css from 'style/PostThumbnail.module.css';
import publicUrl from 'utils/publicURL';

// Adjusted version: use to return all kinds of Squares
function PostThumbnail(props) {
  return (
    <div className={css.square}>
      <div className={css.content}>
        <img className={css.image} src={publicUrl(props.src)} alt={props.alt}/>
      </div>
    </div>
  );
}

export default PostThumbnail;
