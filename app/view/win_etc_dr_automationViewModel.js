
Ext.define('NFW2.view.win_etc_dr_automationViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_etc_dr_automation',

    data: {
        sec: __zen('sec'),
        dr_auto: __zen('dr_auto'),
        tunnel_ip: __zen('tunnel_ip'),
        dr_tunnel_ip: __zen('dr_tunnel_ip'),
        dr_con_timeout: __zen('dr_con_timeout'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        add: __zen('add')
    }

});