
Ext.define('NFW2.view.NFW2_monitor_network_packetDumpViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_monitor_network_packetdump',

    data: {
        add: __zen('add'),
        del: __zen('del'),
        name: __zen('name'),
        hours: __zen('hours'),
        inter: __zen('inter'),
        filter: __zen('filter'),
        protocol: __zen('protocol'),
        src: __zen('src'),
        src_port: __zen('src_port'),
        dest: __zen('dest'),
        dest_port: __zen('dest_port'),
        max_packet_dump: __zen('max_packet_dump'),
        progress: __zen('progress')
    }

});