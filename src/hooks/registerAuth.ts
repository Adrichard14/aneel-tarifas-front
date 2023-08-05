'use client'
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

const apiURL = process.env.NEXT_PUBLIC_API_URL;
const registerURL = `${apiURL}auth`;



interface ResponseData {
    id: string | null;
    provider: string;
    uid: string;
    allow_password_change: boolean;
    name: string | null;
    lastname: string | null;
    image: string | null;
    email: string;
    password: string | null;
    password_confirmation: string | null;
    admin: string | null;
    created_at: string | null;
    updated_at: string | null;
}

interface ErrorResponse {
    status: string;
    data: ResponseData;
    errors?: { // Make 'errors' property optional
        [key: string]: string[];
        full_messages: string[];
    };
}

const RegisterAuth = async (
    email: string,
    password: string,
    passwordConfirm: string
): Promise<string> => {
    try {
        const response = await axios.post(registerURL, {
            email,
            password,
            password_confirmation: passwordConfirm,
        });

        return "sucesso";
    } catch (error: any) {
        if ((error as AxiosError<ErrorResponse>).response?.data?.errors) {
            const errors = (error as AxiosError<ErrorResponse>).response?.data.errors;
            console.log(errors);

            if (errors && errors.email && errors.email.length > 0) {
                return "emailCadastrado";
            }
            if (errors && errors.password && errors.password.length > 0) {
                return "senhaCurta";
            }
            if (errors && errors.password_confirmation && errors.password_confirmation.length > 0) {
                return "senhasDiferentes";
            }
            // Add more error handling for other specific errors, if needed.
        }

        return "erro";
    }
};

export default RegisterAuth;