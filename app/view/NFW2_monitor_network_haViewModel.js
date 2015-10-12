
Ext.define('NFW2.view.NFW2_monitor_network_haViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_monitor_network_ha',

    data: {
        ha_status: __zen('ha_status'),
        ha_config: __zen('ha_config'),
        inter: __zen('inter'),
        link: __zen('link'),
        ip: __zen('ip'),
        virtual_ip: __zen('virtual_ip'),
        virtual_mac: __zen('virtual_mac'),
        status: __zen('status'),
        target_ip: __zen('target_ip'),
        group_num: __zen('group_num'),
        operate_mode: __zen('operate_mode'),
        info: __zen('info'),
        group_ip: __zen('group_ip'),
        priority_level: __zen('priority_level'),
        mode: __zen('mode'),
        ha_info: __zen('ha_info'),
        checker_status: __zen('checker_status'),
        vrrp_status: __zen('vrrp_status'),
        sync_session_info: __zen('sync_session_info'),
        ha_msg1: __zen('ha_msg1'),
        
    }

});