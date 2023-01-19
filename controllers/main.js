const jwt = require('jsonwebtoken');
const CustomErrorAPI = require('../errors/custom-error');

const login = async(req, res) => {
    const {username, password} = req.body;
    console.log(username, password);

    if(!username || !password) {
        throw new CustomErrorAPI('Please provide email and password', 400)
    }
    
    // just for demo, normally provided by DB!!
    const id = new Date().getDate();
    
    // keep payload small, better user experience
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '30d'});
    
    // res.send('Fake login/Register/Signup Route');
    res.status(200).json({msg: 'User created', token});
}

const dashboard = async(req, res) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomErrorAPI('No token provided', 401);
    }
    
    const token = authHeader.split(' ')[1];    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const luckyNumber = Math.floor(Math.random() * 100);
        res.status(200).json(
            {
                msg: `Hello, ${decoded.username}`,
                secretNumber: `Your lucky number is ${luckyNumber}`,
            }
        )
    } catch (error) {
        throw new CustomErrorAPI('Not authorized to access this route', 401);
    }
}

module.exports = {
    login,
    dashboard
}