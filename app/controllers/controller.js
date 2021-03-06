import pool from '../utils/db';

export const signup = (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        category: req.body.category,
        coordinate: req.body.coordinate,
        phone_no: req.body.phone_no,
    };
    
       
            pool.query(`INSERT INTO "transporta"("username", "password", "email", "category", "location", "phone_no")
            VALUES($1,$2,$3,$4,$5,$6)`,
            [user.username, user.password, user.email, user.category, user.coordinate, user.phone_no], (err, result) => {
                if(err){
                    console.log(err);
                    return res.status(404).send('log not successful');
                }else{
                    res.status(200).send(user);
                }
            });
           

    };    
    
export const login = (req, res) => {
    const userDetails = {
        username: req.body.username,
        password: req.body.password,
        coordinate: req.body.coordinate,

    };

    pool.query('UPDATE "transporta" SET "location" = $1 WHERE "password" = $2',
     [userDetails.coordinate, userDetails.password], (err) =>{
         if(err){
             console.log(err);
             return res.status(404);
         }else{
            pool.query('SELECT * FROM "transporta" WHERE username = $1 AND password = $2',
            [userDetails.username, userDetails.password], (err, result) => {
                if(err){
                    console.log(err);
                    const errorMessage = {message:'login not successful'};
                    return res.status(404).send(errorMessage);
                }else{
                    console.log(result);
                    res.status(200).send(result.rows[0]);
                }
            });
         }
        
     });

   
};