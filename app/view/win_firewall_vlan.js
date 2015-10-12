
Ext.define('NFW2.view.win_firewall_vlan', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_firewall_vlan',

    requires: [
        'NFW2.view.win_firewall_vlanViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.toolbar.Toolbar',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel'
    ],

    viewModel: {
        type: 'win_firewall_vlan'
    },
    cls: 'zen_win',
    height: 560,
    id: 'win_firewall_vlan',
    scrollable: true,
    width: 500,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onWindowAfterRender'
    },
    items: [
        {
            xtype: 'form',
            bodyPadding: 20,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                return true;
                            },
                            cls: 'lb_req',
                            id: 'sec_name',
                            labelSeparator: ' ',
                            msgTarget: 'none',
                            enforceMaxLength: true,
                            maxLength: 30,
                            listeners: {
                                beforerender: 'onTextfieldBeforeRender',
                                errorchange: 'onSec_nameErrorChange',
                                blur: 'onSec_nameBlur'
                            }
                        },
                        {
                            xtype: 'combobox',
                            cls: 'lb_req',
                            id: 'vlan_id',
                            labelSeparator: ' ',
                            editable: false,
                            emptyText: 'Select',
                            displayField: 'name',
                            queryMode: 'local',
                            valueField: 'name',
                            listeners: {
                                beforerender: 'onComboboxBeforeRender'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            cls: 'btn_b',
                            id: 'btn_vlan_sub',
                            iconCls: 'icb_add',
                            listeners: {
                                beforerender: 'onButtonBeforeRender3',
                                click: 'onButtonClick3'
                            }
                        },
                        {
                            xtype: 'button',
                            cls: 'btn_b',
                            margin: '0 0 0 5',
                            listeners: {
                                beforerender: 'onButtonBeforeRender2',
                                click: 'onButtonClick2'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '10 0 0 0',
                    items: [
                        {
                            xtype: 'toolbar',
                            cls: 'zen_toolbar',
                            items: [
                                {
                                    xtype: 'button',
                                    iconCls: 'ic_del',
                                    listeners: {
                                        beforerender: 'onButtonBeforeRender1',
                                        click: 'onButtonClick1'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    id: 'grid_fw_vlan',
                    margin: '5 0 0 0',
                    maxHeight: 284,
                    columnLines: true,
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                metaData.style += 'text-align:left';

                                return value;
                            },
                            align: 'center',
                            dataIndex: 'name',
                            flex: 1,
                            listeners: {
                                beforerender: 'onGridcolumnBeforeRender'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                metaData.style += 'text-align:left';

                                return value;
                            },
                            align: 'center',
                            dataIndex: '@vlan',
                            flex: 1,
                            listeners: {
                                beforerender: 'onGridcolumnBeforeRender1'
                            }
                        }
                    ],
                    selModel: {
                        selType: 'checkboxmodel'
                    },
                    listeners: {
                        celldblclick: 'onGrid_fw_vlanCellDblClick'
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
                    itemId: 'fld_msg_vlan'
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    listeners: {
                        beforerender: 'onButtonBeforeRender',
                        click: 'onButtonClick'
                    }
                }
            ]
        }
    ],

    onWindowAfterRender: function(component, eOpts) {
        var me = this;
        me.edit = false;

        me.setTitle(__zen('vlan_fw_set'));

        me.init_vlan_id();
    },

    onTextfieldBeforeRender: function(component, eOpts) {
        component.setFieldLabel(__zen('sec_name'));
    },

    onSec_nameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, 'fld_msg_vlan');
    },

    onSec_nameBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onComboboxBeforeRender: function(component, eOpts) {
        component.setFieldLabel(__zen('vlan_id'));
    },

    onButtonBeforeRender3: function(component, eOpts) {
        component.setText(__zen('add'));
    },

    onButtonClick3: function(button, e, eOpts) {
        var me = this;

        var name = Ext.getCmp("sec_name");
        var id = Ext.getCmp("vlan_id");

        if(!name.isValid()){ name.focus(); return false; }
        if(id.getValue() === null){ prt_errMsg(get_msg('err_null'), 'fld_msg_vlan'); id.focus(); return false; }

        var obj = {
            'name': name.getValue(),
            '@vlan': Number(id.getValue())
        };

        if(me.edit){
            obj._id = me._id;
        }

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setListTypeObj',
            {
                basename: Ext.encode('firewall_vlan'),
                obj: Ext.encode(obj),
                update: Ext.encode(me.edit)
            },
            function(response){

                me.edit = false;
                name.reset();
                me.init_vlan_id();
            }
        );
    },

    onButtonBeforeRender2: function(component, eOpts) {
        component.setText(__zen('cancel'));
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = this;
        me.edit = false;

        Ext.getCmp("sec_name").reset();
        me.init_vlan_id();
    },

    onButtonBeforeRender1: function(component, eOpts) {
        component.setText(__zen('del'));
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        var grid = Ext.getCmp("grid_fw_vlan");
        var grid_chk = grid.getSelectionModel().getSelection();

        if(grid_chk.length === 0){
            Ext.Msg.alert(__weguardia,get_msg("sel_del"));
            return false;
        }

        var _list = [];
        for(var i=0; i<grid_chk.length; i++){
            _list.push(Number(grid_chk[i].data['@vlan']));
        }

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'delVlanListCheck',
            {
                ids: Ext.encode(_list)
            },
            function(response){

                if(response.ref_total > 0){

                    var _ref = [];
                    for(var i=0; i<response.ref_list.length; i++){
                        _ref.push(response.ref_list[i]['@vlan']);
                    }

                    Ext.MessageBox.confirm(__weguardia,get_msg('conf_use_vlan')+_ref.join(', '),function(btn){
                        if(btn === "yes"){
                            del_vlan();
                        }
                    });
                }else{
                    del_vlan();
                }
            }
        );

        function del_vlan(){
            Ext.MessageBox.confirm(__weguardia,get_msg("conf_del"),function(btn){
                if(btn === "yes"){

                    var del = [];
                    for(var i=0; i<grid_chk.length; i++){
                        del.push(grid_chk[i].data['_id']);
                    }

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'delListTypeObj',
                        {
                            basename : Ext.encode("firewall_vlan"),
                            ids : Ext.encode(del),
                            renum_info : Ext.encode({'fieldname':'_num'})
                        },
                        function(response){
                            me.init_vlan_id();
                        }
                    );
                }
            });
        }
    },

    onGridcolumnBeforeRender: function(component, eOpts) {
        component.setText(__zen('sec_name'));
    },

    onGridcolumnBeforeRender1: function(component, eOpts) {
        component.setText(__zen('vlan_id'));
    },

    onGrid_fw_vlanCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;
        me.edit = true;
        me._id = record.data._id;

        me.init_vlan_id(record.data);
    },

    onButtonBeforeRender: function(component, eOpts) {
        component.setText(__zen('close'));
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    },

    init_vlan_id: function(edit) {
        var me = this;

        if(Ext.getCmp("grid_fw_vlan").getStore().data.items.length >= 150){
            Ext.getCmp("win_firewall_vlan").mask('Loading Data...');
        }

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_lname_list',
            {
                if_type: Ext.encode('vlan'),
                data_type: Ext.encode('number'),
                option: Ext.encode('used'),
                version: Ext.encode(me.version)
            },
            function(response){

                var vlan_list = (response===undefined)?[]:response;
                if(response === undefined){
                    Ext.Msg.alert(__weguardia,get_msg('msg_not_vlan'));
                }

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'getObjects',
                    {
                        basename: Ext.encode('firewall_vlan')
                    },
                    function(response){
                        Ext.getCmp("win_firewall_vlan").unmask();

                        var _vlan = {};
                        var list = response.list;
                        for(var i=0; i<list.length; i++){
                            _vlan[list[i]['@vlan']] = list[i].name;
                        }

                        var _data = [];
                        for(var l=0; l<vlan_list.length; l++){
                            if(edit){
                                if(Number(vlan_list[l].name) !== Number(edit['@vlan']) && _vlan[Number(vlan_list[l].name)]){ continue; }
                            }else{
                                if(_vlan[Number(vlan_list[l].name)]){ continue; }
                            }

                            _data.push({ 'name':vlan_list[l].name });
                        }
                        var record = Ext.create('Ext.data.Store',{
                            data: _data,
                            fields: ['name']
                        });

                        Ext.getCmp("vlan_id").bindStore(record);
                        if(_data[0]){
                            Ext.getCmp("vlan_id").setValue(_data[0].name);
                        }else{
                            Ext.getCmp("vlan_id").setValue(null);
                        }

                        var _record = Ext.create('Ext.data.Store',{
                            data: list,
                            fields: ['@vlan','name']
                        });

                        if(edit){
                            Ext.getCmp("sec_name").setValue(edit.name);
                            Ext.getCmp("vlan_id").setValue(edit['@vlan']);

                            Ext.getCmp("btn_vlan_sub").setText(__zen('confirm'));
                        }else{
                            Ext.getCmp("btn_vlan_sub").setText(__zen('add'));
                            Ext.getCmp("grid_fw_vlan").bindStore(_record);
                        }
                    }
                );
            }
        );
    }

});