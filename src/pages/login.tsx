'use client'
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [logado, setLogado] = useState(false);

    const navigate = useNavigate()

    const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        setEmail(e.target.value);
    }

    const handleSenhaChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> =>{
        setSenha(e.target.value);
    }

    const handleLogadoChange = async (e: any): Promise<void> => {
        setLogado(!logado)
        handleRedirectHome();
    }

    const handleRedirectHome = () => {
        navigate('/', {state: {logged: logado}})
    }

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
                        <button onClick={handleLogadoChange} type="submit" className="btn btn-primary">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
    
}

export default LoginPage