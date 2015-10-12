
Ext.define('NFW2.view.NFW2_monitor_network_lineBandwidth', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_network_linebandwidth',

    requires: [
        'NFW2.view.NFW2_monitor_network_lineBandwidthViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.button.Segmented',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.view.Table',
        'Ext.toolbar.Paging'
    ],

    viewModel: {
        type: 'nfw2_monitor_network_linebandwidth'
    },
    cls: 'zen_body',
    id: 'NFW2_monitor_network_lineBandwidth',
    defaultListenerScope: true,

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
                                var me = Ext.getCmp('NFW2_monitor_network_lineBandwidth');

                                me.get_bandwidth();
                            },
                            cls: 'dv_timecount',
                            html: 10,
                            id: 'timeout',
                            width: 55
                        },
                        {
                            xtype: 'label',
                            margin: '0 0 0 10',
                            bind: {
                                text: '{sec_10}'
                            }
                        },
                        {
                            xtype: 'cycle',
                            focusCls: 'btn_f',
                            cls: 'sel_monitor',
                            hidden: true,
                            id: 'update_time',
                            width: 80,
                            showText: true,
                            menu: {
                                xtype: 'menu',
                                width: 120,
                                items: [
                                    {
                                        xtype: 'menucheckitem',
                                        text: '10 초',
                                        focusable: true,
                                        checked: true,
                                        listeners: {
                                            checkchange: 'onMenucheckitemCheckChange'
                                        }
                                    },
                                    {
                                        xtype: 'menucheckitem',
                                        text: '15 초',
                                        focusable: true,
                                        listeners: {
                                            checkchange: 'onMenucheckitemCheckChange1'
                                        }
                                    },
                                    {
                                        xtype: 'menucheckitem',
                                        text: '20 초',
                                        focusable: true,
                                        listeners: {
                                            checkchange: 'onMenucheckitemCheckChange2'
                                        }
                                    },
                                    {
                                        xtype: 'menucheckitem',
                                        text: '30 초',
                                        focusable: true,
                                        listeners: {
                                            checkchange: 'onMenucheckitemCheckChange3'
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'label',
                            cls: 'lb_m_none',
                            hidden: true,
                            id: 'line_data_error',
                            margin: '0 0 0 20',
                            bind: {
                                text: '{nodata_monitor_bandwidth}'
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
                                    id: 'update_chk1',
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
                    margin: '5 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'end'
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
                                    flex: 1,
                                    cls: 'errorBox',
                                    hidden: true,
                                    id: 'win_errorbox',
                                    text: 'My Label'
                                }
                            ]
                        },
                        {
                            xtype: 'segmentedbutton',
                            cls: 'seg_monitor',
                            hidden: true,
                            items: [
                                {
                                    text: '서버',
                                    listeners: {
                                        click: 'onButtonClick2'
                                    }
                                },
                                {
                                    enableToggle: true,
                                    pressed: true,
                                    text: '클라이언트',
                                    listeners: {
                                        click: 'onButtonClick1'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value !== true){
                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                    if(!ValidIPAddress(value)){ return get_msg('err_ip'); }
                                    if(value === '0.0.0.0'){ return get_msg('err_form'); }
                                }
                                return true;
                            },
                            id: 'server_ip',
                            margin: '0 0 0 5',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            bind: {
                                fieldLabel: '{measure_server_ip}'
                            },
                            listeners: {
                                errorchange: 'onServer_ipErrorChange',
                                blur: 'onServer_ipBlur'
                            }
                        },
                        {
                            xtype: 'combobox',
                            id: 'interface_com',
                            margin: '0 0 0 5',
                            width: 220,
                            labelSeparator: ' ',
                            labelWidth: 120,
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            store: 'store_interface',
                            valueField: 'name',
                            bind: {
                                fieldLabel: '{inter}'
                            },
                            listeners: {
                                afterrender: 'onInterface_comAfterRender'
                            }
                        },
                        {
                            xtype: 'button',
                            cls: 'btn_b',
                            margin: '0 0 0 5',
                            bind: {
                                text: '{measure_line}'
                            },
                            listeners: {
                                click: 'onButtonClick'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '8 0 10 0',
                    items: [
                        {
                            xtype: 'gridpanel',
                            id: 'grid_bandwidth',
                            header: false,
                            title: 'My Grid Panel',
                            store: 'store_monitor_network_bandwidth',
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    width: 60,
                                    align: 'center',
                                    text: 'N'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    align: 'center',
                                    dataIndex: 'time',
                                    flex: 0.15,
                                    bind: {
                                        text: '{hours}'
                                    }
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
                                    dataIndex: 'upload',
                                    flex: 0.15,
                                    bind: {
                                        text: '{tx}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    align: 'center',
                                    dataIndex: 'download',
                                    flex: 0.15,
                                    bind: {
                                        text: '{rx}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    align: 'center',
                                    dataIndex: 'ip',
                                    flex: 0.15,
                                    bind: {
                                        text: '{measure_server_ip}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    align: 'center',
                                    dataIndex: 'desc',
                                    flex: 0.15,
                                    bind: {
                                        text: '{section}'
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
                                            var main = Ext.getCmp('NFW2_monitor_network_lineBandwidth');

                                            main.get_bandwidth();
                                        }

                                    },
                                    moveFirst: function() {
                                        if (this.fireEvent('beforechange', this, 1) !== false){
                                            //this.store.loadPage(1, me.tbl());
                                            this.store.getProxy().setExtraParam('start',Ext.encode(0));
                                            this.store.currentPage = 1;

                                            var main = Ext.getCmp('NFW2_monitor_network_lineBandwidth');

                                            main.get_bandwidth();
                                            return true;
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
                                                var main = Ext.getCmp('NFW2_monitor_network_lineBandwidth');

                                                main.get_bandwidth();

                                                return true;
                                            }
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
                                                var main = Ext.getCmp('NFW2_monitor_network_lineBandwidth');

                                                main.get_bandwidth();

                                                return true;
                                            }
                                        }
                                        return false;
                                    },
                                    moveLast: function() {
                                        var me = this,
                                            last = me.getPageData().pageCount;

                                        if (me.fireEvent('beforechange', me, last) !== false) {
                                            me.store.getProxy().setExtraParam('start',Ext.encode((last-1)*1000));
                                            me.store.currentPage = last;
                                            var main = Ext.getCmp('NFW2_monitor_network_lineBandwidth');

                                            main.get_bandwidth();

                                            return true;
                                        }
                                        return false;
                                    },
                                    dock: 'bottom',
                                    hidden: true,
                                    id: 'toolbar',
                                    width: 360,
                                    displayInfo: true,
                                    store: 'store_monitor_network_bandwidth'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPanelAfterRender',
        beforedestroy: 'onNFW2_monitor_network_lineBandwidthBeforeDestroy'
    },

    onChk_btnChange: function(button) {
        var me = Ext.getCmp('NFW2_monitor_network_lineBandwidth');

        var timeout = Ext.getCmp('timeout');
        var time = Ext.getCmp('update_time').text.split(' ');

        if(button.state === true){
            me.get_bandwidth();
            monitor_timeout();
        }
        else{
            clearInterval(timeout.interval);
            Ext.getCmp('timeout').setHtml(Number(time[0]));
        }
    },

    onMenucheckitemCheckChange: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(10);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange1: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(15);

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

    onUpdate_chkChange: function(field, newValue, oldValue, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_network_lineBandwidth');

        if(me.btnclick){
            if(newValue){
                if(newValue === "5"){ me.interval = setInterval(me.get_bandwidth, 5000); }
                if(newValue === "10"){ me.interval = setInterval(me.get_bandwidth, 10000); }
                if(newValue === "20"){ me.interval = setInterval(me.get_bandwidth, 20000); }
                if(newValue === "30"){ me.interval = setInterval(me.get_bandwidth, 30000); }
            }
            else{
                me.btnclick = false;
                clearInterval(me.interval);
            }
        }
        else{
            if(newValue){
            }
            else{
                me.btnclick = false;
            }
        }
    },

    onUpdate_timeAfterRender: function(component, eOpts) {
        // var inter = Ext.getCmp('update_time').getStore().data;

        // if(inter.length > 0){
        //     Ext.getCmp("update_time").setValue(inter.items[0].data['time']);
        // }
    },

    onUpdate_timeChange: function(field, newValue, oldValue, eOpts) {
        // var me = Ext.getCmp('NFW2_monitor_network_lineBandwidth');

        // clearInterval(me.interval);

        // if(Ext.getCmp('server_ip').getValue() !== ""){
        //     if(newValue === "5"){ me.interval = setInterval(me.get_bandwidth, 5000); }
        //     if(newValue === "10"){ me.interval = setInterval(me.get_bandwidth, 10000); }
        //     if(newValue === "20"){ me.interval = setInterval(me.get_bandwidth, 20000); }
        //     if(newValue === "30"){ me.interval = setInterval(me.get_bandwidth, 30000); }
        // }
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_network_lineBandwidth');

        Ext.getCmp('server_ip').disable();
        Ext.getCmp('server_ip').reset();
        me.base_type = 'server';
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_network_lineBandwidth');

        Ext.getCmp('server_ip').enable();
        me.base_type = 'client';
    },

    onServer_ipErrorChange: function(labelable, error, eOpts) {
        prt_errMsg_label(error, "win_errorbox");
    },

    onServer_ipBlur: function(component, event, eOpts) {
        Ext.getCmp('server_ip').validateValue(true);
    },

    onInterface_comAfterRender: function(component, eOpts) {
        var records = [];

        var _params = {

            option : Ext.encode('all')

        };

        Ext.data.JsonP.request({

            url : "/api/ftuctrl/get_pname_list",
            params : _params,
            success : function(response){

                if(response.retcode){

                    for(var i in response.retval){

                        records.push({

                            name: response.retval[i].name

                        });

                    }

                    var _store = Ext.data.StoreManager.lookup('store_interface');
                    _store.loadData(records);

                }
                var inter = Ext.getCmp('interface_com').getStore().data;

                if(inter.length > 0){

                    Ext.getCmp("interface_com").setValue(inter.items[0].data['name']);

                }
            },
            failure : function(response){

                Ext.Msg.show({
                    title : 'Error message',
                    msg : 'Error Message',
                    width : 300,
                    buttons : Ext.Msg.OK,
                    icon:Ext.window.MessageBox.INFO
                });

            }
        });
    },

    onButtonClick: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_network_lineBandwidth');
        var ip = Ext.getCmp('server_ip').getValue();
        var inter = Ext.getCmp('interface_com').getValue();

        me.btnclick = true;

        if(Ext.getCmp('server_ip').isValid() === false){ Ext.getCmp('server_ip').focus(); Ext.getCmp('win_errorbox').show(); return false; }
        var func_n;

        if(me.base_type === 'server'){ func_n = 'mod_monitor_bandwidth_client'; }
        else{ func_n = 'mod_monitor_bandwidth_client'; }

        var _params = {
            func_name: Ext.encode(func_n),
            args : Ext.encode([ip, inter])
        };
        showLoadMask();
        request_helper.xmlrpc_call_JsonP(

            'ftuctrl',
            'execKctrlFunc',
            _params,

            function(response){
                var store = Ext.data.StoreManager.lookup('store_monitor_network_bandwidth');
                store.load();
                var _params2 = {
                    func_name: Ext.encode('mod_review_bandwidth')
                };

                request_helper.xmlrpc_call_JsonP(

                    'ftuctrl',
                    'execKctrlFunc',
                    _params2,

                    function(response2){
                        hideLoadMask();
                        var records = [];

                        if(response2 === undefined){ return false; }
                        //                 if(!response2.retcode){
                        //                     return false;
                        //                 }
                        //                 else{
                        if(response2.length === 0){ Ext.getCmp('line_data_error').show(); }
                        else{ Ext.getCmp('line_data_error').hide(); }
                        for(var i in response2){
                            records.push({
                                'time' : response2[i].datetime,
                                'interface' : response2[i].interface_name,
                                'upload' : response2[i].upload,
                                'download' : response2[i].download,
                                'ip' : response2[i].ipserver,
                                'desc' : response2[i].dmc
                            });
                        }

                        var store = Ext.data.StoreManager.lookup('store_monitor_network_bandwidth');
                        store.loadData(records);
                        //                 }
                    }
                );
            }
        );

        // clearInterval(Ext.getCmp('timeout').interval);

        // if(Ext.getCmp('chk_btn').state === true){
        //     //me.get_bandwidth();
        //     if(Ext.getCmp('server_ip').getValue() !== ""){
        //         monitor_timeout();
        //     }
        // }
        // else{
        me.get_bandwidth();
        // }

    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        this.fieldInfo = makeZenTip();
        Ext.getCmp('toolbar').items.items[4].editable = false;
        me.btnclick = false;
        me.base_type = 'client';

        var _params = {
            basename: Ext.encode('network_etc')
        };

        request_helper.xmlrpc_call_JsonP(

            'ftuctrl',
            'getObject',
            _params,

            function(response){
                if(response !== null){
                    if(response.bandwidth_chk === "on"){ me.base_type = 'server'; }
                    else{ me.base_type = 'client'; }
                }
                me.get_bandwidth();
            }
        );
    },

    onNFW2_monitor_network_lineBandwidthBeforeDestroy: function(component, eOpts) {
        var me = this;
        Ext.data.StoreManager.lookup('store_monitor_network_bandwidth').removeAll();
        clearInterval(Ext.getCmp('timeout').interval);
    },

    get_bandwidth: function() {
        var me = Ext.getCmp('NFW2_monitor_network_lineBandwidth');

        var ip = Ext.getCmp('server_ip').getValue();
        var inter = Ext.getCmp('interface_com').getValue();
        var func_n;

        // if(me.base_type === 'server'){
        //     func_n = 'mod_monitor_bandwidth_client';
        //     var _params = {
        //         func_name: Ext.encode(func_n),
        //         args : Ext.encode(' ')
        //     };
        // }
        // else{
        //     func_n = 'mod_monitor_bandwidth_client';
        //     var _params = {
        //         func_name: Ext.encode(func_n),
        //         args : Ext.encode([ip, inter])
        //     };
        // }

        // request_helper.xmlrpc_call_JsonP(

        //     'ftuctrl',
        //     'execKctrlFunc',
        //     _params,

        //     function(response){
        var store = Ext.data.StoreManager.lookup('store_monitor_network_bandwidth');
        store.load(function(){
            var _params2 = {
                func_name: Ext.encode('mod_review_bandwidth')
            };

            request_helper.xmlrpc_call_JsonP(

                'ftuctrl',
                'execKctrlFunc',
                _params2,

                function(response2){
                    hideLoadMask();
                    setTimeout(function(){ me.setWidth('100%'); },100);
                    var records = [];//{'time' : 20150511152058}];

                    if(response2 === undefined){ Ext.getCmp('line_data_error').show(); return false; }
                    Ext.getCmp('line_data_error').hide();
                    //                 if(!response2.retcode){
                    //                     return false;
                    //                 }
                    //                 else{
                    for(var i in response2){
                        records.push({
                            'time' : response2[i].datetime,
                            'interface' : response2[i].interface_name,
                            'upload' : response2[i].upload,
                            'download' : response2[i].download,
                            'ip' : response2[i].ipserver,
                            'desc' : response2[i].dmc
                        });
                    }
                    var store = Ext.data.StoreManager.lookup('store_monitor_network_bandwidth');
                    store.loadData(records);
                    //                 }
                }
            );
            //         });
        }
                  );

    }

});