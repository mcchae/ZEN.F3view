
Ext.define('NFW2.store.store_StoreManager', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_StoreManager',
            data: [
                {
                    viewID: 'NFW2_system_equipmentState',
                    winID: [
                        'NFW2_system_equipmentState'
                    ],
                    storeID: [
                        'store_filesystem_info',
                        'store_interface_info'
                    ]
                },
                {
                    viewID: 'NFW2_ddos_trafficAnomaly',
                    winID: [
                        'NFW2_ddos_trafficAnomaly'
                    ],
                    storeID: [
                        'store_trafficAnomaly_dns_portList',
                        'store_trafficAnomaly_portList',
                        'store_trafficAnomaly_sql_portList'
                    ]
                },
                {
                    viewID: 'NFW2_firewall_object_ip_address',
                    winID: [
                        'win_ipv4',
                        'NFW2_firewall_object_ip_address'
                    ],
                    storeID: [
                        'store_ipv4_list'
                    ]
                },
                {
                    viewID: 'NFW2_firewall_object_ip_ipv6_address',
                    winID: [
                        'win_ipv6',
                        'NFW2_firewall_object_ip_ipv6_address'
                    ],
                    storeID: [
                        'store_ipv6_list'
                    ]
                },
                {
                    viewID: 'NFW2_firewall_object_ip_country',
                    winID: [
                        'win_country',
                        'win_country_search',
                        'NFW2_firewall_object_ip_country'
                    ],
                    storeID: [
                        'store_country_item',
						'store_tmp_country',
                        'store_country_list'
                    ]
                },
                {                    
                    viewID: 'NFW2_firewall_policy_filtering',
                    winID: [
                        'win_audit',
                        'win_ipv4SPD',
                        'win_ipv4_group',
                        'win_spd_move',
                        'NFW2_firewall_policy_filtering',
                        'win_profile_http',
                        'win_awareness',
                        'win_add_ips_profile',
                        'win_antivirus_profile',
                        'win_antispam_profile',
                        'win_schedule',
                        'win_object_qos',
                        'win_object_session',
						'win_user',
						'win_user_group'
                    ],
                    storeID: [
                        'store_ip_obj',
                        'store_protocol',
                        'store_spd_ipv4_list',
                        'store_svc_obj',
						'store_ip_group_obj',
						'store_tmp_group',
                        'store_ipv4_group_member',
                        'store_ipv4_group_member_list',
                        'store_object_ipv4_group_list',
                        'store_tmp_dest',
                        'store_tmp_src',
                        'store_tmp_svc',
                        'store_fw_profile_web_list',
                        'store_http_language',
                        'store_http_nude',
                        'store_http_sex',
                        'store_http_url_tree',
                        'store_http_violence',
                        'store_profile_application_list',
                        'store_profile_qos',
                        'store_profile_ref_full_list',
                        'store_profile_ref_list',
                        'store_action',
                        'store_ips_profile_group',
                        'store_ips_profile_list',
                        'store_ips_profile_signature_list',
                        'store_use',
                        'store_use_signature',
                        'store_antivirus_behav',
                        'store_antivirus_ftp_filter',
                        'store_antivirus_list',
                        'store_antivirus_smtp_filter',
                        'store_antivirus_filter',
                        'store_antispam_list',
                        'store_antispam_rbl',
                        'store_antispam_rec',
                        'store_antispam_spam',
                        'store_antispam_ipfilter',
                        'store_antispam_mailfilter',
                        'store_object_schedule_list',
                        'store_schedule_time',
                        'store_firewall_object_qos',
                        'store_object_session_list',
						'store_country_item',
						'store_tmp_country',
						'store_port_icmp',
						'store_port_icmpv6',
						'store_port_protocol',
						'store_user_list'
                    ]
                },
                {
                    viewID: 'NFW2_firewall_policy_ipv6_filtering',
                    winID: [
                        'win_ipv6SPD',
                        'win_v6spd_move',
                        'NFW2_firewall_policy_ipv6_filtering',
                        'win_profile_http',
                        'win_awareness',
                        'win_add_ips_profile',
                        'win_antivirus_profile',
                        'win_antispam_profile',
                        'win_schedule',
                        'win_object_qos',
                        'win_object_session',
                        'win_object_ipAddress_ipv6Header',
						'win_ipv6_group'
                    ],
                    storeID: [
                        'store_ipv6_obj',
                        'store_protocol',
                        'store_spd_ipv6_list',
                        'store_svc_obj',
                        'store_tmp_dest',
                        'store_tmp_src',
                        'store_tmp_svc',
						'store_ipv6_group_obj',
						'store_tmp_group',
                        'store_fw_profile_web_list',
                        'store_http_language',
                        'store_http_nude',
                        'store_http_sex',
                        'store_http_url_tree',
                        'store_http_violence',
                        'store_profile_app_list',
                        'store_profile_application_list',
                        'store_profile_qos',
                        'store_profile_ref_full_list',
                        'store_profile_ref_list',
                        'store_action',
                        'store_ips_profile_group',
                        'store_ips_profile_list',
                        'store_ips_profile_signature_list',
                        'store_use',
                        'store_use_signature',
                        'store_antivirus_behav',
                        'store_antivirus_ftp_filter',
                        'store_antivirus_list',
                        'store_antivirus_smtp_filter',
                        'store_antivirus_filter',
                        'store_antispam_list',
                        'store_antispam_rbl',
                        'store_antispam_rec',
                        'store_antispam_spam',
                        'store_antispam_ipfilter',
                        'store_antispam_mailfilter',
                        'store_object_schedule_list',
                        'store_schedule_time',
                        'store_firewall_object_qos',
                        'store_object_session_list',
                        'store_ipv6_object_list',
                        'store_object_ipv6header_list'
                    ]
                },
                {
                    viewID: 'NFW2_firewall_policy_ipv6_NAT',
                    winID: [
                        'win_ipv6NAT',
                        'win_v6nat_move',
                        'NFW2_firewall_policy_ipv6_NAT'
                    ],
                    storeID: [
                        'store_ipv6_obj',
						'store_ipv6_group_obj',
                        'store_protocol',
                        'store_nat_ipv6_list',
                        'store_svc_obj',
                        'store_tmp_dest',
                        'store_tmp_src',
                        'store_tmp_svc',
                        'store_tmp_xdest',
                        'store_tmp_xsrc',
                        'store_tmp_xsvc',
                        'store_nat_type',
                        'store_eth'
                    ]
                },
				{
                    viewID: 'NFW2_firewall_policy_ipv6_NAT64',
                    winID: [
                        'win_nat64',
                        'win_nat64_move',
                        'NFW2_firewall_policy_ipv6_NAT64'
                    ],
                    storeID: [
                        'store_ip_obj',
						'store_ipv6_obj',
						'store_ipv6_group_obj',
                        'store_protocol',
                        'store_nat64_list',
                        'store_svc_obj',
                        'store_tmp_dest',
                        'store_tmp_src',
                        'store_tmp_svc',
                        'store_tmp_xdest',
                        'store_tmp_xsrc',
                        'store_tmp_xsvc',
                        'store_nat_type',
                        'store_eth'
                    ]
                },
				{
                    viewID: 'NFW2_firewall_ipv6_dns64',
                    winID: [
                        'NFW2_firewall_ipv6_dns64'
                    ],
                    storeID: [
                        'store_interface'
                    ]
                },
                {
                    viewID: 'NFW2_firewall_policy_NAT',
                    winID: [
                        'win_ipv4NAT',
                        'win_nat_move',
                        'NFW2_firewall_policy_NAT'
                    ],
                    storeID: [
                        'store_ip_obj',
                        'store_protocol',
                        'store_nat_ipv4_list',
                        'store_svc_obj',
                        'store_tmp_xdest',
                        'store_tmp_xsrc',
                        'store_tmp_xsvc',
                        'store_tmp_dest',
                        'store_tmp_src',
                        'store_tmp_svc',
                        'store_nat_type',
                        'store_eth'
                    ]
                },
                {
                    viewID: 'NFW2_system_admin_adminConfig',
                    winID: [
                        'win_admin_config',
                        'NFW2_system_admin_adminConfig'
                    ],
                    storeID: [
                        'store_usersList'
                    ]
                },
                {
                    viewID: 'NFW2_system_basic',
                    winID: [
                        'NFW2_system_basic'
                    ],
                    storeID: [
                        'store_timeserver',
                        'store_timesync',
                        'store_timezone'
                    ]
                },
				{
                    viewID: 'NFW2_user_logo',
                    winID: [
                        'NFW2_user_logo'
                    ],
                    storeID: []
                },
                {
                    viewID: 'NFW2_system_basic_raid',
                    winID: [
                        'NFW2_system_basic_raid'
                    ],
                    storeID: [
                        'store_raid_list',
                    ]
                },
                {
                    viewID: 'NFW2_system_extServerAuth',
                    winID: [
                        'NFW2_system_extServerAuth'
                    ],
                    storeID: [
                        'store_serverauth'
                    ]
                },
                {
                    viewID: 'NFW2_system_snmp',
                    winID: [
                        'win_oid',
                        'win_snmp',
                        'NFW2_system_snmp'
                    ],
                    storeID: [
                        'store_auth_algo',
                        'store_privacy_algo',
                        'store_system_snmp_list'
                    ]
                },
                {
                    viewID: 'NFW2_system_systemState',
                    winID: [
                        'NFW2_system_systemState'
                    ],
                    storeID: [
                        'store_system_state_min',
                        'store_system_state_time'
                    ]
                },
                {
                    viewID: 'NFW2_system_update',
                    winID: [
                        'NFW2_upgradeWaitMsg',
                        'NFW2_system_update',
						'win_update_result'
                    ],
                    storeID: [
                        'store_upload_file_list',
                        'store_weeks'
                    ]
                },
                {
                    viewID: 'NFW2_network_dns_iodns',
                    winID: [
                        'win_split_dns',
                        'NFW2_network_dns_iodns'
                    ],
                    storeID: [
                        'store_split_dns_list',
                        'store_split_type',
                        'store_split_zone'
                    ]
                },
                {
                    viewID: 'NFW2_network_ha_l2',
                    winID: [
                        'win_ha_l2',
                        'NFW2_network_ha_l2'
                    ],
                    storeID: [
                        'store_ha_branch_list',
                        'store_interface',
                        'store_l2_compose',
                        'store_l2_config_a',
                        'store_l2_config_s',
                        'store_l2_type',
                        'store_l2_way_s'
                    ]
                },
                {
                    viewID: 'NFW2_network_ha_l3',
                    winID: [
                        'win_ha_l3',
                        'NFW2_network_ha_l3'
                    ],
                    storeID: [
                        'store_ha_head_list',
                        'store_interface',
                        'store_l3_compose',
                        'store_l3_config_a',
                        'store_l3_config_s',
                        'store_l3_way_a',
                        'store_l3_way_s'
                    ]
                },
                {
                    viewID: 'NFW2_network_ha_lb',
                    winID: [
                        'win_ha_lb',
                        'NFW2_network_ha_lb'
                    ],
                    storeID: [
                        'store_ha_lb_list',
                        'store_ha_lb_type',
                        'store_interface',
                        'store_ha_lb_action'
                    ]
                },
                {
                    viewID: 'NFW2_network_llcf',
                    winID: [
                        'NFW2_network_llcf'
                    ],
                    storeID: [
                        'store_physical_bond',
                        'store_physical_link'
                    ]
                },
                {
                    viewID: 'NFW2_network_router_checker',
                    winID: [
                        'win_router_checker',
                        'NFW2_network_router_checker'
                    ],
                    storeID: [
                        'store_checker_action',
                        'store_checker_period',
                        'store_interface',
                        'store_network_router_checker_list'
                    ]
                },
                {
                    viewID: 'NFW2_network_router_script',
                    winID: [
                        'NFW2_network_router_script'
                    ],
                    storeID: [
                        
                    ]
                },
                {
                    viewID: 'NFW2_network_router_vrrp',
                    winID: [
                        'win_router_vrrp',
                        'NFW2_network_router_vrrp'
                    ],
                    storeID: [
                        'store_interface',
                        'store_network_router_vrrp_list',
                        'store_vrrp_failover'
                    ]
                },
                {
                    viewID: 'NFW2_ssl_basic',
                    winID: [
                        'NFW2_ssl_basic'
                    ],
                    storeID: [
                        'store_sslplus_auth',
                        'store_sslplus_block',
                        'store_sslplus_encry',
                        'store_sslplus_split'
                    ]
                },
                {
                    viewID: 'NFW2_ssl_server',
                    winID: [
                        'win_ssl_server',
                        'NFW2_ssl_server'
                    ],
                    storeID: [
                        'store_sslplus_server_list'
                    ]
                },
                {
                    viewID: 'NFW2_ssl_terminal',
                    winID: [
                        'NFW2_ssl_terminal'
                    ],
                    storeID: [
                        'store_monitor_ssl_terminal_list'
                    ]
                },
                {
                    viewID: 'NFW2_ssl_user',
                    winID: [
                        'win_ssl_user',
                        'NFW2_ssl_user'
                    ],
                    storeID: [
                        'store_sslplus_user_list'
                    ]
                },
                {
                    viewID: 'NFW2_firewall_object_domain',
                    winID: [
                        'win_ipv4_domain',
                        'NFW2_firewall_object_domain'
                    ],
                    storeID: [
                        'store_domain_list'
                    ]
                },
                {
                    viewID: 'NFW2_firewall_object_user',
                    winID: [
                        'win_user',
						'win_user_import',
                        'NFW2_firewall_object_user'
                    ],
                    storeID: [
                        'store_user_list',
						'store_user_import'
                    ]
                },
                {
                    viewID: 'NFW2_firewall_object_userGroup',
                    winID: [
                        'win_user_group',
						'win_user_group_import',
                        'NFW2_firewall_object_userGroup',
                        'win_user',
                    ],
                    storeID: [
                        'store_user_list',
						'store_user_group_list',
						'store_usergroup_import'
                    ]
                },
                {
                    viewID: 'NFW2_firewall_object_ip_addressGroup',
                    winID: [
                        'win_ipv4_group',
                        'NFW2_firewall_object_ip_addressGroup'
                    ],
                    storeID: [
                        'store_ip_group_obj',
                        'store_tmp_group',
                        'store_object_ipv4_group_list'
                    ]
                },
                {
                    viewID: 'NFW2_firewall_object_ip_ipv6_addressGroup',
                    winID: [
                        'win_ipv6_group',
                        'NFW2_firewall_object_ip_ipv6_addressGroup'
                    ],
                    storeID: [
                        'store_ipv6_group_obj',
                        'store_tmp_group',
                        'store_object_ipv6_group_list'
                    ]
                },
                {
                    viewID: 'NFW2_firewall_object_schedule',
                    winID: [
                        'win_schedule',
                        'NFW2_firewall_object_schedule'
                    ],
                    storeID: [
                        'store_object_schedule_list',
                        'store_schedule_time'
                    ]
                },
                {
                    viewID: 'NFW2_firewall_object_service_serviceGroup',
                    winID: [
                        'win_portgroup',
                        'win_service_port',
                        'NFW2_firewall_object_service_serviceGroup'
                    ],
                    storeID: [
                        'store_ip_group_obj',
                        'store_object_service_group_list',
                        'store_tmp_group',
                        'store_port_icmp',
                        'store_port_icmpv6',
                        'store_port_protocol'
                    ]
                },
                {
                    viewID: 'NFW2_firewall_object_service_servicePort',
                    winID: [
                        'win_service_port',
                        'NFW2_firewall_object_service_servicePort'
                    ],
                    storeID: [
                        'store_object_service_port_list',
                        'store_port_icmp',
                        'store_port_icmpv6',
                        'store_port_protocol'
                    ]
                },
                {
                    viewID: 'NFW2_firewall_policy_black',
                    winID: [
                        'NFW2_upload_result_win',
                        'win_white_black_ip',
                        'NFW2_firewall_policy_black'
                    ],
                    storeID: [
                        'store_white_black_ip_list'
                    ]
                },
                {
                    viewID: 'NFW2_firewall_policy_white',
                    winID: [
                        'NFW2_upload_result_win',
                        'win_white_black_ip',
                        'NFW2_firewall_policy_white'
                    ],
                    storeID: [
                        'store_white_black_ip_list'
                    ]
                },
                {
                    viewID: 'NFW2_firewall_policy_ipv6_black',
                    winID: [
                        'NFW2_upload_result_win',
                        'win_white_black_ip',
                        'NFW2_firewall_policy_ipv6_black'
                    ],
                    storeID: [
                        'store_white_black_ip_list'
                    ]
                },
                {
                    viewID: 'NFW2_firewall_policy_ipv6_white',
                    winID: [
                        'NFW2_upload_result_win',
                        'win_white_black_ip',
                        'NFW2_firewall_policy_ipv6_white'
                    ],
                    storeID: [
                        'store_white_black_ip_list'
                    ]
                },
                {
                    viewID: 'NFW2_firewall_profile_config',
                    winID: [
                        'win_application_more',
                        'win_awareness',
                        'NFW2_firewall_profile_config'
                    ],
                    storeID: [
                        'store_profile_application_list',
                        'store_profile_qos',
                        'store_profile_ref_full_list',
                        'store_profile_ref_list'
                    ]
                },
                {
                    viewID: 'NFW2_firewall_profile_list',
                    winID: [
                        'win_applist',
                        'NFW2_firewall_profile_list'
                    ],
                    storeID: [
                        'store_profile_category',
                        'store_profile_content',
                        'store_profile_popularity',
                        'store_profile_protocol',
                        'store_profile_purpose',
                        'store_profile_ref_list',
                        'store_profile_released',
                        'store_profile_technology',
                        'store_profile_vendor'
                    ]
                },
                {
                    viewID: 'NFW2_firewall_profile_filtering_config',
                    winID: [
                        'win_profile_http',
                        'NFW2_firewall_profile_filtering_config',
						'win_profile_config',
						'win_profile_http_result'
                    ],
                    storeID: [
                        'store_fw_profile_web_list',
                        'store_http_language',
                        'store_http_nude',
                        'store_http_sex',
                        'store_http_url_tree',
                        'store_http_violence'
                    ]
                },
                {
                    viewID: 'NFW2_firewall_profile_filtering_group',
                    winID: [
                        'win_profile_group',
                        'NFW2_firewall_profile_filtering_group'
                    ],
                    storeID: [
                        'store_profile_group'
                    ]
                },
                {
                    viewID: 'NFW2_ips_portScan',
                    winID: [
                        'NFW2_ips_portScan'
                    ],
                    storeID: [
                        'store_portscan_action',
                        'store_portscan_dest',
                        'store_portscan_obj',
                        'store_portscan_sense',
                        'store_portscan_src'
                    ]
                },
                {
                    viewID: 'NFW2_ipsec_etc',
                    winID: [
                        'win_etc_dr_automation',
                        'win_etc_tunnel_routing',
                        'win_etc_xauth',
                        'NFW2_ipsec_etc'
                    ],
                    storeID: [
                        'store_etc_dr_list',
                        'store_etc_dr_tunnel',
                        'store_etc_tunnel',
                        'store_etc_tunnel_list',
                        'store_etc_tunnel_sd',
                        'store_etc_xauth_list',
                        'store_interface'
                    ]
                },
                {
                    viewID: 'NFW2_ipsec_security_securityConf',
                    winID: [
                        'win_ipsec',
                        'win_isakmp_cert',
                        'NFW2_ipsec_security_securityConf'
                    ],
                    storeID: [
                        'store_interface',
                        'store_ipsec_auth',
                        'store_ipsec_enau_obj',
                        'store_ipsec_encpt',
                        'store_ipsec_idtype',
                        'store_ipsec_lifetime',
                        'store_ipsec_pfs',
                        'store_ipsec_sechost',
                        'store_isakmp_cert',
                        'store_isakmp_enau_obj',
                        'store_isakmp_encpt',
                        'store_isakmp_lifetime',
                        'store_security_ipsecsa_list'
                    ]
                },
                {
                    viewID: 'NFW2_log_config_dataManage',
                    winID: [
                        'NFW2_log_config_dataManage'
                    ],
                    storeID: [
                        'store_log_manage_unzip_list',
                        'store_log_manage_zip_list'
                    ]
                },
                {
                    viewID: 'NFW2_log_config_logServer',
                    winID: [
                        'NFW2_log_config_logServer',
						'win_oid',
						'win_snmp',
						'win_syslog'
                    ],
                    storeID: [
                        'store_auth_algo',
                        'store_logserver_syslist',
						'store_logserver_syslog',
						'store_logserver_xtm',
						'store_privacy_algo',
						'store_system_snmp_list'
                    ]
                },
                {
                    viewID: 'NFW2_log_config_log',
                    winID: [
                        'NFW2_log_config_log'
                    ],
                    storeID: [
                        'store_logDataDate',
                        'store_network_range',
                        'store_pname_list'
                    ]
                },
                {
                    viewID: 'NFW2_log_config_logDetail',
                    winID: [
                        'NFW2_log_config_logDetail'
                    ],
                    storeID: [
                        'store_log_config_tree'
                    ]
                },
                {
                    viewID: 'NFW2_log_logSearch_as',
                    winID: [
                        'NFW2_log_logSearch_as'
                    ],
                    storeID: [
                        'store_log_as',
                        'store_logsearch_count',
                        'store_logsearch_name',
                        'store_logsearch_sort'
                    ]
                },
                {
                    viewID: 'NFW2_log_logSearch_av',
                    winID: [
                        'NFW2_log_logSearch_av'
                    ],
                    storeID: [
                        'store_log_av',
                        'store_logsearch_count',
                        'store_logsearch_name',
                        'store_logsearch_sort'
                    ]
                },
                {
                    viewID: 'NFW2_log_logSearch_ddos',
                    winID: [
                        'NFW2_log_logSearch_ddos'
                    ],
                    storeID: [
                        'store_log_ddos',
                        'store_logsearch_count',
                        'store_logsearch_name',
                        'store_logsearch_sort'
                    ]
                },
                {
                    viewID: 'NFW2_log_logSearch_fw',
                    winID: [
                        'NFW2_log_logSearch_fw'
                    ],
                    storeID: [
                        'store_log_fw',
                        'store_logsearch_count',
                        'store_logsearch_name',
                        'store_logsearch_sort'
                    ]
                },
                {
                    viewID: 'NFW2_log_logSearch_ips',
                    winID: [
                        'NFW2_log_logSearch_ips',
						'win_ips_audit'
                    ],
                    storeID: [
                        'store_log_ips',
                        'store_logsearch_count',
                        'store_logsearch_name',
                        'store_logsearch_sort'
                    ]
                },
                {
                    viewID: 'NFW2_log_logSearch_network',
                    winID: [
                        'NFW2_log_logSearch_network'
                    ],
                    storeID: [
                        'store_log_network',
                        'store_logsearch_count',
                        'store_logsearch_name',
                        'store_logsearch_sort'
                    ]
                },
                {
                    viewID: 'NFW2_log_logSearch_ssl',
                    winID: [
                        'NFW2_log_logSearch_ssl'
                    ],
                    storeID: [
                        'store_log_ssl',
                        'store_logsearch_count',
                        'store_logsearch_name',
                        'store_logsearch_sort'
                    ]
                },
                {
                    viewID: 'NFW2_log_logSearch_system',
                    winID: [
                        'NFW2_log_logSearch_system'
                    ],
                    storeID: [
                        'store_log_system',
                        'store_logsearch_count',
                        'store_logsearch_name',
                        'store_logsearch_sort'
                    ]
                },
                {
                    viewID: 'NFW2_log_logSearch_system_notice',
                    winID: [
                        'NFW2_log_logSearch_system_notice'
                    ],
                    storeID: [
                        'store_log_system_notice'
                    ]
                },
                {
                    viewID: 'NFW2_log_logSearch_vpn',
                    winID: [
                        'NFW2_log_logSearch_vpn'
                    ],
                    storeID: [
                        'store_log_vpn',
                        'store_logsearch_count',
                        'store_logsearch_name',
                        'store_logsearch_sort'
                    ]
                },
                {
                    viewID: 'NFW2_log_logSearch_waf',
                    winID: [
                        'NFW2_log_logSearch_waf'
                    ],
                    storeID: [
                        'store_log_waf',
                        'store_logsearch_waf_search',
                        'store_logsearch_count',
                        'store_logsearch_name',
                        'store_logsearch_sort'
                    ]
                },
                {
                    viewID: 'NFW2_log_realtime',
                    winID: [
                        'NFW2_log_realtime'
                    ],
                    storeID: [
                        'store_monitor_log_realtime'
                    ]
                },
                {
                    viewID: 'NFW2_network_dns_cache',
                    winID: [
                        'win_cache',
                        'NFW2_network_dns_cache'
                    ],
                    storeID: [
                        'store_interface',
                        'store_network_dnscache_list'
                    ]
                },
                {
                    viewID: 'NFW2_network_router_multipath',
                    winID: [
                        'win_multipath',
                        'win_multipath_line',
                        'NFW2_network_router_multipath'
                    ],
                    storeID: [
                        'store_interface',
                        'store_multi_line_select_list',
                        'store_network_multipath_list'
                    ]
                },
                {
                    viewID: 'NFW2_ips_ipSpoofing',
                    winID: [
                        'win_ipSpoofing',
                        'NFW2_ips_ipSpoofing'
                    ],
                    storeID: [
                        'store_interface',
                        'store_ipv4_object_list',
                        'store_ipv6_object_list',
                        'store_network_ipspoofing_list'
                    ]
                },
                {
                    viewID: 'NFW2_network_router_policy',
                    winID: [
                        'win_router_policy',
                        'NFW2_network_router_policy'
                    ],
                    storeID: [
                        'store_interface',
                        'store_router_policy_list'
                    ]
                },
                {
                    viewID: 'NFW2_network_router_static',
                    winID: [
                        'win_router_static',
                        'NFW2_network_router_static'
                    ],
                    storeID: [
                        'store_interface',
                        'store_router_static_list'
                    ]
                },
                {
                    viewID: 'NFW2_network_ha_sync',
                    winID: [
                        'NFW2_network_ha_sync'
                    ],
                    storeID: [
                        'store_config_sync_list',
                        'store_ha_sync_day',
                        'store_ha_sync_hour',
                        'store_ha_sync_minute',
                        'store_interface',
                        'store_log_sync_list',
                        'store_network_ha_sync',
                        'store_session_sync_list'
                    ]
                },
                {
                    viewID: 'NFW2_network_router_multicast',
                    winID: [
                        'NFW2_network_router_multicast'
                    ],
                    storeID: [
                        'store_interface',
                        'store_network_router_multicast',
                        'store_use_interface'
                    ]
                },
                {
                    viewID: 'NFW2_firewall_object_qos',
                    winID: [
                        'win_object_qos',
                        'NFW2_firewall_object_qos'
                    ],
                    storeID: [
                        'store_firewall_object_qos'
                    ]
                },
                {
                    viewID: 'NFW2_ips_profile',
                    winID: [
                        'win_add_del_signature',
                        'win_add_ips_profile',
                        'win_ips_profile_all_edit',
                        'NFW2_ips_profile'
                    ],
                    storeID: [
                        'store_action',
                        'store_block_type',
                        'store_direction',
                        'store_hazard',
                        'store_ips_profile_group',
                        'store_ips_profile_list',
                        'store_ips_profile_signature_list',
                        'store_ips_protocol',
                        'store_use',
                        'store_use_signature'
                    ]
                },
                {
                    viewID: 'NFW2_ips_signature',
                    winID: [
                        'win_ips_all_edit',
                        'win_ips_group',
                        'win_ips_signature_user',
                        'win_ips_user_group',
                        'win_signature_info',
                        'NFW2_ips_signature'
                    ],
                    storeID: [
                        'store_action',
                        'store_block_type',
                        'store_direction',
                        'store_hazard',
                        'store_ips_group',
                        'store_ips_group_add',
                        'store_ips_protocol',
                        'store_ips_signature_list',
                        'store_ips_user_group'
                    ]
                },
                {
                    viewID: 'NFW2_antivirus_profile',
                    winID: [
                        'win_antivirus_profile',
                        'win_antivirus_filefilter',
                        'NFW2_antivirus_profile'
                    ],
                    storeID: [
                        'store_antivirus_behav',
                        'store_antivirus_ftp_filter',
                        'store_antivirus_list',
                        'store_antivirus_smtp_filter',
                        'store_antivirus_filter'
                    ]
                },
                {
                    viewID: 'NFW2_antispam_profile',
                    winID: [
                        'win_antispam_profile',
                        'win_antispam_rbl',
                        'win_antispam_spam',
                        'win_antispam_ipfilter',
                        'win_antispam_mailfilter',
                        'NFW2_antispam_profile'
                    ],
                    storeID: [
                        'store_antispam_list',
                        'store_antispam_rbl',
                        'store_antispam_rec',
                        'store_antispam_spam',
                        'store_antispam_ipfilter',
                        'store_antispam_mailfilter'
                    ]
                },
                {
                    viewID: 'NFW2_network_etc',
                    winID: [
                        'NFW2_network_etc'
                    ],
                    storeID: [
                        'store_interface',
                        'store_network_etc'
                    ]
                },
                {
                    viewID: 'NFW2_ips_etc',
                    winID: [
                        'win_ips_etc_static',
                        'NFW2_ips_etc'
                    ],
                    storeID: [
                        'store_interface',
                        'store_ips_etc_profile_list'
                    ]
                },
                {
                    viewID: 'NFW2_firewall_object_ip_ipv6_header',
                    winID: [
                        'win_object_ipAddress_ipv6Header',
                        'NFW2_firewall_object_ip_ipv6_header'
                    ],
                    storeID: [
                        'store_ipv6_object_list',
                        'store_object_ipv6header_list'
                    ]
                },
                {
                    viewID: 'NFW2_firewall_etc',
                    winID: [
                        'NFW2_firewall_etc'
                    ],
                    storeID: [
                        'store_firewall_etc_list',
                        'store_firewall_etc_network_type'
                    ]
                },
                {
                    viewID: 'NFW2_firewall_object_session',
                    winID: [
                        'win_object_session',
                        'NFW2_firewall_object_session'
                    ],
                    storeID: [
                        'store_object_session_list'
                    ]
                },
                {
                    viewID: 'NFW2_system_certificate',
                    winID: [
                        'NFW2_system_certificate'
                    ],
                    storeID: [
                        'store_system_cacertificate_list',
                        'store_system_certificate_list'
                    ]
                },
                {
                    viewID: 'NFW2_network_dns_dns',
                    winID: [
                        'NFW2_network_dns_dns'
                    ],
                    storeID: [
                        
                    ]
                },
                {
                    viewID: 'NFW2_network_dns_ddns',
                    winID: [
                        'NFW2_network_dns_ddns'
                    ],
                    storeID: [
                        'store_serviceServer'
                    ]
                },
                {
                    viewID: 'NFW2_system_backup',
                    winID: [
                        'NFW2_upgradeWaitMsg',
                        'NFW2_system_backup'
                    ],
                    storeID: [
                        'store_backup_list',
                        'store_backup_weeks',
                        'store_rollback_appimg',
                        'store_rollback_do',
                        'store_rollback_firm',
                        'store_rollback_ramd'
                    ]
                },
                {
                    viewID: 'NFW2_network_interface',
                    winID: [
                        'win_logical_interface',
                        'win_physical_interface',
                        'NFW2_network_interface'
                    ],
                    storeID: [
                        'store_arp_ip',
                        'store_bonding_member',
                        'store_bonding_primary',
                        'store_bondingMode',
                        'store_bridge_member',
                        'store_getNetworkList',
                        'store_hashMode',
                        'store_interfaceKind',
                        'store_lacpRate',
                        'store_lname_list',
                        'store_localization',
                        'store_modem',
                        'store_networkDuplex',
                        'store_networkMode',
                        'store_networkSpeed',
                        'store_networkSpeed_half',
                        'store_networkZone',
                        'store_phy_ipv4',
                        'store_phy_ipv6',
                        'store_pname_list',
                        'store_primary',
                        'store_vip_ipv4',
                        'store_vip_ipv6'
                    ]
                },
                {
                    viewID: 'NFW2_user_auth_policy',
                    winID: [
                        'NFW2_user_auth_policy',
						'win_user_policy',
						'win_ipv4',
						'win_ipv4_group'
                    ],
                    storeID: [
                        'store_user_auth_policy_list',
						'store_ip_obj',
						'store_tmp_src',
						'store_ip_group_obj',
						'store_tmp_group'
                    ]
                },
                {
                    viewID: 'NFW2_user_auth_server',
                    winID: [
                        'NFW2_user_auth_server',
						'win_user_server'
                    ],
                    storeID: [
                        'store_user_auth_server_list',
						'store_user_server_list'
                    ]
                },
                {
                    viewID: 'NFW2_trafficTracker_ap',
                    winID: [
                        'NFW2_trafficTracker_ap'
                    ],
                    storeID: [
                        'store_country_items',
						'store_profile_category',
						'store_profile_purpose',
						'store_profile_technology',
						'store_tracker_app',
						'store_tracker_app_action',
						'store_tracker_app_list',
						'store_tracker_app_total',
						'store_tracker_count',
						'store_tracker_otype',
						'store_tracker_protocol',
						'store_tracker_purpose',
						'store_tracker_ser_type',
						'store_tracker_sort',
						'store_tracker_spc_type'
                    ]
                },
                {
                    viewID: 'NFW2_trafficTracker_firewall',
                    winID: [
                        'NFW2_trafficTracker_firewall'
                    ],
                    storeID: [
                        'store_country_items',
						'store_tracker_count',
						'store_tracker_fir_action',
						'store_tracker_fir_list',
						'store_tracker_fir_mode',
						'store_tracker_otype',
						'store_tracker_protocol',
						'store_tracker_purpose',
						'store_tracker_ser_type',
						'store_tracker_sort',
						'store_tracker_spc_type',
						'store_tracker_total',
						'store_tracker_traffic',
						'store_tracker_work'
                    ]
                },
                {
                    viewID: 'NFW2_trafficTracker_httpUrl',
                    winID: [
                        'NFW2_trafficTracker_httpUrl'
                    ],
                    storeID: [
                        'store_country_items',
						'store_tracker_http',
						'store_tracker_http_action',
						'store_tracker_http_list',
						'store_tracker_http_total',
						'store_tracker_count',
						'store_tracker_http_otype',
						'store_tracker_protocol',
						'store_tracker_purpose',
						'store_tracker_ser_type',
						'store_tracker_sort',
						'store_tracker_spc_type',
						'store_tracker_work'
                    ]
                },
                {
                    viewID: 'NFW2_trafficTracker_ips',
                    winID: [
                        'NFW2_trafficTracker_ips'
                    ],
                    storeID: [
                        'store_country_items',
						'store_tracker_ips',
						'store_tracker_ips_action',
						'store_tracker_ips_list',
						'store_tracker_ips_total',
						'store_tracker_count',
						'store_tracker_ips_otype',
						'store_tracker_ips_protocol',
						'store_tracker_purpose',
						'store_tracker_priority',
						'store_tracker_ser_type',
						'store_tracker_sort',
						'store_tracker_spc_type',
						'store_tracker_ips_traffic'
                    ]
                },
                {
                    viewID: 'NFW2_monitor_network_router',
                    winID: [
                        'NFW2_monitor_network_router'
                    ],
                    storeID: [
                        'store_monitor_iptype',
                        'store_monitor_router_ipv4_list',
                        'store_monitor_router_ipv6_list',
                        'store_monitor_update_min'
                    ]
                },
                {
                    viewID: 'NFW2_monitor_network_arp',
                    winID: [
                        'NFW2_monitor_network_arp'
                    ],
                    storeID: [
                        'store_monitor_iptype',
                        'store_monitor_arp_v4_list',
                        'store_monitor_arp_v6_list',
                        'store_monitor_update_time'
                    ]
                },
                {
                    viewID: 'NFW2_monitor_network_dhcp',
                    winID: [
                        'NFW2_monitor_network_dhcp'
                    ],
                    storeID: [
                        'store_monitor_network_dhcp_list',                        
                        'store_monitor_update_time'
                    ]
                },
                {
                    viewID: 'NFW2_monitor_network_lineBandwidth',
                    winID: [
                        'NFW2_monitor_network_lineBandwidth'
                    ],
                    storeID: [
                        'store_interface',
                        'store_monitor_bandwidth_time',
                        'store_monitor_network_bandwidth'                        
                    ]
                },
                {
                    viewID: 'NFW2_monitor_firewall_blockSession',
                    winID: [
                        'NFW2_monitor_firewall_blockSession'
                    ],
                    storeID: [
                        'store_monitor_iptype',
                        'store_monitor_session_class',
                        'store_monitor_session_filter',
                        'store_monitor_session_protocol',
                        'store_monitor_session_v4_list',
                        'store_monitor_session_v6_list'
                    ]
                },
                {
                    viewID: 'NFW2_monitor_firewall_trafficTop',
                    winID: [
                        'NFW2_monitor_firewall_trafficTop'
                    ],
                    storeID: [
                        'store_monitor_iptype',
                        'store_monitor_policy_list',
                        'store_monitor_policy_topn'                        
                    ]
                },
                {
                    viewID: 'NFW2_monitor_ips_uid',
                    winID: [
                        'NFW2_monitor_ips_uid',
                        'win_monitor_ips_uid_detail',
                        'win_monitor_ips_uid_details',
                        'win_monitor_ips_uid_filter'
                    ],
                    storeID: [
                        'store_monitor_ips_uid_list',
                        'store_monitor_ips_uid_detail_list1',
                        'store_monitor_ips_uid_detail_list2',
                        'store_monitor_ips_uid_detail_list3'
                    ]
                },
                {
                    viewID: 'NFW2_monitor_ips_top',
                    winID: [
                        'NFW2_monitor_ips_top',
                        'win_monitor_ips_trace',
                        'win_monitor_ips_who'
                    ],
                    storeID: [                                             
                    ]
                },
                {
                    viewID: 'NFW2_dashboard_ips',
                    winID: [
						'NFW2_dashboard_ips',
						'win_alarm_setting',
						'win_firewall_order',
						'win_firewall_order_move',
                        'NFW2_monitor_ips_uid',
                        'win_monitor_ips_uid_detail',
                        'win_monitor_ips_uid_details',
                        'win_monitor_ips_uid_filter'
                    ],
                    storeID: [
                        'store_monitor_ips_uid_list',
                        'store_monitor_ips_uid_detail_list1',
                        'store_monitor_ips_uid_detail_list2',
                        'store_monitor_ips_uid_detail_list3',
						'store_daships_alarm_set',
						'store_daships_policy',
						'store_daships_policy_set',
						'store_daships_uid_list',
						'store_dashtraffic_alarm',
						'store_dashtraffic_top1',
						'store_dashtraffic_top2',
						'store_dashtraffic_top3',
						'store_dashtraffic_top4',
						'store_filtering_setting',
						'store_filterset_option',
						'store_filterset_type'
                    ]
                },
                {
                    viewID: 'NFW2_monitor_ddos_traffic',
                    winID: [
                        'NFW2_monitor_ddos_traffic'
                    ],
                    storeID: [                        
                        'store_monitor_ddos_list'                        
                    ]
                },
                {
                    viewID: 'NFW2_monitor_firewall_qos',
                    winID: [
                        'NFW2_monitor_firewall_qos'
                    ],
                    storeID: [                        
                        'store_monitor_qos_list'                        
                    ]
                },
                {
                    viewID: 'NFW2_monitor_system_cpu',
                    winID: [
                        'NFW2_monitor_system_cpu'
                    ],
                    storeID: [
                        'store_monitor_grid',
                        'store_monitor_grid_mem',
                        'store_monitor_interval',
                        'store_monitor_item',
                        'store_monitor_seconds'                        
                    ]
                },
                {
                    viewID: 'NFW2_monitor_network_protocol',
                    winID: [
                        'NFW2_monitor_network_protocol'
                    ],
                    storeID: [
                        'store_monitor_interval',
                        'store_monitor_protocol_bit',
                        'store_monitor_protocol_item',
                        'store_monitor_protocol_seconds',
                        'store_monitor_seconds'                        
                    ]
                },
                {
                    viewID: 'NFW2_monitor_network_trafficAmount',
                    winID: [
                        'NFW2_monitor_network_trafficAmount'
                    ],
                    storeID: [
                        'store_monitor_interval',
                        'store_monitor_grid',
                        'store_monitor_item',
                        'store_monitor_seconds',
                        'store_monitor_token'                        
                    ]
                },
                {
                    viewID: 'NFW2_monitor_firewall_applicationControl',
                    winID: [
                        'NFW2_monitor_firewall_applicationControl',
                        'win_application_more'
                    ],
                    storeID: [
                        'store_monitor_app_display',
                        'store_monitor_app_list',
                        'store_monitor_app_sort',
                        'store_monitor_tracker_count',
                        'store_monitor_tracker_time',
                        'store_profile_category',
                        'store_profile_purpose',
                        'store_profile_technology'                        
                    ]
                },
                {
                    viewID: 'NFW2_monitor_firewall_sessionInfo',
                    winID: [
                        'NFW2_monitor_firewall_sessionInfo'
                    ],
                    storeID: [
                        'store_monitor_sessionInfo',
                        'store_monitor_sinfo_service',
                        'store_monitor_update_sinfo'
                    ]
                },
                {
                    viewID: 'NFW2_monitor_network_checker',
                    winID: [
                        'NFW2_monitor_network_checker'
                    ],
                    storeID: [
                        'store_monitor_checker_list',
                        'store_monitor_update'                        
                    ]
                },
                {
                    viewID: 'NFW2_monitor_network_ha',
                    winID: [
                        'NFW2_monitor_network_ha'
                    ],
                    storeID: [
                        'store_monitor_ha_checker',
                        'store_monitor_ha_info',
                        'store_monitor_ha_session',
                        'store_monitor_ha_vrrp',
                        'store_monitor_update'
                    ]
                },
                {
                    viewID: 'NFW2_monitor_network_interface',
                    winID: [
                        'NFW2_monitor_network_interface'
                    ],
                    storeID: [
                        'store_monitor_interface_list',
                        'store_monitor_interface_menu',
                        'store_monitor_update'
                    ]
                },
                {
                    viewID: 'NFW2_monitor_network_trafficMonitor',
                    winID: [
                        'NFW2_monitor_network_trafficMonitor'
                    ],
                    storeID: [
                        'store_monitor_traffic_sinfo',
                        'store_monitor_traffic_tinfo'                        
                    ]
                },
                {
                    viewID: 'NFW2_monitor_system_daemon',
                    winID: [
                        'NFW2_monitor_system_daemon'
                    ],
                    storeID: [
                        'store_monitor_daemon_list',
                        'store_monitor_update'                        
                    ]
                },
                {
                    viewID: 'NFW2_monitor_firewall_sessionAmount',
                    winID: [
                        'NFW2_monitor_firewall_sessionAmount'
                    ],
                    storeID: [
                        'store_monitor_grid',
                        'store_monitor_interval',
                        'store_monitor_item',
                        'store_monitor_seconds',
                        'store_monitor_session_key'                        
                    ]
                },
				{
                    viewID: 'NFW2_monitor_basic',
                    winID: [
                        'NFW2_monitor_basic'
                    ],
                    storeID: [
                        'store_eth_checkbox'                        
                    ]
                },
				{
                    viewID: 'NFW2_monitor_firewall_user',
                    winID: [
                        'NFW2_monitor_firewall_user'
                    ],
                    storeID: [
                        'store_monitor_user_list'
                    ]
                },
                {
                    viewID: 'NFW2_monitor_firewall_tracker',
                    winID: [
						'NFW2_monitor_firewall_tracker',
                        'win_audit',
                        'win_ipv4SPD',
                        'win_spd_move',
                        'NFW2_firewall_policy_filtering',
                        'win_profile_http',
                        'win_awareness',
                        'win_add_ips_profile',
                        'win_antivirus_profile',
                        'win_antispam_profile',
                        'win_schedule',
                        'win_object_qos',
                        'win_object_session'
                    ],
                    storeID: [
						'store_monitor_tracker_action',
						'store_monitor_tracker_list',
						'store_monitor_tracker_service',
						'store_monitor_tracker_sort',
						'store_monitor_tracker_time',
						'store_monitor_tracker_stype',
						'store_monitor_tracker_type',
						'store_country_item',
						'store_country_items',
                        'store_ip_obj',
                        'store_protocol',
                        'store_spd_ipv4_list',
                        'store_svc_obj',
                        'store_tmp_dest',
                        'store_tmp_src',
                        'store_tmp_svc',
                        'store_fw_profile_web_list',
                        'store_http_language',
                        'store_http_nude',
                        'store_http_sex',
                        'store_http_url_tree',
                        'store_http_violence',
                        'store_profile_app_list',
                        'store_profile_application_list',
                        'store_profile_qos',
                        'store_profile_ref_full_list',
                        'store_profile_ref_list',
                        'store_action',
                        'store_ips_profile_group',
                        'store_ips_profile_list',
                        'store_ips_profile_signature_list',
                        'store_use',
                        'store_use_signature',
                        'store_antivirus_behav',
                        'store_antivirus_ftp_filter',
                        'store_antivirus_list',
                        'store_antivirus_smtp_filter',
                        'store_antivirus_filter',
                        'store_antispam_list',
                        'store_antispam_rbl',
                        'store_antispam_rec',
                        'store_antispam_spam',
                        'store_antispam_ipfilter',
                        'store_antispam_mailfilter',
                        'store_object_schedule_list',
                        'store_schedule_time',
                        'store_firewall_object_qos',
                        'store_object_session_list'
                    ]
                },
                {
                    viewID: 'NFW2_report_generate',
                    winID: [
                        'NFW2_report_generate',
                        'win_inter_report',
                        'win_report_generate',
                        'win_setting_tracker'
                    ],
                    storeID: [
                        'store_atoz_report_day_list',
                        'store_atoz_report_email',
                        'store_atoz_report_inter_list',
                        'store_atoz_report_month_list',
                        'store_atoz_report_userset_list',
                        'store_atoz_report_week_list',
                        'store_atoz_tracker_edit',
                        'store_atoz_tracker_protocol',
                        'store_atoz_tracker_type_edit',
                        'store_country_item'
                    ]
                },
                {
                    viewID: 'NFW2_monitor_network_packetDump',
                    winID: [
                        'NFW2_monitor_network_packetDump',
                        'win_packet_dump'
                    ],
                    storeID: [
                        'store_monitor_packet_list'
                    ]
                },
                {
                    viewID: 'NFW2_network_ipv6Tunneling_6to4',
                    winID: [
                        'NFW2_network_ipv6Tunneling_6to4'                        
                    ],
                    storeID: [
                        'store_interface',
                        'store_tunnel_6to4_list'                  
                    ]
                },
                {
                    viewID: 'NFW2_network_ipv6Tunneling_6in4',
                    winID: [
                        'NFW2_network_ipv6Tunneling_6in4'                        
                    ],
                    storeID: [
                        'store_interface',                                                
                        'store_tunnel_set_list'                        
                    ]
                },
                {
                    viewID: 'NFW2_network_ipv6Tunneling_isatap',
                    winID: [
                        'NFW2_network_ipv6Tunneling_isatap'                        
                    ],
                    storeID: [
                        'store_interface',                        
                        'store_tunnel_isatap_list',                        
                        'store_interface_isatap'
                    ]
                },
                {
                    viewID: 'NFW2_ipm_network',
                    winID: [
                        'NFW2_ipm_network',
                        'win_ipm_network'                
                    ],
                    storeID: [
                        'store_interface',
                        'store_ipm_network_list'                        
                    ]
                },
                {
                    viewID: 'NFW2_ipm_allowHost',
                    winID: [
                        'NFW2_ipm_allowHost',
                        'win_ipm_allowHost'
                    ],
                    storeID: [
                        'store_interface',
                        'store_ipm_host_list',
                        'store_ipm_host_manager_list'                    
                    ]
                },
                {
                    viewID: 'NFW2_network_l2tp',
                    winID: [
                        'NFW2_network_l2tp'
                    ],
                    storeID: [

                    ]
                },
                {
                    viewID: 'NFW2_log_statistics_usage',
                    winID: [
                        'NFW2_log_statistics_usage'
                    ],
                    storeID: [

                    ]
                },
                {
                    viewID: 'NFW2_log_statistics_packet',
                    winID: [
                        'NFW2_log_statistics_packet'
                    ],
                    storeID: [

                    ]
                },
                {
                    viewID: 'NFW2_log_statistics_log',
                    winID: [
                        'NFW2_log_statistics_log'
                    ],
                    storeID: [

                    ]
                },
                {
                    viewID: 'NFW2_network_protocol',
                    winID: [
                        'NFW2_network_protocol',
                        'win_network_protocol_area',
                        'win_network_protocol_bgp_address',
                        'win_network_protocol_bgp_network',
                        'win_network_protocol_ospf_area',
                        'win_network_protocol_ospf_interface',
                        'win_network_protocol_ospf_network',
                        'win_network_protocol_rip_network',
                        'win_network_protocol_rip_status',
                        'win_network_protocol_status',
                        'win_rip_ad_setting',
                        'win_ospf_ad_setting',
                        'win_bgp_ad_setting'
                    ],
                    storeID: [
                        'store_protocol_bgp_list',
                        'store_protocol_ospf_list',
                        'store_protocol_rip_list',
                        'store_nw_protocol_inter'
                    ]
                },
                {
                    viewID: 'NFW2_monitor_ipm_table',
                    winID: [
                        'NFW2_monitor_ipm_table',
                        'win_ipm_allowHost'               
                    ],
                    storeID: [
                        'store_interface',
                        'store_ipm_host_list',
                        'store_ipm_host_manager_list',
                        'store_monitor_ipm_table_list'
                    ]
                },
                {
                    viewID: 'NFW2_monitor_ipm_map',
                    winID: [
                        'NFW2_monitor_ipm_map',
                        'monitor_ipm_allowhost_con'
                    ],
                    storeID: [
                        'store_interface',
                        'store_ipm_host_list',
                        'store_ipm_host_manager_list',
                        'store_ipm_monitor_map_list',
                        'store_ipm_monitor_map_ip_list',
                    ]
                },
                {
                    viewID: 'NFW2_monitor_ipsec_tunnel',
                    winID: [
                        'NFW2_monitor_ipsec_tunnel'
                    ],
                    storeID: [
                        'store_monitor_ipsec_tunnel'
                    ]
                },
                {
                    viewID: 'NFW2_monitor_firewall_packet',
                    winID: [
                        'NFW2_monitor_firewall_packet'
                    ],
					storeID: []
                },
                {
                    viewID: 'NFW2_network_alg_telnet',
                    winID: [
                        'NFW2_network_alg_telnet',
                        'win_network_alg_telnet'
                    ],
                    storeID: [
                        'store_alg_telnet_proxy'
                    ]
                },
                {
                    viewID: 'NFW2_network_alg_ftp',
                    winID: [
                        'NFW2_network_alg_ftp',
                        'win_network_alg_ftp'
                    ],
                    storeID: [
                        'store_action_list',
                        'store_alg_ftp_proxy',
                        'store_interface',
                        'store_type_list',
                        'store_user_setting_list'
                    ]
                },
                {
                    viewID: 'NFW2_monitor_ssl_tunnel',
                    winID: [
                        'NFW2_monitor_ssl_tunnel'
                    ],
                    storeID: [
                        'store_monitor_ssl_tunnel_list'
                    ]
                }
            ],
            proxy: {
                type: 'jsonp',
                reader: {
                    type: 'json'
                }
            },
            fields: [
                {
                    name: 'viewID'
                },
                {
                    name: 'winID'
                },
                {
                    name: 'storeID'
                }
            ]
        }, cfg)]);
    }
});