$(function(){
    var id = '#grid';
    $(id).kendoGrid({
        dataSource: {
            type: "odata",
            serverPaging: true,
            serverSorting: true,
            pageSize: 20,
            transport: {
                read: "/users"
            }
        },
        height: 300,
        scrollable: {
            virtual: true
        },
        sortable: true,
        columns: [
            { field: 'ID', title: 'ID', width: 100 },
            { field: 'Country', title: 'Country', width: 250 },
            { filed: 'Name', title: 'Name', width: 250 }
        ]
    }); 
});
