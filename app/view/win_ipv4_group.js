
Ext.define('NFW2.view.win_ipv4_group', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_ipv4_group',

    requires: [
        'NFW2.view.win_ipv4_groupViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.plugin.DragDrop',
        'Ext.util.Point',
        'Ext.grid.column.Action',
        'Ext.toolbar.Toolbar',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.selection.CheckboxModel'
    ],

    viewModel: {
        type: 'win_ipv4_group'
    },
    cls: 'zen_win',
    height: 550,
    id: 'win_ipv4_group',
    scrollable: true,
    width: 800,
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
            id: 'fm_ipv4_group',
            scrollable: true,
            bodyPadding: 20,
            title: '',
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
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value === true){ return true; }
                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                return true;
                                            },
                                            cls: 'lb_req',
                                            id: 'gname',
                                            width: 500,
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            msgTarget: 'none',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 31,
                                            minLength: 1,
                                            bind: {
                                                fieldLabel: '{obj_name}'
                                            },
                                            listeners: {
                                                errorchange: 'onTextfieldErrorChange',
                                                blur: 'onGnameBlur'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: 'gdesc',
                                            width: 500,
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            msgTarget: 'none',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 127,
                                            minLength: 1,
                                            bind: {
                                                fieldLabel: '{desc}'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    height: 1,
                                    margin: '5 0 5 0',
                                    style: 'background-color:#c2c2c2',
                                    layout: 'border'
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'gridpanel',
                                            cls: 'infw_grid',
                                            height: 350,
                                            id: 'grid_group',
                                            itemId: 'grid_group',
                                            width: 350,
                                            store: 'store_tmp_group',
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        return "<ul class='disp_obj'><li class='"+record.data.otype+"'>"+record.data.name+"</li></ul>";
                                                    },
                                                    dataIndex: 'name',
                                                    flex: 1,
                                                    bind: {
                                                        text: '{group_member}'
                                                    }
                                                },
                                                {
                                                    xtype: 'actioncolumn',
                                                    width: 30,
                                                    items: [
                                                        {
                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                Ext.getCmp("grid_group").getStore().removeAt(rowIndex);
                                                            },
                                                            getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                                return "icr_del";
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            viewConfig: {
                                                plugins: [
                                                    {
                                                        ptype: 'gridviewdragdrop',
                                                        dragGroup: 'grid_group',
                                                        dropGroup: 'grid_setobj'
                                                    }
                                                ],
                                                listeners: {
                                                    beforedrop: 'onTableBeforeDrop'
                                                }
                                            },
                                            listeners: {
                                                cellclick: 'onGrid_groupCellClick'
                                            }
                                        }
                                    ]
                                }
                            ]
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
                            itemId: 'fld_msg2'
                        },
                        {
                            xtype: 'button',
                            cls: 'ft_confirm',
                            iconCls: 'ft_confirm_icl',
                            bind: {
                                text: '{confirm}'
                            },
                            listeners: {
                                click: 'onButtonClick2'
                            }
                        },
                        {
                            xtype: 'button',
                            cls: 'ft_cancel',
                            bind: {
                                text: '{cancel}'
                            },
                            listeners: {
                                click: 'onButtonClick'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWindowAfterRender',
        close: 'onWindowClose',
        resize: 'onWin_ipv4_groupResize'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
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
                                        flex: 1,
                                        cls: 'btn_b',
                                        itemId: 'sear_type',
                                        width: 75,
                                        value: 0,
                                        showText: true,
                                        menu: {
                                            xtype: 'menu',
                                            width: 120,
                                            items: [
                                                me.processMyCheckItem({
                                                    xtype: 'menucheckitem'
                                                }),
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
                                        margin: '0 5 0 0',
                                        width: 140,
                                        enableKeyEvents: true,
                                        listeners: {
                                            keydown: 'onTextfieldKeydown'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        margin: '0 5 0 0',
                                        items: [
                                            {
                                                xtype: 'button',
                                                cls: 'btn_s',
                                                itemId: 'btn_add_obj',
                                                margin: '4 0 0 0',
                                                iconCls: 'ics_add',
                                                listeners: {
                                                    click: 'onBtn_add_objClick'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'gridpanel',
                                cls: 'sub_grid',
                                id: 'grid_group_setobj',
                                itemId: 'grid_group_setobj',
                                margin: '5 0 0 0',
                                maxHeight: 470,
                                columns: [
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return "<ul class='disp_obj'><li class='"+record.data.otype+"'>"+record.data.name+"</li></ul>";
                                        },
                                        dataIndex: 'name',
                                        flex: 1,
                                        bind: {
                                            text: '{obj_name}'
                                        }
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        width: 40,
                                        items: [
                                            {
                                                getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                    return (v !== "env")?"icr_detail":"";
                                                },
                                                handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                    var me = Ext.getCmp("win_ipv4_group");
                                                    var sel_obj = me.sel_obj;
                                                    var cid = record.data.cid;
                                                    var otype = record.data.otype;
                                                    var tmptd = Ext.get(row).query("ul");

                                                    var _sel = (sel_obj[record.data.cid])?'on':'off';

                                                    if(tmptd[1]){
                                                        var _store = Ext.getCmp("grid_group_setobj").getStore();
                                                        _store.data.items[rowIndex].data["name"] = record.data.xname;

                                                        var tmpx = _store.data.items[rowIndex];
                                                        _store.removeAt(rowIndex);
                                                        _store.insert(rowIndex,tmpx);
                                                        var grid_sel = Ext.getCmp("grid_group_setobj").getSelectionModel();
                                                        if(_sel === 'on')
                                                        grid_sel.select(rowIndex,true);
                                                    }else{
                                                        Ext.getCmp("win_ipv4_group").get_obj_info(cid,otype,"grid_group_setobj",rowIndex,(record.data.xname===undefined)?record.data.name:record.data.xname,_sel);
                                                    }
                                                }
                                            },
                                            {
                                                handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                    var otype = record.data.otype;
                                                    var loadmode = "store_ip_group_obj";
                                                    var target = "spd_ip";

                                                    var pid = "win_ipv4";

                                                    var win = Ext.create('NFW2.view.'+pid,{
                                                        edit : "edit",
                                                        cid : record.data.cid,
                                                        num : '',
                                                        modal : true,
                                                        loadmode: loadmode,
                                                        target: target
                                                    });
                                                    win.show();
                                                },
                                                getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                    return (v !== "env")?"icr_edit":"";
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
                                            dropGroup: 'grid_group',
                                            enableDrop: false
                                        }
                                    ]
                                },
                                listeners: {
                                    celldblclick: 'onGrid_setobjCellDblClick',
                                    cellclick: 'onGrid_group_setobjCellClick'
                                },
                                selModel: {
                                    selType: 'checkboxmodel',
                                    listeners: {
                                        selectionchange: 'onCheckboxModelSelectionChange'
                                    }
                                }
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
        config.text = __zen('name');

        return config;
    },

    onTextfieldErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, 'fld_msg2');
    },

    onGnameBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onTableBeforeDrop: function(node, data, overModel, dropPosition, dropHandlers, eOpts) {
        var _data = [];
        for(var i=0; i<data.records.length; i++){

            var otype = data.records[i].data.otype;

            var tmp = Ext.data.StoreManager.lookup("store_tmp_group");

            var chk_dob = tmp.find('cid', data.records[i].data.cid);

            if(data.records[i].data.xname){
                data.records[i].data.name = data.records[i].data.xname;
            }
            if(chk_dob !== -1){	continue; }
            _data.push(data.records[i]);
        }

        data.records = _data;
    },

    onGrid_groupCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var cid = record.data.cid;
        var otype = record.data.otype;
        var tmptd = Ext.get(td).query("ul");

        if(tmptd[1]){
            var _store = Ext.getCmp("grid_group").getStore();
            _store.data.items[rowIndex].data["name"] = record.data.xname;

            var tmpx = _store.data.items[rowIndex];
            _store.removeAt(rowIndex);
            _store.insert(rowIndex,tmpx);
        }else{
            this.get_obj_info(cid,otype,"grid_group",rowIndex,(record.data.xname===undefined)?record.data.name:record.data.xname);
        }
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = this;
        var m_obj = me.m_obj;

        var _count = (me.loadmode===undefined)?Ext.getCmp("ipv4Group").count:null;

        var name = Ext.getCmp("gname");
        var desc = Ext.getCmp("gdesc");

        var grid = Ext.getCmp("grid_group");
        var _store = grid.getStore();

        if(name.isValid()===false){ name.focus(); return false; }

        if(_store.data.items.length === 0){
            prt_errMsg(ValidSelect(__zen('group_mobj'),1), 'fld_msg2');
            return false;
        }

        prt_errMsg(null,'fld_msg2');

        var mem = [];
        var m_count = 0;

        for(var i=0; i<_store.data.items.length; i++){
            var items = _store.data.items[i].data;
            mem.push(items.cid);
            m_count += m_obj[items.cid];
        }

        if(m_count > me.m_count){
            prt_errMsg(ValidMaxCnt(me.m_count), 'fld_msg2');
            return false;
        }

        var obj = {
            '@cid' : me.cid,
            'name' : name.getValue(),
            'desc' : desc.getValue(),
            'member' : mem
        };

        var update = (me.edit==="edit")?true:false;
        var return_cid = (me.edit==="edit")?false:true;

        var _params = {
            object_ip_group : Ext.encode(obj),
            update_flag : Ext.encode(update),
            return_cid: Ext.encode(return_cid)
        };

        var key = {
            name: name.getValue(),
            _kind: 'object_ip_group'
        };

        if(update){
            key['@cid'] = {
                '$ne': me.cid
            };
        }

        var _param = {
            basename: Ext.encode("with_cid"),
            key: Ext.encode(key)
        };

        if(me.name !== name.getValue()){

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getObject',
                _param,
                function(response){

                    if(response !== null){
                        prt_errMsg(get_msg('err_objname'), 'fld_msg2'); name.focus(); return false;
                    }else{
                        fn_set();
                    }
                }
            );

        }else{
            fn_set();
        }

        function fn_set(){

            Ext.data.JsonP.request({
                url : "/api/ftuctrl/set_object_ip_group",
                params : _params,
                success : function(response){

                    if(response.retcode === true){

                        if(me.loadmode === undefined){
                            var store = Ext.data.StoreManager.lookup("store_object_ipv4_group_list");
                        }else{
                            if(me.target !== undefined){
                                var __cid = (update)?me.cid:response.retval;
                                addFWItem(me.target, update, name.getValue(), "v4_group", __cid, m_count);
                            }
                            var store = Ext.data.StoreManager.lookup(me.loadmode);
                        }

                        store.load(function(records, options, success) {
                            if(me.loadmode === undefined && !me.edit){
                                var tot = options.getProxy().getReader().rawData.retval;
                                Ext.getCmp("disp_ip_group_total").setValue(tot.total+'/'+tot.max_count);
                            }
                        });

                        if(me.loadmode===undefined && store.getTotalCount()+1 >= _count){
                            me.close();
                            return false;
                        }
                        Ext.getCmp("grid_group").getStore().removeAll();

                        if(update === true){

                            Ext.Msg.show({
                                title: __weguardia,
                                msg: get_msg("msg_ok_edit"),
                                width: 300,
                                buttons: Ext.Msg.OK,
                                fn: setWinClose,
                                icon: Ext.window.MessageBox.INFO
                            });
                        }else{

                            Ext.Msg.show({
                                title: __weguardia,
                                msg: get_msg("msg_ok_add"),
                                width: 300,
                                buttons: Ext.Msg.YESNO,
                                buttonText:{
                                    yes: __zen('add_plus'),
                                    no: __zen('close')
                                },
                                fn: setWinState,
                                icon: Ext.window.MessageBox.INFO
                            });
                        }
                    }else{

                        if(response.errcode === 922746896){
                            prt_errMsg(get_msg('msg_max_over'),"fld_msg2");
                            return false;
                        }else if(response.errcode === 922746898){
                            prt_errMsg(get_msg("err_portscan"),"fld_msg2");
                            return false;
                        }else if(response.errcode === 922746900){
                            prt_errMsg(get_msg("err_spoofing"),"fld_msg2");
                            return false;
                        }else{
                            prt_errMsg(response.errmsg,'fld_msg2');
                            return false;
                        }
                    }
                },
                failure: function(response){
                    console.log("fail");
                }
            });
        }
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;
        me.sel_obj = {};

        chk_zenauth(null);

        var _params = {
            filename: Ext.encode('/proc/ferret/datasheet/ip_grp_obj_member')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getFileContent',
            _params,
            function(response){

                me.m_count = response[0];
            }
        );

        if(me.edit === "edit"){

            me.setTitle(__zen('group_edit')+" - "+me.num);

            var _params = {
                'cid': Ext.encode(me.cid)
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'get_object_ip_group',
                _params,
                function(response){

                    Ext.getCmp("gname").setValue(response.name);
                    Ext.getCmp("gdesc").setValue(response.desc);

                    var in_group = [];
                    for(var i in response.member_info){
                        in_group.push({
                            'name' : response.member_info[i].name,
                            'otype' : 'v4',
                            'cid' : response.member_info[i].cid
                        });
                    }
                    Ext.data.StoreManager.lookup("store_tmp_group").loadData(in_group);
                });

        }else{
            me.setTitle(__zen('group_add'));
        }
        me.make_inlist('src_init');

        var _params = {
            basename: Ext.encode('object_ip_address'),
            limit: Ext.encode(null)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObjectList',
            _params,
            function(response){

                var m_obj = {};
                for(var i=0; i<response.list.length; i++){
                    m_obj[response.list[i]['@cid']] = response.list[i]['@count'];
                }
                me.m_obj = m_obj;
            }
        );
    },

    onWindowClose: function(panel, eOpts) {
        Ext.data.StoreManager.lookup("store_tmp_group").removeAll();
    },

    onTextfieldKeydown: function(textfield, e, eOpts) {
        var settype = Ext.ComponentQuery.query('#sear_type')[0].value;
        var _store = "store_ip_group_obj";

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

    onBtn_add_objClick: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_ipv4',{
            modal : true,
            loadmode: 'store_ip_group_obj',
            target:"store_tmp_group"
        });
        win.show();
    },

    onGrid_setobjCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var _tmpstore = "store_tmp_group";

        var tmp = Ext.data.StoreManager.lookup(_tmpstore);

        var chk_dob = tmp.find('cid', record.data.cid);

        if(chk_dob !== -1){	return false;	}

        tmp.add({
            'name' : (record.data.xname===undefined)?record.data.name:record.data.xname,
            'otype' : record.data.otype,
            'cid' : record.data.cid
        });
    },

    onCheckboxModelSelectionChange: function(model, selected, eOpts) {
        var me = Ext.getCmp("win_ipv4_group");

        var sel_obj = {};
        for(var i=0; i<selected.length; i++){
            sel_obj[selected[i].data.cid] = true;
        }

        me.sel_obj = sel_obj;
    },

    onGrid_group_setobjCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = Ext.getCmp("win_ipv4_group");

        var grid_chk = Ext.getCmp("grid_group_setobj").getSelectionModel().getSelection();

        var sel_obj = {};
        for(var i=0; i<grid_chk.length; i++){
            sel_obj[grid_chk[i].data.cid] = true;
        }

        me.sel_obj = sel_obj;
    },

    onWin_ipv4_groupResize: function(window, width, height, eOpts) {
        var _hei1 = height-80;
        var _hei2 = height-200;

        Ext.getCmp("grid_group_setobj").setHeight(_hei1);
        Ext.getCmp("grid_group").setHeight(_hei2);
    },

    get_obj_info: function(cid, otype, grid, rowIndex, name, _sel) {
        var basename = "";
        var uctrl = "getObject";

        switch(otype){
            case "v4" : basename = "object_ip_address";break;
        }

        var _params = {
            basename: Ext.encode("with_cid"),
            key: Ext.encode({ '_kind': basename,'@cid': cid })
        };

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
                }

                store.data.items[rowIndex].data["name"] = disp + '</ul>';
                store.data.items[rowIndex].data["xname"] = name;

                var tmpx = store.data.items[rowIndex];

                store.removeAt(rowIndex);
                store.insert(rowIndex,tmpx);

                var grid_sel = Ext.getCmp("grid_group_setobj").getSelectionModel();
                if(_sel === 'on')
                    grid_sel.select(rowIndex,true);
            }
        );
    },

    make_inlist: function(mode) {
        var init = false;
        if(mode==="src_init"){
            mode = "src";
            init = true;
        }

        Ext.getCmp('grid_group_setobj').reconfigure("store_ip_group_obj");
        Ext.data.StoreManager.lookup('store_ip_group_obj').getProxy().setExtraParam("object_list",  Ext.encode(["ipv4"]));
        if(init){
            Ext.data.StoreManager.lookup('store_ip_group_obj').getProxy().setExtraParam("search_info",  Ext.encode([]));
        }
        Ext.data.StoreManager.lookup('store_ip_group_obj').load();
    }

});