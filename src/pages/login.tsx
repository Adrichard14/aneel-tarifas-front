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
    if (verifyLogin()) {
      const tentarLogar = await loginAuth(email, senha); // Wait for the loginAuth function to complete
      console.log("tentar logar:", tentarLogar);
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
            <Button onClick={handleLogin} type="submit" variant="primary" className="mt-3">
              Entrar
            </Button>
            <Button onClick={navigateRegisterPage} type='submit' variant='success' className='mt-3'>Registrar-se</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};


export default LoginPage