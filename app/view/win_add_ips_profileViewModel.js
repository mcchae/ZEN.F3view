
Ext.define('NFW2.view.win_add_ips_profileViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_add_ips_profile',

    data: {
        profile_name: __zen('profile_name'),
        desc: __zen('desc'),
        edit2: __zen('edit2'),
        fsid: __zen('fsid'),
        sig_group_name: __zen('sig_group_name'),
        sig_name: __zen('sig_name'),
        basic_info: __zen('basic_info'),
        protocol: __zen('protocol'),
        src: __zen('src'),
        src_port: __zen('src_port'),
        direction: __zen('direction'),
        dest: __zen('dest'),
        dest_port: __zen('dest_port'),
        hazard: __zen('hazard'),
        inspect_info: __zen('inspect_info'),
        time_sec: __zen('time_sec'),
        count: __zen('count'),
        deny_info: __zen('deny_info'),
        preserve_sec: __zen('preserve_sec'),
        type2: __zen('type2'),
        action: __zen('action'),
        audit: __zen('audit'),
        use: __zen('use'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        show_only_sel_sig: __zen('show_only_sel_sig')
    }

});