
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

exports.kendo_scroll_n = function(req, res){
  var n = req.params.max || 500000;
  res.render('kendo_scroll_n', { title: 'KendoUI Grid with virtual scroll ('+n+')', n: n });
};


exports.extjs = function(req, res){
  res.render('extjs', { title: 'ExtJS Grid' });
};

exports.datatables = function(req, res){
  res.render('datatables', { title: 'Datatables Grid' });
};


