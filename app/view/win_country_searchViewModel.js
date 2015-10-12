
Ext.define('NFW2.view.win_country_searchViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_country_search',

    data: {
        ctcode_search: __zen('ctcode_search'),
        target_addr: __zen('target_addr'),
        country_code: __zen('country_code'),
        search: __zen('search'),
        
    }

});