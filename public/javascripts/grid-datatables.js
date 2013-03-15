$(function(){
   $('#grid').dataTable( {
        "bProcessing": true,
        "bServerSide": true,
        "sAjaxSource": "/items"
    } ); 
});
