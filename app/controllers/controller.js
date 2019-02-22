export const login = (req, res) => {
    const user = {
        name: req.body.name,
        password: req.body.password,
    };
    const location = '4.643593, 7.943500';
    const reply = {user, location}
    res.status(200).send(reply);
}

export const getUser = (req, res) => {
    jwt.verify(req.token,'mysecretkey', (err, data) => {
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message: 'post created',
                my: model.userDetails
            })
        }
    })
    
}
