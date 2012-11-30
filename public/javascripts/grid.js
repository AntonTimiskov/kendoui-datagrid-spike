$(function(){
    var id = '#grid';
    window.source = new kendo.data.DataSource({
        type: "json",
        serverPaging: true,
        //serverSorting: true,
        //serverFiltering: true,
        pageSize: 10,
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
        height: 300,
        scrollable: {
            virtual: true
        },
        //sortable: true,
        selectable: true,
        columns: [
            { field: 'id', title: 'ID', width: 100 },
            { field: 'country', title: 'Country', width: 250 },
            { field: 'name', title: 'Name', width: 250 }
        ]
    }); 
});
