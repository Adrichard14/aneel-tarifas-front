import axios from "axios";

const apiURL = process.env.NEXT_PUBLIC_API_URL;
const logoutURL = `${apiURL}auth/sign_out`;


const handleLogout = async (): Promise<void> => {
    let token;
    let uid;
    let client;
    let user;
    user = JSON.parse(localStorage.getItem('user') || '{}');
    token = user.token;
    uid = user.uid;
    client = user.client;
    localStorage.removeItem('user');
    try {
        const logout = await axios.post(
            logoutURL,
            {
                'access-token': token,
                'uid': uid,
                'client': client,
            }
        );
        let response = logout.data;
    } catch (error) {
        console.log(error)
    }
}


export default handleLogout;