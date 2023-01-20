const jwt = require('jsonwebtoken');
const {BadRequestError} = require('../errors');

const login = async(req, res) => {
    const {username, password} = req.body;
    console.log(username, password);

    if(!username || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    
    // just for demo, normally provided by DB!!
    const id = new Date().getDate();
    
    // keep payload small, better user experience
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '30d'});
    
    // res.send('Fake login/Register/Signup Route');
    res.status(200).json({msg: 'User created', token});
}

const dashboard = async(req, res) => {
    console.log(req.user);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json(
        {
            msg: `Hello, ${req.user.username}`,
            secretNumber: `Your lucky number is ${luckyNumber}`,
        }
    )
}

module.exports = {
    login,
    dashboard
}