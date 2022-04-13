module.exports = function(req, res, next) {
  res.status(404).render('404', {
    pageTitle: 'Страница не найдена',
  });
};
