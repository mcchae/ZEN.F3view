
Ext.define('NFW2.view.NFW2_monitor_firewall_applicationControl', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_firewall_applicationcontrol',

    requires: [
        'NFW2.view.NFW2_monitor_firewall_applicationControlViewModel',
        'Ext.form.Panel',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.form.Label',
        'Ext.button.Segmented',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.toolbar.Paging'
    ],

    viewModel: {
        type: 'nfw2_monitor_firewall_applicationcontrol'
    },
    cls: 'zen_body',
    id: 'monitor_app',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPanelAfterRender',
        beforedestroy: 'onMonitor_trackerDestroy'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        id: 'fm',
                        items: [
                            {
                                xtype: 'container',
                                cls: 'dv_monitor',
                                layout: {
                                    type: 'hbox',
                                    align: 'middle'
                                },
                                items: [
                                    {
                                        xtype: 'toggleslide',
                                        resizeHandle: false,
                                        state: false,
                                        cls: 'custom-color-monitor',
                                        id: 'chk_btn',
                                        listeners: {
                                            change: 'onChk_btnChange'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        set_data: function() {
                                            var me = Ext.getCmp('monitor_app');

                                            me.get_monitor_app();
                                        },
                                        cls: 'dv_timecount',
                                        html: 10,
                                        id: 'timeout',
                                        width: 55
                                    },
                                    {
                                        xtype: 'cycle',
                                        focusCls: 'btn_f',
                                        cls: 'sel_monitor',
                                        id: 'update_time',
                                        width: 80,
                                        showText: true,
                                        menu: {
                                            xtype: 'menu',
                                            width: 120,
                                            items: [
                                                me.processMyCheckItem({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange'
                                                    }
                                                }),
                                                me.processMyCheckItem1({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange1'
                                                    }
                                                }),
                                                me.processMyCheckItem2({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    checked: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange2'
                                                    }
                                                }),
                                                me.processMyCheckItem3({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange3'
                                                    }
                                                }),
                                                me.processMyCheckItem4({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange4'
                                                    }
                                                })
                                            ]
                                        }
                                    },
                                    {
                                        xtype: 'label',
                                        cls: 'lb_m_none',
                                        hidden: true,
                                        id: 'app_data_error',
                                        bind: {
                                            text: '{application_msg4}'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                margin: '10 0 0 10',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'segmentedbutton',
                                        cls: 'seg_tab',
                                        items: [
                                            {
                                                enableToggle: true,
                                                pressed: true,
                                                bind: {
                                                    text: '{application}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick5'
                                                }
                                            },
                                            {
                                                bind: {
                                                    text: '{categorys}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick4'
                                                }
                                            },
                                            {
                                                bind: {
                                                    text: '{technology}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick3'
                                                }
                                            },
                                            {
                                                bind: {
                                                    text: '{purpose}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick2'
                                                }
                                            },
                                            {
                                                bind: {
                                                    text: '{awareness}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick1'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'segmentedbutton',
                                        cls: 'seg_monitor',
                                        margin: '0 0 0 30',
                                        items: [
                                            {
                                                enableToggle: true,
                                                pressed: true,
                                                bind: {
                                                    text: '{usage}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick6'
                                                }
                                            },
                                            {
                                                bind: {
                                                    text: '{session}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick7'
                                                }
                                            },
                                            {
                                                bind: {
                                                    text: '{packet}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick8'
                                                }
                                            }
                                        ]
                                    },
                                    me.processTop_chk({
                                        xtype: 'cycle',
                                        focusCls: 'btn_f',
                                        cls: 'sel_monitor',
                                        id: 'top_chk',
                                        margin: '0 0 0 10',
                                        showText: true,
                                        menu: {
                                            xtype: 'menu',
                                            width: 120,
                                            items: [
                                                {
                                                    xtype: 'menucheckitem',
                                                    text: '100',
                                                    focusable: true,
                                                    checked: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange9'
                                                    }
                                                },
                                                {
                                                    xtype: 'menucheckitem',
                                                    text: '500',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange8'
                                                    }
                                                },
                                                {
                                                    xtype: 'menucheckitem',
                                                    text: '1000',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange7'
                                                    }
                                                },
                                                {
                                                    xtype: 'menucheckitem',
                                                    text: '3000',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange6'
                                                    }
                                                },
                                                {
                                                    xtype: 'menucheckitem',
                                                    text: '5000',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange5'
                                                    }
                                                }
                                            ]
                                        }
                                    }),
                                    {
                                        xtype: 'button',
                                        cls: 'btn_b',
                                        margin: '0 0 0 40',
                                        iconCls: 'icb_filter',
                                        bind: {
                                            text: '{filter_apply}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick10'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        cls: 'btn_b',
                                        margin: '0 0 0 10',
                                        iconCls: 'icb_filter_x',
                                        bind: {
                                            text: '{filter_reset}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick9'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                id: 'con_grid',
                                margin: '8 0 10 0',
                                items: [
                                    {
                                        xtype: 'gridpanel',
                                        id: 'grid_list',
                                        title: '',
                                        columnLines: true,
                                        store: 'store_monitor_app_list',
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if(value === 0){
                                                        return "Unknown App";
                                                    }else{
                                                        return value;
                                                    }
                                                },
                                                items: {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    id: 's_application',
                                                    margin: '16 1 1 -9',
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        
                                                    }
                                                },
                                                id: 'c_name',
                                                style: 'padding-top:13;',
                                                dataIndex: 'name',
                                                flex: 1,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{application}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                items: {
                                                    xtype: 'combobox',
                                                    flex: 1,
                                                    id: 's_category',
                                                    margin: '16 1 1 -9',
                                                    editable: false,
                                                    valueField: 'val',
                                                    queryMode: 'local',
                                                    displayField: 'val',
                                                    store: 'store_profile_category'
                                                },
                                                id: 'c_category',
                                                style: 'padding-top:13;',
                                                sortable: false,
                                                dataIndex: 'category',
                                                flex: 1,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{categorys}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                items: {
                                                    xtype: 'combobox',
                                                    flex: 1,
                                                    id: 's_technology',
                                                    margin: '16 1 1 -9',
                                                    editable: false,
                                                    valueField: 'val',
                                                    queryMode: 'local',
                                                    displayField: 'val',
                                                    store: 'store_profile_technology'
                                                },
                                                id: 'c_technology',
                                                style: 'padding-top:13;',
                                                sortable: false,
                                                dataIndex: 'technology',
                                                flex: 1,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{technology}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                items: {
                                                    xtype: 'combobox',
                                                    flex: 1,
                                                    id: 's_purpose',
                                                    margin: '16 1 1 -9',
                                                    editable: false,
                                                    valueField: 'val',
                                                    queryMode: 'local',
                                                    displayField: 'val',
                                                    store: 'store_profile_purpose'
                                                },
                                                id: 'c_purpose',
                                                style: 'padding-top:13;',
                                                sortable: false,
                                                dataIndex: 'purpose',
                                                flex: 1,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{purpose}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return '<button class="ic_star_'+value+'" />';
                                                },
                                                id: 'c_popularity',
                                                style: 'padding-bottom:29;',
                                                width: 95,
                                                align: 'center',
                                                dataIndex: 'popularity',
                                                bind: {
                                                    text: '{awareness}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var bar_g = (record.data.byte_tx_p !== 0)?'<strong class="bar_g" style="width:'+record.data.byte_tx_p+'%"></strong>':'';
                                                    var bar_b = (record.data.byte_rx_p !== 0)?'<strong class="bar_b" style="width:'+record.data.byte_rx_p+'%"></strong>':'';

                                                    return '<div>'+byteConvert(record.data.byte_tx)+' / '+byteConvert(record.data.byte_rx)+'</div><div class="graph">'+bar_g+bar_b+'</div>';
                                                },
                                                minWidth: 140,
                                                style: 'padding-bottom:29;',
                                                dataIndex: 'bytes',
                                                flex: 1,
                                                bind: {
                                                    text: '{usage} (TX/RX)'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var bar_r = (record.data.session_p !==0 )?'<strong class="bar_r" style="width:'+record.data.session_p+'%"></strong>':'';

                                                    return '<div>'+byteConvert(value)+'</div><div class="graph">'+bar_r+'</div>';
                                                },
                                                minWidth: 130,
                                                style: 'padding-bottom:29;',
                                                dataIndex: 'session',
                                                flex: 1,
                                                bind: {
                                                    text: '{session}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var bar_g = (record.data.packet_tx_p !== 0)?'<strong class="bar_g" style="width:'+record.data.packet_tx_p+'%"></strong>':'';
                                                    var bar_b = (record.data.packet_rx_p !== 0)?'<strong class="bar_b" style="width:'+record.data.packet_rx_p+'%"></strong>':'';

                                                    return '<div>'+byteConvert(record.data.packet_tx)+' / '+byteConvert(record.data.packet_rx)+'</div><div class="graph">'+bar_g+bar_b+'</div>';
                                                },
                                                minWidth: 130,
                                                style: 'padding-bottom:29;',
                                                dataIndex: 'packets',
                                                flex: 1,
                                                bind: {
                                                    text: '{packet} (TX/RX)'
                                                }
                                            }
                                        ],
                                        listeners: {
                                            cellclick: 'onGrid_listCellClick'
                                        },
                                        dockedItems: [
                                            {
                                                xtype: 'pagingtoolbar',
                                                dock: 'bottom',
                                                width: 360,
                                                displayInfo: true,
                                                store: 'store_monitor_app_list',
                                                listeners: {
                                                    beforechange: 'onPagingtoolbarBeforeChange'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processMyCheckItem: function(config) {
        config.text = '2 '+__zen('sec');

        return config;
    },

    processMyCheckItem1: function(config) {
        config.text = '5 '+__zen('sec');

        return config;
    },

    processMyCheckItem2: function(config) {
        config.text = '10 '+__zen('sec');

        return config;
    },

    processMyCheckItem3: function(config) {
        config.text = '30 '+__zen('sec');

        return config;
    },

    processMyCheckItem4: function(config) {
        config.text = '60 '+__zen('sec');

        return config;
    },

    processTop_chk: function(config) {
        config.prependText = __zen('output_count')+' : ';

        return config;
    },

    onChk_btnChange: function(button) {
        var timeout = Ext.getCmp('timeout');
        var me = Ext.getCmp('monitor_app');
        var time = Ext.getCmp('update_time').text.split(' ');

        if(button.state === true){
            me.get_monitor_app();
            monitor_timeout();
        }
        else{
            clearInterval(timeout.interval);
            Ext.getCmp('timeout').setHtml(Number(time[0]));
        }
    },

    onMenucheckitemCheckChange: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(2);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange1: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(5);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange2: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(10);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange3: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(30);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange4: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(60);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick5: function(button, e, eOpts) {
        // var me = Ext.getCmp('monitor_app');

        Ext.getCmp("c_name").show();
        Ext.getCmp("c_category").show();
        Ext.getCmp("c_technology").show();
        Ext.getCmp("c_purpose").show();
        Ext.getCmp("c_popularity").show();

        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('monitor_app').get_monitor_app();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick4: function(button, e, eOpts) {
        // var me = Ext.getCmp('monitor_app');

        Ext.getCmp("c_name").hide();
        Ext.getCmp("c_category").show();
        Ext.getCmp("c_technology").hide();
        Ext.getCmp("c_purpose").hide();
        Ext.getCmp("c_popularity").hide();

        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('monitor_app').get_monitor_app();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick3: function(button, e, eOpts) {
        // var me = Ext.getCmp('monitor_app');

        Ext.getCmp("c_name").hide();
        Ext.getCmp("c_category").hide();
        Ext.getCmp("c_technology").show();
        Ext.getCmp("c_purpose").hide();
        Ext.getCmp("c_popularity").hide();

        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('monitor_app').get_monitor_app();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick2: function(button, e, eOpts) {
        // var me = Ext.getCmp('monitor_app');

        Ext.getCmp("c_name").hide();
        Ext.getCmp("c_category").hide();
        Ext.getCmp("c_technology").hide();
        Ext.getCmp("c_purpose").show();
        Ext.getCmp("c_popularity").hide();

        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('monitor_app').get_monitor_app();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick1: function(button, e, eOpts) {
        // var me = Ext.getCmp('monitor_app');

        Ext.getCmp("c_name").hide();
        Ext.getCmp("c_category").hide();
        Ext.getCmp("c_technology").hide();
        Ext.getCmp("c_purpose").hide();
        Ext.getCmp("c_popularity").show();

        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('monitor_app').get_monitor_app();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick6: function(button, e, eOpts) {
        var me = Ext.getCmp('monitor_app');
        me.btn_sort = "bytes";
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('monitor_app').get_monitor_app();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick7: function(button, e, eOpts) {
        var me = Ext.getCmp('monitor_app');
        me.btn_sort = "sessions";
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('monitor_app').get_monitor_app();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick8: function(button, e, eOpts) {
        var me = Ext.getCmp('monitor_app');
        me.btn_sort = "packets";
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('monitor_app').get_monitor_app();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange9: function(menucheckitem, checked, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_applicationControl');

        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('monitor_app').get_monitor_app();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange8: function(menucheckitem, checked, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_applicationControl');

        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('monitor_app').get_monitor_app();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange7: function(menucheckitem, checked, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_applicationControl');

        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('monitor_app').get_monitor_app();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange6: function(menucheckitem, checked, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_applicationControl');

        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('monitor_app').get_monitor_app();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange5: function(menucheckitem, checked, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_applicationControl');

        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('monitor_app').get_monitor_app();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick10: function(button, e, eOpts) {
        var me = Ext.getCmp('monitor_app');

        me.btn_filter = true;
        if(Ext.getCmp('chk_btn').state === true){
            me.get_monitor_app();
        }
    },

    onButtonClick9: function(button, e, eOpts) {
        var me = Ext.getCmp('monitor_app');

        me.btn_filter = false;

        Ext.getCmp("s_application").reset();
        Ext.getCmp("s_category").reset();
        Ext.getCmp("s_technology").reset();
        Ext.getCmp("s_purpose").reset();
        Ext.getCmp("s_category").setValue(["All"]);
        Ext.getCmp("s_technology").setValue(["All"]);
        Ext.getCmp("s_purpose").setValue(["All"]);
        if(Ext.getCmp('chk_btn').state === true){
            me.get_monitor_app();
        }
    },

    onGrid_listCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = Ext.getCmp("monitor_app");

        if(cellIndex !== 0 || record.data.rid === 0 || Ext.getCmp("s_action").getValue() !== "name" || Ext.isNumber(record.data.rid)===false){ return false; }

        if(record.data.name === "Unknown Application"){ Ext.Msg.alert("",get_msg('err_application')); return false; }

        var win = Ext.create('NFW2.view.win_application_more',{
            num: record.data.rid,
            name: record.data.name,
            type: record.data._type
        });

        win.show();
    },

    onPagingtoolbarBeforeChange: function(pagingtoolbar, page, eOpts) {
        this.get_monitor_app(page);

        return false;
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        me.timer = 0;
        me.btn_sort = "bytes";
        me.btn_filter = true;

        var _params = {
            basename : Ext.encode('mgt_app_filter_list')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){
                hideLoadMask();
                setTimeout(function(){ me.setWidth('100%'); },100);
                if(!response){ return false; }

                var category = response.category;
                var ar_category = [{
                    val: 'All'
                }];
                for(var i in category){
                    ar_category.push({
                        val: category[i]
                    });
                }
                Ext.data.StoreManager.lookup("store_profile_category").loadData(ar_category);

                var purpose = response.purpose;
                var ar_purpose = [{
                    val: 'All'
                }];
                for(var u in purpose){
                    ar_purpose.push({
                        val: purpose[u]
                    });
                }
                Ext.data.StoreManager.lookup("store_profile_purpose").loadData(ar_purpose);

                var technology = response.technology;
                var ar_technology = [{
                    val: 'All'
                }];
                for(var t in technology){
                    ar_technology.push({
                        val: technology[t]
                    });
                }
                Ext.data.StoreManager.lookup("store_profile_technology").loadData(ar_technology);

                Ext.getCmp("s_category").setValue(["All"]);
                Ext.getCmp("s_technology").setValue(["All"]);
                Ext.getCmp("s_purpose").setValue(["All"]);
            }
        );
    },

    onMonitor_trackerDestroy: function(component, eOpts) {
        clearInterval(Ext.getCmp('timeout').interval);
        Ext.data.StoreManager.lookup("store_monitor_app_list").removeAll();
    },

    get_monitor_app: function(start) {
        var me = this;

        var chk_update = Ext.getCmp("chk_update");
        var update = Ext.getCmp("update");
        var top_num = Ext.getCmp('top_chk').text.split(' ');

        var store = Ext.data.StoreManager.lookup("store_monitor_app_list");
        var cp = (start)?start:store.currentPage;

        store.getProxy().url = "/api/ftuctrl/getAppCtrlMon";
        if(me.btn_filter === true){
            store.getProxy().setExtraParam('search_opt',Ext.encode({
                'sort_by': me.btn_sort,
                'name': (Ext.getCmp("s_application").getValue())?Ext.getCmp("s_application").getValue():null,
                'category': Ext.getCmp("s_category").getValue(),
                'technology': Ext.getCmp("s_technology").getValue(),
                'purpose': Ext.getCmp("s_purpose").getValue()
            }));
        }
        else{
            store.getProxy().setExtraParam('search_opt',Ext.encode({
                'sort_by': me.btn_sort,
                'name': (Ext.getCmp("s_application").getValue())?Ext.getCmp("s_application").getValue():null,
                'category': Ext.getCmp("s_category").getValue(),
                'technology': Ext.getCmp("s_technology").getValue(),
                'purpose': Ext.getCmp("s_purpose").getValue()
            }));
        }
        store.getProxy().setExtraParam('limit',Ext.encode(Number(top_num[3])));
        store.currentPage = cp;
        store.pageSize = Number(top_num);
        store.load({callback : function(records, options, success) {

            if (success) {
                if(records.length === 0){ Ext.getCmp('app_data_error').show(); }
                else{ Ext.getCmp('app_data_error').hide(); }
                var time = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
            }
        }});
    },

    chk_filter: function(newValue, oldValue) {
        if(!oldValue){ return false; }

        var value = newValue.join(",");

        var o_value = oldValue.join(",");

        if(o_value.indexOf("All") === -1){

            if(value.indexOf("All") !== -1){
                return true;
            }
        }else{

            if(newValue.length < 2){ return false; }
            var val = [];

            for(var i=0; i<newValue.length; i++){
                if(newValue[i] !== "All"){
                    val.push(newValue[i]);
                }
            }
            return val;
        }
        return false;
    }

});