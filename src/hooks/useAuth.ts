import { useRouter } from 'next/router';

const useAuth = () => {
    let user;
    user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.client && user.uid && user.token) {
        return true;
    }
    // retorna falso se não tiver o token do usuário no localStorage ou se não houver algum dos parametros requeridos para a autenticação
    return false;
}

export default useAuth;