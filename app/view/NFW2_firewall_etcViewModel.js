
Ext.define('NFW2.view.NFW2_firewall_etcViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_firewall_etc',

    data: {
        use_spi: __zen('use_spi'),
        use_voip: __zen('use_voip'),
        use_l3_mode: __zen('use_l3_mode'),
        policy_apply: __zen('policy_apply'),
        policy_save: __zen('policy_save'),
        add_monitor_network: __zen('add_monitor_network'),
        add_protect_network: __zen('add_protect_network'),
        protect_period: __zen('protect_period'),
        hour: __zen('hour'),
        min: __zen('min'),
        sensing_protocol: __zen('sensing_protocol'),
        tcp: __zen('tcp'),
        udp: __zen('udp'),
        icmp: __zen('icmp'),
        detect_time: __zen('detect_time'),
        include: __zen('include'),
        exception: __zen('exception'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        spd_nat_redun_chk: __zen('spd_nat_redun_chk')
    }

});