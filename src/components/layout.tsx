'use client'
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
import logoutAuth from '@/hooks/logoutAuth';
import { usePathname } from 'next/navigation'

export default function Layout({ children }: any) {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [isRegisterPage, setIsRegisterPage] = useState(false);
  const [isPasswordPage, setIsPasswordPage] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();
  const loginPagePath = '/login';
  const homePagePath = '/';
  const registerPagePath = '/register';
  const passwordPagePath = '/password';
  const location = useLocation();
  const pathname = usePathname();

  useEffect(() => {
    setIsLoginPage(location.pathname === loginPagePath);
    setIsRegisterPage(location.pathname === registerPagePath);
    setIsPasswordPage(location.pathname === passwordPagePath)
    if(useAuth()){
      setLoginSuccess(true);
    }
    else if(!useAuth() && !isLoginPage && !isRegisterPage && !passwordPagePath) {
      navigate(loginPagePath);
    }
    else if (isLoginPage && loginSuccess && !useAuth()) {
      setLoginSuccess(false);
    }
  }, [location.pathname, isLoginPage, isRegisterPage, loginSuccess]);


  const handleLogout = () => {
    logoutAuth();
    navigate(loginPagePath);
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
            {!isLoginPage && !isRegisterPage && !isPasswordPage && (<Button onClick={handleLogout} className="btn btn-danger">Sair</Button>)}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <main>{children}</main>
      </Container>
    </>
  )
}