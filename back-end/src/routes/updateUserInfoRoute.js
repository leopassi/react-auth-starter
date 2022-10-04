import jwt  from "jsonwebtoken";
import { ObjectID } from 'mongodb';
import { getDbConnection } from "../db";


export const updateUserInfoRoute = {
    path: '/api/users/:userId',
    method: 'put',
    handler: async (req, res) => {

        // REMARFQUE: Dans le header de la requête, il ya une AUTHORIZATION qui contient le token !!!
        const { authorization } = req.headers;
        const { userId } = req.params;

        // REMARQUE: Technique pour extraire le sous-ensemble de données voulu
        const updates = (({
            favoriteFood,
            hairColor,
            bio
        }) => ({
            favoriteFood,
            hairColor,
            bio
        })) (req.body) ;

        if (!authorization) {
            return res.status(401).json({ message: 'Could not find headers authorization'});
        }

        // const authorize = authorization.split(' ');
        // console.log('Autoriza = ' + authorize[1]);

        // REMARQUE : Split retourne un tableau de substrings !!
        const token = authorization.split(' ')[1];

        // console.log('TOKEN EN ENTREE = ' + token);

        // Vérification du token
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({message: 'Could not verify token'});
            }

            const { id, isVerified } = decoded;

            if (id !== userId) {
                return res.status(403).json({message: 'You\'re not allowed to change this data'})
            }
            if (!isVerified ) {
                return res.status(403).json({message: 'You can not change your infos until you verify your email'})
            }


            const db = getDbConnection('react-auth-db');

            const newUser = await db.collection('users').findOneAndUpdate({ _id: ObjectID(id)},
                    { $set: {info: updates}},
                    {returnOriginal: false}
                );

            const { email, info} = newUser.value;

            // Signature du nouveau token
            jwt.sign({id, email, isVerified, info }, process.env.JWT_SECRET, 
                { expiresIn: '2d' }, 
                (err, token) => {
                    if(err){
                        return res.status(200).json(err);
                    }
                    res.status(200).json({ token});
            });

        });

        // const db = getDbConnection('react-auth-db');

        // console.log('Vérif USERRR ID = '+ userId);
        //     const newUser = await db.collection('users').findOneAndUpdate({ _id: ObjectID(userId)},
        //             { $set: {info: updates}},
        //             {returnOriginal: false}
        //         );

        //     console.log('Update du User = ' + newUser.value.info.favoriteFood);
        //     const { email, info, isVerified} = newUser.value;

        //     // Signature du nouveau token
        //     jwt.sign({userId, email, info, isVerified }, process.env.JWT_SECRET, 
        //         { expiresIn: '2d' }, 
        //         (err, token) => {
        //             if(err){
        //                 return res.status(200).json(err);
        //             }
        //             res.status(200).json({ token});
        //     });
        

    }
}