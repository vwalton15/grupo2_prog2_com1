const userController = {
    register: function (req, res) {
        res.render('register', { title: 'Registro' });
    },
    login: function (req, res) {
        res.render('login', { title: 'Iniciar Sesión' });
    },
};
module.exports = userController;