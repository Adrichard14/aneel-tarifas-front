import axios from "axios";

const apiURL = process.env.NEXT_PUBLIC_API_URL;
const loginURL = `${apiURL}auth/sign_in`;

const loginAuth = async (email: string, senha: string): Promise<void> => {

    let userTokens = {};
    
    try {
        const response = await axios.post(loginURL, {
                'email': email,
                'password': senha,
        });

        if (response.headers['access-token']){
            let token;
            let uid;
            let client;
            uid = response.headers['uid'];
            token = response.headers['access-token'];
            client = response.headers['client'];
    
            userTokens = {"token": token, "uid": uid, "client": client};
    
            localStorage.setItem('user', JSON.stringify(userTokens));
        }
        else{
            localStorage.setItem('loginError', 'true');
        }

        
    } catch (error) {
        console.log(error);
    }
}

export default loginAuth;


