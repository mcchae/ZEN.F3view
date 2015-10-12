
Ext.define('NFW2.view.NFW2_monitor_ddos_DetBloTraffic', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.form.FieldSet',
        'Ext.Img',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View'
    ],

    id: 'NFW2_monitor_ddos_DetBloTraffic',
    title: '탐지/차단 트래픽',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            listeners: {
                destroy: {
                    fn: me.onPanelDestroy,
                    scope: me
                },
                afterrender: {
                    fn: me.onPanelAfterRender,
                    scope: me
                }
            },
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    header: false,
                    title: 'My Form',
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: 'lb_sq',
                                            id: 'date_label',
                                            text: '최종 수정 시간 :'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        pack: 'end'
                                    },
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            id: 'update_chk',
                                            boxLabel: '업데이트 주기',
                                            listeners: {
                                                change: {
                                                    fn: me.onUpdate_chkChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            id: 'update_time',
                                            margin: '0 0 2 5',
                                            width: 70,
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            editable: false,
                                            displayField: 'time',
                                            queryMode: 'local',
                                            store: 'store_monitor_ips_time',
                                            valueField: 'time',
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onUpdate_timeAfterRender,
                                                    scope: me
                                                },
                                                change: {
                                                    fn: me.onUpdate_timeChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            hidden: true,
                                            margin: '0 0 0 5',
                                            width: 100,
                                            text: '전체 차단 해제'
                                        },
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 5',
                                            text: '(초)'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            margin: '5 0 0 0',
                            title: '검색 옵션',
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '0 0 5 0 ',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            margin: '5 0 0 0',
                                            width: 55,
                                            text: '초기화',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            flex: 0.17,
                                            hidden: true,
                                            id: 'ddos_traf_search_name',
                                            margin: '0 0 0 5',
                                            fieldLabel: '프로파일 이름',
                                            labelAlign: 'top',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            editable: false,
                                            listeners: {
                                                expand: {
                                                    fn: me.onDdos_traf_search_nameExpand,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            flex: 0.08,
                                            id: 'ddos_traf_search_protocol',
                                            margin: '0 0 0 5',
                                            minWidth: 70,
                                            fieldLabel: '프로토콜',
                                            labelAlign: 'top',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            emptyText: 'select',
                                            editable: false,
                                            queryMode: 'local',
                                            store: {
                                                data: [
                                                    {
                                                        text: 'TCP',
                                                        value: 'tcp'
                                                    },
                                                    {
                                                        text: 'UDP',
                                                        value: 'udp'
                                                    },
                                                    {
                                                        text: 'ICMP',
                                                        value: 'icmp'
                                                    }
                                                ],
                                                fields: [
                                                    {
                                                        name: 'text'
                                                    },
                                                    {
                                                        name: 'value'
                                                    }
                                                ]
                                            },
                                            valueField: 'value',
                                            listeners: {
                                                expand: {
                                                    fn: me.onDdos_traf_search_protocolExpand,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            flex: 0.2,
                                            id: 'ddos_traf_search_stip',
                                            margin: '0 0 0 5',
                                            minWidth: 100,
                                            fieldLabel: '출발지',
                                            labelAlign: 'top',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            listeners: {
                                                focus: {
                                                    fn: me.onDdos_traf_search_stipFocus,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            flex: 0.1,
                                            id: 'ddos_traf_search_stport',
                                            margin: '0 0 0 5',
                                            minWidth: 85,
                                            fieldLabel: '출발지 포트',
                                            labelAlign: 'top',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            listeners: {
                                                focus: {
                                                    fn: me.onDdos_traf_search_stportFocus,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            flex: 0.2,
                                            id: 'ddos_traf_search_dsip',
                                            margin: '0 0 0 5',
                                            minWidth: 100,
                                            fieldLabel: '목적지',
                                            labelAlign: 'top',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            listeners: {
                                                focus: {
                                                    fn: me.onDdos_traf_search_dsipFocus,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            flex: 0.1,
                                            id: 'ddos_traf_search_dsport',
                                            margin: '0 0 0 5',
                                            minWidth: 85,
                                            fieldLabel: '목적지 포트',
                                            labelAlign: 'top',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            listeners: {
                                                focus: {
                                                    fn: me.onDdos_traf_search_dsportFocus,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            flex: 0.12,
                                            id: 'ddos_traf_search_action',
                                            margin: '0 5 0 5',
                                            minWidth: 70,
                                            fieldLabel: '행위',
                                            labelAlign: 'top',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            emptyText: 'select',
                                            editable: false,
                                            queryMode: 'local',
                                            store: {
                                                data: [
                                                    {
                                                        text: '탐지',
                                                        value: '0'
                                                    },
                                                    {
                                                        text: '1:N 차단',
                                                        value: '1'
                                                    },
                                                    {
                                                        text: 'N:1 차단',
                                                        value: '2'
                                                    },
                                                    {
                                                        text: '1:1 출발지 포트 가변 차단',
                                                        value: '3'
                                                    }
                                                ],
                                                fields: [
                                                    {
                                                        name: 'text'
                                                    },
                                                    {
                                                        name: 'value'
                                                    }
                                                ]
                                            },
                                            valueField: 'value',
                                            listeners: {
                                                expand: {
                                                    fn: me.onDdos_traf_search_actionExpand,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'image',
                                            hidden: true,
                                            id: 'btn_ddos_traf_search',
                                            margin: '27 0 0 10',
                                            width: 19,
                                            src: '../images/b_signature_search.png'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '5 0 0 0',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'monitor_ddos_grid',
                                    header: false,
                                    title: 'My Grid Panel',
                                    columnLines: true,
                                    store: 'store_monitor_ddos_list',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var d = new Date(value*1000);

                                                var year = d.getFullYear();
                                                var month = d.getMonth() + 1;
                                                if(String(month).length === 1){ month = String(0)+month; }
                                                var day = d.getDate();
                                                if(String(day).length === 1){ day = String(0)+day; }
                                                var hour = d.getHours();
                                                if(String(hour).length === 1){ hour = String(0)+hour; }
                                                var min = d.getMinutes();
                                                if(String(min).length === 1){ min = String(0)+min; }
                                                var sec = d.getSeconds();
                                                if(String(sec).length === 1){ sec = String(0)+sec; }

                                                return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
                                            },
                                            align: 'center',
                                            dataIndex: 'time',
                                            text: '시간',
                                            flex: 0.1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            align: 'center',
                                            dataIndex: 'attack_name',
                                            text: '공격 유형',
                                            flex: 0.12
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var protocol = Ext.data.StoreManager.lookup('store_logsearch_system_protocol');

                                                for(var i in protocol.data.items){
                                                    if(Number(protocol.data.items[i].data.val) === Number(value)){ return protocol.data.items[i].data.name; }
                                                }

                                                return '';
                                            },
                                            align: 'center',
                                            dataIndex: 'protocol',
                                            text: '프로토콜',
                                            flex: 0.08
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var temp = value.split('.');

                                                return temp[3]+"."+temp[2]+"."+temp[1]+"."+temp[0];
                                            },
                                            align: 'center',
                                            dataIndex: 'sip',
                                            text: '출발지',
                                            flex: 0.1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            align: 'center',
                                            dataIndex: 'sport',
                                            text: '출발지 포트',
                                            flex: 0.1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var temp = value.split('.');

                                                return temp[3]+"."+temp[2]+"."+temp[1]+"."+temp[0];
                                            },
                                            align: 'center',
                                            dataIndex: 'dip',
                                            text: '목적지',
                                            flex: 0.1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            align: 'center',
                                            dataIndex: 'dport',
                                            text: '목적지 포트',
                                            flex: 0.1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(value === 1){ return "1:N 차단"; }
                                                else if(value === 2){ return "N:1 차단"; }
                                                else if(value === 3){ return "1:1 차단"; }
                                                else{ return "탐지"; }
                                            },
                                            align: 'center',
                                            dataIndex: 'action',
                                            text: '행위',
                                            flex: 0.08
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return value + "(" + record.data.bytes + ")";
                                            },
                                            align: 'center',
                                            dataIndex: 'block_count',
                                            text: '횟수(Bytes)',
                                            flex: 0.08
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onPanelDestroy: function(component, eOpts) {
        var me = this;

        clearInterval(me.interval);
        Ext.data.StoreManager.lookup('store_monitor_ddos_list').removeAll();
    },

    onUpdate_chkChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        if(String(month).length === 1){ month = String(0)+month; }
        var day = d.getDate();
        if(String(day).length === 1){ day = String(0)+day; }
        var hour = d.getHours();
        if(String(hour).length === 1){ hour = String(0)+hour; }
        var min = d.getMinutes();
        if(String(min).length === 1){ min = String(0)+min; }
        var sec = d.getSeconds();
        if(String(sec).length === 1){ sec = String(0)+sec; }

        if(newValue){
            me.src_time = year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
            me.year = year;
            me.month = month;
            me.day = day;
            me.hour = hour;
            me.min = min;
            me.sec = sec;
            me.filter = [];
            me.filter.push(Ext.getCmp('ddos_traf_search_protocol').getValue());
            me.filter.push(Ext.getCmp('ddos_traf_search_stip').getValue());
            me.filter.push(Ext.getCmp('ddos_traf_search_stport').getValue());
            me.filter.push(Ext.getCmp('ddos_traf_search_dsip').getValue());
            me.filter.push(Ext.getCmp('ddos_traf_search_dsport').getValue());
            me.filter.push(Ext.getCmp('ddos_traf_search_action').getValue());
            me.get_ddos();
            if(Ext.getCmp('update_time').getValue() === "1"){ me.interval = setInterval(me.get_ddos, 1000); }
            if(Ext.getCmp('update_time').getValue() === "2"){ me.interval = setInterval(me.get_ddos, 2000); }
            if(Ext.getCmp('update_time').getValue() === "5"){ me.interval = setInterval(me.get_ddos, 5000); }
            if(Ext.getCmp('update_time').getValue() === "10"){ me.interval = setInterval(me.get_ddos, 10000); }
            if(Ext.getCmp('update_time').getValue() === "30"){ me.interval = setInterval(me.get_ddos, 30000); }
        }
        else{
            clearInterval(me.interval);
        }
    },

    onUpdate_timeAfterRender: function(component, eOpts) {
        var inter = Ext.getCmp('update_time').getStore().data;

        if(inter.length > 0){
            Ext.getCmp("update_time").setValue(inter.items[0].data['time']);
        }
    },

    onUpdate_timeChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        clearInterval(me.interval);

        if(Ext.getCmp('update_chk').getValue()){
            if(newValue === "1"){ me.interval = setInterval(me.get_ddos, 1000); }
            if(newValue === "2"){ me.interval = setInterval(me.get_ddos, 2000); }
            if(newValue === "5"){ me.interval = setInterval(me.get_ddos, 5000); }
            if(newValue === "10"){ me.interval = setInterval(me.get_ddos, 10000); }
            if(newValue === "30"){ me.interval = setInterval(me.get_ddos, 30000); }
        }
    },

    onButtonClick: function(button, e, eOpts) {
        Ext.getCmp('ddos_traf_search_name').reset();
        Ext.getCmp('ddos_traf_search_protocol').reset();
        Ext.getCmp('ddos_traf_search_stip').reset();
        Ext.getCmp('ddos_traf_search_stport').reset();
        Ext.getCmp('ddos_traf_search_dsip').reset();
        Ext.getCmp('ddos_traf_search_dsport').reset();
        Ext.getCmp('ddos_traf_search_action').reset();
    },

    onDdos_traf_search_nameExpand: function(field, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onDdos_traf_search_protocolExpand: function(field, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onDdos_traf_search_stipFocus: function(component, e, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onDdos_traf_search_stportFocus: function(component, e, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onDdos_traf_search_dsipFocus: function(component, e, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onDdos_traf_search_dsportFocus: function(component, e, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onDdos_traf_search_actionExpand: function(field, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        me.src_time = 0;

        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        if(String(month).length === 1){ month = String(0)+month; }
        var day = d.getDate();
        if(String(day).length === 1){ day = String(0)+day; }
        var hour = d.getHours();
        if(String(hour).length === 1){ hour = String(0)+hour; }
        var min = d.getMinutes();
        if(String(min).length === 1){ min = String(0)+min; }
        var sec = d.getSeconds();
        if(String(sec).length === 1){ sec = String(0)+sec; }

        Ext.getCmp('date_label').setText("최종 수정 시간 : "+year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec);
    },

    get_ddos: function() {
        var me = Ext.getCmp('NFW2_monitor_ddos_DetBloTraffic');

        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        if(String(month).length === 1){ month = String(0)+month; }
        var day = d.getDate();
        if(String(day).length === 1){ day = String(0)+day; }
        var hour = d.getHours();
        if(String(hour).length === 1){ hour = String(0)+hour; }
        var min = d.getMinutes();
        if(String(min).length === 1){ min = String(0)+min; }
        var sec = d.getSeconds();
        if(String(sec).length === 1){ sec = String(0)+sec; }

        Ext.getCmp('date_label').setText("최종 수정 시간 : "+year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec);

        var now_time = year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec;

        var temp = new Date(year, month, day, hour, min, sec)-new Date(me.year, me.month, me.day, me.hour, me.min, me.sec);
        var update_time = temp/1000;

        for(var i in me.filter){
            if(me.filter[i] === ""){ me.filter[i] = null; }
        }

        var _params = {
            current_datetime : Ext.encode(now_time),
            update_secs : Ext.encode(Number(update_time)),
            filter_info : Ext.encode({'protocol':me.filter[0], 'sip':me.filter[1], 'sport':me.filter[2], 'dip':me.filter[3], 'dport':me.filter[4], 'block_type':me.filter[5]}),
            limit : Ext.encode(10000)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getDDoSLogMon',
            _params,

            function(response){
        //         hideLoadMask();
                var record = [];
                for(var i in response.list){
                    if(response.list !== null){
                        console.log(response);
                        record.push({
                            'time' : response.list[i].timestamp,
                            'attack_name' : response.list[i].attack_type,
                            'protocol' : response.list[i].protocol,
                            'sip' : response.list[i].sip,
                            'sport' : response.list[i].sport,
                            'dip' : response.list[i].dip,
                            'dport' : response.list[i].dport,
                            'action' : response.list[i].block_type,
                            'block_count' : response.list[i].count,
                            'bytes' : response.list[i].bytes
                        });
                    }
                }

                var store = Ext.data.StoreManager.lookup('store_monitor_ddos_list');
                store.loadData(record);
            }
        );

    }

});