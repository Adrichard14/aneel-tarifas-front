'use client'
import axios from "axios";
import { useEffect, useState } from "react";

const apiURL = process.env.NEXT_PUBLIC_API_URL;
const registerURL = `${apiURL}auth`;


const RegisterAuth = async (email:string, password:string, passwordConfir: string): Promise<string> =>{
    var textResponse = "algodeuerrado"
    try {
        const response = axios.post(registerURL, {
            "email": email,
            "password": password,
            "password_confirmation": passwordConfir
        })
    } catch (error) {
        
    }
}