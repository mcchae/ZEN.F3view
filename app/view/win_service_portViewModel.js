
Ext.define('NFW2.view.win_service_portViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_service_port',

    data: {
        obj_name: __zen('obj_name'),
        desc: __zen('desc'),
        add: __zen('add'),
        protocol: __zen('protocol'),
        src_port: __zen('src_port'),
        dest_port: __zen('dest_port'),
        timeout: __zen('timeout'),
        ftp: __zen('ftp'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});