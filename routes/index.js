
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Select implementation' });
};

exports.kendo = function(req, res){
  res.render('kendo', { title: 'KendoUI Grid' });
};

exports.kendo_scroll = function(req, res){
  res.render('kendo_scroll', { title: 'KendoUI Grid with virtual scroll' });
};

exports.extjs = function(req, res){
  res.render('extjs', { title: 'ExtJS Grid' });
};
