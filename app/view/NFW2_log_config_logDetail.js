
Ext.define('NFW2.view.NFW2_log_config_logDetail', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_log_config_logdetail',

    requires: [
        'NFW2.view.NFW2_log_config_logDetailViewModel',
        'Ext.toolbar.Toolbar',
        'Ext.form.Panel',
        'Ext.form.field.File',
        'Ext.form.field.FileButton',
        'Ext.form.field.ComboBox',
        'Ext.Img',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table'
    ],

    viewModel: {
        type: 'nfw2_log_config_logdetail'
    },
    cls: 'zen_body',
    id: 'NFW2_log_config_logDetail',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'top',
            cls: 'zen_toolbar',
            items: [
                {
                    xtype: 'button',
                    enableToggle: true,
                    iconCls: 'ic_import',
                    bind: {
                        text: '{log_file_upload}'
                    },
                    listeners: {
                        toggle: 'onButtonToggle'
                    }
                },
                {
                    xtype: 'form',
                    hidden: true,
                    id: 'upform',
                    margin: 0,
                    bodyPadding: 0,
                    items: [
                        {
                            xtype: 'container',
                            cls: 'dv_pop_inner',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'filefield',
                                    id: 'uploadFile',
                                    margin: '2 0 0 0',
                                    name: 'uploadFile',
                                    buttonConfig: {
                                        xtype: 'filebutton',
                                        cls: 'btn_b',
                                        bind: {
                                            text: '{file_find}'
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    cls: 'btn_b',
                                    margin: '0 0 0 5',
                                    iconCls: 'ft_confirm_icl',
                                    bind: {
                                        text: '{confirm}'
                                    },
                                    listeners: {
                                        click: 'onButtonClick2'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'bottom',
            margin: '10 0 0 0',
            ui: 'footer',
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    cls: 'fld_msg',
                    itemId: 'fld_msg'
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onButtonClick'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onButtonClick1'
                    }
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'form',
            flex: 1,
            bind: {
                title: '{system}'
            },
            items: [
                {
                    xtype: 'container',
                    cls: 'fld_info_box',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'com_system',
                            value: 'low',
                            editable: false,
                            displayField: 'name',
                            valueField: 'val',
                            listeners: {
                                change: 'onCom_systemChange'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_hdd_off',
                            id: 'log_sys_hdd',
                            margin: '-2 0 0 10',
                            listeners: {
                                render: 'onLog_sys_hddRender',
                                beforerender: 'onLog_sys_hddBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_mail_off',
                            id: 'log_sys_mail',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_sys_mailRender',
                                beforerender: 'onLog_sys_mailBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_sys_off',
                            id: 'log_sys_sys',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_sys_sysRender',
                                beforerender: 'onLog_sys_sysBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog1_off',
                            id: 'log_sys_syslog1',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_sys_syslogRender',
                                beforerender: 'onLog_sys_syslogBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog2_off',
                            id: 'log_sys_syslog2',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_sys_syslogRender1',
                                beforerender: 'onLog_sys_syslogBeforeRender1'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog3_off',
                            id: 'log_sys_syslog3',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_sys_syslogRender2',
                                beforerender: 'onLog_sys_syslogBeforeRender2'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog4_off',
                            id: 'log_sys_syslog4',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_sys_syslogRender3',
                                beforerender: 'onLog_sys_syslogBeforeRender3'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog5_off',
                            id: 'log_sys_syslog5',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_sys_syslogRender4',
                                beforerender: 'onLog_sys_syslogBeforeRender4'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_log_off',
                            id: 'log_sys_log',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_sys_logRender',
                                beforerender: 'onLog_sys_logBeforeRender'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    id: 'con_system',
                    margin: '5 0 0 0',
                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_sys_sys'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_sys_admin'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_sys_send'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_sys_daemon'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_sys_backup'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_sys_update'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_sys_log'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_sys_radius'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_sys_set'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_sys_cert'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_sys_center'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_sys_ha'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_sys_llcf'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    hidden: true,
                    items: [
                        {
                            xtype: 'gridpanel',
                            id: 'grid_sys_sys',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: '시스템',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_sys_admin',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: '관리자',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_sys_send',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: '정책 전송',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_sys_daemon',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: '데몬 관리',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_sys_backup',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: '백업/복원',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_sys_update',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: '업데이트',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_sys_log',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: '로그',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_sys_radius',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: '외부서버',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_sys_set',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: '설정',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_sys_cert',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: '인증서',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_sys_center',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    align: 'center',
                                    dataIndex: 'smc_log',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_sys_ha',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: 'HA',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_sys_llcf',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: 'LLCF',
                                    flex: 2
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'form',
            flex: 1,
            bind: {
                title: '{network}'
            },
            items: [
                {
                    xtype: 'container',
                    cls: 'fld_info_box',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'com_network',
                            value: 'low',
                            editable: false,
                            displayField: 'name',
                            valueField: 'val',
                            listeners: {
                                change: 'onCom_networkChange'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_hdd_off',
                            id: 'log_network_hdd',
                            margin: '-2 0 0 10',
                            listeners: {
                                render: 'onLog_network_hddRender',
                                beforerender: 'onLog_network_hddBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_mail_off',
                            id: 'log_network_mail',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_network_mailRender',
                                beforerender: 'onLog_network_mailBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_sys_off',
                            id: 'log_network_sys',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_network_sysRender',
                                beforerender: 'onLog_network_sysBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog1_off',
                            id: 'log_network_syslog1',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_network_syslogRender',
                                beforerender: 'onLog_network_syslogBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog2_off',
                            id: 'log_network_syslog2',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_network_syslogRender1',
                                beforerender: 'onLog_network_syslogBeforeRender1'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog3_off',
                            id: 'log_network_syslog3',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_network_syslogRender11',
                                beforerender: 'onLog_network_syslogBeforeRender11'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog4_off',
                            id: 'log_network_syslog4',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_network_syslogRender111',
                                beforerender: 'onLog_network_syslogBeforeRender111'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog5_off',
                            id: 'log_network_syslog5',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_network_syslogRender1111',
                                beforerender: 'onLog_network_syslogBeforeRender1111'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_log_off',
                            id: 'log_network_log',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_network_logRender',
                                beforerender: 'onLog_network_logBeforeRender'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '5 0 0 0',
                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_network_inter'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_network_multi'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_network_l2'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_network_checker'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_network_vrrp'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_network_ipm'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    hidden: true,
                    items: [
                        {
                            xtype: 'gridpanel',
                            id: 'grid_network_inter',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: '인터페이스',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_network_multi',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: 'MULTIPATH',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_network_l2',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: 'L2TP',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_network_checker',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: 'CHECKER',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_network_vrrp',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: 'VRRP',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_network_ipm',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: 'IPM',
                                    flex: 2
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'form',
            flex: 1,
            bind: {
                title: '{fw}'
            },
            items: [
                {
                    xtype: 'container',
                    cls: 'fld_info_box',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'com_fw',
                            value: 'low',
                            editable: false,
                            displayField: 'name',
                            valueField: 'val',
                            listeners: {
                                change: 'onCom_fwChange'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_hdd_off',
                            id: 'log_fw_hdd',
                            margin: '-2 0 0 10',
                            listeners: {
                                render: 'onLog_fw_hddRender',
                                beforerender: 'onLog_fw_hddBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_mail_off',
                            id: 'log_fw_mail',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_fw_mailRender',
                                beforerender: 'onLog_fw_mailBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_sys_off',
                            id: 'log_fw_sys',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_fw_sysRender',
                                beforerender: 'onLog_fw_sysBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog1_off',
                            id: 'log_fw_syslog1',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_fw_syslogRender',
                                beforerender: 'onLog_fw_syslogBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog2_off',
                            id: 'log_fw_syslog2',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_fw_syslogRender1',
                                beforerender: 'onLog_fw_syslogBeforeRender1'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog3_off',
                            id: 'log_fw_syslog3',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_fw_syslogRender11',
                                beforerender: 'onLog_fw_syslogBeforeRender11'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog4_off',
                            id: 'log_fw_syslog4',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_fw_syslogRender111',
                                beforerender: 'onLog_fw_syslogBeforeRender111'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog5_off',
                            id: 'log_fw_syslog5',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_fw_syslogRender1111',
                                beforerender: 'onLog_fw_syslogBeforeRender1111'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_log_off',
                            id: 'log_fw_log',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_fw_logRender',
                                beforerender: 'onLog_fw_logBeforeRender'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '5 0 0 0',
                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_fw_policy'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_fw_web'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_fw_app'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_fw_white'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_fw_nat'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_fw_user'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    hidden: true,
                    items: [
                        {
                            xtype: 'gridpanel',
                            id: 'grid_fw_policy',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: '보안 정책',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_fw_web',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: '웹 필터링',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_fw_app',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: '애플리케이션',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_fw_white',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: '화이트/블랙 리스트',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_fw_nat',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: 'NAT64',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_fw_user',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: '사용자',
                                    flex: 2
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'form',
            flex: 1,
            bind: {
                title: '{ipsec_vpn}'
            },
            items: [
                {
                    xtype: 'container',
                    cls: 'fld_info_box',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'com_vpn',
                            value: 'low',
                            editable: false,
                            displayField: 'name',
                            valueField: 'val',
                            listeners: {
                                change: 'onCom_vpnChange'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_hdd_off',
                            id: 'log_vpn_hdd',
                            margin: '-2 0 0 10',
                            listeners: {
                                render: 'onLog_vpn_hddRender',
                                beforerender: 'onLog_vpn_hddBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_mail_off',
                            id: 'log_vpn_mail',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_vpn_mailRender',
                                beforerender: 'onLog_vpn_mailBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_sys_off',
                            id: 'log_vpn_sys',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_vpn_sysRender',
                                beforerender: 'onLog_vpn_sysBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog1_off',
                            id: 'log_vpn_syslog1',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_vpn_syslogRender',
                                beforerender: 'onLog_vpn_syslogBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog2_off',
                            id: 'log_vpn_syslog2',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_vpn_syslogRender1',
                                beforerender: 'onLog_vpn_syslogBeforeRender1'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog3_off',
                            id: 'log_vpn_syslog3',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_vpn_syslogRender2',
                                beforerender: 'onLog_vpn_syslogBeforeRender2'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog4_off',
                            id: 'log_vpn_syslog4',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_vpn_syslogRender3',
                                beforerender: 'onLog_vpn_syslogBeforeRender3'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog5_off',
                            id: 'log_vpn_syslog5',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_vpn_syslogRender4',
                                beforerender: 'onLog_vpn_syslogBeforeRender4'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_log_off',
                            id: 'log_vpn_log',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_vpn_logRender',
                                beforerender: 'onLog_vpn_logBeforeRender'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '5 0 0 0',
                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_vpn_ike'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_vpn_ipsec'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    hidden: true,
                    items: [
                        {
                            xtype: 'gridpanel',
                            id: 'grid_vpn_ike',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: 'IKE',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_vpn_ipsec',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: 'IPSec',
                                    flex: 2
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'form',
            flex: 1,
            bind: {
                title: '{ssl_vpn}'
            },
            items: [
                {
                    xtype: 'container',
                    cls: 'fld_info_box',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'com_ssl',
                            value: 'low',
                            editable: false,
                            displayField: 'name',
                            valueField: 'val',
                            listeners: {
                                change: 'onCom_sslChange'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_hdd_off',
                            id: 'log_ssl_hdd',
                            margin: '-2 0 0 10',
                            listeners: {
                                render: 'onLog_ssl_hddRender',
                                beforerender: 'onLog_ssl_hddBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_mail_off',
                            id: 'log_ssl_mail',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ssl_mailRender',
                                beforerender: 'onLog_ssl_mailBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_sys_off',
                            id: 'log_ssl_sys',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ssl_sysRender',
                                beforerender: 'onLog_ssl_sysBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog1_off',
                            id: 'log_ssl_syslog1',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ssl_syslogRender',
                                beforerender: 'onLog_ssl_syslogBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog2_off',
                            id: 'log_ssl_syslog2',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ssl_syslogRender1',
                                beforerender: 'onLog_ssl_syslogBeforeRender1'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog3_off',
                            id: 'log_ssl_syslog3',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ssl_syslogRender2',
                                beforerender: 'onLog_ssl_syslogBeforeRender2'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog4_off',
                            id: 'log_ssl_syslog4',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ssl_syslogRender3',
                                beforerender: 'onLog_ssl_syslogBeforeRender3'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog5_off',
                            id: 'log_ssl_syslog5',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ssl_syslogRender4',
                                beforerender: 'onLog_ssl_syslogBeforeRender4'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_log_off',
                            id: 'log_ssl_log',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ssl_logRender',
                                beforerender: 'onLog_ssl_logBeforeRender'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '5 0 0 0',
                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_ssl_user'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_ssl_access'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_ssl_flow'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_ssl_inter'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    hidden: true,
                    items: [
                        {
                            xtype: 'gridpanel',
                            id: 'grid_ssl_user',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: '사용자 인증',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_ssl_access',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: '액세스',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_ssl_flow',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: '트래픽',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_ssl_inter',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: '무결성 검사',
                                    flex: 2
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'form',
            flex: 1,
            bind: {
                title: '{ips}'
            },
            items: [
                {
                    xtype: 'container',
                    cls: 'fld_info_box',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'com_ips',
                            value: 'low',
                            editable: false,
                            displayField: 'name',
                            valueField: 'val',
                            listeners: {
                                change: 'onCom_ipsChange'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_hdd_off',
                            id: 'log_ips_hdd',
                            margin: '-2 0 0 10',
                            listeners: {
                                render: 'onLog_ips_hddRender',
                                beforerender: 'onLog_ips_hddBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_mail_off',
                            id: 'log_ips_mail',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ips_mailRender',
                                beforerender: 'onLog_ips_mailBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_sys_off',
                            id: 'log_ips_sys',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ips_sysRender',
                                beforerender: 'onLog_ips_sysBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog1_off',
                            id: 'log_ips_syslog1',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ips_syslogRender',
                                beforerender: 'onLog_ips_syslogBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog2_off',
                            id: 'log_ips_syslog2',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ips_syslogRender1',
                                beforerender: 'onLog_ips_syslogBeforeRender1'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog3_off',
                            id: 'log_ips_syslog3',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ips_syslogRender2',
                                beforerender: 'onLog_ips_syslogBeforeRender2'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog4_off',
                            id: 'log_ips_syslog4',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ips_syslogRender3',
                                beforerender: 'onLog_ips_syslogBeforeRender3'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog5_off',
                            id: 'log_ips_syslog5',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ips_syslogRender4',
                                beforerender: 'onLog_ips_syslogBeforeRender4'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_log_off',
                            id: 'log_ips_log',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ips_logRender',
                                beforerender: 'onLog_ips_logBeforeRender'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '5 0 0 0',
                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_ips_detect'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_ips_scan'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_ips_spoofing'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_ips_pre'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    hidden: true,
                    items: [
                        {
                            xtype: 'gridpanel',
                            id: 'grid_ips_detect',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: 'IPS',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_ips_scan',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: 'PortScan',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_ips_spoofing',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: 'IP Spoofing',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_ips_pre',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: 'Preprocessor',
                                    flex: 2
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'form',
            flex: 1,
            bind: {
                title: '{ddos}'
            },
            items: [
                {
                    xtype: 'container',
                    cls: 'fld_info_box',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'com_ddos',
                            value: 'low',
                            editable: false,
                            displayField: 'name',
                            valueField: 'val',
                            listeners: {
                                change: 'onCom_ddosChange'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_hdd_off',
                            id: 'log_ddos_hdd',
                            margin: '-2 0 0 10',
                            listeners: {
                                render: 'onLog_ddos_hddRender',
                                beforerender: 'onLog_ddos_hddBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_mail_off',
                            id: 'log_ddos_mail',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ddos_mailRender',
                                beforerender: 'onLog_ddos_mailBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_sys_off',
                            id: 'log_ddos_sys',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ddos_sysRender',
                                beforerender: 'onLog_ddos_sysBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog1_off',
                            id: 'log_ddos_syslog1',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ddos_syslogRender',
                                beforerender: 'onLog_ddos_syslogBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog2_off',
                            id: 'log_ddos_syslog2',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ddos_syslogRender1',
                                beforerender: 'onLog_ddos_syslogBeforeRender1'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog3_off',
                            id: 'log_ddos_syslog3',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ddos_syslogRender2',
                                beforerender: 'onLog_ddos_syslogBeforeRender2'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog4_off',
                            id: 'log_ddos_syslog4',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ddos_syslogRender3',
                                beforerender: 'onLog_ddos_syslogBeforeRender3'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog5_off',
                            id: 'log_ddos_syslog5',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ddos_syslogRender4',
                                beforerender: 'onLog_ddos_syslogBeforeRender4'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_log_off',
                            id: 'log_ddos_log',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ddos_logRender',
                                beforerender: 'onLog_ddos_logBeforeRender'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '5 0 0 0',
                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_ddos_dos'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_ddos_ddos'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_ddos_http'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_ddos_dns'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_ddos_sql'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    hidden: true,
                    items: [
                        {
                            xtype: 'gridpanel',
                            id: 'grid_ddos_dos',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: 'DoS',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_ddos_ddos',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: 'DDoS',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_ddos_http',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: 'HTTP',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_ddos_dns',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: 'DNS',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_ddos_sql',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: 'SQL',
                                    flex: 2
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'form',
            flex: 1,
            bind: {
                title: '{av}'
            },
            items: [
                {
                    xtype: 'container',
                    cls: 'fld_info_box',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'com_av',
                            value: 'low',
                            editable: false,
                            displayField: 'name',
                            valueField: 'val',
                            listeners: {
                                change: 'onCom_avChange'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_hdd_off',
                            id: 'log_av_hdd',
                            margin: '-2 0 0 10',
                            listeners: {
                                render: 'onLog_av_hddRender',
                                beforerender: 'onLog_av_hddBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_mail_off',
                            id: 'log_av_mail',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_av_mailRender',
                                beforerender: 'onLog_av_mailBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_sys_off',
                            id: 'log_av_sys',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_av_sysRender',
                                beforerender: 'onLog_av_sysBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog1_off',
                            id: 'log_av_syslog1',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_av_syslogRender',
                                beforerender: 'onLog_av_syslogBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog2_off',
                            id: 'log_av_syslog2',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_av_syslogRender1',
                                beforerender: 'onLog_av_syslogBeforeRender1'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog3_off',
                            id: 'log_av_syslog3',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_av_syslogRender2',
                                beforerender: 'onLog_av_syslogBeforeRender2'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog4_off',
                            id: 'log_av_syslog4',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_av_syslogRender3',
                                beforerender: 'onLog_av_syslogBeforeRender3'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog5_off',
                            id: 'log_av_syslog5',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_av_syslogRender4',
                                beforerender: 'onLog_av_syslogBeforeRender4'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_log_off',
                            id: 'log_av_log',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_av_logRender',
                                beforerender: 'onLog_av_logBeforeRender'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '5 0 0 0',
                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_av_av'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    hidden: true,
                    items: [
                        {
                            xtype: 'gridpanel',
                            id: 'grid_av_av',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: '안티바이러스',
                                    flex: 2
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'form',
            flex: 1,
            bind: {
                title: '{as}'
            },
            items: [
                {
                    xtype: 'container',
                    cls: 'fld_info_box',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'com_as',
                            value: 'low',
                            editable: false,
                            displayField: 'name',
                            valueField: 'val',
                            listeners: {
                                change: 'onCom_asChange'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_hdd_off',
                            id: 'log_as_hdd',
                            margin: '-2 0 0 10',
                            listeners: {
                                render: 'onLog_as_hddRender',
                                beforerender: 'onLog_as_hddBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_mail_off',
                            id: 'log_as_mail',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_as_mailRender',
                                beforerender: 'onLog_as_mailBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_sys_off',
                            id: 'log_as_sys',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_as_sysRender',
                                beforerender: 'onLog_as_sysBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog1_off',
                            id: 'log_as_syslog1',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_as_syslogRender',
                                beforerender: 'onLog_as_syslogBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog2_off',
                            id: 'log_as_syslog2',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_as_syslogRender1',
                                beforerender: 'onLog_as_syslogBeforeRender1'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog3_off',
                            id: 'log_as_syslog3',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_as_syslogRender2',
                                beforerender: 'onLog_as_syslogBeforeRender2'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog4_off',
                            id: 'log_as_syslog4',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_as_syslogRender3',
                                beforerender: 'onLog_as_syslogBeforeRender3'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog5_off',
                            id: 'log_as_syslog5',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_as_syslogRender4',
                                beforerender: 'onLog_as_syslogBeforeRender4'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_log_off',
                            id: 'log_as_log',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_as_logRender',
                                beforerender: 'onLog_as_logBeforeRender'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '5 0 0 0',
                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_as_as'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    hidden: true,
                    items: [
                        {
                            xtype: 'gridpanel',
                            id: 'grid_as_as',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subclassfication',
                                    text: '안티스팸',
                                    flex: 2
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onNFW2_log_config_logDetailAfterRender'
    },

    onButtonToggle: function(button, pressed, eOpts) {
        if(pressed){
            Ext.getCmp("upform").show();
        }else{
            Ext.getCmp("upform").hide();
        }
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = this;

        var form = Ext.getCmp('upform').getForm();

        if(Ext.getCmp('uploadFile').getValue() === '') return false;

        var val = Ext.getCmp('uploadFile').getValue().split('.');
        val = val[val.length-1];

        if(val !== 'xlsx'){
            Ext.Msg.alert(__weguardia, get_msg('err_xlsxfile'));
            return false;
        }

        var path = '/mnt/ramdisk/do/F3work/F3/nfw2/eventcode/';

        if(form.isValid()){

            form.submit({
                url: '/fileUploadCommon',
                params: {
                    filePath: Ext.encode(path),
                    delFlag: Ext.encode('false'),
                    fileName: Ext.encode('eventcode.xlsx')
                },
                waitMsg: 'Uploading...',
                success: function(fp, o) {

                    showCompLoadMask(Ext.getCmp('NFW2_log_config_logDetail'));

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'setLogDetailInit',
                        {},
                        function(response){

                            var _params = {
                                basename : Ext.encode('log_detail_setting'),
                                limit: Ext.encode(0)
                            };

                            request_helper.xmlrpc_call_JsonP(
                                'ftuctrl',
                                'getObjects',
                                _params,
                                function(response){

                                    hideCompLoadMask(Ext.getCmp('NFW2_log_config_logDetail'));

                                    if(response){

                                        var r_list = {};
                                        for(var i in response.list){
                                            r_list[response.list[i].define] = response.list[i];
                                        }

                                        Ext.getCmp('NFW2_log_config_logDetail').r_list = r_list;

                                        me.data = response;
                                        var ar_list = ["시스템","네트워크","방화벽","IPSecVPN","SSLVPN","IPS","DDoS","안티바이러스","안티스팸"];
                                        var ar = ['sys','network','fw','vpn','ssl','ips','ddos','av','as'];
                                        me.re_detail(ar_list,ar);
                                    }
                                }
                            );

                        }
                    );
                },
                failure : function(fb, o) {
                    Ext.Msg.alert(__weguardia, __zen('file_upload_fail'));
                }
            });
        }
    },

    onCom_systemChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        var r_list = me.r_list;

        if(newValue){
            var ar = ['sys','admin','send','daemon','backup','update','log','radius','set','cert','center','ha','llcf'];

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_sys_"+ar[i]).getStore();
                for(var l=0; l<store.data.length; l++){
                    var event = store.data.items[l].data.event;
                    eval('r_list[event].create = r_list[event].create'+newValue+';');
                    r_list[event].send_mail = 'off';
                    eval('r_list[event].system = r_list[event].system'+newValue+';');
                    r_list[event].syslog = 'off';
                    r_list[event].smc_log = 'off';
                }
            }

            me.r_list = r_list;
            me.re_detail(['시스템'],['sys']);
        }
    },

    onLog_sys_hddRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar_sys = ['sys','admin','send','daemon','backup','update','log','radius','set','cert','center','ha','llcf'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar_sys.length; i++){
                var store = Ext.getCmp("grid_sys_"+ar_sys[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].create = "'+checked+'"');
                }
            }
            var ar_list = ["시스템"];
            var ar = ['sys'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_sys_hddBeforeRender: function(component, eOpts) {
        component.title = __zen('log_set');
    },

    onLog_sys_mailRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar_sys = ['sys','admin','send','daemon','backup','update','log','radius','set','cert','center','ha','llcf'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar_sys.length; i++){
                var store = Ext.getCmp("grid_sys_"+ar_sys[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].send_mail = "'+checked+'"');
                }
            }

            var ar_list = ["시스템"];
            var ar = ['sys'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_sys_mailBeforeRender: function(component, eOpts) {
        component.title = __zen('send_mail');
    },

    onLog_sys_sysRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar_sys = ['sys','admin','send','daemon','backup','update','log','radius','set','cert','center','ha','llcf'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar_sys.length; i++){
                var store = Ext.getCmp("grid_sys_"+ar_sys[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].system = "'+checked+'"');
                }
            }

            var ar_list = ["시스템"];
            var ar = ['sys'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_sys_sysBeforeRender: function(component, eOpts) {
        component.title = __zen('system_alarm');
    },

    onLog_sys_syslogRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar_sys = ['sys','admin','send','daemon','backup','update','log','radius','set','cert','center','ha','llcf'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar_sys.length; i++){
                var store = Ext.getCmp("grid_sys_"+ar_sys[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog1 = "'+checked+'"');
                }
            }

            var ar_list = ["시스템"];
            var ar = ['sys'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_sys_syslogBeforeRender: function(component, eOpts) {
        component.title = __zen('syslog')+'(1)';
    },

    onLog_sys_syslogRender1: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar_sys = ['sys','admin','send','daemon','backup','update','log','radius','set','cert','center','ha','llcf'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar_sys.length; i++){
                var store = Ext.getCmp("grid_sys_"+ar_sys[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog2 = "'+checked+'"');
                }
            }

            var ar_list = ["시스템"];
            var ar = ['sys'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_sys_syslogBeforeRender1: function(component, eOpts) {
        component.title = __zen('syslog')+'(2)';
    },

    onLog_sys_syslogRender2: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar_sys = ['sys','admin','send','daemon','backup','update','log','radius','set','cert','center','ha','llcf'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar_sys.length; i++){
                var store = Ext.getCmp("grid_sys_"+ar_sys[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog3 = "'+checked+'"');
                }
            }

            var ar_list = ["시스템"];
            var ar = ['sys'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_sys_syslogBeforeRender2: function(component, eOpts) {
        component.title = __zen('syslog')+'(3)';
    },

    onLog_sys_syslogRender3: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar_sys = ['sys','admin','send','daemon','backup','update','log','radius','set','cert','center','ha','llcf'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar_sys.length; i++){
                var store = Ext.getCmp("grid_sys_"+ar_sys[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog4 = "'+checked+'"');
                }
            }

            var ar_list = ["시스템"];
            var ar = ['sys'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_sys_syslogBeforeRender3: function(component, eOpts) {
        component.title = __zen('syslog')+'(4)';
    },

    onLog_sys_syslogRender4: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar_sys = ['sys','admin','send','daemon','backup','update','log','radius','set','cert','center','ha','llcf'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar_sys.length; i++){
                var store = Ext.getCmp("grid_sys_"+ar_sys[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog5 = "'+checked+'"');
                }
            }

            var ar_list = ["시스템"];
            var ar = ['sys'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_sys_syslogBeforeRender4: function(component, eOpts) {
        component.title = __zen('syslog')+'(5)';
    },

    onLog_sys_logRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar_sys = ['sys','admin','send','daemon','backup','update','log','radius','set','cert','center','ha','llcf'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar_sys.length; i++){
                var store = Ext.getCmp("grid_sys_"+ar_sys[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].smc_log = "'+checked+'"');
                }
            }

            var ar_list = ["시스템"];
            var ar = ['sys'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_sys_logBeforeRender: function(component, eOpts) {
        component.title = __zen('we_logserver');
    },

    onCom_networkChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        var r_list = me.r_list;

        if(newValue){
            var ar = ['inter','l2','ha','llcf','multi','checker','vrrp','ipm'];

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_network_"+ar[i]).getStore();
                for(var l=0; l<store.data.length; l++){
                    var event = store.data.items[l].data.event;
                    eval('r_list[event].create = r_list[event].create'+newValue+';');
                    r_list[event].send_mail = 'off';
                    eval('r_list[event].system = r_list[event].system'+newValue+';');
                    r_list[event].syslog = 'off';
                    r_list[event].smc_log = 'off';
                }
            }

            me.r_list = r_list;
            me.re_detail(['네트워크'],['network']);
        }
    },

    onLog_network_hddRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar_sys = ['inter','ha','multi','l2','llcf','checker','vrrp','ipm'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar_sys.length; i++){
                var store = Ext.getCmp("grid_network_"+ar_sys[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].create = "'+checked+'"');
                }
            }

            var ar_list = ["네트워크"];
            var ar = ['network'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_network_hddBeforeRender: function(component, eOpts) {
        component.title = __zen('log_set');
    },

    onLog_network_mailRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar_sys = ['inter','ha','multi','l2','llcf','checker','vrrp','ipm'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar_sys.length; i++){
                var store = Ext.getCmp("grid_network_"+ar_sys[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].send_mail = "'+checked+'"');
                }
            }

            var ar_list = ["네트워크"];
            var ar = ['network'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_network_mailBeforeRender: function(component, eOpts) {
        component.title = __zen('send_mail');
    },

    onLog_network_sysRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar_sys = ['inter','ha','multi','l2','llcf','checker','vrrp','ipm'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar_sys.length; i++){
                var store = Ext.getCmp("grid_network_"+ar_sys[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].system = "'+checked+'"');
                }
            }

            var ar_list = ["네트워크"];
            var ar = ['network'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_network_sysBeforeRender: function(component, eOpts) {
        component.title = __zen('system_alarm');
    },

    onLog_network_syslogRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar_sys = ['inter','ha','multi','l2','llcf','checker','vrrp','ipm'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar_sys.length; i++){
                var store = Ext.getCmp("grid_network_"+ar_sys[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog1 = "'+checked+'"');
                }
            }

            var ar_list = ["네트워크"];
            var ar = ['network'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_network_syslogBeforeRender: function(component, eOpts) {
        component.title = __zen('syslog')+'(1)';
    },

    onLog_network_syslogRender1: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar_sys = ['inter','ha','multi','l2','llcf','checker','vrrp','ipm'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar_sys.length; i++){
                var store = Ext.getCmp("grid_network_"+ar_sys[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog2 = "'+checked+'"');
                }
            }

            var ar_list = ["네트워크"];
            var ar = ['network'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_network_syslogBeforeRender1: function(component, eOpts) {
        component.title = __zen('syslog')+'(2)';
    },

    onLog_network_syslogRender11: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar_sys = ['inter','ha','multi','l2','llcf','checker','vrrp','ipm'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar_sys.length; i++){
                var store = Ext.getCmp("grid_network_"+ar_sys[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog3 = "'+checked+'"');
                }
            }

            var ar_list = ["네트워크"];
            var ar = ['network'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_network_syslogBeforeRender11: function(component, eOpts) {
        component.title = __zen('syslog')+'(3)';
    },

    onLog_network_syslogRender111: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar_sys = ['inter','ha','multi','l2','llcf','checker','vrrp','ipm'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar_sys.length; i++){
                var store = Ext.getCmp("grid_network_"+ar_sys[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog4 = "'+checked+'"');
                }
            }

            var ar_list = ["네트워크"];
            var ar = ['network'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_network_syslogBeforeRender111: function(component, eOpts) {
        component.title = __zen('syslog')+'(4)';
    },

    onLog_network_syslogRender1111: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar_sys = ['inter','ha','multi','l2','llcf','checker','vrrp','ipm'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar_sys.length; i++){
                var store = Ext.getCmp("grid_network_"+ar_sys[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog5 = "'+checked+'"');
                }
            }

            var ar_list = ["네트워크"];
            var ar = ['network'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_network_syslogBeforeRender1111: function(component, eOpts) {
        component.title = __zen('syslog')+'(5)';
    },

    onLog_network_logRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar_sys = ['inter','ha','multi','l2','llcf','checker','vrrp','ipm'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar_sys.length; i++){
                var store = Ext.getCmp("grid_network_"+ar_sys[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].smc_log = "'+checked+'"');
                }
            }

            var ar_list = ["네트워크"];
            var ar = ['network'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_network_logBeforeRender: function(component, eOpts) {
        component.title = __zen('we_logserver');
    },

    onCom_fwChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        var r_list = me.r_list;

        if(newValue){
            var ar = ['policy','nat','web','white','app','user'];

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_fw_"+ar[i]).getStore();
                for(var l=0; l<store.data.length; l++){
                    var event = store.data.items[l].data.event;
                    eval('r_list[event].create = r_list[event].create'+newValue+';');
                    r_list[event].send_mail = 'off';
                    eval('r_list[event].system = r_list[event].system'+newValue+';');
                    r_list[event].syslog = 'off';
                    r_list[event].smc_log = 'off';
                }
            }

            me.r_list = r_list;
            me.re_detail(['방화벽'],['fw']);
        }
    },

    onLog_fw_hddRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['policy','web','app','white','nat','user'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_fw_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].create = "'+checked+'"');
                }
            }

            var ar_list = ["방화벽"];
            var ar = ['fw'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_fw_hddBeforeRender: function(component, eOpts) {
        component.title = __zen('log_set');
    },

    onLog_fw_mailRender: function(component, eOpts) {
        /*component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['policy','web','app','white','nat','user'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_fw_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.category+'"].send_mail = "'+checked+'"');
                }
            }

            me.re_detail();
        }, component);*/
    },

    onLog_fw_mailBeforeRender: function(component, eOpts) {
        component.title = __zen('send_mail');
    },

    onLog_fw_sysRender: function(component, eOpts) {
        /*component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['policy','web','app','white','nat','user'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_fw_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].system = "'+checked+'"');
                }
            }

            me.re_detail();
        }, component);*/
    },

    onLog_fw_sysBeforeRender: function(component, eOpts) {
        component.title = __zen('system_alarm');
    },

    onLog_fw_syslogRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['policy','web','app','white','nat','user'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_fw_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog1 = "'+checked+'"');
                }
            }

            var ar_list = ["방화벽"];
            var ar = ['fw'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_fw_syslogBeforeRender: function(component, eOpts) {
        component.title = __zen('syslog')+'(1)';
    },

    onLog_fw_syslogRender1: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['policy','web','app','white','nat','user'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_fw_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog2 = "'+checked+'"');
                }
            }

            var ar_list = ["방화벽"];
            var ar = ['fw'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_fw_syslogBeforeRender1: function(component, eOpts) {
        component.title = __zen('syslog')+'(2)';
    },

    onLog_fw_syslogRender11: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['policy','web','app','white','nat','user'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_fw_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog3 = "'+checked+'"');
                }
            }

            var ar_list = ["방화벽"];
            var ar = ['fw'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_fw_syslogBeforeRender11: function(component, eOpts) {
        component.title = __zen('syslog')+'(3)';
    },

    onLog_fw_syslogRender111: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['policy','web','app','white','nat','user'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_fw_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog4 = "'+checked+'"');
                }
            }

            var ar_list = ["방화벽"];
            var ar = ['fw'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_fw_syslogBeforeRender111: function(component, eOpts) {
        component.title = __zen('syslog')+'(4)';
    },

    onLog_fw_syslogRender1111: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['policy','web','app','white','nat','user'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_fw_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog5 = "'+checked+'"');
                }
            }

            var ar_list = ["방화벽"];
            var ar = ['fw'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_fw_syslogBeforeRender1111: function(component, eOpts) {
        component.title = __zen('syslog')+'(5)';
    },

    onLog_fw_logRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['policy','web','app','white','nat','user'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_fw_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].smc_log = "'+checked+'"');
                }
            }

            var ar_list = ["방화벽"];
            var ar = ['fw'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_fw_logBeforeRender: function(component, eOpts) {
        component.title = __zen('we_logserver');
    },

    onCom_vpnChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        var r_list = me.r_list;

        if(newValue){
            var ar = ['ike','ipsec'];

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_vpn_"+ar[i]).getStore();
                for(var l=0; l<store.data.length; l++){
                    var event = store.data.items[l].data.event;
                    eval('r_list[event].create = r_list[event].create'+newValue+';');
                    r_list[event].send_mail = 'off';
                    eval('r_list[event].system = r_list[event].system'+newValue+';');
                    r_list[event].syslog = 'off';
                    r_list[event].smc_log = 'off';
                }
            }

            me.r_list = r_list;
            me.re_detail(['IPSecVPN'],['vpn']);
        }
    },

    onLog_vpn_hddRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['ike','ipsec'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_vpn_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].create = "'+checked+'"');
                }
            }

            var ar_list = ["IPSecVPN"];
            var ar = ['vpn'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_vpn_hddBeforeRender: function(component, eOpts) {
        component.title = __zen('log_set');
    },

    onLog_vpn_mailRender: function(component, eOpts) {
        /*component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['ike','ipsec'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_vpn_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].send_mail = "'+checked+'"');
                }
            }

            me.re_detail();
        }, component);*/
    },

    onLog_vpn_mailBeforeRender: function(component, eOpts) {
        component.title = __zen('send_mail');
    },

    onLog_vpn_sysRender: function(component, eOpts) {
        /*component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['ike','ipsec'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_vpn_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].system = "'+checked+'"');
                }
            }

            me.re_detail();
        }, component);*/
    },

    onLog_vpn_sysBeforeRender: function(component, eOpts) {
        component.title = __zen('system_alarm');
    },

    onLog_vpn_syslogRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['ike','ipsec'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_vpn_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog1 = "'+checked+'"');
                }
            }

            var ar_list = ["IPSecVPN"];
            var ar = ['vpn'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_vpn_syslogBeforeRender: function(component, eOpts) {
        component.title = __zen('syslog')+'(1)';
    },

    onLog_vpn_syslogRender1: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['ike','ipsec'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_vpn_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog2 = "'+checked+'"');
                }
            }

            var ar_list = ["IPSecVPN"];
            var ar = ['vpn'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_vpn_syslogBeforeRender1: function(component, eOpts) {
        component.title = __zen('syslog')+'(2)';
    },

    onLog_vpn_syslogRender2: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['ike','ipsec'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_vpn_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog3 = "'+checked+'"');
                }
            }

            var ar_list = ["IPSecVPN"];
            var ar = ['vpn'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_vpn_syslogBeforeRender2: function(component, eOpts) {
        component.title = __zen('syslog')+'(3)';
    },

    onLog_vpn_syslogRender3: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['ike','ipsec'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_vpn_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog4 = "'+checked+'"');
                }
            }

            var ar_list = ["IPSecVPN"];
            var ar = ['vpn'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_vpn_syslogBeforeRender3: function(component, eOpts) {
        component.title = __zen('syslog')+'(4)';
    },

    onLog_vpn_syslogRender4: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['ike','ipsec'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_vpn_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog5 = "'+checked+'"');
                }
            }

            var ar_list = ["IPSecVPN"];
            var ar = ['vpn'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_vpn_syslogBeforeRender4: function(component, eOpts) {
        component.title = __zen('syslog')+'(5)';
    },

    onLog_vpn_logRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['ike','ipsec'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_vpn_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].smc_log = "'+checked+'"');
                }
            }

            var ar_list = ["IPSecVPN"];
            var ar = ['vpn'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_vpn_logBeforeRender: function(component, eOpts) {
        component.title = __zen('we_logserver');
    },

    onCom_sslChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        var r_list = me.r_list;

        if(newValue){
            var ar = ['user','inter','access','flow'];

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ssl_"+ar[i]).getStore();
                for(var l=0; l<store.data.length; l++){
                    var event = store.data.items[l].data.event;
                    eval('r_list[event].create = r_list[event].create'+newValue+';');
                    r_list[event].send_mail = 'off';
                    eval('r_list[event].system = r_list[event].system'+newValue+';');
                    r_list[event].syslog = 'off';
                    r_list[event].smc_log = 'off';
                }
            }

            me.r_list = r_list;
            me.re_detail(['SSLVPN'],['ssl']);
        }
    },

    onLog_ssl_hddRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['user','access','flow','inter'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ssl_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].create = "'+checked+'"');
                }
            }

            var ar_list = ["SSLVPN"];
            var ar = ['ssl'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ssl_hddBeforeRender: function(component, eOpts) {
        component.title = __zen('log_set');
    },

    onLog_ssl_mailRender: function(component, eOpts) {
        /*component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['user','access','flow','inter'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ssl_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].send_mail = "'+checked+'"');
                }
            }

            me.re_detail();
        }, component);*/
    },

    onLog_ssl_mailBeforeRender: function(component, eOpts) {
        component.title = __zen('send_mail');
    },

    onLog_ssl_sysRender: function(component, eOpts) {
        /*component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['user','access','flow','inter'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ssl_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].system = "'+checked+'"');
                }
            }

            me.re_detail();
        }, component);*/
    },

    onLog_ssl_sysBeforeRender: function(component, eOpts) {
        component.title = __zen('system_alarm');
    },

    onLog_ssl_syslogRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['user','access','flow','inter'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ssl_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog1 = "'+checked+'"');
                }
            }

            var ar_list = ["SSLVPN"];
            var ar = ['ssl'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ssl_syslogBeforeRender: function(component, eOpts) {
        component.title = __zen('syslog')+'(1)';
    },

    onLog_ssl_syslogRender1: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['user','access','flow','inter'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ssl_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog2 = "'+checked+'"');
                }
            }

            var ar_list = ["SSLVPN"];
            var ar = ['ssl'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ssl_syslogBeforeRender1: function(component, eOpts) {
        component.title = __zen('syslog')+'(2)';
    },

    onLog_ssl_syslogRender2: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['user','access','flow','inter'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ssl_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog3 = "'+checked+'"');
                }
            }

            var ar_list = ["SSLVPN"];
            var ar = ['ssl'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ssl_syslogBeforeRender2: function(component, eOpts) {
        component.title = __zen('syslog')+'(3)';
    },

    onLog_ssl_syslogRender3: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['user','access','flow','inter'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ssl_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog4 = "'+checked+'"');
                }
            }

            var ar_list = ["SSLVPN"];
            var ar = ['ssl'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ssl_syslogBeforeRender3: function(component, eOpts) {
        component.title = __zen('syslog')+'(4)';
    },

    onLog_ssl_syslogRender4: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['user','access','flow','inter'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ssl_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog5 = "'+checked+'"');
                }
            }

            var ar_list = ["SSLVPN"];
            var ar = ['ssl'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ssl_syslogBeforeRender4: function(component, eOpts) {
        component.title = __zen('syslog')+'(5)';
    },

    onLog_ssl_logRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['user','access','flow','inter'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ssl_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].smc_log = "'+checked+'"');
                }
            }

            var ar_list = ["SSLVPN"];
            var ar = ['ssl'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ssl_logBeforeRender: function(component, eOpts) {
        component.title = __zen('we_logserver');
    },

    onCom_ipsChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        var r_list = me.r_list;

        if(newValue){
            var ar = ['detect','scan','spoofing','pre'];

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ips_"+ar[i]).getStore();
                for(var l=0; l<store.data.length; l++){
                    var event = store.data.items[l].data.event;
                    eval('r_list[event].create = r_list[event].create'+newValue+';');
                    r_list[event].send_mail = 'off';
                    eval('r_list[event].system = r_list[event].system'+newValue+';');
                    r_list[event].syslog = 'off';
                    r_list[event].smc_log = 'off';
                }
            }

            me.r_list = r_list;
            me.re_detail(['IPS'],['ips']);
        }
    },

    onLog_ips_hddRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['detect','scan','spoofing','pre'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ips_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].create = "'+checked+'"');
                }
            }

            var ar_list = ["IPS"];
            var ar = ['ips'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ips_hddBeforeRender: function(component, eOpts) {
        component.title = __zen('log_set');
    },

    onLog_ips_mailRender: function(component, eOpts) {
        /*component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['detect','scan','spoofing','pre'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ips_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].send_mail = "'+checked+'"');
                }
            }

            me.re_detail();
        }, component);*/
    },

    onLog_ips_mailBeforeRender: function(component, eOpts) {
        component.title = __zen('send_mail');
    },

    onLog_ips_sysRender: function(component, eOpts) {
        /*component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['detect','scan','spoofing','pre'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ips_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].system = "'+checked+'"');
                }
            }

            me.re_detail();
        }, component);*/
    },

    onLog_ips_sysBeforeRender: function(component, eOpts) {
        component.title = __zen('system_alarm');
    },

    onLog_ips_syslogRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['detect','scan','spoofing','pre'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ips_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog1 = "'+checked+'"');
                }
            }

            var ar_list = ["IPS"];
            var ar = ['ips'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ips_syslogBeforeRender: function(component, eOpts) {
        component.title = __zen('syslog')+'(1)';
    },

    onLog_ips_syslogRender1: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['detect','scan','spoofing','pre'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ips_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog2 = "'+checked+'"');
                }
            }

            var ar_list = ["IPS"];
            var ar = ['ips'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ips_syslogBeforeRender1: function(component, eOpts) {
        component.title = __zen('syslog')+'(2)';
    },

    onLog_ips_syslogRender2: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['detect','scan','spoofing','pre'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ips_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog3 = "'+checked+'"');
                }
            }

            var ar_list = ["IPS"];
            var ar = ['ips'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ips_syslogBeforeRender2: function(component, eOpts) {
        component.title = __zen('syslog')+'(3)';
    },

    onLog_ips_syslogRender3: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['detect','scan','spoofing','pre'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ips_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog4 = "'+checked+'"');
                }
            }

            var ar_list = ["IPS"];
            var ar = ['ips'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ips_syslogBeforeRender3: function(component, eOpts) {
        component.title = __zen('syslog')+'(4)';
    },

    onLog_ips_syslogRender4: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['detect','scan','spoofing','pre'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ips_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog5 = "'+checked+'"');
                }
            }

            var ar_list = ["IPS"];
            var ar = ['ips'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ips_syslogBeforeRender4: function(component, eOpts) {
        component.title = __zen('syslog')+'(5)';
    },

    onLog_ips_logRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['detect','scan','spoofing','pre'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ips_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].smc_log = "'+checked+'"');
                }
            }

            var ar_list = ["IPS"];
            var ar = ['ips'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ips_logBeforeRender: function(component, eOpts) {
        component.title = __zen('we_logserver');
    },

    onCom_ddosChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        var r_list = me.r_list;

        if(newValue){
            var ar = ['dos','dns','ddos','sql','http'];

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ddos_"+ar[i]).getStore();
                for(var l=0; l<store.data.length; l++){
                    var event = store.data.items[l].data.event;
                    eval('r_list[event].create = r_list[event].create'+newValue+';');
                    r_list[event].send_mail = 'off';
                    eval('r_list[event].system = r_list[event].system'+newValue+';');
                    r_list[event].syslog = 'off';
                    r_list[event].smc_log = 'off';
                }
            }

            me.r_list = r_list;
            me.re_detail(['DDoS'],['ddos']);
        }
    },

    onLog_ddos_hddRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['dos','ddos','http','dns','sql'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ddos_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].create = "'+checked+'"');
                }
            }

            var ar_list = ["DDoS"];
            var ar = ['ddos'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ddos_hddBeforeRender: function(component, eOpts) {
        component.title = __zen('log_set');
    },

    onLog_ddos_mailRender: function(component, eOpts) {
        /*component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['dos','ddos','http','dns','sql'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ddos_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].send_mail = "'+checked+'"');
                }
            }

            me.re_detail();
        }, component);*/
    },

    onLog_ddos_mailBeforeRender: function(component, eOpts) {
        component.title = __zen('send_mail');
    },

    onLog_ddos_sysRender: function(component, eOpts) {
        /*component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['dos','ddos','http','dns','sql'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ddos_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].system = "'+checked+'"');
                }
            }

            me.re_detail();
        }, component);*/
    },

    onLog_ddos_sysBeforeRender: function(component, eOpts) {
        component.title = __zen('system_alarm');
    },

    onLog_ddos_syslogRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['dos','ddos','http','dns','sql'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ddos_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog1 = "'+checked+'"');
                }
            }

            var ar_list = ["DDoS"];
            var ar = ['ddos'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ddos_syslogBeforeRender: function(component, eOpts) {
        component.title = __zen('syslog')+'(1)';
    },

    onLog_ddos_syslogRender1: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['dos','ddos','http','dns','sql'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ddos_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog2 = "'+checked+'"');
                }
            }

            var ar_list = ["DDoS"];
            var ar = ['ddos'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ddos_syslogBeforeRender1: function(component, eOpts) {
        component.title = __zen('syslog')+'(2)';
    },

    onLog_ddos_syslogRender2: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['dos','ddos','http','dns','sql'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ddos_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog3 = "'+checked+'"');
                }
            }

            var ar_list = ["DDoS"];
            var ar = ['ddos'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ddos_syslogBeforeRender2: function(component, eOpts) {
        component.title = __zen('syslog')+'(3)';
    },

    onLog_ddos_syslogRender3: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['dos','ddos','http','dns','sql'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ddos_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog4 = "'+checked+'"');
                }
            }

            var ar_list = ["DDoS"];
            var ar = ['ddos'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ddos_syslogBeforeRender3: function(component, eOpts) {
        component.title = __zen('syslog')+'(4)';
    },

    onLog_ddos_syslogRender4: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['dos','ddos','http','dns','sql'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ddos_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog5 = "'+checked+'"');
                }
            }

            var ar_list = ["DDoS"];
            var ar = ['ddos'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ddos_syslogBeforeRender4: function(component, eOpts) {
        component.title = __zen('syslog')+'(5)';
    },

    onLog_ddos_logRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['dos','ddos','http','dns','sql'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ddos_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].smc_log = "'+checked+'"');
                }
            }

            var ar_list = ["DDoS"];
            var ar = ['ddos'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ddos_logBeforeRender: function(component, eOpts) {
        component.title = __zen('we_logserver');
    },

    onCom_avChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        var r_list = me.r_list;

        if(newValue){
            var ar = ['av'];

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_av_"+ar[i]).getStore();
                for(var l=0; l<store.data.length; l++){
                    var event = store.data.items[l].data.event;
                    eval('r_list[event].create = r_list[event].create'+newValue+';');
                    r_list[event].send_mail = 'off';
                    eval('r_list[event].system = r_list[event].system'+newValue+';');
                    r_list[event].syslog = 'off';
                    r_list[event].smc_log = 'off';
                }
            }

            me.r_list = r_list;
            me.re_detail(['안티바이러스'],['av']);
        }
    },

    onLog_av_hddRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['av'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_av_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].create = "'+checked+'"');
                }
            }

            var ar_list = ["안티바이러스"];
            var ar = ['av'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_av_hddBeforeRender: function(component, eOpts) {
        component.title = __zen('log_set');
    },

    onLog_av_mailRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['av'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_av_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].send_mail = "'+checked+'"');
                }
            }

            var ar_list = ["안티바이러스"];
            var ar = ['av'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_av_mailBeforeRender: function(component, eOpts) {
        component.title = __zen('send_mail');
    },

    onLog_av_sysRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['av'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_av_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].system = "'+checked+'"');
                }
            }

            var ar_list = ["안티바이러스"];
            var ar = ['av'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_av_sysBeforeRender: function(component, eOpts) {
        component.title = __zen('system_alarm');
    },

    onLog_av_syslogRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['av'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_av_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog1 = "'+checked+'"');
                }
            }

            var ar_list = ["안티바이러스"];
            var ar = ['av'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_av_syslogBeforeRender: function(component, eOpts) {
        component.title = __zen('syslog')+'(1)';
    },

    onLog_av_syslogRender1: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['av'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_av_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog2 = "'+checked+'"');
                }
            }

            var ar_list = ["안티바이러스"];
            var ar = ['av'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_av_syslogBeforeRender1: function(component, eOpts) {
        component.title = __zen('syslog')+'(2)';
    },

    onLog_av_syslogRender2: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['av'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_av_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog3 = "'+checked+'"');
                }
            }

            var ar_list = ["안티바이러스"];
            var ar = ['av'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_av_syslogBeforeRender2: function(component, eOpts) {
        component.title = __zen('syslog')+'(3)';
    },

    onLog_av_syslogRender3: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['av'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_av_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog4 = "'+checked+'"');
                }
            }

            var ar_list = ["안티바이러스"];
            var ar = ['av'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_av_syslogBeforeRender3: function(component, eOpts) {
        component.title = __zen('syslog')+'(4)';
    },

    onLog_av_syslogRender4: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['av'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_av_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog5 = "'+checked+'"');
                }
            }

            var ar_list = ["안티바이러스"];
            var ar = ['av'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_av_syslogBeforeRender4: function(component, eOpts) {
        component.title = __zen('syslog')+'(5)';
    },

    onLog_av_logRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['av'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_av_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].smc_log = "'+checked+'"');
                }
            }

            var ar_list = ["안티바이러스"];
            var ar = ['av'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_av_logBeforeRender: function(component, eOpts) {
        component.title = __zen('we_logserver');
    },

    onCom_asChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        var r_list = me.r_list;

        if(newValue){
            var ar = ['as'];

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_as_"+ar[i]).getStore();
                for(var l=0; l<store.data.length; l++){
                    var event = store.data.items[l].data.event;
                    eval('r_list[event].create = r_list[event].create'+newValue+';');
                    r_list[event].send_mail = 'off';
                    eval('r_list[event].system = r_list[event].system'+newValue+';');
                    r_list[event].syslog = 'off';
                    r_list[event].smc_log = 'off';
                }
            }

            me.r_list = r_list;
            me.re_detail(['안티스팸'],['as']);
        }
    },

    onLog_as_hddRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['as'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_as_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].create = "'+checked+'"');
                }
            }

            var ar_list = ["안티스팸"];
            var ar = ['as'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_as_hddBeforeRender: function(component, eOpts) {
        component.title = __zen('log_set');
    },

    onLog_as_mailRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['as'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_as_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].send_mail = "'+checked+'"');
                }
            }

            var ar_list = ["안티스팸"];
            var ar = ['as'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_as_mailBeforeRender: function(component, eOpts) {
        component.title = __zen('send_mail');
    },

    onLog_as_sysRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['as'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_as_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].system = "'+checked+'"');
                }
            }

            var ar_list = ["안티스팸"];
            var ar = ['as'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_as_sysBeforeRender: function(component, eOpts) {
        component.title = __zen('system_alarm');
    },

    onLog_as_syslogRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['as'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_as_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog1 = "'+checked+'"');
                }
            }

            var ar_list = ["안티스팸"];
            var ar = ['as'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_as_syslogBeforeRender: function(component, eOpts) {
        component.title = __zen('syslog')+'(1)';
    },

    onLog_as_syslogRender1: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['as'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_as_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog2 = "'+checked+'"');
                }
            }

            var ar_list = ["안티스팸"];
            var ar = ['as'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_as_syslogBeforeRender1: function(component, eOpts) {
        component.title = __zen('syslog')+'(2)';
    },

    onLog_as_syslogRender2: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['as'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_as_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog3 = "'+checked+'"');
                }
            }

            var ar_list = ["안티스팸"];
            var ar = ['as'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_as_syslogBeforeRender2: function(component, eOpts) {
        component.title = __zen('syslog')+'(3)';
    },

    onLog_as_syslogRender3: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['as'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_as_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog4 = "'+checked+'"');
                }
            }

            var ar_list = ["안티스팸"];
            var ar = ['as'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_as_syslogBeforeRender3: function(component, eOpts) {
        component.title = __zen('syslog')+'(4)';
    },

    onLog_as_syslogRender4: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['as'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_as_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].syslog5 = "'+checked+'"');
                }
            }

            var ar_list = ["안티스팸"];
            var ar = ['as'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_as_syslogBeforeRender4: function(component, eOpts) {
        component.title = __zen('syslog')+'(5)';
    },

    onLog_as_logRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['as'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_as_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.event+'"].smc_log = "'+checked+'"');
                }
            }

            var ar_list = ["안티스팸"];
            var ar = ['as'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_as_logBeforeRender: function(component, eOpts) {
        component.title = __zen('we_logserver');
    },

    onNFW2_log_config_logDetailAfterRender: function(component, eOpts) {
        var me = this;
        Ext.suspendLayouts();

        var ar = ['sys','network','fw','vpn','ssl','ips','ddos','av','as'];
        var ar_sys = ['sys','admin','send','daemon','backup','update','log','radius','set','cert','center','ha','llcf'];
        var ar_network = ['inter','multi','l2','checker','vrrp','ipm'];
        var ar_fw = ['policy','web','app','white','nat','user'];
        var ar_vpn = ['ike','ipsec'];
        var ar_ssl = ['user','access','flow','inter'];
        var ar_ips = ['detect','scan','spoofing','pre'];
        var ar_ddos = ['dos','ddos','http','dns','sql'];
        var ar_av = ['av'];
        var ar_as = ['as'];

        for(var i=0; i<ar.length; i++){
            eval('var arr = ar_'+ar[i]+';');

            for(var l=0; l<arr.length; l++){
                eval("var record = Ext.create('Ext.data.Store',{data: [],fields: ['name','category','event','create','send_mail','syslog','system','smc_log','_id']});");
                eval('Ext.getCmp("grid_'+ar[i]+'_'+arr[l]+'").bindStore(record);');
            }
        }

        var record = Ext.create('Ext.data.Store',{
            data: [{
                'name':__zen('log_create_low'),
                'val':'low'
            },{
                'name':__zen('log_create_mid'),
                'val':'mid'
            },{
                'name':__zen('log_create_high'),
                'val':'high'
            }],
            fields: ['name','val','category']
        });
        Ext.getCmp("com_system").bindStore(record);
        Ext.getCmp("com_network").bindStore(record);
        Ext.getCmp("com_fw").bindStore(record);
        Ext.getCmp("com_vpn").bindStore(record);
        Ext.getCmp("com_ssl").bindStore(record);
        Ext.getCmp("com_ips").bindStore(record);
        Ext.getCmp("com_ddos").bindStore(record);
        Ext.getCmp("com_av").bindStore(record);
        Ext.getCmp("com_as").bindStore(record);

        var _params = {
            basename : Ext.encode('log_detail_setting'),
            limit: Ext.encode(0)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObjects',
            _params,
            function(response){

                hideLoadMask();
                if(response){

                    if(response.total === 0){ return false; }

                    var r_list = {};
                    var _prev = '';
                    for(var i in response.list){
                        if(response.list[i].category.length !== 4){ _prev = 'on'; break; }
                        r_list[response.list[i].event] = response.list[i];

                    }

                    if(_prev === 'on'){
                        return false;
                    }

                    Ext.getCmp('NFW2_log_config_logDetail').r_list = r_list;

                    me.data = response;
                    var ar_list = ["시스템","네트워크","방화벽","IPSecVPN","SSLVPN","IPS","DDoS","안티바이러스","안티스팸"];
                    var ar = ['sys','network','fw','vpn','ssl','ips','ddos','av','as'];
                    me.re_detail(ar_list,ar);
                }
            }
        );

        Ext.resumeLayouts(true);
    },

    onButtonClick: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_log_config_logDetail');

        var r_list = me.r_list;

        var list = [];
        for(var i in r_list){
            list.push({
                _id: r_list[i]._id,
                category: r_list[i].category,
                createmid: r_list[i].createmid,
                createlow: r_list[i].createlow,
                subcategory: r_list[i].subcategory,
                systemlow: r_list[i].systemlow,
                syslog1: r_list[i].syslog1,
                syslog2: r_list[i].syslog2,
                syslog3: r_list[i].syslog3,
                syslog4: r_list[i].syslog4,
                syslog5: r_list[i].syslog5,
                event: r_list[i].event,
                create: r_list[i].create,
                createhigh: r_list[i].createhigh,
                send_mail: r_list[i].send_mail,
                system: r_list[i].system,
                systemhigh: r_list[i].systemhigh,
                smc_log: r_list[i].smc_log,
                subclassfication: r_list[i].subclassfication,
                systemmid: r_list[i].systemmid,
                define: r_list[i].define
            });
        }

        if(list){
            var _params = {
                basename : Ext.encode('log_detail_setting'),
                obj_list : Ext.encode(list)
            };

            request_helper.xmlrpc_call_Ajax_Post(
                'ftuctrl',
                'setObjects',
                _params,
                function(response){

                    if(response){
                        Ext.Msg.show({
                            title: __weguardia,
                            msg: get_msg('msg_ok_add'),
                            width: 300,
                            buttons: Ext.Msg.OK,
                            icon: Ext.window.MessageBox.INFO
                        });
                    }
                }
            );
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        this.onNFW2_log_config_logDetailAfterRender();
    },

    chk_detail: function(t, depth, define, type) {
        var me =Ext.getCmp('NFW2_log_config_logDetail');
        Ext.suspendLayouts();
        var r_list = me.r_list;

        var chk = t.checked;

        if(depth && depth.indexOf('dep')!==-1){
            var ar = define.split(",");
            var _dep = depth.split("_");
            for(var a in ar){
                if(_dep[1] === "hdd" || _dep[1] === "all"){ r_list[ar[a]].create = (chk===true)?'on':'off'; }
                if(_dep[1] === "mail" || _dep[1] === "all"){ r_list[ar[a]].send_mail = (chk===true)?'on':'off'; }
                if(_dep[1] === "sys" || _dep[1] === "all"){ r_list[ar[a]].system = (chk===true)?'on':'off'; }
                if(_dep[1] === "syslog1" || _dep[1] === "all"){ r_list[ar[a]].syslog1 = (chk===true)?'on':'off'; }
                if(_dep[1] === "syslog2" || _dep[1] === "all"){ r_list[ar[a]].syslog2 = (chk===true)?'on':'off'; }
                if(_dep[1] === "syslog3" || _dep[1] === "all"){ r_list[ar[a]].syslog3 = (chk===true)?'on':'off'; }
                if(_dep[1] === "syslog4" || _dep[1] === "all"){ r_list[ar[a]].syslog4 = (chk===true)?'on':'off'; }
                if(_dep[1] === "syslog5" || _dep[1] === "all"){ r_list[ar[a]].syslog5 = (chk===true)?'on':'off'; }
                if(_dep[1] === "log" || _dep[1] === "all"){ r_list[ar[a]].smc_log = (chk===true)?'on':'off'; }
            }
        }else{
            var _id = t.id.split("_");
            var _event = _id[1];

            if(_id[0] === 'cc'){
                if(_event){
                    r_list[define].create = (chk===true)?'on':'off';
                    r_list[define].send_mail = (chk===true)?'on':'off';
                    r_list[define].system = (chk===true)?'on':'off';
                    r_list[define].syslog = (chk===true)?'on':'off';
                    r_list[define].smc_log = (chk===true)?'on':'off';
                }
            }else if(_id[0] === 'hdd'){
                r_list[define].create = (chk===true)?'on':'off';
            }else if(_id[0] === 'mail'){
                r_list[define].send_mail = (chk===true)?'on':'off';
            }else if(_id[0] === 'sys'){
                r_list[define].system = (chk===true)?'on':'off';
            }else if(_id[0] === 'syslog1'){
                r_list[define].syslog1 = (chk===true)?'on':'off';
            }else if(_id[0] === 'syslog2'){
                r_list[define].syslog2 = (chk===true)?'on':'off';
            }else if(_id[0] === 'syslog3'){
                r_list[define].syslog3 = (chk===true)?'on':'off';
            }else if(_id[0] === 'syslog4'){
                r_list[define].syslog4 = (chk===true)?'on':'off';
            }else if(_id[0] === 'syslog5'){
                r_list[define].syslog5 = (chk===true)?'on':'off';
            }else if(_id[0] === 'log'){
                r_list[define].smc_log = (chk===true)?'on':'off';
            }
        }

        var ar_list = ["시스템","네트워크","방화벽","IPSecVPN","SSLVPN","IPS","DDoS","안티바이러스","안티스팸"];
        var ar = ['sys','network','fw','vpn','ssl','ips','ddos','av','as'];

        var _ar = [type];
        for(var i=0; i<ar.length; i++){
            if(ar[i] === type){
                var _ar_list = [ar_list[i]];
            }
        }

        me.re_detail(_ar_list,_ar);
        Ext.resumeLayouts(true);
    },

    chk_title: function(grid, dataIndex) {
        if(dataIndex === "name"){ return false; }
        Ext.suspendLayouts();

        var ar_list = ["시스템","네트워크","방화벽","IPSecVPN","SSLVPN","IPS","DDoS","안티바이러스","안티스팸"];
        var ar = ['sys','network','fw','vpn','ssl','ips','ddos','av','as'];

        var me = Ext.getCmp("NFW2_log_config_logDetail");
        var r_list = me.r_list;
        var store = Ext.getCmp(grid).getStore().data;
        var grid = grid.split("_");

        var _ar = [grid[1]];
        for(var i=0; i<ar.length; i++){
            if(ar[i] === grid[1]){
                var _ar_list = [ar_list[i]];
            }
        }

        if(dataIndex === "create"){
            var chk = document.getElementById("chk_hdd_"+grid[1]+"_"+grid[2]);
            var checked = (chk.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<store.items.length; i++){
                eval('r_list["'+store.items[i].data.event+'"].create = "'+checked+'";');
            }
        }else if(dataIndex === "send_mail"){
            if(grid[1] === "sys" || grid[1] === "network" || grid[1] === "av" || grid[1] === "as"){
                var chk = document.getElementById("chk_mail_"+grid[1]+"_"+grid[2]);
                var checked = (chk.className.indexOf("off") !== -1)?"on":"off";

                for(var i=0; i<store.items.length; i++){
                    eval('r_list["'+store.items[i].data.event+'"].send_mail = "'+checked+'";');
                }
            }
        }else if(dataIndex === "system"){
            if(grid[1] === "sys" || grid[1] === "network" || grid[1] === "av" || grid[1] === "as"){
                var chk = document.getElementById("chk_sys_"+grid[1]+"_"+grid[2]);
                var checked = (chk.className.indexOf("off") !== -1)?"on":"off";

                for(var i=0; i<store.items.length; i++){
                    eval('r_list["'+store.items[i].data.event+'"].system = "'+checked+'";');
                }
            }
        }else if(dataIndex === "syslog1"){
            var chk = document.getElementById("chk_syslog1_"+grid[1]+"_"+grid[2]);
            var checked = (chk.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<store.items.length; i++){
                eval('r_list["'+store.items[i].data.event+'"].syslog1 = "'+checked+'";');
            }
        }else if(dataIndex === "syslog2"){
            var chk = document.getElementById("chk_syslog2_"+grid[1]+"_"+grid[2]);
            var checked = (chk.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<store.items.length; i++){
                eval('r_list["'+store.items[i].data.event+'"].syslog2 = "'+checked+'";');
            }
        }else if(dataIndex === "syslog3"){
            var chk = document.getElementById("chk_syslog3_"+grid[1]+"_"+grid[2]);
            var checked = (chk.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<store.items.length; i++){
                eval('r_list["'+store.items[i].data.event+'"].syslog3 = "'+checked+'";');
            }
        }else if(dataIndex === "syslog4"){
            var chk = document.getElementById("chk_syslog4_"+grid[1]+"_"+grid[2]);
            var checked = (chk.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<store.items.length; i++){
                eval('r_list["'+store.items[i].data.event+'"].syslog4 = "'+checked+'";');
            }
        }else if(dataIndex === "syslog5"){
            var chk = document.getElementById("chk_syslog5_"+grid[1]+"_"+grid[2]);
            var checked = (chk.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<store.items.length; i++){
                eval('r_list["'+store.items[i].data.event+'"].syslog5 = "'+checked+'";');
            }
        }else if(dataIndex === "smc_log"){
            var chk = document.getElementById("chk_log_"+grid[1]+"_"+grid[2]);
            var checked = (chk.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<store.items.length; i++){
                eval('r_list["'+store.items[i].data.event+'"].smc_log = "'+checked+'";');
            }
        }

        me.re_detail(_ar_list,_ar);
        Ext.resumeLayouts(true);
    },

    re_detail: function(ar_list, ar) {
        var me =Ext.getCmp('NFW2_log_config_logDetail');
        var r_list = me.r_list;

        Ext.suspendLayouts();

        var children = [];

        var ar_sys_list = ['시스템','관리자','정책 전송','데몬 관리','백업/복원','업데이트','로그','외부서버','설정','인증서','센터관리','HA','LLCF'];
        var ar_sys = ['sys','admin','send','daemon','backup','update','log','radius','set','cert','center','ha','llcf'];
        var ar_network_list = ["인터페이스","Multipath","L2TP","Checker","VRRP","IPM"];
        var ar_network = ['inter','multi','l2','checker','vrrp','ipm'];
        var ar_fw_list = ["보안 정책","웹 필터링","애플리케이션","화이트/블랙 리스트","NAT64","사용자"];
        var ar_fw = ['policy','web','app','white','nat','user'];
        var ar_vpn_list = ["IKE","IPSec"];
        var ar_vpn = ['ike','ipsec'];
        var ar_ssl_list = ["사용자 인증","액세스","트래픽","무결성 검사"];
        var ar_ssl = ['user','access','flow','inter'];
        var ar_ips_list = ["IPS","Portscan","IP Spoofing","Preprocessor"];
        var ar_ips = ['detect','scan','spoofing','pre'];
        var ar_ddos_list = ["DoS","DDoS","HTTP","DNS","SQL"];
        var ar_ddos = ['dos','ddos','http','dns','sql'];
        var ar_av_list = ["안티바이러스"];
        var ar_av = ['av'];
        var ar_as_list = ["안티스팸"];
        var ar_as = ['as'];

        for(var i=0; i<ar.length; i++){
            eval('var _arl = ar_'+ar[i]+';');
            for(var l=0; l<_arl.length; l++){
                eval('var _ar_'+ar[i]+'_'+_arl[l]+' = [];');
            }
        }

        for(var i in r_list){
            for(var l=0; l<ar_list.length; l++){
                if(r_list[i].category[0].trim() === ar_list[l]){

                    eval('var _ar = ar_'+ar[l]+'_list;');

                    for(var j=0; j<_ar.length; j++){
                        if(r_list[i].subcategory[0].trim() === _ar[j]){
                            eval('var _ar_sub = ar_'+ar[l]+';');
                            eval('_ar_'+ar[l]+'_'+_ar_sub[j]+'.push(r_list[i]);');
                        }
                    }
                }
            }
        }

        for(var i=0; i<ar.length; i++){
            eval('var _arl = ar_'+ar[i]+';');
            for(var l=0; l<_arl.length; l++){
                eval('var record =  _ar_'+ar[i]+'_'+_arl[l]+';');
                if(record.length === 0){ continue; }
                var _dis = (ar[i]==='fw'||ar[i]==='vpn'||ar[i]==='ssl'||ar[i]==='ips'||ar[i]==='ddos')?'disabled':'';
                var _grid = 'grid_'+ar[i]+'_'+_arl[l];

                var _subcategory = record[0].subcategory;
                _sub = (__zen_locale==='ko')?_subcategory[0]:(__zen_locale==='en')?_subcategory[1]:(__zen_locale==='jp')?_subcategory[2]:'';
                var list = '<table cellspacing="0" cellpadding="3" style="height:30px;width:100%"><tr>'+
                    '<td class="x-column-header" style="position:static">'+_sub+'</td>'+
                    '<td width="8%" class="x-column-header" style="position:static"><button id="chk_hdd_'+ar[i]+'_'+_arl[l]+'" class="log_hdd_off" title="'+__zen('log_set')+'" style="border:none" onclick="chk_title(\''+_grid+'\',\'create\')">&nbsp;</button> '+__zen('log_set')+'</td>'+
                    '<td width="8%" class="x-column-header" style="position:static"><button id="chk_mail_'+ar[i]+'_'+_arl[l]+'" class="log_mail_off" title="'+__zen('send_mail')+'" style="border:none" onclick="chk_title(\''+_grid+'\',\'send_mail\')">&nbsp;</button> '+__zen('send_mail')+'</td>'+
                    '<td width="9%" class="x-column-header" style="position:static"><button id="chk_sys_'+ar[i]+'_'+_arl[l]+'" class="log_sys_off" title="'+__zen('system_alarm')+'" style="border:none" onclick="chk_title(\''+_grid+'\',\'system\')">&nbsp;</button> System Notice</td>'+
                    '<td width="8%" class="x-column-header" style="position:static"><button id="chk_syslog1_'+ar[i]+'_'+_arl[l]+'" class="log_syslog1_off" title="'+__zen('syslog')+'(1)" style="border:none" onclick="chk_title(\''+_grid+'\',\'syslog1\')">&nbsp;</button> SYSLOG(1)</td>'+
                    '<td width="8%" class="x-column-header" style="position:static"><button id="chk_syslog2_'+ar[i]+'_'+_arl[l]+'" class="log_syslog2_off" title="'+__zen('syslog')+'(2)" style="border:none" onclick="chk_title(\''+_grid+'\',\'syslog2\')">&nbsp;</button> SYSLOG(2)</td>'+
                    '<td width="8%" class="x-column-header" style="position:static"><button id="chk_syslog3_'+ar[i]+'_'+_arl[l]+'" class="log_syslog3_off" title="'+__zen('syslog')+'(3)" style="border:none" onclick="chk_title(\''+_grid+'\',\'syslog3\')">&nbsp;</button> SYSLOG(3)</td>'+
                    '<td width="8%" class="x-column-header" style="position:static"><button id="chk_syslog4_'+ar[i]+'_'+_arl[l]+'" class="log_syslog4_off" title="'+__zen('syslog')+'(4)" style="border:none" onclick="chk_title(\''+_grid+'\',\'syslog4\')">&nbsp;</button> SYSLOG(4)</td>'+
                    '<td width="8%" class="x-column-header" style="position:static"><button id="chk_syslog5_'+ar[i]+'_'+_arl[l]+'" class="log_syslog5_off" title="'+__zen('syslog')+'(5)" style="border:none" onclick="chk_title(\''+_grid+'\',\'syslog5\')">&nbsp;</button> SYSLOG(5)</td>'+
                    '<td width="13%" class="x-column-header" style="position:static"><button id="chk_log_'+ar[i]+'_'+_arl[l]+'" class="log_log_off" title="'+__zen('we_logserver')+'" style="border:none" onclick="chk_title(\''+_grid+'\',\'smc_log\')">&nbsp;</button> '+__zen('we_logserver')+'</td></tr>';
                for(var j=0; j<record.length; j++){
                    var _create = (record[j].create==='on')?"checked":"";
                    var _mail = (record[j].send_mail==='on')?"checked":"";
                    var _system = (record[j].system==='on')?"checked":"";
                    var _syslog1 = (record[j].syslog1==='on')?"checked":"";
                    var _syslog2 = (record[j].syslog2==='on')?"checked":"";
                    var _syslog3 = (record[j].syslog3==='on')?"checked":"";
                    var _syslog4 = (record[j].syslog4==='on')?"checked":"";
                    var _syslog5 = (record[j].syslog5==='on')?"checked":"";
                    var _smc_log = (record[j].smc_log==='on')?"checked":"";
                    var _subclassfication = record[j].subclassfication;
                    var _subclass = (__zen_locale==='ko')?_subclassfication[0]:(__zen_locale==='en')?_subclassfication[1]:(__zen_locale==='jp')?_subclassfication[2]:'';

                    list += '<tr><td class="x-grid-item" style="border-bottom:1px solid #ededed;white-space:pre-line">'+_subclass+'</td>';
                    list += '<td align="center" style="border-bottom:1px solid #ededed"><input type="checkbox" id="hdd_'+record[j].event+'" '+_create+' onclick="chk_log_detail(this,null,\''+record[j].event+'\',\''+ar[i]+'\')" /></td>';
                    list += '<td align="center" style="border-bottom:1px solid #ededed"><input type="checkbox" id="mail_'+record[j].event+'" '+_mail+' '+_dis+' onclick="chk_log_detail(this,null,\''+record[j].event+'\',\''+ar[i]+'\')" /></td>';
                    list += '<td align="center" style="border-bottom:1px solid #ededed"><input type="checkbox" id="sys_'+record[j].event+'" '+_system+' '+_dis+' onclick="chk_log_detail(this,null,\''+record[j].event+'\',\''+ar[i]+'\')" /></td>';
                    list += '<td align="center" style="border-bottom:1px solid #ededed"><input type="checkbox" id="syslog1_'+record[j].event+'" '+_syslog1+' onclick="chk_log_detail(this,null,\''+record[j].event+'\',\''+ar[i]+'\')" /></td>';
                    list += '<td align="center" style="border-bottom:1px solid #ededed"><input type="checkbox" id="syslog2_'+record[j].event+'" '+_syslog2+' onclick="chk_log_detail(this,null,\''+record[j].event+'\',\''+ar[i]+'\')" /></td>';
                    list += '<td align="center" style="border-bottom:1px solid #ededed"><input type="checkbox" id="syslog3_'+record[j].event+'" '+_syslog3+' onclick="chk_log_detail(this,null,\''+record[j].event+'\',\''+ar[i]+'\')" /></td>';
                    list += '<td align="center" style="border-bottom:1px solid #ededed"><input type="checkbox" id="syslog4_'+record[j].event+'" '+_syslog4+' onclick="chk_log_detail(this,null,\''+record[j].event+'\',\''+ar[i]+'\')" /></td>';
                    list += '<td align="center" style="border-bottom:1px solid #ededed"><input type="checkbox" id="syslog5_'+record[j].event+'" '+_syslog5+' onclick="chk_log_detail(this,null,\''+record[j].event+'\',\''+ar[i]+'\')" /></td>';
                    list += '<td align="center" style="border-bottom:1px solid #ededed"><input type="checkbox" id="log_'+record[j].event+'" '+_smc_log+' onclick="chk_log_detail(this,null,\''+record[j].event+'\',\''+ar[i]+'\')" /></td></tr>';
                }
                list +='</table>';
                Ext.getCmp("con_"+ar[i]+'_'+_arl[l]).update(list);

            }
        }

        for(var i=0; i<ar.length; i++){
            eval('var _arl = ar_'+ar[i]+';');
            for(var l=0; l<_arl.length; l++){
                eval('var record =  _ar_'+ar[i]+'_'+_arl[l]+';');
                eval('Ext.getCmp("grid_'+ar[i]+'_'+_arl[l]+'").getStore().loadData(record);');
            }
        }

        for(var i=0; i<ar.length; i++){
            var l_hdd = 0, l_mail = 0, l_sys = 0, l_syslog1 = 0, l_syslog2 = 0, l_syslog3 = 0, l_syslog4 = 0, l_syslog5 = 0, l_log = 0, l_len = 0;
            eval("var arr = ar_"+ar[i]+";");
            for(var l=0; l<arr.length; l++){
                eval('var record = Ext.getCmp("grid_'+ar[i]+'_'+arr[l]+'").getStore().data;');
                var k_hdd = 0, k_mail = 0, k_sys = 0, k_syslog1 = 0, k_syslog2 = 0, k_syslog3 = 0, k_syslog4 = 0, k_syslog5 = 0, k_log = 0;
                for(var k=0; k<record.items.length; k++){
                    var data = record.items[k].data;
                    if(data.create === "on"){ k_hdd++; l_hdd++; }
                    if(data.send_mail === "on"){ k_mail++; l_mail++; }
                    if(data.system === "on"){ k_sys++; l_sys++; }
                    if(data.syslog1 === "on"){ k_syslog1++; l_syslog1++; }
                    if(data.syslog2 === "on"){ k_syslog2++; l_syslog2++; }
                    if(data.syslog3 === "on"){ k_syslog3++; l_syslog3++; }
                    if(data.syslog4 === "on"){ k_syslog4++; l_syslog4++; }
                    if(data.syslog5 === "on"){ k_syslog5++; l_syslog5++; }
                    if(data.smc_log === "on"){ k_log++; l_log++; }
                }
                l_len += record.items.length;

                var chk_hdd = (k_hdd===record.items.length)?"log_hdd_on":"log_hdd_off";
                eval('document.getElementById("chk_hdd_'+ar[i]+'_'+arr[l]+'").className = "'+chk_hdd+'";');

                var chk_mail = (k_mail===record.items.length)?"log_mail_on":"log_mail_off";
                eval('document.getElementById("chk_mail_'+ar[i]+'_'+arr[l]+'").className = "'+chk_mail+'";');

                var chk_sys = (k_sys===record.items.length)?"log_sys_on":"log_sys_off";
                eval('document.getElementById("chk_sys_'+ar[i]+'_'+arr[l]+'").className = "'+chk_sys+'";');

                var chk_syslog1 = (k_syslog1===record.items.length)?"log_syslog1_on":"log_syslog1_off";
                eval('document.getElementById("chk_syslog1_'+ar[i]+'_'+arr[l]+'").className = "'+chk_syslog1+'";');

                var chk_syslog2 = (k_syslog2===record.items.length)?"log_syslog2_on":"log_syslog2_off";
                eval('document.getElementById("chk_syslog2_'+ar[i]+'_'+arr[l]+'").className = "'+chk_syslog2+'";');

                var chk_syslog3 = (k_syslog3===record.items.length)?"log_syslog3_on":"log_syslog3_off";
                eval('document.getElementById("chk_syslog3_'+ar[i]+'_'+arr[l]+'").className = "'+chk_syslog3+'";');

                var chk_syslog4 = (k_syslog4===record.items.length)?"log_syslog4_on":"log_syslog4_off";
                eval('document.getElementById("chk_syslog4_'+ar[i]+'_'+arr[l]+'").className = "'+chk_syslog4+'";');

                var chk_syslog5 = (k_syslog5===record.items.length)?"log_syslog5_on":"log_syslog5_off";
                eval('document.getElementById("chk_syslog5_'+ar[i]+'_'+arr[l]+'").className = "'+chk_syslog5+'";');

                var chk_log = (k_log===record.items.length)?"log_log_on":"log_log_off";
                eval('document.getElementById("chk_log_'+ar[i]+'_'+arr[l]+'").className = "'+chk_log+'";');

            }
            var chk_hdd = (l_hdd===l_len)?"on":"off";
            eval('document.getElementById("log_'+ar[i]+'_hdd").className = "log_hdd_'+chk_hdd+'";');

            var chk_mail = (l_mail===l_len)?"on":"off";
            eval('document.getElementById("log_'+ar[i]+'_mail").className = "log_mail_'+chk_mail+'";');

            var chk_sys = (l_sys===l_len)?"on":"off";
            eval('document.getElementById("log_'+ar[i]+'_sys").className = "log_sys_'+chk_sys+'";');

            var chk_syslog1 = (l_syslog1===l_len)?"on":"off";
            eval('document.getElementById("log_'+ar[i]+'_syslog1").className = "log_syslog1_'+chk_syslog1+'";');

            var chk_syslog2 = (l_syslog2===l_len)?"on":"off";
            eval('document.getElementById("log_'+ar[i]+'_syslog2").className = "log_syslog2_'+chk_syslog2+'";');

            var chk_syslog3 = (l_syslog3===l_len)?"on":"off";
            eval('document.getElementById("log_'+ar[i]+'_syslog3").className = "log_syslog3_'+chk_syslog3+'";');

            var chk_syslog4 = (l_syslog4===l_len)?"on":"off";
            eval('document.getElementById("log_'+ar[i]+'_syslog4").className = "log_syslog4_'+chk_syslog4+'";');

            var chk_syslog5 = (l_syslog5===l_len)?"on":"off";
            eval('document.getElementById("log_'+ar[i]+'_syslog5").className = "log_syslog5_'+chk_syslog5+'";');

            var chk_log = (l_log===l_len)?"on":"off";
            eval('document.getElementById("log_'+ar[i]+'_log").className = "log_log_'+chk_log+'";');
        }

        Ext.getCmp("NFW2_log_config_logDetail").setWidth("100%");
        Ext.resumeLayouts(true);
    }

});