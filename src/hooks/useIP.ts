'use client';
import { useEffect, useState } from "react";

type IP = {
    ip?: string
}

type JSONResponse = {
    ip?: string
    errors?: Array<{ message: string }>
}
// async function fetchIP(): Promise<IPApiResponse> {

// }

const useIP = () => {
    const [ip, setIp] = useState("");
    useEffect(() => {
        const getIP = async () => {
            const response = await fetch("https://api.ipify.org?format=json");
            const { ip, errors }: JSONResponse = await response.json();
            if(ip){
                const locationResponse = await fetch(`http://ip-api.com/json/${ip}`);
                console.log(locationResponse);
                const { status, country, city }: any = locationResponse.json();
                console.log(city);
            }
            // console.log(response.json());
            // if (ip) {
            //     setIp(ip);
            // }F
        }
        getIP();
    }, []);
    return ip;
}

export default useIP;