import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Nav, Form, Navbar, FormControl, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.css';

import logo from '../../assets/site-identity.png';
import { authActions } from '../../redux/actions';

const PublicNavbar = () => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const authLinks = (
    <Nav>
      {user ? (
        <Nav.Link as={Link} to={`/${user.name}`}>
          <div
            className="nav-icon"
            style={{
              padding: '0',
              width: '120px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <img
              src={user.avatarUrl}
              alt="avatar"
              style={{ width: '40px', height: '40px', borderRadius: '50%' }}
            />
            <div
              style={{
                width: '80px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                padding: '3px',
                justifyContent: 'center',
                overflow: 'hidden',
                overflowY: 'auto',
              }}
            >
              {user.name}
            </div>
            {/* <FontAwesomeIcon icon="user" size="lg" /> */}
          </div>
        </Nav.Link>
      ) : (
        ''
      )}

      <Nav.Link href="#create">
        <div className="nav-icon">
          <FontAwesomeIcon icon={'plus'} size="lg" />
        </div>
      </Nav.Link>
      <Nav.Link href="#messages">
        <div className="nav-icon">
          <FontAwesomeIcon icon={['fab', 'facebook-messenger']} size="lg" />
        </div>
      </Nav.Link>
      <Nav.Link href="#notificaions">
        <div className="nav-icon">
          <FontAwesomeIcon icon="bell" size="lg" />
        </div>
      </Nav.Link>
      <NavDropdown
        alignRight
        id="dropdown-basic"
        title={
          <div className="nav-icon">
            <FontAwesomeIcon icon="cog" size="lg" />
          </div>
        }
      >
        <NavDropdown.Item href="#action/3.1">Loi V Tran</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={handleLogout} href="#action/3.4">
          Log out
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );

  const publicLinks = (
    <Nav>
      <Nav.Link as={Link} to="/auth">
        <FontAwesomeIcon icon="registered" size="sm" /> Register
      </Nav.Link>
      <Nav.Link as={Link} to="/auth">
        <FontAwesomeIcon icon="sign-in-alt" size="sm" /> Login
      </Nav.Link>
    </Nav>
  );

  return (
    <Navbar bg="light" expand="lg" className="sticky-top box-shadow">
      <Navbar.Brand as={Link} to="/" className="mr-auto ">
        <img src={logo} alt="coderbook" width="50px" />
      </Navbar.Brand>
      <Form inline className="ml-5 w-100">
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2 rounded-pill border-0 rounded-md search-bar"
        />
      </Form>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
        {!loading && <>{isAuthenticated ? authLinks : publicLinks}</>}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PublicNavbar;
