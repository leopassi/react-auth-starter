import bcrypt from 'bcrypt';
import { getDbConnection } from '../db';


export const resetPasswordRoute = {
    
    path: '/api/users/:passwordResetCode/reset-password',
    method: 'put',
    handler: async (req, res) => {

        const { passwordResetCode } = req.params ;
        const { newPassword } = req.body;

        const newPasswordHash  = await bcrypt.hash(newPassword, 10);

        const db = getDbConnection('react-auth-db');

        const result = await db.collection('users').findOneAndUpdate({ passwordResetCode}, 
            { $set : { passwordHash: newPasswordHash }},
            { $unset : { passwordResetCode: ''}
        });

        // Pour savoir si un document a été effectivement modifié. Cf la Doc Mongo DB
        if ( result.lastErrorObject.n === 0) return res.sendStatus(404);

        return res.sendStatus(200);

    }
}