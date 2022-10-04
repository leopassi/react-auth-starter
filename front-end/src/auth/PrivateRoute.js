import { Route, Redirect } from "react-router-dom";
import { useUser } from "./useUser";

// Idée: Si le user n'est pas loggé , ON REDIRIGE VERS UNE PAGE CHOISIE (ici page Login)
export const PrivateRoute = props => {

    const user = useUser();

    if( !user) return <Redirect to="/login" /> ;

    return <Route {...props} />
}