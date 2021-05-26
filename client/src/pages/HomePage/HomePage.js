import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postActions } from '../../redux/actions';
import './style.css';

import Post from '../../components/Post';
import Composer from '../../components/Composer';
import { ModalUpdate } from '../../components/ModalUpdate/ModalUpdate';

const SIDEBAR_BUTTONS = [
  {
    title: 'Friends',
    icon: 'users',
  },
  {
    title: 'Events',
    icon: 'calendar',
  },
  {
    title: 'Groups',
    icon: 'user-friends',
  },
  {
    title: 'Pages',
    icon: 'flag',
  },
  {
    title: 'See More',
    icon: 'angle-down',
  },
];

const SidebarButton = ({ title, icon }) => {
  return (
    <Button className="d-flex align-items-center sidebar-button border-0 text-dark btn-light">
      {' '}
      <FontAwesomeIcon icon={icon} size="lg" style={{ width: '4rem' }} />
      <span>{title}</span>
    </Button>
  );
};

/* STEP 3 */
export default function HomePage() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [postId, setPostId] = useState('');
  const [pageNum, setPageNum] = useState(1);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState(null);
  const [ownerId, setOwnerId] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const posts = useSelector((state) => state.post.posts);
  useEffect(() => {
    dispatch(postActions.postsRequest(pageNum, limit, query, ownerId, sortBy));
  }, [dispatch, pageNum, limit, query, ownerId, sortBy]);

  if (!isAuthenticated) return <Redirect to="/auth" />;

  return (
    <Row>
      <Col className="d-flex flex-column pl-1 mt-3">
        <ButtonGroup vertical>
          {SIDEBAR_BUTTONS.map((b) => {
            return <SidebarButton key={b.title} {...b} />;
          })}
        </ButtonGroup>
      </Col>
      <Col
        xs={5}
        id="scrollingElement"
        className="d-flex flex-column align-items-center posts-container"
      >
        <Composer />
        <ModalUpdate
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          postId={postId}
        />
        {posts?.map((post) => {
          return (
            <Post
              key={post._id}
              post={post}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              setPostId={setPostId}
            />
          );
        })}

        {/* <Post />
        <Post />
        <Post />
        <Post /> */}
      </Col>
      <Col></Col>
    </Row>
  );
}
