
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Select implementation' });
};
exports.kendo = function(req, res){
  res.render('kendo', { title: 'KendoUI Grid' });
};
