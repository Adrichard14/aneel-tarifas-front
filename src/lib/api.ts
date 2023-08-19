import axios from 'axios';

export async function saveLocation({ city, region, country, lat, lon }: any) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const userCredentials = localStorage.getItem("user");
  const { token, uid, client } = JSON.parse(userCredentials || "{}");
  try {
    const { data } = await axios.post(`${apiURL}locations`, {
      city, region, country, latitude: lat, longitude: lon
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