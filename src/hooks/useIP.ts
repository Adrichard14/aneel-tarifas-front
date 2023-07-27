'use client';
import { useEffect, useState } from "react";

type JSONResponse = {
  ip?: string
  errors?: Array<{ message: string }>
}

const useIP = () => {
  const [userIp, setUserIp] = useState<string>("");
  const [city, setCity] = useState<string>("");
  useEffect(() => {
    const getIP = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const { ip, errors }: JSONResponse = await response.json();
        if (ip) {
          setUserIp(ip);
          const locationResponse = await fetch(`http://ip-api.com/json/${ip}`);
          const { city }: any = await locationResponse.json();
          if (city) {
            setCity(city);
          }
        }
      } catch (error) {
        console.log('Ocorreu um erro ao buscar o IP!');
        console.log(error);
      }
    }
    getIP();
  }, []);
  return { userIp, city };
}

export default useIP;