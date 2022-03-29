import {Component} from 'react'

import {v4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {nameInput: '', commentInput: '', commentList: []}

  deleteComment = commentId => {
    const {commentList} = this.state
    this.setState({
      commentList: commentList.filter(comment => comment.id !== commentId),
    })
  }

  toggleLiked = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentList = () => {
    const {commentList} = this.state
    return commentList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleLiked={this.toggleLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentList: [...prevState.commentList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeComment = event => {
    this.setState({commentInput: event.target.value})
  }

  render() {
    const {nameInput, commentInput, commentList} = this.state
    return (
      <div className="comment-app-container">
        <div className="comment-details-container">
          <h1 className="heading">Comments</h1>
          <div className="comment-input-container">
            <form className="form" onSubmit={this.onAddComment}>
              <p className="form-description">
                Say something about 4.0 technologies
              </p>
              <input
                type="text"
                placeholder="Your Name"
                value={nameInput}
                className="name-input"
                onChange={this.onChangeNameInput}
              />
              <textarea
                rows="6"
                placeholder="Your Comment"
                value={commentInput}
                className="comment-input"
                onChange={this.onChangeComment}
              />
              <button type="submit" className="add-comment-button">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png "
              alt="comments"
              className="comment-image"
            />
          </div>
          <hr className="line" />
          <p className="description">
            <span className="comment-count">{commentList.length}</span>Comments
          </p>
          <ul className="comment-list-container">{this.renderCommentList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
