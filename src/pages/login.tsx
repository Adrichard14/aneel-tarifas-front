'use client'
import useIP from "@/hooks/useIP";
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [logado, setLogado] = useState<boolean>(false);
    const userIP = useIP();
    console.log(userIP);

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

    function verifyLogin(email: string, senha: string) {
        if (email !== "" && senha !== ""){
            return true;
        }
        else {
            return false;
        }
    }

    const handleLogin = async (e: any): Promise<void> => {
        if (verifyLogin(email, senha)) {
          handleLogadoChange();
          console.log(logado);
          // Save user data to localStorage
          const userData = { email, senha };
          localStorage.setItem("user", JSON.stringify(userData));
          handleRedirectHome();
        } else {
          alert("Preencha os campos para realizar o Login!!!");
        }
      };

    const handleRedirectHome = () => {
    console.log(logado); // Log the updated value of logado.
    navigate('/', { state: { logged: logado } });
    };

    return (
        <div className="container d-flex justify-content-center align-content-center">
            <div className="card mt-5 w-50">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={email}
                                onChange={handleEmailChange}
                                id="E-mail" 
                                placeholder="Ex: estudanteufs@gmail.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Senha</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                value={senha}
                                onChange={handleSenhaChange}
                                id="password" 
                                placeholder="Senha"/>
                        </div>
                        <button onClick={handleLogin} type="submit" className="btn btn-primary">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
    
}

export default LoginPage