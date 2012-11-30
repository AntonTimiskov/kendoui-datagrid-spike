$(function(){
    var id = '#grid';
    window.source = new kendo.data.DataSource({
        type: "json",
        serverPaging: true,
        pageSize: 10000,
        transport: {
            read: {
                url: "/users",
                dataType: "json"
            }
        },
        schema: {
            data: 'results',
            total: 'total',
            page: 'page'
        }
    });
    $(id).kendoGrid({
        dataSource: source,
        //height: 300,
        scrollable: false,
        pageable: {
            previousNext: true,
            imput: true
        },
        //scrollable: {
        //    virtual: true
        //},
        selectable: true,
        columns: [
            { field: 'id', title: 'ID', width: 100 },
            { field: 'country', title: 'Country', width: 250 },
            { field: 'name', title: 'Name', width: 250 }
        ]
    }); 
});
