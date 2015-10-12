
Ext.define('NFW2.view.win_etc_tunnel_routingViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_etc_tunnel_routing',

    data: {
        tunnel_routing: __zen('tunnel_routing'),
        rank: __zen('rank'),
        src: __zen('src'),
        dest: __zen('dest'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        tunnel_ip: __zen('tunnel_ip')
    }

});