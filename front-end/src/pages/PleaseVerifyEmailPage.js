import React, { useEffect} from 'react';
import { useHistory } from 'react-router-dom';


export const PleaseVerifyEmailPage = () => {

    const history = useHistory();

    useEffect(() => 
        setTimeout(() => history.push('/') , 3000) , [history]);

    return (
        <div className='content-container' >
            <h1>Thank you for Signing Up ! </h1>
            <p>
                We've send you an email to the address you provided.
                Please click on the link contained in that mail to access all the features of 
                the application 
            </p>
        </div>
    );
}

