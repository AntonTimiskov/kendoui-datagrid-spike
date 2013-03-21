
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Select implementation' });
};

exports.kendo_scroll_n = function(req, res){
  var n = req.params.max || 500000;
  res.render('kendo_scroll_n', { title: 'KendoUI Grid with virtual scroll ('+n+')', n: n });
};
exports.data_n = function(req, res){
    var n = req.params.max || 500000;
var url = require('url');
var url_parts = url.parse(req.url, true);
var query = url_parts.query;
    console.log(query)
    var data = query,
	skip = parseInt(data['$skip'] || 0),
	top = parseInt(data['$top']),
	total = parseInt(n);
    var results = [];
    console.log(skip, top, total, data)
    for (var i=skip;i<skip+top;i++){
	var fname = 'Filename-';
	for (var k=0;k<Math.random()*500;k++){
		fname = fname + (Math.random()*9).toString()
	}
	result = {
	    'ROW_ID': i,
	    'File_name': fname,
	    'Location': 'location-'+i.toString(),
	    'Current_size': i,
	    'Number_of_versions': i,
	    'Total_size': i,
	    'Extension': 'ext-'+i.toString(),
	    'Views': i,
	    'Creation_time': 'Date('+(new Date()).getTime()+')',
	    'Last_access_date': 'Date('+(new Date()).getTime()+')',
	    'Last_modification_time': 'Date('+(new Date()).getTime()+')'

	};
	results.push(result);
    }
    
    content = {
	total: total,
	results: results
    } 
    res.end(JSON.stringify(content));
};

