
Ext.define('NFW2.view.win_add_del_signature', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_add_del_signature',

    requires: [
        'NFW2.view.win_add_del_signatureViewModel',
        'Ext.form.Panel',
        'Ext.button.Segmented',
        'Ext.grid.Panel',
        'Ext.grid.column.Check',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.column.Number',
        'Ext.view.Table',
        'Ext.toolbar.Paging',
        'Ext.form.Label',
        'Ext.grid.plugin.BufferedRenderer',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_add_del_signature'
    },
    cls: 'zen_win',
    height: 510,
    id: 'win_add_del_signature',
    minWidth: 600,
    scrollable: true,
    width: 900,
    layout: 'fit',
    title: '시그너처 추가 및 삭제',
    maximizable: true,
    defaultListenerScope: true,

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    cls: 'fld_msg',
                    itemId: 'fld_msg3'
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    id: 'win_add_del_ok',
                    iconCls: 'ft_confirm_icl',
                    text: '확인',
                    listeners: {
                        click: 'onWin_add_del_okClick',
                        blur: 'onWin_add_del_okBlur'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    id: 'win_add_del_cancel',
                    text: '취소',
                    listeners: {
                        click: 'onWin_add_del_cancelClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        maximize: 'onWin_add_del_signatureMaximize',
        restore: 'onWin_add_del_signatureRestore',
        afterrender: {
            fn: 'onWin_add_del_signatureAfterRender',
            single: true
        },
        resize: 'onWin_add_del_signatureResize'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        scrollable: true,
                        bodyPadding: 10,
                        header: false,
                        title: 'My Form',
                        items: [
                            {
                                xtype: 'container',
                                height: 42,
                                id: 'ips_add_del_seg_con',
                                margin: '8 0 0 0',
                                scrollable: {
                                    x: true,
                                    y: false
                                },
                                items: [
                                    {
                                        xtype: 'segmentedbutton',
                                        cls: 'zen_seg',
                                        id: 'ips_add_del_segment',
                                        allowMultiple: true
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                items: [
                                    {
                                        xtype: 'gridpanel',
                                        cls: 'in_grid',
                                        height: 350,
                                        id: 'signature_list',
                                        margin: '5 0 0 0',
                                        scrollable: true,
                                        header: false,
                                        manageHeight: false,
                                        title: 'My Grid Panel',
                                        titleCollapse: true,
                                        columnLines: true,
                                        store: 'store_ips_profile_signature_list',
                                        columns: [
                                            {
                                                xtype: 'checkcolumn',
                                                header: '<div class="x-grid-checkcolumn" style="margin-top:17;">&#160;</div>',
                                                width: 35,
                                                sortable: false,
                                                dataIndex: '_check',
                                                menuDisabled: true,
                                                listeners: {
                                                    checkchange: 'onCheckcolumnCheckChange',
                                                    headerclick: 'onCheckHeaderClick'
                                                }
                                            },
                                            {
                                                xtype: 'rownumberer',
                                                width: 60,
                                                align: 'center',
                                                text: 'N'
                                            },
                                            {
                                                xtype: 'numbercolumn',
                                                width: 80,
                                                align: 'center',
                                                dataIndex: '@fsid',
                                                text: 'FSID',
                                                flex: 0.1,
                                                format: '0'
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var _store = Ext.data.StoreManager.lookup('store_ips_profile_group');

                                                    return _store.data.items[value].data.group_name;
                                                },
                                                minWidth: 130,
                                                align: 'center',
                                                dataIndex: 'group_id',
                                                text: '시그너처 그룹 이름',
                                                flex: 0.17
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return Ext.util.Format.htmlEncode(value);
                                                },
                                                minWidth: 100,
                                                align: 'center',
                                                dataIndex: 'signature_name',
                                                text: '시그너처 이름',
                                                flex: 0.17
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if(value === "high" || value === "low" || value === "normal" || value === "critical"){
                                                        return disp = (value !== '')? '<img src="../images/level_'+ value +'.png" border="0"/>':'';
                                                    }
                                                    return '<img src="../images/level_low.png" border="0"/>';
                                                },
                                                id: 'harzard',
                                                width: 60,
                                                align: 'center',
                                                dataIndex: 'hazard',
                                                text: '위험도',
                                                flex: 0.08
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                width: 130,
                                                align: 'center',
                                                text: '탐지 정보',
                                                flex: 0.12,
                                                columns: [
                                                    {
                                                        xtype: 'gridcolumn',
                                                        width: 70,
                                                        align: 'center',
                                                        dataIndex: 'detection_time',
                                                        text: '시간(초)'
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        width: 50,
                                                        align: 'center',
                                                        dataIndex: 'detection_num',
                                                        text: '횟수'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                width: 130,
                                                align: 'center',
                                                text: '차단 정보',
                                                flex: 0.12,
                                                columns: [
                                                    {
                                                        xtype: 'gridcolumn',
                                                        width: 70,
                                                        align: 'center',
                                                        dataIndex: 'block_time',
                                                        text: '유지(초)'
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            switch(record.data.block_type){
                                                                case 1 : return '1:N';
                                                                case 2 : return 'N:1';
                                                                case 3 : return '1:1';
                                                                case 4 : return '1:1(출발지 포트 가변)';
                                                                default : return 'PacketDrop';
                                                            }

                                                        },
                                                        width: 70,
                                                        align: 'center',
                                                        dataIndex: 'block_type',
                                                        text: '유형'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var store = Ext.data.StoreManager.lookup('store_ips_profile_signature_list');

                                                    for(var i in store.data.items){
                                                        if(store.data.items[i].data['@fsid'] === record.raw['@fsid']){
                                                            return (store.data.items[i].data.action === 'alert')? '탐지':'차단';
                                                        }else{
                                                            return '탐지';
                                                        }
                                                    }
                                                },
                                                hidden: true,
                                                width: 50,
                                                align: 'center',
                                                dataIndex: 'action',
                                                text: '행위',
                                                flex: 0.08
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var store = Ext.data.StoreManager.lookup('store_use_signature');
                                                    var me = this;
                                                    var chk = false;
                                                    var num;

                                                    for(var i=0;i < store.data.items.length;i++){

                                                        //console.log(store.data.items[i].data['@fsid'] +" " +  record.raw['@fsid'])
                                                        if(store.data.items[i].data['@fsid'] === record.raw['@fsid']){
                                                            chk = true;
                                                            num = i;
                                                        }

                                                        if(!chk){
                                                            chk = false;
                                                        }
                                                    }

                                                    if(chk){
                                                        return (store.data.items[num].data.audit === 'on')? '<img src="../images/b_on.png" border="0"/>':'<img src="../images/b_off.png" border="0"/>';
                                                    }
                                                    else{
                                                        return '<img src="../images/b_off.png" border="0"/>';
                                                    }
                                                },
                                                hidden: true,
                                                width: 50,
                                                align: 'center',
                                                dataIndex: 'audit',
                                                text: 'Audit',
                                                flex: 0.08
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var store = Ext.data.StoreManager.lookup('store_use_signature');

                                                    for(var i in store.data.items){
                                                        if(store.data.items[i].data['@fsid'] === record.raw['@fsid']){
                                                            return (store.data.items[i].data.use === "" || store.data.items[i].data.use === 'on')? '<img src="../images/b_on.png" border="0"/>':'<img src="../images/b_off.png" border="0"/>';
                                                        }
                                                    }

                                                    return '<img src="../images/b_on.png" border="0"/>';
                                                },
                                                hidden: true,
                                                width: 50,
                                                align: 'center',
                                                dataIndex: 'use',
                                                text: '사용',
                                                flex: 0.08
                                            }
                                        ],
                                        viewConfig: {
                                            scrollable: {
                                                x: false,
                                                y: true
                                            },
                                            markDirty: false
                                        },
                                        dockedItems: [
                                            {
                                                xtype: 'pagingtoolbar',
                                                doRefresh: function() {
                                                    var me = this,
                                                        current = me.store.currentPage;

                                                    if (me.fireEvent('beforechange', me, current) !== false) {
                                                        me.store.getProxy().setExtraParam('start',Ext.encode((current-1)*1000));
                                                        me.store.currentPage = current;
                                                        showCompLoadMask(Ext.getCmp('win_add_del_signature'));
                                                        me.store.load(function(response){
                                                            hideCompLoadMask(Ext.getCmp('win_add_del_signature'));
                                                            var main = Ext.getCmp('win_add_del_signature');
                                                            var grid_store = Ext.getCmp('signature_list').getStore();
                                                            grid_store.suspendEvents();
                                                            grid_store.each(function(rec){
                                                                for(var i in main.tbl_fsid){
                                                                    if(rec.data['@fsid'] === main.tbl_fsid[i]){ rec.set('_check',true); }
                                                                }
                                                            });
                                                            grid_store.resumeEvents();
                                                            Ext.getCmp('signature_list').getView().refresh();

                                                            var chk_true = 0;
                                                            for(var i in response){
                                                                if(response[i].data._check === true){ chk_true++; }
                                                                if(!response[i].data.ips_profile){ response[i].data.ips_profile = {}; }
                                                            }

                                                            if(chk_true < 1000){ Ext.getCmp('signature_list').columns[0].setText('<div class="x-grid-checkcolumn" style="margin-top:17;">&#160;</div>'); }
                                                            else{ Ext.getCmp('signature_list').columns[0].setText('<div class="x-grid-checkcolumn x-grid-checkcolumn-checked" style="margin-top:17;">&#160;</div>'); }
                                                        });
                                                    }
                                                },
                                                moveLast: function() {
                                                    var me = this,
                                                        last = me.getPageData().pageCount;

                                                    if (me.fireEvent('beforechange', me, last) !== false) {
                                                        me.store.getProxy().setExtraParam('start',Ext.encode((last-1)*1000));
                                                        me.store.currentPage = last;
                                                        showCompLoadMask(Ext.getCmp('win_add_del_signature'));
                                                        me.store.load(function(response){
                                                            hideCompLoadMask(Ext.getCmp('win_add_del_signature'));
                                                            var main = Ext.getCmp('win_add_del_signature');
                                                            var grid_store = Ext.getCmp('signature_list').getStore();
                                                            grid_store.suspendEvents();
                                                            grid_store.each(function(rec){
                                                                for(var i in main.tbl_fsid){
                                                                    if(rec.data['@fsid'] === main.tbl_fsid[i]){ rec.set('_check',true); }
                                                                }
                                                            });
                                                            grid_store.resumeEvents();
                                                            Ext.getCmp('signature_list').getView().refresh();

                                                            var chk_true = 0;
                                                            for(var i in response){
                                                                if(response[i].data._check === true){ chk_true++; }
                                                                if(!response[i].data.ips_profile){ response[i].data.ips_profile = {}; }
                                                            }
                                                            me.store.loadData(response);
                                                            if(chk_true < 1000){ Ext.getCmp('signature_list').columns[0].setText('<div class="x-grid-checkcolumn" style="margin-top:17;">&#160;</div>'); }
                                                            else{ Ext.getCmp('signature_list').columns[0].setText('<div class="x-grid-checkcolumn x-grid-checkcolumn-checked" style="margin-top:17;">&#160;</div>'); }
                                                        });
                                                    }
                                                },
                                                moveNext: function() {
                                                    var me = this,
                                                        total = me.getPageData().pageCount,
                                                        next = me.store.currentPage + 1;

                                                    if (next <= total) {
                                                        if (me.fireEvent('beforechange', me, next) !== false) {
                                                            var main = Ext.getCmp('win_add_del_signature');
                                                            me.store.getProxy().setExtraParam('start',Ext.encode((next-1)*1000));
                                                            me.store.currentPage = next;
                                                            showCompLoadMask(Ext.getCmp('win_add_del_signature'));
                                                            me.store.load(function(response){
                                                                hideCompLoadMask(Ext.getCmp('win_add_del_signature'));
                                                                var grid_store = Ext.getCmp('signature_list').getStore();
                                                                grid_store.suspendEvents();
                                                                grid_store.each(function(rec){
                                                                    for(var i in main.tbl_fsid){
                                                                        if(rec.data['@fsid'] === main.tbl_fsid[i]){ rec.set('_check',true); }
                                                                    }
                                                                });
                                                                grid_store.resumeEvents();
                                                                Ext.getCmp('signature_list').getView().refresh();

                                                                var chk_true = 0;
                                                                for(var i in response){
                                                                    if(response[i].data._check === true){ chk_true++; }
                                                                    if(!response[i].data.ips_profile){ response[i].data.ips_profile = {}; }
                                                                }
                                                                me.store.loadData(response);
                                                                if(chk_true < 1000){ Ext.getCmp('signature_list').columns[0].setText('<div class="x-grid-checkcolumn" style="margin-top:17;">&#160;</div>'); }
                                                                else{ Ext.getCmp('signature_list').columns[0].setText('<div class="x-grid-checkcolumn x-grid-checkcolumn-checked" style="margin-top:17;">&#160;</div>'); }


                                                            });
                                                        }
                                                    }
                                                },
                                                movePrevious: function() {
                                                    var me = this,
                                                        prev = me.store.currentPage - 1;

                                                    if (prev > 0) {
                                                        if (me.fireEvent('beforechange', me, prev) !== false) {
                                                            me.store.getProxy().setExtraParam('start',Ext.encode((prev-1)*1000));
                                                            me.store.currentPage = prev;
                                                            showCompLoadMask(Ext.getCmp('win_add_del_signature'));
                                                            me.store.load(function(response){
                                                                hideCompLoadMask(Ext.getCmp('win_add_del_signature'));
                                                                var main = Ext.getCmp('win_add_del_signature');
                                                                var grid_store = Ext.getCmp('signature_list').getStore();
                                                                grid_store.suspendEvents();
                                                                grid_store.each(function(rec){
                                                                    for(var i in main.tbl_fsid){
                                                                        if(rec.data['@fsid'] === main.tbl_fsid[i]){ rec.set('_check',true); }
                                                                    }
                                                                });
                                                                grid_store.resumeEvents();
                                                                Ext.getCmp('signature_list').getView().refresh();

                                                                var chk_true = 0;
                                                                for(var i in response){
                                                                    if(response[i].data._check === true){ chk_true++; }
                                                                    if(!response[i].data.ips_profile){ response[i].data.ips_profile = {}; }
                                                                }
                                                                me.store.loadData(response);
                                                                if(chk_true < 1000){ Ext.getCmp('signature_list').columns[0].setText('<div class="x-grid-checkcolumn" style="margin-top:17;">&#160;</div>'); }
                                                                else{ Ext.getCmp('signature_list').columns[0].setText('<div class="x-grid-checkcolumn x-grid-checkcolumn-checked" style="margin-top:17;">&#160;</div>'); }
                                                            });
                                                        }
                                                    }
                                                },
                                                moveFirst: function() {
                                                    var me = this;
                                                    if (me.fireEvent('beforechange', me, 1) !== false){
                                                        me.store.getProxy().setExtraParam('start',Ext.encode(0));
                                                        me.store.currentPage = 1;
                                                        showCompLoadMask(Ext.getCmp('win_add_del_signature'));
                                                        me.store.load(function(response){
                                                            hideCompLoadMask(Ext.getCmp('win_add_del_signature'));
                                                            var main = Ext.getCmp('win_add_del_signature');
                                                            var grid_store = Ext.getCmp('signature_list').getStore();
                                                            grid_store.suspendEvents();
                                                            grid_store.each(function(rec){
                                                                for(var i in main.tbl_fsid){
                                                                    if(rec.data['@fsid'] === main.tbl_fsid[i]){ rec.set('_check',true); }
                                                                }
                                                            });
                                                            grid_store.resumeEvents();
                                                            Ext.getCmp('signature_list').getView().refresh();

                                                            var chk_true = 0;
                                                            for(var i in response){
                                                                if(response[i].data._check === true){ chk_true++; }
                                                                if(!response[i].data.ips_profile){ response[i].data.ips_profile = {}; }
                                                            }
                                                            me.store.loadData(response);
                                                            if(chk_true < 1000){ Ext.getCmp('signature_list').columns[0].setText('<div class="x-grid-checkcolumn" style="margin-top:17;">&#160;</div>'); }
                                                            else{ Ext.getCmp('signature_list').columns[0].setText('<div class="x-grid-checkcolumn x-grid-checkcolumn-checked" style="margin-top:17;">&#160;</div>'); }
                                                        });
                                                    }
                                                },
                                                dock: 'bottom',
                                                id: 'page_toolbar2',
                                                width: 360,
                                                displayInfo: true,
                                                store: 'store_ips_profile_signature_list',
                                                listeners: {
                                                    afterrender: {
                                                        fn: 'onPage_toolbar2AfterRender',
                                                        single: true
                                                    }
                                                },
                                                items: [
                                                    {
                                                        xtype: 'label',
                                                        id: 'tbl_chk1',
                                                        text: 'My Label'
                                                    }
                                                ]
                                            }
                                        ],
                                        plugins: [
                                            Ext.create('Ext.grid.plugin.BufferedRenderer', {
                                                leadingBufferZone: 50,
                                                numFromEdge: 10,
                                                scrollToLoadBuffer: 50,
                                                trailingBufferZone: 50
                                            })
                                        ]
                                    }
                                ]
                            }
                        ],
                        listeners: {
                            beforerender: 'onFormBeforeRender'
                        }
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    onCheckcolumnCheckChange: function(checkcolumn, rowIndex, checked, eOpts) {
        var me = this;
        var chk_true = 0;
        var store = Ext.getCmp('signature_list').getStore();

        for(var i in store.data.items){
            if(store.data.items[i].data._check === true){ chk_true++; }
        }

        if(chk_true < store.data.items.length){
            Ext.getCmp('signature_list').columns[0].setText('<div class="x-grid-checkcolumn" style="margin-top:17;">&#160;</div>');
        }
        else{
            Ext.getCmp('signature_list').columns[0].setText('<div class="x-grid-checkcolumn x-grid-checkcolumn-checked" style="margin-top:17;">&#160;</div>');
        }

        if(checked){
            me.total++;
        }
        else{
            me.total--;
        }

        Ext.getCmp('tbl_chk1').setText(me.total + "개 체크 됨");
    },

    onCheckHeaderClick: function(ct, column, e, t, eOpts) {
        var me = this;

        var chk_true = 0;

        for(var i in ct.grid.store.data.items){
            if(ct.grid.store.data.items[i].data._check === true){ chk_true++; }
        }

        if(chk_true < ct.grid.store.data.items.length){
            var grid_store = Ext.getCmp('signature_list').getStore();
            grid_store.suspendEvents();
            grid_store.each(function(rec){
                rec.set('_check',true);
            });
            grid_store.resumeEvents();
            Ext.getCmp('signature_list').columns[0].setText('<div class="x-grid-checkcolumn x-grid-checkcolumn-checked" style="margin-top:17;">&#160;</div>');
            Ext.getCmp('signature_list').getView().refresh();

            me.total = me.total + (ct.grid.store.data.items.length - chk_true);
            Ext.getCmp('tbl_chk1').setText(me.total + "개 체크 됨");
        }
        else{
            var grid_store = Ext.getCmp('signature_list').getStore();
            grid_store.suspendEvents();
            grid_store.each(function(rec){
                rec.set('_check',false);
            });
            grid_store.resumeEvents();
            Ext.getCmp('signature_list').columns[0].setText('<div class="x-grid-checkcolumn" style="margin-top:17;">&#160;</div>');
            Ext.getCmp('signature_list').getView().refresh();
            me.total = me.total - ct.grid.store.data.items.length;
            Ext.getCmp('tbl_chk1').setText(me.total + "개 체크 됨");
        }
    },

    onPage_toolbar2AfterRender: function(component, eOpts) {
        var me = Ext.getCmp('win_add_del_signature');

        component.getEl().on('click', function(eOpts) {
            var splice_chk = 0;
            var _store = Ext.data.StoreManager.lookup('store_ips_profile_signature_list');
            var storePage = Ext.getCmp('page_toolbar2').store.currentPage;

            if(_store.totalCount > me.page_num*1000){
                for(var i = 0;i<1000;i++){
                    for(var k in me.tbl_fsid){
                        if(me.tbl_fsid[k] === _store.data.items[i].data['@fsid']){ me.tbl_fsid.splice(k,1); }
                    }
                }
            }
            else{
                for(var j = 0;j< _store.data.items.length;j++){
                    for(var l in me.tbl_fsid){
                        if(me.tbl_fsid[l] === _store.data.items[j].data['@fsid']){ me.tbl_fsid.splice(l,1); }
                    }
                }
            }

            for(var i in _store.data.items){
                if(_store.data.items[i].data._check === true){
                    me.tbl_fsid.push(_store.data.items[i].data['@fsid']);
                }
            }

            me.page_num = Ext.getCmp('page_toolbar2').store.currentPage;

        }, component);
    },

    onFormBeforeRender: function(component, eOpts) {
        Ext.getCmp('page_toolbar2').items.items[4].editable = false;
        Ext.getCmp('signature_list').view.loadMask = false;
    },

    onWin_add_del_okClick: function(button, e, eOpts) {

        var me = this;
        showCompLoadMask(Ext.getCmp('win_add_ips_profile'));
        var splice_chk = 0;
        var store = Ext.data.StoreManager.lookup('store_ips_profile_signature_list');

        for(var j = 0;j< store.data.items.length;j++){
            for(var l in me.tbl_fsid){
                if(me.tbl_fsid[l] === store.data.items[j].data['@fsid']){ me.tbl_fsid.splice(l,1); }
            }
        }

        var con = [];

        for(var i in me.tbl_fsid){
            con.push(me.tbl_fsid[i]);
        }
        for(var i in store.data.items){
            if(store.data.items[i].data._check === true){
                con.push(store.data.items[i].data['@fsid']);
                me.tbl_fsid.push(store.data.items[i].data['@fsid']);
            }
        }

        if(me.tbl_fsid.length === 0){
            me.set_btn = true;
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg3"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(get_msg('sel_signature'));
            return false;
        }

        store.getProxy().setExtraParam('fsid_list',Ext.encode(con));

        var use_signatures = [];

        for(var i in con){
            if(me.isCC){
                use_signatures.push({
                    '@fsid' : con[i],
                    'action' : "alert",
                    //             'audit' : "off",
                    'use' : "on"
                });
            }
            else{
                use_signatures.push({
                    '@fsid' : con[i],
                    'action' : "alert",
                    'audit' : "off",
                    'use' : "on"
                });
            }
        }


        for(var i in use_signatures){
            for(var j in me.back){
                if(use_signatures[i]['@fsid'] === me.back[j]['@fsid']){
                    if(me.isCC){
                        use_signatures[i].action = me.back[j].action;
                        //             use_signatures[i].audit = me.back[j].audit;
                        use_signatures[i].use = me.back[j].use;
                    }
                    else{
                        use_signatures[i].action = me.back[j].action;
                        use_signatures[i].audit = me.back[j].audit;
                        use_signatures[i].use = me.back[j].use;
                    }
                }
            }
        }

        Ext.getCmp('win_add_ips_profile').edit_fsid = use_signatures;

        var obj = {};

        obj = {
            '@cid' : me.cid,
            'name' : me.p_name,
            'profile_disc' : me.p_disc,
            'profile_id' : me.p_id,
            'use_signatures' : use_signatures
        };

        var _params = {

            basename : Ext.encode('ips_profile'),
            obj : Ext.encode(obj),
            update : Ext.encode(true)
        };
        Ext.getCmp('win_add_del_signature').close();
        request_helper.xmlrpc_call_Ajax_Post(
            'ftuctrl',
            'setListTypeObj',
            _params,

            function(response){
                store.removeAll();
                store.getProxy().url = '/api/ftuctrl/getIPSSigList';
                store.getProxy().setExtraParam('basename',Ext.encode('signature_list'));
                store.getProxy().setExtraParam('fsid_list',Ext.encode(me.tbl_fsid));
                store.getProxy().setExtraParam('display_type',Ext.encode(1));
                store.getProxy().setExtraParam('join_info',Ext.encode({'ex_basename': 'ips_profile', 'name': me.p_name}));
                store.getProxy().setExtraParam('start',Ext.encode(0));
                store.getProxy().setExtraParam('limit',Ext.encode(1000));
                //store.pageSize = parseInt(store.totalCount,10);
                store.currentPage = 1;
                store.load(function(){
                    hideCompLoadMask(Ext.getCmp('win_add_ips_profile'));

                });
            }
        );
    },

    onWin_add_del_okBlur: function(component, event, eOpts) {
        var me = this;

        if(me.set_btn === true){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg3"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
            me.set_btn = false;
        }
    },

    onWin_add_del_cancelClick: function(button, e, eOpts) {
        var me = Ext.getCmp('win_add_del_signature');
        var store = Ext.data.StoreManager.lookup('store_ips_profile_signature_list');

        store.removeAll();
        store.getProxy().url = '/api/ftuctrl/getIPSSigList';
        store.getProxy().setExtraParam('basename',Ext.encode('signature_list'));
        store.getProxy().setExtraParam('profile_id',Ext.encode(me.p_id));
        store.getProxy().setExtraParam('display_type',Ext.encode(1));
        store.getProxy().setExtraParam('join_info',Ext.encode({'ex_basename': 'ips_profile', 'name': me.p_name}));
        store.getProxy().setExtraParam('start',Ext.encode(0));
        store.getProxy().setExtraParam('limit',Ext.encode(1000));
        store.currentPage = 1;
        store.load();
        this.close();
    },

    onWin_add_del_signatureMaximize: function(window, eOpts) {
        Ext.getCmp('signature_list').setHeight(window.height-160);
        Ext.getCmp('signature_list').setWidth(window.width-30);
    },

    onWin_add_del_signatureRestore: function(window, eOpts) {
        Ext.getCmp('signature_list').setHeight(window.height-160);
        Ext.getCmp('signature_list').setWidth(window.width-30);
    },

    onWin_add_del_signatureAfterRender: function(component, eOpts) {
        var me = this;

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'isCC',
            {},
            function(response){
                if(response === true){
                    me.isCC = true;
                }
                else{
                    me.isCC = false;
                }
            }
        );

        me.set_btn = false;
        me.tbl_fsid = [];
        me.tbl_fsid = me.fsid;
        me.before_list = [];
        me.sel = new Array([]);
        me.page_num = 1;
        me.page_data = Ext.data.StoreManager.lookup('store_ips_profile_signature_list').data.items;
        Ext.getCmp('signature_list').setHeight(me.getSize().height-160);
        var _store2 = Ext.data.StoreManager.lookup('store_ips_profile_signature_list');
        _store2.removeAll();
        _store2.getProxy().url = '/api/ftuctrl/getIPSSigList';
        _store2.getProxy().setExtraParam('basename',Ext.encode('signature_list'));
        _store2.getProxy().setExtraParam('profile_id',Ext.encode(me.p_id));
        _store2.getProxy().setExtraParam('display_type',Ext.encode(2));
        _store2.getProxy().setExtraParam('group_id_list',Ext.encode([]));
        _store2.getProxy().setExtraParam('join_info',Ext.encode({'ex_basename': 'ips_profile', 'name': me.p_name}));
        _store2.getProxy().setExtraParam('start',Ext.encode(0));
        _store2.getProxy().setExtraParam('limit',Ext.encode(1000));
        _store2.currentPage = 1;
        showCompLoadMask(Ext.getCmp('win_add_del_signature'));
        _store2.load(function(response){
            hideCompLoadMask(Ext.getCmp('win_add_del_signature'));
            me.count = _store2.totalCount;
            me.page = parseInt(me.count/1000,10)+1;

            var chk_true = 0;
            var temp_chk = [];
            for(var i in response){
                temp_chk.push(response[i].data._check);
                if(response[i].data._check === true){ chk_true++; }
                if(!response[i].data.ips_profile){ response[i].data.ips_profile = {}; }
            }
            _store2.loadData(response);
            if(chk_true < response.length){ Ext.getCmp('signature_list').columns[0].setText('<div class="x-grid-checkcolumn" style="margin-top:17;">&#160;</div>'); }
            else{ Ext.getCmp('signature_list').columns[0].setText('<div class="x-grid-checkcolumn x-grid-checkcolumn-checked" style="margin-top:17;">&#160;</div>'); }
            Ext.getCmp('ips_add_del_seg_con').setAutoScroll(true);
            Ext.getCmp('ips_add_del_seg_con').setWidth(Ext.getCmp('signature_list').getWidth());
        });

        var _store = Ext.data.StoreManager.lookup('store_ips_profile_group');

        var cnt = _store.getCount();

        for(var j=0; j<cnt; j++){

            var groupBtn = {

                xtype: 'button',
                id : 'b_'+ _store.data.items[j].data.id,
                inputValue : _store.data.items[j].data.id,
                text : _store.data.items[j].data.group_name,
                pressedCls : 'tb_btn_press',
                enableToggle : true,
                handler: function (button){
                    fn: me.set_buttonbar(button.inputValue);
                }
            };

            Ext.getCmp('ips_add_del_segment').insert(groupBtn);
            Ext.getCmp('b_'+_store.data.items[j].data.id).toggle(true);
        }

        if(!me.used){
            var sig = Ext.getCmp('win_add_ips_profile').up_tbl;

            me.used = [];
            for(var i=0;i<sig.length;i++){
                me.used.push({
                    "@fsid" : sig[i]
                });
            }

            me.total = sig.length;
            Ext.getCmp('tbl_chk1').setText(me.total + "개 체크 됨");
        }

    },

    onWin_add_del_signatureResize: function(window, width, height, eOpts) {
        Ext.getCmp('signature_list').setHeight(window.height-160);
        Ext.getCmp('signature_list').setWidth(window.width-30);
    },

    set_buttonbar: function(val) {
        var me = this;
        var _store = Ext.data.StoreManager.lookup('store_ips_profile_signature_list');
        var _store_group = Ext.data.StoreManager.lookup('store_ips_profile_group');
        var cnt = Ext.data.StoreManager.lookup('store_ips_profile_group').getCount();
        var tbl = Ext.getCmp("signature_list");
        var tbl_sel = tbl.getSelectionModel().getSelection();
        var _selectList = [];
        var cond = {};
        var chk = 0;
        var remove = false;
        var allchk = false;
        var slchk = 0;
        var splice_chk = 0;
        var group = [];

        for(var i=1; i<cnt; i++){
            if(Ext.getCmp('b_'+_store_group.data.items[i].data.id).pressed === true){
                chk++;
            }
        }
        slchk = 0;
        for(var i=0; i<cnt; i++){
            if(val === 0){

                if(!Ext.getCmp('b_0').pressed){
                    allchk = true;
                }
                else{
                    Ext.getCmp('b_0').toggle(true);

                    for(var k=1; k<cnt; k++){

                        Ext.getCmp('b_'+_store_group.data.items[k].data.id).toggle(true);
                    }
                    if(slchk === 0){
                        for(var j in tbl_sel){
                            if(me.isCC){
                                me.tbl_fsid.push({
                                    '@fsid' : tbl_sel[j].data['@fsid'],
                                    'group_id' : tbl_sel[j].data['group_id'],
                                    //                         'audit' : tbl_sel[j].data['audit'],
                                    'use' : tbl_sel[j].data['use']
                                });
                            }
                            else{
                                me.tbl_fsid.push({
                                    '@fsid' : tbl_sel[j].data['@fsid'],
                                    'group_id' : tbl_sel[j].data['group_id'],
                                    'audit' : tbl_sel[j].data['audit'],
                                    'use' : tbl_sel[j].data['use']
                                });
                            }
                            slchk = 1;
                        }
                    }
                    remove = false;
                    _store.getProxy().setExtraParam('group_id_list',Ext.encode([]));
                }

            }else if(chk === cnt-1){
                Ext.getCmp('b_0').toggle(true);

                for(var k=1; k<cnt; k++){

                    Ext.getCmp('b_'+_store_group.data.items[i].data.id).toggle(true);
                }
                if(slchk === 0){
                    for(var j in tbl_sel){
                        me.tbl_fsid.push({
                            '@fsid' : tbl_sel[j].data['@fsid'],
                            'group_id' : tbl_sel[j].data['group_id']
                        });
                        slchk = 1;
                    }
                }
                _store.getProxy().setExtraParam('group_id_list',Ext.encode([]));
            }
            else{

                Ext.getCmp('b_0').toggle(false);

                if(Ext.getCmp('b_'+_store_group.data.items[i].data.id).pressed){

                    if(Ext.getCmp('b_'+_store_group.data.items[i].data.id).inputValue === null){

                        Ext.getCmp('b_0').toggle(true);

                    }else{

                        _selectList.push(/*{'group_id':*/Ext.getCmp('b_'+_store_group.data.items[i].data.id).inputValue/*}*/);
                        cond = {"$or":_selectList};
                        group.push(Ext.getCmp('b_'+_store_group.data.items[i].data.id).inputValue);
                    }
                }
                if(slchk === 0){
                    if(tbl_sel.length !== 0){
                        for(var j in tbl_sel){
                            me.tbl_fsid.push({
                                '@fsid' : tbl_sel[j].data['@fsid'],
                                'group_id' : tbl_sel[j].data['group_id']
                            });
                        }
                    }
                    slchk = 1;
                }
                if(chk === 0){ remove = true; _store.removeAll(); }
                else{ _store.getProxy().setExtraParam('group_id_list',Ext.encode(group)); }
            }
        }


        //_store.load();

        var dup = me.dup_chk(me.tbl_fsid, JSON.stringify);

        me.tbl_fsid = dup;
        if(_store.data.items.length > 0){
            if(_store.totalCount > me.page_num*1000){
                for(var i = 0;i<1000;i++){
                    for(var k in me.tbl_fsid){
                        if(me.tbl_fsid[k]['@fsid'] === _store.data.items[i].data['@fsid']){ me.tbl_fsid.splice(k,1); }
                    }
                }
            }
            else{
                for(var j = 0;j< _store.data.items.length;j++){
                    for(var l in me.tbl_fsid){
                        if(me.tbl_fsid[l]['@fsid'] === _store.data.items[j].data['@fsid']){ me.tbl_fsid.splice(l,1); }
                    }
                }
            }
        }

        if(tbl_sel.length !== 0){
            for(var j in tbl_sel){
                me.tbl_fsid.push({
                    '@fsid' : tbl_sel[j].data['@fsid'],
                    'group_id' : tbl_sel[j].data['group_id']
                });
            }
        }

        _store.currentPage = 1;

        if(allchk){
            if(me.edit === "edit"){
                Ext.getCmp('b_0').toggle(false);

                for(var k=1; k<cnt; k++){

                    Ext.getCmp('b_'+_store_group.data.items[k].data.id).toggle(false);
                }
                remove = true;
                _store.removeAll();
            }
            else{
                Ext.getCmp('b_0').toggle(false);

                for(var k=1; k<cnt; k++){

                    Ext.getCmp('b_'+_store_group.data.items[k].data.id).toggle(false);
                }
                if(slchk === 0){
                    for(var j in tbl_sel){
                        if(me.isCC){
                            me.tbl_fsid.push({
                                '@fsid' : tbl_sel[j].data['@fsid'],
                                'group_id' : tbl_sel[j].data['group_id'],
                                //                     'audit' : tbl_sel[j].data['audit'],
                                'use' : tbl_sel[j].data['use']
                            });
                        }
                        else{
                            me.tbl_fsid.push({
                                '@fsid' : tbl_sel[j].data['@fsid'],
                                'group_id' : tbl_sel[j].data['group_id'],
                                'audit' : tbl_sel[j].data['audit'],
                                'use' : tbl_sel[j].data['use']
                            });
                        }
                        slchk = 1;
                    }
                }
                remove = true;
                _store.removeAll();
            }
        }

        if(!remove){
            _store.getProxy().setExtraParam('start',Ext.encode(0));
            _store.load(function(response){
                var chk_true = 0;
                for(var k=0; k<response.length; k++){
                    for(var i in me.tbl_fsid){
                        if(me.tbl_fsid[i]['@fsid'] === response[k].data['@fsid']){
                            Ext.getCmp('signature_list').getSelectionModel().select(k, true);
                        }
                    }
                    if(response[k].data._check === true){ chk_true++; }
                }

                if(chk_true < 1000){ Ext.getCmp('signature_list').columns[0].setText('<div class="x-grid-checkcolumn" style="margin-top:17;">&#160;</div>'); }
                else{ Ext.getCmp('signature_list').columns[0].setText('<div class="x-grid-checkcolumn x-grid-checkcolumn-checked" style="margin-top:17;">&#160;</div>'); }
                Ext.getCmp('signature_list').getView().refresh();
            });
        }

        me.before_list = _selectList;
    },

    dup_chk: function(ary, key) {
        var seen = {};
        return ary.filter(function(elem) {
            var k = key(elem);
            return (seen[k] === 1) ? 0 : seen[k] = 1;
        });

    }

});