
Ext.define('NFW2.view.NFW2_monitor_firewall_blockSessionViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_monitor_firewall_blocksession',

    data: {
        filter_apply: __zen('filter_apply'),
        filter_reset: __zen('filter_reset'),
        src: __zen('src'),
        src_port: __zen('src_port'),
        dest: __zen('dest'),
        dest_port: __zen('dest'),
        protocol: __zen('protocol'),
        timeout: __zen('timeout'),
        section: __zen('section'),
        nodata_monitor_blockses: __zen('nodata_monitor_blockses')
    }

});