import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { PasswordResetSuccess } from './PasswordResetSuccess';
import { PasswordResetFail } from './PasswordResetFail';


export const PasswordResetLandingPage = () => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    
    const { passwordResetCode } = useParams();

    const onSubmitResetPassword = async () => {

            try {
                // On ajoute le Suffixe ci-dessous pour différencier de la route updateUserInfo
                await axios.put(`/api/users/${passwordResetCode}/reset-password`, 
                    { newPassword: password}) ;
                setIsSuccess(true);
            }
            catch(e){
                setIsFailure(true);
            }
    }


    if ( isSuccess) return <PasswordResetSuccess /> ;
    if ( isFailure) return <PasswordResetFail /> ;


    return (
        <div className="content-container">
            <h1>Reset Password </h1>
            <p>Please enter a new password below</p>
            <input type='Password'
                value={password}
                onChange={ e => setPassword(e.target.value)}
                placeholder="paswword"
                />
            <p>Confirm your password</p>
            <input type='password'
                value={confirmPassword}
                onChange={ e => setConfirmPassword(e.target.value)}
                placeholder="Confirm paswword"
                />

            <button disabled={ !password || !confirmPassword || password !== confirmPassword} 
                    onClick={onSubmitResetPassword}>Reset password</button>

        </div>
    );

}