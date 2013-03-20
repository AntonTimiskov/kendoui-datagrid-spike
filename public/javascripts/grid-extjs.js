Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*'//,
    //'Ext.grid.PagingScroller'
]);

Ext.onReady(function(){
    Ext.Ajax.timeout = 360 * 000;
    var id = 'grid';
    Ext.define('Docs', {
        extend: 'Ext.data.Model',
        fields: [
            {
                name: 'ROW_ID',
                type: 'int'
            }, 
            'File_name',
            'Location',
            {
                name: 'Current_size', 
                type: 'int'
            },        
            {
                name: 'Number_of_versions',
                type: 'int'
            }, 

            {
                name: 'Total_size',
                type: 'int'
            }, 
            'Extension',
            {
                name: 'Views',
                type: 'int'
            }, 
            {
                name: 'Creation_time',
                type: 'date'
            },
            {
                name: 'Last_access_date',
                type: 'date'
            },
            {
                name: 'Last_modification_time',
                type: 'date'
            }
        ],
        idProperty: 'ROW_ID'
    });

    // create the Data Store
    var store = Ext.create('Ext.data.Store', {
        id: 'store',
        buffered: true,
        model: 'Docs',
        remoteGroup: true,
        // allow the grid to interact with the paging scroller by buffering
        buffered: true,
        leadingBufferZone: 100,
        pageSize: 100,
        proxy: {
            // load using script tags for cross domain, if the data in on the same domain as
            // this page, an Ajax proxy would be better
            type: 'ajax',
            url: '/items',
            reader: {
                type: 'json',
                root: 'results',
                totalProperty: 'total'
            },
            // sends single sort as multi parameter
            simpleSortMode: false,
            // sends single group as multi parameter
            simpleGroupMode: false,

            // This particular service cannot sort on more than one field, so grouping === sorting.
            //groupParam: 'sort',
            //groupDirectionParam: 'dir'
        },
        autoLoad: true
    });

    var grid = Ext.create('Ext.grid.Panel', {
        width: 700,
        height: 500,
        collapsible: false,
        title: 'Documents and pages',
        store: store,
        loadMask: true,
        plugins: 'bufferedrenderer',
        'font-size': '40px',
        selModel: {
            pruneRemoved: false
        },
        multiSelect: true,
        viewConfig: {
            trackOver: false
        },
        verticalScroller:{
            variableRowHeight: true
        },
        // grid columns
        columns: [
            {
                text: 'ROW_ID',
                dataIndex: 'ROW_ID',
                sortable: false
            },
            {
                text: 'File name',
                dataIndex: 'File_name',
                sortable: true
            },
            {
                text: 'Location',
                dataIndex: 'Location',
                sortable: true
            },
            {
                text: 'Current size',
                dataIndex: 'Current_size',
                sortable: true
            },
            {
                text: 'Number of versions',
                dataIndex: 'Number_of_versions',
                sortable: true
            }
 
        ],
            
       /* columns:[
        {
            xtype: 'rownumberer',
            width: 50,
            sortable: false
        },{
            tdCls: 'x-grid-cell-topic',
            text: "Topic",
            dataIndex: 'title',
            flex: 1,
            renderer: renderTopic,
            sortable: true
        },{
            text: "Author",
            dataIndex: 'username',
            width: 100,
            hidden: true,
            sortable: true
        },{
            text: "Replies",
            dataIndex: 'replycount',
            align: 'center',
            width: 70,
            sortable: false
        },{
            id: 'last',
            text: "Last Post",
            dataIndex: 'lastpost',
            width: 130,
            renderer: Ext.util.Format.dateRenderer('n/j/Y g:i A'),
            sortable: true,
            groupable: false
        }],*/
        renderTo: Ext.get(id)
    });
});
