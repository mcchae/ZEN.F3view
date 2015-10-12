
Ext.define('NFW2.view.win_antispam_profileViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_antispam_profile',

    data: {
        profile_name: __zen('profile_name'),
        search_method: __zen('search_method'),
        rbl: __zen('rbl'),
        baeyesian: __zen('baeyesian'),
        spam_point: __zen('spam_point'),
        handling_method: __zen('handling_method'),
        detect_head: __zen('detect_head'),
        deny_receive: __zen('deny_receive'),
        limit_mail: __zen('limit_mail'),
        limit_concur_user: __zen('limit_concur_user'),
        rbl_cont: __zen('rbl_cont'),
        deny_rule: __zen('deny_rule'),
        mail_filter: __zen('mail_filter'),
        ip_filter: __zen('ip_filter'),
        add: __zen('add'),
        del: __zen('del'),
        url: __zen('url'),
        rank: __zen('rank'),
        type: __zen('type'),
        contents: __zen('contents'),
        action: __zen('action'),
        mail_address: __zen('mail_address'),
        mail_sen_rec: __zen('mail_sen_rec'),
        ip: __zen('ip'),
        search_not: __zen('search_not'),
        cum_send_limit: __zen('cum_send_limit'),
        limit_count: __zen('limit_count'),
        cum_time: __zen('cum_time'),
        prohibit_time: __zen('prohibit_time'),
        cum_receive_limit: __zen('cum_receive_limit'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});