$(function(){
    var id = '#grid';
    window.source = new kendo.data.DataSource({
        type: "jsonp",
        serverPaging: true,
        serverSorting: true,
        pageSize: 100,
        transport: {
            read: {
                //url: "/users",
                //dataType: "jsonp"
                url: "http://10.30.45.35:3141/docs",
                dataType: "jsonp"
            }
        },
        schema: {
            data: 'results',
            total: 'total',
            page: 'page',
            model: {
                fields: {
                    'File_name': { type: 'string' },
                    'Location': { type: 'string' },
                    'Current_size': { type: 'number' },
                    'Number_of_versions': { type: 'number' },
                    'Total_size': { type: 'number' },
                    'Extension': { type: 'string' },
                    'Views': { type: "number" },
                    'Creation_time': { type: 'date' },
                    'Last_access_date': { type: 'date' },
                    'Last_modification_time': { type: 'date' }
                },
            },
            parse: function(response){
                $.each(response.results, function (i, item) {
                    $.each( item, function(field, value){
                        if ( value && typeof value == 'string' && /Date\(\d+\)/.test(value) ) {
                            item[field] = eval(value)
                        }
                    })
                })
                console.log(response)
                return response
            }
        },
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
 
    });
    $(id).kendoGrid({
        dataSource: source,
        scrollable: false,

        pageable: {
            previousNext: true,
            input: true
        },
        selectable: true,
        sortable: true,
        filterable: {
            extra: false
        },
        columns: [
            { field: 'File_name', title: 'File name' },
            { field: 'Location', title: 'Location' },
            { field: 'Current_size', title: 'Size' },
            { field: 'Number_of_versions', title: 'Versions' },
            { field: 'Total_size', title: 'Total size' },
            { field: 'Creation_time', title: 'Created', format: "{0:dd/MM/yyyy HH:mm:ss}" },
            { field: 'Extension', title: 'Extension' },
            { field: 'Last_modification_time', title: 'Modified', format: "{0:dd/MM/yyyy HH:mm:ss}" },
            { field: 'Views', title: 'Views' },
            { field: 'Last_access_date', title: 'Last accessed', format: "{0:dd/MM/yyyy HH:mm:ss}" }
        ]
    }); 
});
