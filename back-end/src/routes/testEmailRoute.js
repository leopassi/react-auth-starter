import { sendMail } from "../util/sendEmail";


export const testEmailRoute = {

    path: '/api/test-mail',
    method: 'post',
    handler: async (req, resp) => {

        try{

             await sendMail({ to: 'leoepa37@gmail.com', from: 'salseroleo@outlook.com', 
                    subject: 'Email to Berliner Chancelor ...', text: 'Just to see, if every thing is ok !!' });

                resp.sendStatus(200) ;
        }
        catch(e){
            console.log(e);
            resp.sendStatus(500);
        }
        
    }


}