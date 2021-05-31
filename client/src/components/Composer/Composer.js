import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Form, Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postActions } from '../../redux/actions';

import './style.css';

const ComposerButton = ({ title, icon }) => {
  return (
    <Button className="d-flex justify-content-center align-items-center bg-light bg-white text-dark border-0 rounded-md">
      {' '}
      <FontAwesomeIcon icon={icon} className="mr-2" size="lg" />
      {title}
    </Button>
  );
};

export default function Composer() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [post, setPost] = useState({
    userId: user._id,
    body: '',
    // images: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // document.location.reload();
    dispatch(postActions.createPost(post));
    setPost({ ...post, body: '' });
  };

  return (
    <Card className="mb-3 w-100 shadow composer-card">
      <Card.Body className="px-3 pt-3">
        {' '}
        {/* STEP 2 */}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              id="body"
              type="text"
              placeholder={`What's on your mind, ${user.name} ?`}
              className="border-0 rounded-md post-text"
              value={post.body}
              onChange={(e) => setPost({ ...post, body: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Card.Body>
      <hr className="mt-0" />
      <ButtonGroup size="lg" className="m-2">
        <ComposerButton title="Live Video" icon="video" />
        <ComposerButton title="Photo Video" icon="photo-video" />
        <ComposerButton title="Feeling/Activity" icon="smile" />
      </ButtonGroup>
    </Card>
  );
}
