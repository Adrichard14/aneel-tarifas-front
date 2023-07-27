
import useIP from "@/hooks/useIP";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginAuth from "@/hooks/loginAuth";
import useAuth from "@/hooks/useAuth";

const LoginPage = () => {

  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [logado, setLogado] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [textAlert, setTextAlert] = useState<string>("Preencha os campos para realizar o Login!!!");
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
        navigateToMainPage(); // Navigate to the main page if the login is successful
      } else {
        handleLoginError();
      }
    } else {
      handleLoginError();
    }
  };

  const handleLoginError = (): void => {
    const erro = localStorage.getItem('loginError');
    if (erro) {
      setTextAlert("Email e/ou senha inválidos!!");
      setShowAlert(true);
    }
  };
  
  const navigateToMainPage = (): void => {
    navigate('/'); // Navigates to the main page
  };


  return (
    <div className="container d-flex justify-content-center align-content-center">
      <div className="card mt-5 w-50">
        <div className="card-body">
          {showAlert && ( // Renderiza o alerta se showAlert for true
            <div className="alert alert-danger" role="alert">
              {textAlert}
            </div>
          )}
          <form>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={handleEmailChange}
                id="E-mail"
                placeholder="Ex: estudanteufs@gmail.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                className="form-control"
                value={senha}
                onChange={handleSenhaChange}
                id="password"
                placeholder="Senha"
              />
            </div>
            <button onClick={handleLogin} type="submit" className="btn btn-primary">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


export default LoginPage