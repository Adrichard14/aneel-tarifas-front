'use client'
import React, { useState } from "react";
import { Form, Container, Card, Alert, Button } from "react-bootstrap";
import RegisterAuth from "../hooks/registerAuth";
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [alertVariant, setAlertVariant] = useState("danger");
  const [textAlert, setTextAlert] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [sucessRegister, setSucessRegister] = useState(false);
  const [isLoading, setIsloading] = useState(false);



  const navigate = useNavigate();

  const handlePasswordChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    setPassword(e.target.value);
  }

  const handlePasswordConfirmChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    setPasswordConfirm(e.target.value);
  }

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    setEmail(e.target.value);
  }

  const sAlert = (text: string, show: boolean): void => {
    setShowAlert(show);
    setTextAlert(text);
  }

  function hideAlert() {
    sAlert("", false);
  }

  const validateEmail = () => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const checkPasswords = () => {
    return password === passwordConfirm;
  }

  const verifyCredentials = (): boolean => {
    if (email === "") {
      sAlert("Por favor, preencha o email para prosseguir", true);
      return false;
    }
    if (!validateEmail()) {
      sAlert("Por favor, preencha um email válido", true);
      return false;
    }
    if (password === "") {
      sAlert("Preencha a senha antes de continuar", true);
      return false;
    }
    if (password.length < 6) {
      sAlert("Senha muito curta, mínimo 6 caractéres", true);
      return false;
    }
    if (!checkPasswords()) {
      sAlert("As senhas não coincidem, verifique-as e tenta novamente", true);
      return false;
    }
    return true;

  }

  const verifyRegister = (textAPI: string): void => {
    if (textAPI === "sucesso") {
      sAlert("Cadastro realizado com sucesso", true);
      setAlertVariant("success");
      setSucessRegister(true);
      return;
    }
    if (textAPI === "emailCadastrado") {
      sAlert("Email já em uso, tente utilizar um diferente", true);
      setAlertVariant("danger");
    }
    if (textAPI === "senhaCurta") {
      sAlert("Senha muito curta, tente uma com no mínimo 6 caractéres", true);
      setAlertVariant("danger");
    }
    if (textAPI === "password_confirmation") {
      sAlert("As senhas não coincidem, verifique-as e tente novamente", true);
      setAlertVariant("danger");
    }
    if (textAPI === "erro") {
      sAlert("Algo deu errado durante o cadastro, tente novamente mais tarde", true);
      setAlertVariant("danger");
    }
  }


  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    if (verifyCredentials()) {
      try {
        setIsloading(true);
        const registro = await RegisterAuth(email, password, passwordConfirm);
        verifyRegister(registro);
        setIsloading(false);
      } catch (error) {
        console.error(error); // Handle any errors here
      }
    }
  }

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    navigate('/login');
  }

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card className="w-50">
        <Card.Body>
          {showAlert && (
            <Alert variant={alertVariant} role="alert">
              {textAlert}
            </Alert>
          )}
          <Form>
            <Form.Group>
              <Form.Label className="mt-3" htmlFor="email">E-mail</Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={handleEmailChange}
                id="email"
                placeholder="Ex: estudanteufs@gmail.com"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-3" htmlFor="password">Senha</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={handlePasswordChange}
                id="password"
                placeholder="Senha"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="mt-3" htmlFor="password">Confirme a senha</Form.Label>
              <Form.Control
                type="password"
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
                id="password"
                placeholder="Confirme a sua senha"
              />
            </Form.Group>
          </Form>
          <Container className="d-flex justify-content-between">
            <Button onClick={handleSubmit} disabled={isLoading} type="submit" variant="success" className="mt-3" >
              {isLoading ? <>
                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                Processando registro
              </> : 'Confirmar registro'}
            </Button>
            <Button onClick={handleCancel} type="submit" variant="danger" className="mt-3" >Cancelar</Button>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RegisterPage;