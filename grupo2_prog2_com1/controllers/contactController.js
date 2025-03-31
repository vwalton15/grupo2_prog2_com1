const contactController = {
    index: function (req, res) {
        res.render('contact', { title: 'Contacto' });
    },
}
module.exports = contactController;
