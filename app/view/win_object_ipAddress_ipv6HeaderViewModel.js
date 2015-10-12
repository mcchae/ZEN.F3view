
Ext.define('NFW2.view.win_object_ipAddress_ipv6HeaderViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_object_ipaddress_ipv6header',

    data: {
        obj_name: __zen('obj_name'),
        desc: __zen('desc'),
        header_content: __zen('header_content'),
        header_auth: __zen('header_auth'),
        header_dest: __zen('header_dest'),
        header_hop: __zen('header_hop'),
        header_esp: __zen('header_esp'),
        header_frag: __zen('header_frag'),
        header_route: __zen('header_route'),
        min_packet: __zen('min_packet'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});