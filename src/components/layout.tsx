import Container from 'react-bootstrap/Container';
import Link from 'next/link'
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import icon from '../assets/images/icon.jpeg';
import { useLocation, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import loginAuth from '@/hooks/loginAuth';

export default function Layout({ children }: any) {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();
  const loginPagePath = '/login';
  const homePagePath = '/';
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === loginPagePath) {
      setIsLoginPage(true);
    } else {
      if (useAuth()) {
        setLoginSuccess(true);
        navigate('/');
      } else {
        navigate('/login');
      }
      setIsLoginPage(false);
    }
  }, [location.pathname]);


  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoginSuccess(false);
    navigate('/login');
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Link href="/"><img src={icon.src} height="70" /></Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to={"/"} style={{ textDecoration: 'none' }}>Início</NavLink>
            </Nav>
            {!isLoginPage && (<Button onClick={handleLogout} className="btn btn-danger">Sair</Button>)}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <main>{children}</main>
      </Container>
    </>
  )
}