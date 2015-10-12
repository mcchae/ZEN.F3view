
Ext.define('NFW2.view.NFW2_system_extServerAuthViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_system_extserverauth',

    data: {
        auth_method: __zen('admin_auth_method'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        server_address: __zen('server_address'),
        shared_pwd: __zen('shared_pwd'),
        auth_port: __zen('auth_port'),
        account_port: __zen('account_port'),
        state_chk: __zen('state_chk'),
        base_dn: __zen('base_dn'),
        bind_dn: __zen('bind_dn'),
        bind_pwd: __zen('bind_pwd'),
        current_state_chk: __zen('current_state_chk')
    }

});