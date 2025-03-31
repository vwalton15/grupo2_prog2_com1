const userController = {
    register: function (req, res) {
        res.render('register', { title: 'Registro' });
    },
    login: function (req, res) {
        res.render('login', { title: 'Iniciar Sesión' });
    },
    processRegister: function (req, res) {
        res.send('Procesando registro...');
    },
    processLogin: function (req, res) {
        res.send('Procesando inicio de sesión...');
    },
};
module.exports = userController;