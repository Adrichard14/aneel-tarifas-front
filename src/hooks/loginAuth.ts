'use client'
import axios from "axios";
import { useEffect, useState } from "react";

const apiURL = process.env.NEXT_PUBLIC_API_URL;
const loginURL = `${apiURL}auth/sign_in`;


const loginAuth = async (email: string, senha: string): Promise<boolean> => {
    try {
        const response = await axios.post(loginURL, {
            email: email,
            password: senha,
        });

        if (response.headers['access-token']) {
            let token;
            let uid;
            let client;
            uid = email;
            token = response.headers['access-token'];
            client = response.headers['client'];

            let userTokens = { "token": token, "uid": uid, "client": client };
            localStorage.setItem('user', JSON.stringify(userTokens));
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default loginAuth;


