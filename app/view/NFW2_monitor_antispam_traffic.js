
Ext.define('NFW2.view.NFW2_monitor_antispam_traffic', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.toolbar.Paging'
    ],

    id: 'NFW2_monitor_antispam_traffic',
    title: '탐지/차단',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
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
                                            maxWidth: 70,
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
                                                    },
                                                    {
                                                        time: '60'
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
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_antispam',
                                    header: false,
                                    title: 'My Grid Panel',
                                    columnLines: true,
                                    store: 'store_monitor_antispam_list',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            align: 'center',
                                            dataIndex: 'time',
                                            text: '시간',
                                            flex: 0.2
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            align: 'center',
                                            dataIndex: 'ip',
                                            text: 'IP',
                                            flex: 0.15
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            align: 'center',
                                            dataIndex: 'protocol',
                                            text: '프로토콜',
                                            flex: 0.15
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            align: 'center',
                                            dataIndex: 'action',
                                            text: '행위',
                                            flex: 0.1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            align: 'center',
                                            dataIndex: 'desc',
                                            text: '정보',
                                            flex: 0.4
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
                                                    var main = Ext.getCmp('NFW2_monitor_antispam_traffic');

                                                    main.get_antispam();
                                                }

                                            },
                                            moveFirst: function() {
                                                if (this.fireEvent('beforechange', this, 1) !== false){
                                                    //this.store.loadPage(1, me.tbl());
                                                    this.store.getProxy().setExtraParam('start',Ext.encode(0));
                                                    this.store.currentPage = 1;

                                                    var main = Ext.getCmp('NFW2_monitor_antispam_traffic');

                                                    main.get_antispam();
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
                                                    var main = Ext.getCmp('NFW2_monitor_antispam_traffic');

                                                    main.get_antispam();


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
                                                        var main = Ext.getCmp('NFW2_monitor_antispam_traffic');

                                                        main.get_antispam();
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
                                                        var main = Ext.getCmp('NFW2_monitor_antispam_traffic');

                                                        main.get_antispam();

                                                        return true;
                                                    }
                                                }
                                                return false;
                                            },
                                            dock: 'bottom',
                                            id: 'toolbar',
                                            width: 360,
                                            displayInfo: true,
                                            store: 'store_monitor_antispam_list'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onNFW2_monitor_antispamAfterRender,
                    scope: me
                },
                destroy: {
                    fn: me.onNFW2_monitor_antispamDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onUpdate_chkChange: function(field, newValue, oldValue, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_antispam_traffic');

        if(newValue){
            me.get_antispam();
            if(Ext.getCmp('update_time').getValue() === "5"){ me.interval = setInterval(me.get_antispam, 5000); }
            if(Ext.getCmp('update_time').getValue() === "10"){ me.interval = setInterval(me.get_antispam, 10000); }
            if(Ext.getCmp('update_time').getValue() === "20"){ me.interval = setInterval(me.get_antispam, 20000); }
            if(Ext.getCmp('update_time').getValue() === "30"){ me.interval = setInterval(me.get_antispam, 30000); }
            if(Ext.getCmp('update_time').getValue() === "60"){ me.interval = setInterval(me.get_antispam, 60000); }
        }
        else{
            clearInterval(me.interval);
        }
    },

    onUpdate_timeAfterRender: function(component, eOpts) {
        var inter = Ext.getCmp('update_time').getStore().data;

        if(inter.length > 0){
            Ext.getCmp("update_time").setValue(inter.items[1].data['time']);
        }
    },

    onUpdate_timeChange: function(field, newValue, oldValue, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_antispam_traffic');

        clearInterval(me.interval);

        if(Ext.getCmp('update_chk').getValue()){
            if(newValue === "5"){ me.interval = setInterval(me.get_antispam, 5000); }
            if(newValue === "10"){ me.interval = setInterval(me.get_antispam, 10000); }
            if(newValue === "20"){ me.interval = setInterval(me.get_antispam, 20000); }
            if(newValue === "30"){ me.interval = setInterval(me.get_antispam, 30000); }
            if(newValue === "60"){ me.interval = setInterval(me.get_antispam, 60000); }
        }
    },

    onNFW2_monitor_antispamAfterRender: function(component, eOpts) {
        var me = this;
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

        // Ext.getCmp('date_label').setText("최종 수정 시간 : "+year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec);

        // me.get_antispam();
    },

    onNFW2_monitor_antispamDestroy: function(component, eOpts) {
        var me = this;
        Ext.data.StoreManager.lookup('store_monitor_antispam_list').removeAll();
        clearInterval(me.interval);
    },

    get_antispam: function() {
        // Ext.data.StoreManager.lookup('store_monitor_update_time').load();

        var _params = {

            filename: Ext.encode('/etc/ferret/mon/as_monitor'),
            start : Ext.encode(0),
            limit : Ext.encode(100)
        };

        Ext.data.JsonP.request({

            url : "/api/ftuctrl/getFileContent",
            params : _params,
            success : function(response){
                if(!response.retcode){
                    return false;
                }
                else{
                    var records = [];
                    var temp;

                    for(var i = 1;i < response.list.length;i++){
                        temp = response.list[i].split(';');

                        records.push({
                            time : temp[0],
                            ip : temp[1],
                            protocol : temp[2],
                            desc : temp[3]
                        });
                    }
                    var store = Ext.data.StoreManager.lookup('store_monitor_antivirus_list');
                    store.loadData(records);
                }
            },
            failure : function(response){
            }
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
    }

});