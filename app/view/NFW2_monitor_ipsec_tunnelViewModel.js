
Ext.define('NFW2.view.NFW2_monitor_ipsec_tunnelViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_monitor_ipsec_tunnel',

    data: {
        filter_apply: __zen('filter_apply'),
        filter_reset: __zen('filter_reset'),
        expiration_dates: __zen('expiration_dates'),
        target_device: __zen('target_device'),
        sechost: __zen('sechost'),
        inter: __zen('inter'),
        tunnel_state: __zen('tunnel_state'),
        tunnel_msg1: __zen('tunnel_msg1')
    }

});