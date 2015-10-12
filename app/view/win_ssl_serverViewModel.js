
Ext.define('NFW2.view.win_ssl_serverViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_ssl_server',

    data: {
        name: __zen('name'),
        person_charge: __zen('person_charge'),
        inquiry_number: __zen('inquiry_number'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        ip_end_point_list: __zen('ip_end_point_list'),
        desc: __zen('desc')
    }

});