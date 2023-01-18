const login = async(req, res) => {
    res.send('Fake login/Register/Signup Route');
}

const dashboard = async(req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json(
        {
            msg: 'Hello, John Carter',
            secretNumber: `Your lucky number is ${luckyNumber}` 
        }
    );
}

module.exports = {
    login,
    dashboard
}