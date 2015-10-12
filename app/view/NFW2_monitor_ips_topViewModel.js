
Ext.define('NFW2.view.NFW2_monitor_ips_topViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_monitor_ips_top',

    data: {
        attack: __zen('attack'),
        deny: __zen('deny'),
        detect: __zen('detect'),
        attack_port: __zen('attack_port'),
        min_5: __zen('min_5'),
        min_10: __zen('min_10'),
        min_30: __zen('min_30'),
        hour_1: __zen('hour_1'),
        hour_5: __zen('hour_5'),
        hour_12: __zen('hour_12'),
        filter_apply: __zen('filter_apply'),
        filter_reset: __zen('filter_reset'),
        attacker: __zen('attacker'),
        sig_name: __zen('sig_name'),
        protocol: __zen('protocol'),
        
    }

});