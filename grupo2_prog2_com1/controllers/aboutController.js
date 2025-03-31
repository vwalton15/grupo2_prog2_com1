const aboutController={
    index: function (req, res) {
        res.render('about', { title: 'Acerca de:' });  
    }
}
module.exports = aboutController;