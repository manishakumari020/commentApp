import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {commentDetails} = props
  const {id, name, comment, isLiked, initialClassName, date} = commentDetails
  const initial = name ? name[0].toUpperCase() : ''
  const likedText = isLiked ? 'button active' : 'button'
  const likedImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const postedTime = formatDistanceToNow(date)

  const onClickLike = () => {
    const {toggleLiked} = props
    toggleLiked(id)
  }

  const onDelete = () => {
    const {deleteComment} = props
    deleteComment(id)
  }

  return (
    <li className="comment-list-item">
      <div className="comment-item-container">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div className="user-time-container">
            <p className="name">{name}</p>
            <p className="time">{postedTime}</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="comment-button-container">
        <div className="like-container">
          <img src={likedImageUrl} alt="like" className="like-img" />
          <button className={likedText} type="button" onClick={onClickLike}>
            Like
          </button>
        </div>
        <button
          type="button"
          className="delete-button"
          onClick={onDelete}
          testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png "
            alt="delete"
            className="del-image"
          />
        </button>
      </div>
      <hr className="comment-line;" />
    </li>
  )
}

export default CommentItem
