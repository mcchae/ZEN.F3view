
Ext.define('NFW2.view.NFW2_firewall_policy_white', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.NFW2_firewall_policy_white',

    requires: [
        'NFW2.view.NFW2_firewall_policy_whiteViewModel',
        'Ext.toolbar.Separator',
        'Ext.form.Panel',
        'Ext.form.field.File',
        'Ext.form.field.FileButton',
        'Ext.form.Label',
        'Ext.form.field.Display',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Paging'
    ],

    viewModel: {
        type: 'nfw2_firewall_policy_white'
    },
    cls: 'zen_body',
    id: 'white_black_ip',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'top',
            cls: 'zen_toolbar',
            items: [
                {
                    xtype: 'button',
                    iconCls: 'ic_add',
                    bind: {
                        text: '{add}'
                    },
                    listeners: {
                        click: 'onButtonClick17'
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'ic_del',
                    bind: {
                        text: '{del}'
                    },
                    listeners: {
                        click: 'onButtonClick2'
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'ic_del',
                    bind: {
                        text: '{all_del}'
                    },
                    listeners: {
                        click: 'onButtonClick3'
                    }
                },
                {
                    xtype: 'tbseparator'
                },
                {
                    xtype: 'button',
                    iconCls: 'ic_export',
                    tooltipType: 'title',
                    bind: {
                        tooltip: '{fw_export}'
                    },
                    listeners: {
                        click: 'onButtonClick7'
                    }
                },
                {
                    xtype: 'button',
                    id: 'b_upfile',
                    enableToggle: true,
                    iconCls: 'ic_import',
                    tooltipType: 'title',
                    bind: {
                        tooltip: '{fw_import}'
                    },
                    listeners: {
                        toggle: 'onButtonToggle'
                    }
                },
                {
                    xtype: 'form',
                    hidden: true,
                    id: 'upform_white',
                    margin: 0,
                    bodyPadding: 0,
                    items: [
                        {
                            xtype: 'container',
                            cls: 'dv_pop_inner',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'filefield',
                                    id: 'uploadFile',
                                    margin: '2 0 0 0',
                                    width: 200,
                                    name: 'uploadFile',
                                    buttonConfig: {
                                        xtype: 'filebutton',
                                        cls: 'btn_b',
                                        bind: {
                                            text: '{file_find}'
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    cls: 'btn_b',
                                    margin: '0 0 0 5',
                                    iconCls: 'ft_confirm_icl',
                                    bind: {
                                        text: '{confirm}'
                                    },
                                    listeners: {
                                        click: 'onButtonClick5'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'tbseparator'
                },
                {
                    xtype: 'textfield',
                    validator: function(value) {
                        if(value === ""){ return true; }
                        if(value.indexOf("/") !== -1){
                            var a_ip = value.split("/");
                            if(ValidIPAddress(a_ip[0])===false){ return ValidIP("IP "); }
                            if(a_ip[1].indexOf(".") !== -1){ return ValidIP("Prefix "); }
                            if(a_ip[1] < 8 || a_ip[1] > 32){ return ValidIP("Prefix "); }

                        }else{
                            if(ValidIPAddress(value)===false){ return ValidIP("IP "); }
                        }
                        return true;
                    },
                    id: 'w_search_ipv4',
                    msgTarget: 'none',
                    enableKeyEvents: true,
                    listeners: {
                        errorchange: 'onW_search_ipv4ErrorChange',
                        keydown: 'onW_search_ipv4Keydown',
                        render: 'onW_search_ipv4Render'
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'ic_ser',
                    listeners: {
                        click: 'onButtonClick'
                    }
                },
                {
                    xtype: 'textfield',
                    id: 'w_search_desc_v4',
                    enableKeyEvents: true,
                    listeners: {
                        keydown: 'onW_search_desc_v4Keydown',
                        render: 'onW_search_desc_v4Render'
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'ic_ser',
                    listeners: {
                        click: 'onButtonClick1'
                    }
                },
                {
                    xtype: 'label',
                    cls: 'errorBox',
                    hidden: true,
                    id: 'err_valid',
                    text: 'My Label'
                },
                {
                    xtype: 'tbseparator'
                },
                {
                    xtype: 'button',
                    hidden: true,
                    id: 'w4_reset',
                    iconCls: 'ic_reset',
                    listeners: {
                        click: 'onButtonClick4'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPanelAfterRender'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'container',
                        padding: '0 20 0 0',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'container',
                                flex: 1
                            },
                            {
                                xtype: 'displayfield',
                                id: 'zen_fw_white_disp_total',
                                labelAlign: 'right',
                                labelSeparator: ' ',
                                labelWidth: 90,
                                fieldCls: 'tot_info_bg',
                                bind: {
                                    fieldLabel: '{fw_count}'
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'gridpanel',
                        id: 'w_tbl_listv4',
                        columnLines: true,
                        store: 'store_white_black_ip_list',
                        columns: [
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    if(value){ return value; }

                                    if(store.currentPage === 1){
                                        store.data.items[rowIndex].data.num = rowIndex+1;
                                        return rowIndex + 1;
                                    }else{
                                        store.data.items[rowIndex].data.num = rowIndex + ((store.currentPage-1) *store.pageSize) + 1;
                                        return rowIndex + ((store.currentPage-1) *store.pageSize) + 1;
                                    }
                                },
                                width: 60,
                                align: 'center',
                                dataIndex: 'num',
                                text: 'N'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'date',
                                flex: 1,
                                bind: {
                                    text: '{registered_date}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    return record.data.ip;
                                },
                                dataIndex: 'ip_first',
                                flex: 2,
                                bind: {
                                    text: '{ipv4}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'desc',
                                flex: 2,
                                bind: {
                                    text: '{desc}'
                                }
                            }
                        ],
                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                            selType: 'checkboxmodel',
                            mode: 'SIMPLE'
                        }),
                        dockedItems: [
                            {
                                xtype: 'pagingtoolbar',
                                dock: 'bottom',
                                id: 'w4_paging',
                                width: 360,
                                displayInfo: true,
                                store: 'store_white_black_ip_list'
                            }
                        ],
                        listeners: {
                            celldblclick: 'onW_tbl_listv4CellDblClick'
                        }
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    onButtonClick17: function(button, e, eOpts) {
        var me = this;

        me.onButtonClick4();

        if(me.total_count >= me.count){
            Ext.Msg.alert(__weguardia,ValidMaxCnt(me.count));
            return false;
        }

        var win = Ext.create("NFW2.view.win_white_black_ip",{
            type_wb : "White",
            type : "IPv4"
        });

        win.show();
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = this;

        var tbl = Ext.getCmp("w_tbl_listv4");
        var grid_chk = tbl.getSelectionModel().getSelection();

        if(grid_chk.length === 0){
            Ext.Msg.alert(__weguardia,get_msg('sel_del'));
            return false;
        }

        Ext.MessageBox.confirm(__weguardia,get_msg('conf_del'), function(btn){
            if(btn === "yes"){
                var del = [];
                for(var i=0; i<grid_chk.length; i++){
                    del[i] = grid_chk[i].data._id;
                }

                var _param = {
                    basename: Ext.encode("network_white_black_ip"),
                    ids: Ext.encode(del)
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'delListTypeObj',
                    _param,
                    function(response){
                        me.onButtonClick4();
                    }
                );
            }
        });

    },

    onButtonClick3: function(button, e, eOpts) {
        var me = this;

        Ext.MessageBox.confirm(__weguardia,get_msg('conf_del_all'), function(btn){
            if(btn === "yes"){

                var _param = {
                    basename: Ext.encode("network_white_black_ip"),
                    key: Ext.encode({'type':'white','ip_ver':'ipv4'})
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'delObject',
                    _param,
                    function(response){
                        me.onButtonClick4();
                    }
                );
            }
        });


    },

    onButtonClick7: function(button, e, eOpts) {
        var _store = Ext.data.StoreManager.lookup("store_white_black_ip_list");

        if(_store.getTotalCount() < 1){
            Ext.Msg.alert(__weguardia,__zen('not_data'));
            return false;
        }

        var fileName = "WeGuardia_White_IPv4";

        var date = new Date();

        var month = date.getMonth()+1;

        month = (month < 10)? "0" + month : month;

        var day = date.getDate();

        day = (day < 10)? "0" + day : day;

        var today = date.getFullYear()+""+month+""+day;

        fileName = fileName+"("+today+").xlsx";

        var path = '/mnt/ramdisk/do/F3view/nodeapps/deploy/public/javascripts/attachments/';

        var _params = {
            basename: Ext.encode('network_white_black_ip'),
            filename: Ext.encode(path+fileName),
            cond: Ext.encode({'type':'white','ip_ver':'ipv4'}),
            sort_list: Ext.encode([['ip_first',1],['ip_last',1]])
        };

        request_helper.xmlrpc_call_Ajax_Post(
            'ftuctrl',
            'exportList',
            _params,
            function(response){

                document.location.href = '/fileDownloadCommon?filePath='+ Ext.encode(path)+"&fileName="+Ext.encode(fileName)+"&filePathFlag="+Ext.encode('true');
            }
        );
    },

    onButtonToggle: function(button, pressed, eOpts) {
        if(pressed){
            Ext.getCmp("upform_white").show();
        }else{
            Ext.getCmp("upform_white").hide();
        }
    },

    onButtonClick5: function(button, e, eOpts) {
        var me = this;

        var form = Ext.getCmp('upform_white').getForm();

        if(Ext.getCmp('uploadFile').getValue() === '') return false;
        var path = '/mnt/ramdisk/do/F3view/nodeapps/deploy/public/javascripts/attachments/';

        if(form.isValid()){

            form.submit({
                url: '/fileUploadCommon',
                params: {
                    filePath: Ext.encode(path),
                    delFlag: Ext.encode('true')
                },
                waitMsg: 'Uploading...',
                success: function(fp, o) {

                    var _data = Ext.decode(o.response.responseText);

                    var _params = {
                        basename : Ext.encode('network_white_black_ip'),
                        filename : Ext.encode(path+_data.data[0]),
                        opt: Ext.encode({'type':'white','ip_ver':'ipv4'})
                    };
                    showLoadMask();

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'importList',
                        _params,
                        function(response){

                            hideLoadMask();

                            Ext.getCmp("b_upfile").toggle(false);

                            if(response && response.invalid_list.length > 0){
                                var win = Ext.create('NFW2.view.NFW2_upload_result_win',{
                                    fail_ip : response.invalid_list
                                });
                                win.show();
                            }

                            Ext.data.StoreManager.lookup("store_white_black_ip_list").load(function(response){

                                me.chk_total_count();
                            });
                        }
                    );
                },
                failure : function(fb, o) {
                    Ext.Msg.alert(__weguardia, __zen('file_upload_fail'));
                }
            });
        }
    },

    onW_search_ipv4ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg_label(error,'err_valid');
    },

    onW_search_ipv4Keydown: function(textfield, e, eOpts) {
        if(e.getCharCode() === 13){
            var ip = textfield;

            if(!CheckNotNull(ip.getValue())){ return false; }

            if(ip.getValue().indexOf("/") !== -1){

                var a_ip = ip.getValue().split("/");
                if(ValidIPAddress(a_ip[0])===false){ prt_errMsg_label(ValidIP("IP "), "err_valid"); return false; }
                if(a_ip[1].indexOf(".") !== -1){ prt_errMsg_label(ValidIP("Prefix "), "err_valid"); return false; }
                if(a_ip[1] < 8 || a_ip[1] > 32){ prt_errMsg_label(ValidIP("Prefix "), "err_valid"); return false; }

            }else{

                if(ValidIPAddress(ip.getValue())===false){ prt_errMsg_label(ValidIP("IP "), "err_valid"); return false; }
            }

            Ext.getCmp("err_valid").hide();

            var _store = Ext.data.StoreManager.lookup("store_white_black_ip_list");
            _store.getProxy().url = "/api/ftuctrl/findWhiteBlackIP";
            _store.getProxy().setExtraParam('cond',Ext.encode({'ip_ver':'ipv4','type':'white'}));
            _store.getProxy().setExtraParam('sort_list',Ext.encode([['ip_first',1],['ip_last',1]]));
            _store.getProxy().setExtraParam('search_info',Ext.encode({'ip':ip.getValue()}));
            _store.loadPage(1);

            Ext.getCmp("w4_reset").show();
        }
    },

    onW_search_ipv4Render: function(component, eOpts) {
        component.emptyText = __zen('ipv4');
        component.applyEmptyText();
    },

    onButtonClick: function(button, e, eOpts) {
        var ip = Ext.getCmp("w_search_ipv4");

        if(!CheckNotNull(ip.getValue())){ return false; }

        if(ip.getValue().indexOf("/") !== -1){

            var a_ip = ip.getValue().split("/");
            if(ValidIPAddress(a_ip[0])===false){ prt_errMsg_label(ValidIP("IP "), "err_valid"); return false; }
            if(a_ip[1].indexOf(".") !== -1){ prt_errMsg_label(ValidIP("Prefix "), "err_valid"); return false; }
            if(a_ip[1] < 8 || a_ip[1] > 32){ prt_errMsg_label(ValidIP("Prefix "), "err_valid"); return false; }

        }else{

            if(ValidIPAddress(ip.getValue())===false){ prt_errMsg_label(ValidIP("IP "), "err_valid"); return false; }
        }

        Ext.getCmp("err_valid").hide();

        var _store = Ext.data.StoreManager.lookup("store_white_black_ip_list");
        _store.getProxy().url = "/api/ftuctrl/findWhiteBlackIP";
        _store.getProxy().setExtraParam('cond',Ext.encode({'ip_ver':'ipv4','type':'white'}));
        _store.getProxy().setExtraParam('sort_list',Ext.encode([['ip_first',1],['ip_last',1]]));
        _store.getProxy().setExtraParam('search_info',Ext.encode({'ip':ip.getValue()}));
        _store.loadPage(1);

        Ext.getCmp("w4_reset").show();
    },

    onW_search_desc_v4Keydown: function(textfield, e, eOpts) {
        if(e.getCharCode() === 13){
            var desc = textfield;

            Ext.getCmp("err_valid").hide();

            var _store = Ext.data.StoreManager.lookup('store_white_black_ip_list');
            _store.getProxy().url = "/api/ftuctrl/getObjects";
            _store.getProxy().setExtraParam('basename',Ext.encode('network_white_black_ip'));
            _store.getProxy().setExtraParam('cond',Ext.encode({'ip_ver':'ipv4','type':'white','desc':{'$regex':'.*'+desc.getValue()+'.*','$options':'imxs'}}));
            _store.getProxy().setExtraParam('sort_list',Ext.encode([['ip_first',1],['ip_last',1]]));
            _store.loadPage(1);

            Ext.getCmp("w4_reset").show();
        }
    },

    onW_search_desc_v4Render: function(component, eOpts) {
        component.emptyText = __zen('desc');
        component.applyEmptyText();
    },

    onButtonClick1: function(button, e, eOpts) {
        var desc = Ext.getCmp("w_search_desc_v4");

        if(!CheckNotNull(desc.getValue())){ return false; }

        Ext.getCmp("err_valid").hide();

        var _store = Ext.data.StoreManager.lookup('store_white_black_ip_list');
        _store.getProxy().url = "/api/ftuctrl/getObjects";
        _store.getProxy().setExtraParam('basename',Ext.encode('network_white_black_ip'));
        _store.getProxy().setExtraParam('cond',Ext.encode({'ip_ver':'ipv4','type':'white','desc':{'$regex':'.*'+desc.getValue()+'.*','$options':'imxs'}}));
        _store.getProxy().setExtraParam('sort_list',Ext.encode([['ip_first',1],['ip_last',1]]));
        _store.loadPage(1);

        Ext.getCmp("w4_reset").show();
    },

    onButtonClick4: function(button, e, eOpts) {
        var _store = Ext.data.StoreManager.lookup('store_white_black_ip_list');
        _store.getProxy().url = "/api/ftuctrl/getObjects";
        _store.getProxy().setExtraParam('basename',Ext.encode('network_white_black_ip'));
        _store.getProxy().setExtraParam('cond',Ext.encode({'ip_ver':'ipv4','type':'white'}));
        _store.getProxy().setExtraParam('sort_list',Ext.encode([['ip_first',1],['ip_last',1]]));
        _store.currentPage = 1;
        Ext.getCmp("white_black_ip").store_load();

        Ext.getCmp("w_search_ipv4").reset();
        Ext.getCmp("w_search_desc_v4").reset();

        Ext.getCmp("w4_reset").hide();
    },

    onW_tbl_listv4CellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create("NFW2.view.win_white_black_ip",{
            edit: "edit",
            type_wb : "White",
            type : "IPv4",
            record: record.data
        });

        win.show();
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        var _store = Ext.data.StoreManager.lookup('store_white_black_ip_list');
        _store.getProxy().url = "/api/ftuctrl/getObjects";
        _store.getProxy().setExtraParam('basename',Ext.encode('network_white_black_ip'));
        _store.getProxy().setExtraParam('cond',Ext.encode({'ip_ver':'ipv4','type':'white'}));
        _store.getProxy().setExtraParam('sort_list',Ext.encode([['ip_first',1],['ip_last',1]]));
        _store.currentPage = 1;
        me.store_load();
    },

    fm_reset: function() {
        Ext.getCmp("fm_white_v4").getForm().reset();
    },

    chk_total_count: function(max_count) {
        var me = this;

        var _params = {
            filename: Ext.encode('/proc/ferret/datasheet/white_black_ip')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getFileContent',
            _params,
            function(response){

                me.count = response[0];

                var _params = {
                    basename: Ext.encode("network_white_black_ip"),
                    cond: Ext.encode({'ip_ver':'ipv4'})
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'getObjects',
                    _params,
                    function(response){

                        me.total_count = response.total;
                        if(max_count){
                            Ext.getCmp("zen_fw_white_disp_total").setValue(response.total+'/'+max_count);
                        }
                    }
                );
            }
        );
    },

    store_load: function() {
        var me = Ext.getCmp("white_black_ip");
        var _store = Ext.data.StoreManager.lookup('store_white_black_ip_list');
        _store.load(function(records,options,success){
            var tot = options.getProxy().getReader().rawData.retval;

            me.chk_total_count(tot.max_count);
            hideLoadMask();
            setTimeout(function(){ me.setWidth('100%'); },100);
        });
    }

});