'use client'
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import loginAuth from "@/hooks/loginAuth";
import useAuth from "@/hooks/useAuth";

const LoginPage = () => {

    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [logado, setLogado] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [textAlert, setTextAlert] = useState<string>("Preencha os campos para realizar o Login!!!");

    const navigate = useNavigate()

    const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        setEmail(e.target.value);
    }

    const handleSenhaChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> =>{
        setSenha(e.target.value);
    }

    const handleLogadoChange = () => {
        setLogado(!logado);
    };

    function verifyLogin(): boolean {
        return email !== "" && senha !== "";
    }
    
    const handleLogin = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault(); // Evita o comportamento padrão do botão submit
        if (verifyLogin()) {
            handleLogadoChange();
            // Salva os dados do usuário no localStorage
            loginAuth(email, senha);
            setTimeout(()=> {}, 1000);
            if (useAuth()){
                handleRedirectHome();
            }else{
                let erro = localStorage.getItem('loginError');
                if (erro){
                    setTextAlert("Email e/ou senha inválidos!!");
                    setShowAlert(true);
                }
            }

        } else {
            setShowAlert(true); // Exibe o alerta
        }
    };

    const handleRedirectHome = () => {
        navigate('/', { state: { logged: logado } });
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