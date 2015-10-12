
Ext.define('NFW2.view.win_packet_dumpViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_packet_dump',

    data: {
        name: __zen('name'),
        inter: __zen('inter'),
        max_packet_dump: __zen('max_packet_dump'),
        filter: __zen('filter'),
        direction: __zen('direction'),
        protocol: __zen('protocol'),
        src_ip: __zen('src_ip'),
        src_port: __zen('src_port'),
        dest_ip: __zen('dest_ip'),
        dest_port: __zen('dest_port'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});