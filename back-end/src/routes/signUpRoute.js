import { getDbConnection } from "../db";
import bcrypt  from 'bcrypt';
import jwt  from 'jsonwebtoken';
import { sendMail } from "../util/sendEmail";
import { v4 as uuid} from 'uuid';


export const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {

        const {email, password } = req.body;

        const db = getDbConnection('react-auth-db');
        const user = await db.collection('users').findOne({email});

        if(user){
            res.sendStatus(409) ;
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const verificationString = uuid();

        const infoStart = {
            hairColor: '',
            favoriteFood: '',
            bio: ''
        };

        const result = await db.collection('users').insertOne({
            email,
            passwordHash,
            info: infoStart,
            isVerified: false, 
            verificationString
        });

        const {insertedId } = result;
        // console.log('LLLLLe VOICI Pro = ' + insertedId);

        try {

            await sendMail({to: email , from: 'salseroleo@outlook.com' , subject: 'Mail verification', 
            text: ` 
                Thank you for Signin Up !
                
                Please verify your email by clicking on the link below
                
                http://localhost:3000/verify-email/${verificationString}` 
                })
        }
        catch(e) {
            console.log(e);
            return res.sendStatus(500);
        }

        jwt.sign({id: insertedId, email, info: infoStart, isVerified: false }, process.env.JWT_SECRET, 
            { expiresIn: '2d' }, 
            (err, token) => {
                if(err){
                    return res.status(500).send(err);
                }
                // REMARQUE: PAS DE sendStatus SI CONVERSION Json !!!
                res.status(200).json({ token});
        });

    }
};