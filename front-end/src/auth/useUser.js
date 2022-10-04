import { useEffect, useState } from "react";
import { useToken } from "./useToken";

// IDEE: On dit ici que le user c'est le PayLoad du token
export const useUser = () => {

    const [token] = useToken();

    const getPayloadFromToken = token => {

        if(!token) return null; 
        else {
            const encodedPayLoad = token.split('.')[1];
            
            return JSON.parse(atob(encodedPayLoad));
        } 
    }

    
    const [user, setUser] = useState( () => {
        if(!token) return null;
        else return (getPayloadFromToken(token));
    });

    // Si le token change , on update le user
    useEffect( () => {
        if (!token) setUser(null);
        else setUser(getPayloadFromToken(token));
    }, [token]);
     

    return user;

}