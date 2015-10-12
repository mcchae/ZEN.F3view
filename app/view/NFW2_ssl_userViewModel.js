
Ext.define('NFW2.view.NFW2_ssl_userViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_ssl_user',

    data: {
        add: __zen('add'),
        del: __zen('del'),
        user_id: __zen('user_id'),
        name: __zen('name'),
        title: __zen('title'),
        depart: __zen('depart'),
        locked: __zen('locked'),
        recent_remote_ip: __zen('recent_remote_ip'),
        recent_login: __zen('recent_login'),
        recent_logout: __zen('recent_logout')
    }

});