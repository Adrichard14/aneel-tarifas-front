import React, { useState } from "react";
import { Container , Card, Form, Button, Alert } from "react-bootstrap";



const PasswordPage = () => {
    const [email, setEmail] = useState('');
    const [showAlert, setShowAlert] = useState(false);
  
    const handleSubmit = (e: any) => {
      e.preventDefault();
      // Aqui você pode adicionar a lógica para redefinir a senha com o e-mail fornecido
      // e mostrar uma mensagem de sucesso ou erro
      setShowAlert(true);
    };
  
    return (
      <Container className="d-flex justify-content-center align-items-center mt-5">
        <Card className="w-50">
        <h2 className="text-center mt-3">Esqueci a Senha</h2>
        {showAlert && (
          <Alert variant="success">Um e-mail de redefinição de senha foi enviado.</Alert>
        )}
        <Form  onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Button className="mt-3 mb-2" variant="primary" type="submit">
            Enviar Email de Redefinição
          </Button>
        </Form>
        </Card>
      </Container>
    );
  };

export default PasswordPage;