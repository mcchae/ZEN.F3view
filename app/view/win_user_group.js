
Ext.define('NFW2.view.win_user_group', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_user_group',

    requires: [
        'NFW2.view.win_user_groupViewModel',
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Checkbox',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'win_user_group'
    },
    cls: 'zen_win',
    height: 523,
    id: 'win_usergroup',
    scrollable: true,
    width: 900,
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
            id: 'fm_usergroup',
            itemId: 'fm',
            scrollable: true,
            bodyPadding: 20,
            items: [
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true;}
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                return true;
                            },
                            cls: 'lb_req',
                            id: 'ug_name',
                            width: 400,
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            enforceMaxLength: true,
                            maxLength: 31,
                            bind: {
                                fieldLabel: '{obj_name}'
                            },
                            listeners: {
                                errorchange: 'onNameErrorChange',
                                blur: 'onNameBlur'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: 'ug_desc',
                            width: 400,
                            labelSeparator: ' ',
                            labelWidth: 120,
                            enforceMaxLength: true,
                            maxLength: 127,
                            bind: {
                                fieldLabel: '{desc}'
                            }
                        },
                        {
                            xtype: 'container',
                            style: 'border:1px solid #ccc',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                padding: 5
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    cls: 'btn_b',
                                    iconCls: 'icb_add',
                                    listeners: {
                                        click: 'onButtonClick3'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    id: 'muser_type',
                                    width: 200,
                                    labelSeparator: ' ',
                                    labelWidth: 70,
                                    value: 'name',
                                    editable: false,
                                    displayField: 'name',
                                    valueField: 'val',
                                    bind: {
                                        fieldLabel: '{search_type}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'muser_search',
                                    enableKeyEvents: true,
                                    listeners: {
                                        keydown: 'onMuser_searchKeydown'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    cls: 'btn_b',
                                    margin: '0 0 0 5',
                                    iconCls: 'icb_ser',
                                    listeners: {
                                        click: 'onButtonClick2'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    cls: 'btn_b',
                                    hidden: true,
                                    id: 'muser_reset',
                                    margin: '0 0 0 5',
                                    iconCls: 'icb_reset',
                                    listeners: {
                                        click: 'onButtonClick4'
                                    }
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
                                            id: 'chk_show',
                                            listeners: {
                                                change: 'onCheckboxfieldChange',
                                                beforerender: 'onChk_showBeforeRender'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            cls: 'tbl_fw',
                            id: 'grid_mem',
                            margin: '10 0 0 0',
                            maxHeight: 283,
                            columnLines: true,
                            store: 'store_user_list',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    cellWrap: true,
                                    dataIndex: 'name',
                                    flex: 1,
                                    bind: {
                                        text: '{mem_obj_name}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'user_id',
                                    flex: 1,
                                    bind: {
                                        text: '{user_id}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'user_name',
                                    flex: 1,
                                    bind: {
                                        text: '{user_name}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'user_depart',
                                    flex: 1,
                                    bind: {
                                        text: '{user_depart}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'auth_srv',
                                    flex: 1,
                                    bind: {
                                        text: '{auth_server}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    minWidth: 110,
                                    dataIndex: 'idle_to',
                                    flex: 1,
                                    bind: {
                                        text: '{idle_timeout}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

                                    },
                                    dataIndex: 'restriction',
                                    flex: 1,
                                    bind: {
                                        text: '{limit_access}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'desc',
                                    flex: 1,
                                    bind: {
                                        text: '{desc}'
                                    }
                                }
                            ],
                            viewConfig: {
                                getRowClass: function(record, rowIndex, rowParams, store) {

                                    if(record.data.restriction === "Y"){

                                        Ext.Function.defer(function(){
                                            this.removeRowCls(rowIndex, 'x-grid-row-alt');
                                        },100, this);

                                        return "stOff";
                                    }
                                },
                                trackOver: false
                            },
                            selModel: {
                                selType: 'checkboxmodel',
                                listeners: {
                                    selectionchange: 'onCheckboxModelSelectionChange'
                                }
                            },
                            listeners: {
                                cellclick: 'onGrid_memCellClick',
                                celldblclick: 'onGrid_memCellDblClick'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
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
    listeners: {
        afterrender: 'onWindowAfterRender'
    },

    onNameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, 'fld_msg2');
    },

    onNameBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onButtonClick3: function(button, e, eOpts) {
        var _params = {
            filename: Ext.encode('/proc/ferret/datasheet/user_obj')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getFileContent',
            _params,
            function(response){

                if(Ext.getCmp("grid_mem").getStore().getTotalCount() >= response[0]){
                    Ext.MessageBox.alert("WeGuardia™ ZEN",ValidMaxCnt(response[0]));
                    return false;
                }

                var win = Ext.create('NFW2.view.win_user',{
                    loadmode : 'store_user_list'
                });
                win.show();
            }
        );
    },

    onMuser_searchKeydown: function(textfield, e, eOpts) {
        if(e.getCharCode() === 13){
            var me = Ext.getCmp("win_usergroup");
            var type = Ext.getCmp("muser_type").getValue();
            var search = Ext.getCmp("muser_search");
            me._sel_obj = me.sel_obj;

            if(type === null){ return false; }

            var _store = Ext.data.StoreManager.lookup("store_user_list");
            eval("_store.getProxy().setExtraParam('cond',Ext.encode({'_kind':'object_user','"+type+"':{'$regex':'.*'+search.getValue()+'.*','$options':'imax'}}));");
            Ext.getCmp("win_usergroup").user_load();

            Ext.getCmp("muser_reset").show();
        }
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = Ext.getCmp("win_usergroup");
        var type = Ext.getCmp("muser_type").getValue();
        var search = Ext.getCmp("muser_search");
        me._sel_obj = me.sel_obj;

        if(search.getValue()===""){ return false; }

        var _store = Ext.data.StoreManager.lookup("store_user_list");
        eval("_store.getProxy().setExtraParam('cond',Ext.encode({'_kind':'object_user','"+type+"':{'$regex':'.*'+search.getValue()+'.*','$options':'imax'}}));");
        Ext.getCmp("win_usergroup").user_load();

        Ext.getCmp("muser_reset").show();
    },

    onButtonClick4: function(button, e, eOpts) {
        var me = Ext.getCmp("win_usergroup");
        var _store = Ext.data.StoreManager.lookup("store_user_list");
        _store.getProxy().setExtraParam('cond',Ext.encode({'_kind':'object_user'}));
        Ext.getCmp("win_usergroup").user_load();

        button.hide();
        Ext.getCmp("muser_type").reset();
        Ext.getCmp("muser_search").reset();
    },

    onCheckboxfieldChange: function(field, newValue, oldValue, eOpts) {
        var me = Ext.getCmp("win_usergroup");
        var sel_obj = me.sel_obj;
        var _sel_obj = me._sel_obj;
        var _store = Ext.data.StoreManager.lookup("store_user_list");
        var grid_chk = Ext.getCmp("grid_mem").getSelectionModel().getSelection();

        if(newValue){
            var record = [];

            for(var i in sel_obj){
                record.push(sel_obj[i]);
            }
            for(var l in _sel_obj){
                if(!sel_obj[_sel_obj[l]['@cid']]){
                    record.push(_sel_obj[l]);
                }
            }

            record.sort(function(a,b){
                return (a['name'] < b['name'])?-1:(a['name'] > b['name'])?1:0;
            });
            Ext.getCmp("grid_mem").getStore().loadData(record);
            if(record.length === 0){ return false; }
            Ext.getCmp("grid_mem").selModel.selectAll();
        }else{
            me._sel_obj = {};
            _store.getProxy().setExtraParam('cond',Ext.encode({'_kind':'object_user'}));
            me.user_load();
        }
    },

    onChk_showBeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('user_msg2');
    },

    onCheckboxModelSelectionChange: function(model, selected, eOpts) {
        var me = Ext.getCmp("win_usergroup");
        var sel_obj = {};

        var select = selected;
        for(var i=0; i<select.length; i++){
            sel_obj[select[i].data['@cid']] = select[i].data;
        }
        me.sel_obj = sel_obj;
    },

    onGrid_memCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = Ext.getCmp("win_usergroup");
        var sel_obj = {};

        var select = tableview.selModel.selected;

        for(var i=0; i<select.items.length; i++){
            sel_obj[select.items[i].data['@cid']] = select.items[i].data;
        }
        me.sel_obj = sel_obj;
    },

    onGrid_memCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create('NFW2.view.win_user',{
            'edit': 'edit',
            'cid': record.data['@cid'],
            'num': '',
            'loadmode': 'store_user_list'
        });
        win.show();
    },

    onButtonClick: function(button, e, eOpts) {
        var me = Ext.getCmp("win_usergroup");
        var count = me.count;

        var name = Ext.getCmp("ug_name");
        var desc = Ext.getCmp("ug_desc");
        var sel_obj = me.sel_obj;
        var _sel_obj = me._sel_obj;

        if(name.isValid()===false){ name.focus(); return false; }

        var member = [];
        var grid_chk = Ext.getCmp("grid_mem").getSelectionModel().getSelection();

        var _n = 0;
        for(var i in sel_obj){
            member.push(sel_obj[i]['@cid']);
            _n++;
        }
        for(var l in _sel_obj){
            if(!sel_obj[_sel_obj[l]['@cid']]){
                member.push(_sel_obj[l]['@cid']);
                _n++;
            }
        }

        if(_n === 0){
            prt_errMsg(ValidSelect(__zen('user_group_mem'),1), 'fld_msg2');
            return false;
        }else if(_n > me.mcount){
            prt_errMsg(ValidMaxCnt(me.mcount), 'fld_msg2');
            return false;
        }

        prt_errMsg(null,'fld_msg2');

        var obj = {
            'name': name.getValue(),
            'desc': desc.getValue(),
            '@count': member.length,
            'member': member
        };

        var update = (me.edit==="edit")?true:false;
        var return_cid = (me.edit==="edit")?false:true;

        var key = {
            name: name.getValue(),
            _kind: 'object_user_group'
        };

        if(update){
            key['@cid'] = { '$ne': me.cid };
            obj['@cid'] = me.cid;
        }

        var _params = {
            basename: Ext.encode('object_user_group'),
            obj: Ext.encode(obj),
            id_info: Ext.encode({'fieldname':'@cid'}),
            num_info: Ext.encode({'fieldname':'@num'}),
            update: Ext.encode(update),
            return_cid: Ext.encode(return_cid)
        };

        var _param = {
            basename: Ext.encode('with_cid'),
            key: Ext.encode(key)
        };

        if(me.name !== name.getValue()){

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getObject',
                _param,
                function(response){

                    if(response !== null){
                        prt_errMsg(get_msg('err_objname'),null); name.focus(); return false;
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
                url: "/api/ftuctrl/setObjectWithCid",
                params: _params,
                success: function(response){

                    if(response.retcode === true){

                        if(me.loadmode === undefined){
                            var _store = Ext.data.StoreManager.lookup("store_user_group_list");
                        }else{
                            if(me.target !== undefined){
                                var __cid = (update)?me.cid:response.retval;
                                addFWItem(me.target, update, name.getValue(), "user_group", __cid, member.length);
                            }
                            var _store = Ext.data.StoreManager.lookup(me.loadmode);
                        }

                        _store.load();

                        if(me.loadmode===undefined && _store.getTotalCount()+1 >= count){
                            me.close();
                            return false;
                        }

                        me.sel_obj = {};
                        me._sel_obj = {};
                        if(me.loadmode === undefined){
                            Ext.getCmp("NFW2_usergroup").list_load(me.edit);
                        }

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
                        console.log(response.errcode);
                    }
                },
                failrue: function(response){
                    console.log("fail");
                }
            });
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        this.close();
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = Ext.getCmp("win_usergroup");
        me.sel_obj = {};
        me._sel_obj = {};

        chk_zenauth(null);

        var _params = {
            filename: Ext.encode('/proc/ferret/datasheet/user_obj_grp')
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
            filename: Ext.encode('/proc/ferret/datasheet/user_obj_grp_member')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getFileContent',
            _params,
            function(response){
                me.mcount = response[0];
            }
        );

        var record = Ext.create('Ext.data.Store',{
            data: [
                { 'name':__zen('obj_name'),'val':'name' },
                { 'name':__zen('user_id'),'val':'user_id' },
                { 'name':__zen('user_name'),'val':'user_name' },
                { 'name':__zen('user_depart'),'val':'user_depart' },
                { 'name':__zen('auth_server'),'val':'auth_srv' },
                { 'name':__zen('desc'),'val':'desc' }
            ],
            fields: ['name','val']
        });

        Ext.getCmp("muser_type").bindStore(record);

        if(me.edit === "edit"){
            me.setTitle(__zen('user_group_edit')+" - "+me.num);

            var _params = {
                'basename': Ext.encode('object_user_group'),
                'search_info': Ext.encode({'type':'cid','value':me.cid})
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getObjectList',
                _params,
                function(response){

                    var list = response.list[0];
                    me.list = list;

                    Ext.getCmp("ug_name").setValue(list.name);
                    Ext.getCmp("ug_desc").setValue(list.desc);

                    var obj = {};
                    for(var i=0; i<list.member.length; i++){
                        obj[list.member[i]] = 'true';
                    }

                    me.sel_obj = obj;
                    var _store = Ext.data.StoreManager.lookup("store_user_list");
                    _store.getProxy().setExtraParam('cond',Ext.encode({'_kind':'object_user'}));
                    me.user_load('edit');
                }
            );
        }else{
            me.setTitle(__zen('user_group_add'));
            me.user_load();
        }
    },

    user_load: function(edit) {
        var _store = Ext.data.StoreManager.lookup("store_user_list");
        _store.load({callback: function(records, options, success){
            if(success){
                var me = Ext.getCmp("win_usergroup");

                var sel_obj = me.sel_obj;
                var _sel_obj = me._sel_obj;
                var grid = Ext.getCmp("grid_mem");
                var grid_sel = grid.getSelectionModel();

                var n_record = [];
                for(var i=0; i<grid.getStore().data.items.length; i++){
                    var items = grid.getStore().data.items[i].data;
                    var cid = items['@cid'];

                    if(sel_obj[cid] || _sel_obj[cid]){
                        n_record.push(grid.getStore().data.items[i]);
                        if(sel_obj[cid]){
                            sel_obj[cid] = grid.getStore().data.items[i].data;
                        }else if(_sel_obj[cid]){
                            _sel_obj[cid] = grid.getStore().data.items[i].data;
                        }
                    }
                }
                if(n_record.length === 0){ return false; }
                grid_sel.select(n_record,true,true);
                me.sel_obj = sel_obj;
                me._sel_obj = _sel_obj;

                if(edit){
                    Ext.getCmp("chk_show").setValue(true);
                }
            }
        }});
    }

});