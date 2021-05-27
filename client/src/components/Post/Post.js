import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Col,
  Form,
  Card,
  Button,
  ListGroup,
  ButtonGroup,
  ListGroupItem,
  NavDropdown,
  Nav,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { commentActions, postActions } from '../../redux/actions';

const Avatar = (props) => {
  return <img alt="profile" className="rounded-circle" src={props.url} />;
};

/* STEP 4 */
const CommentForm = ({ postId, comments }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(commentActions.createComment(postId, comment));
    setComment('');
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Row>
        <Col className="d-flex">
          <Form.Control
            size="sm"
            type="text"
            placeholder="Write a comment..."
            className="border-0 rounded-md bg-light"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Col>
      </Form.Row>
    </Form>
  );
};

const Comment = ({ comment, isEdit, setIsEdit }) => {
  const commentId = comment._id;
  const postId = comment.post._id;
  const [bodyComment, setBodyComment] = useState('');
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handleUpdateComment = (e) => {
    e.preventDefault();
    dispatch(commentActions.updateComment(commentId, postId, bodyComment));
    setIsEdit(false);
  };

  return (
    <ListGroupItem className="justify-content-start border-bottom-0 pr-0 py-0">
      <Nav.Link as={Link} to={`/${comment.owner.name}`}>
        <Avatar
          url={
            comment.owner.avatarUrl ||
            'data:image/png;base64,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'
          }
        />
      </Nav.Link>
      <div className="col position-relative">
        <div className="comment-bubble">
          <Nav.Link
            className="owner-name"
            as={Link}
            to={`/${comment.owner.name}`}
            style={{ color: 'black' }}
          >
            <div className="font-weight-bold">{comment.owner.name}</div>
          </Nav.Link>
          {isEdit ? (
            <form onSubmit={handleUpdateComment}>
              <input
                style={{
                  border: '1px solid #ccc',
                  background: 'transparent',
                  color: 'black',
                  padding: '0 10px',
                  outline: 'none',
                }}
                type="text"
                placeholder="Enter the comment"
                value={bodyComment}
                onChange={(e) => setBodyComment(e.target.value)}
              />
            </form>
          ) : (
            <p>{comment.body}</p>
          )}

          {user.email === comment.owner.email ? (
            <div className="dropbox-comment">
              <NavDropdown
                alignRight
                id="dropdown-basic"
                title={<i className="fas fa-ellipsis-h"></i>}
              >
                <NavDropdown.Item onClick={() => setIsEdit(!isEdit)}>
                  Edit
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() =>
                    dispatch(commentActions.deleteComment(commentId, postId))
                  }
                >
                  Delete
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </ListGroupItem>
  );
};

const PostComments = (props) => {
  return (
    <Card.Body>
      <ListGroup className="list-group-flush">
        {props.comments.map((c, index) => (
          <Comment
            key={index}
            comment={c}
            isEdit={props.isEdit}
            setIsEdit={props.setIsEdit}
          />
        ))}
      </ListGroup>
    </Card.Body>
  );
};

const POST_ACTIONS = [
  { title: 'Like', icon: 'thumbs-up' },
  { title: 'Comment', icon: 'comment' },
  { title: 'Share', icon: 'share' },
];

const PostActionButton = ({ title, icon }) => {
  return (
    <Button className="bg-light bg-white text-dark border-0">
      {' '}
      <FontAwesomeIcon
        size="lg"
        icon={icon}
        color="black"
        className="mr-2 action-icon"
      />
      {title}
    </Button>
  );
};

const PostActions = () => {
  return (
    <ButtonGroup aria-label="Basic example">
      {POST_ACTIONS.map((a) => {
        return <PostActionButton key={a.title} {...a} />;
      })}
    </ButtonGroup>
  );
};

const PostReactions = ({ comments }) => {
  return (
    <div className="d-flex justify-content-between my-2 mx-3">
      <p className="mb-0">Vinh Nguyen, Bitna Kim and 21 others</p>
      <p className="mb-0">
        {comments.length !== 0 ? `${comments.length} comments` : ''}{' '}
      </p>
    </div>
  );
};

function PostHeader({
  userMakePost,
  postId,
  modalOpen,
  setModalOpen,
  setPostId,
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="d-flex align-items-center p-3 position-relative">
      <Nav.Link as={Link} to={`/${userMakePost?.name}`}>
        <Avatar
          url={
            userMakePost.avatarUrl ||
            'data:image/png;base64,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'
          }
        />
      </Nav.Link>
      <Nav.Link className="owner-name" as={Link} to={`/${userMakePost.name}`}>
        <h3 className="font-weight-bold ml-3">{userMakePost.name}</h3>
      </Nav.Link>
      <div className="dropbox">
        <NavDropdown
          alignRight
          id="dropdown-basic"
          title={<i className="fas fa-ellipsis-h"></i>}
        >
          <NavDropdown.Item
            onClick={() => {
              if (user.email === userMakePost.email) {
                setPostId(postId);
                setModalOpen(!modalOpen);
              }
            }}
          >
            Edit
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => dispatch(postActions.deletePost(postId))}
          >
            Delete
          </NavDropdown.Item>
        </NavDropdown>
      </div>
    </div>
  );
}

export default function Post({ post, modalOpen, setModalOpen, setPostId }) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Card className="p-3 mb-3 shadow rounded-md">
      <PostHeader
        userMakePost={post.owner}
        postId={post._id}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setPostId={setPostId}
      />
      <p>{post.body}</p>
      <Card.Img
        variant="top"
        src="https://images.unsplash.com/photo-1529231812519-f0dcfdf0445f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8dGFsZW50ZWR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
      />
      <PostReactions comments={post.comments} />
      <hr className="my-1" />
      <PostActions />
      <hr className="mt-1" />
      <PostComments
        comments={post.comments}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
      <CommentForm postId={post._id} />
    </Card>
  );
}
