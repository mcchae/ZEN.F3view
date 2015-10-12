
Ext.define('NFW2.store.ferretMenu', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'Ext.data.field.Field',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'ferretMenu',
            root: {
                ko: 'MENU',
                expanded: true,
                children: [
				{
                        ko: '네트워크',
                        menuid: 'network',
						en: 'Network',
						jp: 'ネットワーク',
                        children: [
                            {
                                leaf: true,
                                ko: '인터페이스',
                                id: 'NFW2_network_interface',
                                monitor: 'NFW2_monitor_network_interface',
								subko:'',
								en:'Interface',
								jp:'インターフェース'
                            },
                            {
                                ko: 'DNS',
								en:'DNS',
								jp:'DNS',
                                children: [
                                    {
                                        leaf: true,
                                        ko: 'DNS',
                                        id: 'NFW2_network_dns_dns',
										subko:'',
										en:'DNS',
										jp:'DNS'
                                    },
                                    {
                                        leaf: true,
                                        ko: 'DDNS',
                                        id: 'NFW2_network_dns_ddns',
										subko:'',
										en:'DDNS',
										jp:'DDNS'
                                    },
                                    {
                                        leaf: true,
                                        ko: '내부/외부 DNS',
                                        id: 'NFW2_network_dns_iodns',
										subko:'',
										en:'Internal/External DNS',
										jp:'内部・外部DNS'
                                    },
                                    {
                                        leaf: true,
                                        ko: 'DNS Cache',
                                        id: 'NFW2_network_dns_cache',
										subko:'',
										en:'DNS Cache',
										jp:'DNS Cache'
                                    }
                                ]
                            },
     
                                    {
                                        leaf: true,
                                        ko: '정적 라우팅',
                                        id: 'NFW2_network_router_static',
                                        monitor: 'NFW2_monitor_network_router',
										subko:'',
										en:'Static Routing',
										jp:'Staticルーティングの'
                                    },
                                    {
                                        leaf: true,
                                        ko: '정책 라우팅',
                                        id: 'NFW2_network_router_policy',
										subko:'',
										en:'Policy Routing',
										jp:'ポリシールーティングの'
                                    },
									 {
										leaf: true,
										ko: '동적 라우팅',
										id: 'NFW2_network_protocol',
										subko:'',
										en:'Dynamic Routing',
										jp:'Dynamicルーティングの'
									},
                                    {
                                        leaf: true,
                                        ko: 'Multipath 라우팅',
                                        id: 'NFW2_network_router_multipath',
										subko:'',
										en:'Multipath Routing',
										jp:'Multipathルーティングの'
                                    },
                                    {
                                        leaf: true,
                                        ko: 'Multicast 라우팅',
                                        id: 'NFW2_network_router_multicast',
										subko:'',
										en:'Multicast Routing',
										jp:'Multicastルーティングの'
                                    },
                                    {
                                        leaf: true,
                                        ko: 'VRRP',
                                        id: 'NFW2_network_router_vrrp',
										subko:'',
										en:'VRRP',
										jp:'VRRP'
                                    },
                                    {
                                        leaf: true,
                                        ko: 'Checker',
                                        id: 'NFW2_network_router_checker',
                                        monitor: 'NFW2_monitor_network_checker',
										subko:'',
										en:'Checker',
										jp:'Checker'
                                    },
                                    {
                                        leaf: true,
                                        ko: '스크립트',
                                        id: 'NFW2_network_router_script',
										subko:'',
										en:'Script',
										jp:'スクリプト'
                                    },
                                
                            
							 {
                                ko: 'IPM',
								en: 'IPM',
								jp: 'IPM',
                                children: [
                                    {
                                        leaf: true,
                                        ko: '관리 네트워크',
                                        id: 'NFW2_ipm_network',
                                        monitor : 'NFW2_monitor_ipm_map',
										subko:'',
										en:'Control network',
										jp:'管理ネットワーク'
                                    },
                                    {
                                        leaf: true,
                                        ko: '허용 호스트 설정',
                                        id: 'NFW2_ipm_allowHost',
                                        monitor : 'NFW2_monitor_ipm_map',
										subko:'',
										en:'Allow host setting',
										jp:'許容ホスト設定'
                                    }
                                ]
                            },
                            
                            {
                                leaf: true,
                                ko: 'L2TP',
                                id: 'NFW2_network_l2tp',
                                subko:'',
                                en:'L2TP',
                                jp:'L2TP'
                            },
                            {
                                ko: 'IPv6 터널링',
								en:'IPv6 tunneling',
								jp:'IPv6 トンネリング',
                                children: [
                                    {
                                        leaf: true,
                                        ko: '6to4',
                                        id: 'NFW2_network_ipv6Tunneling_6to4',
										subko:'',
										en:'6to4',
										jp:'6to4'
                                    },
                                    {
                                        leaf: true,
                                        ko: '설정 터널링',
                                        id: 'NFW2_network_ipv6Tunneling_6in4',
										subko:'',
										en:'Setting tunneling',
										jp:'設定トンネリング'
                                    },
                                    {
                                        leaf: true,
                                        ko: 'ISATAP',
                                        id: 'NFW2_network_ipv6Tunneling_isatap',
										subko:'',
										en:'ISATAP',
										jp:'ISATAP'
											}
                                ]
                            },
                          
                            {
                                leaf: true,
                                ko: '기타',
                                id: 'NFW2_network_etc',
								subko:'',
								en:'Etc',
								jp:'その他'
                            }
                        ]
                    },
					 {
                        ko: '시스템',
                        menuid: 'system',
						en:'System',
						jp:'システム',
                        children: [
                            {
                                leaf: true,
                                ko: '장비정보',
                                id: 'NFW2_system_equipmentState',
								subko:'',
								en:'Device information',
								jp:'装置情報'
                            },
                            {
                                leaf: true,
                                ko: '관리자',
                                id: 'NFW2_system_admin_adminConfig',
								subko:'',
								en:'Administrator',
								jp:'管理者'
                            },
                            {
                                leaf: true,
                                ko: '외부 서버 인증',
                                id: 'NFW2_system_extServerAuth',
								subko:'',
								en:'External server authentication',
								jp:'外部サーバ認証'
                            },
                            {
                                leaf: true,
                                ko: '업데이트',
                                id: 'NFW2_system_update',
								subko:'',
								en:'Update',
								jp:'アップデート'
                            },
                            {
                                leaf: true,
                                ko: '백업/복원',
                                id: 'NFW2_system_backup',
								subko:'',
								en:'Backup/ Restore',
								jp:'バックアップ・復元'
                            },
                            {
                                leaf: true,
                                ko: '종료/재시작',
                                id: 'NFW2_system_systemState',
								subko:'',
								en:'Shut down/Restart',
								jp:'終了・再スタート'
                            },
                            {
                                leaf: true,
                                ko: '인증서',
                                id: 'NFW2_system_certificate',
								subko:'',
								en:'Authentication certificate',
								jp:'認証書'
                            },
							{
                                ko: 'HA',
								en: 'HA',
								jp: 'HA',
                                children: [
                                    {
                                        leaf: true,
                                        ko: '동기화 설정',
                                        id: 'NFW2_network_ha_sync',
                                        monitor: 'NFW2_monitor_network_ha',
										subko:'',
										en:'Sync setting',
										jp:'同期化設定'
                                    },
                                    {
                                        leaf: true,
                                        ko: 'L3',
                                        id: 'NFW2_network_ha_l3',
                                        monitor: 'NFW2_monitor_network_ha',
										subko:'',
										en:'L3',
										jp:'L3'
                                    },
                                    {
                                        leaf: true,
                                        ko: 'L2',
                                        id: 'NFW2_network_ha_l2',
                                        monitor: 'NFW2_monitor_network_ha',
										subko:'',
										en:'L2',
										jp:'L2'
                                    },
                                    {
                                        leaf: true,
                                        ko: '부하분산',
                                        id: 'NFW2_network_ha_lb',
                                        monitor: 'NFW2_monitor_network_ha',
										subko:'',
										en:'Load balancing',
										jp:'負荷分散'
                                    },
                                    
                                ]
                            },
							{
                                leaf: true,
                                ko: 'LLCF',
                                id: 'NFW2_network_llcf',
								subko:'',
								en:'LLCF',
								jp:'LLCF'
                            },
							 {
                                ko: 'ALG',
                                en:'ALG',
                                jp:'ALG',
                                children: [
                                    {
                                        leaf: true,
                                        ko: 'Telnet',
                                        id: 'NFW2_network_alg_telnet',
                                        subko:'',
                                        en:'Telnet',
                                        jp:'Telnet'
                                    },
                                    {
                                        leaf: true,
                                        ko: 'FTP',
                                        id: 'NFW2_network_alg_ftp',
                                        subko:'',
                                        en:'FTP',
                                        jp:'FTP'
                                    }
                                ]
                            },
                            {
								leaf: true,
                                ko: 'RAID',
								id: 'NFW2_system_basic_raid',
								subko:'',
								en:'RAID',
								jp:'RAID'
                            },
                            {
                                leaf: true,
                                ko: '기본 설정',
                                id: 'NFW2_system_basic',
								subko:'',
								en:'Basic setting',
								jp:'基本設定'
                            },
                            {
                                leaf: true,
                                ko: '사용자 정의 로고',
                                id: 'NFW2_user_logo',
								subko:'',
								en:'사용자 정의 로고',
								jp:'사용자 정의 로고'
                            }
                        ]
                    },
                    {
                        ko: '방화벽 정책',
                        menuid: 'fw',
						en:'Firewall Policy',
						jp:'ファイアウォール ポリシー',
                        children: [
                            {
                                leaf: true,
                                ko: '보안',
                                id: 'NFW2_firewall_policy_filtering',
                                log: 'NFW2_log_logSearch_fw',
                                monitor: 'NFW2_monitor_firewall_tracker',
                                tracker: 'NFW2_trafficTracker_firewall',
                                atoz: '',
                                trigger: '',
								subko:'',
								en:'Security',
								jp:'セキュリティ'
                            },
                            {
                                leaf: true,
                                ko: 'NAT',
                                id: 'NFW2_firewall_policy_NAT',
                                log: 'NFW2_log_logSearch_fw',
                                monitor: 'NFW2_monitor_firewall_tracker',
                                tracker: 'NFW2_trafficTracker_firewall',
                                atoz: '',
                                trigger: '',
								subko:'',
								en:'NAT',
								jp:'NAT'
                            },
                            {
                                leaf: true,
                                ko: '화이트 리스트',
                                id: 'NFW2_firewall_policy_white',
                                log: '',
                                monitor: '',
                                tracker: '',
                                atoz: '',
                                trigger: '',
								subko:'',
								en:'White List',
								jp:'ホワイト'
                            },
                            {
                                leaf: true,
                                ko: '블랙 리스트',
                                id: 'NFW2_firewall_policy_black',
                                log: '',
                                monitor: '',
                                tracker: '',
                                atoz: '',
                                trigger: '',
								subko:'',
								en:'Black List',
								jp:'ブラック'
                            },
                            {
                                leaf: true,
                                ko: '사용자 인증',
                                id: 'NFW2_user_auth_policy',
                                log: '',
                                monitor: '',
                                tracker: '',
                                atoz: '',
                                trigger: '',
								subko:'',
								en:'User authentication',
								jp:'ユーザ認証'
                            },
                            {
                                leaf: true,
                                ko: '기타',
                                id: 'NFW2_firewall_etc',
                                log: '',
                                monitor: '',
                                tracker: '',
                                atoz: '',
                                trigger: '',
								subko:'',
								en:'Etc',
								jp:'その他'
                            },
                            {
                                ko: 'IPv6',
								en: 'IPv6',
								jp: 'IPv6',
                                children: [
                                    {
                                        leaf: true,
                                        ko: '보안',
                                        id: 'NFW2_firewall_policy_ipv6_filtering',
                                        log: 'NFW2_log_logSearch_fw',
                                        monitor: 'NFW2_monitor_firewall_tracker',
                                        tracker: 'NFW2_trafficTracker_firewall',
                                        atoz: '',
                                        trigger: '',
										subko:'IPv6 ',
										en:'Security',
										jp:'セキュリティ'
                                    },
                                    {
                                        leaf: true,
                                        ko: 'NAT',
                                        id: 'NFW2_firewall_policy_ipv6_NAT',
                                        log: 'NFW2_log_logSearch_fw',
                                        monitor: 'NFW2_monitor_firewall_tracker',
                                        tracker: 'NFW2_trafficTracker_firewall',
                                        atoz: '',
                                        trigger: '',
										subko:'IPv6 ',
										en:'NAT',
										jp:'NAT'
                                    },
									{
                                        leaf: true,
                                        ko: 'NAT64',
                                        id: 'NFW2_firewall_policy_ipv6_NAT64',
                                        log: 'NFW2_log_logSearch_fw',
                                        monitor: 'NFW2_monitor_firewall_tracker',
                                        tracker: 'NFW2_trafficTracker_firewall',
                                        atoz: '',
                                        trigger: '',
										subko:'',
										en:'NAT64',
										jp:'NAT64'
                                    },
									{
                                        leaf: true,
                                        ko: 'DNS64',
                                        id: 'NFW2_firewall_ipv6_dns64',
                                        log: '',
                                        monitor: '',
                                        tracker: '',
                                        atoz: '',
                                        trigger: '',
										subko:'',
										en:'DNS64',
										jp:'DNS64'
                                    },
                                    {
                                        leaf: true,
                                        ko: '화이트 리스트',
                                        id: 'NFW2_firewall_policy_ipv6_white',
                                        log: '',
                                        monitor: '',
                                        tracker: '',
                                        atoz: '',
                                        trigger: '',
										subko:'IPv6 ',
										en:'White List',
										jp:'ホワイト'
                                    },
                                    {
                                        leaf: true,
                                        ko: '블랙 리스트',
                                        id: 'NFW2_firewall_policy_ipv6_black',
                                        log: '',
                                        monitor: '',
                                        tracker: '',
                                        atoz: '',
                                        trigger: '',
										subko:'IPv6 ',
										en:'Black List',
										jp:'ブラック'
                                    },
                                    
                                ]
                            }
                        ]
                    },
                    {
                        ko: '방화벽 객체',
                        menuid: 'obj',
						en:'Firewall Object',
						jp:'ファイアウォールオブジェクト',
                        children: [
                            {
                                leaf: true,
                                ko: 'IP 주소',
                                id: 'NFW2_firewall_object_ip_address',
                                log: '',
                                monitor: '',
                                tracker: '',
                                atoz: '',
                                trigger: '',
								subko:'',
								en:'IP address',
								jp:'IPアドレス'
                            },
                            {
                                leaf: true,
                                ko: 'IP 주소 그룹',
                                id: 'NFW2_firewall_object_ip_addressGroup',
                                log: '',
                                monitor: '',
                                tracker: '',
                                atoz: '',
                                trigger: '',
								subko:'',
								en:'IP address group',
								jp:'IPアドレスグループ'
                            },
                            {
                                leaf: true,
                                ko: '서비스 포트',
                                id: 'NFW2_firewall_object_service_servicePort',
                                log: '',
                                monitor: '',
                                tracker: '',
                                atoz: '',
                                trigger: '',
								subko:'',
								en:'Service port',
								jp:'サービスポート'
                            },
                            {
                                leaf: true,
                                ko: '서비스 그룹',
                                id: 'NFW2_firewall_object_service_serviceGroup',
                                log: '',
                                monitor: '',
                                tracker: '',
                                atoz: '',
                                trigger: '',
								subko:'',
								en:'Service group',
								jp:'サービスグループ'
                            },
                            {
                                leaf: true,
                                ko: '국가',
                                id: 'NFW2_firewall_object_ip_country',
                                log: '',
                                monitor: '',
                                tracker: '',
                                atoz: '',
                                trigger: '',
								subko:'',
								en:'Country',
								jp:'国'
                            },
                            {
                                leaf: true,
                                ko: '도메인',
                                id: 'NFW2_firewall_object_domain',
                                log: '',
                                monitor: '',
                                tracker: '',
                                atoz: '',
                                trigger: '',
								subko:'',
								en:'Domain',
								jp:'ドメイン'
                            },
                            {
                                leaf: true,
                                ko: '스케쥴',
                                id: 'NFW2_firewall_object_schedule',
                                log: '',
                                monitor: '',
                                tracker: '',
                                atoz: '',
                                trigger: '',
								subko:'',
								en:'Schedule',
								jp:'スケジュール'
                            },
                            {
                                leaf: true,
                                ko: 'QoS',
                                id: 'NFW2_firewall_object_qos',
                                log: '',
                                monitor: 'NFW2_monitor_firewall_qos',
                                tracker: '',
                                atoz: '',
                                trigger: '',
								subko:'',
								en:'QoS',
								jp:'QoS'
                            },
                            {
                                leaf: true,
                                ko: '세션 사용량',
                                id: 'NFW2_firewall_object_session',
                                log: '',
                                monitor: 'NFW2_monitor_firewall_sessionAmount',
                                tracker: '',
                                atoz: '',
                                trigger: '',
								subko:'',
								en:'Session usage',
								jp:'セッション使用量'
                            },
                            {
                                leaf: true,
                                ko: '사용자',
                                id: 'NFW2_firewall_object_user',
                                log: '',
                                monitor: '',
                                tracker: '',
                                atoz: '',
                                trigger: '',
								subko:'',
								en:'Users',
								jp:'ユーザ'
                            },
                            {
                                leaf: true,
                                ko: '사용자 그룹',
                                id: 'NFW2_firewall_object_userGroup',
                                log: '',
                                monitor: '',
                                tracker: '',
                                atoz: '',
                                trigger: '',
								subko:'',
								en:'User group',
								jp:'ユーザグループ'
                            },
                            {
                                leaf: true,
                                ko: '사용자 인증 서버',
                                id: 'NFW2_user_auth_server',
                                log: '',
                                monitor: '',
                                tracker: '',
                                atoz: '',
                                trigger: '',
								subko:'',
								en:'User authentication server',
								jp:'ユーザ認証サーバ'
                            },
                            {
                                ko: 'IPv6',
								en: 'IPv6',
								jp: 'IPv6',
                                children: [
                                    {
                                        leaf: true,
                                        ko: 'IPv6 주소',
                                        id: 'NFW2_firewall_object_ip_ipv6_address',
                                        log: '',
                                        monitor: '',
                                        tracker: '',
                                        atoz: '',
                                        trigger: '',
										subko:'',
										en:'IPv6 address',
										jp:'IPv6アドレス'
                                    },
                                    {
                                        leaf: true,
                                        ko: 'IPv6 주소 그룹',
                                        id: 'NFW2_firewall_object_ip_ipv6_addressGroup',
                                        log: '',
                                        monitor: '',
                                        tracker: '',
                                        atoz: '',
                                        trigger: '',
										subko:'',
										en:'IPv6 address group',
										jp:'IPv6アドレスグループ'
                                    },
                                    {
                                        leaf: true,
                                        ko: '헤더',
                                        id: 'NFW2_firewall_object_ip_ipv6_header',
                                        log: '',
                                        monitor: '',
                                        tracker: '',
                                        atoz: '',
                                        trigger: '',
										subko:'',
										en:'Header',
										jp:'ヘッダー'
                                    }
                                ]
                            },
                            
                        ]
                    },
                    {
                        ko: '방화벽 프로파일',
                        menuid: 'profile',
						en:'Firewall Profile',
						jp:'ファイアウォールプロファイル',
                        children: [
                            {
                                leaf: true,
                                ko: '웹 필터링',
                                id: 'NFW2_firewall_profile_filtering_config',
                                log: '',
                                monitor: '',
                                tracker: 'NFW2_trafficTracker_httpUrl',
                                atoz: '',
                                trigger: 'NFW2_firewall_profile_filltering_group',
								subko:'',
								en:'Web Filtering',
								jp:'ウェブフィルタリング'
                            },
                            {
                                leaf: true,
                                ko: 'URL 그룹 리스트',
                                id: 'NFW2_firewall_profile_filtering_group',
                                log: '',
                                monitor: '',
                                tracker: 'NFW2_trafficTracker_httpUrl',
                                atoz: '',
                                trigger: 'NFW2_firewall_profile_filltering_config',
								subko:'',
								en:'URL group list',
								jp:'URLグループリスト'
                            },
                            {
                                leaf: true,
                                ko: '애플리케이션 제어',
                                id: 'NFW2_firewall_profile_config',
                                log: '',
                                monitor: 'NFW2_monitor_firewall_applicationControl',
                                tracker: 'NFW2_trafficTracker_ap',
                                atoz: '',
                                trigger: 'NFW2_firewall_profile_application_list',
								subko:'',
								en:'Application control',
								jp:'アプリケーション制御'
                            },
                            {
                                leaf: true,
                                ko: '애플리케이션 리스트',
                                id: 'NFW2_firewall_profile_list',
                                log: '',
                                monitor: 'NFW2_monitor_firewall_applicationControl',
                                tracker: 'NFW2_trafficTracker_ap',
                                atoz: '',
                                trigger: 'NFW2_firewall_profile_application_config',
								subko:'',
								en:'Application list',
								jp:'アプリケーションリスト'
                            },
                            
                        ]
                    },
                    {
                        ko: 'IPS',
                        menuid: 'ips',
						en:'IPS',
						jp:'IPS',
                        children: [
                            {
                                leaf: true,
                                ko: '프로파일',
                                id: 'NFW2_ips_profile',
                                log: 'NFW2_log_logSearch_ips',
                                monitor: 'NFW2_monitor_ips_uid',
                                tracker: 'NFW2_trafficTracker_ips',
                                atoz: '',
								subko:'',
								en:'Profile',
								jp:'プロファイル'
                            },
                            {
                                leaf: true,
                                ko: '시그너처 관리',
                                id: 'NFW2_ips_signature',
                                log: 'NFW2_log_logSearch_ips',
                                monitor: 'NFW2_monitor_ips_uid',
                                tracker: 'NFW2_trafficTracker_ips',
                                atoz: '',
								subko:'',
								en:'Signature control',
								jp:'シグネチャー管理'
                            },
                            {
                                leaf: true,
                                ko: 'PortScan 탐지',
                                id: 'NFW2_ips_portScan',
                                log: 'NFW2_log_logSearch_ips',
                                monitor: 'NFW2_monitor_ips_uid',
                                tracker: 'NFW2_trafficTracker_ips',
                                atoz: '',
								subko:'',
								en:'Port Scan detection',
								jp:'Port Scan 検知'
                            },
                            {
                                leaf: true,
                                ko: 'IP Spoofing',
                                id: 'NFW2_ips_ipSpoofing',
                                log: 'NFW2_log_logSearch_ips',
                                monitor: 'NFW2_monitor_ips_uid',
                                tracker: 'NFW2_trafficTracker_ips',
                                atoz: '',
								subko:'',
								en:'IP Spoofing',
								jp:'IP Spoofing'
                            },
                            {
                                leaf: true,
                                ko: '기타',
                                id: 'NFW2_ips_etc',
                                log: 'NFW2_log_logSearch_ips',
                                monitor: 'NFW2_monitor_ips_uid',
                                tracker: 'NFW2_trafficTracker_ips',
                                atoz: '',
								subko:'',
								en:'Etc',
								jp:'その他'
                            }
                        ]
                    },
                    {
                        ko: 'IPSec VPN',
                        menuid: 'ipsec',
						en:'IPSec VPN',
						jp:'IPSec VPN',
                        children: [
                            {
                                leaf: true,
                                ko: '보안 설정',
                                id: 'NFW2_ipsec_security_securityConf',
                                log: 'NFW2_log_logSearch_vpn',
                                monitor: '',
                                tracker: '',
                                atoz: '',
								subko:'',
								en:'Security setting',
								jp:'セキュリティ設定'
                            },
                            {
                                leaf: true,
                                ko: '기타',
                                id: 'NFW2_ipsec_etc',
                                log: 'NFW2_log_logSearch_vpn',
                                monitor: '',
                                tracker: '',
                                atoz: '',
								subko:'',
								en:'Etc',
								jp:'その他'
                            }
                        ]
                    },
                    {
                        ko: 'SSL VPN',
                        menuid: 'ssl',
						en:'SSL VPN',
						jp:'SSL VPN',
                        children: [
                            {
                                leaf: true,
                                ko: '사용자',
                                id: 'NFW2_ssl_user',
                                log: 'NFW2_log_logSearch_ssl',
                                monitor: '',
                                tracker: '',
                                atoz: '',
								subko:'',
								en:'Users',
								jp:'ユーザ'
                            },
                            {
                                leaf: true,
                                ko: '접근서버',
                                id: 'NFW2_ssl_server',
                                log: 'NFW2_log_logSearch_ssl',
                                monitor: '',
                                tracker: '',
                                atoz: '',
								subko:'',
								en:'Access server',
								jp:'アクセスサーバ'
                            },
                            {
                                leaf: true,
                                ko: '단말관리',
                                id: 'NFW2_ssl_terminal',
                                log: 'NFW2_log_logSearch_ssl',
                                monitor: '',
                                tracker: '',
                                atoz: '',
								subko:'',
								en:'Terminal management',
								jp:'端末管理'
                            },
                            {
                                leaf: true,
                                ko: '기타',
                                id: 'NFW2_ssl_basic',
                                log: 'NFW2_log_logSearch_ssl',
                                monitor: '',
                                tracker: '',
                                atoz: '',
								subko:'',
								en:'Etc',
								jp:'その他'
                            }
                        ]
                    },
                    {
                        ko: '안티바이러스',
                        menuid: 'av',
						en:'Anti-virus',
						jp:'アンチウイルス',
                        children: [
                            {
                                leaf: true,
                                ko: '프로파일',
                                id: 'NFW2_antivirus_profile',
                                log: 'NFW2_log_logSearch_av',
                                monitor: '',
                                tracker: '',
                                atoz: '',
                                trigger: '',
								subko:'',
								en:'Profile',
								jp:'プロファイル'
                            }
                        ]
                    },
                    {
                        ko: '안티스팸',
                        menuid: 'as',
						en:'Anti-spam',
						jp:'アンチスパム',
                        children: [
                            {
                                leaf: true,
                                ko: '프로파일',
                                id: 'NFW2_antispam_profile',
                                log: 'NFW2_log_logSearch_as',
                                monitor: '',
                                tracker: '',
                                atoz: '',
                                trigger: '',
								subko:'',
								en:'Profile',
								jp:'プロファイル'
                            }
                        ]
                    },
                    {
                        ko: 'DDoS',
                        menuid: 'ddos',
						en:'DDoS',
						jp:'DDoS',
                        children: [
                            {
                                leaf: true,
                                ko: '비정상트래픽 검사',
                                id: 'NFW2_ddos_trafficAnomaly',
                                log: 'NFW2_log_logSearch_ddos',
                                monitor: 'NFW2_monitor_ddos_traffic',
                                tracker: '',
                                atoz: '',
                                trigger: '',
								subko:'',
								en:'Abnormal traffic inspection',
								jp:'異常トラフィックの検査'
                            }
                        ]
                    },
					 {
                        ko: '트래픽트래커',
                        menuid: 'tracker',
						en:'Traffic tracker log',
						jp:'トラフィックトラッカー',
                        children: [
                            {
                                leaf: true,
                                ko: '방화벽',
                                id: 'NFW2_trafficTracker_firewall',
                                set: 'NFW2_firewall_policy_filtering',
                                log: 'NFW2_log_logSearch_fw',
                                monitor: 'NFW2_monitor_firewall_tracker',
								subko:'',
								en:'Firewall',
								jp:'ファイアウォール'
                            },
                            {
                                leaf: true,
                                ko: 'HTTP',
                                id: 'NFW2_trafficTracker_httpUrl',
                                set: 'NFW2_firewall_profile_filtering_config',
								subko:'',
								en:'HTTP',
								jp:'HTTP'
                            },
                            {
                                leaf: true,
                                ko: '애플리케이션',
                                id: 'NFW2_trafficTracker_ap',
                                set: 'NFW2_firewall_profile_config',
								subko:'',
								en:'Application',
								jp:'アプリケーション'
                            },
                            {
                                leaf: true,
                                ko: 'IPS',
                                id: 'NFW2_trafficTracker_ips',
                                set: 'NFW2_ips_profile',
                                monitor: 'NFW2_monitor_ips_uid',
                                log: 'NFW2_log_logSearch_ips',
								subko:'',
								en:'IPS',
								jp:'IPS'
                            }
                        ]
                    },
					{
                        ko: 'AtoZ',
                        menuid: 'atoz',
						en:'AtoZ',
						jp:'AtoZ',
                        children: [
                            {
                                leaf: true,
                                ko: 'AtoZ 설정',
                                id: 'NFW2_report_generate',
								subko:'',
								en:'AtoZ setting',
								jp:'AtoZ 設定'
                            }
                        ]
                    },
                   
                    
                    {
                        ko: '로그',
                        menuid: 'log',
						en:'Log',
						jp:'ログ',
                        children: [
                           
                            {
                                leaf: true,
                                ko: '네트워크',
                                id: 'NFW2_log_logSearch_network',
								subko:'',
								en:'Network',
								jp:'ネットワーク'
                            },
							 {
                                leaf: true,
                                ko: '시스템',
                                id: 'NFW2_log_logSearch_system',
								subko:'',
								en:'System',
								jp:'システム'
                            },
                            {
                                leaf: true,
                                ko: '방화벽',
                                id: 'NFW2_log_logSearch_fw',
                                set: 'NFW2_firewall_policy_filtering',
                                monitor: 'NFW2_monitor_firewall_tracker',
                                tracker: 'NFW2_trafficTracker_firewall',
								subko:'',
								en:'Firewall',
								jp:'ファイアウォール'
                            },
                            {
                                leaf: true,
                                ko: 'IPSec VPN',
                                id: 'NFW2_log_logSearch_vpn',
                                set: 'NFW2_ipsec_security_securityConf',
								subko:'',
								en:'IPSec VPN',
								jp:'IPSec VPN'
                            },
                            {
                                leaf: true,
                                ko: 'SSL VPN',
                                id: 'NFW2_log_logSearch_ssl',
                                set: 'NFW2_ssl_user',
								subko:'',
								en:'SSL VPN',
								jp:'SSL VPN'
                            },
                            {
                                leaf: true,
                                ko: 'IPS',
                                id: 'NFW2_log_logSearch_ips',
                                set: 'NFW2_ips_profile',
                                monitor: 'NFW2_monitor_ips_uid',
                                tracker: 'NFW2_trafficTracker_ips',
								subko:'',
								en:'IPS',
								jp:'IPS'
                            },
                            {
                                leaf: true,
                                ko: 'DDoS',
                                id: 'NFW2_log_logSearch_ddos',
                                set: 'NFW2_ddos_trafficAnomaly',
								subko:'',
								en:'DDoS',
								jp:'DDoS'
                            },
                            {
                                leaf: true,
                                ko: '안티바이러스',
                                id: 'NFW2_log_logSearch_av',
                                set: 'NFW2_antivirus_profile',
								subko:'',
								en:'Anti-virus',
								jp:'アンチウイルス'
                            },
                            {
                                leaf: true,
                                ko: '안티스팸',
                                id: 'NFW2_log_logSearch_as',
                                set: 'NFW2_antispam_profile',
								subko:'',
								en:'Anti-spam',
								jp:'アンチスパム'
                            },
                            {
                                leaf: true,
                                ko: 'System Notice',
                                id: 'NFW2_log_logSearch_system_notice',
								subko:'',
								en:'System Notice',
								jp:'System Notice'
                            },
                            {
                                leaf: true,
                                ko: '실시간 로그',
                                id: 'NFW2_log_realtime',
								subko:'',
								en:'Realtime Log',
								jp:'Realtime Log'
                            }
                        ]
                    },
                    {
                        ko: '통계',
                        menuid: 'log_stat',
						en:'Statistics',
						jp:'統計',
                        children: [
                            {
                                leaf: true,
                                ko: '사용량',
                                id: 'NFW2_log_statistics_usage',
								subko:'',
								en:'Usage',
								jp:'使用量'
                            },
                            {
                                leaf: true,
                                ko: '패킷 분포도',
                                id: 'NFW2_log_statistics_packet',
								subko:'',
								en:'Packet distribution',
								jp:'パケット散布図'
                            },
                            {
                                leaf: true,
                                ko: '로그량',
                                id: 'NFW2_log_statistics_log',
								subko:'',
								en:'Log usage',
								jp:'ログ量'
                            }
                        ]
                    },
                    {
                        ko: '로그 설정',
                        menuid: 'logset',
						en:'Log setting',
						jp:'ログ設定',
                        children: [
                            {
                                leaf: true,
                                ko: '기본 설정',
                                id: 'NFW2_log_config_log',
								subko:'',
								en:'Basic setting',
								jp:'基本設定'
                            },
                            {
                                leaf: true,
                                ko: '상세 설정',
                                id: 'NFW2_log_config_logDetail',
								subko:'',
								en:'Detail setting',
								jp:'詳細設定'
                            },
                            {
                                leaf: true,
                                ko: '서버 설정',
                                id: 'NFW2_log_config_logServer',
								subko:'',
								en:'Server setting',
								jp:'サーバ設定'
                            },
                            {
                                leaf: true,
                                ko: '데이터 관리',
                                id: 'NFW2_log_config_dataManage',
								subko:'',
								en:'Data control',
								jp:'データ管理'
                            }
                        ]
                    },
					{
                        ko: '네트워크',
                        menuid: 'mon_net',
						en:'Network',
						jp:'ネットワーク',
                        children: [
                            {
                                leaf: true,
                                ko: '트래픽',
                                id: 'NFW2_monitor_network_trafficAmount',
								subko:'',
								en:'Traffic',
								jp:'トラフィック'
                            },
                            {
                                leaf: true,
                                ko: '프로토콜 별 트래픽',
                                id: 'NFW2_monitor_network_protocol',
								subko:'',
								en:'Traffic per protocol',
								jp:'プロトコル別トラフィック'
                            },
                            {
                                leaf: true,
                                ko: '인터페이스 별 트래픽 정보',
                                id: 'NFW2_monitor_network_trafficMonitor',
                                set: 'NFW2_network_interface',
								subko:'',
								en:'Traffic information per interface',
								jp:'インターフェース別トラフィック情報'
                            },
                            {
                                leaf: true,
                                ko: '인터페이스 정보',
                                id: 'NFW2_monitor_network_interface',
                                set: 'NFW2_network_interface',
								subko:'',
								en:'Interface informatin',
								jp:'インターフェース情報'
                            },
                            {
                                leaf: true,
                                ko: 'ARP',
                                id: 'NFW2_monitor_network_arp',
								subko:'',
								en:'ARP',
								jp:'ARP'
                            },
                            {
                                leaf: true,
                                ko: '라우팅',
                                id: 'NFW2_monitor_network_router',
                                set: 'NFW2_network_router_static',
								subko:'',
								en:'Routing',
								jp:'ルーティング'
                            },
                            {
                                leaf: true,
                                ko: 'DHCP 할당 내역',
                                id: 'NFW2_monitor_network_dhcp',
								subko:'',
								en:'DHCP assigned contents',
								jp:'DHCP 割当内容'
                            },
                            {
                                leaf: true,
                                ko: '회선 대역폭',
                                id: 'NFW2_monitor_network_lineBandwidth',
								subko:'',
								en:'Line bandwidth',
								jp:'回線帯域幅'
                            },
                           
                            {
                                leaf: true,
                                ko: 'Checker',
                                id: 'NFW2_monitor_network_checker',
                                set: 'NFW2_network_router_checker',
								subko:'',
								en:'Checker',
								jp:'Checker'
                            },
                            {
                                leaf: true,
                                ko: '패킷 덤프',
                                id: 'NFW2_monitor_network_packetDump',
								subko:'',
								en:'Packet dump',
								jp:'パケットダンプ'                                
                            },
                            {
                                ko: 'IPM',
                                menuid: 'ipm',
                                en:'IPM',
                                jp:'IPM',
                                children: [
                                    {
                                        leaf: true,
                                        ko: 'Table',
                                        id: 'NFW2_monitor_ipm_table',                                        
                                        subko:'',
                                        en:'Table',
                                        jp:'Table'
                                    },
                                    {
                                        leaf: true,
                                        ko: 'Map',
                                        id: 'NFW2_monitor_ipm_map',                                        
                                        subko:'',
                                        en:'Map',
                                        jp:'Map'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        ko: '시스템',
                        menuid: 'mon_sys',
						en:'System',
						jp:'システム',
                        children: [
                            {
                                leaf: true,
                                ko: '시스템 사용량',
                                id: 'NFW2_monitor_system_cpu',
								subko:'',
								en:'System usage',
								jp:'システム使用量'
                            },
                            {
                                leaf: true,
                                ko: '데몬관리',
                                id: 'NFW2_monitor_system_daemon',
								subko:'',
								en:'Daemon management',
								jp:'デーモン管理'
                            },
							 {
                                leaf: true,
                                ko: 'HA',
                                id: 'NFW2_monitor_network_ha',
                                set: 'NFW2_network_ha_sync',
								subko:'',
								en:'HA',
								jp:'HA'
                            }
                        ]
                    },
                    
                    {
                        ko: '방화벽',
                        menuid: 'mon_fw',
						en:'Firewall',
						jp:'ファイアウォール',
                        children: [
                            {
                                leaf: true,
                                ko: '정책 트래커',
                                id: 'NFW2_monitor_firewall_tracker',
                                set: 'NFW2_firewall_policy_filtering',
                                log: 'NFW2_log_logSearch_fw',
                                tracker: 'NFW2_trafficTracker_firewall',
								subko:'',
								en:'Policy tracker',
								jp:'ポリシートラッカー'
                            },
                            {
                                leaf: true,
                                ko: '패킷 모니터',
                                id: 'NFW2_monitor_firewall_packet',
								subko:'',
								en:'Packet monitor',
								jp:'パケットモニタ'
                            },
                            {
                                leaf: true,
                                ko: '일반 세션',
                                id: 'NFW2_monitor_firewall_sessionInfo',
								subko:'',
								en:'Normal session',
								jp:'一般セッション'
                            },
                            {
                                leaf: true,
                                ko: '차단 세션',
                                id: 'NFW2_monitor_firewall_blockSession',
								subko:'',
								en:'Deny session',
								jp:'遮断セッション'
                            },
                            {
                                leaf: true,
                                ko: '세션 사용량',
                                id: 'NFW2_monitor_firewall_sessionAmount',
                                set: 'NFW2_firewall_object_session',
								subko:'',
								en:'Session usage',
								jp:'セッション使用量'
                                
                            },
                            {
                                leaf: true,
                                ko: '트래픽 Top',
                                id: 'NFW2_monitor_firewall_trafficTop',
								subko:'',
								en:'Traffic Top',
								jp:'トラフィック Top'
                            },
                            {
                                leaf: true,
                                ko: '애플리케이션',
                                id: 'NFW2_monitor_firewall_applicationControl',
                                set: 'NFW2_firewall_profile_config',
                                tracker: 'NFW2_trafficTracker_ap',
								subko:'',
								en:'Application',
								jp:'アプリケーション'
                            },
							{
                                leaf: true,
                                ko: '사용자',
                                id: 'NFW2_monitor_firewall_user',
								subko:'',
								en:'Users',
								jp:'ユーザ'
                            },
                            {
                                leaf: true,
                                ko: 'QoS',
                                id: 'NFW2_monitor_firewall_qos',
                                set: 'NFW2_firewall_object_qos',
								subko:'',
								en:'QoS',
								jp:'QoS'
                            }
                        ]
                    },
                    {
                        ko: 'IPS',
                        menuid: 'mon_ips',
						en:'IPS',
						jp:'IPS',
                        children: [
                            {
                                leaf: true,
                                ko: '정책 별 탐지/차단',
                                id: 'NFW2_monitor_ips_uid',
                                set: 'NFW2_ips_profile',
                                log: 'NFW2_log_logSearch_ips',
                                tracker: 'NFW2_trafficTracker_ips',
								subko:'',
								en:'Detect/Deny per policy',
								jp:'ポリシー別検知・遮断'
                            },
                            {
                                leaf: true,
                                ko: 'Top',
                                id: 'NFW2_monitor_ips_top',
                                set: 'NFW2_ips_profile',
                                log: 'NFW2_log_logSearch_ips',
                                tracker: 'NFW2_trafficTracker_ips',
								subko:'',
								en:'Top',
								jp:'Top'
                            },
                            {
                                leaf: true,
                                ko: 'IPS 대시보드',
                                id: 'NFW2_dashboard_ips',
                                set: 'NFW2_ips_profile',
                                log: 'NFW2_log_logSearch_ips',
                                tracker: 'NFW2_trafficTracker_ips',
								subko:'',
								en:'IPS Dashboard',
								jp:'IPS Dashboard'
                            }
                        ]
                    },
                    {
                        ko: 'IPSec VPN',
                        menuid: 'mon_ipsec',
						en:'IPSec VPN',
						jp:'IPSec VPN',
                        children: [
                            {
                                leaf: true,
                                ko: '터널 정보',
                                id: 'NFW2_monitor_ipsec_tunnel',
                                set: 'NFW2_ipsec_security_securityConf',
                                log: 'NFW2_log_logSearch_vpn',
								subko:'',
								en:'Tunnel information',
								jp:'トンネル情報'
                            }
                        ]
                    },
                    {
                        ko: 'SSL VPN',
                        menuid: 'mon_ssl',
						en:'SSL VPN',
						jp:'SSL VPN',
                        children: [
                            {
                                leaf: true,
                                ko: '실시간 터널 관리',
                                id: 'NFW2_monitor_ssl_tunnel',
                                set: 'NFW2_ssl_user',
                                log: 'NFW2_log_logSearch_ssl',
								subko:'',
								en:'Realtime tunnel control',
								jp:'Realtime tunnel control'
                            }
                        ]
                    },
                    {
                        ko: 'DDoS',
                        menuid: 'mon_ddos',
						en:'DDoS',
						jp:'DDoS',
                        children: [
                            {
                                leaf: true,
                                ko: '탐지/차단',
                                id: 'NFW2_monitor_ddos_traffic',
                                set: 'NFW2_ddos_trafficAnomaly',
                                log: 'NFW2_log_logSearch_ddos',
								subko:'',
								en:'Detect/Deny',
								jp:'検知・遮断'
                            }
                        ]
                    },
                    {
                        ko: '모니터 설정',
                        menuid: 'mon_set',
						en:'Monitor setting',
						jp:'モニター設定',
                        children: [
                            {
                                leaf: true,
                                ko: '기본 설정',
                                id: 'NFW2_monitor_basic',
								subko:'',
								en:'Basic setting',
								jp:'基本設定'
                            }
                        ]
                    }
					
                ]
            },
            fields: [
                {
                    name: 'ko'
                },
				{
                    name: 'subko'
                },
				{
                    name: 'en'
                },
				{
                    name: 'jp'
                },
                {
                    name: 'menuid'
                },
                {
                    name: 'id'
                },
                {
                    name: 'log'
                },
                {
                    name: 'monitor'
                },
                {
                    name: 'tracker'
                },
                {
                    name: 'atoz'
                },
                {
                    name: 'trigger'
                }
            ],
            proxy: {
                type: 'ajax',
                reader: {
                    type: 'json'
                }
            }
        }, cfg)]);
    }
});