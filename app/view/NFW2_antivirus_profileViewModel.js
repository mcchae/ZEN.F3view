
Ext.define('NFW2.view.NFW2_antivirus_profileViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_antivirus_profile',

    data: {
        add: __zen('add'),
        del: __zen('del'),
        profile_name: __zen('profile_name'),
        smtp_monitor: __zen('smtp_monitor'),
        smtp_filter: __zen('smtp_filter'),
        http_monitor: __zen('http_monitor'),
        ftp_monitor: __zen('ftp_monitor'),
        ftp_filter: __zen('ftp_filter')
    }

});