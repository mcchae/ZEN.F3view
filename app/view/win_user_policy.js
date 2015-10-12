
Ext.define('NFW2.view.win_user_policy', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_user_policy',

    requires: [
        'NFW2.view.win_user_policyViewModel',
        'Ext.form.Panel',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.plugin.DragDrop',
        'Ext.util.Point',
        'Ext.grid.column.Action',
        'Ext.form.field.Text',
        'Ext.toolbar.Toolbar',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.button.Segmented'
    ],

    viewModel: {
        type: 'win_user_policy'
    },
    cls: 'zen_win',
    height: 400,
    id: 'win_user_policy',
    scrollable: true,
    width: 624,
    modal: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            flex: 1,
            itemId: 'fm',
            scrollable: true,
            items: [
                {
                    xtype: 'container',
                    margin: '5 0 0 0',
                    padding: 5,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            cls: 'infw_grid',
                            height: 250,
                            id: 'grid_src',
                            itemId: 'grid_src',
                            width: 260,
                            store: 'store_tmp_src',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return "<ul class='disp_obj'><li class='"+record.data.otype+"'>"+record.data.name+"</li></ul>";
                                    },
                                    dataIndex: 'string',
                                    flex: 1,
                                    bind: {
                                        text: '{src}'
                                    }
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 30,
                                    items: [
                                        {
                                            getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                return "icr_del";
                                            },
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                Ext.getCmp("grid_src").getStore().removeAt(rowIndex);
                                            }
                                        }
                                    ]
                                }
                            ],
                            viewConfig: {
                                plugins: [
                                    {
                                        ptype: 'gridviewdragdrop',
                                        dragGroup: 'grid_src',
                                        dropGroup: 'grid_setobj'
                                    }
                                ],
                                listeners: {
                                    beforedrop: 'onTableBeforeDrop'
                                }
                            },
                            listeners: {
                                cellclick: 'onGrid_srcCellClick'
                            }
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            id: 'con_multi'
                        },
                        {
                            xtype: 'textfield',
                            id: 'desc',
                            margin: '10 0 0 0',
                            labelSeparator: ' ',
                            enforceMaxLength: true,
                            maxLength: 127,
                            bind: {
                                fieldLabel: '{desc}'
                            }
                        }
                    ]
                }
            ],
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
            ]
        }
    ],
    listeners: {
        afterrender: 'onWindowAfterRender',
        resize: 'onWin_user_policyResize'
    },
    dockedItems: [
        {
            xtype: 'panel',
            flex: 1,
            dock: 'right',
            baseCls: 'pnl_sub',
            margin: '5 0 0 0',
            width: 240,
            items: [
                {
                    xtype: 'container',
                    margin: '5 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'cycle',
                            changeHandler: function(button, item) {
                                button.value = item.itemIndex;
                            },
                            cls: 'btn_b',
                            itemId: 'sear_type',
                            width: 75,
                            value: 0,
                            showText: true,
                            menu: {
                                xtype: 'menu',
                                width: 120,
                                items: [
                                    {
                                        xtype: 'menucheckitem',
                                        text: '이름'
                                    },
                                    {
                                        xtype: 'menucheckitem',
                                        text: 'IP'
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'textfield',
                            cls: 's_input',
                            width: 150,
                            enableKeyEvents: true,
                            listeners: {
                                keydown: 'onTextfieldKeydown'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '5 0 5 0',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'segmentedbutton',
                            componentCls: 'zen_seg',
                            id: 'b_segment_sub',
                            items: [
                                {
                                    itemId: 'seg_ip_all',
                                    enableToggle: true,
                                    pressed: true,
                                    text: 'All',
                                    listeners: {
                                        click: 'onSeg_ip_allClick'
                                    }
                                },
                                {
                                    itemId: 'seg_ip_ip',
                                    text: 'IP',
                                    listeners: {
                                        click: 'onSeg_ip_ipClick'
                                    }
                                },
                                {
                                    itemId: 'seg_ip_group',
                                    text: 'Group',
                                    listeners: {
                                        click: 'onSeg_ip_groupClick'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            cls: 'btn_s',
                            itemId: 'btn_add_obj',
                            iconCls: 'ics_add',
                            menu: {
                                xtype: 'menu',
                                id: 'add_obj_inlist',
                                width: 120
                            }
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    cls: 'sub_grid',
                    height: 290,
                    id: 'grid_setobj',
                    itemId: 'grid_setobj',
                    margin: '5 0 0 0',
                    hideHeaders: true,
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return "<ul class='disp_obj'><li class='"+record.data.otype+"'>"+record.data.name+"</li></ul>";
                            },
                            dataIndex: 'name',
                            flex: 1
                        },
                        {
                            xtype: 'actioncolumn',
                            width: 40,
                            dataIndex: 'otype',
                            items: [
                                {
                                    getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                        return (v !== "env")?"icr_detail":"";
                                    },
                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                        var cid = record.data.cid;
                                        var otype = record.data.otype;
                                        var tmptd = Ext.get(row).query("ul");

                                        if(tmptd[1]){
                                            var _store = Ext.getCmp("grid_setobj").getStore();
                                            _store.data.items[rowIndex].data["name"] = record.data.xname;

                                            var tmpx = _store.data.items[rowIndex];
                                            _store.removeAt(rowIndex);
                                            _store.insert(rowIndex,tmpx);
                                        }else{
                                            Ext.getCmp("win_user_policy").get_obj_info(cid,otype,"grid_setobj",rowIndex,(record.data.xname===undefined)?record.data.name:record.data.xname);
                                        }
                                    }
                                },
                                {
                                    getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                        return (v !== "env")?"icr_edit":"";
                                    },
                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                        var otype = record.data.otype;
                                        var loadmode = "store_ip_obj";
                                        var target = "spd_ip";

                                        var pid = "";

                                        switch(otype){
                                            case "v4" 		: pid = "win_ipv4";break;
                                            case "v4_group" : pid = "win_ipv4_group";break;
                                        }

                                        var win = Ext.create('NFW2.view.'+pid,{
                                            edit : "edit",
                                            cid : record.data.cid,
                                            num : '',
                                            modal : true,
                                            loadmode: loadmode,
                                            target: target
                                        });
                                        win.show();
                                    }
                                }
                            ]
                        }
                    ],
                    viewConfig: {
                        copy: true,
                        plugins: [
                            {
                                ptype: 'gridviewdragdrop',
                                dragGroup: 'grid_setobj',
                                dropGroup: 'grid_src',
                                enableDrop: false
                            }
                        ]
                    },
                    listeners: {
                        celldblclick: 'onGrid_setobjCellDblClick'
                    }
                }
            ]
        }
    ],

    onTableBeforeDrop: function(node, data, overModel, dropPosition, dropHandlers, eOpts) {
        var otype = data.records[0].data.otype;
        if(otype === "group"){	return false;	}

        var tmp = Ext.data.StoreManager.lookup("store_tmp_src");

        var chk_dob = tmp.find('cid', data.records[0].data.cid);

        if(chk_dob !== -1){	return false;	}
    },

    onGrid_srcCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var cid = record.data.cid;
        var otype = record.data.otype;
        var tmptd = Ext.get(td).query("ul");

        if(tmptd[1]){
            var _store = Ext.getCmp("grid_src").getStore();
            _store.data.items[rowIndex].data["name"] = record.data.xname;

            var tmpx = _store.data.items[rowIndex];
            _store.removeAt(rowIndex);
            _store.insert(rowIndex,tmpx);
        }else{
            this.get_obj_info(cid,otype,"grid_src",rowIndex,(record.data.xname===undefined)?record.data.name:record.data.xname);
        }
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;
        var count = me.count;

        var grid = Ext.getCmp("grid_src");
        var desc = Ext.getCmp("desc");

        var _store = grid.getStore();

        if(_store.data.items.length > me.m_count){
            Ext.MessageBox.alert(__weguardia,ValidMaxCnt(me.m_count));
            return false;
        }

        prt_errMsg(null,null);

        var tmp_null = {"@cid" :"null", "@otype" : "Any",  "#text" : "Any"};

        var list = [];
        var list_env = [];
        var list_ipv4 = [];
        var list_ipv4g = [];

        if(_store.data.items.length === 0){
            list.push(tmp_null);
        }else{
            for(var i=0; i<_store.data.items.length; i++){
                var items = _store.data.items[i].data;
                var _name = (items.xname)?items.xname:items.name;
                if(items.otype === "env"){
                    list_env.push({ '@cid':items.cid, '@otype':items.otype, '#text':name });
                }else if(items.otype === "ipv4"){
                    list_ipv4.push({ '@cid':items.cid, '@otype':items.otype, '#text':_name });
                }else{
                    list_ipv4g.push({ '@cid':items.cid, '@otype':items.otype, '#text':_name });
                }
            }
            list_env.sort(function(a,b){
                return (a['#text'] < b['#text'])?-1:(a['#text'] > b['#text'])?1:0;
            });
            list_ipv4.sort(function(a,b){
                return (a['#text'] < b['#text'])?-1:(a['#text'] > b['#text'])?1:0;
            });
            list_ipv4g.sort(function(a,b){
                return (a['#text'] < b['#text'])?-1:(a['#text'] > b['#text'])?1:0;
            });

            list = list_env.concat(list_ipv4, list_ipv4g);
        }

        var obj = {
            'desc': desc.getValue(),
            'src': list
        };

        var update = (me.edit==="edit")?true:false;

        if(update){
            obj['_id'] = me.record._id;
        }

        var _params = {
            basename: Ext.encode('user_awareness_auth_policy'),
            obj: Ext.encode(obj),
            update: Ext.encode(update)
        };

        Ext.data.JsonP.request({
            url: "/api/ftuctrl/setListTypeObj",
            params: _params,
            success: function(response){

                if(response.retcode === true){

                    var _store = Ext.data.StoreManager.lookup("store_user_auth_policy_list");

                    _store.load();

                    if(_store.getTotalCount()+1 >= count){
                        me.close();
                        return false;
                    }

                    if(update === true){

                        Ext.Msg.show({
                            title: 'WeGuardia™ ZEN',
                            msg: get_msg("msg_ok_edit"),
                            width: 300,
                            buttons: Ext.Msg.OK,
                            fn: setWinClose,
                            icon: Ext.window.MessageBox.INFO
                        });
                    }else{

                        Ext.Msg.show({
                            title: 'WeGuardia™ ZEN',
                            msg: get_msg("msg_ok_add"),
                            width: 300,
                            buttons: Ext.Msg.YESNO,
                            buttonText:{
                                yes: "계속 추가",
                                no: "닫기"
                            },
                            fn: setWinState,
                            icon: Ext.window.MessageBox.INFO
                        });
                    }
                }else{
                    console.log(response.errcode);
                }
            },
            failrue: function(response){
                console.log("fail");
            }
        });

        function setWinState(btn){
            Ext.getCmp("grid_src").getStore().removeAll();
            if(btn==="no"){
                var win = Ext.WindowManager.getActive();
                if (win) {
                    win.close();
                }
            }else{
                Ext.ComponentQuery.query('container[itemId="fm"]').forEach(function(fm){ fm.getForm().reset(); });
                Ext.ComponentQuery.query('container[cls="fld_msg"]').forEach(function(cls){ cls.removeCls('ic_msg_err'); cls.update(''); });
            }
        }

        function setWinClose(btn){
            Ext.getCmp("grid_src").getStore().removeAll();
            var win = Ext.WindowManager.getActive();
                if (win)
                    win.close();
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        Ext.getCmp("grid_src").getStore(0).removeAll();
        this.close();
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;
        Ext.getCmp("grid_src").getStore().removeAll();

        chk_zenauth(null);

        if(me.edit === "edit"){
            me.setTitle(__zen('user_auth_edit')+" - "+me.num);
            Ext.getCmp("desc").setValue(me.record.desc);
            var obj = {};
            var in_src = [];
            for(var i=0; i<me.record.src.length; i++){
                if(me.record.src[i].otype==="Any"){continue;}
                in_src.push({
                    'name' : me.record.src[i].name,
                    'otype' : me.record.src[i].otype,
                    'cid' : me.record.src[i].cid
                });
            }

            Ext.data.StoreManager.lookup("store_tmp_src").loadData(in_src);
        }else{
            me.setTitle(__zen('user_auth_add'));
        }
        me.make_inlist('src_init');

        var _params = {
            filename: Ext.encode('/proc/ferret/datasheet/ua_policy')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getFileContent',
            _params,
            function(response){

                me.count = response[0];
            }
        );

        var _params = {
            filename: Ext.encode('/proc/ferret/datasheet/ua_policy_src')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getFileContent',
            _params,
            function(response){

                me.m_count = response[0];
            }
        );
    },

    onTextfieldKeydown: function(textfield, e, eOpts) {
        var settype = Ext.ComponentQuery.query('#sear_type')[0].value;
        var _store = "store_ip_obj";

        switch (settype){
            case 0 	: var _params = {type:'name',other:textfield.value}; break;
            case 1	: var _params = {type:'ip',ip:textfield.value}; break;
        }

        if(e.keyCode === 13){
            if(textfield.value===""){
                Ext.data.StoreManager.lookup(_store).getProxy().setExtraParam("search_info",  Ext.encode([]));
            }else{
                Ext.data.StoreManager.lookup(_store).getProxy().setExtraParam("search_info",  Ext.encode(_params));
            }
            Ext.data.StoreManager.lookup(_store).load();
        }
    },

    onSeg_ip_allClick: function(button, e, eOpts) {
        Ext.getCmp('grid_setobj').reconfigure("store_ip_obj");
        Ext.data.StoreManager.lookup('store_ip_obj').getProxy().setExtraParam("object_list",  Ext.encode(["env","ipv4","ipv4_group"]));
        Ext.data.StoreManager.lookup('store_ip_obj').load();
    },

    onSeg_ip_ipClick: function(button, e, eOpts) {
        Ext.getCmp('grid_setobj').reconfigure("store_ip_obj");
        Ext.data.StoreManager.lookup('store_ip_obj').getProxy().setExtraParam("object_list",  Ext.encode(["ipv4"]));
        Ext.data.StoreManager.lookup('store_ip_obj').load();
    },

    onSeg_ip_groupClick: function(button, e, eOpts) {
        Ext.getCmp('grid_setobj').reconfigure("store_ip_obj");
        Ext.data.StoreManager.lookup('store_ip_obj').getProxy().setExtraParam("object_list",  Ext.encode(["ipv4_group"]));
        Ext.data.StoreManager.lookup('store_ip_obj').load();
    },

    onGrid_setobjCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var _tmpstore = "store_tmp_src";

        var tmp = Ext.data.StoreManager.lookup(_tmpstore);

        var chk_dob = tmp.find('cid', record.data.cid);

        if(chk_dob !== -1){	return false;	}

        tmp.add({
            'name' : (record.data.xname===undefined)?record.data.name:record.data.xname,
            'otype' : record.data.otype,
            'cid' : record.data.cid
        });
    },

    onWin_user_policyResize: function(window, width, height, eOpts) {
        var _hei = height-110;
        var _hei2 = height-150;

        Ext.getCmp("grid_setobj").setHeight(_hei);
        Ext.getCmp("grid_src").setHeight(_hei2);
    },

    get_obj_info: function(cid, otype, grid, rowIndex, name) {
        if(otype==="env"){return false;}


        var basename = "";
        var uctrl = "getObject";

        switch(otype){
            case "v4" : basename = "object_ip_address";break;
            case "v4_group" : basename = "object_ip_group"; uctrl = "getObjectMembers";break;
        }

        if(otype === "v4_group"){

            var _params = {
                basename: Ext.encode(basename),
                key_info: Ext.encode({'group_cid':cid})
            };

        }else{

            var _params = {
                basename: Ext.encode("with_cid"),
                key: Ext.encode({ '_kind': basename,'@cid': cid })
            };

        }

        var grid = Ext.getCmp(grid);
        var store = grid.getStore();

        var disp = '<ul class="disp_obj">';

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            uctrl,
            _params,
            function(response){

                disp += name;

                if(otype === "v4"){

                    for(var j in response.ip){
                        disp += '<li class="inlist_s">'+response.ip[j]["#text"] + '</li>';
                    }

                }else if(otype == "v4_group"){

                    for(var j in response.list){
                        disp += '<li class="inlist">'+response.list[j].name + '</li>';
                        for(var k in response.list[j].detail){
                            disp += '<li class="inlist_s">'+response.list[j].detail[k]["#text"] + '</li>';
                        }
                    }

                }

                store.data.items[rowIndex].data["name"] = disp + '</ul>';
                store.data.items[rowIndex].data["xname"] = name;

                var tmpx = store.data.items[rowIndex];

                store.removeAt(rowIndex);
                store.insert(rowIndex,tmpx);
            }
        );
    },

    make_inlist: function(mode) {
        var init = false;
        if(mode==="src_init"){
            mode = "src";
            init = true;
        }

        Ext.getCmp('grid_setobj').reconfigure("store_ip_obj");
        Ext.data.StoreManager.lookup('store_ip_obj').getProxy().setExtraParam("object_list",  Ext.encode(["env","ipv4","ipv4_group"]));
        if(init){
            Ext.data.StoreManager.lookup('store_ip_obj').getProxy().setExtraParam("search_info",  Ext.encode([]));
        }
        Ext.data.StoreManager.lookup('store_ip_obj').load();

        Ext.getCmp('b_segment_sub').getComponent(0).setPressed(true);
        Ext.getCmp('b_segment_sub').getComponent(0).show();
        Ext.getCmp('b_segment_sub').getComponent(1).show();

        var target = "";

        target = "store_tmp_src";
        var data = [{value:'ipv4', text:'IP 주소', pid:'win_ipv4',store:'store_ip_obj'},
                    {value:'ipv4_group', text:'IP 주소 그룹', pid:'win_ipv4_group',store:'store_ip_obj'}
                   ];

        Ext.getCmp('add_obj_inlist').removeAll();

        for (var i = 0; i < data.length; ++i){

            var items =  new Ext.menu.Item({
                text: data[i].text,
                value:data[i].value,
                pid:data[i].pid,
                store:data[i].store,
                handler: function(items){
                    var win = Ext.create('NFW2.view.'+items.pid,{
                        modal : true,
                        loadmode: items.store,
                        target:target
                    });
                    win.show();
                }
            });

            Ext.getCmp('add_obj_inlist').add(items);
        }
    }

});