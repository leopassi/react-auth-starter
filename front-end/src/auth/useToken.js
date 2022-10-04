import { useState } from 'react';

// IDEE: Durant la vie dec l'application le token est amené à changer (expiration). Donc besoin d'une méthode 
// pour le setter !!
export const useToken = () => {

    const [token, setTokenInternal] = useState( () => {
        return localStorage.getItem('token');
    });

    const setToken = newToken => {
        localStorage.setItem('token', newToken);
        setTokenInternal(newToken);
    };

    return [token, setToken];

}