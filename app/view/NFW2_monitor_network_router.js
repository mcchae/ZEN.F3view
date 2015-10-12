
Ext.define('NFW2.view.NFW2_monitor_network_router', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_network_router',

    requires: [
        'NFW2.view.NFW2_monitor_network_routerViewModel',
        'Ext.form.Panel',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.form.Label',
        'Ext.button.Segmented',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Checkbox',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.toolbar.Paging'
    ],

    viewModel: {
        type: 'nfw2_monitor_network_router'
    },
    cls: 'zen_body',
    id: 'NFW2_monitor_network_router',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPanelAfterRender',
        beforedestroy: 'onNFW2_monitor_network_routerBeforeDestroy'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        header: false,
                        title: 'My Form',
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
                                            var me = Ext.getCmp('NFW2_monitor_network_router');

                                            me.get_router();
                                        },
                                        cls: 'dv_timecount',
                                        html: 5,
                                        id: 'timeout',
                                        width: 55
                                    },
                                    {
                                        xtype: 'cycle',
                                        focusCls: 'btn_f',
                                        cls: 'sel_monitor',
                                        id: 'update_time',
                                        showText: true,
                                        menu: {
                                            xtype: 'menu',
                                            width: 120,
                                            items: [
                                                me.processSec_5({
                                                    xtype: 'menucheckitem',
                                                    id: 'sec_5',
                                                    focusable: true,
                                                    checked: true,
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
                                                })
                                            ]
                                        }
                                    },
                                    {
                                        xtype: 'label',
                                        cls: 'lb_m_none',
                                        hidden: true,
                                        id: 'router_data_error',
                                        bind: {
                                            text: '{nodata_monitor_router}'
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
                                                id: 'router_ipv4_btn',
                                                enableToggle: true,
                                                pressed: true,
                                                bind: {
                                                    text: '{ipv4}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick'
                                                }
                                            },
                                            {
                                                id: 'router_ipv6_btn',
                                                bind: {
                                                    text: '{ipv6}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick1'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                hidden: true,
                                margin: '8 0 0 0',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'container',
                                        flex: 0.3,
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                id: 'date_label',
                                                text: '최종 수정 시간 :'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 0.7,
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch',
                                            pack: 'end'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                width: 80,
                                                text: 'IP Type'
                                            },
                                            {
                                                xtype: 'combobox',
                                                id: 'iptype_com',
                                                margin: '0 0 2 0',
                                                width: 70,
                                                editable: false,
                                                displayField: 'name',
                                                queryMode: 'local',
                                                store: 'store_monitor_iptype',
                                                valueField: 'value',
                                                listeners: {
                                                    afterrender: 'onIptype_comAfterRender',
                                                    change: 'onIptype_comChange'
                                                }
                                            },
                                            {
                                                xtype: 'checkboxfield',
                                                id: 'update_chk',
                                                margin: '0 0 0 5',
                                                boxLabel: '업데이트 주기',
                                                listeners: {
                                                    change: 'onUpdate_chkChange'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                id: 'update_time1',
                                                margin: '0 0 2 5',
                                                width: 70,
                                                labelSeparator: ' ',
                                                labelWidth: 120,
                                                editable: false,
                                                displayField: 'time',
                                                queryMode: 'local',
                                                store: {
                                                    data: [
                                                        {
                                                            time: '5'
                                                        },
                                                        {
                                                            time: '10'
                                                        },
                                                        {
                                                            time: '20'
                                                        },
                                                        {
                                                            time: '30'
                                                        }
                                                    ],
                                                    fields: [
                                                        {
                                                            name: 'time'
                                                        }
                                                    ]
                                                },
                                                valueField: 'time',
                                                listeners: {
                                                    afterrender: 'onUpdate_timeAfterRender',
                                                    change: 'onUpdate_timeChange'
                                                }
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
                                xtype: 'container',
                                margin: '8 0 10 0',
                                items: [
                                    {
                                        xtype: 'gridpanel',
                                        stateful: true,
                                        border: false,
                                        id: 'grid_router',
                                        header: false,
                                        title: 'My Grid Panel',
                                        titleCollapse: true,
                                        columnLines: true,
                                        store: 'store_monitor_router_ipv4_list',
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                dataIndex: 'interface',
                                                flex: 0.15,
                                                bind: {
                                                    text: '{inter}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    switch(value){
                                                        case "0" : return "Static";
                                                        case "4" : return "RIP";
                                                        case "6" : return "OSPF";
                                                        case "8" : return "BGP";
                                                    }
                                                },
                                                align: 'center',
                                                dataIndex: 'protocol_type',
                                                flex: 0.15,
                                                bind: {
                                                    text: '{protocol_type}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colindex, store, view) {
                                                    var data;
                                                    var mask = 0;
                                                    data = value.split('/');
                                                    var bin = (parseInt(data[1], 16)).toString(2);

                                                    for(var i=0;i < bin.length;i++){
                                                        if(bin.substr(i,1) === "1"){ mask++; }
                                                    }

                                                    return data[0]+"/"+mask;
                                                },
                                                align: 'center',
                                                dataIndex: 'destination',
                                                flex: 0.15,
                                                bind: {
                                                    text: '{dest}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                dataIndex: 'gateway',
                                                flex: 0.15,
                                                bind: {
                                                    text: '{gateway}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                dataIndex: 'distance',
                                                flex: 0.1,
                                                bind: {
                                                    text: '{distance}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                dataIndex: 'metric',
                                                flex: 0.1,
                                                bind: {
                                                    text: '{metric}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var num = parseInt(value, 16);
                                                    var result = "U";

                                                    num = num - 1;
                                                    if(num === 0){ return result; }

                                                    if((num-2) % 4 === 0){ result = result + "G"; }
                                                    if((num-4) % 8 === 0){ result = result + "H"; }
                                                    if((num-8) % 16 === 0){ result = result + "R"; }
                                                    if((num-16) % 32 === 0){ result = result + "D"; }
                                                    if((num-32) > 0){ result = result + "M"; }

                                                    return result;
                                                },
                                                align: 'center',
                                                dataIndex: 'flags',
                                                flex: 0.15,
                                                bind: {
                                                    text: '{flags}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                dataIndex: 'uptime',
                                                flex: 0.1,
                                                bind: {
                                                    text: '{uptime}'
                                                }
                                            }
                                        ],
                                        dockedItems: [
                                            {
                                                xtype: 'pagingtoolbar',
                                                doRefresh: function() {
                                                    var me = this,
                                                        current = me.store.currentPage;

                                                    if (me.fireEvent('beforechange', me, current) !== false) {
                                                        //me.store.load(current, me.tbl());
                                                        me.store.currentPage = current;
                                                        var main = Ext.getCmp('NFW2_monitor_network_router');

                                                        main.get_router();
                                                    }

                                                },
                                                moveFirst: function() {
                                                    if (this.fireEvent('beforechange', this, 1) !== false){
                                                        //this.store.loadPage(1, me.tbl());
                                                        this.store.getProxy().setExtraParam('start',Ext.encode(0));
                                                        this.store.currentPage = 1;

                                                        var main = Ext.getCmp('NFW2_monitor_network_router');

                                                        main.get_router();
                                                        return true;
                                                    }
                                                    return false;
                                                },
                                                moveLast: function() {
                                                    var me = this,
                                                        last = me.getPageData().pageCount;

                                                    if (me.fireEvent('beforechange', me, last) !== false) {
                                                        me.store.getProxy().setExtraParam('start',Ext.encode((last-1)*1000));
                                                        me.store.currentPage = last;
                                                        var main = Ext.getCmp('NFW2_monitor_network_router');

                                                        main.get_router();


                                                        return true;
                                                    }
                                                    return false;
                                                },
                                                moveNext: function() {
                                                    var me = this,
                                                        store = me.store,
                                                        total = me.getPageData().pageCount,
                                                        next = store.currentPage + 1;

                                                    if (next <= total) {
                                                        if (me.fireEvent('beforechange', me, next) !== false) {

                                                            //store.nextPage();
                                                            store.getProxy().setExtraParam('start',Ext.encode((next-1)*1000));
                                                            store.currentPage = next;
                                                            var main = Ext.getCmp('NFW2_monitor_network_router');

                                                            main.get_router();

                                                            return true;
                                                        }
                                                    }
                                                    return false;
                                                },
                                                movePrevious: function() {
                                                    var me = this,
                                                        store = me.store,
                                                        prev = store.currentPage - 1;

                                                    if (prev > 0) {
                                                        if (me.fireEvent('beforechange', me, prev) !== false) {

                                                            //store.previousPage();
                                                            store.getProxy().setExtraParam('start',Ext.encode((prev-1)*1000));
                                                            store.currentPage = prev;
                                                            var main = Ext.getCmp('NFW2_monitor_network_router');

                                                            main.get_router();

                                                            return true;
                                                        }
                                                    }
                                                    return false;
                                                },
                                                dock: 'bottom',
                                                id: 'toolbar',
                                                width: 360,
                                                displayInfo: true,
                                                store: 'store_monitor_router_ipv4_list'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'gridpanel',
                                        hidden: true,
                                        id: 'grid_router_ipv6',
                                        header: false,
                                        title: 'My Grid Panel',
                                        columnLines: true,
                                        store: 'store_monitor_router_ipv6_list',
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                dataIndex: 'interface',
                                                flex: 0.15,
                                                bind: {
                                                    text: '{inter}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    switch(value){
                                                        case "0" : return "Static";
                                                        case "4" : return "RIP";
                                                        case "6" : return "OSPF";
                                                        case "8" : return "BGP";
                                                    }
                                                },
                                                align: 'center',
                                                dataIndex: 'protocol_type',
                                                flex: 0.15,
                                                bind: {
                                                    text: '{protocol_type}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data;
                                                    var chk = 0;
                                                    var zero_count = 0;
                                                    var result_ip;
                                                    var temp = [];
                                                    var temp_join;
                                                    data = value.split('/');
                                                    var prefix = parseInt(data[1], 16);
                                                    var ip = [];
                                                    for(var i = 0;i < data[0].length-4;i++){
                                                        if(i === 0){ i = i+4; }
                                                        else{ i = i+3; }
                                                        ip.push(data[0].substr(i,4));
                                                    }

                                                    for(var j in ip){
                                                        if(ip[j] !== "0000"){
                                                            chk = 1;
                                                            if(j === 0){
                                                                temp.push(ip[j]);
                                                            }
                                                            else{
                                                                temp.push(":" + ip[j]);
                                                            }
                                                        }
                                                        else{
                                                            temp.push(":");
                                                        }
                                                    }

                                                    for(var k=0;k<7;k++){
                                                        if(temp[k] === ":"){
                                                            zero_count++;
                                                            if(zero_count > 1){
                                                                temp.splice(k,1,"");
                                                                zero_count--;
                                                            }
                                                        }
                                                        else{ zero_count = 0; }
                                                    }
                                                    temp_join = temp.join('');

                                                    if(chk === 0){ result_ip = "::"; }
                                                    else{ result_ip = temp_join; }

                                                    return result_ip + "/" + prefix;
                                                },
                                                align: 'center',
                                                dataIndex: 'destination',
                                                flex: 0.15,
                                                bind: {
                                                    text: '{dest}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var chk = 0;
                                                    var zero_count = 0;
                                                    var result_ip;
                                                    var temp = [];
                                                    var temp_join;
                                                    var ip = [];
                                                    for(var i = 0;i < 28;i++){
                                                        if(i === 0){ i = i+4; }
                                                        else{ i = i+3; }
                                                        ip.push(value.substr(i,4));
                                                    }

                                                    for(var j in ip){
                                                        if(ip[j] !== "0000"){
                                                            chk = 1;
                                                            if(j === 0){
                                                                temp.push(ip[j]);
                                                            }
                                                            else{
                                                                temp.push(":" + ip[j]);
                                                            }
                                                        }
                                                        else{
                                                            temp.push(":");
                                                        }
                                                    }

                                                    for(var k=0;k<7;k++){
                                                        if(temp[k] === ":"){
                                                            zero_count++;
                                                            if(zero_count > 1){
                                                                temp.splice(k,1,"");
                                                                zero_count--;
                                                            }
                                                        }
                                                        else{ zero_count = 0; }
                                                    }
                                                    temp_join = temp.join('');

                                                    if(chk === 0){ result_ip = "::"; }
                                                    else{ result_ip = temp_join; }

                                                    return result_ip;
                                                },
                                                align: 'center',
                                                dataIndex: 'gateway',
                                                flex: 0.15,
                                                bind: {
                                                    text: '{gateway}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                dataIndex: 'distance',
                                                flex: 0.1,
                                                bind: {
                                                    text: '{distance}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if(value === "FFFFFFFF" || value === "ffffffff"){
                                                        return "최대";
                                                    }

                                                    return parseInt(value, 16);
                                                },
                                                align: 'center',
                                                dataIndex: 'metric',
                                                flex: 0.1,
                                                bind: {
                                                    text: '{metric}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var num = parseInt(value, 16);
                                                    var result = "U";

                                                    num = num - 1;
                                                    if(num === 0){ return result; }

                                                    if((num-2) % 4 === 0){ result = result + "G"; }
                                                    if((num-4) % 8 === 0){ result = result + "H"; }
                                                    if((num-8) % 16 === 0){ result = result + "R"; }
                                                    if((num-16) % 32 === 0){ result = result + "D"; }
                                                    if((num-32) > 0){ result = result + "M"; }

                                                    return result;
                                                },
                                                align: 'center',
                                                dataIndex: 'flags',
                                                flex: 0.15,
                                                bind: {
                                                    text: '{flags}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                dataIndex: 'uptime',
                                                flex: 0.1,
                                                bind: {
                                                    text: '{uptime}'
                                                }
                                            }
                                        ],
                                        dockedItems: [
                                            {
                                                xtype: 'pagingtoolbar',
                                                doRefresh: function() {
                                                    var me = this,
                                                        current = me.store.currentPage;

                                                    if (me.fireEvent('beforechange', me, current) !== false) {
                                                        //me.store.load(current, me.tbl());
                                                        me.store.currentPage = current;
                                                        var main = Ext.getCmp('NFW2_monitor_network_router');

                                                        main.get_router();
                                                    }

                                                },
                                                moveNext: function() {
                                                    var me = this,
                                                        store = me.store,
                                                        total = me.getPageData().pageCount,
                                                        next = store.currentPage + 1;

                                                    if (next <= total) {
                                                        if (me.fireEvent('beforechange', me, next) !== false) {

                                                            //store.nextPage();
                                                            store.getProxy().setExtraParam('start',Ext.encode((next-1)*1000));
                                                            store.currentPage = next;
                                                            var main = Ext.getCmp('NFW2_monitor_network_router');

                                                            main.get_router();

                                                            return true;
                                                        }
                                                    }
                                                    return false;
                                                },
                                                movePrevious: function() {
                                                    var me = this,
                                                        store = me.store,
                                                        prev = store.currentPage - 1;

                                                    if (prev > 0) {
                                                        if (me.fireEvent('beforechange', me, prev) !== false) {

                                                            //store.previousPage();
                                                            store.getProxy().setExtraParam('start',Ext.encode((prev-1)*1000));
                                                            store.currentPage = prev;
                                                            var main = Ext.getCmp('NFW2_monitor_network_router');

                                                            main.get_router();

                                                            return true;
                                                        }
                                                    }
                                                    return false;
                                                },
                                                moveFirst: function() {
                                                    if (this.fireEvent('beforechange', this, 1) !== false){
                                                        //this.store.loadPage(1, me.tbl());
                                                        this.store.getProxy().setExtraParam('start',Ext.encode(0));
                                                        this.store.currentPage = 1;

                                                        var main = Ext.getCmp('NFW2_monitor_network_router');

                                                        main.get_router();
                                                        return true;
                                                    }
                                                    return false;
                                                },
                                                moveLast: function() {
                                                    var me = this,
                                                        last = me.getPageData().pageCount;

                                                    if (me.fireEvent('beforechange', me, last) !== false) {
                                                        me.store.getProxy().setExtraParam('start',Ext.encode((last-1)*1000));
                                                        me.store.currentPage = last;
                                                        var main = Ext.getCmp('NFW2_monitor_network_router');

                                                        main.get_router();


                                                        return true;
                                                    }
                                                    return false;
                                                },
                                                dock: 'bottom',
                                                id: 'toolbar2',
                                                width: 360,
                                                displayInfo: true,
                                                store: 'store_monitor_router_ipv6_list'
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

    processSec_5: function(config) {
        config.text = __zen('sec_5');

        return config;
    },

    processMyCheckItem1: function(config) {
        config.text = __zen('sec_10');

        return config;
    },

    processMyCheckItem2: function(config) {
        config.text = __zen('sec_20');

        return config;
    },

    processMyCheckItem3: function(config) {
        config.text = __zen('sec_30');

        return config;
    },

    onChk_btnChange: function(button) {
        var timeout = Ext.getCmp('timeout');
        var me = Ext.getCmp('NFW2_monitor_network_router');
        var time = Ext.getCmp('update_time').text.split(' ');

        if(button.state === true){
            me.get_router();
            monitor_timeout();
            //     var time = Ext.getCmp('update_time').text.split(' ');
            //     me.get_rrdFetchLast_cpu();
            //     timeout.interval = setInterval(me.get_rrdFetchLast_cpu, Number(time[0])*1000);
        }
        else{
            clearInterval(timeout.interval);
            Ext.getCmp('timeout').setHtml(Number(time[0]));
        }
    },

    onMenucheckitemCheckChange: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(5);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange1: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(10);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange2: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(20);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange3: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(30);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick: function(button, e, eOpts) {
        Ext.getCmp('grid_router').show();
        Ext.getCmp('grid_router_ipv6').hide();
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_network_router').get_router();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }

        if(Ext.data.StoreManager.lookup('store_monitor_router_ipv4_list').data.items.length === 0){ Ext.getCmp('router_data_error').show(); }
        else{ Ext.getCmp('router_data_error').hide(); }
    },

    onButtonClick1: function(button, e, eOpts) {
        Ext.getCmp('grid_router').hide();
        Ext.getCmp('grid_router_ipv6').show();
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_network_router').get_router();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }

        if(Ext.data.StoreManager.lookup('store_monitor_router_ipv6_list').data.items.length === 0){ Ext.getCmp('router_data_error').show(); }
        else{ Ext.getCmp('router_data_error').hide(); }
    },

    onIptype_comAfterRender: function(component, eOpts) {
        var inter = Ext.getCmp('iptype_com').getStore().data;

        if(inter.length > 0){
            Ext.getCmp("iptype_com").setValue(inter.items[0].data['value']);
        }
    },

    onIptype_comChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        if(newValue === "v4"){
            Ext.getCmp('grid_router').show();
            Ext.getCmp('grid_router_ipv6').hide();
            Ext.getCmp('update_chk').setValue(false);
        }
        else{
            Ext.getCmp('grid_router').hide();
            Ext.getCmp('grid_router_ipv6').show();
            Ext.getCmp('update_chk').setValue(false);
        }
    },

    onUpdate_chkChange: function(field, newValue, oldValue, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_network_router');

        if(newValue){
            me.get_router();
            if(Ext.getCmp('update_time').getValue() === "5"){ me.interval = setInterval(me.get_router, 5000); }
            if(Ext.getCmp('update_time').getValue() === "10"){ me.interval = setInterval(me.get_router, 10000); }
            if(Ext.getCmp('update_time').getValue() === "20"){ me.interval = setInterval(me.get_router, 20000); }
            if(Ext.getCmp('update_time').getValue() === "30"){ me.interval = setInterval(me.get_router, 30000); }
        }
        else{
            clearInterval(me.interval);
        }
    },

    onUpdate_timeAfterRender: function(component, eOpts) {
        // var inter = Ext.getCmp('update_time').getStore().data;

        // if(inter.length > 0){
        //     Ext.getCmp("update_time").setValue(inter.items[0].data['time']);
        // }
    },

    onUpdate_timeChange: function(field, newValue, oldValue, eOpts) {
        // var me = Ext.getCmp('NFW2_monitor_network_router');

        // clearInterval(me.interval);

        // if(Ext.getCmp('update_chk').getValue()){
        //     if(newValue === "5"){ me.interval = setInterval(me.get_router, 5000); }
        //     if(newValue === "10"){ me.interval = setInterval(me.get_router, 10000); }
        //     if(newValue === "20"){ me.interval = setInterval(me.get_router, 20000); }
        //     if(newValue === "30"){ me.interval = setInterval(me.get_router, 30000); }
        // }
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        Ext.getCmp('toolbar').items.items[4].editable = false;
        Ext.getCmp('toolbar2').items.items[4].editable = false;

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
        me.get_router();
    },

    onNFW2_monitor_network_routerBeforeDestroy: function(component, eOpts) {
        var me = this;
        Ext.data.StoreManager.lookup('store_monitor_router_ipv4_list').removeAll();
        Ext.data.StoreManager.lookup('store_monitor_router_ipv6_list').removeAll();
        clearInterval(Ext.getCmp('timeout').interval);
    },

    get_router: function() {
        var me = Ext.getCmp('NFW2_monitor_network_router');

        var store = Ext.data.StoreManager.lookup('store_monitor_router_ipv4_list');
        store.load(function(response){
            var _params = {

                filename: Ext.encode('/proc/net/route_ext'),
                start : Ext.encode(0),
                limit : Ext.encode(100)
            };

            request_helper.xmlrpc_call_JsonP(

                'ftuctrl',
                'getFileContent',
                _params,

                function(response){
                    hideLoadMask();
                    setTimeout(function(){ me.setWidth('100%'); },100);
                    var records = [];
                    var temp;

                    if(!response.retcode){
                        if(Ext.getCmp('router_ipv4_btn').pressed === true){
                            if(response.list.length === 0){ Ext.getCmp('router_data_error').show(); }
                            else{ Ext.getCmp('router_data_error').hide(); }
                        }
                        for(var i = 1;i < response.list.length;i++){
                            var data = [];
                            temp = response.list[i].split('\t');

                            for(var j in temp){
                                if(temp[j] !== ""){ data.push(temp[j]); }
                            }

                            var ip = me.long2ip(data[1])+"/"+data[7];
                            var gate = me.long2ip(data[2]);

                            records.push({
                                "interface" : data[0],
                                "protocol_type" : data[12],
                                "destination" : ip,
                                "gateway" : gate,
                                "distance" : data[11],
                                "metric" : data[6],
                                "flags" : data[3],
                                "uptime" : data[13]
                            });
                        }

                        records.sort(function(a, b){
                            var fir = a.destination.split('/');
                            var sec = b.destination.split('/');
                            var fir_p = parseInt(fir[1], 16);
                            var sec_p = parseInt(sec[1], 16);
                            if(Number(fir_p) < Number(sec_p)){ return 1; }
                            if(Number(fir_p) > Number(sec_p)){ return -1; }
                            else{
                                records.sort(function(a, b){
                                    var fir_i = fir[0].split('.');
                                    var sec_i = sec[0].split('.');

                                    for(var k in fir_i){
                                        if(Number(fir_i[k]) > Number(sec_i[k])){ return 1; }
                                        if(Number(fir_i[k]) < Number(sec_i[k])){ return -1; }
                                    }

                                    return 0;
                                });
                            }


                            return 0;
                        });

                        var store = Ext.data.StoreManager.lookup('store_monitor_router_ipv4_list');
                        if(records)
                            store.loadData(records);

                    }
                }
            );
        });
        var store2 = Ext.data.StoreManager.lookup('store_monitor_router_ipv6_list');
        store2.load(function(response){
            var _params = {

                filename: Ext.encode('/proc/net/ipv6_route_ext'),
                start : Ext.encode(0),
                limit : Ext.encode(100)
            };

            request_helper.xmlrpc_call_JsonP(

                'ftuctrl',
                'getFileContent',
                _params,

                function(response){
                    var records = [];
                    var temp;

                    if(!response.retcode){
                        if(Ext.getCmp('router_ipv6_btn').pressed === true){
                            if(response.list.length === 0){ Ext.getCmp('router_data_error').show(); }
                            else{ Ext.getCmp('router_data_error').hide(); }
                        }
                        for(var i = 1;i < response.list.length;i++){
                            var data = [];
                            temp = response.list[i].split(' ');

                            for(var j in temp){
                                if(temp[j] !== ""){ data.push(temp[j]); }
                            }
                            records.push({
                                "interface" : data[9],
                                "protocol_type" : data[11],
                                "destination" : data[0] + "/" + data[1],
                                "gateway" : data[4],
                                "distance" : data[10],
                                "metric" : data[5],
                                "flags" : data[8],
                                "uptime" : data[12]
                            });
                        }

                        records.sort(function(a, b){
                            var fir = parseInt(a.gateway, 16);
                            var sec = parseInt(b.gateway, 16);

                            if(fir < sec){ return 1; }
                            if(fir > sec){ return -1; }

                            var fir_ip = [];
                            var sec_ip = [];

                            for(var i = 0;i < 28;i++){
                                if(i === 0){ i = i+4; }
                                else{ i = i+3; }
                                fir_ip.push(a.destination.substr(i,4));
                                sec_ip.push(b.destination.substr(i,4));
                            }

                            for(var k in fir_ip){
                                if(fir_ip[k] > sec_ip[k]){ return 1; }
                                if(fir_ip[k] < sec_ip[k]){ return -1; }
                            }

                            var fir_pre = parseInt(a.destination.substr(33,2), 16);
                            var sec_pre = parseInt(b.destination.substr(33,2), 16);

                            if(fir_pre > sec_pre){ return 1;}
                            if(fir_pre < sec_pre){ return -1;}

                            return 0;
                        });
                        var store = Ext.data.StoreManager.lookup('store_monitor_router_ipv6_list');
                        store.loadData(records);

                    }
                }
            );
        });

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

    long2ip: function(value) {
        var ip = /*4294967295 - */parseInt(value,16);
        var output = Math.floor(ip / Math.pow(256, 3)) + '.' + Math.floor((ip % Math.pow(256, 3)) / Math.pow(256, 2)) + '.' + Math.floor(((ip % Math.pow(256, 3)) % Math.pow(256, 2)) / Math.pow(256, 1)) + '.' + Math.floor((((ip % Math.pow(256, 3)) % Math.pow(256, 2)) % Math.pow(256, 1)) / Math.pow(256, 0));

        return output;
    }

});