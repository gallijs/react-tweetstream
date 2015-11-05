module.exports = {

  index: function(req, res, next) {
    // Render our 'home' template
    res.render('home');
  }
}