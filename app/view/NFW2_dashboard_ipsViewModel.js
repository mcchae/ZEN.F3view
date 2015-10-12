
Ext.define('NFW2.view.NFW2_dashboard_ipsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_dashboard_ips',

    data: {
        traffic_per_policy: __zen('traffic_per_policy'),
        policy_prio_set: __zen('policy_prio_set'),
        rule_id: __zen('rule_id'),
        profile_name: __zen('profile_name'),
        src: __zen('src'),
        dest: __zen('dest'),
        traffic: __zen('traffic'),
        detect: __zen('detect'),
        block: __zen('block'),
        count: __zen('count'),
        hazard: __zen('hazard'),
        alarm: __zen('alarm'),
        alarm_setting: __zen('alarm_setting'),
        alarm_info: __zen('alarm_info'),
        top_n_screen: __zen('top_n_screen'),
        attack_topn: __zen('attack_topn'),
        more_result: __zen('more_result'),
        attack_port_topn: __zen('attack_port_topn'),
        detect_topn: __zen('detect_topn'),
        profile_traffic: __zen('profile_traffic'),
        all_traffic: __zen('all_traffic'),
        block_topn: __zen('block_topn'),
        alarm_time: __zen('alarm_time')
    }

});