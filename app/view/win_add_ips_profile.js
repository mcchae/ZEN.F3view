
Ext.define('NFW2.view.win_add_ips_profile', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_add_ips_profile',

    requires: [
        'NFW2.view.win_add_ips_profileViewModel',
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.button.Segmented',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.form.field.ComboBox',
        'Ext.view.Table',
        'Ext.toolbar.Paging',
        'Ext.toolbar.TextItem',
        'Ext.grid.plugin.BufferedRenderer',
        'Ext.grid.plugin.CellEditing',
        'Ext.selection.CheckboxModel'
    ],

    viewModel: {
        type: 'win_add_ips_profile'
    },
    cls: 'zen_win',
    height: 700,
    id: 'win_add_ips_profile',
    minHeight: 550,
    minWidth: 600,
    width: 1300,
    layout: 'fit',
    manageHeight: false,
    maximizable: true,
    defaultListenerScope: true,

    listeners: {
        close: {
            fn: 'onWindowClose',
            single: false
        },
        maximize: {
            fn: 'onWindowMaximize',
            single: false
        },
        restore: {
            fn: 'onWindowRestore',
            single: false
        }
    },
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
                    id: 'btn_submit',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onBtn_submitClick'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    id: 'btn_reset',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onBtn_resetClick'
                    }
                }
            ]
        }
    ],

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        id: 'fm',
                        minWidth: 580,
                        bodyPadding: 10,
                        manageHeight: false,
                        titleCollapse: true,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'container',
                                id: 'nameG',
                                margin: '8 0 8 0',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        validator: function(value) {
                                            var me = Ext.getCmp('win_add_ips_profile');
                                            var store = Ext.data.StoreManager.lookup('store_ips_profile_list');

                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                            if(me.set_btn === true){
                                                if(me.edit === "edit"){
                                                    var chk_num = 0;
                                                    for(var i in store.data.items){
                                                        if(store.data.items[i].data.name === value){
                                                            if(Number(i) !== Number(me.edit_index)){ chk_num++; }
                                                        }
                                                    }
                                                    if(chk_num > 0){ return get_msg('err_objname'); }
                                                }
                                                else{
                                                    for(var i in store.data.items){
                                                        if(store.data.items[i].data.name === value){ return get_msg('err_objname'); }
                                                    }
                                                }
                                                me.set_btn = false;
                                            }

                                            return true;
                                        },
                                        id: 'profile_name',
                                        margin: '0 0 0 -10',
                                        maxWidth: 400,
                                        minWidth: 400,
                                        labelCls: 'lb_req',
                                        labelSeparator: ' ',
                                        msgTarget: 'none',
                                        enforceMaxLength: true,
                                        maxLength: 31,
                                        maxLengthText: null,
                                        minLength: 1,
                                        bind: {
                                            fieldLabel: '{profile_name}'
                                        },
                                        listeners: {
                                            errorchange: 'onProfile_nameErrorChange',
                                            blur: 'onProfile_nameBlur'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                id: 'discG',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        fieldInfo: '한글, 숫자, 영문, 특수기호를 포함한 63자',
                                        id: 'profile_disc',
                                        width: 550,
                                        labelSeparator: ' ',
                                        labelWidth: 142,
                                        msgTarget: 'none',
                                        enforceMaxLength: true,
                                        maxLength: 63,
                                        minLength: 1,
                                        bind: {
                                            fieldLabel: '{desc}'
                                        },
                                        listeners: {
                                            focus: 'onProfile_discFocus',
                                            blur: 'onProfile_discBlur'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                id: 'btn_group1',
                                margin: '10 0 0 0',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'button',
                                        cls: 'btn_b',
                                        id: 'btn_all_edit',
                                        iconCls: 'icb_edit',
                                        bind: {
                                            text: '{edit2}'
                                        },
                                        listeners: {
                                            click: 'onBtn_all_editClick'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        cls: 'btn_b',
                                        hidden: true,
                                        margin: '0 0 0 10',
                                        iconCls: 'icb_filter',
                                        text: '필터 적용',
                                        listeners: {
                                            click: 'onButtonClick1'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        cls: 'btn_b',
                                        hidden: true,
                                        margin: '0 0 0 10',
                                        iconCls: 'icb_filter_x',
                                        text: '필터 초기화',
                                        listeners: {
                                            click: 'onButtonClick2'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        cls: 'btn_b',
                                        hidden: true,
                                        margin: '0 0 0 5',
                                        iconCls: 'icb_filter',
                                        text: '필터링',
                                        listeners: {
                                            click: 'onButtonClick',
                                            render: 'onButtonRender'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        cls: 'btn_b',
                                        hidden: true,
                                        id: 'btn_add_del',
                                        margin: '0 0 0 5',
                                        iconCls: 'icb_add',
                                        text: '시그너처 추가 및 삭제',
                                        listeners: {
                                            click: 'onBtn_add_delClick'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                id: 'ips_segment_con',
                                margin: '8 0 0 0',
                                collapsible: true,
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        id: 'ips_check_fieldset',
                                        scrollable: {
                                            x: true,
                                            y: false
                                        },
                                        title: ' ',
                                        items: [
                                            {
                                                xtype: 'container',
                                                height: 50,
                                                html: '<div id="profile_search"></div>',
                                                id: 'ips_checkgroup',
                                                minWidth: 1235,
                                                scrollable: true,
                                                layout: {
                                                    type: 'vbox',
                                                    align: 'stretch'
                                                }
                                            },
                                            {
                                                xtype: 'container',
                                                margin: '8 0 10 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        flex: 1,
                                                        hidden: true,
                                                        layout: {
                                                            type: 'hbox',
                                                            align: 'stretch'
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'textfield'
                                                            },
                                                            {
                                                                xtype: 'button',
                                                                cls: 'btn_b',
                                                                margin: '0 0 0 5',
                                                                iconCls: 'icb_ser'
                                                            },
                                                            {
                                                                xtype: 'button',
                                                                cls: 'btn_b',
                                                                margin: '0 0 0 5',
                                                                iconCls: 'icb_reset'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ],
                                        listeners: {
                                            render: 'onIps_check_fieldsetRender'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        margin: '0 0 10 0',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch',
                                            pack: 'end'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                flex: 1
                                            },
                                            me.processIps_select_sig_chk({
                                                xtype: 'checkboxfield',
                                                sel_sig_func: function(newValue) {
                                                    var me = Ext.getCmp('win_add_ips_profile');
                                                    var store = Ext.data.StoreManager.lookup('store_ips_profile_signature_list');
                                                    if(me.edit === "edit"){
                                                        if(newValue){
                                                            me.select_sig = true;
                                                            if(!me.chk_fir){
                                                                if(me.filter_flag === 1){ me.filter_func(); }
                                                                else{
                                                                    store.getProxy().setExtraParam('start',Ext.encode(0));
                                                                    store.getProxy().setExtraParam('limit',Ext.encode(10000));
                                                                    store.getProxy().setExtraParam('cond',Ext.encode(null));
                                                                }
                                                                store.currentPage = 1;
                                                                showCompLoadMask(Ext.getCmp('win_add_ips_profile'));
                                                                store.load(function(response){
                                                                    hideCompLoadMask(Ext.getCmp('win_add_ips_profile'));

                                                                    var chk_record = [];
                                                                    for(var i in me.tbl_fsid){
                                                                        for(var j in response){
                                                                            if(response[j].data._check){
                                                                                if(response[j].data['@fsid'] === me.tbl_fsid[i]['@fsid']){
                                                                                    chk_record.push(response[j].data);
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                    var grid = Ext.getCmp('ips_signature_list').getStore();
                                                                    grid.each(function(rec){
                                                                        for(var i in me.tbl_fsid){
                                                                            if(rec.data['@fsid'] === me.tbl_fsid[i]['@fsid']){ rec.set('_check',true); }
                                                                        }
                                                                    });
                                                                    chk_record.sort(function(a,b){
                                                                        if(a['@fsid'] > b['@fsid']){ return 1; }
                                                                        else{ return -1; }
                                                                    });

                                                                    var temp = chk_record.slice(0,1000);
                                                                    store.loadData(temp);
                                                                    Ext.getCmp('page_toolbar1').updateInfo();
                                                                    var main = Ext.getCmp('win_add_ips_profile');

                                                                    Ext.getCmp('ips_signature_list').getSelectionModel().selectAll();
                                                                });
                                                            }
                                                            else{
                                                                me.chk_fir = false;
                                                            }
                                                        }else{
                                                            me.select_sig = false;
                                                            if(me.filter_flag === 1){ me.filter_func(); }
                                                            else{
                                                                store.getProxy().setExtraParam('start',Ext.encode(0));
                                                                store.getProxy().setExtraParam('limit',Ext.encode(1000));
                                                                store.getProxy().setExtraParam('cond',Ext.encode(null));
                                                            }
                                                            store.currentPage = 1;
                                                            showCompLoadMask(Ext.getCmp('win_add_ips_profile'));
                                                            store.load(function(response){
                                                                hideCompLoadMask(Ext.getCmp('win_add_ips_profile'));
                                                            });
                                                        }
                                                    }
                                                    else{
                                                        if(newValue){
                                                            me.select_sig = true;
                                                            if(me.filter_flag === 1){ me.filter_func(); }
                                                            else{
                                                                store.getProxy().setExtraParam('start',Ext.encode(0));
                                                                store.getProxy().setExtraParam('limit',Ext.encode(10000));
                                                                store.getProxy().setExtraParam('cond',Ext.encode(null));
                                                            }
                                                            showCompLoadMask(Ext.getCmp('win_add_ips_profile'));
                                                            store.currentPage = 1;
                                                            store.load(function(response){
                                                                hideCompLoadMask(Ext.getCmp('win_add_ips_profile'));

                                                                var chk_record = [];
                                                                for(var i in me.tbl_fsid){
                                                                    for(var j in response){
                                                                        if(response[j].data['@fsid'] === me.tbl_fsid[i]['@fsid']){
                                                                            chk_record.push(response[j].data);
                                                                        }
                                                                    }
                                                                }
                                                                var grid = Ext.getCmp('ips_signature_list').getStore();
                                                                grid.each(function(rec){
                                                                    for(var i in me.tbl_fsid){
                                                                        if(rec.data['@fsid'] === me.tbl_fsid[i]['@fsid']){ rec.set('_check',true); }
                                                                    }
                                                                });
                                                                chk_record.sort(function(a,b){
                                                                    if(a['@fsid'] > b['@fsid']){ return 1; }
                                                                    else{ return -1; }
                                                                });

                                                                var temp = chk_record.slice(0,1000);
                                                                store.loadData(temp);
                                                                Ext.getCmp('ips_signature_list').getSelectionModel().selectAll();

                                                            });
                                                        }
                                                        else{
                                                            me.select_sig = false;
                                                            if(me.filter_flag === 1){ me.filter_func(); }
                                                            else{
                                                                store.getProxy().setExtraParam('start',Ext.encode(0));
                                                                store.getProxy().setExtraParam('limit',Ext.encode(1000));
                                                                store.getProxy().setExtraParam('cond',Ext.encode(null));
                                                            }
                                                            showCompLoadMask(Ext.getCmp('win_add_ips_profile'));
                                                            store.currentPage = 1;
                                                            store.load(function(response){
                                                                Ext.getCmp('page_toolbar1').doRefresh();
                                                            });
                                                        }
                                                    }
                                                },
                                                id: 'ips_select_sig_chk',
                                                bind: {
                                                    boxLabel: '{show_only_sel_sig}'
                                                },
                                                listeners: {
                                                    change: 'onIps_select_sig_chkChange'
                                                }
                                            })
                                        ]
                                    },
                                    {
                                        xtype: 'segmentedbutton',
                                        cls: 'zen_seg',
                                        hidden: true,
                                        id: 'ips_segment',
                                        allowMultiple: true
                                    }
                                ]
                            },
                            {
                                xtype: 'gridpanel',
                                flex: 1,
                                cls: 'in_grid',
                                id: 'ips_signature_list',
                                margin: '5 0 0 0',
                                manageHeight: false,
                                titleCollapse: true,
                                columnLines: true,
                                store: 'store_ips_profile_signature_list',
                                columns: [
                                    {
                                        xtype: 'rownumberer',
                                        items: {
                                            xtype: 'container',
                                            flex: 1,
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    maxHeight: 24,
                                                    cls: 'btn_b',
                                                    iconCls: 'icb_ser',
                                                    flex: 1,
                                                    margin: '16 1 0 1',
                                                    listeners: {
                                                        click: function(){
                                                    var me = Ext.getCmp('win_add_ips_profile');
                                                    me.filter_flag = 1;
                                                    if(me.select_sig === true){ Ext.getCmp('ips_select_sig_chk').sel_sig_func(true); }
                                                    else{ me.filter_func(); }
                                                    }
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    cls: 'btn_b',
                                                    iconCls: 'icb_reset',
                                                    flex: 1,
                                                    maxHeight: 24,
                                                    margin: '16 1 0 5',
                                                    listeners: {
                                                        click: function(){
                                                    var me = Ext.getCmp('win_add_ips_profile');
                                                    me.filter_flag = 0;
                                                    if(me.select_sig === true){ 
                                                    Ext.getCmp('ips_select_sig_chk').sel_sig_func(true);
                                                    Ext.getCmp('search_fsid').reset();
                                                    Ext.getCmp('search_name').reset();
                                                    Ext.getCmp('search_protocol').reset();
                                                    Ext.getCmp('search_src').reset();
                                                    Ext.getCmp('search_srcport').reset();
                                                    Ext.getCmp('search_dst').reset();
                                                    Ext.getCmp('search_dstport').reset();
                                                    Ext.getCmp('search_hazard').reset();
                                                    Ext.getCmp('search_dt_time').reset();
                                                    Ext.getCmp('search_dt_num').reset();
                                                    Ext.getCmp('search_bl_time').reset();
                                                    Ext.getCmp('search_bl_type').reset();
                                                    Ext.getCmp('search_action').reset();
                                                    Ext.getCmp('search_direction').reset();
                                                    Ext.getCmp('search_profile').reset();
                                                    Ext.getCmp('search_use').reset();
                                                    Ext.getCmp('search_audit').reset();
                                                    Ext.getCmp('c_total').setValue(true);
                                                    }
                                                    else{
                                                    Ext.getCmp('search_fsid').reset();
                                                    Ext.getCmp('search_name').reset();
                                                    Ext.getCmp('search_protocol').reset();
                                                    Ext.getCmp('search_src').reset();
                                                    Ext.getCmp('search_srcport').reset();
                                                    Ext.getCmp('search_dst').reset();
                                                    Ext.getCmp('search_dstport').reset();
                                                    Ext.getCmp('search_hazard').reset();
                                                    Ext.getCmp('search_dt_time').reset();
                                                    Ext.getCmp('search_dt_num').reset();
                                                    Ext.getCmp('search_bl_time').reset();
                                                    Ext.getCmp('search_bl_type').reset();
                                                    Ext.getCmp('search_action').reset();
                                                    Ext.getCmp('search_direction').reset();
                                                    Ext.getCmp('search_profile').reset();
                                                    Ext.getCmp('search_use').reset();
                                                    Ext.getCmp('search_audit').reset();
                                                    Ext.getCmp('c_total').setValue(true);
                                                    me.tri_search = [];
                                                    
                                                    me.searcher = false;
                                                    var _store = Ext.data.StoreManager.lookup('store_ips_profile_signature_list');
                                                    _store.getProxy().setExtraParam('group_id_list',Ext.encode([]));
                                                    _store.getProxy().setExtraParam('cond',Ext.encode(null));
                                                    _store.currentPage = 1;
                                                    showCompLoadMask(Ext.getCmp('win_add_ips_profile'));
                                                    _store.load(function(response){
                                                    hideCompLoadMask(Ext.getCmp('win_add_ips_profile'));
                                                    });
                                                    }
                                                    }
                                                    }
                                                }
                                            ]
                                        },
                                        style: 'padding-top:13;',
                                        width: 60,
                                        align: 'center',
                                        text: 'N'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.tdCls = 'over_mouse';

                                            return value;
                                        },
                                        items: {
                                            xtype: 'textfield',
                                            flex: 1,
                                            id: 'search_fsid',
                                            margin: '16 1 2 -9',
                                            enableKeyEvents: true,
                                            maxHeight: 24
                                        },
                                        style: 'padding-top:13;',
                                        width: 70,
                                        align: 'center',
                                        dataIndex: '@fsid',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        bind: {
                                            text: '{fsid}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var _store = Ext.data.StoreManager.lookup('store_ips_profile_group');
                                            //_store.load();
                                            return '<div style="float:center">' + _store.data.items[value-1].data.group_name + '</div>';
                                        },
                                        items: {
                                            xtype: 'combobox',
                                            flex: 1,
                                            id: 'search_profile',
                                            margin: '16 1 0 -9',
                                            editable: false,
                                            valueField: '@id',
                                            displayField: 'group_name',
                                            maxHeight: 24,
                                            queryMode: 'local',
                                            store: 'store_ips_profile_group',
                                            emptyText: 'Select'
                                        },
                                        minWidth: 130,
                                        style: 'padding-top:13;',
                                        align: 'center',
                                        dataIndex: 'group_id',
                                        flex: 0.17,
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        bind: {
                                            text: '{sig_group_name}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.tdCls = 'over_mouse';

                                            return Ext.util.Format.htmlEncode(value);
                                        },
                                        items: {
                                            xtype: 'textfield',
                                            flex: 1,
                                            id: 'search_name',
                                            maxHeight: 24,
                                            margin: '16 1 0 -9'
                                        },
                                        minWidth: 100,
                                        style: 'padding-top:13;',
                                        align: 'center',
                                        dataIndex: 'signature_name',
                                        flex: 0.17,
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        bind: {
                                            text: '{sig_name}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        bind: {
                                            text: '{basic_info}'
                                        },
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return value.toUpperCase();
                                                },
                                                items: {
                                                    xtype: 'combobox',
                                                    flex: 1,
                                                    id: 'search_protocol',
                                                    margin: '0 1 0 -9',
                                                    editable: false,
                                                    valueField: 'value',
                                                    maxHeight: 24,
                                                    queryMode: 'local',
                                                    store: 'store_ips_protocol',
                                                    emptyText: 'Select'
                                                },
                                                width: 65,
                                                dataIndex: 'protocol',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{protocol}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if(value === "any" || value === "Any"){ return value.charAt(0).toUpperCase()+value.slice(1); }

                                                    return value;
                                                },
                                                items: {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    id: 'search_src',
                                                    margin: '0 1 0 -9',
                                                    maxHeight: 24,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        focus: function(component, event, eOpts){
                                                    var str = disp_help_ip('4smp');
                                                    component.fieldInfo = str + ", Any, !";
                                                    setTipFocus(Ext.getCmp('win_add_ips_profile'), component);
                                                    },
                                                        blur: function(component, event, eOpts){
                                                    setTipBlur(Ext.getCmp('win_add_ips_profile'), component);
                                                    }
                                                    }
                                                },
                                                width: 80,
                                                dataIndex: 'src_addr',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{src}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if(value === "any" || value === "Any"){ return value.charAt(0).toUpperCase()+value.slice(1); }

                                                    return value;
                                                },
                                                items: {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    id: 'search_srcport',
                                                    margin: '0 1 0 -9',
                                                    enableKeyEvents: true,
                                                    maxHeight: 24,
                                                    fieldInfo: {
                                                        txt: msg_tip_length_port(1,
                                                        65535,
                                                        0)
                                                    },
                                                    enforceMaxLength: true,
                                                    maxLength: 5,
                                                    listeners: {
                                                        focus: function(component, event, eOpts){
                                                    setTipFocus(Ext.getCmp('win_add_ips_profile'), component);
                                                    },
                                                        blur: function(component, event, eOpts){
                                                    setTipBlur(Ext.getCmp('win_add_ips_profile'), component);
                                                    }
                                                    }
                                                },
                                                width: 60,
                                                dataIndex: 'src_port',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{src_port}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if(value === '->'){ return '<img src="../images/arrow_01.png">'; }
                                                    else{ return '<img src="../images/arrow_02.png">'; }
                                                },
                                                items: {
                                                    xtype: 'combobox',
                                                    flex: 1,
                                                    id: 'search_direction',
                                                    editable: false,
                                                    margin: '0 1 0 -9',
                                                    displayField: 'text',
                                                    maxHeight: 24,
                                                    valueField: 'value',
                                                    queryMode: 'local',
                                                    store: 'store_direction',
                                                    emptyText: 'Select'
                                                },
                                                width: 50,
                                                dataIndex: 'direction',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{direction}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if(value === "any" || value === "Any"){ return value.charAt(0).toUpperCase()+value.slice(1); }

                                                    return value;
                                                },
                                                items: {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    id: 'search_dst',
                                                    margin: '0 1 0 -9',
                                                    enableKeyEvents: true,
                                                    maxHeight: 24,
                                                    listeners: {
                                                        focus: function(component, event, eOpts){
                                                    var str = disp_help_ip('4smp');
                                                    component.fieldInfo = str + ", Any, !";
                                                    setTipFocus(Ext.getCmp('win_add_ips_profile'), component);
                                                    },
                                                        blur: function(component, event, eOpts){
                                                    setTipBlur(Ext.getCmp('win_add_ips_profile'), component);
                                                    }
                                                    }
                                                },
                                                width: 80,
                                                dataIndex: 'dest_addr',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{dest}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if(value === "any" || value === "Any"){ return value.charAt(0).toUpperCase()+value.slice(1); }

                                                    return value;
                                                },
                                                items: {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    id: 'search_dstport',
                                                    margin: '0 1 0 -9',
                                                    enableKeyEvents: true,
                                                    maxHeight: 24,
                                                    fieldInfo: {
                                                        txt: msg_tip_length_port(1,
                                                        65535,
                                                        0)
                                                    },
                                                    enforceMaxLength: true,
                                                    maxLength: 5,
                                                    listeners: {
                                                        focus: function(component, event, eOpts){
                                                    setTipFocus(Ext.getCmp('win_add_ips_profile'), component);
                                                    },
                                                        blur: function(component, event, eOpts){
                                                    setTipBlur(Ext.getCmp('win_add_ips_profile'), component);
                                                    }
                                                    }
                                                },
                                                width: 60,
                                                dataIndex: 'dest_port',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{dest_port}'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            if(value === "high" || value === "low" || value === "normal" || value === "critical"){
                                                return disp = (value !== '')? '<img src="../images/level_'+ value +'.png" border="0"/>':'';
                                            }
                                            return '<img src="../images/level_low.png" border="0"/>';
                                        },
                                        items: {
                                            xtype: 'combobox',
                                            flex: 1,
                                            id: 'search_hazard',
                                            editable: false,
                                            margin: '16 1 0 -9',
                                            displayField: 'text',
                                            valueField: 'value',
                                            maxHeight: 24,
                                            queryMode: 'local',
                                            store: 'store_hazard',
                                            emptyText: 'Select'
                                        },
                                        style: 'padding-top:13;',
                                        width: 55,
                                        align: 'center',
                                        dataIndex: 'hazard',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        bind: {
                                            text: '{hazard}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 130,
                                        align: 'center',
                                        flex: 0.12,
                                        bind: {
                                            text: '{inspect_info}'
                                        },
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                items: {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    id: 'search_dt_time',
                                                    margin: '0 1 0 -9',
                                                    enableKeyEvents: true,
                                                    maxHeight: 24,
                                                    listeners: {
                                                        
                                                    }
                                                },
                                                width: 70,
                                                align: 'center',
                                                dataIndex: 'detection_time',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{time_sec}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                items: {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    id: 'search_dt_num',
                                                    margin: '0 1 0 -9',
                                                    enableKeyEvents: true,
                                                    maxHeight: 24,
                                                    listeners: {
                                                        
                                                    }
                                                },
                                                width: 50,
                                                align: 'center',
                                                dataIndex: 'detection_num',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{count}'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 130,
                                        align: 'center',
                                        flex: 0.12,
                                        bind: {
                                            text: '{deny_info}'
                                        },
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                items: {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    id: 'search_bl_time',
                                                    margin: '0 1 0 -9',
                                                    enableKeyEvents: true,
                                                    maxHeight: 24,
                                                    listeners: {
                                                        
                                                    }
                                                },
                                                width: 70,
                                                align: 'center',
                                                dataIndex: 'block_time',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{preserve_sec}'
                                                }
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
                                                items: {
                                                    xtype: 'combobox',
                                                    flex: 1,
                                                    id: 'search_bl_type',
                                                    editable: false,
                                                    margin: '0 1 0 -9',
                                                    displayField: 'text',
                                                    maxHeight: 24,
                                                    valueField: 'value',
                                                    queryMode: 'local',
                                                    store: 'store_block_type',
                                                    emptyText: 'Select'
                                                },
                                                width: 50,
                                                align: 'center',
                                                dataIndex: 'block_type',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{type2}'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            //if(record.data){
                                            metaData.tdCls = 'cell_combo';
                                            var main = Ext.getCmp('win_add_ips_profile');
                                            if(main.edit === "edit"){
                                                if(main.edit_fsid.length > 0){
                                                    for(var i = 0;i < main.edit_fsid.length;i++){
                                                        if(record.data['@fsid'] === main.edit_fsid[i]['@fsid']){ return (main.edit_fsid[i].action === 'drop')? __zen("deny"):__zen("detect"); }

                                                    }
                                                    if(main.edit === "edit"){
                                                        if(record.data.ips_profile){ return (record.data.ips_profile.action === 'drop')? __zen("deny"):__zen("detect"); }
                                                        else{ return __zen("detect"); }
                                                    }
                                                    else if(i === main.edit_fsid.length-1){
                                                        return (record.data.action === 'alert')? __zen("detect"):__zen("deny");
                                                    }
                                                }

                                                if(main.edit === "edit"){
                                                    if(record.data.ips_profile){ return (record.data.ips_profile.action === 'drop')? __zen("deny"):__zen("detect"); }
                                                    else{ return __zen("detect"); }
                                                }
                                                else{
                                                    return (record.data.action === 'alert')? __zen("detect"):__zen("deny");
                                                }
                                            }
                                            else{
                                                if(main.edit_fsid.length > 0){
                                                    for(var i = 0;i < main.edit_fsid.length;i++){
                                                        if(record.data['@fsid'] === main.edit_fsid[i]['@fsid']){ return (main.edit_fsid[i].action === 'drop')? __zen("deny"):__zen("detect"); }

                                                    }
                                                    if(main.edit === "edit"){
                                                        return (record.data.ips_profile.action === 'drop')? __zen("deny"):__zen("detect");
                                                    }
                                                    else if(i === main.edit_fsid.length-1){
                                                        return (record.data.action === 'alert')? __zen("detect"):__zen("deny");
                                                    }
                                                }

                                                if(main.edit === "edit"){
                                                    return (record.data.ips_profile.action === 'drop')? __zen("deny"):__zen("detect");
                                                }
                                                else{
                                                    return (record.data.action === 'alert')? __zen("detect"):__zen("deny");
                                                }
                                            }

                                            /*else{

                                            return (record.data.action === 'alert')? '탐지':'차단';
                                            }*/
                                        },
                                        items: {
                                            xtype: 'combobox',
                                            flex: 1,
                                            id: 'search_action',
                                            margin: '16 1 0 -9',
                                            editable: false,
                                            displayField: 'text',
                                            hidden: true,
                                            maxHeight: 24,
                                            valueField: 'value',
                                            queryMode: 'local',
                                            store: 'store_action',
                                            emptyText: 'select'
                                        },
                                        style: 'padding-top:13;',
                                        width: 55,
                                        dataIndex: 'action',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        bind: {
                                            text: '{action}'
                                        },
                                        editor: {
                                            xtype: 'combobox',
                                            baseCls: 'cell_combo',
                                            editable: false,
                                            displayField: 'name',
                                            queryMode: 'local',
                                            store: {
                                                data: [
                                                    {
                                                        name: '탐지',
                                                        value: 'alert'
                                                    },
                                                    {
                                                        name: '차단',
                                                        value: 'drop'
                                                    }
                                                ],
                                                fields: [
                                                    {
                                                        name: 'name'
                                                    },
                                                    {
                                                        name: 'value'
                                                    }
                                                ]
                                            },
                                            valueField: 'value',
                                            listeners: {
                                                focus: 'onComboboxFocus',
                                                collapse: 'onComboboxCollapse'
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            /*if(record.data){
                                            //record.data.audit === "" ||
                                            return (record.data.audit === 'on')? '<img src="../images/b_on.png" border="0"/>':'<img src="../images/b_off.png" border="0"/>';
                                        }else{
                                            return '<img src="../images/b_on.png" border="0"/>';
                                        }*/

                                        var main = Ext.getCmp('win_add_ips_profile');

                                        if(main.edit_fsid.length > 0){
                                            for(var i = 0;i < main.edit_fsid.length;i++){
                                                if(record.data['@fsid'] === main.edit_fsid[i]['@fsid']){ return (main.edit_fsid[i].audit === 'on')? '<img class="b_sq_on over_mouse"/>':'<img class="b_sq_off over_mouse"/>'; }

                                            }
                                            if(main.edit === "edit"){
                                                if(record.data.ips_profile){ return (value.audit === 'on')? '<img class="b_sq_on over_mouse"/>':'<img class="b_sq_off over_mouse"/>'; }
                                                else{ return '<img class="b_sq_off over_mouse"/>'; }
                                            }
                                            else if(i === main.edit_fsid.length-1){
                                                return (record.data.audit === 'on')? '<img class="b_sq_on over_mouse"/>':'<img class="b_sq_off over_mouse"/>';
                                            }
                                        }

                                        if(main.edit === "edit"){
                                            if(record.data.ips_profile){ return (value.audit === 'on')? '<img class="b_sq_on over_mouse"/>':'<img class="b_sq_off over_mouse"/>'; }
                                            else{ return '<img class="b_sq_off over_mouse"/>'; }
                                        }
                                        else{
                                            return (record.data.audit === 'on')? '<img class="b_sq_on over_mouse"/>':'<img class="b_sq_off over_mouse"/>';
                                        }

                                        },
                                        items: {
                                            xtype: 'combobox',
                                            flex: 1,
                                            id: 'search_audit',
                                            margin: '16 1 0 -9',
                                            editable: false,
                                            displayField: 'name',
                                            maxHeight: 24,
                                            hidden: true,
                                            valueField: 'value',
                                            queryMode: 'local',
                                            store: {
                                                data: [
                                                    {
                                                        name: '사용',
                                                        value: 'on'
                                                    },
                                                    {
                                                        name: '사용안함',
                                                        value: 'off'
                                                    }
                                                ],
                                                fields: [
                                                    {
                                                        name: 'name'
                                                    },
                                                    {
                                                        name: 'value'
                                                    }
                                                ]
                                            },
                                            emptyText: 'select'
                                        },
                                        hidden: true,
                                        id: 'ips_grid_audit',
                                        style: 'padding-top:13;',
                                        width: 50,
                                        align: 'center',
                                        dataIndex: 'ips_profile',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        bind: {
                                            text: '{audit}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            /*if(record.data){

                                            return (record.data.use === "" || record.data.use === 'on')? '<img src="../images/b_on.png" border="0"/>':'<img src="../images/b_off.png" border="0"/>';

                                            }else{

                                            return '<img src="../images/b_on.png" border="0"/>';
                                            }*/

                                            var main = Ext.getCmp('win_add_ips_profile');

                                            if(main.edit_fsid.length > 0){

                                                for(var i = 0;i < main.edit_fsid.length;i++){

                                                    if(record.data['@fsid'] === main.edit_fsid[i]['@fsid']){ return (main.edit_fsid[i].use === 'off')? '<img class="b_sq_off over_mouse"/>':'<img class="b_sq_on over_mouse"/>'; }

                                                }
                                                if(main.edit === "edit"){
                                                    if(record.data.ips_profile){ return (value.use === 'off')? '<img class="b_sq_off over_mouse"/>':'<img class="b_sq_on over_mouse"/>'; }
                                                    else{ return '<img class="b_sq_on over_mouse"/>'; }
                                                }
                                                else if(i === main.edit_fsid.length-1){
                                                    return (record.data.use === "" || record.data.use === 'on')? '<img class="b_sq_on over_mouse"/>':'<img class="b_sq_off over_mouse"/>';
                                                }
                                            }

                                            if(main.edit === "edit"){
                                                if(record.data.ips_profile){ return (value.use === 'off')? '<img class="b_sq_off over_mouse"/>':'<img class="b_sq_on over_mouse"/>'; }
                                                else{ return '<img class="b_sq_on over_mouse"/>'; }
                                            }
                                            else{
                                                return (record.data.use === "" || record.data.use === 'on' || record.data.use === undefined)? '<img class="b_sq_on over_mouse"/>':'<img class="b_sq_off over_mouse"/>';
                                            }

                                        },
                                        items: {
                                            xtype: 'combobox',
                                            flex: 1,
                                            id: 'search_use',
                                            margin: '16 1 0 -9',
                                            editable: false,
                                            displayField: 'name',
                                            maxHeight: 24,
                                            valueField: 'value',
                                            hidden: true,
                                            queryMode: 'local',
                                            store: {
                                                data: [
                                                    {
                                                        name: '사용',
                                                        value: 'on'
                                                    },
                                                    {
                                                        name: '사용안함',
                                                        value: 'off'
                                                    }
                                                ],
                                                fields: [
                                                    {
                                                        name: 'name'
                                                    },
                                                    {
                                                        name: 'value'
                                                    }
                                                ]
                                            },
                                            emptyText: 'select'
                                        },
                                        style: 'padding-top:13;',
                                        width: 50,
                                        align: 'center',
                                        dataIndex: 'ips_profile',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        bind: {
                                            text: '{use}'
                                        }
                                    }
                                ],
                                viewConfig: {
                                    markDirty: false
                                },
                                listeners: {
                                    beforecellclick: 'onIps_signature_listBeforeCellClick',
                                    cellclick: 'onIps_signature_listCellClick'
                                },
                                dockedItems: [
                                    {
                                        xtype: 'pagingtoolbar',
                                        onLoad: function() {
                                            var me = this,
                                                pageData,
                                                currPage,
                                                pageCount,
                                                afterText,
                                                count,
                                                isEmpty,
                                                item;

                                            count = me.store.getCount();
                                            isEmpty = count === 0;
                                            if (!isEmpty) {
                                                pageData = me.getPageData();
                                                currPage = pageData.currentPage;
                                                pageCount = pageData.pageCount;

                                                if (currPage > pageCount) {
                                                    if (pageCount > 0) {
                                                        me.store.loadPage(pageCount);
                                                    }
                                                    else {
                                                        me.getInputItem().reset();
                                                    }
                                                    return;
                                                }

                                                afterText = Ext.String.format(me.afterPageText, isNaN(pageCount) ? 1 : pageCount);
                                            } else {
                                                currPage = 0;
                                                pageCount = 0;
                                                afterText = Ext.String.format(me.afterPageText, 0);
                                            }

                                            Ext.suspendLayouts();
                                            item = me.child('#afterTextItem');
                                            if (item) {
                                                item.setText(afterText);
                                            }
                                            item = me.getInputItem();
                                            if (item) {
                                                item.setDisabled(isEmpty).setValue(currPage);
                                            }
                                            me.setChildDisabled('#first', currPage === 1 || isEmpty);
                                            me.setChildDisabled('#prev', currPage === 1 || isEmpty);
                                            me.setChildDisabled('#next', currPage === pageCount  || isEmpty);
                                            me.setChildDisabled('#last', currPage === pageCount  || isEmpty);
                                            me.setChildDisabled('#refresh', false);
                                            me.updateInfo();
                                            Ext.resumeLayouts(true);

                                            if (!me.calledInternal) {
                                                if(Ext.getCmp('win_add_ips_profile').select_sig){
                                                    var chk_record = [];
                                                    for(var i in Ext.getCmp('win_add_ips_profile').tbl_fsid){
                                                        for(var j in me.store.data.items){
                                                            if(me.store.data.items[j].data['@fsid'] === Ext.getCmp('win_add_ips_profile').tbl_fsid[i]['@fsid']){
                                                                chk_record.push(me.store.data.items[j].data);
                                                            }
                                                        }
                                                    }
                                                    var grid = Ext.getCmp('ips_signature_list').getStore();
                                                    grid.each(function(rec){
                                                        for(var i in Ext.getCmp('win_add_ips_profile').tbl_fsid){
                                                            if(rec.data['@fsid'] === Ext.getCmp('win_add_ips_profile').tbl_fsid[i]['@fsid']){ rec.set('_check',true); }
                                                        }
                                                    });
                                                    chk_record.sort(function(a,b){
                                                        if(a['@fsid'] > b['@fsid']){ return 1; }
                                                        else{ return -1; }
                                                    });

                                                    me.store.loadData(chk_record);
                                                    Ext.getCmp('ips_signature_list').getSelectionModel().selectAll();
                                                }
                                                else{
                                                    var main = Ext.getCmp('win_add_ips_profile');

                                                    var grid = Ext.getCmp('ips_signature_list').getStore();
                                                    var _store = Ext.data.StoreManager.lookup('store_ips_profile_signature_list');

                                                    for(var k=0; k<grid.data.items.length; k++){
                                                        for(var i in main.tbl_fsid){
                                                            if(main.tbl_fsid[i]['@fsid'] === grid.data.items[k].data['@fsid']){
                                                                Ext.getCmp('ips_signature_list').getSelectionModel().select(k, true);
                                                            }
                                                        }
                                                    }
                                                }

                                                me.fireEvent('change', me, pageData || me.emptyPageData);
                                            }
                                        },
                                        doRefresh: function() {
                                            var me = this,
                                                current = me.store.currentPage;

                                            if (me.fireEvent('beforechange', me, current) !== false) {
                                                //me.store.load(current, me.tbl());

                                                me.store.currentPage = current;
                                                showCompLoadMask(Ext.getCmp('win_add_ips_profile'));
                                                me.store.load(function(){hideCompLoadMask(Ext.getCmp('win_add_ips_profile'));});
                                            }
                                        },
                                        moveNext: function() {
                                            var me = this,
                                                store = me.store,
                                                total = me.getPageData().pageCount,
                                                next = store.currentPage + 1;

                                            if (next <= total) {
                                                if (me.fireEvent('beforechange', me, next) !== false) {

                                                    //store.nextPage();
                                                    showCompLoadMask(Ext.getCmp('win_add_ips_profile'));
                                                    store.getProxy().setExtraParam('start',Ext.encode((next-1)*1000));
                                                    store.currentPage = next;

                                                    store.load(function(){hideCompLoadMask(Ext.getCmp('win_add_ips_profile'));});

                                                    return true;
                                                }
                                            }
                                            return false;
                                        },
                                        moveFirst: function() {
                                            if (this.fireEvent('beforechange', this, 1) !== false){
                                                //this.store.loadPage(1, me.tbl());
                                                this.store.getProxy().setExtraParam('start',Ext.encode(0));
                                                this.store.currentPage = 1;
                                                showCompLoadMask(Ext.getCmp('win_add_ips_profile'));
                                                this.store.load(function(){hideCompLoadMask(Ext.getCmp('win_add_ips_profile'));});

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
                                                    showCompLoadMask(Ext.getCmp('win_add_ips_profile'));
                                                    store.load(function(){hideCompLoadMask(Ext.getCmp('win_add_ips_profile'));});

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
                                                showCompLoadMask(Ext.getCmp('win_add_ips_profile'));
                                                me.store.load(function(){hideCompLoadMask(Ext.getCmp('win_add_ips_profile'));});

                                                return true;
                                            }
                                            return false;
                                        },
                                        updateInfo: function() {
                                            var me = this,
                                                displayItem = me.child('#displayItem'),
                                                store = me.store,
                                                pageData = me.getPageData(),
                                                count, msg;

                                            if (displayItem) {
                                                count = store.getCount();
                                                if (count === 0) {
                                                    msg = me.emptyMsg;
                                                } else {
                                                    var tbl = Ext.getCmp('win_add_ips_profile').tbl_fsid;
                                                    var dis_msg = '';

                                                    if(Ext.getCmp('win_add_ips_profile').select_sig){
                                                        if(Ext.getCmp('win_add_ips_profile').group_filter){
                                                            var group_leng = Ext.getCmp('win_add_ips_profile').group_filter_length;
                                                            if(group_leng === 0){
                                                                dis_msg = 'No data to display';
                                                            }
                                                            else{
                                                                var leng_chk;
                                                                if(pageData.toRecord >= group_leng){ leng_chk = group_leng; }
                                                                else{ leng_chk = 1000*pageData.currentPage; }
                                                                if(group_leng > 1000){
                                                                    dis_msg = 'Displaying '+(((pageData.currentPage-1)*1000)+1)+' - '+leng_chk+' of '+group_leng;
                                                                }
                                                                else{
                                                                    dis_msg = 'Displaying 1 - '+group_leng+' of '+group_leng;
                                                                }
                                                            }
                                                        }
                                                        else{
                                                            if(tbl.length === 0){
                                                                dis_msg = 'No data to display';
                                                                pageData.fromRecord = 0;
                                                                pageData.toRecord = 0;
                                                                pageData.total = 0;
                                                            }
                                                            else{
                                                                var leng_chk;
                                                                if(pageData.toRecord >= tbl.length){ leng_chk = tbl.length; }
                                                                else{ leng_chk = 1000*pageData.currentPage; }
                                                                if(tbl.length > 1000){
                                                                    dis_msg = 'Displaying '+(((pageData.currentPage-1)*1000)+1)+' - '+leng_chk+' of '+tbl.length;
                                                                }
                                                                else{
                                                                    dis_msg = 'Displaying 1 - '+tbl.length+' of '+tbl.length;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    else{
                                                        dis_msg = 'Displaying {0} - {1} of {2}';
                                                    }

                                                    msg = Ext.String.format(
                                                    dis_msg,
                                                    pageData.fromRecord,
                                                    pageData.toRecord,
                                                    pageData.total
                                                    );
                                                }
                                                displayItem.setText(msg);
                                            }
                                        },
                                        getPageData: function() {
                                            var store = this.store,
                                                totalCount = store.getTotalCount(),
                                                curr,
                                                size;


                                            if(Ext.getCmp('win_add_ips_profile').select_sig){
                                                if(Ext.getCmp('win_add_ips_profile').tbl_fsid){
                                                    //if(Ext.getCmp('win_add_ips_profile').tbl_fsid.length !== 0){
                                                    totalCount = Ext.getCmp('win_add_ips_profile').tbl_fsid.length;
                                                    //}
                                                }
                                            }

                                            if(totalCount === 0){
                                                curr = 0;
                                                size = 1;
                                                Ext.getCmp('page_toolbar1').items.items[4].disable();
                                            }
                                            else{
                                                curr = store.currentPage;
                                                size = store.pageSize;
                                                Ext.getCmp('page_toolbar1').items.items[4].enable();
                                            }

                                            return {
                                                total : totalCount,
                                                currentPage : curr,
                                                pageCount: Math.ceil(totalCount / size),
                                                fromRecord: ((curr - 1) * size) + 1,
                                                toRecord: Math.min(curr * size, totalCount)

                                            };
                                        },
                                        dock: 'bottom',
                                        id: 'page_toolbar1',
                                        width: 360,
                                        displayInfo: true,
                                        store: 'store_ips_profile_signature_list',
                                        listeners: {
                                            afterrender: {
                                                fn: 'onPagingtoolbarRender',
                                                single: false
                                            }
                                        },
                                        items: [
                                            {
                                                xtype: 'tbtext',
                                                id: 'tbl_chk'
                                            }
                                        ]
                                    }
                                ],
                                plugins: [
                                    Ext.create('Ext.grid.plugin.BufferedRenderer', {
                                        leadingBufferZone: 50,
                                        scrollToLoadBuffer: 50,
                                        trailingBufferZone: 50
                                    }),
                                    {
                                        ptype: 'cellediting',
                                        pluginId: 'ips_profile_plug',
                                        clicksToEdit: 1,
                                        listeners: {
                                            edit: 'onCellEditingEdit'
                                        }
                                    }
                                ],
                                selModel: {
                                    selType: 'checkboxmodel',
                                    onHeaderClick: function(headerCt, header, e) {
                                        var me = this,
                                            isChecked;

                                        if (header === me.column && me.mode !== 'SINGLE') {
                                            e.stopEvent();
                                            isChecked = header.el.hasCls(Ext.baseCSSPrefix + 'grid-hd-checker-on');

                                            if (isChecked) {
                                                var temp = Ext.getCmp('tbl_chk').html.split(' ');

                                                if(Ext.getCmp('win_add_ips_profile').filter_flag === 0){
                                                    if(Number(temp[0]) === Ext.getCmp('win_add_ips_profile').total_cnt){
                                                        Ext.Msg.show({
                                                            title: 'WeGuardia™ ZEN',
                                                            msg: msg_all_select(Ext.getCmp('win_add_ips_profile').count,2),
                                                            width: 300,
                                                            buttons: Ext.Msg.YESNO,
                                                            buttonText:{
                                                                yes: "yes",
                                                                no: "no"
                                                            },
                                                            fn: function(btn){
                                                                if(btn === "yes"){
                                                                    showCompLoadMask(Ext.getCmp('win_add_ips_profile'));
                                                                    var all_sig = Ext.getCmp('win_add_ips_profile').up_back;
                                                                    var store = Ext.data.StoreManager.lookup('store_ips_profile_signature_list');

                                                                    var tbl = Ext.getCmp('win_add_ips_profile').tbl_fsid;
                                                                    tbl = [];

                                                                    Ext.getCmp('tbl_chk').setText("0 "+__zen('check_count'));

                                                                    me.deselectAll();
                                                                    hideCompLoadMask(Ext.getCmp('win_add_ips_profile'));
                                                                }
                                                                else{
                                                                    showCompLoadMask(Ext.getCmp('win_add_ips_profile'));
                                                                    me.deselectAll();
                                                                    hideCompLoadMask(Ext.getCmp('win_add_ips_profile'));
                                                                }
                                                            },
                                                            icon: Ext.window.MessageBox.INFO
                                                        });
                                                    }
                                                    else{
                                                        showCompLoadMask(Ext.getCmp('win_add_ips_profile'));
                                                        me.deselectAll();
                                                        hideCompLoadMask(Ext.getCmp('win_add_ips_profile'));
                                                    }
                                                }
                                                else{
                                                    me.deselectAll();
                                                }
                                            } else {
                                                if(Ext.getCmp('win_add_ips_profile').filter_flag === 0 && Ext.getCmp('win_add_ips_profile').select_sig === false){
                                                    Ext.Msg.show({
                                                        title: __weguardia,
                                                        msg: msg_all_select(Ext.getCmp('win_add_ips_profile').count,1),
                                                        width: 300,
                                                        buttons: Ext.Msg.YESNO,
                                                        buttonText:{
                                                            yes: "yes",
                                                            no: "no"
                                                        },
                                                        fn: function(btn){
                                                            if(btn === "yes"){
                                                                showCompLoadMask(Ext.getCmp('win_add_ips_profile'));
                                                                var all_sig = Ext.getCmp('win_add_ips_profile').up_back;
                                                                var store = Ext.data.StoreManager.lookup('store_ips_profile_signature_list');

                                                                var tbl = Ext.getCmp('win_add_ips_profile').tbl_fsid;

                                                                for(var i in all_sig){
                                                                    sig_chk = false;
                                                                    for(var j in tbl){
                                                                        if(all_sig[i]['@fsid'] === tbl[j]['@fsid']){ sig_chk = true; }
                                                                    }

                                                                    if(!sig_chk){
                                                                        tbl.push({
                                                                            '@fsid' : all_sig[i]['@fsid'],
                                                                            "action" : all_sig[i].action,
                                                                            "audit" : all_sig[i].audit,
                                                                            "use" : all_sig[i].use
                                                                        });
                                                                    }
                                                                }

                                                                Ext.getCmp('tbl_chk').setText(all_sig.length + " " + __zen('check_count'));

                                                                me.selectAll();
                                                                hideCompLoadMask(Ext.getCmp('win_add_ips_profile'));
                                                            }
                                                            else{
                                                                showCompLoadMask(Ext.getCmp('win_add_ips_profile'));
                                                                me.selectAll();
                                                                hideCompLoadMask(Ext.getCmp('win_add_ips_profile'));
                                                            }
                                                        },
                                                        icon: Ext.window.MessageBox.INFO
                                                    });
                                                }
                                                else{
                                                    me.selectAll();
                                                }
                                            }
                                        }
                                    },
                                    mode: 'SIMPLE',
                                    listeners: {
                                        selectionchange: 'onCheckboxModelSelectionChange',
                                        select: 'onCheckboxModelSelect',
                                        deselect: 'onCheckboxModelDeselect',
                                        beforeselect: 'onCheckboxModelBeforeSelect',
                                        beforedeselect: 'onCheckboxModelBeforeDeselect'
                                    }
                                }
                            }
                        ],
                        listeners: {
                            afterrender: 'onFmAfterRender',
                            beforerender: 'onFmBeforeRender'
                        }
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processIps_select_sig_chk: function(config) {
        config.boxLabel = true;

        return config;
    },

    onProfile_nameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onProfile_nameBlur: function(component, event, eOpts) {

        Ext.getCmp('profile_name').validateValue(true);
    },

    onProfile_discFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onProfile_discBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
    },

    onBtn_all_editClick: function(button, e, eOpts) {
        var me = this;
        var _store = Ext.data.StoreManager.lookup('store_ips_profile_signature_list');
        var tbl = Ext.getCmp("ips_signature_list");
        var tbl_sel = tbl.getSelectionModel().getSelection();

        if(me.edit === "edit"){
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

            if(tbl_sel.length !== 0){
                for(var j in tbl_sel){
                    if(me.isCC){
                        me.tbl_fsid.push({
                            '@fsid' : tbl_sel[j].data['@fsid'],
                            'group_id' : tbl_sel[j].data['group_id'],
                            //                 'audit' : tbl_sel[j].data['audit'],
                            'use' : tbl_sel[j].data['use'],
                            'action' : tbl_sel[j].data['action']
                        });
                    }
                    else{
                        me.tbl_fsid.push({
                            '@fsid' : tbl_sel[j].data['@fsid'],
                            'group_id' : tbl_sel[j].data['group_id'],
                            'audit' : tbl_sel[j].data['audit'],
                            'use' : tbl_sel[j].data['use'],
                            'action' : tbl_sel[j].data['action']
                        });
                    }
                }
            }
        }
        else{

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

            if(tbl_sel.length !== 0){
                for(var j in tbl_sel){
                    if(me.isCC){
                        me.tbl_fsid.push({
                            '@fsid' : tbl_sel[j].data['@fsid'],
                            'group_id' : tbl_sel[j].data['group_id'],
                            //                 'audit' : tbl_sel[j].data['audit'],
                            'use' : tbl_sel[j].data['use'],
                            'action' : tbl_sel[j].data['action']
                        });
                    }
                    else{
                        me.tbl_fsid.push({
                            '@fsid' : tbl_sel[j].data['@fsid'],
                            'group_id' : tbl_sel[j].data['group_id'],
                            'audit' : tbl_sel[j].data['audit'],
                            'use' : tbl_sel[j].data['use'],
                            'action' : tbl_sel[j].data['action']
                        });
                    }
                }
            }
        }

        var win = Ext.create('NFW2.view.win_ips_profile_all_edit',{
            tbl_fsid : me.tbl_fsid,
            edit : me.edit,
            cid : me.cid,
            p_id : me.p_id,
            p_name : me.p_name,
            p_disc : me.p_disc,
            fsids : me.fsids,
            modal : true
        });

        win.show();

    },

    onButtonClick1: function(button, e, eOpts) {

    },

    onButtonClick2: function(button, e, eOpts) {

    },

    onButtonClick: function(button, e, eOpts) {
        // button.tooltip.show();
    },

    onButtonRender: function(component, eOpts) {
        // component.tooltip = Ext.create('Ext.tip.ToolTip', {
        //     target: component.getEl(),
        //     autoHide: false,
        //     anchor : 'top',
        //     cls : 'tip_box',
        //     shadow: false,
        //     border : 0,
        //     items : [
        //         {
        //             xtype: 'container',
        //             id: 'ips_profile_tip',
        //             width: 580,
        //             height : 120,
        //         }
        //     ]
        // });
    },

    onBtn_add_delClick: function(button, e, eOpts) {
        var me = this;

        var win = Ext.create('NFW2.view.win_add_del_signature',{
            back : me.up_back,
            fsid : me.up_tbl,
            cid : me.cid,
            p_id : me.p_id,
            p_name : me.p_name,
            p_disc : me.p_disc,
            modal : true
        });

        win.show();
    },

    onIps_check_fieldsetRender: function(component, eOpts) {
        var _store = Ext.data.StoreManager.lookup('store_ips_profile_group');
        var groupChk = Ext.create('Ext.form.field.Checkbox', {
            id : 'c_total',
            style:'margin-top:2px;margin-left:-3px',
            value : true,
            inputValue : 0,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    var chk_num = 0;
                    if(newValue){
                        for(var i in _store.data.items){
                            Ext.getCmp('c_'+i).setValue(true);
                        }
                    }
                    else{
                        for(var j in _store.data.items){
                            if(Ext.getCmp('c_'+j).getValue()){ chk_num++; }
                        }

                        if(chk_num === 0){
                            for(var k in _store.data.items){
                                Ext.getCmp('c_'+k).setValue(false);
                            }
                        }
                        else if(chk_num === _store.getCount()){
                            for(var l in _store.data.items){
                                Ext.getCmp('c_'+l).setValue(false);
                            }
                        }
                    }
                },
                render : function(component, eOpts){
                    component.getEl().on('click', function(eOpts) {
                        var me = Ext.getCmp('win_add_ips_profile');
                        me.select_ips_group(Ext.getCmp('c_total').inputValue);
                    }, component);
                }
            }
        });

        var tlabel = Ext.create('Ext.form.Label', {
            text : __zen('group'),
            style:'margin-left:15px;margin-right:10px;',
            listeners: {
                render : function(component, eOpts){
                    component.getEl().on('click', function(eOpts) {
                        var me = Ext.getCmp('win_add_ips_profile');
                        if(Ext.getCmp('c_total').getValue()){ Ext.getCmp('c_total').setValue(false); }
                        else{ Ext.getCmp('c_total').setValue(true); }
                        me.select_ips_group(Ext.getCmp('c_total').inputValue);
                    }, component);
                }
            }
        });

        component.legend.add(groupChk);
        component.legend.add(tlabel);
    },

    onIps_select_sig_chkChange: function(field, newValue, oldValue, eOpts) {
        field.sel_sig_func(newValue);        
    },

    onComboboxFocus: function(component, event, eOpts) {
        component.expand();
    },

    onComboboxCollapse: function(field, eOpts) {
        field.blur();
        Ext.getCmp('ips_signature_list').getView().refresh();
    },

    onIps_signature_listBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;

        if(cellIndex === 2 || cellIndex === 4 || cellIndex === 16 || cellIndex === 17 || cellIndex === 18){
            me.chk_option = true;
        }

        if(cellIndex === 16){ Ext.getCmp('ips_signature_list').getPlugin('ips_profile_plug').startEdit(Number(rowIndex), 16); return false; }
    },

    onIps_signature_listCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;
        var rec = tableview.getStore().getAt(rowIndex);
        var action;
        var audit;
        var use;

        if(record.data.action === ""){ action = "alert"; }
        else if(record.data.action === "alert"){ action = record.data.action; }
        else{ action = "drop"; }
        if(record.data.audit === ""){ audit = "off"; }
        else if(record.data.audit === "on"){ audit = record.data.audit; }
        else{ audit = "off"; }
        if(record.data.use === ""){ use = "on"; }
        else if(record.data.use === "off"){ use = record.data.use; }
        else{ use = "on"; }

        var store;
        if(me.edit === "edit"){
            store = Ext.data.StoreManager.lookup('store_use_signature');
        }
        else{
            store = Ext.data.StoreManager.lookup('store_ips_profile_signature_list');
        }

        if(me.isCC){
            var audit = 100;
        }
        else{
            var audit = 17;
        }

        if(cellIndex === audit){
            var chk = false;

            if(me.edit_fsid.length > 0){
                for(var i in me.edit_fsid){
                    if(me.edit_fsid[i]['@fsid'] === record.data['@fsid']){
                        chk = true;
                        if(me.edit_fsid[i].audit === "on"){
                            if(me.isCC){
                                me.edit_fsid[i]['@fsid'] = record.data['@fsid'];
                                me.edit_fsid[i]['action'] = me.edit_fsid[i].action;
                                //                     me.edit_fsid[i]['audit'] = "off";
                                me.edit_fsid[i]['use'] = me.edit_fsid[i].use;
                            }
                            else{
                                me.edit_fsid[i]['@fsid'] = record.data['@fsid'];
                                me.edit_fsid[i]['action'] = me.edit_fsid[i].action;
                                me.edit_fsid[i]['audit'] = "off";
                                me.edit_fsid[i]['use'] = me.edit_fsid[i].use;
                            }
                        }
                        else{
                            if(me.isCC){
                                me.edit_fsid[i]['@fsid'] = record.data['@fsid'];
                                me.edit_fsid[i]['action'] = me.edit_fsid[i].action;
                                //                     me.edit_fsid[i]['audit'] = "on";
                                me.edit_fsid[i]['use'] = me.edit_fsid[i].use;
                            }
                            else{
                                me.edit_fsid[i]['@fsid'] = record.data['@fsid'];
                                me.edit_fsid[i]['action'] = me.edit_fsid[i].action;
                                me.edit_fsid[i]['audit'] = "on";
                                me.edit_fsid[i]['use'] = me.edit_fsid[i].use;
                            }
                        }
                    }
                }
                if(chk === false){
                    if(audit === "on"){
                        if(me.isCC){
                            me.edit_fsid.push({
                                "@fsid" : record.data['@fsid'],
                                "action" : action,
                                //                     "audit" : "off",
                                "use" : use
                            });
                        }
                        else{
                            me.edit_fsid.push({
                                "@fsid" : record.data['@fsid'],
                                "action" : action,
                                "audit" : "off",
                                "use" : use
                            });
                        }
                    }
                    else{
                        if(me.isCC){
                            me.edit_fsid.push({
                                "@fsid" : record.data['@fsid'],
                                "action" : action,
                                //                     "audit" : "on",
                                "use" : use
                            });
                        }
                        else{
                            me.edit_fsid.push({
                                "@fsid" : record.data['@fsid'],
                                "action" : action,
                                "audit" : "on",
                                "use" : use
                            });
                        }
                    }
                }
            }
            else{
                if(audit === "on"){
                    if(me.isCC){
                        me.edit_fsid.push({
                            "@fsid" : record.data['@fsid'],
                            "action" : action,
                            //                 "audit" : "off",
                            "use" : use
                        });
                    }
                    else{
                        me.edit_fsid.push({
                            "@fsid" : record.data['@fsid'],
                            "action" : action,
                            "audit" : "off",
                            "use" : use
                        });
                    }
                }
                else{
                    if(me.isCC){
                        me.edit_fsid.push({
                            "@fsid" : record.data['@fsid'],
                            "action" : action,
                            //                 "audit" : "on",
                            "use" : use
                        });
                    }
                    else{
                        me.edit_fsid.push({
                            "@fsid" : record.data['@fsid'],
                            "action" : action,
                            "audit" : "on",
                            "use" : use
                        });
                    }
                }
            }

            Ext.getCmp('ips_signature_list').getView().refresh();
            return false;
            /*var records = [];
            for(var i in store.data.items){
                records.push(store.data.items[i].data);
            }

            for(var j in records){
                if(records[j]['@fsid'] === record.data['@fsid']){
                    if(records[j].audit === ""){ records[j].audit = "on"; }
                    else if(records[j].audit === "on"){ records[j].audit = "off"; }
                    else if(records[j].audit === "off"){ records[j].audit = "on"; }
                }
            }

            store.loadData(records);*/
        }

        if(me.isCC){
            var use = 17;
        }
        else{
            var use = 18;
        }
        if(cellIndex === use){
            var chk = false;

            if(me.edit_fsid.length > 0){
                for(var i in me.edit_fsid){
                    if(me.edit_fsid[i]['@fsid'] === record.data['@fsid']){
                        chk = true;
                        if(me.edit_fsid[i].use === "off"){
                            if(me.isCC){
                                me.edit_fsid[i]['@fsid'] = record.data['@fsid'];
                                me.edit_fsid[i]['action'] = me.edit_fsid[i].action;
                                //                     me.edit_fsid[i]['audit'] = me.edit_fsid[i].audit;
                                me.edit_fsid[i]['use'] = "on";
                            }
                            else{
                                me.edit_fsid[i]['@fsid'] = record.data['@fsid'];
                                me.edit_fsid[i]['action'] = me.edit_fsid[i].action;
                                me.edit_fsid[i]['audit'] = me.edit_fsid[i].audit;
                                me.edit_fsid[i]['use'] = "on";
                            }
                        }
                        else{
                            if(me.isCC){
                                me.edit_fsid[i]['@fsid'] = record.data['@fsid'];
                                me.edit_fsid[i]['action'] = me.edit_fsid[i].action;
                                //                     me.edit_fsid[i]['audit'] = me.edit_fsid[i].audit;
                                me.edit_fsid[i]['use'] = "off";
                            }
                            else{
                                me.edit_fsid[i]['@fsid'] = record.data['@fsid'];
                                me.edit_fsid[i]['action'] = me.edit_fsid[i].action;
                                me.edit_fsid[i]['audit'] = me.edit_fsid[i].audit;
                                me.edit_fsid[i]['use'] = "off";
                            }
                        }
                    }
                }
                if(chk === false){
                    if(use === "off"){
                        if(me.isCC){
                            me.edit_fsid.push({
                                "@fsid" : record.data['@fsid'],
                                "action" : action,
                                //                     "audit" : audit,
                                "use" : "on"
                            });
                        }
                        else{
                            me.edit_fsid.push({
                                "@fsid" : record.data['@fsid'],
                                "action" : action,
                                "audit" : audit,
                                "use" : "on"
                            });
                        }
                    }
                    else{
                        if(me.isCC){
                            me.edit_fsid.push({
                                "@fsid" : record.data['@fsid'],
                                "action" : action,
                                //                     "audit" : audit,
                                "use" : "off"
                            });
                        }
                        else{
                            me.edit_fsid.push({
                                "@fsid" : record.data['@fsid'],
                                "action" : action,
                                "audit" : audit,
                                "use" : "off"
                            });
                        }
                    }
                }
            }
            else{
                if(use === "off"){
                    if(me.isCC){
                        me.edit_fsid.push({
                            "@fsid" : record.data['@fsid'],
                            "action" : action,
                            //                 "audit" : audit,
                            "use" : "on"
                        });
                    }
                    else{
                        me.edit_fsid.push({
                            "@fsid" : record.data['@fsid'],
                            "action" : action,
                            "audit" : audit,
                            "use" : "on"
                        });
                    }
                }
                else{
                    if(me.isCC){
                        me.edit_fsid.push({
                            "@fsid" : record.data['@fsid'],
                            "action" : action,
                            //                 "audit" : audit,
                            "use" : "off"
                        });
                    }
                    else{
                        me.edit_fsid.push({
                            "@fsid" : record.data['@fsid'],
                            "action" : action,
                            "audit" : audit,
                            "use" : "off"
                        });
                    }
                }
            }

            Ext.getCmp('ips_signature_list').getView().refresh();
            return false;
        }

        if(cellIndex === 2 || cellIndex === 4){
            if(rec.get("@fsid") >= 9000000){
                Ext.Msg.alert("",get_msg("err_signinfo"));
                return false;
            }
            else{
                var fsid_num = parseInt(rec.get('@fsid')/1000000, 10);

                var _params = {
                    filename: Ext.encode('/ferret/ips/info/0'+fsid_num+'/0'+rec.get("@fsid")+'_kr.txt')
                };

                Ext.data.JsonP.request({
                    url : "/api/ftuctrl/getFileContent",
                    params : _params,
                    success : function(response){
                        if(!response.retcode){
                            var _params = {
                                filename: Ext.encode('/ferret/ips/info/0'+fsid_num+'/0'+rec.get("@fsid")+'_kr.TXT')
                            };

                            Ext.data.JsonP.request({
                                url : "/api/ftuctrl/getFileContent",
                                params : _params,
                                success : function(response){
                                    if(!response.retcode){
                                        Ext.Msg.alert("",get_msg("err_signinfo"));
                                        return false;
                                    }
                                    else{
                                        var win = Ext.create('NFW2.view.win_signature_info',{
                                            info : response.retval,
                                            record : record,
                                            modal : true
                                        });



                                        win.show();
                                    }
                                }
                            });
                        }
                        else{
                            var win = Ext.create('NFW2.view.win_signature_info',{
                                info : response.retval,
                                record : record,
                                modal : true
                            });
                            win.show();
                        }
                    },
                    failure : function(response){
                    }
                });
            }
            return false;
        }
    },

    onPagingtoolbarRender: function(component, eOpts) {
        var me = Ext.getCmp('win_add_ips_profile');

        // component.getEl().on('click', function(eOpts) {
        //     var me = Ext.getCmp('win_add_ips_profile');
        //     var tbl = Ext.getCmp("ips_signature_list");
        //     var tbl_sel = tbl.getSelectionModel().getSelection();
        //     var splice_chk = 0;
        //     var _store = Ext.data.StoreManager.lookup('store_ips_profile_signature_list');
        // //     var storePage = Ext.getCmp('page_toolbar1').store.currentPage;
        // //     var pageData = this.getPageData();
        // //     var currPage = pageData.currentPage;

        // //     _store.getProxy().setExtraParam('start',Ext.encode((currPage-1)*1000));
        //     //_store.getProxy().setExtraParam('limit',Ext.encode(1000));

        //     if(_store.totalCount > me.page_num*1000){
        //         for(var i = 0;i<1000;i++){
        //             for(var k in me.tbl_fsid){
        //                 if(me.tbl_fsid[k]['@fsid'] === _store.data.items[i].data['@fsid']){ me.tbl_fsid.splice(k,1); }
        //             }
        //         }
        //     }
        //     else{
        //         for(var j = 0;j< _store.data.items.length;j++){
        //             for(var l in me.tbl_fsid){
        //                 if(me.tbl_fsid[l]['@fsid'] === _store.data.items[j].data['@fsid']){ me.tbl_fsid.splice(l,1); }
        //             }
        //         }
        //     }

        //     if(tbl_sel.length !== 0){
        //         for(var j in tbl_sel){
        //             if(me.isCC){
        //                 me.tbl_fsid.push({
        //                     '@fsid' : tbl_sel[j].data['@fsid'],
        //                     'group_id' : tbl_sel[j].data['group_id'],
        //                     //                 'audit' : tbl_sel[j].data['audit'],
        //                     'use' : tbl_sel[j].data['use'],
        //                     'action' : tbl_sel[j].data['action']
        //                 });
        //             }
        //             else{
        //                 me.tbl_fsid.push({
        //                     '@fsid' : tbl_sel[j].data['@fsid'],
        //                     'group_id' : tbl_sel[j].data['group_id'],
        //                     'audit' : tbl_sel[j].data['audit'],
        //                     'use' : tbl_sel[j].data['use'],
        //                     'action' : tbl_sel[j].data['action']
        //                 });
        //             }
        //         }
        //     }


            /*var grid = Ext.getCmp('ips_signature_list').getStore();
            grid.load({
                scope : this,
                callback:function(records, operation, success){
                    console.log(grid);
                    for(var k=0; k<grid.data.items.length; k++){
                        for(var i in me.tbl_fsid){
                            if(me.tbl_fsid[i]['@fsid'] === grid.data.items[k].data['@fsid']){
                                Ext.getCmp('ips_signature_list').getSelectionModel().select(k, true);
                            }
                        }
                    }
                    me.page_data = grid.data.items;
                }
            });*/

            me.page_num = Ext.getCmp('page_toolbar1').store.currentPage;

        // }, component);
        //
    },

    onCellEditingEdit: function(editor, context, eOpts) {
        var me = Ext.getCmp('win_add_ips_profile');
        var audit = "off";
        var use = "on";

        if(context.record.data.audit === undefined){ audit = "off"; }
        else{ audit = context.record.data.audit; }
        if(context.record.data.use === undefined){ use = "on"; }
        else{ use = context.record.data.use; }

        if(me.edit_fsid.length === 0){
            me.edit_fsid.push({
                '@fsid' : context.record.data['@fsid'],
                'action' : context.record.data.action,
                'audit' : audit,
                'use' : use
            });
        }
        else{
            var chk = true;
            var chk_num;
            for(var i in me.edit_fsid){
                if(Number(me.edit_fsid[i]['@fsid']) === Number(context.record.data['@fsid'])){
                    chk = false;
                    chk_num = i;
                }
            }
            if(chk === true){
                me.edit_fsid.push({
                    '@fsid' : context.record.data['@fsid'],
                    'action' : context.record.data.action,
                    'audit' : audit,
                    'use' : use
                });
            }
            else{
                me.edit_fsid[chk_num].action = context.record.data.action;
            }
        }
    },

    onCheckboxModelSelectionChange: function(model, selected, eOpts) {
        var me = this;

        me.total = 0;

        for(var i = 1;i <= me.page;i++){
            if(me.page_num === i){ me.sel[i-1] = selected.length; }
        }

        for(var j in me.sel){
            me.total = me.total + me.sel[j];
        }


        if(me.total > me.tbl_fsid.length){
            Ext.getCmp('tbl_chk').setText(me.total + " " + __zen('check_count'));
        }
        else{
            Ext.getCmp('tbl_chk').setText(me.tbl_fsid.length + " " + __zen('check_count'));
        }

    },

    onCheckboxModelSelect: function(rowmodel, record, index, eOpts) {
        var me = this;

        var audit;
        var use;
        var edit_chk = false;

        if(record.data.audit === undefined){ audit = "off"; }
        else{ audit = record.data.audit; }
        if(record.data.use === undefined){ use = "on"; }
        else{ use = record.data.use; }

        for(var i in me.tbl_fsid){
            if(me.tbl_fsid[i]['@fsid'] === record.data['@fsid']){
                edit_chk = true;
            }
        }

        if(!edit_chk){
            me.tbl_fsid.push({
                '@fsid' : record.data['@fsid'],
                "action" : record.data.action,
                "audit" : audit,
                "use" : use
            });
        }

    },

    onCheckboxModelDeselect: function(rowmodel, record, index, eOpts) {
        var me = this;

        for(var i in me.tbl_fsid){
            if(me.tbl_fsid[i]['@fsid'] === record.data['@fsid'] ){ me.tbl_fsid.splice(i,1); }
        }
    },

    onCheckboxModelBeforeSelect: function(rowmodel, record, index, eOpts) {
        var me = this;

        if(me.chk_option){
            me.chk_option = false; return false;
        }
    },

    onCheckboxModelBeforeDeselect: function(rowmodel, record, index, eOpts) {
        var me = this;
        if(me.chk_option){ me.chk_option = false; return false; }
    },

    onFmAfterRender: function(component, eOpts) {
        var me = this;
        this.fieldInfo = makeZenTip();
        chk_zenauth(null);
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

        me.valid_set = false;
        me.filters = {};
        me.filter_flag = 0;
        me.set_btn = false;
        me.tri_search = [];
        me.filter_cnt = 0;
        me.group_filter_length = 0;
        me.group_filter = false;
        if(me.isCC){ Ext.getCmp('ips_grid_audit').hide(); }
        else{ Ext.getCmp('ips_grid_audit').show(); }
        me.tbl_fsid = [];
        me.edit_fsid = [];
        me.chk_option = false;
        me.chk_fir = true;
        me.tbl_id = [];
        me.total = 0;
        me.total_cnt = 0;
        me.sel = [];
        me.before_list = [];
        me.signatures =[];
        me.page_num = 1;
        me.page_data = Ext.data.StoreManager.lookup('store_ips_profile_signature_list').data.items;
        me.chked_signature = [];
        me.group_cnt = 0;

        // 그룹 store
        var _store = Ext.data.StoreManager.lookup('store_ips_profile_group');
        _store.getProxy().setExtraParam('start_group_id',Ext.encode(0));
        _store.load(
            function(response){
                me.group_cnt = response.length;
                var records = [];
                //             {
                //                 id: 0,
                //                 group_name: '전체',
                //             }
                //         ];
                var total_cnt = 0;
                for(var i=0; i<response.length; i++){

                    records.push({

                        id : response[i].data['@id'],
                        group_name : response[i].data.group_name,
                        count : response[i].data.count
                    });
                    total_cnt += response[i].data.count;
                }

                //         records[0].count = total_cnt;

                _store.loadData(records);

                var cnt = _store.getCount();
                me.chk_cnt = cnt;
                var tab_cnt = 0;
                for(var j=0; j<cnt; j++){
                    if(j%8 === 0){
                        tab_cnt++;
                        var tab_con = Ext.create('Ext.container.Container', {
                            id : 'tab_con'+tab_cnt,
                            layout: 'hbox'
                        });
                    }

                    var chk_width = 160;

                    if(j === 3 || j === 4){
                        chk_width = 200;
                    }
                    else if(j === 6 || j === 7){
                        chk_width = 120;
                    }

                    var groupChk = Ext.create('Ext.form.field.Checkbox', {
                        width : chk_width,
                        id : 'c_' + j,
                        inputValue : _store.data.items[j].data.id,
                        boxLabel: '<span style="font-size:11;">'+_store.data.items[j].data.group_name + "(" + _store.data.items[j].data.count + ")" +'</span>',
                        value: true,
                        listeners: {
                            change: function(field, newValue, oldValue, eOpts){
                                var me = Ext.getCmp('win_add_ips_profile');
                                if(newValue){
                                    me.chk_cnt++;
                                    if(me.chk_cnt === cnt){ Ext.getCmp('c_total').setValue(true); }
                                }
                                else{
                                    me.chk_cnt--;
                                    if(me.chk_cnt !== cnt){ Ext.getCmp('c_total').setValue(false); }
                                }

                            },
                            render : function(component, eOpts){
                                component.getEl().on('click', function(eOpts) {
                                    var me = Ext.getCmp('win_add_ips_profile');
                                    if(Ext.isChrome){
                                        if(eOpts.target.localName !== "span"){
                                            if(me.filter_flag === 1){
                                                me.filter_func();
                                            }
                                            else{
                                                me.select_ips_group(component.inputValue);
                                            }
                                        }
                                    }
                                    else{
                                        if(me.filter_flag === 1){
                                            me.filter_func();
                                        }
                                        else{
                                            me.select_ips_group(component.inputValue);
                                        }
                                    }
                                }, component);
                            }
                        }
                    });

                    if(Ext.getCmp('tab_con'+tab_cnt)){
                        Ext.getCmp('tab_con'+tab_cnt).add(groupChk);
                    }


                    //             var groupBtn = {
                    //                 xtype: 'button',
                    //                 id : 'g_'+ _store.data.items[j].data.id,
                    //                 inputValue : _store.data.items[j].data.id,
                    //                 text : _store.data.items[j].data.group_name,
                    //                 pressedCls : 'tb_btn_press',
                    //                 enableToggle : true,
                    //                 handler: function (button) {
                    //                     fn: me.select_ips_group(button.inputValue);
                    //                 }
                    //             };

                    //             Ext.getCmp('ips_segment').insert(groupBtn);

                    //             Ext.getCmp('g_'+_store.data.items[j].data.id).toggle(true);
                }
                for(var k = 1;k <= tab_cnt; k++){
                    Ext.getCmp('ips_checkgroup').add(Ext.getCmp('tab_con'+k));
                }
                //         Ext.getCmp('ips_profile_tip').add(Ext.getCmp('ips_check_fieldset'));
            }
        );
        //_store.load();

        if(me.edit === "edit"){
            me.select_sig = true;
            me.setTitle(__zen('edit_profile') + " - " + me.num);

            var _params = {

                basename : Ext.encode('ips_profile'),
                cond : Ext.encode({'profile_id':me.p_id})

            };
        showCompLoadMask(Ext.getCmp('win_add_ips_profile'));
            var store = Ext.data.StoreManager.lookup('store_ips_profile_signature_list');
            store.getProxy().url = '/api/ftuctrl/getIPSSigList';
            store.getProxy().setExtraParam('basename',Ext.encode('signature_list'));
            store.getProxy().setExtraParam('profile_id',Ext.encode(me.p_id));
            store.getProxy().setExtraParam('display_type',Ext.encode(2));
            store.getProxy().setExtraParam('group_id_list',Ext.encode([]));
            store.getProxy().setExtraParam('join_info',Ext.encode({'ex_basename':'ips_profile','name':me.p_name}));
            store.getProxy().setExtraParam('start',Ext.encode(0));
            store.getProxy().setExtraParam('limit',Ext.encode(10000));
            store.load(function(response){
                me.count = store.totalCount;
                me.page = parseInt(me.count/1000,10)+1;
                var chk_record = [];
                var back_p = [];
                var store_p = Ext.data.StoreManager.lookup('store_ips_profile_list');
                for(var i in store_p.data.items){
                    if(store_p.data.items[i].data.profile_id === me.p_id){
                        Ext.getCmp('profile_name').setValue(store_p.data.items[i].data.name);
                        Ext.getCmp('profile_disc').setValue(store_p.data.items[i].data.profile_disc);
                        back_p.push({
                            "@cid" : store_p.data.items[i].data['@cid'],
                            "name" : store_p.data.items[i].data.name,
                            "profile_id" : store_p.data.items[i].data.profile_id,
                            "profile_disc" : store_p.data.items[i].data.profile_disc,
                            "use_signatures" : []
                        });
                    }
                }

                var use_signatures = [];
                var chk_true = 0;
                for(var j in response){
                    if(response[j].data._check === true){
                        chk_record.push(response[j].data);
                        me.total++; chk_true++; me.tbl_id.push(response[j].data['@fsid']);
                    }
                    if(me.isCC){
                        use_signatures.push({
                            "@fsid" : response[j].data['@fsid'],
                            "action" : response[j].data.ips_profile.action,
                            //                 "audit" : response[i].data.ips_profile.audit,
                            "use" : response[i].data.ips_profile.use
                        });
                    }
                    else{
                        var action = "alert";
                        var audit = "off";
                        var use = "on";

                        if(response[j].data.ips_profile){
                            action = response[j].data.ips_profile.action;
                            audit = response[j].data.ips_profile.audit;
                            use = response[j].data.ips_profile.use;
                        }

                        use_signatures.push({
                            "@fsid" : response[j].data['@fsid'],
                            "action" : action,
                            "audit" : audit,
                            "use" : use
                        });
                    }

                }

                var grid = Ext.getCmp('ips_signature_list').getStore();
                var _store = Ext.data.StoreManager.lookup('store_ips_profile_signature_list');

                Ext.getCmp('tbl_chk').setText(me.total + " " + __zen('check_count'));
                back_p[0].use_signatures = use_signatures;

                me.records = back_p[0];

                me.up_back = use_signatures;
                for(var i in use_signatures){
                    me.signatures.push(use_signatures[i]['@fsid']);
                    if(me.isCC){
                        me.edit_fsid.push({
                            "@fsid" : use_signatures[i]['@fsid'],
                            "action" : use_signatures[i]['action'],
                            //                     "audit" : use_signatures[i]['audit'],
                            "use" : use_signatures[i]['use']
                        });
                    }
                    else{
                        me.edit_fsid.push({
                            "@fsid" : use_signatures[i]['@fsid'],
                            "action" : use_signatures[i]['action'],
                            "audit" : use_signatures[i]['audit'],
                            "use" : use_signatures[i]['use']
                        });
                    }
                }

            store.getProxy().setExtraParam('cond',Ext.encode({"_check":true}));
            store.currentPage = 1;
            store.load(function(response){

                me.total_cnt = response.length;
                var chk_record = [];
                var back_p = [];
                var store_p = Ext.data.StoreManager.lookup('store_ips_profile_list');

                var chk_true = 0;
                for(var j in response){
                    if(response[j].data._check === true){
                        chk_record.push(response[j].data);
                        me.total++; chk_true++; me.tbl_id.push(response[j].data['@fsid']);
                    }
                }

                me.tbl_fsid = chk_record;

                store.getProxy().setExtraParam('cond',Ext.encode({"_check":true}));
                store.getProxy().setExtraParam('profile_id',Ext.encode(me.p_id));
                store.getProxy().setExtraParam('limit',Ext.encode(10000));
                store.load(function(response){
                    hideCompLoadMask(Ext.getCmp('win_add_ips_profile'));
                    store.getProxy().setExtraParam('limit',Ext.encode(1000));
                });

                Ext.getCmp('ips_select_sig_chk').setValue(true);
            });
        });
            Ext.getCmp('btn_all_edit').show();

        }
        else{
            me.select_sig = false;
            me.setTitle(__zen('add_profile'));
            var store = Ext.data.StoreManager.lookup('store_ips_profile_signature_list');
            store.getProxy().url = '/api/ftuctrl/getIPSSigList';
            store.getProxy().setExtraParam('basename',Ext.encode('signature_list'));
            store.getProxy().setExtraParam('profile_id',Ext.encode(me.p_id));
            store.getProxy().setExtraParam('display_type',Ext.encode(2));
            store.getProxy().setExtraParam('group_id_list',Ext.encode([]));
            store.getProxy().setExtraParam('join_info',Ext.encode({'ex_basename':'ips_profile','name':me.p_name}));
            store.getProxy().setExtraParam('start',Ext.encode(0));
            store.getProxy().setExtraParam('limit',Ext.encode(10000));
            store.getProxy().setExtraParam('cond',Ext.encode(null));
            store.currentPage = 1;
            showCompLoadMask(Ext.getCmp('win_add_ips_profile'));
            store.load(function(response){
                me.count = store.totalCount;
                me.page = parseInt(me.count/1000,10)+1;
                me.total_cnt = response.length;
                var chk_record = [];
                var back_p = [];
                var store_p = Ext.data.StoreManager.lookup('store_ips_profile_list');

                for(var i in store_p.data.items){
                    if(store_p.data.items[i].data.profile_id === me.p_id){
                        Ext.getCmp('profile_name').setValue(store_p.data.items[i].data.name);
                        Ext.getCmp('profile_disc').setValue(store_p.data.items[i].data.profile_disc);
                        back_p.push({
                            "@cid" : store_p.data.items[i].data['@cid'],
                            "name" : store_p.data.items[i].data.name,
                            "profile_id" : store_p.data.items[i].data.profile_id,
                            "profile_disc" : store_p.data.items[i].data.profile_disc,
                            "use_signatures" : []
                        });
                    }
                }

                var use_signatures = [];
                var chk_true = 0;
                for(var j in response){
                    var action = "alert";
                    var audit = "off";
                    var use = "on";

                    if(response[j].data.ips_profile){
                        action = response[j].data.ips_profile.action;
                        audit = response[j].data.ips_profile.audit;
                        use = response[j].data.ips_profile.use;
                    }

                    use_signatures.push({
                        "@fsid" : response[j].data['@fsid'],
                        "action" : action,
                        "audit" : audit,
                        "use" : use
                    });
                }

                var grid = Ext.getCmp('ips_signature_list').getStore();
                var _store = Ext.data.StoreManager.lookup('store_ips_profile_signature_list');

                me.up_back = use_signatures;

                store.getProxy().url = '/api/ftuctrl/getIPSSigList';
                store.getProxy().setExtraParam('basename',Ext.encode('signature_list'));
                store.getProxy().setExtraParam('profile_id',Ext.encode(0));
                store.getProxy().setExtraParam('display_type',Ext.encode(2));
                store.getProxy().setExtraParam('group_id_list',Ext.encode([]));
                store.getProxy().setExtraParam('join_info',Ext.encode({}));
                store.getProxy().setExtraParam('start',Ext.encode(0));
                store.getProxy().setExtraParam('limit',Ext.encode(1000));
                store.getProxy().setExtraParam('cond',Ext.encode(null));
                store.currentPage = 1;
                showCompLoadMask(Ext.getCmp('win_add_ips_profile'));

                store.load(function(response){
                    hideCompLoadMask(Ext.getCmp('win_add_ips_profile'));
                    Ext.getCmp('ips_segment_con').setWidth(Ext.getCmp('ips_signature_list').getWidth());
                });

                Ext.getCmp('btn_all_edit').show();
                Ext.getCmp('tbl_chk').setText("0 " + __zen('check_count'));

            });
        }

    },

    onFmBeforeRender: function(component, eOpts) {
        Ext.getCmp('page_toolbar1').items.items[4].minValue = 0;
        Ext.getCmp('ips_signature_list').view.loadMask = false;
    },

    onWindowClose: function(panel, eOpts) {
        var _store = Ext.data.StoreManager.lookup('store_ips_profile_signature_list');
        var me = this;
            //_store.getProxy().setExtraParam('cond',Ext.encode({}));
            _store.removeAll();
            _store.getProxy().setExtraParam('');
        //Ext.data.StoreManager.lookup('store_ips_profile_list').load();
        if(me.edit !== "edit"){ Ext.getCmp('NFW2_ips_profile').get_profile(); }
    },

    onWindowMaximize: function(window, eOpts) {
        Ext.getCmp('ips_signature_list').setHeight(window.height-220);
        Ext.getCmp('ips_signature_list').setWidth(window.width-220);
    },

    onWindowRestore: function(window, eOpts) {
        Ext.getCmp('ips_signature_list').setHeight(window.height-220);
        Ext.getCmp('ips_signature_list').setWidth(window.width-220);
    },

    onBtn_submitClick: function(button, e, eOpts) {
        var me = this;
        var splice_chk = 0;

        var tbl = Ext.getCmp("ips_signature_list");
        var tbl_store = Ext.getCmp('ips_signature_list').getStore();
        var store = Ext.data.StoreManager.lookup('store_ips_profile_signature_list');
        var store2 = Ext.data.StoreManager.lookup('store_ips_profile_list');
        var tbl_sel = tbl.getSelectionModel().getSelection();

        var use_signatures = [];
        var use_signatures_min = [];
        var use_signatures_max = [];
        var signature = {};
        var chk;
        //var store_use = Ext.data.StoreManager.lookup('store_use_signature');
        //store_use.loadData(me.records);

        // var str = ['profile_name'];

        // var valid_id = new Array(str.length);

        // for(var i=0; i<str.length; i++){

        //     valid_id[i] = Ext.getCmp(str[i]);

        if(Ext.getCmp('profile_name').isValid() === false){
            Ext.getCmp('profile_name').focus();
            me.valid_set = true;
            return false; }
        // }

        if(me.edit === "edit"){
            var chk_num = 0;
            for(var i in store2.data.items){
                if(store2.data.items[i].data.name === Ext.getCmp('profile_name').getValue()){
                    if(Number(i) !== Number(me.edit_index)){ chk_num++; }
                }
            }
            if(chk_num > 0){ chk = true; }
        }
        else{
            for(var i in store2.data.items){
                if(store2.data.items[i].data.name === Ext.getCmp('profile_name').getValue()){ chk = true; }
            }
        }

        if(chk){
            me.set_btn = true;
            Ext.getCmp('profile_name').isValid();
            return false;
        }
        var update;
        //var _store = Ext.data.StoreManager.lookup('store_ips_profile_list');
        //    me.last_p_id = (_store.getCount() === 0)? 0:_store.last().data['profile_id'];
        if(me.edit === "edit"){update = true;}
        else{update = false;}
        // if(me.edit === "edit"){
        //     use_signatures = me.edit_fsid;

        //     var obj = {
        //         'name' : Ext.getCmp('profile_name').getValue(),
        //         'profile_id' : me.p_id,
        //         'profile_disc' : Ext.getCmp('profile_disc').getValue(),
        //         use_signatures : use_signatures
        //     };

        //     obj['@cid'] = me.cid;
        //     showCompLoadMask(Ext.getCmp('win_add_ips_profile'));
        //     var _params = {
        //         basename : Ext.encode('ips_profile'),
        //         obj : Ext.encode(obj),
        //         update : Ext.encode(update)
        //     };

        //     request_helper.xmlrpc_call_Ajax_Post(

        //         'ftuctrl',
        //         'setListTypeObj',
        //         _params,

        //         function(response){
        //             hideCompLoadMask(Ext.getCmp('win_add_ips_profile'));
        //             Ext.getCmp('NFW2_ips_profile').get_profile();
        //             Ext.Msg.show({
        //                 title: 'WeGuardia™ ZEN',
        //                 msg: get_msg("msg_ok_edit"),
        //                 width: 300,
        //                 buttons: Ext.Msg.OK,
        //                 fn: setWinClose,
        //                 icon: Ext.window.MessageBox.INFO
        //             });
        //         }
        //     );
        // }
        // else{
        if(me.total === 0){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(get_msg('sel_signature'));
            return false;
        }
        var add_data = [];

        //     if(me.count > me.page_num*1000){
        //         for(var i = 0;i<store.data.items.length;i++){
        //             for(var k in me.tbl_fsid){
        //                 if(me.tbl_fsid[k]['@fsid'] === store.data.items[i].data['@fsid']){ me.tbl_fsid.splice(k,1); }
        //             }
        //         }
        //     }
        //     else{
        //         for(var j = 0;j< store.data.items.length;j++){
        //             for(var l in me.tbl_fsid){
        //                 if(me.tbl_fsid[l]['@fsid'] === store.data.items[j].data['@fsid']){ me.tbl_fsid.splice(l,1); }
        //             }
        //         }
        //     }

        var con = [];

        for(var i in me.tbl_fsid){
            con.push({
                "@fsid" : me.tbl_fsid[i]['@fsid']
            });
        }
        for(var i in tbl_sel){
            con.push({
                "@fsid" : tbl_sel[i].data['@fsid']
            });
        }
        console.log(me.tbl_fsid);
        for(var i in me.tbl_fsid){
            var audit_add;
            var use_add;

            if(me.tbl_fsid[i]['audit'] === "" || me.tbl_fsid[i]['audit'] === undefined){ audit_add = "off"; }
            else{ audit_add = me.tbl_fsid[i]['audit']; }
            if(me.tbl_fsid[i]['use'] === "" || me.tbl_fsid[i]['use'] === undefined){ use_add = "on"; }
            else{ use_add = me.tbl_fsid[i]['use']; }
            if(me.isCC){
                add_data.push({
                    '@fsid' : me.tbl_fsid[i]['@fsid'],
                    'action' : me.tbl_fsid[i].action,
                    //             'audit' : audit_add,
                    'use' : use_add
                });
            }
            else{
                add_data.push({
                    '@fsid' : me.tbl_fsid[i]['@fsid'],
                    'action' : me.tbl_fsid[i].action,
                    'audit' : audit_add,
                    'use' : use_add
                });
            }
        }

        //     for(var i in tbl_sel){
        //         var add_chk = 0;
        //         for(var j in add_data){
        //             if(add_data[j]['@fsid'] === tbl_sel[i].data['@fsid']){
        //                 add_chk = 1;
        //             }
        //         }
        //         if(add_chk === 0){
        //             var audit_tbl;
        //             var use_tbl;

        //             if(tbl_sel[i].data['audit'] === ""){ audit_tbl = "off"; }
        //             else{ audit_tbl = tbl_sel[i].data.audit; }
        //             if(tbl_sel[i].data['use'] === ""){ use_tbl = "on"; }
        //             else{ use_tbl = tbl_sel[i].data.use; }
        //             if(me.isCC){
        //                 add_data.push({
        //                     '@fsid' : tbl_sel[i].data['@fsid'],
        //                     'action' : tbl_sel[i].data.action,
        //                     //                 'audit' : audit_tbl,
        //                     'use' : use_tbl
        //                 });
        //             }
        //             else{
        //                 add_data.push({
        //                     '@fsid' : tbl_sel[i].data['@fsid'],
        //                     'action' : tbl_sel[i].data.action,
        //                     'audit' : audit_tbl,
        //                     'use' : use_tbl
        //                 });
        //             }
        //         }
        //     }

        if(add_data.length === 0){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(get_msg('sel_signature'));
            return false;
        }

        for(var i=0; i<add_data.length; i++){
            var action;
            var audit;
            var use;

            if(add_data[i]['action'] === "" || add_data[i]['action'] === undefined){ action = "alert"; }
            else{ action = add_data[i].action; }
            if(add_data[i]['audit'] === "" || add_data[i]['audit'] === undefined){ audit = "off"; }
            else{ audit = add_data[i].audit; }
            if(add_data[i]['use'] === "" || add_data[i]['use'] === undefined ){ use = "on"; }
            else{ use = add_data[i].use; }

            for(var j in me.edit_fsid){
                if(add_data[i]['@fsid'] === me.edit_fsid[j]['@fsid']){
                    if(me.isCC){
                        action = me.edit_fsid[j].action;
                        //                 audit = me.edit_fsid[j].audit;
                        use = me.edit_fsid[j].use;
                    }
                    else{
                        action = me.edit_fsid[j].action;
                        audit = me.edit_fsid[j].audit;
                        use = me.edit_fsid[j].use;
                    }

                }
            }

            if(me.isCC){
                signature[i] = {
                    '@fsid' : add_data[i]['@fsid'],
                    'action' : action,
                    //             'audit' : audit,
                    'use' : use
                };
            }
            else{
                signature[i] = {
                    '@fsid' : add_data[i]['@fsid'],
                    'action' : action,
                    'audit' : audit,
                    'use' : use
                };
            }

            use_signatures.push(signature[i]);
        }

        //     for(var k in me.tbl_id){
        //         add_data.push({ '@fsid' : me.tbl_id[k] });
        //     }

        //     for(var i in add_data){
        //         var chk = true;
        //         for(var j in me.edit_fsid){
        //             if(add_data[i]['@fsid'] === me.edit_fsid[j]['@fsid']){
        //                 add_data[i].action = me.edit_fsid[j].action;
        //                 add_data[i].audit = me.edit_fsid[j].audit;
        //                 add_data[i].use = me.edit_fsid[j].use;
        //                 chk = false;
        //             }
        //         }
        //         if(chk === true){
        //             add_data[i].action = "alert";
        //             add_data[i].audit = "off";
        //             add_data[i].use = "on";
        //         }
        //     }
        console.log(use_signatures);
        if(me.edit === "edit"){
            var obj = {
                'name' : Ext.getCmp('profile_name').getValue(),
                'profile_id' : me.p_id,
                'profile_disc' : Ext.getCmp('profile_disc').getValue(),
                use_signatures : use_signatures
            };
        }
        else{
            var obj = {
                'name' : Ext.getCmp('profile_name').getValue(),
                'profile_disc' : Ext.getCmp('profile_disc').getValue(),
                use_signatures : use_signatures
            };
        }

        showCompLoadMask(Ext.getCmp('win_add_ips_profile'));
        var _params = {

            basename : Ext.encode('ips_profile'),
            obj : Ext.encode(obj),
            update : Ext.encode(update)
        };
        console.log(obj);
        request_helper.xmlrpc_call_Ajax_Post(

            'ftuctrl',
            'setListTypeObj',
            _params,

            function(response){
                hideCompLoadMask(Ext.getCmp('win_add_ips_profile'));
                Ext.getCmp('NFW2_ips_profile').get_profile();

                if(me.edit === "edit"){
                    Ext.Msg.show({
                        title: __weguardia,
                        width: 300,
                        msg: get_msg('msg_ok_edit'),
                        buttons: Ext.Msg.OK,
                        fn:setWinClose,
                        icon: Ext.window.MessageBox.INFO
                    });
                }
                else{
                    Ext.Msg.show({
                        title: __weguardia,
                        msg: get_msg("msg_ok_add"),
                        width: 300,
                        buttons: Ext.Msg.YESNO,
                        buttonText:{
                            yes: __zen('add_plus'),
                            no: __zen('close')
                        },
                        fn: me.chk_cnter,
                        icon: Ext.window.MessageBox.INFO
                    });
                }
            }
        );
    },

    onBtn_resetClick: function(button, e, eOpts) {
        var me = this;

        // if(me.edit === "edit"){
        //     if(Ext.getCmp('NFW2_client').clientInfo.perspectiveInfo > 3){
        //     if(me.up_back !== me.edit_fsid){
        //         var obj = {};

        //         obj = {
        //             '@cid' : me.records['@cid'],
        //             'profile_id' : me.records['profile_id'],
        //             'name' : me.records['name'],
        //             'profile_disc' : me.records['profile_disc'],
        //             use_signatures : me.up_back
        //         };
        //         showLoadMask();

        //         var _params = {

        //             basename : Ext.encode('ips_profile'),
        //             obj : Ext.encode(obj),
        //             update : Ext.encode(true)
        //         };

        //         request_helper.xmlrpc_call_Ajax_Post(

        //             'ftuctrl',
        //             'setListTypeObj',
        //             _params,

        //             function(response){
        //                 hideLoadMask();
        //             }
        //         );
        //     }
        //     }
        // }

        this.close();
    },

    chk_cnter: function(btn) {
        var me = this;
        var _store = Ext.data.StoreManager.lookup('store_ips_profile_list');
        var win = Ext.getCmp('win_add_ips_profile');
        if(btn === "no"){
            win.close();

        }else{
            showLoadMask();
            var _params = {

                filename: Ext.encode('/proc/ferret/datasheet/ips_profile')
            };

            request_helper.xmlrpc_call_JsonP(

                'ftuctrl',
                'getFileContent',
                _params,

                function(response){
                    hideLoadMask();
                    var Maxcnt = (_store.getTotalCount() >= response[0])? false:true;

                    if(Maxcnt === false){

                        Ext.Msg.alert("",ValidMaxCnt(response[0]));
                        win.close();
                        return false;

                    }else{
                        var _store_list = Ext.data.StoreManager.lookup('store_ips_profile_signature_list');
                        me.tbl_fsid = [];
                        me.edit_fsid = [];
                        _store_list.getProxy().setExtraParam('group_id_list',Ext.encode([]));
                        showCompLoadMask(Ext.getCmp('win_add_ips_profile'));
                        _store_list.load(function(){
                            hideCompLoadMask(Ext.getCmp('win_add_ips_profile'));
                            Ext.getCmp('tbl_chk').setText("0 "+__zen('check_count'));
                            Ext.getCmp('ips_signature_list').getSelectionModel().deselectAll();
                        });
                        Ext.getCmp("fm").getForm().reset();
                        Ext.ComponentQuery.query('label[cls="errorBox"]').forEach(function(cls){ cls.hide(); });
                    }

                }
            );

        }
    },

    select_ips_group: function(val) {
        var me = this;
        var remove = false;
        var allchk = false;
        var group = [];

        var _store = Ext.data.StoreManager.lookup('store_ips_profile_signature_list');
        var _store_group = Ext.data.StoreManager.lookup('store_ips_profile_group');

        //_store.loadPage(1);
        //var store_use = Ext.data.StoreManager.lookup('store_use_signature');
        var cnt = Ext.data.StoreManager.lookup('store_ips_profile_group').getCount();

        var tbl = Ext.getCmp("ips_signature_list");
        var tbl_sel = tbl.getSelectionModel().getSelection();

        var _selectList = [];
        var chk = 0;

        for(var i=0; i<cnt; i++){
            if(Ext.getCmp('c_'+i).value === true){
                chk++;
            }
        }

        if(me.edit === "edit"){
            for(var i=0; i<cnt; i++){

                if(val === 0){
                    me.group_filter = false;
                    if(!Ext.getCmp('c_total').getValue()){
                        allchk = true;
                    }
                    else{
        //                 Ext.getCmp('c_total').setValue(true);

                        for(var k=0; k<cnt; k++){

        //                     Ext.getCmp('c_'+k).setValue(true);
                        }
                        remove = false;
                        _store.getProxy().setExtraParam('group_id_list',Ext.encode([]));
                        break;
                    }

                }else if(chk === cnt){
                    //             Ext.getCmp('c_total').setValue(true);
                    me.group_filter = false;
                    for(var k=0; k<cnt; k++){

        //                 Ext.getCmp('c_'+k).setValue(true);
                    }
                    _store.getProxy().setExtraParam('group_id_list',Ext.encode([]));
                }
                else{
                    me.group_filter = true;
                    //             Ext.getCmp('c_total').setValue(false);

                    if(Ext.getCmp('c_'+i).getValue()){

                        if(Ext.getCmp('c_'+i).inputValue === null){

                            //                     Ext.getCmp('c_total').setValue(false);

                        }else{
                            var records = [];
                            _selectList.push(/*{'group_id':*/Ext.getCmp('c_'+i).inputValue/*}*/);
                            group.push(Ext.getCmp('c_'+i).inputValue);
                            cond = {"$or":_selectList};
                            for(var m in me.use_records){
                                for(var n in _selectList){
                                    if(me.use_records[m].group_id === _selectList[n].group_id){
                                        records.push(me.use_records[m]);
                                    }
                                }
                            }
                            //store_use.loadData(records);
                        }
                    }
                    if(chk === 0){ remove = true; _store.removeAll(); }
                    else{ _store.getProxy().setExtraParam('group_id_list',Ext.encode(group)); }
                }

            }
        }
        else{
            var cond = {};
            var slchk;
            var splice_chk = 0;

            slchk = 0;

            for(var i=0; i<cnt; i++){

                if(val === 0){
                    me.group_filter = false;
                    if(!Ext.getCmp('c_total').getValue()){
                        allchk = true;
                    }
                    else{
                        //                 Ext.getCmp('c_total').setValue(true);

                        //                 for(var k=0; k<cnt; k++){

                        //                     Ext.getCmp('c_'+k).setValue(true);
                        //                 }
                        if(slchk === 0){
                            for(var j in tbl_sel){
                                if(me.isCC){
                                    me.tbl_fsid.push({
                                        '@fsid' : tbl_sel[j].data['@fsid'],
                                        'group_id' : tbl_sel[j].data['group_id'],
                                        //                             'audit' : tbl_sel[j].data['audit'],
                                        'use' : tbl_sel[j].data['use'],
                                        'action' : tbl_sel[j].data['action']
                                    });
                                }
                                else{
                                    me.tbl_fsid.push({
                                        '@fsid' : tbl_sel[j].data['@fsid'],
                                        'group_id' : tbl_sel[j].data['group_id'],
                                        'audit' : tbl_sel[j].data['audit'],
                                        'use' : tbl_sel[j].data['use'],
                                        'action' : tbl_sel[j].data['action']
                                    });
                                }
                                slchk = 1;
                            }
                        }
                        remove = false;
                        _store.getProxy().setExtraParam('group_id_list',Ext.encode([]));
                        break;
                    }
                }else if(chk === cnt){
                    me.group_filter = false;
                    //             Ext.getCmp('c_total').setValue(true);

                    //             for(var k=0; k<cnt; k++){

                    //                 Ext.getCmp('c_'+i).setValue(true);
                    //             }
                    if(slchk === 0){
                        for(var j in tbl_sel){
                            if(me.isCC){
                                me.tbl_fsid.push({
                                    '@fsid' : tbl_sel[j].data['@fsid'],
                                    'group_id' : tbl_sel[j].data['group_id'],
                                    //                         'audit' : tbl_sel[j].data['audit'],
                                    'use' : tbl_sel[j].data['use'],
                                    'action' : tbl_sel[j].data['action']
                                });
                            }
                            else{
                                me.tbl_fsid.push({
                                    '@fsid' : tbl_sel[j].data['@fsid'],
                                    'group_id' : tbl_sel[j].data['group_id'],
                                    'audit' : tbl_sel[j].data['audit'],
                                    'use' : tbl_sel[j].data['use'],
                                    'action' : tbl_sel[j].data['action']
                                });
                            }
                            slchk = 1;
                        }
                    }
                    _store.getProxy().setExtraParam('group_id_list',Ext.encode([]));
                }
                else{
                    me.group_filter = true;
                    //             Ext.getCmp('c_total').setValue(false);

                    if(Ext.getCmp('c_'+i).getValue()){

                        if(Ext.getCmp('c_'+i).inputValue === null){

                            //                     Ext.getCmp('c_total').setValue(false);

                        }else{
                            _selectList.push({'group_id':Ext.getCmp('c_'+i).inputValue});
                            group.push(Ext.getCmp('c_'+i).inputValue);
                            cond = {"$or":_selectList};
                        }
                    }

                    if(slchk === 0){
                        if(tbl_sel.length !== 0){
                            for(var j in tbl_sel){
                                if(me.isCC){
                                    me.tbl_fsid.push({
                                        '@fsid' : tbl_sel[j].data['@fsid'],
                                        'group_id' : tbl_sel[j].data['group_id'],
                                        //                                 'audit' : tbl_sel[j].data['audit'],
                                        'use' : tbl_sel[j].data['use'],
                                        'action' : tbl_sel[j].data['action']
                                    });
                                }
                                else{
                                    me.tbl_fsid.push({
                                        '@fsid' : tbl_sel[j].data['@fsid'],
                                        'group_id' : tbl_sel[j].data['group_id'],
                                        'audit' : tbl_sel[j].data['audit'],
                                        'use' : tbl_sel[j].data['use'],
                                        'action' : tbl_sel[j].data['action']
                                    });
                                }
                            }
                        }
                        slchk = 1;
                    }

                    if(chk === 0){ remove = true; _store.removeAll(); }
                    else{ _store.getProxy().setExtraParam('group_id_list',Ext.encode(group)); }
                }

            }
            //_store.load();
            _store.getProxy().setExtraParam('start',Ext.encode(0));
            _store.getProxy().setExtraParam('limit',Ext.encode(1000));

            var dup = me.dup_chk(me.tbl_fsid, JSON.stringify);

            me.tbl_fsid = dup;
            if(_store.data.items.length > 0){
                if(_store.data.items.length < 1000){
                    for(var j = 0;j< _store.data.items.length;j++){
                        for(var l in me.tbl_fsid){
                            if(me.tbl_fsid[l]['@fsid'] === _store.data.items[j].data['@fsid']){ me.tbl_fsid.splice(l,1); }
                        }
                    }
                }
                else if(_store.totalCount > me.page_num*1000){
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
                    if(me.isCC){
                        me.tbl_fsid.push({
                            '@fsid' : tbl_sel[j].data['@fsid'],
                            'group_id' : tbl_sel[j].data['group_id'],
                            //                 'audit' : tbl_sel[j].data['audit'],
                            'use' : tbl_sel[j].data['use'],
                            'action' : tbl_sel[j].data['action']
                        });
                    }
                    else{
                        me.tbl_fsid.push({
                            '@fsid' : tbl_sel[j].data['@fsid'],
                            'group_id' : tbl_sel[j].data['group_id'],
                            'audit' : tbl_sel[j].data['audit'],
                            'use' : tbl_sel[j].data['use'],
                            'action' : tbl_sel[j].data['action']
                        });
                    }
                }
            }
            _store.currentPage = 1;

            me.before_list = _selectList;

        }

        if(allchk){
            me.group_filter = false;
            if(me.edit === "edit"){
                Ext.getCmp('c_total').setValue(false);

                for(var k=0; k<cnt; k++){

                    Ext.getCmp('c_'+k).setValue(false);
                }
                remove = true;
                _store.getProxy().setExtraParam('group_id_list',Ext.encode([100]));
                _store.load();
            }
            else{
                Ext.getCmp('c_total').setValue(false);

                for(var k=0; k<cnt; k++){

                    Ext.getCmp('c_'+k).setValue(false);
                }
                if(slchk === 0){
                    for(var j in tbl_sel){
                        if(me.isCC){
                            me.tbl_fsid.push({
                                '@fsid' : tbl_sel[j].data['@fsid'],
                                'group_id' : tbl_sel[j].data['group_id'],
                                //                     'audit' : tbl_sel[j].data['audit'],
                                'use' : tbl_sel[j].data['use'],
                                'action' : tbl_sel[j].data['action']
                            });
                        }
                        else{
                            me.tbl_fsid.push({
                                '@fsid' : tbl_sel[j].data['@fsid'],
                                'group_id' : tbl_sel[j].data['group_id'],
                                'audit' : tbl_sel[j].data['audit'],
                                'use' : tbl_sel[j].data['use'],
                                'action' : tbl_sel[j].data['action']
                            });
                        }
                        slchk = 1;
                    }
                }
                remove = true;
                _store.getProxy().setExtraParam('group_id_list',Ext.encode([100]));
                _store.load();
            }
        }

        if(!remove){
            showCompLoadMask(Ext.getCmp('win_add_ips_profile'));
            _store.getProxy().setExtraParam('start',Ext.encode(0));
            if(Ext.getCmp('ips_select_sig_chk').getValue()){ _store.getProxy().setExtraParam('limit',Ext.encode(10000)); }
            else{ _store.getProxy().setExtraParam('limit',Ext.encode(1000)); }
            _store.load(function(response){
                me.group_filter_length = _store.data.items.length;
                _store.load(function(){
                    hideCompLoadMask(Ext.getCmp('win_add_ips_profile'));
                    if(Ext.getCmp('ips_select_sig_chk').getValue()){ _store.getProxy().setExtraParam('limit',Ext.encode(1000)); }
                for(var k=0; k<response.length; k++){
                    for(var i in me.tbl_fsid){
                        if(me.tbl_fsid[i]['@fsid'] === response[k].data['@fsid']){
                            Ext.getCmp('ips_signature_list').getSelectionModel().select(k, true);
                        }
                    }
                }
                });
            });
        }
    },

    filter_func: function() {
        var me = Ext.getCmp('win_add_ips_profile');
        var filter_inchk = false;
        var _selectList = [];
        me.filters = {};
        var store = Ext.data.StoreManager.lookup('store_ips_profile_signature_list');

        var profile = [];
        // if(Ext.getCmp('search_profile').valueCollection.length !== 0){
        //     profile.push(Ext.getCmp('search_profile').valueCollection.items[0].id);
        // }

        if(Ext.getCmp('search_profile').valueCollection.length !== 0){
            for(var l = 0;l < me.group_cnt;l++){
                if(Ext.getCmp('c_'+l)){
                    if(Ext.getCmp('c_'+l).getValue()){
                        profile.push(Ext.getCmp('c_'+l).inputValue);
                    }
                }
            }

            for(var m in profile){
                if(profile[m] === Ext.getCmp('search_profile').valueCollection.items[0].id){
                    var profile = [];
                    profile.push(Ext.getCmp('search_profile').valueCollection.items[0].id);

                    filter_inchk = true;
                    break;
                }
                else{
                    filter_inchk = false;
                }
            }
        }
        else{
            for(var l = 0;l < me.group_cnt;l++){
                if(Ext.getCmp('c_'+l)){
                    if(Ext.getCmp('c_'+l).getValue()){
                        profile.push(Ext.getCmp('c_'+l).inputValue);
                        filter_inchk = true;
                    }
                }
            }
        }

        var fsid = Ext.getCmp('search_fsid').getValue();
        var name = Ext.getCmp('search_name').getValue();
        var protocol = Ext.getCmp('search_protocol').getValue();
        var src_ip = Ext.getCmp('search_src').getValue();
        var src_port = Ext.getCmp('search_srcport').getValue();
        var dst_ip = Ext.getCmp('search_dst').getValue();
        var dst_port = Ext.getCmp('search_dstport').getValue();
        var hazard = Ext.getCmp('search_hazard').getValue();
        var dt_time = Ext.getCmp('search_dt_time').getValue();
        var dt_num = Ext.getCmp('search_dt_num').getValue();
        var bl_time = Ext.getCmp('search_bl_time').getValue();
        var bl_type = Ext.getCmp('search_bl_type').getValue();
        var action = Ext.getCmp('search_action').getValue();
        var direction = Ext.getCmp('search_direction').getValue();
        var audit = Ext.getCmp('search_audit').getValue();
        var use = Ext.getCmp('search_use').getValue();

        if(Ext.getCmp('search_fsid').getValue() !== ''){ me.filters['@fsid'] = Number(fsid); filter_inchk = true; }
        if(Ext.getCmp('search_name').getValue() !== ''){ me.filters['signature_name'] =  {'$regex':'.*'+name+'.*','$options':'-i'}; filter_inchk = true;}
        if(Ext.getCmp('search_protocol').getValue() !== null){ me.filters['protocol'] = {'$regex':protocol.toLowerCase(),'$options':'-i'}; filter_inchk = true; }
        if(Ext.getCmp('search_src').getValue() !== ''){ me.filters['src_addr'] =  src_ip.toLowerCase(); filter_inchk = true; }
        if(Ext.getCmp('search_srcport').getValue() !== ''){ me.filters['src_port'] = String(src_port).toLowerCase(); filter_inchk = true;}
        if(Ext.getCmp('search_dst').getValue() !== ''){ me.filters['dest_addr'] = dst_ip.toLowerCase(); filter_inchk = true;}
        if(Ext.getCmp('search_dstport').getValue() !== ''){ me.filters['dest_port'] = String(dst_port).toLowerCase(); filter_inchk = true;}
        if(Ext.getCmp('search_hazard').getValue() !== null){ me.filters['hazard'] = hazard; filter_inchk = true;}
        if(Ext.getCmp('search_dt_time').getValue() !== ''){ me.filters['detection_time'] = Number(dt_time); filter_inchk = true;}
        if(Ext.getCmp('search_dt_num').getValue() !== ''){ me.filters['detection_num'] = Number(dt_num); filter_inchk = true;}
        if(Ext.getCmp('search_bl_time').getValue() !== ''){ me.filters['block_time'] = Number(bl_time); filter_inchk = true;}
        if(Ext.getCmp('search_bl_type').getValue() !== null){ me.filters['block_type'] = bl_type; filter_inchk = true;}
        if(Ext.getCmp('search_direction').getValue() !== null){ me.filters['direction'] = direction; filter_inchk = true;}

        var size = 0, key;
        for (key in me.filters) {
            if (me.filters.hasOwnProperty(key)) size++;
        }

        if(size !== 0){
            me.filter_flag = 1;
            store.getProxy().setExtraParam('cond',Ext.encode(me.filters));
        }
        else{ store.getProxy().setExtraParam('cond',Ext.encode()); }
        // store.getProxy().setExtraParam('group_id_list',Ext.encode(profile));
        if(filter_inchk === true){
            store.getProxy().setExtraParam('group_id_list',Ext.encode(profile));
        }
        else{ store.getProxy().setExtraParam('group_id_list',Ext.encode([100])); }
        store.getProxy().setExtraParam('limit',Ext.encode(10000));
        store.currentPage = 1;
        showCompLoadMask(Ext.getCmp('win_add_ips_profile'));
        store.load(function(response){
            if(Ext.getCmp('ips_select_sig_chk').getValue()){ store.getProxy().setExtraParam('limit',Ext.encode(10000)); }
            else{ store.getProxy().setExtraParam('limit',Ext.encode(1000)); }
            store.currentPage = 1;
            store.load(function(response){
                console.log(response);
                if(Ext.getCmp('ips_select_sig_chk').getValue()){ store.getProxy().setExtraParam('limit',Ext.encode(1000)); }
                //store.loadData(me.tri_search);
                hideCompLoadMask(Ext.getCmp('win_add_ips_profile'));
            });
        });
    },

    dup_chk: function(ary, key) {
        var seen = {};
        return ary.filter(function(elem) {
            var k = key(elem);
            return (seen[k] === 1) ? 0 : seen[k] = 1;
        });

    }

});