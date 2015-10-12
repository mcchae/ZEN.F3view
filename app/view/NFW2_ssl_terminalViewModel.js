
Ext.define('NFW2.view.NFW2_ssl_terminalViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_ssl_terminal',

    data: {
        del: __zen('del'),
        auth_device: __zen('auth_device'),
        name_user_id: __zen('name_user_id'),
        depart: __zen('depart'),
        hardware_serial: __zen('hardware_serial'),
        remote_address: __zen('remote_address'),
        active: __zen('active'),
        terminal_replace: __zen('terminal_replace'),
        device_indent: __zen('device_indent'),
        allow: __zen('allow'),
        no_auth_device: __zen('no_auth_device')
    }

});