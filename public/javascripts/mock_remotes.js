window.mocks = window.mocks || {}
$(document).ajaxError(function(){
    //alert(JSON.stringify($.makeArray(arguments)));
})
window.mocks.gridMockGenerator = function(){
    mockConfig = {
        url: window.location+'/data',
        responseTime: 0,
        contentType: 'text/json',
        response: function(settings){
            var data = settings['data'],
                skip = data['$skip'] || 0,
                top = data['$top'],
		total = /.*\/(\d+)/g.exec(window.location)[1];
            var results = [];
            for (var i=skip;i<skip+top;i++){
                result = {
                    'ROW_ID': i,
                    'File_name': 'file-'+i.toString(),
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
            
            this.responseText = {
                total: total,
                results: results
            }
        }
    };
    return $.mockjax(mockConfig);
    //console.log($.mockjax(mockConfig), mockConfig)
};
