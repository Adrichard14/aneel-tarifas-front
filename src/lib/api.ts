import axios from 'axios';

export async function saveLocation({ city, region_name, country_name, latitude, longitude }: any) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const userCredentials = localStorage.getItem("user");
  const { token, uid, client } = JSON.parse(userCredentials || "{}");
  try {
    const { data } = await axios.post(`${apiURL}locations`, {
      city, region: region_name, country: country_name, latitude, longitude
    }, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "access-token": token,
        uid,
        client,
      }
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}