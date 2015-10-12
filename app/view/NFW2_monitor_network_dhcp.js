
Ext.define('NFW2.view.NFW2_monitor_network_dhcp', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_network_dhcp',

    requires: [
        'NFW2.view.NFW2_monitor_network_dhcpViewModel',
        'Ext.form.Panel',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.toolbar.Paging'
    ],

    viewModel: {
        type: 'nfw2_monitor_network_dhcp'
    },
    cls: 'zen_body',
    id: 'NFW2_monitor_network_dhcp',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPanelAfterRender',
        beforedestroy: 'onNFW2_monitor_network_dhcpBeforeDestroy'
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
                                            var me = Ext.getCmp('NFW2_monitor_network_dhcp');

                                            me.get_dhcp();
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
                                                me.processMyCheckItem({
                                                    xtype: 'menucheckitem',
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
                                        id: 'dhcp_data_error',
                                        bind: {
                                            text: '{nodata_monitor_dhcp}'
                                        }
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
                                                xtype: 'checkboxfield',
                                                id: 'update_chk',
                                                boxLabel: '업데이트 주기',
                                                listeners: {
                                                    change: 'onCheckboxfieldChange'
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
                                                store: 'store_monitor_update_time',
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
                                        id: 'grid_dhcp',
                                        header: false,
                                        title: 'My Grid Panel',
                                        columnLines: true,
                                        store: 'store_monitor_network_dhcp_list',
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                width: 60,
                                                align: 'center',
                                                dataIndex: '@num',
                                                text: 'N'
                                            },
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
                                                align: 'center',
                                                dataIndex: 'lease',
                                                flex: 0.15,
                                                bind: {
                                                    text: '{assign_address}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                dataIndex: 'starts',
                                                flex: 0.15,
                                                bind: {
                                                    text: '{allocate_period}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                dataIndex: 'ends',
                                                flex: 0.15,
                                                bind: {
                                                    text: '{end_time}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                dataIndex: 'mac',
                                                flex: 0.15,
                                                bind: {
                                                    text: '{address}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                dataIndex: 'host',
                                                flex: 0.15,
                                                bind: {
                                                    text: '{host_name}'
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
                                                        var main = Ext.getCmp('NFW2_monitor_network_dhcp');

                                                        main.get_dhcp();
                                                    }

                                                },
                                                moveFirst: function() {
                                                    if (this.fireEvent('beforechange', this, 1) !== false){
                                                        //this.store.loadPage(1, me.tbl());
                                                        this.store.getProxy().setExtraParam('start',Ext.encode(0));
                                                        this.store.currentPage = 1;

                                                        var main = Ext.getCmp('NFW2_monitor_network_dhcp');

                                                        main.get_dhcp();
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
                                                        var main = Ext.getCmp('NFW2_monitor_network_dhcp');

                                                        main.get_dhcp();


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
                                                            var main = Ext.getCmp('NFW2_monitor_network_dhcp');

                                                            main.get_dhcp();

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
                                                            var main = Ext.getCmp('NFW2_monitor_network_dhcp');

                                                            main.get_dhcp();
                                                            return true;
                                                        }
                                                    }
                                                    return false;
                                                },
                                                getPageData: function() {
                                                    var store = this.store,
                                                        totalCount = store.getTotalCount();

                                                    if(Ext.getCmp('NFW2_monitor_network_dhcp').dhcp_cnt){
                                                        if(Ext.getCmp('NFW2_monitor_network_dhcp').dhcp_cnt !== 0){
                                                            totalCount = Ext.getCmp('NFW2_monitor_network_dhcp').dhcp_cnt;
                                                        }
                                                    }
                                                    else{
                                                        if(totalCount < 6){ totalCount = 0; }
                                                    }

                                                    return {
                                                        total : totalCount,
                                                        currentPage : store.currentPage,
                                                        pageCount: Math.ceil(totalCount / store.pageSize),
                                                        fromRecord: ((store.currentPage - 1) * store.pageSize) + 1,
                                                        toRecord: Math.min(store.currentPage * store.pageSize, totalCount)

                                                    };
                                                },
                                                updateInfo: function() {
                                                    var me = this,
                                                        displayItem = me.child('#displayItem'),
                                                        store = me.store,
                                                        pageData = me.getPageData(),
                                                        count, msg;

                                                    if (displayItem) {
                                                        count = pageData.total;
                                                        if (count === 0) {
                                                            msg = me.emptyMsg;
                                                        } else {
                                                            msg = Ext.String.format(
                                                            me.displayMsg,
                                                            pageData.fromRecord,
                                                            pageData.toRecord,
                                                            pageData.total
                                                            );
                                                        }

                                                        displayItem.setText(msg);
                                                    }
                                                },
                                                onLoad: function() {
                                                    var me = this,
                                                        pageData,
                                                        currPage,
                                                        pageCount,
                                                        afterText,
                                                        count,
                                                        isEmpty,
                                                        item;

                                                    count = Ext.getCmp('NFW2_monitor_network_dhcp').dhcp_cnt;
                                                    isEmpty = count === 0;
                                                    if (!isEmpty) {
                                                        pageData = me.getPageData();
                                                        currPage = pageData.currentPage;
                                                        pageCount = pageData.pageCount;

                                                        if (currPage > pageCount) {
                                                            if (pageCount > 0) {
                                                                me.store.loadPage(pageCount);
                                                            }
                                                            else {
                                                                me.getInputItem().reset();
                                                            }
                                                            return;
                                                        }

                                                        afterText = Ext.String.format(me.afterPageText, isNaN(pageCount) ? 1 : pageCount);
                                                    } else {
                                                        currPage = 0;
                                                        pageCount = 0;
                                                        afterText = Ext.String.format(me.afterPageText, 0);
                                                    }

                                                    Ext.suspendLayouts();
                                                    item = me.child('#afterTextItem');
                                                    if (item) {
                                                        item.setText(afterText);
                                                    }
                                                    item = me.getInputItem();
                                                    if (item) {
                                                        item.setDisabled(isEmpty).setValue(currPage);
                                                    }
                                                    me.setChildDisabled('#first', currPage === 1 || isEmpty);
                                                    me.setChildDisabled('#prev', currPage === 1 || isEmpty);
                                                    me.setChildDisabled('#next', currPage === pageCount  || isEmpty);
                                                    me.setChildDisabled('#last', currPage === pageCount  || isEmpty);
                                                    me.setChildDisabled('#refresh', false);
                                                    me.updateInfo();
                                                    Ext.resumeLayouts(true);

                                                    if (!me.calledInternal) {
                                                        me.fireEvent('change', me, pageData || me.emptyPageData);
                                                    }
                                                },
                                                dock: 'bottom',
                                                id: 'toolbar',
                                                width: 360,
                                                displayInfo: true,
                                                store: 'store_monitor_network_dhcp_list'
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
        var me = Ext.getCmp('NFW2_monitor_network_dhcp');
        var time = Ext.getCmp('update_time').text.split(' ');

        if(button.state === true){
            me.get_dhcp();
            monitor_timeout();
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

    onCheckboxfieldChange: function(field, newValue, oldValue, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_network_dhcp');

        if(newValue){
            me.get_dhcp();
            if(Ext.getCmp('update_time').getValue() === "5"){ me.interval = setInterval(me.get_dhcp, 5000); }
            if(Ext.getCmp('update_time').getValue() === "10"){ me.interval = setInterval(me.get_dhcp, 10000); }
            if(Ext.getCmp('update_time').getValue() === "20"){ me.interval = setInterval(me.get_dhcp, 20000); }
            if(Ext.getCmp('update_time').getValue() === "30"){ me.interval = setInterval(me.get_dhcp, 30000); }
        }
        else{
            clearInterval(me.interval);
        }
    },

    onUpdate_timeAfterRender: function(component, eOpts) {
        // var inter = Ext.getCmp('update_time').getStore().data;

        // if(inter.length > 0){
        // //     Ext.getCmp("update_time").setValue(inter.items[0].data['time']);
        // }
    },

    onUpdate_timeChange: function(field, newValue, oldValue, eOpts) {
        // var me = Ext.getCmp('NFW2_monitor_network_dhcp');

        // clearInterval(me.interval);

        // if(Ext.getCmp('update_chk').getValue()){
        //     if(newValue === "5"){ me.interval = setInterval(me.get_dhcp, 5000); }
        //     if(newValue === "10"){ me.interval = setInterval(me.get_dhcp, 10000); }
        //     if(newValue === "20"){ me.interval = setInterval(me.get_dhcp, 20000); }
        //     if(newValue === "30"){ me.interval = setInterval(me.get_dhcp, 30000); }
        // }
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        me.timezone = 0;
        me.dhcp_cnt = 0;
        Ext.getCmp('toolbar').items.items[4].editable = false;

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

        var _params = {

            basename : Ext.encode('system_basic')

        };

        request_helper.xmlrpc_call_JsonP(

            'ftuctrl',
            'getObject',
            _params,

            function(response){
                me.timezone = Number(response.system_basic.timezone)/60;
            }
        );

        me.get_dhcp();
    },

    onNFW2_monitor_network_dhcpBeforeDestroy: function(component, eOpts) {
        var me = this;
        Ext.data.StoreManager.lookup('store_monitor_network_dhcp_list').removeAll();
        clearInterval(Ext.getCmp('timeout').interval);
    },

    get_dhcp: function() {
        var store = Ext.data.StoreManager.lookup('store_monitor_network_dhcp_list');
        var me = Ext.getCmp('NFW2_monitor_network_dhcp');
        var num = 0;

        store.load(function(){
            var _params = {

                filename: Ext.encode('/etc/ferret/conf/network/dhcpd.lease'),
                start: Ext.encode(0),
                limit: Ext.encode(1000)
            };

            request_helper.xmlrpc_call_JsonP(

                'ftuctrl',
                'getFileContent',
                _params,

                function(response){
                    hideLoadMask();
                    setTimeout(function(){ me.setWidth('100%'); },100);
                    var records = [];
                    var data = [];
                    if(response.list.length === 0){ Ext.getCmp('dhcp_data_error').show(); }
                    else{ Ext.getCmp('dhcp_data_error').hide(); }
                    for(var i in response.list){
                        var date;
                        var temp = response.list[i].split(' ');

                        if(temp[0] === "lease"){ data.push(temp[1]); }
                        else if(temp[0] === "starts"){
                            date = temp[3].split(';');
                            var before_date = temp[2].split('/');
                            var after_date = date[0].split(':');
                            var d = new Date(before_date[0],before_date[1],before_date[2],after_date[0],after_date[1],after_date[2]);
                            d.setHours(d.getHours()+me.timezone);

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

                            data.push(year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec);
                        }
                        else if(temp[0] === "ends"){
                            date = temp[3].split(';');
                            date = temp[3].split(';');
                            var before_date2 = temp[2].split('/');
                            var after_date2 = date[0].split(':');
                            var d2 = new Date(before_date2[0],before_date2[1],before_date2[2],after_date2[0],after_date2[1],after_date2[2]);
                            d2.setHours(d2.getHours()+me.timezone);

                            var year2 = d2.getFullYear();
                            var month2 = d2.getMonth() + 1;
                            if(String(month2).length === 1){ month2 = String(0)+month2; }
                            var day2 = d2.getDate();
                            if(String(day2).length === 1){ day2 = String(0)+day2; }
                            var hour2 = d2.getHours();
                            if(String(hour2).length === 1){ hour2 = String(0)+hour2; }
                            var min2 = d2.getMinutes();
                            if(String(min2).length === 1){ min2 = String(0)+min2; }
                            var sec2 = d2.getSeconds();
                            if(String(sec2).length === 1){ sec2 = String(0)+sec2; }

                            data.push(year2 + "-" + month2 + "-" + day2 + " " + hour2 + ":" + min2 + ":" + sec2);

                        }
                        else if(temp[0] === "hardware"){
                            var address = temp[2].split(';');
                            data.push(address[0]);
                        }
                        else if(temp[0] === "client-hostname"){
                            var name = temp[1].split("\"");
                            data.push(name[1]);
                        }
                        else if(temp[0] === "}"){
                            num++;
                            records.push({
                                "@num" : num,
                                "lease" : data[0],
                                "starts" : data[1],
                                "ends" : data[2],
                                "mac" : data[3],
                                "host" : data[4]
                            });
                            data = [];
                        }
                    }

                    var _params = {

                        basename : Ext.encode('network_dhcp_server')

                    };

                    request_helper.xmlrpc_call_JsonP(

                        'ftuctrl',
                        'getObject',
                        _params,

                        function(response){
                            var inter = [];
                            var temp;

                            inter = Ext.Object.getKeys(response.network.dhcp_server);

                            for(var i in inter){
                                temp = response.network.dhcp_server[inter[i]];

                                if(temp.use === "on"){
                                    for(var j in records){
                                        if(records[j].lease >= temp.start_ip && records[j].lease <= temp.end_ip){ records[j]['interface'] = inter[i]; }
                                    }
                                }
                            }
                            var store = Ext.data.StoreManager.lookup('store_monitor_network_dhcp_list');
                            Ext.getCmp('NFW2_monitor_network_dhcp').dhcp_cnt = records.length;
                            store.loadData(records);
                        }
                    );

                }
            );
        });
    }

});