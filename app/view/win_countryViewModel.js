
Ext.define('NFW2.view.win_countryViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_country',

    data: {
        obj_name: __zen('obj_name'),
        country_code: __zen('country_code'),
        desc: __zen('desc'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});