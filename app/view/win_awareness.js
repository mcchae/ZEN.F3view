
Ext.define('NFW2.view.win_awareness', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_awareness',

    requires: [
        'NFW2.view.win_awarenessViewModel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.button.Split',
        'Ext.menu.Menu',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.grid.plugin.CellEditing',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'win_awareness'
    },
    cls: 'zen_win',
    id: 'win_awareness',
    scrollable: true,
    width: 1000,
    title: '애플리케이션 제어 추가',
    modal: true,
    defaultListenerScope: true,

    listeners: {
        beforerender: 'onWin_awarenessBeforeRender',
        afterrender: 'onWin_awarenessAfterRender',
        close: 'onWin_awarenessClose'
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
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onButtonClick1'
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
    ],

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        itemId: 'fm',
                        scrollable: true,
                        layout: 'auto',
                        bodyPadding: 20,
                        title: '',
                        items: [
                            {
                                xtype: 'container',
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
                                                id: 'name',
                                                width: 400,
                                                labelSeparator: ' ',
                                                msgTarget: 'none',
                                                enforceMaxLength: true,
                                                maxLength: 63,
                                                minLength: 1,
                                                bind: {
                                                    fieldLabel: '{profile_name}'
                                                },
                                                listeners: {
                                                    errorchange: 'onNameErrorChange',
                                                    blur: 'onNameBlur'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'desc',
                                        width: 400,
                                        labelSeparator: ' ',
                                        enforceMaxLength: true,
                                        maxLength: 255,
                                        minLength: 1,
                                        bind: {
                                            fieldLabel: '{desc}'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                margin: '5 0 0 0',
                                minWidth: 770,
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        minWidth: 770,
                                        padding: 5,
                                        collapsible: true,
                                        items: [
                                            {
                                                xtype: 'container',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'fieldset',
                                                        flex: 2,
                                                        id: 'field_category',
                                                        margin: '0 5 0 0',
                                                        listeners: {
                                                            render: 'onField_categoryRender'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'fieldset',
                                                        flex: 1,
                                                        id: 'field_technology',
                                                        margin: '0 5 0 0',
                                                        listeners: {
                                                            render: 'onField_technologyRender'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'fieldset',
                                                        flex: 3,
                                                        id: 'field_purpose',
                                                        margin: '0 5 0 0',
                                                        listeners: {
                                                            render: 'onField_purposeRender'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'fieldset',
                                                        flex: 1.1,
                                                        id: 'field_popularity',
                                                        margin: '0 2 0 0',
                                                        listeners: {
                                                            render: 'onField_popularityRender'
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch',
                                                    pack: 'end',
                                                    padding: '5 0 0 0'
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
                                                                xtype: 'textfield',
                                                                id: 'search_name',
                                                                fieldLabel: '',
                                                                enableKeyEvents: true,
                                                                listeners: {
                                                                    keydown: 'onSearch_nameKeydown',
                                                                    render: 'onSearch_nameRender'
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
                                                                id: 'search_reset',
                                                                margin: '0 0 0 5',
                                                                iconCls: 'icb_reset',
                                                                listeners: {
                                                                    click: 'onButtonClick3'
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'checkboxfield',
                                                        id: 'chk_user',
                                                        margin: '0 5 0 0 ',
                                                        listeners: {
                                                            change: 'onCheckboxfieldChange',
                                                            beforerender: 'onChk_userBeforeRender'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'checkboxfield',
                                                        id: 'chk_app',
                                                        fieldLabel: '',
                                                        listeners: {
                                                            change: 'onChk_appChange',
                                                            beforerender: 'onChk_appBeforeRender'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'splitbutton',
                                                        handler: function(button, e) {
                                                            this.showMenu();
                                                        },
                                                        cls: 'btn_b',
                                                        margin: '0 0 0 5',
                                                        menuAlign: 'tr-br',
                                                        bind: {
                                                            text: '{edit_action_batch}'
                                                        },
                                                        menu: {
                                                            xtype: 'menu',
                                                            id: 'act_menu',
                                                            width: 200,
                                                            items: [
                                                                {
                                                                    xtype: 'container',
                                                                    padding: 5,
                                                                    items: [
                                                                        {
                                                                            xtype: 'container',
                                                                            layout: {
                                                                                type: 'hbox',
                                                                                align: 'stretch'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'combobox',
                                                                                    flex: 1,
                                                                                    id: 'all_action',
                                                                                    value: 'detect',
                                                                                    editable: false,
                                                                                    displayField: 'name',
                                                                                    valueField: 'val',
                                                                                    listeners: {
                                                                                        change: 'onAll_actionChange'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    xtype: 'combobox',
                                                                                    flex: 1,
                                                                                    disabled: true,
                                                                                    id: 'all_qos',
                                                                                    margin: '0 0 0 5',
                                                                                    editable: false,
                                                                                    emptyText: 'Select',
                                                                                    displayField: 'name',
                                                                                    queryMode: 'local',
                                                                                    store: 'store_profile_qos',
                                                                                    valueField: 'cid'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            cls: 'errorBox',
                                                                            hidden: true,
                                                                            id: 'err_qos',
                                                                            margin: '5 0 0 0'
                                                                        },
                                                                        {
                                                                            xtype: 'button',
                                                                            cls: 'ft_confirm_s',
                                                                            margin: '10 0 0 40',
                                                                            width: 100,
                                                                            iconCls: 'ft_confirm_icl',
                                                                            bind: {
                                                                                text: '{confirm}'
                                                                            },
                                                                            listeners: {
                                                                                click: 'onButtonClick4'
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            }
                                        ],
                                        listeners: {
                                            collapse: 'onFieldsetCollapse',
                                            expand: 'onFieldsetExpand'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                height: 320,
                                id: 'con_grid',
                                margin: '5 0 0 0',
                                minWidth: 790,
                                scrollable: true,
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'gridpanel',
                                        flex: 1,
                                        id: 'grid_application',
                                        title: '',
                                        columnLines: true,
                                        store: 'store_profile_ref_list',
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                width: 120,
                                                dataIndex: 'name',
                                                bind: {
                                                    text: '{application_name}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'category',
                                                flex: 1,
                                                bind: {
                                                    text: '{categorys}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'technology',
                                                flex: 1,
                                                bind: {
                                                    text: '{technology}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'purpose',
                                                flex: 1,
                                                bind: {
                                                    text: '{purpose}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return '<button class="ic_star_'+value+'" />';
                                                },
                                                width: 95,
                                                align: 'center',
                                                dataIndex: 'popularity',
                                                bind: {
                                                    text: '{awareness}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'content_type',
                                                flex: 1,
                                                bind: {
                                                    text: '{content_type}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'released_date',
                                                flex: 1,
                                                bind: {
                                                    text: '{renewal_date}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'vendor',
                                                flex: 1,
                                                bind: {
                                                    text: '{company}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'protocols',
                                                flex: 1,
                                                bind: {
                                                    text: '{protocol}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                colspan: '2',
                                                width: 150,
                                                sortable: false,
                                                groupable: false,
                                                hideable: false,
                                                lockable: false,
                                                bind: {
                                                    text: '{action}'
                                                },
                                                columns: [
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var act_list = Ext.getCmp("win_awareness").act_list;

                                                            metaData.tdCls = 'cell_combo';
                                                            var val = (act_list[record.data.rid])?act_list[record.data.rid].type:'detect';
                                                            record.data.action = val;

                                                            return (val==='detect')?__zen('detect'):(val==='block')?__zen('block'):"QoS";
                                                        },
                                                        height: 0,
                                                        style: 'border:none',
                                                        sortable: false,
                                                        dataIndex: 'action',
                                                        hideable: false,
                                                        lockable: false,
                                                        menuDisabled: true,
                                                        text: ' ',
                                                        variableRowHeight: true,
                                                        editor: {
                                                            xtype: 'combobox',
                                                            baseCls: 'cell_combo',
                                                            itemId: 'grid_action',
                                                            value: 'detect',
                                                            editable: false,
                                                            emptyText: 'Select',
                                                            displayField: 'name',
                                                            queryMode: 'local',
                                                            valueField: 'val',
                                                            listeners: {
                                                                beforerender: 'onGrid_actionBeforeRender',
                                                                change: 'onGrid_actionChange',
                                                                focus: 'onGrid_actionFocus'
                                                            }
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var act_list = Ext.getCmp("win_awareness").act_list;

                                                            metaData.tdCls = 'cell_combo';

                                                            var val = (act_list[record.data.rid])?act_list[record.data.rid]:'';

                                                            return (val.qos)?val.qos.name:'';
                                                        },
                                                        height: 0,
                                                        style: 'border:none',
                                                        sortable: false,
                                                        dataIndex: 'qos',
                                                        hideable: false,
                                                        lockable: false,
                                                        menuDisabled: true,
                                                        text: ' ',
                                                        editor: {
                                                            xtype: 'combobox',
                                                            baseCls: 'cell_combo',
                                                            itemId: 'grid_qos',
                                                            editable: false,
                                                            emptyText: 'Select',
                                                            displayField: 'name',
                                                            queryMode: 'local',
                                                            store: 'store_profile_qos',
                                                            valueField: 'cid',
                                                            listeners: {
                                                                focus: 'onGrid_qosFocus',
                                                                change: 'onGrid_qosChange'
                                                            }
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var me = Ext.getCmp("win_awareness");

                                                    var up = Ext.id();

                                                    Ext.defer(function(){
                                                        Ext.widget('button', {
                                                            renderTo: up,
                                                            cls: 'b_move_up',
                                                            handler: function(){
                                                                me.row_up_dw(rowIndex,"up");
                                                            }
                                                        });
                                                    }, 50);

                                                    var dw = Ext.id();
                                                    Ext.defer(function () {
                                                        Ext.widget('button', {
                                                            renderTo: dw,
                                                            cls: 'b_move_dw',
                                                            handler: function(){
                                                                me.row_up_dw(rowIndex,"dw");
                                                            }
                                                        });
                                                    }, 50);


                                                    return Ext.String.format('<div id="{0}"></div>', up)+Ext.String.format('<div id="{0}"></div>', dw);


                                                },
                                                hidden: true,
                                                width: 40,
                                                align: 'center',
                                                dataIndex: '_id',
                                                text: ''
                                            }
                                        ],
                                        viewConfig: {
                                            loadMask: false,
                                            markDirty: false
                                        },
                                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                                            selType: 'checkboxmodel',
                                            mode: 'SIMPLE',
                                            listeners: {
                                                select: 'onCheckboxModelSelect',
                                                deselect: 'onCheckboxModelDeselect',
                                                beforeselect: 'onCheckboxModelBeforeSelect',
                                                beforedeselect: 'onCheckboxModelBeforeDeselect'
                                            }
                                        }),
                                        listeners: {
                                            cellclick: 'onGrid_applicationCellClick'
                                        },
                                        plugins: [
                                            {
                                                ptype: 'cellediting',
                                                pluginId: 'cell_split',
                                                clicksToEdit: 1,
                                                listeners: {
                                                    beforeedit: 'onCellEditingBeforeEdit'
                                                }
                                            }
                                        ]
                                    }
                                ]
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

    onNameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error,null);
    },

    onNameBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onField_categoryRender: function(component, eOpts) {
        var tbutton = {
            xtype: 'container',
            margin: '3 0 0 0',
            style: 'float:left',
            html: '<input type="checkbox" id="all_category" class="chk_category" checked onclick=chk_toggle("win_awareness",this) />'
        };

        component.setTitle(__zen('categorys'));
        component.legend.add(tbutton);
    },

    onField_technologyRender: function(component, eOpts) {
        var tbutton = {
            xtype: 'container',
            margin: '3 0 0 0',
            style: 'float:left',
            html: '<input type="checkbox" id="all_technology" class="chk_technology" checked onclick=chk_toggle("win_awareness",this) />'
        };

        component.setTitle(__zen('technology'));
        component.legend.add(tbutton);
    },

    onField_purposeRender: function(component, eOpts) {
        var tbutton = {
            xtype: 'container',
            margin: '3 0 0 0',
            style: 'float:left',
            html: '<input type="checkbox" id="all_purpose" class="chk_purpose" checked onclick=chk_toggle("win_awareness",this) />'
        };

        component.setTitle(__zen('purpose'));
        component.legend.add(tbutton);
    },

    onField_popularityRender: function(component, eOpts) {
        var tbutton = {
            xtype: 'container',
            margin: '3 0 0 0',
            style: 'float:left',
            html: '<input type="checkbox" id="all_popularity" class="chk_popularity" checked onclick=chk_toggle("win_awareness",this) />'
        };

        component.setTitle(__zen('awareness'));
        component.legend.add(tbutton);
    },

    onSearch_nameKeydown: function(textfield, e, eOpts) {
        if(e.getCharCode() === 13){
            this.onButtonClick2();
        }
    },

    onSearch_nameRender: function(component, eOpts) {
        component.emptyText = __zen('application_msg1');
        component.applyEmptyText();
    },

    onButtonClick2: function(button, e, eOpts) {
        this.search_name = Ext.getCmp("search_name").getValue();
        Ext.getCmp("search_reset").show();
        this.findAppList(null);
    },

    onButtonClick3: function(button, e, eOpts) {
        Ext.getCmp("search_name").reset();
        button.hide();
        this.search_name = '';
        this.findAppList(null);
    },

    onCheckboxfieldChange: function(field, newValue, oldValue, eOpts) {

        this.onChk_appChange();
    },

    onChk_userBeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('application_msg2');
    },

    onChk_appChange: function(field, newValue, oldValue, eOpts) {
        var me = Ext.getCmp("win_awareness");

        var sel_obj = me.sel_obj;
        var _store = Ext.data.StoreManager.lookup("store_profile_ref_list");
        var f_store = Ext.data.StoreManager.lookup("store_profile_ref_full_list");
        var grid_chk = Ext.getCmp("grid_application").getSelectionModel().getSelection();
        var chk_user = Ext.getCmp("chk_user").getValue();
        var chk_app = Ext.getCmp("chk_app").getValue();

        if(chk_app){
            var record = [];

            for(var i in sel_obj){

                var chk_dob = f_store.find('name',sel_obj[i].data.name);
                if(chk_dob === -1){ continue; }

                if(chk_user){
                    if(sel_obj[i].data._type === 'user'){
                        record.push(sel_obj[i]);
                    }
                }else{
                    record.push(sel_obj[i]);
                }
            }

            Ext.getCmp("grid_application").getStore().loadData(record);
            if(record.length === 0){ return false; }
            Ext.getCmp("grid_application").getSelectionModel().selectAll();//selModel.selectAll();


            var grid = Ext.getCmp("grid_application");
            var grid_sel = grid.getSelectionModel();
            var n_record = [];

            for(var i=0; i<grid.getStore().data.items.length; i++){
                var items = grid.getStore().data.items[i].data;
                var rid = items['rid'];

                if(sel_obj[rid]){
                    n_record.push(grid.getStore().data.items[i]);
                }
            }
            if(n_record.length === 0){ return false; }
            grid_sel.select(n_record,true,true);
        }else{
            me.findAppList();
        }
    },

    onChk_appBeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('application_msg3');
    },

    onAll_actionChange: function(field, newValue, oldValue, eOpts) {
        Ext.getCmp("err_qos").hide();
        if(newValue === "qos"){
            Ext.getCmp("all_qos").enable();
        }else{
            Ext.getCmp("all_qos").disable();
        }
    },

    onButtonClick4: function(button, e, eOpts) {
        var me = Ext.getCmp("win_awareness");
        var sel_obj = me.sel_obj;
        var act_list = me.act_list;
        var action = Ext.getCmp("all_action").getValue();
        var qos = Ext.getCmp("all_qos");

        if(action === "qos"){
            if(qos.getValue() === null){
                prt_errMsg_label(ValidSelect('QoS',1), "err_qos");
                return false;
            }
        }

        Ext.getCmp("err_qos").hide();

        var _store = Ext.data.StoreManager.lookup("store_profile_ref_list");

        for(var i=0; i<_store.data.items.length; i++){
            var rid = _store.data.items[i].data.rid;
            if(!sel_obj[rid]){ continue; }
            act_list[rid] = {'type' : action };
            if(action === 'qos'){
                act_list[rid].qos = {
                    'name': qos.getRawValue(),
                    'cid': qos.getValue()
                };
            }
        }
        Ext.getCmp("all_action").reset();
        Ext.getCmp("all_qos").reset();
        me.act_list = act_list;
        me.findAppList();
        Ext.getCmp("act_menu").hide();
    },

    onFieldsetCollapse: function(fieldset, eOpts) {
        Ext.getCmp("con_grid").setHeight(519);
    },

    onFieldsetExpand: function(fieldset, eOpts) {
        Ext.getCmp("con_grid").setHeight(320);
    },

    onGrid_actionBeforeRender: function(component, eOpts) {
        var me = Ext.getCmp("win_awareness");

        component.bindStore(me.act_record);
    },

    onGrid_actionChange: function(field, newValue, oldValue, eOpts) {
        var me = Ext.getCmp("win_awareness");

        var grid = Ext.getCmp("grid_application");
        var grid_chk = grid.getSelectionModel().getSelection();
        var act_list = me.act_list;

        act_list[me.rid] = {'type':newValue};

        me.act_list = act_list;
        field.blur();
    },

    onGrid_actionFocus: function(component, event, eOpts) {
        var grid = Ext.getCmp("grid_application");
        var chk_grid = grid.getSelectionModel();

        component.expand();
    },

    onGrid_qosFocus: function(component, event, eOpts) {
        component.expand();
    },

    onGrid_qosChange: function(field, newValue, oldValue, eOpts) {
        var me = Ext.getCmp("win_awareness");

        var grid = Ext.getCmp("grid_application");
        var grid_chk = grid.getSelectionModel().getSelection();

        me.act_list[me.rid].qos = {'name':field.getRawValue(),'cid':newValue};

        field.blur();
    },

    onCheckboxModelSelect: function(rowmodel, record, index, eOpts) {
        var me = Ext.getCmp("win_awareness");

        var sel_obj = me.sel_obj;

        sel_obj[record.data.rid] = record;
        me.sel_obj = sel_obj;
    },

    onCheckboxModelDeselect: function(rowmodel, record, index, eOpts) {
        var me = Ext.getCmp("win_awareness");
        var sel_obj = me.sel_obj;

        delete sel_obj[record.data.rid];
        me.sel_obj = sel_obj;
    },

    onCheckboxModelBeforeSelect: function(rowmodel, record, index, eOpts) {
        if(rowmodel.navigationModel.lastFocused){
            var _idx = rowmodel.navigationModel.lastFocused.colIdx;

            if(_idx === 10 || _idx === 11){
                return false;
            }
        }
    },

    onCheckboxModelBeforeDeselect: function(rowmodel, record, index, eOpts) {
        if(rowmodel.navigationModel.lastFocused){
            var _idx = rowmodel.navigationModel.lastFocused.colIdx;

            if(_idx === 10 || _idx === 11){
                return false;
            }
        }
    },

    onGrid_applicationCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = Ext.getCmp("win_awareness");

        if(cellIndex === 1){

            var win = Ext.create('NFW2.view.win_application_more',{
                num: record.data.rid,
                name: record.data.name,
                type: record.data._type
            });

            win.show();
        }else if(cellIndex === 10){
            me.rid = record.data.rid;
        }
    },

    onCellEditingBeforeEdit: function(editor, context, eOpts) {
        var me = Ext.getCmp("win_awareness");
        var act_list = me.act_list;
        var sel_obj = me.sel_obj;
        var rid = context.record.data.rid;

        if(context.colIdx === 10){
            var _action = context.record.data.action;

            context.value = _action;
        }else if(context.colIdx === 11){

            if(!act_list[rid] || act_list[rid].type !== 'qos'){ return false; }
            if(act_list[rid].qos){
                context.value = act_list[rid].qos.cid;
            }
        }
        me.rid = rid;

        return true;
    },

    onWin_awarenessBeforeRender: function(component, eOpts) {
        var me = this;
        if(me.edit !== "edit"){ return true; }
        var sel_obj = {};
        var act_list = {};

        var elements = me.elements;

        for(var i=0; i<elements.length; i++){
            sel_obj[elements[i].applications[0].rid] = elements[i].applications[0].name;
            act_list[elements[i].applications[0].rid] = { 'type' : elements[i].action.type };
            if(elements[i].action.type === "qos"){
                act_list[elements[i].applications[0].rid].qos = {
                    'cid':elements[i].action.qos['@cid'],
                    'name':elements[i].action.qos['#name']
                };
            }
        }

        me.sel_obj = sel_obj;
        me.act_list = act_list;
    },

    onWin_awarenessAfterRender: function(component, eOpts) {
        var me = this;
        me.search_name = '';

        chk_zenauth(null);

        me.mask('Loading...');

        if(me.edit === "edit"){
            me.init_profile_awareness();
        }else{
            me.setTitle(__zen('app_control_add'));
            me.sel_obj = {};
            me.act_list = {};
        }

        var _param = {
            'func_name': Ext.encode('mod_fw_app_prof_mmbr_get_max')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'execKctrlFunc',
            _param,
            function(response){
                me.mem = response;
            }
        );

        me.setPosition(me.x,me.y-100);

        var record = Ext.create('Ext.data.Store',{
            data: [{'name':__zen('detect'),'val':'detect'},{'name':__zen('block'),'val':'block'},{'name':'QoS','val':'qos'}],
            fields: ['name','val']
        });
        me.act_record = record;
        Ext.getCmp("all_action").bindStore(record);

        var _params = {
            basename : Ext.encode('mgt_app_filter_list'),
            key: Ext.encode({'is_stats_info':true})
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){

                if(!response){ return false; }

                var r_list = ['category','technology','purpose','popularity'];

                for(var i=0; i<r_list.length; i++){
                    var n = (r_list[i]==='purpose')?3:(r_list[i]==='popularity'||r_list[i]==='technology')?1:2;
                    var p = (r_list[i]==='purpose')?33:(r_list[i]==='popularity'||r_list[i]==='technology')?100:50;
                    eval('var name = response.'+r_list[i]+';');
                    eval('var ar_list = ["<table width=100% cellpadding=0 cellspacing=0 id=sorttable>"];');
                    var j=0;

                    if(r_list[i]==='popularity'){ name.reverse(); }

                    for(var l in name){
                        var list = '';
                        if(j%n === 0){ list += '<tr>'; }
                        var text = (r_list[i]!=='popularity')?name[j].text+'('+name[j].count+')':'<div style="float:left" class="ic_star_'+name[j].text+'" />'+'<label style="margin-left:75px">('+name[j].count+')</label>';
                        list += '<td width="'+p+'%"><label style="font-size:7pt;"><input type="checkbox" checked name="chk[]" class="chk_'+r_list[i]+'" value="'+name[j].text+'" onclick=chk_toggle("win_awareness",this) style="float:left" />'+text+'</label></td>';
                        if((j+1)%n === 0 || j === name.length){
                            if((j+1)%n===1){ list += '<td width="'+p+'%"></td>'; }
                            list += '</tr>';
                        }
                        ar_list.push(list);
                        j++;
                    }
                    ar_list.push('</table>');
                    Ext.getCmp("field_"+r_list[i]).update(ar_list.join(''));
                }
            }
        );

        var _param = {
            basename: Ext.encode('object_qos'),
            search_info : Ext.encode([]),
            sort_list : Ext.encode([['@num',1]])
        };

        var record = [];

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObjectList',
            _param,
            function(response){

                for(var i in response.list){
                    record.push({
                        'cid': response.list[i]['@cid'],
                        'name': response.list[i].name
                    });
                }

                Ext.data.StoreManager.lookup("store_profile_qos").loadData(record);
            }
        );
        var search = {
            'category': ['All'],
            'technology': ['All'],
            'purpose': ['All'],
            'content_type': ['All'],
            'popularity': ['All'],
            'released_date': ['All'],
            'vendor': ['All'],
            'protocols': ['All'],
            'name': ''
        };

        var f_store = Ext.data.StoreManager.lookup("store_profile_ref_full_list");
        f_store.getProxy().setExtraParam('filter_type',Ext.encode('specify_app'));
        f_store.getProxy().setExtraParam('search_info',Ext.encode(search));
        f_store.getProxy().setExtraParam('data_type',Ext.encode('all'));
        f_store.getProxy().setExtraParam('limit',Ext.encode(null));
        f_store.load();

        var _store = Ext.data.StoreManager.lookup("store_profile_ref_list");
        _store.getProxy().setExtraParam('filter_type',Ext.encode('specify_app'));
        _store.getProxy().setExtraParam('search_info',Ext.encode(search));
        _store.getProxy().setExtraParam('data_type',Ext.encode('all'));
        _store.getProxy().setExtraParam('limit',Ext.encode(null));
        _store.load(function(){

            var _a_data = {};
            var _data = _store.data.items;
            for(var l=0; l<_data.length; l++){
                _a_data[_data[l].data.rid] = _data[l];
            }

            for(var i in me.sel_obj){

                var _sel = _store.find('rid',i);
                me.sel_obj[i] = _a_data[i];
            }
            if(me.edit === "edit"){
                Ext.getCmp("chk_app").setValue(true);
            }
            me.findAppList();
        });
    },

    onWin_awarenessClose: function(panel, eOpts) {
        Ext.getCmp("grid_application").getStore().data.removeAll();
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;
        var sel_obj = me.sel_obj;
        var act_list = me.act_list;

        var name = Ext.getCmp("name");
        var desc = Ext.getCmp("desc");

        if(name.isValid()===false){ name.focus(); return false; }

        var _store = Ext.getCmp("grid_application").getStore().data;

        var obj = {};
        var element = [];

        obj.name = name.getValue();
        obj.desc = desc.getValue();

        var _detect = [], _block = [], _qos = [];
        var grid_chk = Ext.getCmp("grid_application").getSelectionModel().getSelection();
        var _n = 0;
        for(var i in sel_obj){
            var rid = sel_obj[i].data.rid;
            var qos = {}, ele = {}, _application = [];
            var act = (act_list[rid])?act_list[rid].type:'detect';

            if(act === 'qos'){
                if(!act_list[rid].qos){
                    prt_errMsg(ValidSelect('QoS',1),null);
                    return false;
                }
                qos = {
                    '@cid': act_list[rid].qos.cid,
                    '#name': act_list[rid].qos.name
                };
            }
            _application.push({'rid':rid,'name':sel_obj[i].data.name});
            ele.applications = _application;
            ele.action = {
                type: act,
                qos: qos
            };
            element.push(ele);
            _n++;
        }

        if(_n === 0){
            prt_errMsg(ValidSelect(__zen('application'),2), null);
            return false;
        }

        if(element.length > me.mem){
            prt_errMsg(ValidMaxCnt(me.mem),null);
            return false;
        }

        obj.elements = element;

        prt_errMsg(null,null);

        if(me.edit === "edit"){
            obj['@cid'] = me.cid;
        }

        var update = (me.edit==="edit")?true:false;

        var _params = {
            basename: Ext.encode("fw_profile_application"),
            obj: Ext.encode(obj),
            id_info: Ext.encode({'fieldname':'@cid'}),
            num_info: Ext.encode({'fieldname':'@num'}),
            update: Ext.encode(update)
        };

        var key = {
            'name': Ext.getCmp("name").getValue(),
            '_kind': 'fw_profile_application'
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
                        prt_errMsg(get_msg('err_proname'), null); name.focus(); return false;
                    }else{
                        fn_set();
                    }
                }
            );

        }else{
            fn_set();
        }

        function fn_set(){
            me.mask("Loading...");

            request_helper.xmlrpc_call_Ajax_Post(
                'ftuctrl',
                'setObjectWithCid',
                _params,
                function(response){

                    me.unmask();

                    Ext.data.StoreManager.lookup("store_profile_application_list").load();

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
                }
            );
        }
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    },

    user_load: function(edit) {
        var r_list = ['category','technology','purpose','popularity'];

        for(var i=0; i<r_list.length; i++){
            var _all = document.getElementById('all_'+r_list[i]);
            eval('var _'+r_list[i]+' = [];');
            var _cls = document.querySelectorAll('.chk_'+r_list[i]);

            if(_all.checked){
                eval('_'+r_list[i]+'.push("All")');
            }else{
                for(var l=1; l<_cls.length; l++){

                    if(_cls[l].checked){
                        var value = (r_list[i]==='popularity')?Number(_cls[l].value):_cls[l].value;
                        eval('_'+r_list[i]+'.push(value)');
                    }
                }
            }
        }

        var search = {
            'category': (_category.length===0)?null:_category,
            'technology': (_technology.length===0)?null:_technology,
            'purpose': (_purpose.length===0)?null:_purpose,
            'popularity': (_popularity.length===0)?null:_popularity,
            'content_type': ['All'],
            'released_date': ['All'],
            'vendor': ['All'],
            'protocols': ['All'],
            'name': (name)?Ext.getCmp("search_name").getValue():''
        };
        var d_type = (Ext.getCmp("chk_user").getValue())?'uapps':'all';

        var f_store = Ext.data.StoreManager.lookup("store_profile_ref_full_list");
        f_store.getProxy().setExtraParam('data_type',Ext.encode(d_type));
        f_store.getProxy().setExtraParam('search_info',Ext.encode(search));
        f_store.load();

        var store = Ext.data.StoreManager.lookup("store_profile_ref_list");
        store.getProxy().setExtraParam('data_type',Ext.encode(d_type));
        store.getProxy().setExtraParam('search_info',Ext.encode(search));
        store.load({callback: function(records, options, success){
            if(success){
                var me = Ext.getCmp("win_awareness");

                var sel_obj = me.sel_obj;
                var grid = Ext.getCmp("grid_application");
                var grid_sel = grid.getSelectionModel();

                var n_record = [];
                for(var i=0; i<grid.getStore().data.items.length; i++){
                    var items = grid.getStore().data.items[i].data;
                    var rid = items['rid'];

                    if(sel_obj[rid]){
                        n_record.push(grid.getStore().data.items[i]);
                    }
                }
                if(n_record.length === 0){ return false; }
                grid_sel.select(n_record,true,true);

                if(edit){
                    Ext.getCmp("chk_app").setValue(true);
                }
            }
        }});
    },

    findAppList: function(edit) {
        var me = this;

        me.mask('Loading...');

        var r_list = ['category','technology','purpose','popularity'];

        for(var i=0; i<r_list.length; i++){
            var _all = document.getElementById('all_'+r_list[i]);
            eval('var _'+r_list[i]+' = [];');
            var _cls = document.querySelectorAll('.chk_'+r_list[i]);

            if(_all.checked){
                eval('_'+r_list[i]+'.push("All")');
            }else{
                for(var l=1; l<_cls.length; l++){

                    if(_cls[l].checked){
                        var value = (r_list[i]==='popularity')?Number(_cls[l].value):_cls[l].value;
                        eval('_'+r_list[i]+'.push(value)');
                    }
                }
            }
        }

        var search = {
            'category': (_category.length===0)?null:_category,
            'technology': (_technology.length===0)?null:_technology,
            'purpose': (_purpose.length===0)?null:_purpose,
            'popularity': (_popularity.length===0)?null:_popularity,
            'content_type': ['All'],
            'released_date': ['All'],
            'vendor': ['All'],
            'protocols': ['All'],
            'name': me.search_name
        };
        var d_type = (Ext.getCmp("chk_user").getValue())?'uapps':'all';

        var f_store = Ext.data.StoreManager.lookup("store_profile_ref_full_list");
        f_store.getProxy().setExtraParam('search_info',Ext.encode(search));
        f_store.getProxy().setExtraParam('data_type',Ext.encode(d_type));
        f_store.load();

        var store = Ext.data.StoreManager.lookup("store_profile_ref_list");
        store.getProxy().setExtraParam('search_info',Ext.encode(search));
        store.getProxy().setExtraParam('data_type',Ext.encode(d_type));
        store.load({callback: function(records, options, success){
            if(success){
                var me = Ext.getCmp("win_awareness");
                me.unmask();

                var chk_user = Ext.getCmp("chk_user").getValue();
                var chk_app = Ext.getCmp("chk_app").getValue();

                var sel_obj = me.sel_obj;

                var n_record = [];

                if(chk_app){
                    var record = [];

                    for(var i in sel_obj){

                        var chk_dob = store.find('name',sel_obj[i].data.name);
                        if(chk_dob === -1){ continue; }

                        if(chk_user){
                            if(sel_obj[i].data._type === 'user'){
                                record.push(sel_obj[i]);
                            }
                        }else{
                            record.push(sel_obj[i]);
                        }
                    }

                    Ext.getCmp("grid_application").getStore().loadData(record);
                    if(record.length === 0){ return false; }
                    Ext.getCmp("grid_application").selModel.selectAll();
                }
                var grid = Ext.getCmp("grid_application");
                var grid_sel = grid.getSelectionModel();

                for(var i=0; i<grid.getStore().data.items.length; i++){
                    var items = grid.getStore().data.items[i].data;
                    var rid = items['rid'];

                    if(sel_obj[rid]){
                        n_record.push(grid.getStore().data.items[i]);
                    }
                }
                if(n_record.length === 0){ return false; }
                grid_sel.select(n_record,true,true);

                if(edit){
                    Ext.getCmp("chk_app").setValue(true);
                }/*else{
                    me.onCheckboxfieldChange();
                }*/
            }
        }});
    },

    chk_toggle: function(me, field, checked) {
        var cls = field.className;
        var code = document.querySelectorAll('.'+cls);

        if(field.id.indexOf('all') !== -1){//all
            for(var i=0; i<code.length; i++){
                code[i].checked = checked;
            }
        }else{
            var a_cls = cls.split("_");
            var all = document.getElementById('all_'+a_cls[1]);
            var l=0;
            for(var i=1; i<code.length; i++){
                if(code[i].checked){ l++; }
            }
            var a_chk = (l===code.length-1)?true:false;
            all.checked = a_chk;
        }

        Ext.getCmp("win_awareness").findAppList();
    },

    init_profile_awareness: function() {
        var me = this;

        me.setTitle(__zen('app_control_edit')+" - "+me.num);

        Ext.getCmp("name").setValue(me.name);
        Ext.getCmp("desc").setValue(me.desc);
    }

});