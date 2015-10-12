
Ext.define('NFW2.view.NFW2_user_auth_policy', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_user_auth_policy',

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel'
    ],

    viewModel: {
        $value: null,
        lazy: true
    },
    cls: 'zen_body',
    id: 'NFW2_user_policy',
    defaultListenerScope: true,

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            cls: 'zen_toolbar',
            items: [
                {
                    xtype: 'button',
                    iconCls: 'ic_add',
                    listeners: {
                        click: 'onButtonClick',
                        beforerender: 'onButtonBeforeRender'
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'ic_del',
                    listeners: {
                        click: 'onButtonClick1',
                        beforerender: 'onButtonBeforeRender1'
                    }
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'gridpanel',
            id: 'grid_list',
            margin: '5 0 0 0',
            columnLines: true,
            store: 'store_user_auth_policy_list',
            columns: [
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        store.data.items[rowIndex].data['_num'] = rowIndex+1;
                        return rowIndex + 1;
                    },
                    width: 60,
                    align: 'center',
                    dataIndex: 'string',
                    text: 'N'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'src',
                    flex: 1,
                    listeners: {
                        beforerender: 'onGridcolumnBeforeRender'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'desc',
                    flex: 2,
                    listeners: {
                        beforerender: 'onGridcolumnBeforeRender1'
                    }
                }
            ],
            selModel: {
                selType: 'checkboxmodel'
            },
            listeners: {
                cellclick: 'onGrid_listCellClick',
                celldblclick: 'onGrid_listCellDblClick'
            }
        }
    ],
    listeners: {
        afterrender: 'onPanelAfterRender'
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        var _params = {
            filename: Ext.encode('/proc/ferret/datasheet/ua_policy')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getFileContent',
            _params,
            function(response){

                if(Ext.getCmp("grid_list").getStore().getTotalCount() >= response[0]){
                    Ext.MessageBox.alert(__weguardia,ValidMaxCnt(response[0]));
                    return false;
                }

                var win = Ext.create('NFW2.view.win_user_policy');
                win.show();
            }
        );
    },

    onButtonBeforeRender: function(component, eOpts) {
        component.text = __zen('add');
    },

    onButtonClick1: function(button, e, eOpts) {
        var grid = Ext.getCmp("grid_list");
        var grid_chk = grid.getSelectionModel().getSelection();

        if(grid_chk.length === 0){
            Ext.MessageBox.alert(__weguardia,get_msg("sel_del"));
            return false;
        }else{
            Ext.MessageBox.confirm(__weguardia,get_msg("conf_del"),function(btn){
                if(btn === "yes"){
                    var del = [];
                    for(var i=0; i<grid_chk.length; i++){
                        del[i] = grid_chk[i].data._id;
                    }

                    var key_list = del;

                    var _param = {
                        basename: Ext.encode("user_awareness_auth_policy"),
                        ids: Ext.encode(key_list)
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'delListTypeObj',
                        _param,
                        function(response){

                            if(response.fail_total > 0){

                                var ar_use = [];
                                for(var i in response.fail_list){
                                    if(response.fail_list[i].reason === "in_use")
                                        ar_use.push(response.fail_list[i].name);
                                }
                                var in_use = ar_use.join(" , ");
                                Ext.MessageBox.alert(__weguardia,get_msg('err_objdel')+in_use);
                            }
                            Ext.data.StoreManager.lookup('store_user_auth_policy_list').load();
                        }
                    );
                }
            });

        }
    },

    onButtonBeforeRender1: function(component, eOpts) {
        component.text = __zen('del');
    },

    onGridcolumnBeforeRender: function(component, eOpts) {
        component.text = __zen('src');
    },

    onGridcolumnBeforeRender1: function(component, eOpts) {
        component.text = __zen('desc');
    },

    onGrid_listCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var grid = Ext.getCmp("grid_list");
        var store = grid.getStore();

        if(cellIndex !== 2){ return false; }

        var smode = "src";

        if(record.raw[smode]==='<ul class="disp_obj"><li class="Any">Any</li></ul>'){return false;}

        var tmptd = Ext.get(td).query("ul")[0];

        if(Ext.get(tmptd).query(".inlist_s").length > 0){

            var disp = '<ul class="disp_obj">';
            var len = Ext.get(tmptd).query(".inG").length;
            var tmp_len = (len > 5)?5:len;

            for(var k=0; k<tmp_len; k++){
                disp += Ext.get(tmptd).query(".inG")[k].outerHTML;
            }

            if(len > 5){ disp += '<li class="more"></li>';}

            store.data.items[rowIndex].data[smode] = disp + '</ul>';
            var tmpx = store.data.items[rowIndex];


            store.removeAt(rowIndex);
            store.insert(rowIndex,tmpx);

            return false;

        }

        var _params = {
            basename : Ext.encode('user_awareness_auth_policy'),
            key_info : Ext.encode({'_id':record.raw["_id"], 'item':smode})
        };

        var disp = '<ul class="disp_obj">';

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getPolicyItems',
            _params,
            function(response){

                for(var i in response.list){

                    var otype = response.list[i]["@otype"];

                    disp += '<li class="inG '+otype+'">'+ response.list[i]["#text"] + '</li>';

                    if(otype === "v4"){

                        for(var j in response.list[i].detail){
                            disp += '<li class="inlist_s">'+response.list[i].detail[j]["#text"] + '</li>';
                        }
                    }else if(otype == "v4_group"){

                        for(var j in response.list[i].detail){
                            disp += '<li class="inlist">'+response.list[i].detail[j].name + '</li>';
                            for(var k in response.list[i].detail[j].ip){
                                disp += '<li class="inlist_s">'+response.list[i].detail[j].ip[k]["#text"] + '</li>';
                            }
                        }

                    }

                }

                store.data.items[rowIndex].data[smode] = disp + '</ul>';
                var tmpx = store.data.items[rowIndex];

                store.removeAt(rowIndex);
                store.insert(rowIndex,tmpx);
            }
        );

    },

    onGrid_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var _params = {
            basename: Ext.encode('user_awareness_auth_policy'),
            key: Ext.encode({'_id':record.data._id})
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){

                var src = response.src;
                var n_src = [];
                for(var i=0; i<src.length; i++){
                    n_src.push({ 'cid':src[i]['@cid'], 'otype':src[i]['@otype'], 'name':src[i]['#text'] });
                }
                response.src = n_src;

                var win = Ext.create('NFW2.view.win_user_policy',{
                    'edit': 'edit',
                    'num': record.data['_num'],
                    'record': response
                });
                win.show();
            }
        );
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        Ext.data.StoreManager.lookup("store_user_auth_policy_list").load(function(){
            hideLoadMask();
            setTimeout(function(){ me.setWidth('100%'); },100);
            Ext.data.StoreManager.lookup("store_ip_obj").removeAll();
            Ext.data.StoreManager.lookup("store_tmp_src").removeAll();
        });
    }

});