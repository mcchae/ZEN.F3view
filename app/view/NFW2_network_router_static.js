
Ext.define('NFW2.view.NFW2_network_router_static', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_network_router_static',

    requires: [
        'NFW2.view.NFW2_network_router_staticViewModel',
        'Ext.form.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Separator',
        'Ext.form.field.File',
        'Ext.form.field.FileButton',
        'Ext.button.Split',
        'Ext.menu.Menu',
        'Ext.button.Segmented',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.grid.column.Action'
    ],

    viewModel: {
        type: 'nfw2_network_router_static'
    },
    cls: 'zen_body',
    id: 'NFW2_network_router_static',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onNFW2_network_router_staticAfterRender'
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
                                id: 'static_Btn_con',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'toolbar',
                                        flex: 1,
                                        cls: 'zen_toolbar',
                                        items: [
                                            {
                                                xtype: 'button',
                                                id: 'btn_add',
                                                iconCls: 'ic_add',
                                                bind: {
                                                    text: '{add}'
                                                },
                                                listeners: {
                                                    click: 'onBtn_addClick'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                id: 'btn_del',
                                                iconCls: 'ic_del',
                                                bind: {
                                                    text: '{del}'
                                                },
                                                listeners: {
                                                    click: 'onBtn_delClick'
                                                }
                                            },
                                            {
                                                xtype: 'tbseparator'
                                            },
                                            {
                                                xtype: 'button',
                                                id: 'btn_export',
                                                iconCls: 'ic_export',
                                                tooltipType: 'title',
                                                bind: {
                                                    tooltip: '{fw_export}'
                                                },
                                                listeners: {
                                                    click: 'onBtn_exportClick'
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
                                                    toggle: 'onB_upfileToggle'
                                                }
                                            },
                                            {
                                                xtype: 'form',
                                                hidden: true,
                                                id: 'upform',
                                                margin: 0,
                                                bodyPadding: 0,
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        cls: 'dv_pop_inner',
                                                        layout: {
                                                            type: 'hbox',
                                                            align: 'stretch'
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'filefield',
                                                                id: 'static_upload',
                                                                margin: '2 0 0 0',
                                                                width: 285,
                                                                name: 'uploadFile',
                                                                buttonConfig: {
                                                                    xtype: 'filebutton',
                                                                    cls: 'ft_confirm_s',
                                                                    height: 27,
                                                                    margin: '0 0 2 5',
                                                                    text: '파일 찾기'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'button',
                                                                cls: 'ft_confirm_s',
                                                                height: 27,
                                                                margin: '2 0 2 5',
                                                                iconCls: 'ft_confirm_icl',
                                                                text: '확인',
                                                                listeners: {
                                                                    click: 'onButtonClick'
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'splitbutton',
                                                hidden: true,
                                                id: 'btn_import',
                                                allowDepress: false,
                                                iconCls: 'ic_import',
                                                tooltip: '정책 가져오기',
                                                tooltipType: 'title',
                                                menu: {
                                                    xtype: 'menu',
                                                    shadow: false,
                                                    width: 300
                                                }
                                            },
                                            {
                                                xtype: 'tbseparator'
                                            },
                                            {
                                                xtype: 'segmentedbutton',
                                                items: [
                                                    {
                                                        id: 'btn_ipv4',
                                                        bind: {
                                                            text: '{ipv4}'
                                                        },
                                                        listeners: {
                                                            click: 'onBtn_ipv4Click'
                                                        }
                                                    },
                                                    {
                                                        id: 'btn_ipv6',
                                                        bind: {
                                                            text: '{ipv6}'
                                                        },
                                                        listeners: {
                                                            click: 'onBtn_ipv6Click'
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'gridpanel',
                                cls: 'in_grid',
                                id: 'static_grid',
                                margin: '5 0 0 0',
                                header: false,
                                title: 'My Grid Panel',
                                columnLines: true,
                                store: 'store_router_static_list',
                                columns: [
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'grid_num',
                                        width: 60,
                                        align: 'center',
                                        dataIndex: 'num',
                                        text: 'N'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'grid_dstip',
                                        dataIndex: 'dst_ipmask',
                                        flex: 0.2,
                                        bind: {
                                            text: '{dest_ipmask}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'grid_gate',
                                        dataIndex: 'gateway',
                                        flex: 0.2,
                                        bind: {
                                            text: '{gateway}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'grid_metric',
                                        dataIndex: 'metric',
                                        flex: 0.1,
                                        bind: {
                                            text: '{metric}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'grid_inter',
                                        dataIndex: 'interface',
                                        flex: 0.15,
                                        bind: {
                                            text: '{inter}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return (value)?unixTimeConvert(value,"YMDHM","GMT"):"";
                                        },
                                        width: 130,
                                        dataIndex: 'lastupdate',
                                        bind: {
                                            text: '{last_edit}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'grid_desc',
                                        dataIndex: 'desc',
                                        flex: 0.4,
                                        bind: {
                                            text: '{desc}'
                                        }
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        width: 50,
                                        align: 'center',
                                        bind: {
                                            text: '{use}'
                                        },
                                        items: [
                                            {
                                                getTip: function(v, metadatam, r) {
                                                    return (r.get('use') === 'on')? __zen("toggle_on"):__zen("toggle_off");
                                                },
                                                handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                    var main = Ext.getCmp('NFW2_network_router_static');

                                                    var me = this;

                                                    var use = (record.data.use ==="on")?"off":"on";

                                                    var obj = {
                                                        '_id': record.data.id,
                                                        'use': use
                                                    };

                                                    var _params = {
                                                        basename: Ext.encode("network_router_static"),
                                                        obj : Ext.encode(obj),
                                                        update : Ext.encode(true)
                                                    };

                                                    request_helper.xmlrpc_call_JsonP(
                                                    'ftuctrl',
                                                    'setListTypeObj',
                                                    _params,
                                                    function(response){

                                                        main.get_store();
                                                    }
                                                    );


                                                },
                                                getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                    return (r.get('use') === 'on')? "b_sq_on":"b_sq_off";
                                                }
                                            }
                                        ]
                                    }
                                ],
                                viewConfig: {
                                    getRowClass: function(record, rowIndex, rowParams, store) {
                                        if(record.get("use") === "off"){

                                            Ext.Function.defer(function(){
                                                this.removeRowCls(rowIndex, 'x-grid-row-alt');
                                            },100, this);

                                            return "stOff";
                                        }
                                    }
                                },
                                selModel: Ext.create('Ext.selection.CheckboxModel', {
                                    selType: 'checkboxmodel',
                                    mode: 'SIMPLE'
                                }),
                                listeners: {
                                    celldblclick: 'onStatic_gridCellDblClick'
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

    onBtn_addClick: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_router_static',{
            modal : true
        });

        win.show();
    },

    onBtn_delClick: function(button, e, eOpts) {
        var me = this;

        var tbl = Ext.getCmp("static_grid");
        var tbl_sel = tbl.getSelectionModel().getSelection();

        if(tbl_sel.length === 0){
            Ext.Msg.alert("", get_msg("sel_del"));
            return false;
        }
        else{
            Ext.MessageBox.confirm("", get_msg("conf_del"),function(btn){

                if(btn === "yes"){

                    var del = new Array();
                    for(var i=0; i<tbl_sel.length; i++){
                        del.push(tbl_sel[i].data.id);
                    }

                    showLoadMask();

                    var _params = {
                        basename : Ext.encode('network_router_static'),
                        ids : Ext.encode(del)
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'delListTypeObj',
                        _params,

                        function(response){
                            hideLoadMask();
                            Ext.Msg.show({
                                title: __weguardia,
                                width: 300,
                                msg: get_msg('msg_ok_del'),
                                buttons: Ext.Msg.OK,
                                icon: Ext.window.MessageBox.INFO
                            });
                            //                     me.chk_interface("");
                            me.get_store();
                        }
                    );
                }
            });
        }
    },

    onBtn_exportClick: function(button, e, eOpts) {
        var currentDate = new Date();
        var me = Ext.getCmp('NFW2_network_router_static');

        var fileName = Ext.Date.format(currentDate, 'Ymd')+"_"+currentDate.getHours()+currentDate.getMinutes()+currentDate.getSeconds()+"_WeGuardia_NetworkRouterStatic.xlsx";
        var path = '/mnt/ramdisk/do/F3view/nodeapps/deploy/public/javascripts/attachments/';

        var _params = {
            basename : Ext.encode('network_router_static'),
            filename : Ext.encode(path+fileName),
            ip_ver : Ext.encode(me.ipv)
        };

        showLoadMask();

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'exportNetworkRouterList',
            _params,
            function(response){
                hideLoadMask();
                console.log(response);
                document.location.href = '/fileDownloadCommon?filePath='+ Ext.encode(path)+"&fileName="+Ext.encode(fileName)+"&filePathFlag="+Ext.encode('true');
            }
        );
    },

    onB_upfileToggle: function(button, pressed, eOpts) {
        if(pressed){
            Ext.getCmp("upform").show();
        }else{
            Ext.getCmp("upform").hide();
        }
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        var form = Ext.getCmp('upform').getForm();

        if(Ext.getCmp('static_upload').getValue() === '') return false;
        var path = '/mnt/ramdisk/do/F3view/nodeapps/deploy/public/javascripts/attachments/';



        if(form.isValid()){

            showLoadMask();

            form.submit({
                url: '/fileUploadCommon',
                params: {
                    filePath: Ext.encode(path),
                    delFlag: Ext.encode('true')
                },
                //         waitMsg: 'Uploading...',
                success: function(fp, o) {

                    var _data = JSON.parse(o.response.responseText);

                    console.log(_data.data[0]);

                    var _params = {
                        basename : Ext.encode('network_router_static'),
                        filename : Ext.encode(path+_data.data[0])
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'importNetworkRouterList',
                        _params,
                        function(response){
                            Ext.getCmp("b_upfile").toggle(false);
                            hideLoadMask();

                            if(response.fail_cnt > 0){

                                var arr = [];
                                for(var i in response.fail_list){

                                    arr.push(response.fail_list[i].num + " : " +response.fail_list[i].reason );
                                }
                                var errmsg = arr.join(" </br> ");
                                Ext.Msg.alert("",get_msg('err_upobj')+errmsg);
                            }

                            console.log(response);
                            me.get_store();
                        }

                    );

                },
                failure : function(fb, o) {
                    hideLoadMask();
                    Ext.Msg.alert('', '파일 업로드에 실패하였습니다.');
                }
            });
        }

    },

    onBtn_ipv4Click: function(button, e, eOpts) {
        var me = this;

        var ipv4 = Ext.getCmp('btn_ipv4');
        var ipv6 = Ext.getCmp('btn_ipv6');
        var grid_dstip = Ext.getCmp('grid_dstip');
        var grid = Ext.getCmp('static_grid');

        ipv4.toggle(true);
        ipv6.toggle(false);

        grid_dstip.setText(__zen('dest_ipmask'));

        me.ipv = 'v4';

        var records_v4 = [];

        me.get_store();

    },

    onBtn_ipv6Click: function(button, e, eOpts) {
        var me = this;

        var ipv4 = Ext.getCmp('btn_ipv4');
        var ipv6 = Ext.getCmp('btn_ipv6');
        var grid_dstip = Ext.getCmp('grid_dstip');
        var grid = Ext.getCmp('static_grid');

        ipv6.toggle(true);
        ipv4.toggle(false);

        grid_dstip.setText(__zen('dest_ippre'));

        me.ipv = 'v6';

        var records_v6 = [];

        me.get_store();

    },

    onStatic_gridCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0 || cellIndex === 7){ return false; }

        var win = Ext.create('NFW2.view.win_router_static',{
            edit : "edit",
            modal : true,
            record : record,
            index : Number(rowIndex)+1
        });

        win.show();
    },

    onNFW2_network_router_staticAfterRender: function(component, eOpts) {
        var me = this;
        var grid = Ext.getCmp('static_grid');

        if(Ext.getCmp('btn_ipv4').pressed){
            me.ipv= 'v4';
            Ext.getCmp('btn_ipv4').toggle(true);
        }
        else if(Ext.getCmp('btn_ipv6').pressed){
            me.ipv= 'v6';
            Ext.getCmp('btn_ipv6').toggle(true);
        }
        else{
            me.ipv= 'v4';
            Ext.getCmp('btn_ipv4').toggle(true);
        }

        me.get_store();
    },

    get_store: function() {
        var me = this;

        var records = [];

        if(me.ipv === "v4"){
            var _params = {
                basename : Ext.encode("network_router_static"),
                cond : Ext.encode({'version':'v4'}),
                sort_list : Ext.encode([['route_mask',-1],['route_ip',1]])
            };
        }
        else if(me.ipv === "v6"){
            var _params = {
                basename : Ext.encode("network_router_static"),
                cond : Ext.encode({'version':'v6'}),
                sort_list : Ext.encode([['route_mask',-1],['route_ip',1]])
            };
        }

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObjects',
            _params,

            function(data){
                hideLoadMask();
                setTimeout(function(){ me.setWidth('100%'); },100);
                for(var i in data.list){

                    var num = (Number(i)+1);
                    records.push({
                        num : num,
                        id : data.list[i]._id,
                        interface : data.list[i].interface,
                        desc : data.list[i].desc,
                        use : data.list[i].use,
                        version : data.list[i].version,
                        gateway : data.list[i].gateway,
                        metric : data.list[i].metric,
                        route_ip : data.list[i].route_ip,
                        route_mask : data.list[i].route_mask,
                        dst_ipmask : data.list[i].route_ip + "/" + data.list[i].route_mask,
                        lastupdate : data.list[i].lastupdate
                    });
                }

                var _store = Ext.data.StoreManager.lookup('store_router_static_list');
                _store.loadData(records);
                me.chk_interface("");
            }
        );
    },

    chk_interface: function(val) {
        var me = this;

        var records = [];

        // var _params = {
        //     if_type : Ext.encode('bonding','vlan','bridge'),
        //     data_type : Ext.encode('name'),
        //     option : Ext.encode('all')
        // };

        var use_interface = [];

        var store_use_inter = Ext.data.StoreManager.lookup('store_router_static_list');
        // store_use_inter.getProxy().setExtraParam('basename', Ext.encode('network_router_static'));
        // store_use_inter.load(function(response_inter){
        //     for(var i in response_inter){
        //         use_interface[i] = response_inter[i].data.interface;
        //     }

        //     if(val !== ""){
        //         for(var j in use_interface){
        //             if(val === use_interface[j]){ use_interface.splice(j,1); }
        //         }
        //     }
        // });

        for(var i in store_use_inter.data.items){
            use_interface[i] = store_use_inter.data.items[i].data.interface;
        }

        if(val !== ""){
            for(var j in use_interface){
                if(val === use_interface[j]){ use_interface.splice(j,1); }
            }
        }

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

        //             for(var i in use_interface)
        //             {
        //                 for(var j in records){
        //                     if(use_interface[i] === records[j].name){
        //                         records.splice(j,1);
        //                     }
        //                 }
        //             }

                    var _params = {
                        if_type : Ext.encode('bonding'),
                        data_type : Ext.encode('name'),
                        option : Ext.encode('used')

                    };
                    Ext.data.JsonP.request({

                        url : "/api/ftuctrl/get_lname_list",
                        params : _params,
                        success : function(response){
                            hideLoadMask();
                            if(response.retcode){

                                for(var i in response.retval){

                                    records.push({

                                        name: response.retval[i].name

                                    });

                                }

        //                         for(var i in use_interface)
        //                         {
        //                             for(var j in records){
        //                                 if(use_interface[i] === records[j].name){
        //                                     records.splice(j,1);
        //                                 }
        //                             }
        //                         }

                                var _params = {
                                    if_type : Ext.encode('vlan'),
                                    data_type : Ext.encode('name'),
                                    option : Ext.encode('used')

                                };
                                Ext.data.JsonP.request({

                                    url : "/api/ftuctrl/get_lname_list",
                                    params : _params,
                                    success : function(response){
                                        hideLoadMask();
                                        if(response.retcode){

                                            for(var i in response.retval){

                                                records.push({

                                                    name: response.retval[i].name

                                                });

                                            }

        //                                     for(var i in use_interface)
        //                                     {
        //                                         for(var j in records){
        //                                             if(use_interface[i] === records[j].name){
        //                                                 records.splice(j,1);
        //                                             }
        //                                         }
        //                                     }

                                            var _params = {
                                                if_type : Ext.encode('bridge'),
                                                data_type : Ext.encode('name'),
                                                option : Ext.encode('used')

                                            };
                                            Ext.data.JsonP.request({

                                                url : "/api/ftuctrl/get_lname_list",
                                                params : _params,
                                                success : function(response){
                                                    hideLoadMask();
                                                    if(response.retcode){

                                                        for(var i in response.retval){

                                                            records.push({

                                                                name: response.retval[i].name

                                                            });

                                                        }

        //                                                 for(var i in use_interface)
        //                                                 {
        //                                                     for(var j in records){
        //                                                         if(use_interface[i] === records[j].name){
        //                                                             records.splice(j,1);
        //                                                         }
        //                                                     }
        //                                                 }

                                                        var _store = Ext.data.StoreManager.lookup('store_interface');
                                                        _store.loadData(records);

                                                    }

                                                },
                                                failure : function(response){
                                                    hideLoadMask();
                                                    Ext.Msg.show({
                                                        title : 'Error message',
                                                        msg : 'Error Message',
                                                        width : 300,
                                                        buttons : Ext.Msg.OK,
                                                        icon:Ext.window.MessageBox.INFO
                                                    });

                                                }
                                            });

                                        }

                                    },
                                    failure : function(response){
                                        hideLoadMask();
                                        Ext.Msg.show({
                                            title : 'Error message',
                                            msg : 'Error Message',
                                            width : 300,
                                            buttons : Ext.Msg.OK,
                                            icon:Ext.window.MessageBox.INFO
                                        });

                                    }
                                });

                            }

                        },
                        failure : function(response){
                            hideLoadMask();
                            Ext.Msg.show({
                                title : 'Error message',
                                msg : 'Error Message',
                                width : 300,
                                buttons : Ext.Msg.OK,
                                icon:Ext.window.MessageBox.INFO
                            });
                        }
                    });
                }
            },
            failure : function(response){
                hideLoadMask();
                Ext.Msg.show({
                    title : 'Error message',
                    msg : 'Error Message',
                    width : 300,
                    buttons : Ext.Msg.OK,
                    icon:Ext.window.MessageBox.INFO
                });

            }
        });
    }

});