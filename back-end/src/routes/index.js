import { signUpRoute } from './signUpRoute';
import { testRoute } from './testRoute';
import { loginRoute } from './loginRoute';
import { updateUserInfoRoute } from './updateUserInfoRoute';
import { testEmailRoute } from './testEmailRoute';
import { forgotPasswordRoute } from './forgotPasswordRoute';
import { resetPasswordRoute } from './resetPasswordRoute';
import { verifyEmailRoute } from './verifyEmailRoute';

export const routes = [
    loginRoute,
    testRoute, 
    signUpRoute,
    updateUserInfoRoute,
    testEmailRoute,
    forgotPasswordRoute,
    resetPasswordRoute, 
    verifyEmailRoute
];
