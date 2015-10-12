
Ext.define('NFW2.view.NFW2_ips_signatureViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_ips_signature',

    data: {
        manage_user_group: __zen('manage_user_group'),
        edit2: __zen('edit2'),
        add_user_define: __zen('add_user_define'),
        copy_signature: __zen('copy_signature'),
        del: __zen('del'),
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
        desc: __zen('desc')
    }

});