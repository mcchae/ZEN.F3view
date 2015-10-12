
Ext.define('NFW2.view.NFW2_ddos_trafficAnomalyViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_ddos_trafficanomaly',

    data: {
        ta_dos: __zen('ta_dos'),
        ta_ddos: __zen('ta_ddos'),
        ta_http: __zen('ta_http'),
        ta_dns: __zen('ta_dns'),
        ta_sql: __zen('ta_sql'),
        toggle_on: __zen('toggle_on'),
        toggle_off: __zen('toggle_off'),
        action: __zen('action'),
        detect: __zen('detect'),
        deny: __zen('deny'),
        detect_time: __zen('detect_time'),
        packet_size: __zen('packet_size'),
        ta_loadbl: __zen('ta_loadbl'),
        ta_server_ses_opt: __zen('ta_server_ses_opt'),
        sec: __zen('sec'),
        count: __zen('count'),
        ta_sub_packet: __zen('ta_sub_packet'),
        ta_sub_tcp: __zen('ta_sub_tcp'),
        ta_sub_post: __zen('ta_sub_post'),
        ta_sub_cache: __zen('ta_sub_cache'),
        ta_sub_http: __zen('ta_sub_http'),
        ta_annormal: __zen('ta_annormal'),
        ta_user_ses: __zen('ta_user_ses'),
        ta_limit_win: 'Window Size '+__zen('limit'),
        ta_limit_zero: 'Zero Window Count '+__zen('limit'),
        ta_limit_cont: 'Content Length '+__zen('limit'),
        ta_limit_post: 'POST Parameter Count '+__zen('limit'),
        ta_limit_count: 'Detected Count '+__zen('limit'),
        ta_limit_interval: 'Detected Interval '+__zen('limit'),
        ta_http_port_add: __zen('ta_http_port_add'),
        ta_dns_port_add: __zen('ta_dns_port_add'),
        ta_sql_port_add: __zen('ta_sql_port_add'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});