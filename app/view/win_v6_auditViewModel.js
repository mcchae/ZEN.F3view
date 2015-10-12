
Ext.define('NFW2.view.win_v6_auditViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_v6_audit',

    data: {
        fw_audit: __zen('fw_audit'),
        rule_id: __zen('rule_id'),
        date: __zen('date'),
        integrated: __zen('integrated'),
        individual: __zen('individual'),
        fw_audit_info1: __zen('fw_audit_info1'),
        print_file: __zen('print_file'),
        print_page: __zen('print_page'),
        add: __zen('add'),
        edit: __zen('edit'),
        confirm: __zen('confirm')
    }

});