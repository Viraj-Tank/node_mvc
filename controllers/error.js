exports.get404 = (req, res, next) => {
  console.log('error path for 404:: ' + req.path);
  res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404' });
}