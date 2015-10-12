
Ext.define('NFW2.view.win_firewall_orderViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_firewall_order',

    data: {
        priority_level: __zen('priority_level'),
        type4: __zen('type4'),
        rule_id: __zen('rule_id'),
        src: __zen('src'),
        dest: __zen('dest'),
        service: __zen('service'),
        profile: __zen('profile'),
        memo: __zen('memo'),
        rank: __zen('rank'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        select_secure_policy: __zen('select_secure_policy')
    }

});