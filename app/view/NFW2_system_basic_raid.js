
Ext.define('NFW2.view.NFW2_system_basic_raid', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_system_basic_raid',

    requires: [
        'NFW2.view.NFW2_system_basic_raidViewModel',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'nfw2_system_basic_raid'
    },
    cls: 'zen_body',
    id: 'basic_raid',
    width: 900,
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPanelAfterRender'
    },
    items: [
        {
            xtype: 'radiogroup',
            id: 'r_type',
            labelCls: 'x-field x-form-item-label x-form-item-label-default',
            labelSeparator: ' ',
            bind: {
                fieldLabel: '{method}'
            },
            items: [
                {
                    xtype: 'radiofield',
                    id: 'r_type_hw',
                    name: 'type',
                    boxLabel: 'H/W',
                    checked: true,
                    inputValue: 'hw'
                },
                {
                    xtype: 'radiofield',
                    id: 'r_type_sw',
                    name: 'type',
                    boxLabel: 'S/W',
                    inputValue: 'sw'
                }
            ]
        },
        {
            xtype: 'radiogroup',
            id: 'r_mode',
            labelCls: 'x-field x-form-item-label x-form-item-label-default',
            labelSeparator: ' ',
            bind: {
                fieldLabel: '{operate_mode}'
            },
            items: [
                {
                    xtype: 'radiofield',
                    id: 'r_raid_1',
                    name: 'mode',
                    boxLabel: 'Mirror',
                    checked: true,
                    inputValue: 'raid1'
                },
                {
                    xtype: 'radiofield',
                    id: 'r_raid_0',
                    name: 'mode',
                    boxLabel: 'Stripe',
                    inputValue: 'raid0'
                }
            ]
        },
        {
            xtype: 'combobox',
            cls: 'lb_req',
            id: 'com_pri',
            fieldLabel: 'Primary',
            labelSeparator: ' ',
            labelWidth: 115,
            editable: false,
            emptyText: 'Select',
            displayField: 'name',
            queryMode: 'local',
            valueField: 'val',
            listeners: {
                change: 'onCom_priChange'
            }
        },
        {
            xtype: 'combobox',
            cls: 'lb_req',
            id: 'com_sla',
            fieldLabel: 'Slave',
            labelSeparator: ' ',
            labelWidth: 115,
            editable: false,
            emptyText: 'Select',
            displayField: 'name',
            queryMode: 'local',
            valueField: 'val',
            multiSelect: true,
            listeners: {
                change: 'onCom_slaChange'
            }
        },
        {
            xtype: 'container',
            margin: '10 0 0 0',
            items: [
                {
                    xtype: 'label',
                    cls: 'lb_info',
                    id: 'l_info1',
                    bind: {
                        text: '{raid_info1}'
                    }
                }
            ]
        },
        {
            xtype: 'label',
            cls: 'lb_info',
            id: 'l_info',
            bind: {
                text: '{raid_info2}'
            }
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            margin: '10 0 0 0',
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
                        click: 'onButtonClick4'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onButtonClick5'
                    }
                }
            ]
        }
    ],

    onPanelAfterRender: function(component, eOpts) {
        this.get_system_raid();
    },

    onCom_priChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        var _record = me.hd_list;

        var com_pri = Ext.getCmp("com_pri");
        var com_sla = Ext.getCmp("com_sla");

        var _pri = com_pri.getStore();
        var _sla = com_sla.getStore();

        for(var i=0; i<_record.length; i++){
            if(com_pri.getValue() !== _record[i].val){
                var _val = _sla.find('name',_record[i].name);
                if(_val === -1){ _sla.insert(i,{'name':_record[i].name,'val':_record[i].val}); }
            }else{
                var _val = _sla.find('name',_record[i].name);
                if(_val !== -1){ _sla.removeAt(_val); }
            }
        }
    },

    onCom_slaChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        var _record = me.hd_list;

        var com_pri = Ext.getCmp("com_pri");
        var com_sla = Ext.getCmp("com_sla");

        var _pri = com_pri.getStore();
        var _sla = com_sla.getStore();

        var n_record = [];
        var _s_sla = ' '+com_sla.getValue().join(' ');
        for(var i=0; i<_record.length; i++){
            if(_s_sla.indexOf(_record[i].val) === -1){
                var _val = _pri.find('name',_record[i].name);
                if(_val === -1){ _pri.insert(i,{'name':_record[i].name,'val':_record[i].val}); }
            }else{
                var _val = _pri.find('name',_record[i].name);
                if(_val !== -1){ _pri.removeAt(_val); }
            }
        }
    },

    onButtonClick4: function(button, e, eOpts) {
        var me = this;
        var raid = me.raid;

        var r_type = Ext.getCmp("r_type").getValue().type;
        var r_mode = Ext.getCmp("r_mode").getValue().mode;
        var com_pri = Ext.getCmp("com_pri");
        var com_sla = Ext.getCmp("com_sla");

        if(com_pri.getValue() === "" || com_sla.getValue().length === 0){
            prt_errMsg(get_msg('err_raid_ps_cnt'),null);
            return false;
        }

        if(Ext.getCmp("r_type").getValue().type === "sw"){
            var prim = com_pri.getRawValue();
            var slave = com_sla.getRawValue().split(',').join('');
        }else{
            var prim = com_pri.getValue();
            var slave = com_sla.getValue().join(' ');
        }

        var name = (r_type==='sw')?'md0':'sda';

        if(raid.raid[0].name === name && raid.raid[0].mode === r_mode && raid.raid[0].prim === prim && raid.raid[0].slave === slave){

            Ext.MessageBox.alert(__weguardia,get_msg('err_raid_nchg'));
            return false;
        }

        prt_errMsg(null,null);

        Ext.MessageBox.confirm(__weguardia,get_msg('conf_raid'),function(btn){
            if(btn === "yes"){

                raid.raid[0].name = name;
                raid.raid[0].mode = r_mode;
                raid.raid[0].prim = prim;
                raid.raid[0].slave = slave;

                me.mask(get_msg('msg_raid_reboot'));

                var _params = {
                    basename: Ext.encode("system_raid"),
                    obj: Ext.encode(raid)
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'setObject',
                    _params,
                    function(response){

                        adminAlarmRefresh();
                        var _params = {
                            func_name: Ext.encode('mod_system_raid_apply')
                        };

                        request_helper.xmlrpc_call_JsonP(
                            'ftuctrl',
                            'execKctrlFunc',
                            _params,
                            function(response){

                                me.unmask();
                            }
                        );

                    }
                );
            }
        });
    },

    onButtonClick5: function(button, e, eOpts) {
        this.get_system_raid();
    },

    get_system_raid: function() {
        var me = Ext.getCmp("basic_raid");
        var a_raid = [], prim = '', slave = [];

        var store = Ext.data.StoreManager.lookup("store_raid_list");

        var _params = {
            basename: Ext.encode('system_raid')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){

                hideLoadMask();

                if(response){
                    var raid = response.raid;

                    me._id = response._id;
                    var record = [];

                    if(raid[0].mode !== "none"){

                        a_raid.push(raid[0].prim);
                        prim = raid[0].prim;
                        var _slave = raid[0].slave.split(" ");
                        for(var l=0; l<_slave.length; l++){
                            a_raid.push(_slave[l]);
                            slave.push(_slave[l]);
                        }
                        if(raid[0].mode === 'raid0'){
                            Ext.getCmp("r_mode").items.items[1].setValue(true);
                        }else{
                            Ext.getCmp("r_mode").items.items[0].setValue(true);
                        }

                        if(raid[0].name === 'md0'){
                            Ext.getCmp("r_type").items.items[1].setValue(true);
                        }else{
                            Ext.getCmp("r_type").items.items[0].setValue(true);
                        }
                    }

                    me.raid = {
                        raid : raid
                    };
                    me.get_hd_list(a_raid,prim,slave);

                }else{
                    var raid = {
                        'raid': [
                            {
                                'name': 'md0',
                                'mode': 'none'
                            }
                        ]
                    };

                    me.raid = raid;
                    me.get_hd_list(a_raid);
                }
            }
        );
    },

    get_hd_list: function(a_raid, prim, slave) {
        var me = this;

        var _param = {
            type_info: Ext.encode('hd_list'),
            is_hw: Ext.encode(true)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getSystemRaid',
            _param,
            function(response){

                var store_compose = Ext.data.StoreManager.lookup("store_raid_compose");

                var record = [];
                var _prim = '', _slave = [];
                //response = ["sda","sdb","sdc","sdd"];

                for(var j=0; j<response.length; j++){

                    record.push({
                        'name': response[j],
                        'val': '1:'+j
                    });
                }

                for(var i=0; i<record.length; i++){

                    var _val = (Ext.getCmp("r_type").getValue().type==='sw')?record[i].name:record[i].val;

                    if(prim && _val === prim){ _prim = '1:'+i; }

                    var a_slave = (slave)?" "+slave.join(" "):'';
                    if(slave && a_slave.indexOf(_val) !== -1){ _slave.push('1:'+i); }
                }

                me.hd_list = record;

                var _p_record = Ext.create('Ext.data.Store',{
                    data: record,
                    fields: ['name','val']
                });

                Ext.getCmp("com_pri").bindStore(_p_record);

                var _s_record = Ext.create('Ext.data.Store',{
                    data: record,
                    fields: ['name','val']
                });

                Ext.getCmp("com_sla").bindStore(_s_record);

                if(prim && slave){
                    Ext.getCmp("com_pri").setValue(_prim);
                    Ext.getCmp("com_sla").setValue(_slave);
                }else{
                    Ext.getCmp("com_pri").reset();
                    Ext.getCmp("com_sla").reset();
                    if(record[0]){ Ext.getCmp("com_pri").setValue(record[0].val); }
                    if(record[1]){ Ext.getCmp("com_sla").setValue(record[1].val); }
                }
            }
        );
    }

});