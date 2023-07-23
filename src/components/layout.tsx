import Container from 'react-bootstrap/Container';
import Link from 'next/link'
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import icon from '../assets/images/icon.jpeg';
import { useLocation, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';



export default function Layout({ children }: any) {
  const location = useLocation();
  const loginPagePath = '/login';
  const isLoginPage = location.pathname == loginPagePath;
  const navigate = useNavigate();
  const logado = true;

  const handleLoginRedirect = () => {
    navigate('/login'); // Redireciona para a página de login
  };

  const BotaoLogin = () => {
    if (!isLoginPage) {
      return(
        <Button onClick={handleLoginRedirect}>Login</Button>
      );
    }
  }

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
            <BotaoLogin/>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <main>{children}</main>
      </Container>
    </>
  )
}