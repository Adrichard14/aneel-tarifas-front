import axios from "axios";

const apiURL = process.env.NEXT_PUBLIC_API_URL;
const logoutURL = `${apiURL}auth/sign_out`;

const logoutAuth = () => {
  let token;
  let uid;
  let client;
  let user;

  try {
    user = JSON.parse(localStorage.getItem('user') || '{}');
    token = user.token;
    uid = user.uid;
    client = user.client;
    localStorage.removeItem('user');

    // Faz a requisição ao servidor sem aguardar a resposta
    axios.delete(
      logoutURL,
      {
        headers: {
          "access-token": token,
          'uid': uid,
          'client': client,
        }
      }
    );

    // Retorna true para indicar que a requisição foi enviada ao servidor
    return true;
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    // Retorna false em caso de erro
    return false;
  }
};

export default logoutAuth;
