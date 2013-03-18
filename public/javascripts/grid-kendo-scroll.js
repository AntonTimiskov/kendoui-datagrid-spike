$(function(){

    var scrollable = window.kendo.ui.VirtualScrollable.prototype,
        grid = window.kendo.ui.Grid.prototype,
        _refresh = scrollable.refresh,
        _scroll = scrollable._scroll,
        _navigatable = grid._navigatable;

    scrollable.refresh = function(){
        var that = this,
            height = that.content.height(),
            ret = _refresh.apply(this,arguments),
            html = '';
        scrollable._that = that;
        for (var i=0;i<100;i++){ html = html + '<div style="width:1px;height:' + height + 'px"></div>' };
        that.verticalScrollbar.html(html)
        return ret;
    }

    scrollable._scroll = function(e){
         console.log('srollable.scroll',this,arguments);

         var that = this,
            math = Math,
            scrollTop = e.currentTarget.scrollTop, // that.verticalScrollbar.scrollTop(), //
            dataSource = that.dataSource,
            rowHeight = that.itemHeight,
            skip = dataSource.skip() || 0,
            start = that._rangeStart || skip,
            take = dataSource.take(),
            total = dataSource.total(),
            height = that.content.height(), // that.verticalScrollbar.children().innerHeight(), // that.element.innerHeight(), // that.content.height(), //
            wrapperElement = that.wrapper[0],
            addScrollBarHeight = (wrapperElement.scrollWidth > wrapperElement.offsetWidth) ? scrollbar : 0,
            isScrollingUp = !!(that._scrollbarTop && that._scrollbarTop > scrollTop),
            globalHeight = (height-addScrollBarHeight) * 100,
            percent = scrollTop / globalHeight,
            isLastPage =  ( globalHeight - scrollTop > height )? false : true,
            firstItemIndex = ( !isLastPage )? parseInt(total * percent) : total - take,
            lastItemIndex = firstItemIndex + take,
            start = firstItemIndex;

        console.log('scrollTop', scrollTop, isLastPage)
        console.log('globalHeight', globalHeight)
        console.log('percent', percent)
        console.log('firstItemIndex', firstItemIndex)
        console.log('lastItemIndex', lastItemIndex)

        //console.log('total', total)
        that._scrollTop = scrollTop
        that._scrollbarTop = scrollTop;

        if (!that._fetch(firstItemIndex, lastItemIndex, isScrollingUp)) {
            that.wrapper[0].scrollTop = that._scrollTop;
        } 
        //else {
        //    $('.k-virtual-scrollable-wrap', grid._that.wrapper[0]).scrollTop(0);
        //}

        grid._that._skip = firstItemIndex;

        //var fn = (isScrollingUp)? grid._that._fetchMoreUp : grid._that._fetchMoreDown;
        //fn(firstItemIndex)
    }

    scrollable._wheelScroll = function(e) {
            var that = this,
                scrollTop = that.verticalScrollbar.scrollTop(),
                originalEvent = e.originalEvent,
                deltaY = originalEvent.wheelDeltaY,
                delta;

            console.log('_wheelScroll', e, delta)
            if (originalEvent.wheelDelta) { // Webkit and IE
                if (deltaY === undefined || deltaY) { // IE does not have deltaY, thus always scroll (horizontal scrolling is treated as vertical)
                    delta = originalEvent.wheelDelta;
                }
            } else if (originalEvent.detail && originalEvent.axis === originalEvent.VERTICAL_AXIS) { // Firefox and Opera
                delta = (-originalEvent.detail) * 10;
            }

            if (delta) {
                e.preventDefault();
                //that.verticalScrollbar.scrollTop(scrollTop + (-delta));
                fn = (delta<0)? grid._that._fetchMoreDown : grid._that._fetchMoreUp ;
                fn( (delta<0)?1:-1 )
            }
        },

    grid._navigatable = function() {
        var kendo = window.kendo,
            $ = kendo.jQuery,
            ui = kendo.ui,
            DataSource = kendo.data.DataSource,
            Groupable = ui.Groupable,
            tbodySupportsInnerHtml = kendo.support.tbodyInnerHtml,
            Widget = ui.Widget,
            keys = kendo.keys,
            isPlainObject = $.isPlainObject,
            extend = $.extend,
            map = $.map,
            grep = $.grep,
            isArray = $.isArray,
            inArray = $.inArray,
            proxy = $.proxy,
            isFunction = $.isFunction,
            isEmptyObject = $.isEmptyObject,
            math = Math,
            REQUESTSTART = "requestStart",
            ERROR = "error",
            //ROW_SELECTOR = "tbody>tr:not(.k-grouping-row):not(.k-detail-row):not(.k-group-footer):visible",
            DATA_CELL = ":not(.k-group-cell):not(.k-hierarchy-cell):visible",
            SELECTION_CELL_SELECTOR = "tbody>tr:not(.k-grouping-row):not(.k-detail-row):not(.k-group-footer) > td:not(.k-group-cell):not(.k-hierarchy-cell)",
            //CELL_SELECTOR =  ROW_SELECTOR + ">td" + DATA_CELL,
            //FIRST_CELL_SELECTOR = ROW_SELECTOR + ":first" + ">td" + DATA_CELL + ":first",
            NAVROW = "tr:not(.k-footer-template):visible",
            NAVCELL = ":not(.k-group-cell):not(.k-hierarchy-cell):visible",
            FIRSTNAVITEM = NAVROW + ":first>" + NAVCELL + ":first",
            NS = ".kendoGrid",
            EDIT = "edit",
            SAVE = "save",
            REMOVE = "remove",
            DETAILINIT = "detailInit",
            CHANGE = "change",
            COLUMNHIDE = "columnHide",
            COLUMNSHOW = "columnShow",
            SAVECHANGES = "saveChanges",
            DATABOUND = "dataBound",
            DETAILEXPAND = "detailExpand",
            DETAILCOLLAPSE = "detailCollapse",
            FOCUSED = "k-state-focused",
            //FOCUSABLE = "k-focusable",
            SELECTED = "k-state-selected",
            COLUMNRESIZE = "columnResize",
            COLUMNREORDER = "columnReorder",
            CLICK = "click",
            HEIGHT = "height",
            TABINDEX = "tabIndex",
            FUNCTION = "function",
            STRING = "string",
            DELETECONFIRM = "Are you sure you want to delete this record?",
            formatRegExp = /(\}|\#)/ig,
            indicatorWidth = 3,
            templateHashRegExp = /#/ig,
            COMMANDBUTTONTMPL = '<a class="k-button k-button-icontext #=className#" #=attr# href="\\#"><span class="#=iconClass# #=imageClass#"></span>#=text#</a>',
            isRtl = false,
            QUI = '.QUI';

        window.t = this
        var that = this,
            currentProxy = proxy(that.current, that),
            table = that.table,
            headerTable = that.thead.parent(),
            dataTable = table;

        grid._that = that;

        if (!that.options.navigatable) {
            return;
        }

        var _wrapperElement = function() { return $('.k-virtual-scrollable-wrap',that.wrapper[0]) },
            _scrollToRow = function(element){
                var wrapperElement = _wrapperElement(),
                    wrapperPosition = wrapperElement.scrollTop(),
                    elementPosition = element.position().top;
               
                wrapperElement.scrollTop( wrapperPosition + elementPosition );
            },
            _rows = function(){ return $('tr[role=row]', _wrapperElement()); }
            _currentRow = function(){
                var rows = _rows();
                for (var i=0; i<rows.length; i++) {
                    if (rows.eq(i).position().top >= 0) {
                        return i;
                    }
                }
            },
            _next = function(elN){ return _rows().eq(elN).next('tr[role=row]') },
            _prev = function(elN){ return _rows().eq(elN).prev('tr[role=row]') },
            _scrolledPercent = function(){
                var wrapperElement = _wrapperElement(),
                    table = $('> table', wrapperElement),
                    tableHeight = table.height(),
                    wrapperHeight = wrapperElement.height(),
                    scrollTop = wrapperElement.scrollTop();

                return scrollTop / (tableHeight - wrapperHeight);
            },
            _scrolltopReset = function(){
                _wrapperElement().scrollTop(0); 
                scrollable._that._scrollTop = 0;
                scrollable._that._scrollbarTop = 0;
                scrollable._that.wrapper[0].scrollTop = 0;
            },
            _fetchMoreUp = function(delta){
                var scrolledPercent = _scrolledPercent(),
                    dataSource = that.dataSource,
                    skip = that._skip || dataSource.skip(),
                    take = dataSource.take(),
                    next = skip - take;

                if ( skip == 0 ) return;
                if ( scrollable._fetching ) return;
                if ( ! dataSource.inRange((skip-parseInt(take/2)>0)?skip-parseInt(take/2):0, take) ) {
                    console.log('prefetch', ((next>0)?next:0), take);
                    dataSource.prefetch(((next>0)?next:0), take);
                
                };
                that._skip = skip+delta
                console.log('_page up', that._skip, take, delta);
                _scrolltopReset()
                scrollable._that._page(that._skip, take);
            },
            _fetchMoreDown = function(delta){
                var scrolledPercent = _scrolledPercent(),
                    dataSource = that.dataSource,
                    skip = that._skip || dataSource.skip(),
                    take = dataSource.take(),
                    next = skip + take;
                
                if ( scrollable._fetching ) return;
                if ( ! dataSource.inRange(skip + parseInt(take/2), take) ) {
                    console.log('prefetch', ((next>0)?next:0), take);
                    dataSource.prefetch(((next>0)?next:0), take);
                };
                that._skip = skip+delta
                console.log('_page down', that._skip, take, delta);
                _scrolltopReset()
                scrollable._that._page(that._skip, take);
            }; 

        that._fetchMoreDown = _fetchMoreDown;
        that._fetchMoreUp = _fetchMoreUp;
        that._currentRow = _currentRow;
        window._wrapperElement = _wrapperElement;

        dataTable
            .on("keydown" + QUI, function(e) {
                var key = e.keyCode,
                    handled = false,
                    canHandle = !e.isDefaultPrevented() && !$(e.target).is(":button,a,:input,a>.k-icon"),
                    pageable = that.options.pageable,
                    dataSource = that.dataSource,
                    isInCell = that._editMode() == "incell",
                    currentIndex,
                    row,
                    index,
                    shiftKey = e.shiftKey,
                    browser = kendo.support.browser,
                    current = currentProxy(),
                    currentTop = that._rangeStart || dataSource.skip() || null;
               
                if (current && current.is("th")) {
                    console.log('call original')
                    return;
                }
                //console.log( 'keydown', key )

                if ( canHandle && key == keys.DOWN ) {
                   var currentRow = _currentRow()//,
                       //nextRow = _next(currentRow);
                    //nextRow.length && _scrollToRow(nextRow);
                    _fetchMoreDown(+1);
                }

                if ( canHandle && key == keys.UP ) {
                   var currentRow = _currentRow()//,
                    //   prevRow = _prev(currentRow);
                    //prevRow.length && _scrollToRow(prevRow);
                    _fetchMoreUp(-1);
                }

                handled = true;

                if (handled) {
                    //prevent browser scrolling
                    e.preventDefault();
                    //required in hierarchy
                    e.stopPropagation();
                }
            });

        _navigatable.apply(that, arguments);
    };

    var id = '#grid';
    window.source = new kendo.data.DataSource({
        type: "jsonp",
        serverGrouping: true,
        serverPaging: true,
        serverSorting: true,
        pageSize: 100,
        transport: {
            read: {
                url: "http://socrat:3141/docs",
                dataType: "jsonp"
            }
        },
        schema: {
            data: 'results',
            aggregates: 'results',
            total: 'total',
            page: 'page',
            model: {
                fields: {
                    'ROW_ID': { type: 'number' },
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
                //console.log(response)
                return response
            }
            
        },
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
 
    });
    $(id).kendoGrid({
        dataSource: source,
        scrollable: {
            virtual: true
        },
        height: 700,
        width: 800,
        selectable: true,
        navigatable: true,
        sortable: true,
        groupable: true,
        filterable: {
            extra: false
        },
        columns: [
            { field: 'ROW_ID', title: 'N' },
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
