import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';
import { ObjectID } from 'mongodb';


export const verifyEmailRoute = {

    path: '/api/verify-email',
    method: 'put',
    handler: async (req, res) => {

        const { verificationString } = req.body;
        const db = getDbConnection('react-auth-db');

        const result = await db.collection('users').findOne({
            verificationString
        });

        if (!result) return res.status(401).json({ message: 'The email verification code is incorrect' });

        // DOUBLE DESTRUCTURATION !!
        // 1. On Déstructure "result"
        // 2. On Déstructure "_id = Object(id)" !!
        const { _id: id, email, info } = result ;

        await db.collection('users').updateOne({ _id: ObjectID(id) }, {
            $set: { isVerified: true }
        });

        jwt.sign({ id, email, isVerified: true, info }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
            if (err) return res.sendStatus(500);

            res.status(200).json({ token });
        });
        

        
    }
}