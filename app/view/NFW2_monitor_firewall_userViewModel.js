
Ext.define('NFW2.view.NFW2_monitor_firewall_userViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_monitor_firewall_user',

    data: {
        filter_apply: __zen('filter_apply'),
        filter_reset: __zen('filter_reset'),
        user_msg3: __zen('user_msg3'),
        user_logout: __zen('user_logout'),
        all_logout: __zen('all_logout'),
        obj_name: __zen('obj_name'),
        id2: __zen('id2'),
        ip_addr: __zen('ip_addr'),
        name: __zen('name'),
        depart: __zen('depart'),
        login: __zen('login'),
        timeout: __zen('timeout'),
        usage: __zen('usage'),
        session: __zen('session'),
        packet: __zen('packet'),
        auth_server: __zen('auth_server')
    }

});