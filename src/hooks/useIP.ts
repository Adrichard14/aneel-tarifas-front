'use client';
import { saveLocation } from "@/lib/api";
import { useEffect, useState } from "react";

type JSONResponse = {
  ip?: string
  errors?: Array<{ message: string }>
}

const useIP = () => {
  const [userIp, setUserIp] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  useEffect(() => {
    const getIP = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const { ip, errors }: JSONResponse = await response.json();
        if (ip) {
          setUserIp(ip);
          const locationResponse = await fetch(`https://api.apilayer.com/ip_to_location/${ip}?access_key=186e4883b0f64af92dce23fbb828034f`, {
            headers: {
              "apikey": "VqotScyXutnyHJyYJF83o7xTvY9jE9Nh",
            },
          });

          const locationData = await locationResponse.json();
          if (locationData) {
            setLocation(locationData);
          }
        }
      } catch (error) {
        console.log('Ocorreu um erro ao buscar o IP!');
        console.log(error);
      }
    }
    getIP();
  }, []);
  return { location };
}

export default useIP;