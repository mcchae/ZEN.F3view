
Ext.define('NFW2.view.win_ips_signature_userViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_ips_signature_user',

    data: {
        user_sig: __zen('user_sig'),
        snort_sig: __zen('snort_sig'),
        file_add: __zen('file_add'),
        sig_name: __zen('sig_name'),
        contents_string: __zen('contents_string'),
        nocase: __zen('nocase'),
        protocol: __zen('protocol'),
        src: __zen('src'),
        direction: __zen('direction'),
        src_port: __zen('src_port'),
        action: __zen('action'),
        dest: __zen('dest'),
        detect_count: __zen('detect_count'),
        dest_port: __zen('dest_port'),
        detected_time: __zen('detected_time'),
        sel_sig_group: __zen('sel_sig_group'),
        deny_remain_time: __zen('deny_remain_time'),
        hazard: __zen('hazard'),
        deny_type: __zen('deny_type'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});