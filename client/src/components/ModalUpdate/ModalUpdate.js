import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Form, Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';
import { postActions } from '../../redux/actions';

const ComposerButton = ({ title, icon }) => {
  return (
    <Button className="d-flex justify-content-center align-items-center bg-light bg-white text-dark border-0 rounded-md">
      {' '}
      <FontAwesomeIcon icon={icon} className="mr-2" size="lg" />
      {title}
    </Button>
  );
};

export const ModalUpdate = ({
  modalOpen,
  setModalOpen,
  postId,
  ...restProps
}) => {
  const user = useSelector((state) => state.auth.user);

  const selectedBlog = useSelector((state) => state.post.selectedBlog);
  console.log(selectedBlog);
  const [postBody, setPostBody] = useState('');
  const handleSubmitPost = (e) => {
    e.preventDefault();
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postActions.getSinglePost(postId));
  }, [dispatch]);

  useEffect(() => {
    if (selectedBlog) setPostBody(selectedBlog.body);
  }, [selectedBlog]);

  const handleSubmit = (e) => {
    console.log(postBody);
    dispatch(postActions.updatePost(postId, postBody));
    setModalOpen(false);
    setPostBody('');
  };
  return (
    <div>
      <Modal
        size="xl"
        show={modalOpen}
        onHide={() => setModalOpen(!modalOpen)}
        aria-labelledby="example-modal-sizes-title-xl"
      >
        <Modal.Body>
          <Card className=" w-100 shadow composer-card">
            <Card.Body className="px-3 pt-3">
              {' '}
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Control
                    id="body"
                    type="text"
                    placeholder={`What's on your mind, ${user.name}?`}
                    className="border-0 rounded-md post-text"
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
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
        </Modal.Body>
      </Modal>
    </div>
  );
};
