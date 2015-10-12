
Ext.define('NFW2.view.NFW2_monitor_firewall_trafficTopViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_monitor_firewall_traffictop',

    data: {
        policy: __zen('policy'),
        follow: __zen('follow'),
        service: __zen('service'),
        src: __zen('src'),
        dest: __zen('dest'),
        rule_id: __zen('rule_id'),
        bps: __zen('bps'),
        pps: __zen('pps'),
        nodata_monitor_traffictop: __zen('nodata_monitor_traffictop')
    }

});