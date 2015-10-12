
Ext.define('NFW2.view.win_ips_auditViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_ips_audit',

    data: {
        inspect_info: __zen('inspect_info'),
        sig_info: __zen('sig_info'),
        packet_info: __zen('packet_info')
    }

});