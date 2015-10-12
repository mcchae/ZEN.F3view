
Ext.define('NFW2.view.NFW2_system_equipmentState', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_system_equipmentstate',

    requires: [
        'NFW2.view.NFW2_system_equipmentStateViewModel',
        'Ext.form.field.Display',
        'Ext.button.Button',
        'Ext.menu.Menu',
        'Ext.form.field.Text',
        'Ext.panel.Tool',
        'Ext.XTemplate',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View'
    ],

    config: {
        interface_info: {
            up: '',
            down: ''
        }
    },

    viewModel: {
        type: 'nfw2_system_equipmentstate'
    },
    cls: 'zen_body',
    id: 'NFW2_system_equipmentState',
    defaultListenerScope: true,

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            flex: 0.4,
            margin: '0 20 0 0',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'panel',
                    margin: '0 0 20 0',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    bind: {
                        title: '{device_info}'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            cls: 'under_dot',
                            hidden: true,
                            id: 'fd_nfwName',
                            fieldLabel: '제품 이름',
                            labelSeparator: ' ',
                            labelWidth: 200,
                            value: 'WeGuardia™ ZEN V1.0'
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'under_dot',
                            hidden: true,
                            id: 'fd_model',
                            fieldLabel: '모델 이름',
                            labelSeparator: ' ',
                            labelWidth: 200
                        },
                        {
                            xtype: 'container',
                            cls: 'under_dot',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    flex: 1,
                                    id: 'fd_name',
                                    labelSeparator: ' ',
                                    labelWidth: 200,
                                    bind: {
                                        fieldLabel: '{device_name}'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    cls: 'btn_s',
                                    style: 'background-color:#fff',
                                    width: 30,
                                    iconCls: 'x-tool-img x-tool-gear',
                                    menu: {
                                        xtype: 'menu',
                                        width: 500,
                                        bodyPadding: 15,
                                        items: [
                                            {
                                                xtype: 'container',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        validator: function(value) {
                                                            if(value === true){ return true; }
                                                            if(!CheckNotNull(value)){ return get_msg("err_null"); }

                                                            return true;

                                                        },
                                                        id: 'fd_name_re',
                                                        labelSeparator: ' ',
                                                        labelWidth: 80,
                                                        msgTarget: 'none',
                                                        enableKeyEvents: true,
                                                        enforceMaxLength: true,
                                                        maxLength: 31,
                                                        minLength: 1,
                                                        bind: {
                                                            fieldLabel: '{device_name}'
                                                        },
                                                        listeners: {
                                                            errorchange: 'onFd_name_reErrorChange',
                                                            blur: 'onFd_name_reBlur'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        cls: 'ft_confirm',
                                                        height: 30,
                                                        width: 50,
                                                        bind: {
                                                            text: '{confirm}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick2'
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        cls: 'fld_msg',
                                                        itemId: 'fld_msg',
                                                        width: 500
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    listeners: {
                                        click: 'onButtonClick3'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'under_dot',
                            id: 'fd_cpuname',
                            labelSeparator: ' ',
                            labelWidth: 200,
                            bind: {
                                fieldLabel: '{device_cpu}'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'under_dot',
                            id: 'fd_memory',
                            labelSeparator: ' ',
                            labelWidth: 200,
                            bind: {
                                fieldLabel: '{memory}'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'under_dot',
                            id: 'fd_hdd',
                            fieldLabel: 'HDD/SSD/CF',
                            labelSeparator: ' ',
                            labelWidth: 200
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'under_dot',
                            id: 'fd_cid',
                            fieldLabel: 'CID',
                            labelSeparator: ' ',
                            labelWidth: 200
                        },
                        {
                            xtype: 'displayfield',
                            flex: 1,
                            cls: 'under_dot',
                            id: 'fd_serial',
                            labelSeparator: ' ',
                            labelWidth: 200,
                            bind: {
                                fieldLabel: '{serial}'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            flex: 1,
                            cls: 'under_dot',
                            hidden: true,
                            id: 'fd_ha',
                            labelSeparator: ' ',
                            labelWidth: 200,
                            bind: {
                                fieldLabel: '{ha}'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            flex: 1,
                            cls: 'under_dot',
                            id: 'fd_power',
                            fieldLabel: '전원 이중화',
                            labelSeparator: ' ',
                            labelWidth: 200
                        },
                        {
                            xtype: 'displayfield',
                            flex: 1,
                            cls: 'under_dot',
                            id: 'fd_fan',
                            fieldLabel: 'Fan(RPM)',
                            labelSeparator: ' ',
                            labelWidth: 200
                        },
                        {
                            xtype: 'displayfield',
                            flex: 1,
                            cls: 'under_dot',
                            id: 'fd_raid',
                            fieldLabel: 'RAID',
                            labelSeparator: ' ',
                            labelWidth: 200
                        }
                    ],
                    listeners: {
                        beforerender: 'onPanelBeforeRender2'
                    }
                },
                {
                    xtype: 'panel',
                    margin: '0 0 20 0',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    bind: {
                        title: '{ver_info}'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            cls: 'under_dot',
                            id: 'fd_firmware',
                            labelSeparator: ' ',
                            labelWidth: 200,
                            bind: {
                                fieldLabel: '{firmware}'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'under_dot',
                            id: 'fd_ramdisk',
                            labelSeparator: ' ',
                            labelWidth: 200,
                            bind: {
                                fieldLabel: '{ramdisk}'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'under_dot',
                            id: 'fd_image',
                            labelSeparator: ' ',
                            labelWidth: 200,
                            bind: {
                                fieldLabel: '{image}'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'under_dot',
                            id: 'fd_do',
                            fieldLabel: 'DO',
                            labelSeparator: ' ',
                            labelWidth: 200
                        },
                        {
                            xtype: 'container',
                            cls: 'under_dot',
                            id: 'cont_app',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    flex: 1,
                                    id: 'fd_app',
                                    labelSeparator: ' ',
                                    labelWidth: 200,
                                    bind: {
                                        fieldLabel: '{app_db}'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    cls: 'btn_s',
                                    style: 'background-color:#fff',
                                    width: 30,
                                    iconCls: 'x-tool-img x-tool-gear',
                                    listeners: {
                                        click: 'onButtonClick1'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            cls: 'under_dot',
                            id: 'cont_kiscom',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    flex: 1,
                                    id: 'fd_kiscom',
                                    labelSeparator: ' ',
                                    labelWidth: 200,
                                    bind: {
                                        fieldLabel: '{mal_db}'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    cls: 'btn_s',
                                    style: 'background-color:#fff',
                                    width: 30,
                                    iconCls: 'x-tool-img x-tool-gear',
                                    listeners: {
                                        click: 'onButtonClick111'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            cls: 'under_dot',
                            id: 'cont_http',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    flex: 1,
                                    id: 'fd_http',
                                    fieldLabel: 'WEB URL DB',
                                    labelSeparator: ' ',
                                    labelWidth: 200
                                },
                                {
                                    xtype: 'button',
                                    cls: 'btn_s',
                                    style: 'background-color:#fff',
                                    width: 30,
                                    iconCls: 'x-tool-img x-tool-gear',
                                    listeners: {
                                        click: 'onButtonClick'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            cls: 'under_dot',
                            id: 'cont_bad',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    flex: 1,
                                    id: 'fd_bad',
                                    labelSeparator: ' ',
                                    labelWidth: 200,
                                    bind: {
                                        fieldLabel: '{code_db}'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    cls: 'btn_s',
                                    style: 'background-color:#fff',
                                    width: 30,
                                    iconCls: 'x-tool-img x-tool-gear',
                                    listeners: {
                                        click: 'onButtonClick11'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            cls: 'under_dot',
                            id: 'cont_ips1',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    flex: 1,
                                    id: 'fd_ips',
                                    labelSeparator: ' ',
                                    labelWidth: 200,
                                    bind: {
                                        fieldLabel: '{sig_ips}'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    cls: 'btn_s',
                                    style: 'background-color:#fff',
                                    width: 30,
                                    iconCls: 'x-tool-img x-tool-gear',
                                    listeners: {
                                        click: 'onButtonClick1111'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            cls: 'under_dot',
                            id: 'cont_av_stream',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    flex: 1,
                                    id: 'fd_av_stream',
                                    labelSeparator: ' ',
                                    labelWidth: 200,
                                    bind: {
                                        fieldLabel: '{sig_av_stream}'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    cls: 'btn_s',
                                    style: 'background-color:#fff',
                                    width: 30,
                                    iconCls: 'x-tool-img x-tool-gear',
                                    listeners: {
                                        click: 'onButtonClick11111'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            cls: 'under_dot',
                            id: 'cont_av_file',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    flex: 1,
                                    id: 'fd_av_file',
                                    labelSeparator: ' ',
                                    labelWidth: 200,
                                    bind: {
                                        fieldLabel: '{sig_av_file}'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    cls: 'btn_s',
                                    style: 'background-color:#fff',
                                    width: 30,
                                    iconCls: 'x-tool-img x-tool-gear',
                                    listeners: {
                                        click: 'onButtonClick111111'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            cls: 'under_dot',
                            id: 'cont_as1',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    flex: 1,
                                    id: 'fd_as',
                                    labelSeparator: ' ',
                                    labelWidth: 200,
                                    bind: {
                                        fieldLabel: '{sig_as}'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    cls: 'btn_s',
                                    style: 'background-color:#fff',
                                    width: 30,
                                    iconCls: 'x-tool-img x-tool-gear',
                                    listeners: {
                                        click: 'onButtonClick1111111'
                                    }
                                }
                            ]
                        }
                    ],
                    listeners: {
                        beforerender: 'onPanelBeforeRender21'
                    },
                    tools: [
                        {
                            xtype: 'tool',
                            type: 'next',
                            listeners: {
                                click: 'onToolClick2'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'container',
            flex: 0.6,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'panel',
                    margin: '0 0 20 0',
                    bind: {
                        title: '{eth_info}'
                    },
                    items: [
                        {
                            xtype: 'container',
                            cls: 'ct_slot_bg',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'container',
                                    cls: 'ct_serial_info',
                                    id: 'ct_serial_info',
                                    margin: '10 15 0 0'
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
                                            xtype: 'dataview',
                                            cls: 'ct_slot',
                                            id: 'ct_eth_slot',
                                            tpl: [
                                                '<div>',
                                                '    <tpl for=\'.\'>',
                                                '        <div class=\'t_slot\'><div class=\'{port_cls}\'></div><div class=\'t_slot_tt\'>{name}</div></div>',
                                                '    </tpl>',
                                                '</div>'
                                            ],
                                            itemSelector: '.t_slot',
                                            store: 'store_interface_info',
                                            listeners: {
                                                itemclick: 'onCt_eth_slotItemClick'
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            height: 80,
                                            id: 'ct_slot_detail',
                                            tpl: [
                                                '<table class=\'tbl_slot\' cellspacing=0>',
                                                '    <thead><tr><td>Interface</td><td>IP</td><td>MAC</td><td>Speed/Duplex</td><td>Zone</td></tr></thead>',
                                                '    <tr><td>{name}</td><td>{ip}</td><td>{mac}</td><td>{speed}/{duplex}</td><td>{zone}</td></tr>',
                                                '</table>'
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    tools: [
                        {
                            xtype: 'tool',
                            type: 'gear',
                            listeners: {
                                click: 'onToolClick1'
                            }
                        },
                        {
                            xtype: 'tool',
                            type: 'next',
                            listeners: {
                                click: 'onToolClick11'
                            }
                        }
                    ],
                    listeners: {
                        afterrender: 'onPanelAfterRender'
                    }
                },
                {
                    xtype: 'panel',
                    bind: {
                        title: '{file_sys_info}'
                    },
                    items: [
                        {
                            xtype: 'gridpanel',
                            columnLines: true,
                            store: 'store_filesystem_info',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'Name',
                                    text: 'Filesystem',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    align: 'right',
                                    dataIndex: 'blocks',
                                    text: 'Size',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    align: 'right',
                                    dataIndex: 'Used',
                                    text: 'Used',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    align: 'right',
                                    dataIndex: 'Available',
                                    text: 'Available',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    align: 'right',
                                    dataIndex: 'Use',
                                    text: 'Use',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'Mounted_on',
                                    text: 'Mounted on',
                                    flex: 1
                                }
                            ]
                        }
                    ],
                    listeners: {
                        beforerender: 'onPanelBeforeRender1'
                    },
                    tools: [
                        {
                            xtype: 'tool',
                            type: 'refresh',
                            listeners: {
                                click: 'onToolClick'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onNFW2_system_equipmentStateAfterRender'
    },

    onFd_name_reErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFd_name_reBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onButtonClick2: function(button, e, eOpts) {
        var name = Ext.getCmp("fd_name_re").getValue();

        if(name === "") return false;


        if(Ext.getCmp("fd_name_re").isValid() === false){ Ext.getCmp("fd_name_re").focus(); return false; }

        var name_tmp = {

            'name' : name
        };

        var _params = {

            system_basic : Ext.encode(name_tmp)

        };


        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'set_system_basic',
            _params,
            function(response){

                console.log(response);

                Ext.getCmp('fd_name').setValue(name);

                /* Ext.getCmp('cont_name_change').hide();

                                                                            request_helper.xmlrpc_call_JsonP(
                                                                            'ftuctrl',
                                                                            'get_system_info',
                                                                            {},
                                                                            function(response){

                                                                                Ext.getCmp('fd_name').setValue(response.name);

                                                                            }
                                                                            );*/

            }
        );
    },

    onButtonClick3: function(button, e, eOpts) {
        //this.showMenu();
        Ext.getCmp('fd_name_re').setValue(Ext.getCmp('fd_name').getValue());
    },

    onPanelBeforeRender2: function(component, eOpts) {
        Ext.suspendLayouts();

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_system_info',
            {},
            function(response){

                Ext.getCmp('fd_name').setValue(response.name);

                Ext.getCmp('fd_model').setValue(response.model);

                //  Ext.getCmp('ft_name').setValue(response.name);

                Ext.getCmp('fd_cpuname').setValue(response.cpuname+" ("+response.processor+")");

                Ext.getCmp('fd_cid').setValue(response.cid);

                Ext.getCmp('fd_serial').setValue(response.serial);

                if(response.ha !== ""){

                    Ext.getCmp('fd_ha').setValue(response.ha);

                    Ext.getCmp('fd_ha').show();

                }
            }
        );


        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_system_usage',
            {},
            function(response){


                var values = response.memory.split(' ');

                Ext.getCmp('fd_memory').setValue(values[0] + "MB");

            }

        );

        var _params = {
            resource_type : Ext.encode('disk')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_system_usage',
            {},
            function(response){




                var _hdd = "";

                var _ssd = "";

                var _cf = "";

                for(var i in Object.getOwnPropertyNames(response.disk)){

                    var name = Object.getOwnPropertyNames(response.disk)[i];


                    var byte = response.disk[name][2];

                    if(byte.length <= 10){

                        byte = byte / 1024 / 1024;

                        byte = Math.round(byte) + "MB";

                    }else{

                        byte = byte / 1024 / 1024 / 1024;

                        byte = Math.round(byte) + "GB";
                    }

                    /* if(Ext.getCmp('NFW2_client').isCC === true){

                        if(name === 'sda'){

                            _cf = name + " " + byte;
                        }

                        if(name === 'sdb'){

                            _hdd = name + " " + byte;
                        }
                    }else{*/

                    if(name === 'sda'){

                        _hdd = name + " " + byte;
                    }

                    if(name === 'sdb'){

                        _cf = name + " " + byte;
                    }
                    // }




                    //if(_hdd !== "") _hdd = _hdd + '<br/>';

                    //_hdd = _hdd + name + " " + byte;

                }



                Ext.getCmp('fd_hdd').setValue(_hdd + ", " + ((_ssd !== "")?"+":"") + _cf);


                Ext.resumeLayouts(true);

            }
        );

        var _power_params = {
            func_name: Ext.encode('get_system_power_stat'),
            args: Ext.encode({})
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'execKctrlFunc',
            _power_params,
            function(response){
                console.log(response);

                if(response === true){
                    Ext.getCmp('fd_power').hide();
                }else{
                    var str = "";
                    var tmp = Object.keys(response);

                    for(var i=0; i<tmp.length; i++){

                       // str += "전원"+tmp[i].substr(7) + " : ";
                        str += tmp[i] + " : ";

                        str += response[tmp[i]] + "  ";


                    }

                    Ext.getCmp('fd_power').setValue(str);
                }
            });
        var _fan_params = {
            func_name: Ext.encode('get_system_cpu_fan'),
            args: Ext.encode({})
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'execKctrlFunc',
            _fan_params,
            function(response){
                console.log(response);
                if(response === true){
                    Ext.getCmp('fd_fan').hide();
                }else{
                    var str = "";
                    for(var i=0; i<response.count; i++){
                        str += "Fan"+(i+1)+" : On ("+response["fan"+(i+1)]+") ";
                    }
                    Ext.getCmp('fd_fan').setValue(str);
                }

            });
        var _raid_params = {
            func_name: Ext.encode('get_system_raid_info'),
            args: Ext.encode({})
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'execKctrlFunc',
            _raid_params,
            function(response){
                console.log(response);

                if(response === true){
                    Ext.getCmp('fd_raid').hide();
                }else{
                    var str = "";
                    var tmp = Object.keys(response);

                    for(var i=0; i<tmp.length; i++){
                        str += " / ";
                        str += tmp[i] + "  ";
                        var tmp_in = Object.keys(response[tmp[i]]);
                        for(var k=0; k<tmp_in.length; k++){
                            str += tmp_in[k]+":";
                            str += response[tmp[i]][tmp_in[k]] + " ";
                        }

                    }

                    Ext.getCmp('fd_raid').setValue(str.substr(2));
                }
            });
    },

    onButtonClick1: function(button, e, eOpts) {
        this.sta_menu_link("NFW2_firewall_profile_config");
    },

    onButtonClick111: function(button, e, eOpts) {
        this.sta_menu_link("NFW2_firewall_profile_filtering_config");
    },

    onButtonClick: function(button, e, eOpts) {
        this.sta_menu_link("NFW2_firewall_profile_filtering_config");
    },

    onButtonClick11: function(button, e, eOpts) {
        this.sta_menu_link("NFW2_firewall_profile_filtering_config");
    },

    onButtonClick1111: function(button, e, eOpts) {
        this.sta_menu_link("NFW2_ips_profile");
    },

    onButtonClick11111: function(button, e, eOpts) {
        this.sta_menu_link("NFW2_antivirus_profile");
    },

    onButtonClick111111: function(button, e, eOpts) {
        this.sta_menu_link("NFW2_antivirus_profile");
    },

    onButtonClick1111111: function(button, e, eOpts) {
        this.sta_menu_link("NFW2_antispam_profile");
    },

    onPanelBeforeRender21: function(component, eOpts) {
        Ext.suspendLayouts();

        //var _pnl_versionInfo = Ext.getCmp('pnl_versionInfo');


        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_version_info',
            {},
            function(response){

                console.log(response);

                var app_count = (response.app[1]!=="")?' ('+commify(response.app[1])+')':'';
                var kiscom_count = (response.kiscom[1]!=="")?' ('+commify(response.kiscom[1])+')':'';
                var http_count = (response.web[1]!=="")?' ('+commify(response.web[1])+')':'';
                var bad_count = (response.bad[1]!=="")?' ('+commify(response.bad[1])+')':'';
                var ips_count = (response.ips[1]!=="")?' ('+commify(response.ips[1])+')':'';
                var av_stream_count = (response.av_stream[1]!=="")?' ('+commify(response.av_stream[1])+')':'';
                var av_file_count = (response.av_file[1]!=="")?' ('+commify(response.av_file[1])+')':'';
                var as_count = (response.as[1]!=="")?' ('+commify(response.as[1])+')':'';

                if(response.firmware.version !== null){

                    Ext.getCmp('fd_firmware').setValue(response.firmware.version);

                    Ext.getCmp('fd_firmware').show();
                }

                if(response.ramdisk.version !== null){

                    var _ramdisk = response.ramdisk.version.split(' ');

                    var _ramdisks = _ramdisk[1].split('.');

                    var _ramdisk_tmp = _ramdisks[0] + "-" +_ramdisks[1] + "-" + _ramdisks[2];

                    Ext.getCmp('fd_ramdisk').setValue(_ramdisk[0] + " ("+_ramdisk_tmp+")");

                    Ext.getCmp('fd_ramdisk').show();
                }

                if(response.image.version !== null){

                    var _image = response.image.version.split(' ');

                    var _images = _image[1].split('.');

                    var _image_tmp = _images[0] + "-" +_images[1] + "-" + _images[2];

                    Ext.getCmp('fd_image').setValue(_image[0] + " ("+_image_tmp+")");

                    Ext.getCmp('fd_image').show();
                }

                if(response['do'].version !== null){

                    var _do = response['do'].version.split(' ');

                    var _dos = _do[1].split('.');

                    var _do_tmp = _dos[0] + "-" +_dos[1] + "-" + _dos[2];

                    Ext.getCmp('fd_do').setValue(_do[0] + " ("+_do_tmp+")");

                    Ext.getCmp('fd_do').show();
                }

                if(response.web[0] !== ""){

                    Ext.getCmp('fd_http').setValue(response.web[0]+http_count);

                    Ext.getCmp('cont_http').show();
                }

                if(response.app[0] !== ""){

                    Ext.getCmp('fd_app').setValue(response.app[0]+app_count);

                    Ext.getCmp('cont_app').show();
                }

                if(response.bad[0] !== ""){

                    Ext.getCmp('fd_bad').setValue(response.bad[0]+bad_count);

                    Ext.getCmp('cont_bad').show();
                }

                if(response.kiscom[0] !== ""){

                    Ext.getCmp('fd_kiscom').setValue(response.kiscom[0]+kiscom_count);

                    Ext.getCmp('cont_kiscom').show();
                }

                if(response.ips[0] !== ""){

                    Ext.getCmp('fd_ips').setValue(response.ips[0]+ips_count);

                    Ext.getCmp('cont_ips1').show();
                }

                if(response.av_stream[0] !== ""){

                    Ext.getCmp('fd_av_stream').setValue(response.av_stream[0]+av_stream_count);

                    Ext.getCmp('cont_av_stream').show();
                }

                if(response.av_file[0] !== ""){

                    Ext.getCmp('fd_av_file').setValue(response.av_file[0]+av_file_count);

                    Ext.getCmp('cont_av_file').show();
                }

                if(response.as[0] !== ""){

                    Ext.getCmp('fd_as').setValue(response.as[0]+as_count);

                    Ext.getCmp('cont_as1').show();
                }





                Ext.resumeLayouts(true);
            }

        );

    },

    onToolClick2: function(tool, e, owner, eOpts) {
        this.sta_menu_link("NFW2_system_update");
    },

    onCt_eth_slotItemClick: function(dataview, record, item, index, e, eOpts) {
        var data = record.data;
        Ext.getCmp('ct_slot_detail').update({"name":data.name,"ip":data.ip,"mac":data.mac,"speed":data.speed,"duplex":data.duplex,
                                             "zone":data.zone});
    },

    onToolClick1: function(tool, e, owner, eOpts) {
        this.sta_menu_link("NFW2_network_interface");
    },

    onToolClick11: function(tool, e, owner, eOpts) {
        this.sta_menu_link("NFW2_monitor_network_interface");
    },

    onPanelAfterRender: function(component, eOpts) {
        var slot = [];

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_nic_info',
            {},
            function(response){

                console.log(response);


                for (var i = 0; i < response.slot_count; ++i){
                    var cls_speed = ((response.interface_info[i][1].speed).substring(0,4)==="1000")?"yel":(((response.interface_info[i][1].speed).substring(0,4)==="100M")?"gr":"off");
                    slot.push({"name":response.slot_info[i][0],"state":response.slot_info[i][1],
                               "ip":response.interface_info[i][1].ip, "port":response.interface_info[i][1].port, "mac":response.interface_info[i][1].mac,
                               "speed":response.interface_info[i][1].speed, "duplex":response.interface_info[i][1].duplex,
                               "zone":response.interface_info[i][1].zone,
                               "port_cls":"port_"+((response.interface_info[i][1].port!=="copper")?"fiber_":"")+response.slot_info[i][1]+((response.slot_info[i][1]!=="no")?cls_speed:""),
                               "errs":response.interface_info[i][1]["errs/colls"][0],"colls":response.interface_info[i][1]["errs/colls"][1]});
                }

                console.log(slot);


                slot = sortByKey(slot,"name");



                Ext.getCmp('ct_serial_info').update("WeGuardia™ "+Ext.getCmp('fd_model').getValue());
                Ext.getCmp('ct_eth_slot').getStore().loadData(slot);

            });

        function sortByKey(array, key) {
            return array.sort(function(a, b) {
                var x = Number((a[key]).substr(3));
                var y = Number((b[key]).substr(3));


                if (typeof x == "string")
                {
                    x = x.toLowerCase();
                    y = y.toLowerCase();
                }

                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }

    },

    onPanelBeforeRender1: function(component, eOpts) {
        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_filesystem_info',
            {},
            function(response){

                var _records = [];

                for(var i in response){

                    _records.push({

                        Available : response[i].Available,
                        Use : response[i].Use,
                        Used : response[i].Used,
                        Mounted_on : response[i].Mounted_on,
                        Name : response[i].Name,
                        blocks : response[i]['1k_blocks']

                    });

                }

                var store = Ext.data.StoreManager.lookup('store_filesystem_info');

                Ext.suspendLayouts();

                store.loadData(_records);

                Ext.resumeLayouts(true);

            }
        );

    },

    onToolClick: function(tool, e, owner, eOpts) {
        this.onPanelBeforeRender1();
    },

    onNFW2_system_equipmentStateAfterRender: function(component, eOpts) {
        hideLoadMask();
        this.apply_license();
    },

    sta_menu_link: function(id) {
        /*var node = Ext.getCmp('nfw_brmb').getStore().getNodeById(id);
        Ext.getCmp('nfw_brmb').setSelection(node);

        Ext.getCmp('pnl_cont').removeAll();
        Ext.getCmp('pnl_cont').add(Ext.create("NFW2.view."+id));
        */
        make_navi_map(id);
    },

    apply_license: function() {
        var me = this;

        var _params = {
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_license_info',
            _params,
            function(response){

                if(response.module)
                {
                    if(response.system_module.fw !== "on")
                    {
                        Ext.getCmp('cont_app').hide();
                        Ext.getCmp('cont_kiscom').hide();
                        Ext.getCmp('cont_http').hide();
                        Ext.getCmp('cont_bad').hide();
                    }
                    if(response.system_module.ips !== "on")
                    {
                        Ext.getCmp('cont_ips1').hide();
                    }
                    if(response.system_module.av !== "on")
                    {
                        Ext.getCmp('cont_av_stream').hide();
                        Ext.getCmp('cont_av_file').hide();
                    }

                    if(response.system_module.as !== "on")
                    {
                        Ext.getCmp('cont_as1').hide();
                    }




                }
            }
        );
    }

});