const userController = {
    register: function (req, res) {
        res.render('Register');
    },
    login: function (req, res) {
        res.render('Login');
    },
};
module.exports = userController;