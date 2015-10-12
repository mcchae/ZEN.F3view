
Ext.define('NFW2.view.win_monitor_ips_uid_detailsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_monitor_ips_uid_details',

    data: {
        default_screen: __zen('default_screen'),
        top_n_screen: __zen('top_n_screen'),
        dest: __zen('dest'),
        protocol: __zen('protocol'),
        detect: __zen('detect'),
        deny: __zen('deny'),
        ratio: __zen('ratio'),
        attacker: __zen('attacker'),
        hazard: __zen('hazard')
    }

});