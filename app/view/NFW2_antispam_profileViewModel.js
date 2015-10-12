
Ext.define('NFW2.view.NFW2_antispam_profileViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_antispam_profile',

    data: {
        add: __zen('add'),
        del: __zen('del'),
        profile_name: __zen('profile_name'),
        search_method: __zen('search_method'),
        handling_method: __zen('handling_method'),
        limit_mail: __zen('limit_mail'),
        limit_concur_user: __zen('limit_concur_user'),
        deny_rule: __zen('deny_rule'),
        mail_filter: __zen('mail_filter'),
        ip_filter: __zen('ip_filter')
    }

});