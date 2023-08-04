'use client'
import axios from "axios";
import { useEffect, useState } from "react";

const apiURL = process.env.NEXT_PUBLIC_API_URL;
const registerURL = `${apiURL}auth`;


const RegisterAuth = async (email:string, password:string, passwordConfir: string): Promise<any> =>{
    var textResponse = "algodeuerrado"
    try {
        const response = axios.post(registerURL, {
            "email": email,
            "password": password,
            "password_confirmation": passwordConfir
        }).then(
            function (resposta){
                return "sucesso"
            }
        ).catch( function (error) {
            if (error.response){
                if (error.response.erros)
            }
        })


    } catch (error) {
        console.log(error);
    }


}

export default RegisterAuth