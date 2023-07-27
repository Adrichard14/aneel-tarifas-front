import axios from "axios";
import {useEffect, useState} from "react";

const apiURL = process.env.NEXT_PUBLIC_API_URL;
const loginURL = `${apiURL}auth/sign_in`;

const loginAuth = (email: string, senha: string) => {

    let userTokens = {};
    const [loginSucess, setLoginSucess] = useState<Boolean>(false);
    useEffect (() => {
        const login =async () => {
            try {
                const response = await axios.post(loginURL, {
                        'email': email,
                        'password': senha,
                });
        
                if (response.headers['access-token']){
                    let token;
                    let uid;
                    let client;
                    uid = response.data.uid;
                    token = response.headers['access-token'];
                    client = response.headers['client'];
            
                    userTokens = {"token": token, "uid": uid, "client": client};
                    setLoginSucess(true);
            
                    localStorage.setItem('user', JSON.stringify(userTokens));
                }
                else{
                    setLoginSucess(false);
                }
        
                
                } catch (error) {
                    console.log(error);
                }
        }
        login();
    }, []);
    
    return loginSucess;
}

export default loginAuth;


