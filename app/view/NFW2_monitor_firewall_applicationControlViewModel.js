
Ext.define('NFW2.view.NFW2_monitor_firewall_applicationControlViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_monitor_firewall_applicationcontrol',

    data: {
        application: __zen('application'),
        categorys: __zen('categorys'),
        technology: __zen('technology'),
        purpose: __zen('purpose'),
        awareness: __zen('awareness'),
        usage: __zen('usage'),
        session: __zen('session'),
        packet: __zen('packet'),
        filter_apply: __zen('filter_apply'),
        filter_reset: __zen('filter_reset'),
        application_msg4: __zen('application_msg4')
    }

});