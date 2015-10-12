
Ext.define('NFW2.view.NFW2_ipsec_etcViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_ipsec_etc',

    data: {
        tunnel_timeout: __zen('tunnel_timeout'),
        ip_pool: __zen('ip_pool'),
        dns: __zen('dns'),
        hub_spoke: __zen('hub_spoke'),
        inter: __zen('inter'),
        dmac: __zen('dmac'),
        ike_virtual_ip: __zen('ike_virtual_ip'),
        sec: __zen('sec'),
        dr_auto: __zen('dr_auto'),
        tunnel_routing: __zen('tunnel_routing'),
        xauth_user: __zen('xauth_user'),
        tunnel_ip: __zen('tunnel_ip'),
        dr_tunnel_ip: __zen('dr_tunnel_ip'),
        dr_con_timeout: __zen('dr_con_timeout'),
        src: __zen('src'),
        dest: __zen('dest'),
        user_id: __zen('user_id'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        add: __zen('add'),
        del: __zen('del'),
        dr_con_timeout: __zen('dr_con_timeout')
    }

});