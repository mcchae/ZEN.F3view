
Ext.define('NFW2.view.NFW2_log_config_dataManage', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_log_config_datamanage',

    requires: [
        'NFW2.view.NFW2_log_config_dataManageViewModel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel'
    ],

    viewModel: {
        type: 'nfw2_log_config_datamanage'
    },
    cls: 'zen_body',
    id: 'NFW2_dataManage',
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
                    bind: {
                        text: '{compression}'
                    },
                    listeners: {
                        click: 'onButtonClick'
                    }
                },
                {
                    xtype: 'button',
                    bind: {
                        text: '{disble_compression}'
                    },
                    listeners: {
                        click: 'onButtonClick1'
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'ic_export',
                    bind: {
                        text: '{download}'
                    },
                    listeners: {
                        click: 'onButtonClick2'
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'ic_del',
                    bind: {
                        text: '{del}'
                    },
                    listeners: {
                        click: 'onButtonClick3'
                    }
                },
                {
                    xtype: 'button',
                    bind: {
                        text: '{sftp_transfer}'
                    },
                    listeners: {
                        click: 'onButtonClick4'
                    }
                }
            ]
        },
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'bottom',
            cls: 'zen_toolbar',
            margin: '10 0 0 0',
            items: [
                {
                    xtype: 'button',
                    bind: {
                        text: '{compression}'
                    },
                    listeners: {
                        click: 'onButtonClick9'
                    }
                },
                {
                    xtype: 'button',
                    bind: {
                        text: '{disble_compression}'
                    },
                    listeners: {
                        click: 'onButtonClick8'
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'ic_export',
                    bind: {
                        text: '{download}'
                    },
                    listeners: {
                        click: 'onButtonClick7'
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'ic_del',
                    bind: {
                        text: '{del}'
                    },
                    listeners: {
                        click: 'onButtonClick6'
                    }
                },
                {
                    xtype: 'button',
                    bind: {
                        text: '{sftp_transfer}'
                    },
                    listeners: {
                        click: 'onButtonClick5'
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
                        xtype: 'panel',
                        flex: 1,
                        animCollapse: false,
                        collapseDirection: 'bottom',
                        collapseFirst: false,
                        collapsed: true,
                        collapsible: true,
                        titleCollapse: true,
                        bind: {
                            title: '{compression_log}'
                        },
                        items: [
                            {
                                xtype: 'gridpanel',
                                id: 'grid_zip',
                                columnLines: true,
                                store: 'store_log_manage_zip_list',
                                columns: [
                                    {
                                        xtype: 'gridcolumn',
                                        width: 60,
                                        align: 'center',
                                        dataIndex: 'num',
                                        text: 'N'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'name',
                                        flex: 1,
                                        bind: {
                                            text: '{file_name}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'logcnt',
                                        flex: 0.2,
                                        bind: {
                                            text: '{log_count}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'size',
                                        flex: 0.2,
                                        bind: {
                                            text: '{file_size}'
                                        }
                                    }
                                ],
                                selModel: Ext.create('Ext.selection.CheckboxModel', {
                                    selType: 'checkboxmodel',
                                    listeners: {
                                        beforeselect: 'onCheckboxModelBeforeSelect'
                                    }
                                })
                            }
                        ],
                        listeners: {
                            expand: 'onPanelExpand1',
                            collapse: 'onPanelCollapse1'
                        }
                    },
                    {
                        xtype: 'panel',
                        flex: 1,
                        margin: '5 0 0 0',
                        animCollapse: false,
                        collapseDirection: 'bottom',
                        collapseFirst: false,
                        collapsed: true,
                        collapsible: true,
                        titleCollapse: true,
                        bind: {
                            title: '{general_log}'
                        },
                        items: [
                            {
                                xtype: 'gridpanel',
                                id: 'grid_unzip',
                                columnLines: true,
                                store: 'store_log_manage_unzip_list',
                                columns: [
                                    {
                                        xtype: 'gridcolumn',
                                        width: 60,
                                        align: 'center',
                                        dataIndex: 'num',
                                        text: 'N'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'name',
                                        flex: 1,
                                        bind: {
                                            text: '{file_name}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'logcnt',
                                        flex: 0.2,
                                        bind: {
                                            text: '{log_count}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'size',
                                        flex: 0.2,
                                        bind: {
                                            text: '{file_size}'
                                        }
                                    }
                                ],
                                selModel: Ext.create('Ext.selection.CheckboxModel', {
                                    selType: 'checkboxmodel',
                                    listeners: {
                                        beforeselect: 'onCheckboxModelSelectionChange1'
                                    }
                                })
                            }
                        ],
                        listeners: {
                            expand: 'onPanelExpand',
                            collapse: 'onPanelCollapse'
                        }
                    },
                    {
                        xtype: 'panel',
                        flex: 1,
                        hidden: true,
                        margin: '5 0 0 0',
                        animCollapse: false,
                        collapseDirection: 'bottom',
                        collapseFirst: false,
                        collapsed: true,
                        collapsible: true,
                        title: '트래픽 트래커 로그',
                        titleCollapse: true,
                        items: [
                            {
                                xtype: 'gridpanel',
                                columns: [
                                    {
                                        xtype: 'gridcolumn',
                                        width: 60,
                                        dataIndex: 'string',
                                        text: 'N'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'string',
                                        text: '파일 이름',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'string',
                                        text: '로그 개수',
                                        flex: 0.2
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'string',
                                        text: '파일 크기',
                                        flex: 0.2
                                    }
                                ],
                                selModel: Ext.create('Ext.selection.CheckboxModel', {
                                    selType: 'checkboxmodel'
                                })
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        flex: 1,
                        hidden: true,
                        margin: '5 0 0 0',
                        animCollapse: false,
                        collapseDirection: 'bottom',
                        collapseFirst: false,
                        collapsed: true,
                        collapsible: true,
                        title: '사용량 통계',
                        titleCollapse: true,
                        items: [
                            {
                                xtype: 'gridpanel',
                                columns: [
                                    {
                                        xtype: 'gridcolumn',
                                        width: 60,
                                        dataIndex: 'string',
                                        text: 'N'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'string',
                                        text: '파일 이름',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'string',
                                        text: '로그 개수',
                                        flex: 0.2
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'string',
                                        text: '파일 크기',
                                        flex: 0.2
                                    }
                                ],
                                selModel: Ext.create('Ext.selection.CheckboxModel', {
                                    selType: 'checkboxmodel'
                                })
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        flex: 1,
                        hidden: true,
                        margin: '5 0 0 0',
                        animCollapse: false,
                        collapseDirection: 'bottom',
                        collapseFirst: false,
                        collapsed: true,
                        collapsible: true,
                        title: '패킷 분포도 통계',
                        titleCollapse: true,
                        items: [
                            {
                                xtype: 'gridpanel',
                                columns: [
                                    {
                                        xtype: 'gridcolumn',
                                        width: 60,
                                        dataIndex: 'string',
                                        text: 'N'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'string',
                                        text: '파일 이름',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'string',
                                        text: '로그 개수',
                                        flex: 0.2
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'string',
                                        text: '파일 크기',
                                        flex: 0.2
                                    }
                                ],
                                selModel: Ext.create('Ext.selection.CheckboxModel', {
                                    selType: 'checkboxmodel'
                                })
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        flex: 1,
                        hidden: true,
                        margin: '5 0 0 0',
                        animCollapse: false,
                        collapseDirection: 'bottom',
                        collapseFirst: false,
                        collapsed: true,
                        collapsible: true,
                        title: '로그 사용량 통계',
                        titleCollapse: true,
                        items: [
                            {
                                xtype: 'gridpanel',
                                columns: [
                                    {
                                        xtype: 'gridcolumn',
                                        width: 60,
                                        dataIndex: 'string',
                                        text: 'N'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'string',
                                        text: '파일 이름',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'string',
                                        text: '로그 개수',
                                        flex: 0.2
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'string',
                                        text: '파일 크기',
                                        flex: 0.2
                                    }
                                ],
                                selModel: Ext.create('Ext.selection.CheckboxModel', {
                                    selType: 'checkboxmodel'
                                })
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

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        var grid_zip = Ext.getCmp("grid_zip");
        var chk_zip = grid_zip.getSelectionModel().getSelection();

        var grid_unzip = Ext.getCmp("grid_unzip");
        var chk_unzip = grid_unzip.getSelectionModel().getSelection();

        if(chk_zip.length + chk_unzip.length === 0){ Ext.Msg.alert(__weguardia,"로그를 선택하여 주세요."); return false; }
        if(chk_zip.length + chk_unzip.length > 1){ Ext.Msg.alert(__weguardia,"1개의 로그만 선택 가능합니다."); return false; }

        if(chk_zip.length > 0){
            Ext.Msg.alert(__weguardia,"일반 로그를 선택하세요.");
            return false;
        }

        if(chk_unzip.length > 0){
            me.zipFile(chk_unzip[0].data.name,chk_unzip[0].data.logcnt);
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        var grid_zip = Ext.getCmp("grid_zip");
        var chk_zip = grid_zip.getSelectionModel().getSelection();

        var grid_unzip = Ext.getCmp("grid_unzip");
        var chk_unzip = grid_unzip.getSelectionModel().getSelection();

        if(chk_zip.length + chk_unzip.length === 0){ Ext.Msg.alert(__weguardia,"로그를 선택하여 주세요."); return false; }
        if(chk_zip.length + chk_unzip.length > 1){ Ext.Msg.alert(__weguardia,"1개의 로그만 선택 가능합니다."); return false; }

        if(chk_unzip.length > 0){
            Ext.Msg.alert(__weguardia,"압축된 로그를 선택하세요.");
            return false;
        }

        if(chk_zip.length > 0){
            me.unzipFile(chk_zip[0].data.name,chk_zip[0].data.logcnt);
        }
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = this;

        var grid_zip = Ext.getCmp("grid_zip");
        var chk_zip = grid_zip.getSelectionModel().getSelection();

        var grid_unzip = Ext.getCmp("grid_unzip");
        var chk_unzip = grid_unzip.getSelectionModel().getSelection();

        if(chk_zip.length + chk_unzip.length === 0){ Ext.Msg.alert(__weguardia,"로그를 선택하여 주세요."); return false; }
        if(chk_zip.length + chk_unzip.length > 1){ Ext.Msg.alert(__weguardia,"1개의 로그만 선택 가능합니다."); return false; }

        if(chk_zip.length > 0){
            me.copyFile(chk_zip[0].data.name,chk_zip[0].data.logcnt,'ZIP');
        }

        if(chk_unzip.length > 0){
            me.copyFile(chk_unzip[0].data.name,chk_unzip[0].data.logcnt,'UNZIP');
        }
    },

    onButtonClick3: function(button, e, eOpts) {
        var me = this;

        var grid_zip = Ext.getCmp("grid_zip");
        var chk_zip = grid_zip.getSelectionModel().getSelection();

        var grid_unzip = Ext.getCmp("grid_unzip");
        var chk_unzip = grid_unzip.getSelectionModel().getSelection();

        if(chk_zip.length + chk_unzip.length === 0){ Ext.Msg.alert(__weguardia,"로그를 선택하여 주세요."); return false; }
        if(chk_zip.length + chk_unzip.length > 1){ Ext.Msg.alert(__weguardia,"1개의 로그만 선택 가능합니다."); return false; }

        if(chk_zip.length > 0){
            me.deleteFile(chk_zip[0].data.name,'ZIP');
        }

        if(chk_unzip.length > 0){
            me.deleteFile(chk_unzip[0].data.name,'UNZIP');
        }
    },

    onButtonClick4: function(button, e, eOpts) {
        var me = this;

        var grid_zip = Ext.getCmp("grid_zip");
        var chk_zip = grid_zip.getSelectionModel().getSelection();

        var grid_unzip = Ext.getCmp("grid_unzip");
        var chk_unzip = grid_unzip.getSelectionModel().getSelection();

        if(chk_zip.length + chk_unzip.length === 0){ Ext.Msg.alert(__weguardia,"로그를 선택하여 주세요."); return false; }
        if(chk_zip.length + chk_unzip.length > 1){ Ext.Msg.alert(__weguardia,"1개의 로그만 선택 가능합니다."); return false; }

        if(chk_zip.length > 0){
            me.sendFile(chk_zip[0].data.name,chk_zip[0].data.logcnt,'ZIP');
        }

        if(chk_unzip.length > 0){
            me.sendFile(chk_unzip[0].data.name,chk_unzip[0].data.logcnt,'UNZIP');
        }
    },

    onCheckboxModelBeforeSelect: function(rowmodel, record, index, eOpts) {
        var _sel = Ext.getCmp("grid_unzip").getSelectionModel();
        _sel.deselectAll();
    },

    onPanelExpand1: function(p, eOpts) {
        setTimeout(function(){ Ext.getCmp("NFW2_dataManage").setWidth('100%'); },100);
    },

    onPanelCollapse1: function(p, eOpts) {
        setTimeout(function(){ Ext.getCmp("NFW2_dataManage").setWidth('100%'); },100);
    },

    onCheckboxModelSelectionChange1: function(rowmodel, record, index, eOpts) {
        var _sel = Ext.getCmp("grid_zip").getSelectionModel();
        _sel.deselectAll();
    },

    onPanelExpand: function(p, eOpts) {
        setTimeout(function(){ Ext.getCmp("NFW2_dataManage").setWidth('100%'); },100);
    },

    onPanelCollapse: function(p, eOpts) {
        setTimeout(function(){ Ext.getCmp("NFW2_dataManage").setWidth('100%'); },100);
    },

    onButtonClick9: function(button, e, eOpts) {
        var me = this;

        var grid_zip = Ext.getCmp("grid_zip");
        var chk_zip = grid_zip.getSelectionModel().getSelection();

        var grid_unzip = Ext.getCmp("grid_unzip");
        var chk_unzip = grid_unzip.getSelectionModel().getSelection();

        if(chk_zip.length + chk_unzip.length === 0){ Ext.Msg.alert(__weguardia,"로그를 선택하여 주세요."); return false; }
        if(chk_zip.length + chk_unzip.length > 1){ Ext.Msg.alert(__weguardia,"1개의 로그만 선택 가능합니다."); return false; }

        if(chk_zip.length > 0){
            Ext.Msg.alert(__weguardia,"일반 로그를 선택하세요.");
            return false;
        }

        if(chk_unzip.length > 0){
            me.zipFile(chk_unzip[0].data.name,chk_unzip[0].data.logcnt);
        }
    },

    onButtonClick8: function(button, e, eOpts) {
        var me = this;

        var grid_zip = Ext.getCmp("grid_zip");
        var chk_zip = grid_zip.getSelectionModel().getSelection();

        var grid_unzip = Ext.getCmp("grid_unzip");
        var chk_unzip = grid_unzip.getSelectionModel().getSelection();

        if(chk_zip.length + chk_unzip.length === 0){ Ext.Msg.alert(__weguardia,"로그를 선택하여 주세요."); return false; }
        if(chk_zip.length + chk_unzip.length > 1){ Ext.Msg.alert(__weguardia,"1개의 로그만 선택 가능합니다."); return false; }

        if(chk_unzip.length > 0){
            Ext.Msg.alert(__weguardia,"압축된 로그를 선택하세요.");
            return false;
        }

        if(chk_zip.length > 0){
            me.unzipFile(chk_zip[0].data.name,chk_zip[0].data.logcnt);
        }
    },

    onButtonClick7: function(button, e, eOpts) {
        var me = this;

        var grid_zip = Ext.getCmp("grid_zip");
        var chk_zip = grid_zip.getSelectionModel().getSelection();

        var grid_unzip = Ext.getCmp("grid_unzip");
        var chk_unzip = grid_unzip.getSelectionModel().getSelection();

        if(chk_zip.length + chk_unzip.length === 0){ Ext.Msg.alert(__weguardia,"로그를 선택하여 주세요."); return false; }
        if(chk_zip.length + chk_unzip.length > 1){ Ext.Msg.alert(__weguardia,"1개의 로그만 선택 가능합니다."); return false; }

        if(chk_zip.length > 0){
            me.copyFile(chk_zip[0].data.name,chk_zip[0].data.logcnt,'ZIP');
        }

        if(chk_unzip.length > 0){
            me.copyFile(chk_unzip[0].data.name,chk_unzip[0].data.logcnt,'UNZIP');
        }
    },

    onButtonClick6: function(button, e, eOpts) {
        var me = this;

        var grid_zip = Ext.getCmp("grid_zip");
        var chk_zip = grid_zip.getSelectionModel().getSelection();

        var grid_unzip = Ext.getCmp("grid_unzip");
        var chk_unzip = grid_unzip.getSelectionModel().getSelection();

        if(chk_zip.length + chk_unzip.length === 0){ Ext.Msg.alert(__weguardia,"로그를 선택하여 주세요."); return false; }
        if(chk_zip.length + chk_unzip.length > 1){ Ext.Msg.alert(__weguardia,"1개의 로그만 선택 가능합니다."); return false; }

        if(chk_zip.length > 0){
            me.deleteFile(chk_zip[0].data.name,'ZIP');
        }

        if(chk_unzip.length > 0){
            me.deleteFile(chk_unzip[0].data.name,'UNZIP');
        }
    },

    onButtonClick5: function(button, e, eOpts) {
        var me = this;

        var grid_zip = Ext.getCmp("grid_zip");
        var chk_zip = grid_zip.getSelectionModel().getSelection();

        var grid_unzip = Ext.getCmp("grid_unzip");
        var chk_unzip = grid_unzip.getSelectionModel().getSelection();

        if(chk_zip.length + chk_unzip.length === 0){ Ext.Msg.alert(__weguardia,"로그를 선택하여 주세요."); return false; }
        if(chk_zip.length + chk_unzip.length > 1){ Ext.Msg.alert(__weguardia,"1개의 로그만 선택 가능합니다."); return false; }

        if(chk_zip.length > 0){
            me.sendFile(chk_zip[0].data.name,chk_zip[0].data.logcnt,'ZIP');
        }

        if(chk_unzip.length > 0){
            me.sendFile(chk_unzip[0].data.name,chk_unzip[0].data.logcnt,'UNZIP');
        }
    },

    onPanelAfterRender: function(component, eOpts) {
        this.getFiles();
    },

    getFiles: function() {
        var me = this;

        var store_zip = Ext.data.StoreManager.lookup("store_log_manage_zip_list");
        var store_unzip = Ext.data.StoreManager.lookup("store_log_manage_unzip_list");

        var _condition = {};

        request_helper.xmlrpc_call_Ajax_Post(
            'FtDBMgr',
            'lmh_getFiles',
            _condition,
            function(retval){

                hideLoadMask();
                hideCompLoadMask(Ext.getCmp("NFW2_dataManage"));
                setTimeout(function(){ me.setWidth('100%'); },100);

                if(!retval){ return false; }

                var zip_record = [];
                var unzip_record = [];
                var z = 1;
                var uz = 1;

                for(var i in retval){
                    if(i === "unzip_files"){

                        for(var l=0; l<retval[i].length; l++){
                            unzip_record.push({
                                'num': uz,
                                'name': retval[i][l].name,
                                'logcnt': commify(retval[i][l].logcnt),
                                'size': byteConvert(retval[i][l].size)
                            });

                            uz++;
                        }

                    }else if(i === "zip_files"){

                        for(var l=0; l<retval[i].length; l++){
                            zip_record.push({
                                'num': z,
                                'name': retval[i][l].name,
                                'logcnt': commify(retval[i][l].logcnt),
                                'size': byteConvert(retval[i][l].size)
                            });

                            z++;
                        }
                    }
                }
                store_zip.loadData(zip_record);
                store_unzip.loadData(unzip_record);
            }
        );
    },

    zipFile: function(name, logcnt) {
        var me = this;

        var _condition = {
            fpath: Ext.encode(name),
            logcnt: Ext.encode(removeComma(logcnt))
        };

        showCompLoadMask(Ext.getCmp("NFW2_dataManage"));

        request_helper.xmlrpc_call_Ajax_Post(
            'FtDBMgr',
            'lmh_zipFile',
            _condition,
            function(retval){

                Ext.MessageBox.alert(__weguardia,get_msg('msg_compression'));
                me.getFiles();
            }
        );
    },

    unzipFile: function(name, logcnt) {
        var me = this;

        var _condition = {
            fpath: Ext.encode(name),
            logcnt: Ext.encode(logcnt)
        };

        showCompLoadMask(Ext.getCmp("NFW2_dataManage"));

        request_helper.xmlrpc_call_Ajax_Post(
            'FtDBMgr',
            'lmh_unzipFile',
            _condition,
            function(retval){

                Ext.MessageBox.alert(__weguardia,get_msg('msg_disble_compression'));
                me.getFiles();
            }
        );
    },

    deleteFile: function(name, iszip) {
        var me = this;

        var _condition = {
            fpath: Ext.encode(name),
            isZip: Ext.encode(iszip)
        };

        showCompLoadMask(Ext.getCmp("NFW2_dataManage"));

        request_helper.xmlrpc_call_Ajax_Post(
            'FtDBMgr',
            'lmh_deleteFile',
            _condition,
            function(retval){

                me.getFiles();
            }
        );
    },

    copyFile: function(name, logcnt, iszip) {
        var me = this;
        var targetfile = '/mnt/ramdisk/do/F3view/nodeapps/deploy/public/javascripts/attachments/';

        var _condition = {
            fpath: Ext.encode(name),
            logcnt: Ext.encode(logcnt),
            isZip: Ext.encode(iszip)
        };

        showCompLoadMask(Ext.getCmp("NFW2_dataManage"));

        request_helper.xmlrpc_call_Ajax_Post(
            'FtDBMgr',
            'lmh_copyFile',
            _condition,
            function(retval){

                if(retval){

                    var filename = retval;

                    document.location.href = '/fileDownloadCommon?filePath='+ Ext.encode(targetfile)+"&fileName="+Ext.encode(filename)+"&filePathFlag="+Ext.encode('true');
                    me.getFiles();
                }
            }
        );
    },

    sendFile: function(name, logcnt, iszip) {
        var me = this;
        var _condition = {
            fpath: Ext.encode(name),
            logcnt: Ext.encode(logcnt),
            isZip: Ext.encode(iszip)
        };

        showCompLoadMask(Ext.getCmp("NFW2_dataManage"));

        request_helper.xmlrpc_call_Ajax_Post(
            'FtDBMgr',
            'lmh_sendFile',
            _condition,
            function(retval){

                Ext.MessageBox.alert(__weguardia,get_msg('msg_sftp_transfer'));
                me.getFiles();
            }
        );
    }

});