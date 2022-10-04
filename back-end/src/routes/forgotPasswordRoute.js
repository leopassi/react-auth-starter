import { v4 as uuid} from 'uuid';
import { sendMail } from '../util/sendEmail';
import { getDbConnection } from '../db';


export const forgotPasswordRoute = {

    path: '/api/forgot-password/:email',
    method: 'put',
    handler: async (req, resp) => {

        const { email } = req.params ;
        const passwordResetCode = uuid();

        const db = getDbConnection('react-auth-db');

        // REMARQUE: les méthodes "findOne, updateOne, findAndUpdate..." sont toutes ASYNCHRONES !!!"
        const { result }  = await db.collection('users').updateOne({ email}, { $set: { passwordResetCode}});

    
        if( result.nModified > 0) {
            // Autre Solution:
            // const result = await etc...
            // if( result.matchedCount > 0) { ...... }
            
            try {
                console.log('Email entré = '+email);
                await sendMail({to: email, from: 'salseroleo@outlook.com', subject: 'Password Reset',
                text: `To reset your password please click on the link below
                        http://localhost:3000/reset-password/${passwordResetCode}
                `});

                // Pour Savoir, si besoin...
                // resp.sendStatus(200);
            } catch (error) {
                console.log(error);
                resp.sendStatus(500);
                
            }
        }

        // Pour Eviter d'informer les hackers potentiels sur le succès ou echec de la recherche !!
        resp.sendStatus(200);
    }
}