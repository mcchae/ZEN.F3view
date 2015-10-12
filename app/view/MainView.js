
Ext.define('NFW2.view.MainView', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.mainview',

    requires: [
        'NFW2.view.MainViewViewModel',
        'NFW2.view.MainViewViewController',
        'Ext.menu.Menu',
        'Ext.button.Cycle',
        'Ext.menu.CheckItem',
        'Ext.form.Label',
        'Ext.form.field.ComboBox'
    ],

    config: {
        timer: '',
        isRaidShow: true,
        apply_start_time: '""',
        apply_end_time: '""',
        mogodb_start_time: '""',
        mogodb_end_time: '""',
        save_start_time: '""',
        save_end_time: '""',
        integrity_start_time: '""',
        integrity_end_time: '""',
        sync_start_time: '""',
        sync_end_time: '""',
        clientInfo: {
            sessionInfo: '',
            localizatonInfo: '',
            perspectiveInfo: '',
            userId: '',
            clientIp: '',
            hostIp: ''
        },
        licenseInfo: {
            ips: false,
            as: false,
            av: false,
            ddos: false,
            fw: false,
            ipsec: false,
            ssl: false,
            tracker: false
        },
        realLicense: {
            
        },
        favMenu: {
            
        },
        zenLicense: {
            
        },
        lang: 'ko'
    },

    controller: 'mainview',
    viewModel: {
        type: 'mainview'
    },
    id: 'NFW2_client',
    itemId: 'mainView',
    layout: 'border',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'panel',
            region: 'west',
            split: false,
            splitterResize: false,
            hidden: true,
            id: 'pnl_menu',
            itemId: 'leftPanel',
            width: 100,
            bodyBorder: false,
            bodyCls: 'pnl_menu',
            bodyPadding: 0,
            collapseDirection: 'left',
            collapsed: true,
            collapsedCls: 'pnl_menu_coll',
            collapsible: false,
            headerPosition: 'left',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'button',
                    cls: 'top_logo_bk',
                    hidden: true
                },
                {
                    xtype: 'button',
                    focusCls: 'btn_f',
                    cls: 'btn_fav',
                    id: 'btn_m_fav',
                    arrowVisible: false,
                    menuAlign: 'tr',
                    menu: {
                        xtype: 'menu',
                        shadow: 'drop',
                        baseCls: 'menu_body',
                        cls: 'menu_body',
                        id: 'menu_in_fav',
                        minWidth: 160
                    }
                },
                {
                    xtype: 'button',
                    focusCls: 'btn_f',
                    cls: 'btn_m_ipsec',
                    hidden: true,
                    id: 'btn_m_ipsec',
                    overCls: 'btn_m_ipsec_ov',
                    arrowVisible: false,
                    menuAlign: 'tr',
                    menu: {
                        xtype: 'menu',
                        shadow: 'drop',
                        baseCls: 'menu_body',
                        cls: 'menu_body',
                        id: 'menu_in_ipsec',
                        minWidth: 160
                    }
                },
                {
                    xtype: 'button',
                    focusCls: 'btn_f',
                    cls: 'btn_m_ssl',
                    hidden: true,
                    id: 'btn_m_ssl',
                    overCls: 'btn_m_ssl_ov',
                    arrowVisible: false,
                    menuAlign: 'tr',
                    menu: {
                        xtype: 'menu',
                        shadow: 'drop',
                        baseCls: 'menu_body',
                        cls: 'menu_body',
                        id: 'menu_in_ssl',
                        minWidth: 160
                    }
                },
                {
                    xtype: 'button',
                    focusCls: 'btn_f',
                    cls: 'btn_m_ips',
                    hidden: true,
                    id: 'btn_m_ips',
                    overCls: 'btn_m_ips_ov',
                    arrowVisible: false,
                    menuAlign: 'tr',
                    menu: {
                        xtype: 'menu',
                        shadow: 'drop',
                        baseCls: 'menu_body',
                        cls: 'menu_body',
                        id: 'menu_in_ips',
                        minWidth: 160
                    }
                },
                {
                    xtype: 'button',
                    focusCls: 'btn_f',
                    cls: 'btn_m_av',
                    hidden: true,
                    id: 'btn_m_av',
                    overCls: 'btn_m_av_ov',
                    arrowVisible: false,
                    menuAlign: 'tr',
                    menu: {
                        xtype: 'menu',
                        shadow: 'drop',
                        baseCls: 'menu_body',
                        cls: 'menu_body',
                        id: 'menu_in_av',
                        minWidth: 160
                    }
                },
                {
                    xtype: 'button',
                    focusCls: 'btn_f',
                    cls: 'btn_m_as',
                    hidden: true,
                    id: 'btn_m_as',
                    overCls: 'btn_m_as_ov',
                    arrowVisible: false,
                    menuAlign: 'tr',
                    menu: {
                        xtype: 'menu',
                        shadow: 'drop',
                        baseCls: 'menu_body',
                        cls: 'menu_body',
                        id: 'menu_in_as',
                        minWidth: 160
                    }
                },
                {
                    xtype: 'container',
                    id: 'ct_btn_basic',
                    items: [
                        {
                            xtype: 'button',
                            focusCls: 'btn_f',
                            cls: 'btn_m_rule',
                            id: 'btn_m_rule',
                            overCls: 'btn_m_rule_ov',
                            arrowVisible: false,
                            menuAlign: 'tr',
                            menu: {
                                xtype: 'menu',
                                shadow: 'drop',
                                baseCls: 'menu_body',
                                cls: 'menu_body',
                                id: 'menu_in_fw',
                                minWidth: 160
                            }
                        },
                        {
                            xtype: 'button',
                            focusCls: 'btn_f',
                            cls: 'btn_m_obj',
                            id: 'btn_m_obj',
                            overCls: 'btn_m_obj_ov',
                            arrowVisible: false,
                            menuAlign: 'tr',
                            menu: {
                                xtype: 'menu',
                                shadow: 'drop',
                                baseCls: 'menu_body',
                                cls: 'menu_body',
                                id: 'menu_in_obj',
                                minWidth: 160
                            }
                        },
                        {
                            xtype: 'button',
                            focusCls: 'btn_f',
                            cls: 'btn_m_pf',
                            id: 'btn_m_profile',
                            overCls: 'btn_m_pf_ov',
                            arrowVisible: false,
                            menuAlign: 'tr',
                            menu: {
                                xtype: 'menu',
                                shadow: 'drop',
                                baseCls: 'menu_body',
                                cls: 'menu_body',
                                id: 'menu_in_profile',
                                minWidth: 160
                            }
                        },
                        {
                            xtype: 'button',
                            focusCls: 'btn_f',
                            cls: 'btn_m_net',
                            id: 'btn_m_net',
                            overCls: 'btn_m_net_ov',
                            arrowVisible: false,
                            menuAlign: 'tr',
                            menu: {
                                xtype: 'menu',
                                shadow: 'drop',
                                baseCls: 'menu_body',
                                cls: 'menu_body',
                                id: 'menu_in_network',
                                minWidth: 160
                            }
                        },
                        {
                            xtype: 'button',
                            focusCls: 'btn_f',
                            cls: 'btn_m_sys',
                            id: 'btn_m_sys',
                            overCls: 'btn_m_sys_ov',
                            arrowVisible: false,
                            menuAlign: 'tr',
                            menu: {
                                xtype: 'menu',
                                shadow: 'drop',
                                baseCls: 'menu_body',
                                cls: 'menu_body',
                                id: 'menu_in_system',
                                minWidth: 160
                            }
                        }
                    ]
                },
                {
                    xtype: 'button',
                    focusCls: 'btn_f',
                    cls: 'btn_m_ddos',
                    id: 'btn_m_ddos',
                    overCls: 'btn_m_ddos_ov',
                    arrowVisible: false,
                    menuAlign: 'tr',
                    menu: {
                        xtype: 'menu',
                        shadow: 'drop',
                        baseCls: 'menu_body',
                        cls: 'menu_body',
                        id: 'menu_in_ddos',
                        minWidth: 160
                    }
                },
                {
                    xtype: 'container',
                    hidden: true,
                    id: 'ct_btn_log',
                    items: [
                        {
                            xtype: 'button',
                            focusCls: 'btn_f',
                            cls: 'btn_m_loglist',
                            id: 'btn_m_loglist',
                            overCls: 'btn_m_loglist_ov',
                            arrowVisible: false,
                            menuAlign: 'tr',
                            menu: {
                                xtype: 'menu',
                                shadow: 'drop',
                                baseCls: 'menu_body',
                                cls: 'menu_body',
                                id: 'menu_in_log',
                                minWidth: 160,
                                listeners: {
                                    activate: 'onMenu_in_logActivate'
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            focusCls: 'btn_f',
                            cls: 'btn_m_stat',
                            id: 'btn_m_log_stat',
                            overCls: 'btn_m_stat_ov',
                            arrowVisible: false,
                            menuAlign: 'tr',
                            menu: {
                                xtype: 'menu',
                                shadow: 'drop',
                                baseCls: 'menu_body',
                                cls: 'menu_body',
                                id: 'menu_in_log_stat',
                                minWidth: 160
                            }
                        },
                        {
                            xtype: 'button',
                            focusCls: 'btn_f',
                            cls: 'btn_m_lset',
                            id: 'btn_m_logset',
                            overCls: 'btn_m_lset_ov',
                            arrowVisible: false,
                            menuAlign: 'tr',
                            menu: {
                                xtype: 'menu',
                                shadow: 'drop',
                                baseCls: 'menu_body',
                                cls: 'menu_body',
                                id: 'menu_in_logset',
                                minWidth: 160
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    hidden: true,
                    id: 'ct_btn_monitor',
                    items: [
                        {
                            xtype: 'button',
                            focusCls: 'btn_f',
                            cls: 'btn_m_net',
                            id: 'btn_m_mon_net',
                            overCls: 'btn_m_net_ov',
                            arrowVisible: false,
                            menuAlign: 'tr',
                            menu: {
                                xtype: 'menu',
                                shadow: 'drop',
                                baseCls: 'menu_body',
                                cls: 'menu_body',
                                id: 'menu_in_mon_net',
                                minWidth: 160
                            }
                        },
                        {
                            xtype: 'button',
                            focusCls: 'btn_f',
                            cls: 'btn_m_sys',
                            id: 'btn_m_mon_sys',
                            overCls: 'btn_m_sys_ov',
                            arrowVisible: false,
                            menuAlign: 'tr',
                            menu: {
                                xtype: 'menu',
                                shadow: 'drop',
                                baseCls: 'menu_body',
                                cls: 'menu_body',
                                id: 'menu_in_mon_sys',
                                minWidth: 160
                            }
                        },
                        {
                            xtype: 'button',
                            focusCls: 'btn_f',
                            cls: 'btn_m_fw',
                            id: 'btn_m_mon_fw',
                            overCls: 'btn_m_fw_ov',
                            arrowVisible: false,
                            menuAlign: 'tr',
                            menu: {
                                xtype: 'menu',
                                shadow: 'drop',
                                baseCls: 'menu_body',
                                cls: 'menu_body',
                                id: 'menu_in_mon_fw',
                                minWidth: 160
                            }
                        },
                        {
                            xtype: 'button',
                            focusCls: 'btn_f',
                            cls: 'btn_m_ips',
                            id: 'btn_m_mon_ips',
                            overCls: 'btn_m_ips_ov',
                            arrowVisible: false,
                            menuAlign: 'tr',
                            menu: {
                                xtype: 'menu',
                                shadow: 'drop',
                                baseCls: 'menu_body',
                                cls: 'menu_body',
                                id: 'menu_in_mon_ips',
                                minWidth: 160
                            }
                        },
                        {
                            xtype: 'button',
                            focusCls: 'btn_f',
                            cls: 'btn_m_ipsec',
                            id: 'btn_m_mon_ipsec',
                            overCls: 'btn_m_ipsec_ov',
                            arrowVisible: false,
                            menuAlign: 'tr',
                            menu: {
                                xtype: 'menu',
                                shadow: 'drop',
                                baseCls: 'menu_body',
                                cls: 'menu_body',
                                id: 'menu_in_mon_ipsec',
                                minWidth: 160
                            }
                        },
                        {
                            xtype: 'button',
                            focusCls: 'btn_f',
                            cls: 'btn_m_ddos',
                            id: 'btn_m_mon_ddos',
                            overCls: 'btn_m_ddos_ov',
                            arrowVisible: false,
                            menuAlign: 'tr',
                            menu: {
                                xtype: 'menu',
                                shadow: 'drop',
                                baseCls: 'menu_body',
                                cls: 'menu_body',
                                id: 'menu_in_mon_ddos',
                                minWidth: 160
                            }
                        },
                        {
                            xtype: 'button',
                            focusCls: 'btn_f',
                            cls: 'btn_m_lset',
                            id: 'btn_m_mon_set',
                            overCls: 'btn_m_lset_ov',
                            arrowVisible: false,
                            menuAlign: 'tr',
                            menu: {
                                xtype: 'menu',
                                shadow: 'drop',
                                baseCls: 'menu_body',
                                cls: 'menu_body',
                                id: 'menu_in_mon_set',
                                minWidth: 160
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    hidden: true,
                    id: 'ct_btn_tracker',
                    items: [
                        {
                            xtype: 'button',
                            focusCls: 'btn_f',
                            cls: 'btn_m_fw',
                            id: 'btn_m_tk_fw',
                            overCls: 'btn_m_fw_ov',
                            listeners: {
                                click: {
                                    fn: 'onBtn_m_tk_fwClick',
                                    scope: 'controller'
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            focusCls: 'btn_f',
                            cls: 'btn_m_http',
                            id: 'btn_m_tk_http',
                            overCls: 'btn_m_http_ov',
                            listeners: {
                                click: {
                                    fn: 'onBtn_m_tk_httpClick',
                                    scope: 'controller'
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            focusCls: 'btn_f',
                            cls: 'btn_m_app',
                            id: 'btn_m_tk_app',
                            overCls: 'btn_m_app_ov',
                            listeners: {
                                click: {
                                    fn: 'onBtn_m_tk_appClick',
                                    scope: 'controller'
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            focusCls: 'btn_f',
                            cls: 'btn_m_ips',
                            id: 'btn_m_tk_ips',
                            overCls: 'btn_m_ips_ov',
                            listeners: {
                                click: {
                                    fn: 'onBtn_m_tk_ipsClick',
                                    scope: 'controller'
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'button',
                    plugins: [
                        {
                            ptype: 'badgetext'
                        }
                    ],
                    focusCls: 'btn_f',
                    cls: 'btn_mn_alert',
                    hidden: true,
                    id: 'btn_mn_alert',
                    margin: '0 0 5 35'
                },
                {
                    xtype: 'button',
                    plugins: [
                        {
                            ptype: 'badgetext'
                        }
                    ],
                    focusCls: 'btn_f',
                    cls: 'btn_mn_hist',
                    hidden: true,
                    id: 'btn_mn_alert1',
                    margin: '0 0 5 35',
                    listeners: {
                        render: {
                            fn: 'onBtn_mn_alertRender1',
                            scope: 'controller'
                        },
                        click: {
                            fn: 'onBtn_mn_alertClick1',
                            scope: 'controller'
                        }
                    }
                }
            ],
            dockedItems: [
                {
                    xtype: 'container',
                    dock: 'bottom',
                    cls: 'chart_temp',
                    height: 260,
                    id: 'chart_temp',
                    listeners: {
                        afterrender: 'onChart_tempAfterRender',
                        beforedestroy: 'onChart_tempBeforeDestroy'
                    }
                }
            ],
            listeners: {
                expand: 'onPnl_menuExpand',
                collapse: 'onPnl_menuCollapse'
            }
        },
        {
            xtype: 'panel',
            region: 'center',
            hidden: true,
            id: 'pnl_main',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'panel',
                    cls: 'top_area',
                    height: 56,
                    itemId: 'headerPanel',
                    margin: '0 0 4 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            id: 'left_area',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'button',
                                    focusCls: 'top_logo',
                                    cls: 'top_logo',
                                    id: 'btn_logo',
                                    listeners: {
                                        click: {
                                            fn: 'go_dboard',
                                            scope: 'controller'
                                        }
                                    }
                                },
                                {
                                    xtype: 'cycle',
                                    focusCls: 'btn_f',
                                    cls: 'sel_top_menu',
                                    id: 'sel_zen_license',
                                    showText: true,
                                    menu: {
                                        xtype: 'menu',
                                        shadow: false,
                                        baseCls: 'sel_top_body',
                                        cls: 'sel_top_body',
                                        overCls: 'sel_ov',
                                        items: [
                                            {
                                                xtype: 'menucheckitem',
                                                value: 'fw',
                                                id: 'sel_top_fw',
                                                overCls: 'sel_ov',
                                                text: '방화벽'
                                            },
                                            {
                                                xtype: 'menucheckitem',
                                                value: 'ips',
                                                id: 'sel_top_ips',
                                                overCls: 'sel_ov',
                                                text: 'IPS'
                                            },
                                            {
                                                xtype: 'menucheckitem',
                                                value: 'ipsec',
                                                id: 'sel_top_ipsec',
                                                overCls: 'sel_ov',
                                                text: 'IPSec VPN'
                                            },
                                            {
                                                xtype: 'menucheckitem',
                                                value: 'ssl',
                                                id: 'sel_top_ssl',
                                                overCls: 'sel_ov',
                                                text: 'SSL VPN'
                                            },
                                            {
                                                xtype: 'menucheckitem',
                                                value: 'av',
                                                id: 'sel_top_av',
                                                overCls: 'sel_ov',
                                                text: '안티바이러스'
                                            },
                                            {
                                                xtype: 'menucheckitem',
                                                value: 'as',
                                                id: 'sel_top_as',
                                                overCls: 'sel_ov',
                                                text: '안티스팸'
                                            },
                                            {
                                                xtype: 'menucheckitem',
                                                value: 'tracker',
                                                id: 'sel_top_tracker',
                                                overCls: 'sel_ov',
                                                text: '트래픽트래커'
                                            }
                                        ]
                                    },
                                    listeners: {
                                        change: {
                                            fn: 'onSel_zen_licenseChange',
                                            scope: 'controller'
                                        },
                                        click: 'onSel_zen_licenseClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    plugins: [
                                        {
                                            ptype: 'badgetext'
                                        }
                                    ],
                                    focusCls: 'btn_f',
                                    cls: 'btn_mn_map',
                                    id: 'btn_sitemap',
                                    listeners: {
                                        click: {
                                            fn: 'onBtn_calendarClick1',
                                            scope: 'controller'
                                        },
                                        render: {
                                            fn: 'onBtn_calendarRender11',
                                            scope: 'controller'
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'container',
                            dock: 'right',
                            id: 'right_area',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'button',
                                    focusCls: 'btn_f',
                                    cls: 'btn_sendpolicy',
                                    id: 'btn_sendpolicy',
                                    listeners: {
                                        click: {
                                            fn: 'onBtn_sendpolicyClick',
                                            scope: 'controller'
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    focusCls: 'btn_f',
                                    cls: 'btn_mn_confirm',
                                    id: 'btn_sendpolicy_confirm',
                                    tooltip: '정책전송 확인',
                                    tooltipType: 'title',
                                    listeners: {
                                        click: {
                                            fn: 'onBtn_sendpolicyClick1',
                                            scope: 'controller'
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    plugins: [
                                        {
                                            ptype: 'badgetext'
                                        }
                                    ],
                                    focusCls: 'btn_f',
                                    cls: 'btn_mn_date',
                                    id: 'btn_calendar',
                                    tooltip: '정책 예약 전송',
                                    tooltipType: 'title',
                                    listeners: {
                                        click: {
                                            fn: 'onBtn_calendarClick',
                                            scope: 'controller'
                                        },
                                        render: {
                                            fn: 'onBtn_calendarRender1',
                                            scope: 'controller'
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    plugins: [
                                        {
                                            ptype: 'badgetext'
                                        }
                                    ],
                                    focusCls: 'btn_f',
                                    cls: 'btn_mn_alarm',
                                    id: 'btn_admin_alarm',
                                    tooltip: '관리자 알람',
                                    tooltipType: 'title',
                                    listeners: {
                                        beforedestroy: 'onBtn_admin_alarmBeforeDestroy',
                                        click: 'onBtn_admin_alarmClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    plugins: [
                                        {
                                            ptype: 'badgetext'
                                        }
                                    ],
                                    focusCls: 'btn_f',
                                    cls: 'btn_mn_diff',
                                    id: 'btn_diff',
                                    tooltip: '변경 내용',
                                    tooltipType: 'title',
                                    listeners: {
                                        click: {
                                            fn: 'onBtn_diffClick',
                                            scope: 'controller'
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    focusCls: 'btn_f',
                                    cls: 'btn_m_log',
                                    id: 'btn_m_log',
                                    overCls: 'btn_m_log_ov',
                                    listeners: {
                                        click: {
                                            fn: 'onBtn_m_logClick',
                                            scope: 'controller'
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    focusCls: 'btn_f',
                                    cls: 'btn_m_monitor',
                                    id: 'btn_m_monitor',
                                    overCls: 'btn_m_monitor_ov',
                                    listeners: {
                                        click: {
                                            fn: 'onBtn_m_monitorClick',
                                            scope: 'controller'
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    focusCls: 'btn_f',
                                    cls: 'btn_mn_atoz',
                                    id: 'btn_atoz',
                                    listeners: {
                                        click: {
                                            fn: 'onBtn_atozClick',
                                            scope: 'controller'
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    cls: 'dv_profile',
                                    layout: 'column',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    cls: 'dv_profile_f',
                                                    id: 'lb_userID'
                                                },
                                                {
                                                    xtype: 'label',
                                                    cls: 'dv_profile_f',
                                                    id: 'lb_userauthorization'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'label',
                                            cls: 'dv_profile_f',
                                            hidden: true,
                                            id: 'lb_accessCount'
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_logout',
                                            id: 'log_button',
                                            listeners: {
                                                click: {
                                                    fn: 'onLog_buttonClick',
                                                    scope: 'controller'
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    cls: 'pnl_navi',
                    height: 36,
                    hidden: true,
                    id: 'pnl_navi',
                    margin: '0 4',
                    dockedItems: [
                        {
                            xtype: 'panel',
                            dock: 'left',
                            width: 34,
                            items: [
                                {
                                    xtype: 'button',
                                    focusCls: 'btn_f',
                                    cls: 'btn_mn_fav',
                                    listeners: {
                                        click: {
                                            fn: 'onButtonClick1',
                                            scope: 'controller'
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            dock: 'right',
                            id: 'pnl_opt',
                            layout: 'hbox',
                            bodyCls: 'pnl_opt',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'fld_trigger'
                                },
                                {
                                    xtype: 'container',
                                    id: 'trg_container',
                                    items: [
                                        {
                                            xtype: 'button',
                                            focusCls: 'btn_f',
                                            cls: 'btn_nn_set_w',
                                            hidden: true,
                                            id: 'b_trg_set',
                                            tooltip: '설정',
                                            tooltipType: 'title',
                                            listeners: {
                                                click: {
                                                    fn: 'onB_trg_monitorClick1',
                                                    scope: 'controller'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            focusCls: 'btn_f',
                                            cls: 'btn_nn_log_w',
                                            hidden: true,
                                            id: 'b_trg_log',
                                            tooltip: '로그',
                                            tooltipType: 'title',
                                            listeners: {
                                                click: {
                                                    fn: 'onB_trg_logClick',
                                                    scope: 'controller'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            focusCls: 'btn_f',
                                            cls: 'btn_nn_monitor_w',
                                            hidden: true,
                                            id: 'b_trg_monitor',
                                            tooltip: '모니터',
                                            tooltipType: 'title',
                                            listeners: {
                                                click: {
                                                    fn: 'onB_trg_monitorClick',
                                                    scope: 'controller'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            focusCls: 'btn_f',
                                            cls: 'btn_nn_tracker_w',
                                            hidden: true,
                                            id: 'b_trg_tracker',
                                            tooltip: '트래커',
                                            tooltipType: 'title',
                                            listeners: {
                                                click: {
                                                    fn: 'onB_trg_logClick1',
                                                    scope: 'controller'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            focusCls: 'btn_f',
                                            cls: 'btn_nn_atoz_w',
                                            hidden: true,
                                            id: 'b_trg_atoz',
                                            listeners: {
                                                click: {
                                                    fn: 'onB_trg_logClick11',
                                                    scope: 'controller'
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'combobox',
                                    cls: 'inp_navi',
                                    id: 'combo_map',
                                    margin: '3 0 0 5',
                                    width: 260,
                                    hideTrigger: true,
                                    anyMatch: true,
                                    forceSelection: true,
                                    minChars: 1,
                                    queryMode: 'local',
                                    store: 'zen_leaf_menu',
                                    typeAhead: true,
                                    typeAheadDelay: 350,
                                    valueField: 'value',
                                    listeners: {
                                        change: {
                                            fn: 'onComboboxChange',
                                            scope: 'controller'
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    items: [
                        {
                            xtype: 'panel',
                            padding: '5 0 0 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    cls: 'navi_map',
                                    id: 'navi_map'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    flex: 1,
                    hidden: true,
                    id: 'pnl_tab'
                },
                {
                    xtype: 'panel',
                    flex: 1,
                    autoScroll: true,
                    id: 'pnl_cont',
                    bodyPadding: 4
                }
            ]
        }
    ],
    listeners: {
        afterrender: {
            fn: 'onMainViewAfterRender',
            scope: 'controller'
        },
        beforerender: {
            fn: 'onMainViewBeforeRender',
            scope: 'controller'
        },
        resize: {
            fn: 'onNFW2_clientResize',
            scope: 'controller'
        }
    },

    onMenu_in_logActivate: function(component, eOpts) {
        var zenLicense = this.zenLicense;

                if(zenLicense.fw !== "on"){
                    component.down("#in_menu_NFW2_log_logSearch_fw").hide();
                }else{
        	component.down("#in_menu_NFW2_log_logSearch_fw").show();
        	}

                if(zenLicense.ips !== "on"){
                    component.down("#in_menu_NFW2_log_logSearch_ips").hide();
                }else{
        	component.down("#in_menu_NFW2_log_logSearch_ips").show();
        	}

                if(zenLicense.ipsec !== "on"){
                    component.down("#in_menu_NFW2_log_logSearch_vpn").hide();
                }else{
        	component.down("#in_menu_NFW2_log_logSearch_vpn").show();
        	}

                if(zenLicense.ssl !== "on"){
                    component.down("#in_menu_NFW2_log_logSearch_ssl").hide();
                }else{
        	component.down("#in_menu_NFW2_log_logSearch_ssl").show();
        	}

                if(zenLicense.av !== "on"){
                    component.down("#in_menu_NFW2_log_logSearch_av").hide();
                }else{
        	component.down("#in_menu_NFW2_log_logSearch_av").show();
        	}

                if(zenLicense.as !== "on"){
                    component.down("#in_menu_NFW2_log_logSearch_as").hide();
                }else{
        	component.down("#in_menu_NFW2_log_logSearch_as").show();
        	}

    },

    onChart_tempAfterRender: function(component, eOpts) {

        component.set_cpu = false;
                component.set_mem = false;
                component.set_btn = false;
                component.set_disk = false;
                component.btn_disk = [];

        	init_menu_chart(component);
    },

    onChart_tempBeforeDestroy: function(component, eOpts) {
          clearInterval(component.interval);

    },

    onPnl_menuExpand: function(p, eOpts) {
        var me = Ext.getCmp('d_chart_area');
        if(document.getElementById('chart_area')){
        var wid = document.body.clientWidth-980;
        document.getElementById('chart_area').style.width = wid+'px';
        me.myChart.resize();
        }


        set_menu_chart();
        Ext.getCmp('chart_temp').interval = setInterval(set_menu_chart, 10000);
    },

    onPnl_menuCollapse: function(p, eOpts) {
        var me = Ext.getCmp('d_chart_area');
        if(document.getElementById('chart_area')){
        var wid = document.body.clientWidth-880;
        document.getElementById('chart_area').style.width = wid+'px';
         me.myChart.resize();
        }


        clearInterval(Ext.getCmp('chart_temp').interval);
    },

    onSel_zen_licenseClick: function(button, e, eOpts) {

        var me = this;
        var pp = me.nowParents;
        if(pp==="atoz" || pp.substr(0,3)==="log" || pp.substr(0,3)==="mon"){
        button.setActiveItem(0,true);
        go_zen_license("fw",null);
        return false;
        }
    },

    onBtn_admin_alarmBeforeDestroy: function(component, eOpts) {
        clearInterval(Ext.getCmp('btn_admin_alarm').interval);
    },

    onBtn_admin_alarmClick: function(button, e, eOpts) {
         var win = Ext.create('NFW2.view.win_system_alarm',{
        modal : true
        });
         win.show();

    },

    get_combo_map: function() {
        var me = Ext.getCmp('NFW2_client');
        var zenLicense = me.zenLicense;
        var store = Ext.data.StoreManager.lookup("ferretMenu");
        var raid = me.isRaidShow;
        var lang = me.lang;

        if(me.zenLicense.flag==='15'){return false;}

        var __auth = me.clientInfo.perspectiveInfo;

        if(__auth===2){
            var g_menu = ["log","log_stat","logset"];
        }else{

        var g_menu = ["fw","obj"];
        if(zenLicense.fw === "on"){
            g_menu.push("profile");
        }

        if(zenLicense.ips === "on"){
            g_menu.push("ips");
        }

        if(zenLicense.ipsec === "on"){
            g_menu.push("ipsec");
        }

        if(zenLicense.ssl === "on"){
            g_menu.push("ssl");
        }

        if(zenLicense.av === "on"){
            g_menu.push("av");
        }

        if(zenLicense.as === "on"){
            g_menu.push("as");
        }

        if(zenLicense.tracker === "on"){
            g_menu.push("tracker");
        }


        g_menu.push("ddos","system","network","mon_sys","mon_net","mon_fw","mon_ddos","mon_set");

        if(zenLicense.ips === "on"){
            g_menu.push("mon_ips");
        }
        if(zenLicense.ipsec === "on"){
            g_menu.push("mon_ipsec");
        }

        if(__auth === 7 || __auth === 3){
            g_menu.push("log","log_stat","logset");
        }
        }


        var remove_menu = [];
        if(zenLicense.fw !== "on"){
            remove_menu.push("NFW2_trafficTracker_httpUrl","NFW2_trafficTracker_ap","NFW2_monitor_firewall_applicationControl");
        }

        if(zenLicense.ips !== "on"){
            remove_menu.push("NFW2_trafficTracker_ips","NFW2_log_logSearch_ips");
        }

        if(zenLicense.ipsec !== "on"){
            remove_menu.push("NFW2_log_logSearch_vpn");
            remove_menu.push("NFW2_monitor_ipsec_tunnel");
        }


        if(zenLicense.ssl !== "on"){
            remove_menu.push("NFW2_log_logSearch_ssl");
        }

        if(zenLicense.av !== "on"){
            remove_menu.push("NFW2_log_logSearch_av");
        }

        if(zenLicense.as !== "on"){
            remove_menu.push("NFW2_log_logSearch_as");
        }

        if(!raid){
            remove_menu.push("NFW2_system_basic_raid");
        }//Raid menu hide.


        var record = [];

        for(var i=0; i<store.getRootNode().childNodes.length; i++){
            var menuid = store.getRootNode().childNodes[i].data.menuid;
            var menutxt = store.getRootNode().childNodes[i].data[lang];

            if(g_menu.indexOf(menuid) === -1){continue;}

            get_casnode(store.getRootNode().childNodes[i],menutxt);


        }

        Ext.getCmp('combo_map').store.loadData(record, false);

        function get_casnode(node,menutxt){
            return node.cascadeBy(function() {


                if(this.childNodes.length===0){

                    if(remove_menu.indexOf(this.id) === -1){
                    record.push({'value':this.id,'text':menutxt + " - "+this.raw[lang]});
                    }
                }

            });


        }

    },

    get_favMenu: function() {
        var me = this;
        var _me = Ext.getCmp('NFW2_client');
        var control = me.getController('MainViewViewController');

        var lang = _me.lang;
        var store = Ext.data.StoreManager.lookup("ferretMenu");

        var _getparams = {
            basename : Ext.encode('manage_config')
        };

        var userid = _me.clientInfo.userId;

        request_helper.xmlrpc_call_JsonP('ftuctrl','getObject',_getparams,
                                         function(response){

                                             Ext.getCmp('menu_in_fav').removeAll();

                                             if(response !== null){


                                                 var userobj = response.fav[userid];


                                                 for (var key in userobj) {


                                                     var __text = store.getNodeById(key).data[lang];
                                                     var __parent = store.getNodeById(key).parentNode.data[lang];

                                                     var item =  new Ext.menu.Item({
                                                         //text: userobj[key].text,
                                                         text:__parent +" > " +  __text,
                                                         value:key,
                                                         cls: 'in_menu',
                                                         activeCls: 'in_menu_ov',
                                                         iconCls: 'ic_menu',
                                                         handler: function(item){
                                                             control.go_link(item.value);
                                                         }
                                                     });


                                                     Ext.getCmp('menu_in_fav').add(item);


                                                 }


                                             }


                                         });

    },

    set_sitemap: function() {
        var _me = Ext.getCmp('NFW2_client');


        var license = _me.zenLicense;
        var raid = _me.isRaidShow;
        var lang = _me.lang;
        var __auth = _me.clientInfo.perspectiveInfo;

        var map = '';

        if(license.flag ==='1' ||license.flag ==='4' ){


            var store = Ext.data.StoreManager.lookup("ferretMenu");


            for(var i=0; i<store.getRootNode().childNodes.length; i++){
                var menuid = store.getRootNode().childNodes[i].data.menuid;

                var cls = "";

                if(__auth===2){ if(!(menuid==="log" || menuid==="logset" || menuid==="log_stat")){continue;}}




                if(menuid==="profile"){cls = (license.fw!=="on")?"none":"";}
                else if(menuid==="ips"){cls = (license.ips!=="on")?"none":"";}
                else if(menuid==="mon_ips"){cls = (license.ips!=="on")?"none":"";}
                else if(menuid==="ipsec"){cls = (license.ipsec!=="on")?"none":"";}
                else if(menuid==="mon_ipsec"){cls = (license.ipsec!=="on")?"none":"";}
                else if(menuid==="ssl"){cls = (license.ssl!=="on")?"none":"";}
                else if(menuid==="av"){cls = (license.av!=="on")?"none":"";}
                else if(menuid==="as"){cls = (license.as!=="on")?"none":"";}
                else if(menuid==="tracker"){cls = (license.tracker!=="on")?"none":"";}

                if( __auth !==2){
                    map += ((menuid==="log")?'<div class="toolmap_lb">'+((__auth===7 || __auth===3)?__zen('log')+'/':"")+__zen('monitor')+'</div>':'');
                }

                if(__auth===1 || __auth===5){ if(menuid==="log" || menuid==="logset" || menuid==="log_stat"){cls = "none";}}


                map += ((menuid==="ips" || menuid==="av")?'<div class="toolmap">':'')+
                    '<div class="toolmap" id="toolmap_'+menuid+'" style="display:'+cls+'">'+
                    '<ul>'+store.getRootNode().childNodes[i].data[lang]+'</ul>';

                get_casnodex(store.getRootNode().childNodes[i]);

                map += '</div>'+((menuid==="ssl" || menuid==="atoz")?'</div>':'');

            }
        }else{
            map += 'No License';
        }
        var btn = Ext.getCmp('btn_sitemap');

        btn.tooltip = Ext.create('Ext.tip.ToolTip', {
            target: btn.getEl(),
            autoHide: false,
            anchor : 'bottom',
            cls : 'map_box',
            shadow: false,
            border : 0,
            html:map

        });


        function get_casnodex(node){
            return node.cascadeBy(function() {

                if(this.childNodes.length===0){

                    var sub_cls = "";
                    if(this.id==="NFW2_monitor_firewall_applicationControl"){sub_cls = (license.fw!=="on")?"none":"";} /*fw-application*/
                    else if(this.id==="NFW2_trafficTracker_ap"){sub_cls = (license.fw!=="on")?"none":"";} /*fw-application*/
                    else if(this.id==="NFW2_trafficTracker_httpUrl"){sub_cls = (license.fw!=="on")?"none":"";} /*fw-http*/
                    else if(this.id==="NFW2_trafficTracker_ips"){sub_cls = (license.ips!=="on")?"none":"";}/*ips*/
                    else if(this.id==="NFW2_log_logSearch_ips"){sub_cls = (license.ips!=="on")?"none":"";}/*ips*/
                    else if(this.id==="NFW2_log_logSearch_vpn"){sub_cls = (license.ipsec!=="on")?"none":"";}/*ipsec*/
                    else if(this.id==="NFW2_log_logSearch_ssl"){sub_cls = (license.ssl!=="on")?"none":"";}/*ssl*/
                    else if(this.id==="NFW2_log_logSearch_av"){sub_cls = (license.av!=="on")?"none":"";}/*av*/
                    else if(this.id==="NFW2_log_logSearch_as"){sub_cls = (license.as!=="on")?"none":"";}/*as*/

                    if(!raid){ if(this.id==="NFW2_system_basic_raid"){	sub_cls = "none";	}}//Raid menu hide.



                    map += '<li onclick="make_navi_map(\''+this.id+'\')" style="display:'+sub_cls+'">'+this.data.subko+this.data[lang]+'</li>';
                }
            });
        }
    },

    set_GlobalConfig: function() {
        var me = this;
        var control = me.getController('MainViewViewController');

        control.get_reserv_policy();//정책전송예약시 있을 경우 화면에 표시

        var _raidparams = {
            type_info: Ext.encode('hd_list'),
            is_hw: Ext.encode(true)
        };

        request_helper.xmlrpc_call_JsonP('ftuctrl','getSystemRaid',_raidparams,function(response){//시스템 - RAID 메뉴 유무 확인


            if(response.length >= 2){
                me.isRaidShow = true;
            }else{
                me.isRaidShow = false;
            }


            control.makeMenu();

            me.chg_lang_cls();

            me.get_combo_map();
            me.get_favMenu();

            me.set_sitemap();

            me.chg_auth_mode(0);

            hideLicenseBtn();

           chk_zenauth_main();


        }
                                        );

        console.log("all global config set ended",me);

        var _alarm_param = {
                    func_name: Ext.encode('get_alarm_count'),
                    args: Ext.encode({})
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'execKctrlFunc',
                    _alarm_param,
                    function(response){
                        if(response !== 0){
                            Ext.getCmp('btn_admin_alarm').setBadgeText(String(response));
                        }
                        else{ Ext.getCmp('btn_admin_alarm').setBadgeText(''); }
                    }
                );
    },

    chg_lang_cls: function() {
        var _me = this;
        var lang = _me.lang;


        if(lang==="en"){
           Ext.getCmp('btn_m_fav').removeCls('btn_fav_jp').addCls('btn_fav_en');
            Ext.getCmp('btn_m_av').removeCls('btn_m_av_jp').addCls('btn_m_av_en');
            Ext.getCmp('btn_m_as').removeCls('btn_m_as_jp').addCls('btn_m_as_en');
            Ext.getCmp('btn_m_rule').removeCls('btn_m_rule_jp').addCls('btn_m_rule_en');
            Ext.getCmp('btn_m_obj').removeCls('btn_m_obj_jp').addCls('btn_m_obj_en');
            Ext.getCmp('btn_m_profile').removeCls('btn_m_pf_jp').addCls('btn_m_pf_en');
            Ext.getCmp('btn_m_net').removeCls('btn_m_net_jp').addCls('btn_m_net_en');
            Ext.getCmp('btn_m_sys').removeCls('btn_m_sys_jp').addCls('btn_m_sys_en');
            Ext.getCmp('btn_m_loglist').removeCls('btn_m_loglist_jp').addCls('btn_m_loglist_en');
            Ext.getCmp('btn_m_log_stat').removeCls('btn_m_stat_jp').addCls('btn_m_stat_en');
            Ext.getCmp('btn_m_logset').removeCls('btn_m_lset_jp').addCls('btn_m_lset_en');
            Ext.getCmp('btn_m_mon_net').removeCls('btn_m_net_jp').addCls('btn_m_net_en');
            Ext.getCmp('btn_m_mon_sys').removeCls('btn_m_sys_jp').addCls('btn_m_sys_en');
            Ext.getCmp('btn_m_mon_fw').removeCls('btn_m_fw_jp').addCls('btn_m_fw_en');
            Ext.getCmp('btn_m_mon_set').removeCls('btn_m_lset_jp').addCls('btn_m_lset_en');
            Ext.getCmp('btn_m_tk_fw').removeCls('btn_m_fw_jp').addCls('btn_m_fw_en');
            Ext.getCmp('btn_m_tk_app').removeCls('btn_m_app_jp').addCls('btn_m_app_en');

            Ext.getCmp('btn_sendpolicy').removeCls('btn_sendpolicy_jp').addCls('btn_sendpolicy_en');
            Ext.getCmp('btn_m_log').removeCls('btn_m_log_jp').addCls('btn_m_log_en');
            Ext.getCmp('btn_m_monitor').removeCls('btn_m_monitor_jp').addCls('btn_m_monitor_en');
            Ext.getCmp('btn_atoz').removeCls('btn_mn_atoz_jp').addCls('btn_mn_atoz_en');




        }else if(lang ==="jp"){
            Ext.getCmp('btn_m_fav').removeCls('btn_fav_en').addCls('btn_fav_jp');
            Ext.getCmp('btn_m_av').removeCls('btn_m_av_en').addCls('btn_m_av_jp');
            Ext.getCmp('btn_m_as').removeCls('btn_m_as_en').addCls('btn_m_as_jp');
            Ext.getCmp('btn_m_rule').removeCls('btn_m_rule_en').addCls('btn_m_rule_jp');
            Ext.getCmp('btn_m_obj').removeCls('btn_m_obj_en').addCls('btn_m_obj_jp');
            Ext.getCmp('btn_m_profile').removeCls('btn_m_pf_en').addCls('btn_m_pf_jp');
            Ext.getCmp('btn_m_net').removeCls('btn_m_net_en').addCls('btn_m_net_jp');
            Ext.getCmp('btn_m_sys').removeCls('btn_m_sys_en').addCls('btn_m_sys_jp');
            Ext.getCmp('btn_m_loglist').removeCls('btn_m_loglist_en').addCls('btn_m_loglist_jp');
            Ext.getCmp('btn_m_log_stat').removeCls('btn_m_stat_en').addCls('btn_m_stat_jp');
            Ext.getCmp('btn_m_logset').removeCls('btn_m_lset_en').addCls('btn_m_lset_jp');
            Ext.getCmp('btn_m_mon_net').removeCls('btn_m_net_en').addCls('btn_m_net_jp');
            Ext.getCmp('btn_m_mon_sys').removeCls('btn_m_sys_en').addCls('btn_m_sys_jp');
            Ext.getCmp('btn_m_mon_fw').removeCls('btn_m_fw_en').addCls('btn_m_fw_jp');
            Ext.getCmp('btn_m_mon_set').removeCls('btn_m_lset_en').addCls('btn_m_lset_jp');
            Ext.getCmp('btn_m_tk_fw').removeCls('btn_m_fw_en').addCls('btn_m_fw_jp');
            Ext.getCmp('btn_m_tk_app').removeCls('btn_m_app_en').addCls('btn_m_app_jp');

            Ext.getCmp('btn_sendpolicy').removeCls('btn_sendpolicy_en').addCls('btn_sendpolicy_jp');
            Ext.getCmp('btn_m_log').removeCls('btn_m_log_en').addCls('btn_m_log_jp');
            Ext.getCmp('btn_m_monitor').removeCls('btn_m_monitor_en').addCls('btn_m_monitor_jp');
            Ext.getCmp('btn_atoz').removeCls('btn_mn_atoz_en').addCls('btn_mn_atoz_jp');

        }else{
            Ext.getCmp('btn_m_fav').removeCls('btn_fav_jp btn_fav_en');
            Ext.getCmp('btn_m_av').removeCls('btn_m_av_jp btn_m_av_en');
            Ext.getCmp('btn_m_as').removeCls('btn_m_as_jp btn_m_as_en');
            Ext.getCmp('btn_m_rule').removeCls('btn_m_rule_jp btn_m_rule_en');
            Ext.getCmp('btn_m_obj').removeCls('btn_m_obj_jp btn_m_obj_en');
            Ext.getCmp('btn_m_profile').removeCls('btn_m_pf_jp btn_m_pf_en');
            Ext.getCmp('btn_m_net').removeCls('btn_m_net_jp btn_m_net_en');
            Ext.getCmp('btn_m_sys').removeCls('btn_m_sys_jp btn_m_sys_en');
            Ext.getCmp('btn_m_loglist').removeCls('btn_m_loglist_jp btn_m_loglist_en');
            Ext.getCmp('btn_m_log_stat').removeCls('btn_m_stat_jp btn_m_stat_en');
            Ext.getCmp('btn_m_logset').removeCls('btn_m_lset_jp btn_m_lset_en');
            Ext.getCmp('btn_m_mon_net').removeCls('btn_m_net_jp btn_m_net_en');
            Ext.getCmp('btn_m_mon_sys').removeCls('btn_m_sys_jp btn_m_sys_en');
            Ext.getCmp('btn_m_mon_fw').removeCls('btn_m_fw_jp btn_m_fw_en');
            Ext.getCmp('btn_m_mon_set').removeCls('btn_m_lset_jp btn_m_lset_en');
            Ext.getCmp('btn_m_tk_fw').removeCls('btn_m_fw_jp btn_m_fw_en');
            Ext.getCmp('btn_m_tk_app').removeCls('btn_m_app_jp btn_m_app_en');

            Ext.getCmp('btn_sendpolicy').removeCls('btn_sendpolicy_jp btn_sendpolicy_en');
            Ext.getCmp('btn_m_log').removeCls('btn_m_log_jp btn_m_log_en');
            Ext.getCmp('btn_m_monitor').removeCls('btn_m_monitor_jp btn_m_monitor_en');
            Ext.getCmp('btn_atoz').removeCls('btn_mn_atoz_jp btn_mn_atoz_en');
        }


        Ext.getCmp('sel_top_fw').setText(__zen('fw'));
        Ext.getCmp('sel_top_av').setText(__zen('av'));
        Ext.getCmp('sel_top_as').setText(__zen('as'));
        Ext.getCmp('sel_top_tracker').setText(__zen('traffic_tracker'));
    },

    chg_auth_mode: function(mode) {
        var me = this;
        var __auth = me.clientInfo.perspectiveInfo;

        if(__auth===2){
            //Ext.getCmp('sel_zen_license').hide();
            Ext.getCmp('trg_container').hide();
            Ext.getCmp('btn_m_monitor').setDisabled(true);
            Ext.getCmp('btn_atoz').setDisabled(true);
            Ext.getCmp('d_license_fw').setDisabled(true);
             Ext.getCmp('d_license_ips').setDisabled(true);
             Ext.getCmp('d_license_ipsec').setDisabled(true);
             Ext.getCmp('d_license_ssl').setDisabled(true);
             Ext.getCmp('d_license_av').setDisabled(true);
             Ext.getCmp('d_license_as').setDisabled(true);
             Ext.getCmp('d_license_tracker').setDisabled(true);


        }else if(__auth===1 || __auth===5){
            Ext.getCmp('btn_m_log').setDisabled(true);
            Ext.getCmp('b_trg_log').setDisabled(true);
        }




        if(mode===1){
            me.get_combo_map();
            me.set_sitemap();
        }
    }

});