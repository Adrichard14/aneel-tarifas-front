import { Row, Col, Container, Card, Alert, Button, ButtonGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import useIP from "@/hooks/useIP";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginAuth from "@/hooks/loginAuth";
import useAuth from "@/hooks/useAuth";
import { Location } from 'react-router-dom';

const LoginPage = () => {

  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [logado, setLogado] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [textAlert, setTextAlert] = useState<string>(" ");
  const [isLoading, setIsloading] = useState(false);
  const { userIp, city } = useIP();
  console.log(city, userIp);

  const navigate = useNavigate()

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    setEmail(e.target.value);
  }

  const handleSenhaChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    setSenha(e.target.value);
  }

  function verifyLogin(): boolean { // verifica se os campos não estão vazios
    return email !== "" && senha !== "";
  }


  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault(); // Evita o comportamento padrão do botão submit
    setIsloading(true);
    if (verifyLogin()) {
      const tentarLogar = await loginAuth(email, senha); // Wait for the loginAuth function to complete
      if (tentarLogar) {
        navigate('/');
      } else {
        handleLoginError();
      }
    } else {
      handleLoginEmpty();
    }
  };

  const handleLoginEmpty = (): void => {
    setTextAlert("Por favor, preencha os campos para realizar o Login.");
    setShowAlert(true);
  };


  const handleLoginError = (): void => {
    setTextAlert("Email e/ou senha inválidos!!");
    setShowAlert(true);
  };

  const navigateToMainPage = (): void => {
    navigate('/'); // Navigates to the main page
  };

  const navigateRegisterPage = (): void => {
    navigate('/register');
  };


  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card className="w-50">
        <Card.Body>
          {showAlert && (
            <Alert variant="danger" role="alert">
              {textAlert}
            </Alert>
          )}
          <Form>
            <Form.Group>
              <Form.Label htmlFor="email">E-mail</Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={handleEmailChange}
                id="email"
                placeholder="Ex: estudanteufs@gmail.com"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Senha</Form.Label>
              <Form.Control
                type="password"
                value={senha}
                onChange={handleSenhaChange}
                id="password"
                placeholder="Senha"
              />
            </Form.Group>
            <Container className="d-flex justify-content-between">
              <Button onClick={handleLogin} disabled={isLoading} type="submit" variant="primary" className="mt-3">
                {isLoading ? <>
                  <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                  Entrando...
                </> : 'Entrar'}
              </Button>
              <Button onClick={navigateRegisterPage} type='submit' variant='success' className='mt-3'>Registrar-se</Button>
            </Container>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};


export default LoginPage