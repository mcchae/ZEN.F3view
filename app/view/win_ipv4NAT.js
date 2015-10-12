
Ext.define('NFW2.view.win_ipv4NAT', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_ipv4nat',

    requires: [
        'NFW2.view.win_ipv4NATViewModel',
        'Ext.form.Panel',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.grid.plugin.DragDrop',
        'Ext.util.Point',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.button.Segmented',
        'Ext.form.field.Checkbox'
    ],

    viewModel: {
        type: 'win_ipv4nat'
    },
    cls: 'zen_win',
    height: 600,
    id: 'win_ipv4NAT',
    width: 1050,
    defaultListenerScope: true,

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            flex: 1,
            id: 'fm_v4nat',
            title: '',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    cls: 'infw_out',
                    height: 230,
                    margin: '5 0 0 0',
                    padding: '5 0 5 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'gridpanel',
                            cls: 'infw_grid',
                            id: 'grid_src',
                            itemId: 'grid_src',
                            margin: '0 0 0 5',
                            width: 260,
                            store: 'store_tmp_src',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return "<ul class='disp_obj'><li class='"+record.data.otype+"'>"+record.data.name+"</li></ul>";
                                    },
                                    dataIndex: 'string',
                                    flex: 1,
                                    bind: {
                                        text: '{src}'
                                    }
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 30,
                                    items: [
                                        {
                                            getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                return "icr_del";
                                            },
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                Ext.getCmp("grid_src").getStore().removeAt(rowIndex);
                                            }
                                        }
                                    ]
                                }
                            ],
                            viewConfig: {
                                plugins: [
                                    {
                                        ptype: 'gridviewdragdrop',
                                        dragGroup: 'grid_src',
                                        dropGroup: 'grid_setobj'
                                    }
                                ],
                                listeners: {
                                    beforedrop: 'onViewBeforeDrop2'
                                }
                            },
                            listeners: {
                                cellclick: 'onGrid_srcCellClick',
                                containerclick: 'onGrid_srcContainerClick'
                            }
                        },
                        {
                            xtype: 'gridpanel',
                            cls: 'infw_grid',
                            id: 'grid_dest',
                            itemId: 'grid_dest',
                            margin: '0 0 0 5',
                            width: 260,
                            store: 'store_tmp_dest',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return "<ul class='disp_obj'><li class='"+record.data.otype+"'>"+record.data.name+"</li></ul>";
                                    },
                                    dataIndex: 'string',
                                    flex: 1,
                                    bind: {
                                        text: '{dest}'
                                    }
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 30,
                                    items: [
                                        {
                                            getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                return "icr_del";
                                            },
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                Ext.getCmp("grid_dest").getStore().removeAt(rowIndex);
                                            }
                                        }
                                    ]
                                }
                            ],
                            viewConfig: {
                                plugins: [
                                    {
                                        ptype: 'gridviewdragdrop',
                                        dragGroup: 'grid_dest',
                                        dropGroup: 'grid_setobj'
                                    }
                                ],
                                listeners: {
                                    beforedrop: 'onViewBeforeDrop1'
                                }
                            },
                            listeners: {
                                cellclick: 'onGrid_srcCellClick1',
                                containerclick: 'onGrid_destContainerClick'
                            }
                        },
                        {
                            xtype: 'gridpanel',
                            cls: 'infw_grid',
                            id: 'grid_svc',
                            itemId: 'grid_svc',
                            margin: '0 0 0 5',
                            width: 260,
                            store: 'store_tmp_svc',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return "<ul class='disp_obj'><li class='"+record.data.otype+"'>"+record.data.name+"</li></ul>";
                                    },
                                    dataIndex: 'string',
                                    flex: 1,
                                    bind: {
                                        text: '{service}'
                                    }
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 30,
                                    items: [
                                        {
                                            getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                return "icr_del";
                                            },
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                Ext.getCmp("grid_svc").getStore().removeAt(rowIndex);
                                            }
                                        }
                                    ]
                                }
                            ],
                            viewConfig: {
                                plugins: [
                                    {
                                        ptype: 'gridviewdragdrop',
                                        dragGroup: 'grid_svc',
                                        dropGroup: 'grid_setobj'
                                    }
                                ],
                                listeners: {
                                    beforedrop: 'onViewBeforeDrop'
                                }
                            },
                            listeners: {
                                cellclick: 'onGrid_srcCellClick11',
                                containerclick: 'onGrid_svcContainerClick'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    cls: 'infw_out',
                    height: 120,
                    margin: '5 0 0 0',
                    padding: '5 0 5 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'gridpanel',
                            cls: 'infw_grid',
                            id: 'grid_xsrc',
                            itemId: 'grid_xsrc',
                            margin: '0 0 0 5',
                            width: 260,
                            store: 'store_tmp_xsrc',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return "<ul class='disp_obj'><li class='"+record.data.otype+"'>"+record.data.name+"</li></ul>";
                                    },
                                    dataIndex: 'string',
                                    flex: 1,
                                    bind: {
                                        text: '{xsrc}'
                                    }
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 30,
                                    items: [
                                        {
                                            getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                return "icr_del";
                                            },
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                Ext.getCmp("grid_xsrc").getStore().removeAt(rowIndex);
                                            }
                                        }
                                    ]
                                }
                            ],
                            viewConfig: {
                                plugins: [
                                    {
                                        ptype: 'gridviewdragdrop',
                                        dragGroup: 'grid_xsrc',
                                        dropGroup: 'grid_setobj'
                                    }
                                ],
                                listeners: {
                                    beforedrop: 'onViewBeforeDrop21'
                                }
                            },
                            listeners: {
                                cellclick: 'onGrid_srcCellClick2',
                                containerclick: 'onGrid_xsrcContainerClick'
                            }
                        },
                        {
                            xtype: 'gridpanel',
                            cls: 'infw_grid',
                            id: 'grid_xdest',
                            itemId: 'grid_xdest',
                            margin: '0 0 0 5',
                            width: 260,
                            store: 'store_tmp_xdest',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return "<ul class='disp_obj'><li class='"+record.data.otype+"'>"+record.data.name+"</li></ul>";
                                    },
                                    dataIndex: 'string',
                                    flex: 1,
                                    bind: {
                                        text: '{xdest}'
                                    }
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 30,
                                    items: [
                                        {
                                            getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                return "icr_del";
                                            },
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                Ext.getCmp("grid_xdest").getStore().removeAt(rowIndex);
                                            }
                                        }
                                    ]
                                }
                            ],
                            viewConfig: {
                                plugins: [
                                    {
                                        ptype: 'gridviewdragdrop',
                                        dragGroup: 'grid_xdest',
                                        dropGroup: 'grid_setobj'
                                    }
                                ],
                                listeners: {
                                    beforedrop: 'onViewBeforeDrop11'
                                }
                            },
                            listeners: {
                                cellclick: 'onGrid_srcCellClick12',
                                containerclick: 'onGrid_xdestContainerClick'
                            }
                        },
                        {
                            xtype: 'gridpanel',
                            cls: 'infw_grid',
                            id: 'grid_xsvc',
                            itemId: 'grid_xsvc',
                            margin: '0 0 0 5',
                            width: 260,
                            store: 'store_tmp_xsvc',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return "<ul class='disp_obj'><li class='"+record.data.otype+"'>"+record.data.name+"</li></ul>";
                                    },
                                    dataIndex: 'string',
                                    flex: 1,
                                    bind: {
                                        text: '{xservice}'
                                    }
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 30,
                                    items: [
                                        {
                                            getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                return "icr_del";
                                            },
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                Ext.getCmp("grid_xsvc").getStore().removeAt(rowIndex);
                                            }
                                        }
                                    ]
                                }
                            ],
                            viewConfig: {
                                plugins: [
                                    {
                                        ptype: 'gridviewdragdrop',
                                        dragGroup: 'grid_xsvc',
                                        dropGroup: 'grid_setobj'
                                    }
                                ],
                                listeners: {
                                    beforedrop: 'onViewBeforeDrop3'
                                }
                            },
                            listeners: {
                                cellclick: 'onGrid_srcCellClick111',
                                containerclick: 'onGrid_xsvcContainerClick'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    padding: 20,
                    items: [
                        {
                            xtype: 'container',
                            id: 'ct_num',
                            padding: '',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){ return get_msg("err_null"); }
                                        if(!ValidNum(value)){ return get_msg('err_form'); }
                                        return true;



                                    },
                                    cls: 'lb_req',
                                    id: 'num',
                                    width: 200,
                                    labelSeparator: ' ',
                                    labelWidth: 110,
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    enforceMaxLength: false,
                                    maxLength: 31,
                                    minLength: 1,
                                    bind: {
                                        fieldLabel: '{rule_rank}'
                                    },
                                    listeners: {
                                        errorchange: 'onNameErrorChange',
                                        keydown: 'onNumKeydown'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    id: 'fld_range',
                                    margin: '0 0 0 20'
                                },
                                {
                                    xtype: 'label',
                                    cls: 'errorBox',
                                    hidden: true,
                                    id: 'err_name',
                                    text: ''
                                }
                            ]
                        },
                        {
                            xtype: 'combobox',
                            id: 'type',
                            width: 300,
                            labelSeparator: ' ',
                            labelWidth: 110,
                            value: 'XNAT',
                            editable: false,
                            store: 'store_nat_type',
                            valueField: 'val',
                            bind: {
                                fieldLabel: '{type}'
                            },
                            listeners: {
                                change: 'onTypeChange'
                            }
                        },
                        {
                            xtype: 'combobox',
                            id: 'interface',
                            labelSeparator: ' ',
                            labelWidth: 110,
                            value: 'Any',
                            editable: false,
                            displayField: 'name',
                            store: 'store_eth',
                            valueField: 'name',
                            bind: {
                                fieldLabel: '{eth}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: 'memo',
                            width: 500,
                            labelSeparator: ' ',
                            labelWidth: 110,
                            enforceMaxLength: true,
                            maxLength: 127,
                            bind: {
                                fieldLabel: '{desc}'
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
                            itemId: 'fld_msg_fw'
                        },
                        {
                            xtype: 'button',
                            cls: 'ft_confirm',
                            iconCls: 'ft_confirm_icl',
                            bind: {
                                text: '{confirm}'
                            },
                            listeners: {
                                click: 'on_btn_confirm'
                            }
                        },
                        {
                            xtype: 'button',
                            cls: 'ft_cancel',
                            bind: {
                                text: '{cancel}'
                            },
                            listeners: {
                                click: 'on_btn_cancel'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'panel',
            dock: 'right',
            margin: '5 0 0 0',
            width: 240,
            bodyCls: 'pnl_sub',
            items: [
                {
                    xtype: 'container',
                    margin: '5 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'cycle',
                            changeHandler: function(button, item) {
                                button.value = item.itemIndex;
                                if(item.itemIndex===0){button.text = __zen('name');}
                            },
                            cls: 'btn_b',
                            itemId: 'sear_type',
                            width: 75,
                            value: 0,
                            showText: true,
                            menu: {
                                xtype: 'menu',
                                items: [
                                    {
                                        xtype: 'menucheckitem',
                                        id: 'sel_fw_cycle_name'
                                    },
                                    {
                                        xtype: 'menucheckitem',
                                        text: 'IP'
                                    },
                                    {
                                        xtype: 'menucheckitem',
                                        text: 'Port'
                                    }
                                ]
                            },
                            listeners: {
                                render: 'onSear_typeRender'
                            }
                        },
                        {
                            xtype: 'textfield',
                            cls: 's_input',
                            width: 150,
                            enableKeyEvents: true,
                            listeners: {
                                keydown: 'onTextfieldKeydown'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    cls: 'pnl_sub_in',
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'segmentedbutton',
                                    componentCls: 'zen_seg',
                                    id: 'b_segment',
                                    margin: '0 0 5 0',
                                    items: [
                                        {
                                            enableToggle: true,
                                            pressed: true,
                                            bind: {
                                                text: '{src}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick2'
                                            }
                                        },
                                        {
                                            bind: {
                                                text: '{dest}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick21'
                                            }
                                        },
                                        {
                                            bind: {
                                                text: '{service}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick211'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: 'chg_setobj_type',
                                    style: 'font-size:11px',
                                    boxLabel: '변경',
                                    listeners: {
                                        change: 'onChg_setobj_typeChange'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'segmentedbutton',
                                    componentCls: 'zen_seg',
                                    id: 'b_segment_sub',
                                    margin: '0 0 5 0',
                                    items: [
                                        {
                                            itemId: 'seg_ip_all',
                                            enableToggle: true,
                                            pressed: true,
                                            text: 'All',
                                            listeners: {
                                                click: 'onButtonClick22'
                                            }
                                        },
                                        {
                                            itemId: 'seg_ip_ip',
                                            text: 'IP',
                                            listeners: {
                                                click: 'onButtonClick212'
                                            }
                                        },
                                        {
                                            itemId: 'seg_ip_group',
                                            text: 'Group',
                                            listeners: {
                                                click: 'onButtonClick2111'
                                            }
                                        },
                                        {
                                            itemId: 'seg_ip_etc',
                                            text: 'Etc',
                                            listeners: {
                                                click: 'onButtonClick21111'
                                            }
                                        },
                                        {
                                            hidden: true,
                                            itemId: 'seg_svc_all',
                                            text: 'All',
                                            listeners: {
                                                click: 'onButtonClick211111'
                                            }
                                        },
                                        {
                                            hidden: true,
                                            itemId: 'seg_svc_port',
                                            text: 'Port',
                                            listeners: {
                                                click: 'onButtonClick2111111'
                                            }
                                        },
                                        {
                                            hidden: true,
                                            itemId: 'seg_svc_group',
                                            text: 'Group',
                                            listeners: {
                                                click: 'onButtonClick21111111'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'button',
                                    cls: 'btn_s',
                                    itemId: 'btn_add_obj',
                                    iconCls: 'ics_add',
                                    menu: {
                                        xtype: 'menu',
                                        id: 'add_obj_inlist',
                                        width: 150
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    cls: 'sub_grid',
                    height: 450,
                    id: 'grid_setobj',
                    itemId: 'grid_setobj',
                    hideHeaders: true,
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return "<ul class='disp_obj'><li class='"+record.data.otype+"'>"+record.data.name+"</li></ul>";
                            },
                            dataIndex: 'name',
                            flex: 1
                        },
                        {
                            xtype: 'actioncolumn',
                            width: 40,
                            dataIndex: 'otype',
                            items: [
                                {
                                    getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                        return (v !== "env")?"icr_detail":"";
                                    },
                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                        var cid = record.data.cid;
                                        var otype = record.data.otype;

                                        var tmptd = Ext.get(row).query("ul")[1];
                                        var flag = (tmptd !== undefined)?false:true;


                                        Ext.getCmp("win_ipv4NAT").get_obj_info(cid,otype,"grid_setobj",rowIndex,(record.data.xname===undefined)?record.data.name:record.data.xname,flag);

                                    }
                                },
                                {
                                    getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                        return (v !== "env")?"icr_edit":"";
                                    },
                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                        var otype = record.data.otype;
                                        var loadmode = (otype==="port" || otype==="group")?"store_svc_obj":"store_ip_obj";
                                        var target = (otype==="port" || otype==="group")?"nat_svc":"nat_ip";

                                        var pid = "";

                                        switch(otype){
                                            case "v4" 		: pid = "win_ipv4";break;
                                            case "v4_group" : pid = "win_ipv4_group";break;
                                            case "domain" 	: pid = "win_ipv4_domain";break;
                                            case "country" 	: pid = "win_country";break;
                                            case "port" 	: pid = "win_service_port";break;
                                            case "group" 	: pid = "win_portgroup";break;
                                        }

                                        var win = Ext.create('NFW2.view.'+pid,{
                                            edit : "edit",
                                            cid : record.data.cid,
                                            num : '',
                                            modal : true,
                                            loadmode: loadmode,
                                            target : target
                                        });
                                        win.show();
                                    }
                                }
                            ]
                        }
                    ],
                    viewConfig: {
                        copy: true,
                        plugins: [
                            {
                                ptype: 'gridviewdragdrop',
                                dragGroup: 'grid_setobj',
                                dropGroup: 'grid_src',
                                enableDrop: false
                            }
                        ]
                    },
                    listeners: {
                        cellclick: 'onGrid_setobjCellClick',
                        celldblclick: 'onGrid_setobjCellDblClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWindowAfterRender'
    },

    onViewBeforeDrop2: function(node, data, overModel, dropPosition, dropHandlers, eOpts) {
        var otype = data.records[0].data.otype;
        if(otype === "port" || otype === "group"){	return false;	}

        if(Ext.getCmp('type').getValue()==="TNAT"){
            if(otype === "env" || otype === "v4_group"){	return false;	}
        }

        var tmp = Ext.data.StoreManager.lookup("store_tmp_src");

        var chk_dob = tmp.find('cid', data.records[0].data.cid);

        if(chk_dob !== -1){	return false;	}
    },

    onGrid_srcCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var cid = record.data.cid;
        var otype = record.data.otype;
        var tmptd = Ext.get(td).query("ul")[1];
        var flag = (tmptd !== undefined)?false:true;
        this.get_obj_info(cid,otype,"grid_src",rowIndex,(record.data.xname===undefined)?record.data.name:record.data.xname,flag);
    },

    onGrid_srcContainerClick: function(dataview, e, eOpts) {
        Ext.getCmp('b_segment').getComponent(0).setPressed(true);
        Ext.getCmp('chg_setobj_type').setValue(false);
        this.make_inlist('src');
    },

    onViewBeforeDrop1: function(node, data, overModel, dropPosition, dropHandlers, eOpts) {
        var otype = data.records[0].data.otype;
        if(otype === "port" || otype === "group"){	return false;	}
        if(Ext.getCmp('type').getValue()==="TNAT"){
            if(otype === "env" || otype === "v4_group"){	return false;	}
        }

        var tmp = Ext.data.StoreManager.lookup("store_tmp_dest");

        var chk_dob = tmp.find('cid', data.records[0].data.cid);

        if(chk_dob !== -1){	return false;	}
    },

    onGrid_srcCellClick1: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var cid = record.data.cid;
        var otype = record.data.otype;
        var tmptd = Ext.get(td).query("ul")[1];
        var flag = (tmptd !== undefined)?false:true;
        this.get_obj_info(cid,otype,"grid_dest",rowIndex,(record.data.xname===undefined)?record.data.name:record.data.xname,flag);
    },

    onGrid_destContainerClick: function(dataview, e, eOpts) {
        Ext.getCmp('b_segment').getComponent(1).setPressed(true);
        Ext.getCmp('chg_setobj_type').setValue(false);
        this.make_inlist('dest');
    },

    onViewBeforeDrop: function(node, data, overModel, dropPosition, dropHandlers, eOpts) {
        var otype = data.records[0].data.otype;
        if(!(otype === "port" || otype === "group")){	return false;	}

        var tmp = Ext.data.StoreManager.lookup("store_tmp_svc");

        var chk_dob = tmp.find('cid', data.records[0].data.cid);

        if(chk_dob !== -1){	return false;	}

    },

    onGrid_srcCellClick11: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var cid = record.data.cid;
        var otype = record.data.otype;
        var tmptd = Ext.get(td).query("ul")[1];
        var flag = (tmptd !== undefined)?false:true;
        this.get_obj_info(cid,otype,"grid_svc",rowIndex,(record.data.xname===undefined)?record.data.name:record.data.xname,flag);
    },

    onGrid_svcContainerClick: function(dataview, e, eOpts) {
        Ext.getCmp('b_segment').getComponent(2).setPressed(true);
        Ext.getCmp('chg_setobj_type').setValue(false);
        this.make_inlist('svc');
    },

    onViewBeforeDrop21: function(node, data, overModel, dropPosition, dropHandlers, eOpts) {
        var otype = data.records[0].data.otype;
        if(otype === "port" || otype === "group" || otype === "v4_group"){	return false;	}
        if(Ext.getCmp('type').getValue()==="TNAT"){
            if(otype === "env"){	return false;	}
        }

        var _store = Ext.data.StoreManager.lookup("store_tmp_xsrc");
        _store.removeAll();
    },

    onGrid_srcCellClick2: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var cid = record.data.cid;
        var otype = record.data.otype;
        var tmptd = Ext.get(td).query("ul")[1];
        var flag = (tmptd !== undefined)?false:true;
        this.get_obj_info(cid,otype,"grid_xsrc",rowIndex,(record.data.xname===undefined)?record.data.name:record.data.xname,flag);
    },

    onGrid_xsrcContainerClick: function(dataview, e, eOpts) {
        Ext.getCmp('b_segment').getComponent(0).setPressed(true);
        Ext.getCmp('chg_setobj_type').setValue(true);
        this.make_inlist('xsrc');
    },

    onViewBeforeDrop11: function(node, data, overModel, dropPosition, dropHandlers, eOpts) {
        var otype = data.records[0].data.otype;
        if(otype !== "v4"){	return false;	}

        var _store = Ext.data.StoreManager.lookup("store_tmp_xdest");
        _store.removeAll();
    },

    onGrid_srcCellClick12: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var cid = record.data.cid;
        var otype = record.data.otype;
        var tmptd = Ext.get(td).query("ul")[1];
        var flag = (tmptd !== undefined)?false:true;
        this.get_obj_info(cid,otype,"grid_xdest",rowIndex,(record.data.xname===undefined)?record.data.name:record.data.xname,flag);
    },

    onGrid_xdestContainerClick: function(dataview, e, eOpts) {
        Ext.getCmp('b_segment').getComponent(1).setPressed(true);
        Ext.getCmp('chg_setobj_type').setValue(true);
        this.make_inlist('xdest');
    },

    onViewBeforeDrop3: function(node, data, overModel, dropPosition, dropHandlers, eOpts) {
        var otype = data.records[0].data.otype;
        if(otype !== "port" ){	return false;	}


        var _store = Ext.data.StoreManager.lookup("store_tmp_xsvc");
        _store.removeAll();

    },

    onGrid_srcCellClick111: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var cid = record.data.cid;
        var otype = record.data.otype;
        var tmptd = Ext.get(td).query("ul")[1];
        var flag = (tmptd !== undefined)?false:true;

        this.get_obj_info(cid,otype,"grid_xsvc",rowIndex,(record.data.xname===undefined)?record.data.name:record.data.xname,flag);
    },

    onGrid_xsvcContainerClick: function(dataview, e, eOpts) {
        Ext.getCmp('b_segment').getComponent(2).setPressed(true);
        Ext.getCmp('chg_setobj_type').setValue(true);
        this.make_inlist('xsvc');
    },

    onNameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg_fw");
    },

    onNumKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                        if(ValidNumKeydown(code)===false){
                            e.stopEvent();
                        }
    },

    onTypeChange: function(field, newValue, oldValue, eOpts) {

        if(newValue === undefined){newValue = "XNAT";}
        switch(newValue)
        {

            case "SNAT" :
                Ext.getCmp('grid_xsrc').setDisabled(false);
                Ext.getCmp('grid_xdest').setDisabled(true);
                Ext.getCmp('grid_xsvc').setDisabled(true);
                Ext.getCmp('interface').setDisabled(false);
                Ext.getCmp('grid_xdest').getStore().removeAll();
                Ext.getCmp('grid_xsvc').getStore().removeAll();
                break;
            case "TNAT" :
                Ext.getCmp('grid_xsrc').setDisabled(false);
                Ext.getCmp('grid_xdest').setDisabled(false);
                Ext.getCmp('grid_xsvc').setDisabled(false);
                Ext.getCmp('interface').setDisabled(false);
                break;
            case "FNAT" :
                Ext.getCmp('grid_xsrc').setDisabled(false);
                Ext.getCmp('grid_xdest').setDisabled(false);
                Ext.getCmp('grid_xsvc').setDisabled(false);
                Ext.getCmp('interface').setDisabled(false);
                break;
            case "XNAT" :
                Ext.getCmp('grid_xsrc').setDisabled(true);
                Ext.getCmp('grid_xdest').setDisabled(true);
                Ext.getCmp('grid_xsvc').setDisabled(true);
                Ext.getCmp('interface').setDisabled(true);
                Ext.getCmp('grid_xsrc').getStore().removeAll();
                Ext.getCmp('grid_xdest').getStore().removeAll();
                Ext.getCmp('grid_xsvc').getStore().removeAll();
                Ext.getCmp('interface').setValue("Any");
                break;
            default 	:	Ext.getCmp('grid_xsrc').setDisabled(true);
                Ext.getCmp('grid_xdest').setDisabled(false);
                Ext.getCmp('grid_xsvc').setDisabled(false);
                Ext.getCmp('interface').setDisabled(true);
                Ext.getCmp('grid_xsrc').getStore().removeAll();
                Ext.getCmp('interface').setValue("Any");
                break;/*DNAT*/
        }

        if(Ext.getCmp('b_segment').getComponent(2).pressed===true){
            this.onButtonClick211111();
        }else{
            this.onButtonClick22();
        }


        if(newValue==="TNAT"){

            Ext.getCmp('b_segment_sub').getComponent('seg_ip_group').setDisabled(true);
            Ext.getCmp('b_segment_sub').getComponent('seg_ip_etc').setDisabled(true);
            Ext.getCmp('b_segment_sub').getComponent('seg_svc_group').setDisabled(true);

        }else{
            Ext.getCmp('b_segment_sub').getComponent('seg_ip_group').setDisabled(false);
            Ext.getCmp('b_segment_sub').getComponent('seg_ip_etc').setDisabled(false);
            Ext.getCmp('b_segment_sub').getComponent('seg_svc_group').setDisabled(false);
        }

    },

    on_btn_confirm: function(button, e, eOpts) {
        this.set_fw_nat_ipv4();


    },

    on_btn_cancel: function(button, e, eOpts) {
        this.close();
    },

    onSear_typeRender: function(component, eOpts) {
        component.setText(__zen('name'));
    },

    onTextfieldKeydown: function(textfield, e, eOpts) {
        var settype = Ext.ComponentQuery.query('#sear_type')[0].value;
        var _store = (Ext.getCmp('b_segment').getComponent(2).pressed===true)?"store_svc_obj":"store_ip_obj";

        switch (settype){
            case 0 	: var _params = {type:'name',other:textfield.value}; break;
            case 1	: var _params = {type:'ip',ip:textfield.value}; break;
            case 2	: var _params = {type:'port',port:parseInt(textfield.value)}; break;
        }


        if(e.keyCode === 13){
            if(textfield.value===""){Ext.data.StoreManager.lookup(_store).getProxy().setExtraParam("search_info",  Ext.encode([]));}else{
            Ext.data.StoreManager.lookup(_store).getProxy().setExtraParam("search_info",  Ext.encode(_params));
            }
        Ext.data.StoreManager.lookup(_store).load();
        }

    },

    onButtonClick2: function(button, e, eOpts) {
        this.make_inlist('src');
    },

    onButtonClick21: function(button, e, eOpts) {
        this.make_inlist('dest');
    },

    onButtonClick211: function(button, e, eOpts) {
        this.make_inlist('svc');
    },

    onChg_setobj_typeChange: function(field, newValue, oldValue, eOpts) {

        if(newValue===true){

        Ext.getCmp('b_segment_sub').getComponent('seg_ip_group').setDisabled(true);
        Ext.getCmp('b_segment_sub').getComponent('seg_svc_group').setDisabled(true);


        }else{
          if(Ext.getCmp('type').getValue()!=="TNAT"){
             Ext.getCmp('b_segment_sub').getComponent('seg_ip_group').setDisabled(false);
           }
           Ext.getCmp('b_segment_sub').getComponent('seg_svc_group').setDisabled(false);
        }

         if(Ext.getCmp('type').getValue()==="TNAT"){

                 Ext.getCmp('b_segment_sub').getComponent('seg_ip_etc').setDisabled(true);
             }else{
                 if(Ext.getCmp('type').getValue()==="DNAT" && newValue===true){
                     Ext.getCmp('b_segment_sub').getComponent('seg_ip_etc').setDisabled(true);
                 }else{
                 Ext.getCmp('b_segment_sub').getComponent('seg_ip_etc').setDisabled(false);
                 }
             }

        if(Ext.getCmp('b_segment').getComponent(2).pressed===true){
        this.onButtonClick211111();
        }else{
         this.onButtonClick22();
        }
    },

    onButtonClick22: function(button, e, eOpts) {
        Ext.getCmp('grid_setobj').reconfigure("store_ip_obj");
        if(Ext.getCmp('type').getValue()==="TNAT"){
            Ext.data.StoreManager.lookup('store_ip_obj').getProxy().setExtraParam("object_list",  Ext.encode(["ipv4"]));
        }else if(Ext.getCmp('chg_setobj_type').checked===true){
              if(Ext.getCmp('type').getValue()==="DNAT"){
                  Ext.data.StoreManager.lookup('store_ip_obj').getProxy().setExtraParam("object_list",  Ext.encode(["ipv4"]));
            }else{

             Ext.data.StoreManager.lookup('store_ip_obj').getProxy().setExtraParam("object_list",  Ext.encode(["env","ipv4"]));
            }

        }else{
            Ext.data.StoreManager.lookup('store_ip_obj').getProxy().setExtraParam("object_list",  Ext.encode(["env","ipv4","ipv4_group"]));

        }


        Ext.data.StoreManager.lookup('store_ip_obj').load();
    },

    onButtonClick212: function(button, e, eOpts) {
        Ext.getCmp('grid_setobj').reconfigure("store_ip_obj");
        Ext.data.StoreManager.lookup('store_ip_obj').getProxy().setExtraParam("object_list",  Ext.encode(["ipv4"]));
        Ext.data.StoreManager.lookup('store_ip_obj').load();
    },

    onButtonClick2111: function(button, e, eOpts) {
        Ext.getCmp('grid_setobj').reconfigure("store_ip_obj");
        Ext.data.StoreManager.lookup('store_ip_obj').getProxy().setExtraParam("object_list",  Ext.encode(["ipv4_group"]));
        Ext.data.StoreManager.lookup('store_ip_obj').load();
    },

    onButtonClick21111: function(button, e, eOpts) {
        Ext.getCmp('grid_setobj').reconfigure("store_ip_obj");
        Ext.data.StoreManager.lookup('store_ip_obj').getProxy().setExtraParam("object_list",  Ext.encode(["env"]));
        Ext.data.StoreManager.lookup('store_ip_obj').load();
    },

    onButtonClick211111: function(button, e, eOpts) {
        Ext.getCmp('grid_setobj').reconfigure("store_svc_obj");
        if(Ext.getCmp('chg_setobj_type').checked===true){
            Ext.data.StoreManager.lookup('store_svc_obj').getProxy().setExtraParam("object_list",  Ext.encode(["port"]));
        }else{
            Ext.data.StoreManager.lookup('store_svc_obj').getProxy().setExtraParam("object_list",  Ext.encode(["port","service_group"]));
        }
                Ext.data.StoreManager.lookup('store_svc_obj').load();
    },

    onButtonClick2111111: function(button, e, eOpts) {
        Ext.getCmp('grid_setobj').reconfigure("store_svc_obj");
                Ext.data.StoreManager.lookup('store_svc_obj').getProxy().setExtraParam("object_list",  Ext.encode(["port"]));
                Ext.data.StoreManager.lookup('store_svc_obj').load();
    },

    onButtonClick21111111: function(button, e, eOpts) {
        Ext.getCmp('grid_setobj').reconfigure("store_svc_obj");
                Ext.data.StoreManager.lookup('store_svc_obj').getProxy().setExtraParam("object_list",  Ext.encode(["service_group"]));
                Ext.data.StoreManager.lookup('store_svc_obj').load();
    },

    onGrid_setobjCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        return false;
        var cid = record.data.cid;
        var otype = record.data.otype;
        this.get_obj_info(cid,otype,"grid_setobj",rowIndex,(record.data.xname===undefined)?record.data.name:record.data.xname);
    },

    onGrid_setobjCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var _tmpstore = "";
        var _tmpgrid = "";
        var is_change = Ext.getCmp('chg_setobj_type').checked;

        if(Ext.getCmp('b_segment').getComponent(0).pressed===true){	_tmpstore = "store_tmp_src";}
        else if(Ext.getCmp('b_segment').getComponent(1).pressed===true){	_tmpstore = "store_tmp_dest";}
        else if(Ext.getCmp('b_segment').getComponent(2).pressed===true){	_tmpstore = "store_tmp_svc";}

        if(is_change){
            if(Ext.getCmp('b_segment').getComponent(0).pressed===true){	_tmpstore = "store_tmp_xsrc";_tmpgrid="grid_xsrc";}
            else if(Ext.getCmp('b_segment').getComponent(1).pressed===true){	_tmpstore = "store_tmp_xdest";_tmpgrid="grid_xdest";}
            else if(Ext.getCmp('b_segment').getComponent(2).pressed===true){	_tmpstore = "store_tmp_xsvc";_tmpgrid="grid_xsvc";}

        };

        var tmp = Ext.data.StoreManager.lookup(_tmpstore);

        if(_tmpgrid !== ""){
           if(Ext.getCmp(_tmpgrid).disabled === true){return false;}
        }

        if(is_change){

            tmp.removeAll();

        }else{

             var chk_dob = tmp.find('cid', record.data.cid);

            if(chk_dob !== -1){	return false;	}

        }
         tmp.add({
                'name' : (record.data.xname===undefined)?record.data.name:record.data.xname,
                'otype' : record.data.otype,
                'cid' : record.data.cid
            });
    },

    onWindowAfterRender: function(component, eOpts) {
        this.init_fw_nat_ipv4();
        this.onTypeChange();
        chk_zenauth(null);
        Ext.getCmp('sel_fw_cycle_name').setText(__zen('name'));
        Ext.getCmp('chg_setobj_type').setBoxLabel(__zen('change'));
    },

    init_fw_nat_ipv4: function(edit, uid) {
        var me = this;

        var _params = {
            basename : Ext.encode('firewall_nat_ipv4'),
            key : Ext.encode({'@uid':me.uid})
        };



        if(me.edit === "edit"){


            this.setTitle(__zen('spd_edit')+" - "+me.num);
            Ext.getCmp("ct_num").hide();

            request_helper.xmlrpc_call_JsonP('ftuctrl','getObject',_params,
                                             function(response){


                                                 var in_src = [];
                                                 var in_dest = [];
                                                 var in_svc = [];
                                                 var in_xsrc = [];
                                                 var in_xdest = [];
                                                 var in_xsvc = [];

                                                 for(var i=0; i<response.src.length; i++){
                                                     if(response.src[i]["@otype"]==="Any"){continue;}
                                                     in_src.push({
                                                         'name' : response.src[i]["#text"],
                                                         'otype' : response.src[i]["@otype"],
                                                         'cid' : response.src[i]["@cid"]
                                                     });
                                                 }
                                                 for(var i=0; i<response.dest.length; i++){
                                                     if(response.dest[i]["@otype"]==="Any"){continue;}
                                                     in_dest.push({
                                                         'name' : response.dest[i]["#text"],
                                                         'otype' : response.dest[i]["@otype"],
                                                         'cid' : response.dest[i]["@cid"]
                                                     });
                                                 }
                                                 for(var i=0; i<response.service.length; i++){
                                                     if(response.service[i]["@otype"]==="Any"){continue;}
                                                     in_svc.push({
                                                         'name' : response.service[i]["#text"],
                                                         'otype' : response.service[i]["@otype"],
                                                         'cid' : response.service[i]["@cid"]
                                                     });
                                                 }

                                                 if(response.xsrc["@cid"]!=="null"){
                                                     in_xsrc.push({
                                                         'name' : response.xsrc["#text"],
                                                         'otype' : response.xsrc["@otype"],
                                                         'cid' : response.xsrc["@cid"]
                                                     });
                                                 }
                                                 if(response.xdest["@cid"]!=="null"){
                                                     in_xdest.push({
                                                         'name' : response.xdest["#text"],
                                                         'otype' : response.xdest["@otype"],
                                                         'cid' : response.xdest["@cid"]
                                                     });
                                                 }
                                                 if(response.xservice["@cid"]!=="null"){
                                                     in_xsvc.push({
                                                         'name' : response.xservice["#text"],
                                                         'otype' : response.xservice["@otype"],
                                                         'cid' : response.xservice["@cid"]
                                                     });

                                                 }
                                                 Ext.getCmp("type").setValue(response["@type"]);
                                                 Ext.getCmp("interface").setValue(response.interface);
                                                 Ext.getCmp("memo").setValue(response.desc);

                                                 Ext.data.StoreManager.lookup("store_tmp_src").loadData(in_src);
                                                 Ext.data.StoreManager.lookup("store_tmp_dest").loadData(in_dest);
                                                 Ext.data.StoreManager.lookup("store_tmp_svc").loadData(in_svc);
                                                 Ext.data.StoreManager.lookup("store_tmp_xsrc").loadData(in_xsrc);
                                                 Ext.data.StoreManager.lookup("store_tmp_xdest").loadData(in_xdest);
                                                 Ext.data.StoreManager.lookup("store_tmp_xsvc").loadData(in_xsvc);


                                             }
                                            );





        }else{
             this.setTitle(__zen('spd_add'));

            Ext.getCmp("num").setValue(me.total+1);
            Ext.getCmp("fld_range").setText(" (1 ~ " + (me.total+1) + ")");

            Ext.data.StoreManager.lookup("store_tmp_src").removeAll();
            Ext.data.StoreManager.lookup("store_tmp_dest").removeAll();
            Ext.data.StoreManager.lookup("store_tmp_svc").removeAll();
            Ext.data.StoreManager.lookup("store_tmp_xsrc").removeAll();
            Ext.data.StoreManager.lookup("store_tmp_xdest").removeAll();
            Ext.data.StoreManager.lookup("store_tmp_xsvc").removeAll();



        }


        me.make_inlist('src_init');
    },

    set_fw_nat_ipv4: function(edit, uid) {
        var me = this;




        var __tmptotal = Ext.data.StoreManager.lookup('store_nat_ipv4_list').getTotalCount();

        var obj = new Object();
        var rule = {};


        var ar_src = Ext.getCmp("grid_src").getStore().data.items;
        var ar_dest = Ext.getCmp("grid_dest").getStore().data.items;
        var ar_svc = Ext.getCmp("grid_svc").getStore().data.items;
        var ar_xsrc = Ext.getCmp("grid_xsrc").getStore().data.items;
        var ar_xdest = Ext.getCmp("grid_xdest").getStore().data.items;
        var ar_xsvc = Ext.getCmp("grid_xsvc").getStore().data.items;

        var cnt_src = ar_src.length;
        var cnt_dest = ar_dest.length;
        var cnt_service = ar_svc.length;
        var cnt_xsrc = ar_xsrc.length;
        var cnt_xdest = ar_xdest.length;
        var cnt_xservice = ar_xsvc.length;




        var ntype = Ext.getCmp('type').getValue();

        if(ntype == "SNAT"){
            if(cnt_xsrc===0){	prt_errMsg(__zen('xsrc')+get_msg("err_selnat"),"fld_msg_fw"); return false;		}
        }else if(ntype == "DNAT"){
            if(cnt_dest===0){	prt_errMsg(__zen('dest')+get_msg("err_selnat"),"fld_msg_fw"); return false;		}
            if(cnt_xdest===0){	prt_errMsg(__zen('xdest')+get_msg("err_selnat"),"fld_msg_fw"); return false;		}
        }else if(ntype == "FNAT"){
            if(cnt_src===0){	prt_errMsg(__zen('src')+get_msg("err_selnat"),"fld_msg_fw"); return false;		}
            if(cnt_xsrc===0){	prt_errMsg(__zen('xsrc')+get_msg("err_selnat"),"fld_msg_fw"); return false;		}
            if(cnt_dest===0){	prt_errMsg(__zen('dest')+get_msg("err_selnat"),"fld_msg_fw"); return false;		}
            if(cnt_xdest===0){	prt_errMsg(__zen('xdest')+get_msg("err_selnat"),"fld_msg_fw"); return false;		}

            if(cnt_xservice !==0){
                if(cnt_service===0){
                    prt_errMsg(__zen('service')+get_msg("err_selnat"),"fld_msg_fw"); return false;		}}

        }else if(ntype == "TNAT"){
            if(me.chkTNATStat(cnt_src,cnt_dest,cnt_service,cnt_xsrc,cnt_xdest,cnt_xservice)===false){		prt_errMsg(get_msg("err_tnat"),"fld_msg_fw"); return false;	}
            if(cnt_xsrc === 1 && cnt_xdest===1){	prt_errMsg(get_msg('err_tnat_multi'),"fld_msg_fw"); return false;	}
        }



        var tmp_null = {"@cid" :"null", "@otype" : "Any",  "#text" : "Any"};

        rule["src"] = [];
        rule["dest"] = [];
        rule["service"] = [];
        rule["xsrc"] = [];
        rule["dest"] = [];
        rule["xservice"] = [];

        if(cnt_src === 0){rule["src"].push(tmp_null);}else{
            for(var i=0; i<cnt_src; i++){

                obj = {
                    '@cid' : ar_src[i].data.cid,
                    '@otype' :ar_src[i].data.otype,
                    '#text' : (ar_src[i].data.xname===undefined)?ar_src[i].data.name:ar_src[i].data.xname
                };

                rule["src"].push(obj);
            }
        }

        if(cnt_dest === 0){rule["dest"].push(tmp_null);}else{
            for(var i=0; i<cnt_dest; i++){

                obj = {
                    '@cid' : ar_dest[i].data.cid,
                    '@otype' :ar_dest[i].data.otype,
                    '#text' : (ar_dest[i].data.xname===undefined)?ar_dest[i].data.name:ar_dest[i].data.xname
                };

                rule["dest"].push(obj);
            }
        }


        if(cnt_service === 0){rule["service"].push(tmp_null);}else{
            for(var i=0; i<cnt_service; i++){

                obj = {
                    '@cid' : ar_svc[i].data.cid,
                    '@otype' :ar_svc[i].data.otype,
                    '#text' : (ar_svc[i].data.xname===undefined)?ar_svc[i].data.name:ar_svc[i].data.xname
                };

                rule["service"].push(obj);
            }
        }

        rule["xsrc"] = (cnt_xsrc === 0)?tmp_null:{"@cid" :ar_xsrc[0].data.cid,
                                                  "@otype" : ar_xsrc[0].data.otype,
                                                  "#text" : (ar_xsrc[0].data.xname===undefined)?ar_xsrc[0].data.name:ar_xsrc[0].data.xname};
        rule["xdest"] = (cnt_xdest === 0)?tmp_null:{"@cid" :ar_xdest[0].data.cid,
                                                    "@otype" : ar_xdest[0].data.otype,
                                                    "#text" : (ar_xdest[0].data.xname===undefined)?ar_xdest[0].data.name:ar_xdest[0].data.xname};
        rule["xservice"] = (cnt_xservice === 0)?tmp_null:{"@cid" :ar_xsvc[0].data.cid,
                                                          "@otype" : ar_xsvc[0].data.otype,
                                                          "#text" : (ar_xsvc[0].data.xname===undefined)?ar_xsvc[0].data.name:ar_xsvc[0].data.xname};




        var update	=(me.edit === "edit")?true:false;

        if(update===false){

            var num = parseInt(Ext.getCmp('num').getValue());


            rule["@use"]		= "on";
            rule["@num"]		= (num > (__tmptotal+1))?__tmptotal+1:num;
        }else{
            rule["@uid"]		= parseInt(me.uid);
        }

        rule["@type"]		= ntype;
        rule["interface"]	= (Ext.getCmp('interface').getValue()===null)?"Any":Ext.getCmp('interface').getValue();
        rule["desc"]		= Ext.getCmp('memo').getValue();




        var _params = {
            basename : Ext.encode('firewall_nat_ipv4'),
            obj : Ext.encode(rule),
            id_info : Ext.encode({'fieldname':'@uid'}),
            num_info : Ext.encode({'fieldname':'@num'}),
            update : Ext.encode(update),
            check_duplicate : Ext.encode(true)

        };

        Ext.get('fm_v4nat').mask("loading...");

        request_helper.xmlrpc_call_JsonP('ftuctrl','setPolicy',_params,
                                         function(response){

                                             Ext.get('fm_v4nat').unmask();

                                             if(response.set_uid===0 && response.dup_uid_cnt > 0){


                                                 Ext.MessageBox.confirm(__weguardia,get_msg('conf_dobrule') + response.dup_uid_list,function(btn){
                                                     if(btn === "no"){
                                                         return false;
                                                     }else{
                                                         fn_dupset(false);

                                                     }
                                                 });
                                             }else{
                                                 setalarmmsg(update);
                                             }
                                         }
                                        );



        function fn_dupset(dupmode){


            _params.check_duplicate = Ext.encode(dupmode);

            request_helper.xmlrpc_call_JsonP('ftuctrl','setPolicy',_params,
                                             function(response){

                                                 setalarmmsg(update);
                                             }
                                            );

        }

        function setalarmmsg(update){
            if(update===true){

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
                        yes:__zen('add_plus'),
                        no: __zen('close')
                    },
                    fn: me.setWinState_policy,
                    icon: Ext.window.MessageBox.INFO
                });

            }

            var _store = Ext.data.StoreManager.lookup('store_nat_ipv4_list');
            _store.load({
                callback : function(records, options, success) {

                    var tot = options.getProxy().getReader().rawData.retval.total_config;

                    if(tot !== undefined){

                        Ext.getCmp('disp_fw_total').setValue(tot.total_count + "/" + tot.max_count);
                        Ext.getCmp('disp_fw_onoff').setValue(tot.on + "/" + tot.off);

                    }

                }
            });

        }


    },

    setWinState_policy: function(btn) {
        var me = this;
        if(btn==="no"){
            var win = Ext.WindowManager.getActive();
            if (win) {
                win.close();
            }
        }else{
            Ext.getCmp("fm_v4nat").getForm().reset();
            Ext.ComponentQuery.query('label[cls="errorBox"]').forEach(function(cls){ cls.hide(); });
            var __tmptotal = Ext.data.StoreManager.lookup('store_nat_ipv4_list').getTotalCount();
            Ext.getCmp("num").setValue(__tmptotal+1);
            Ext.getCmp("fld_range").setText(" (1 ~ " + (__tmptotal+1) + ")");

            Ext.data.StoreManager.lookup("store_tmp_src").removeAll();
            Ext.data.StoreManager.lookup("store_tmp_dest").removeAll();
            Ext.data.StoreManager.lookup("store_tmp_svc").removeAll();
            Ext.data.StoreManager.lookup("store_tmp_xsrc").removeAll();
            Ext.data.StoreManager.lookup("store_tmp_xdest").removeAll();
            Ext.data.StoreManager.lookup("store_tmp_xsvc").removeAll();
        }
    },

    chkTNATStat: function(cnt1, cnt2, cnt3, xcnt1, xcnt2, xcnt3) {
        var sel1 = (cnt1===0)?false:true;
                		var sel2 = (cnt2===0)?false:true;
                		var sel3 = (cnt3===0)?false:true;
                		var sel1x = (xcnt1===0)?false:true;
                		var sel2x = (xcnt2===0)?false:true;
                		var sel3x = (xcnt3===0)?false:true;

                		if(sel1 === true && sel2 === true && sel3 === true && sel1x === true && sel2x === true && sel3x === true)	{	return true;	}
                		else if(sel1 === true && sel2 === false && sel3 === false && sel1x === true && sel2x === false && sel3x === false)	{	return true;	}
                		else if(sel1 === true && sel2 === false && sel3 === true && sel1x === true && sel2x === false && sel3x === false)	{	return true;	}
                		else if(sel1 === false && sel2 === true && sel3 === false && sel1x === false && sel2x === true && sel3x === false)	{	return true;	}
                		else if(sel1 === false && sel2 === true && sel3 === true && sel1x === false && sel2x === true && sel3x === false)	{	return true;	}
                		else if(sel1 === true && sel2 === true && sel3 === false && sel1x === true && sel2x === true && sel3x === false)	{	return true;	}
                		else if(sel1 === true && sel2 === true && sel3 === true && sel1x === true && sel2x === true && sel3x === false)	{	return true;	}
                		else if(sel1 === false && sel2 === true && sel3 === true && sel1x === false && sel2x === true && sel3x === true)	{	return true;	}
                		else if(sel1 === true && sel2 === true && sel3 === false && sel1x === true && sel2x === false && sel3x === false)	{	return true;	}
                		else if(sel1 === true && sel2 === true && sel3 === false && sel1x === false && sel2x === true && sel3x === false)	{	return true;	}
                		else if(sel1 === true && sel2 === true && sel3 === true && sel1x === true && sel2x === false && sel3x === false)	{	return true;	}
                		else if(sel1 === true && sel2 === true && sel3 === true && sel1x === false && sel2x === true && sel3x === false)	{	return true;	}
                		else {	return false;	}
    },

    make_inlist: function(mode) {
        var init = false;
        if(mode==="src_init"){
            mode = "src";
            init = true;
        }

        var is_change = Ext.getCmp('chg_setobj_type').checked;


        if(mode==="svc" || mode==="xsvc"){
            Ext.getCmp('grid_setobj').reconfigure("store_svc_obj");
            if(is_change===true){
                Ext.data.StoreManager.lookup('store_svc_obj').getProxy().setExtraParam("object_list",  Ext.encode(["port"]));
            }else{
                Ext.data.StoreManager.lookup('store_svc_obj').getProxy().setExtraParam("object_list",  Ext.encode(["port","service_group"]));
            }

            Ext.data.StoreManager.lookup('store_svc_obj').load();

            Ext.getCmp('b_segment_sub').getComponent(4).setPressed(true);
            Ext.getCmp('b_segment_sub').getComponent(0).hide();
            Ext.getCmp('b_segment_sub').getComponent(1).hide();
            Ext.getCmp('b_segment_sub').getComponent(2).hide();
            Ext.getCmp('b_segment_sub').getComponent(3).hide();
            Ext.getCmp('b_segment_sub').getComponent(4).show();
            Ext.getCmp('b_segment_sub').getComponent(5).show();
            Ext.getCmp('b_segment_sub').getComponent(6).show();

        }else{
            Ext.getCmp('grid_setobj').reconfigure("store_ip_obj");
            if(is_change===true){
                if(mode==="src"){
                    Ext.data.StoreManager.lookup('store_ip_obj').getProxy().setExtraParam("object_list",  Ext.encode(["env","ipv4"]));
                }else{
                    Ext.data.StoreManager.lookup('store_ip_obj').getProxy().setExtraParam("object_list",  Ext.encode(["ipv4"]));
                }

            }else{
                Ext.data.StoreManager.lookup('store_ip_obj').getProxy().setExtraParam("object_list",  Ext.encode(["env","ipv4","ipv4_group"]));
            }
            if(init){
                Ext.data.StoreManager.lookup('store_ip_obj').getProxy().setExtraParam("search_info",  Ext.encode([]));
            }
            Ext.data.StoreManager.lookup('store_ip_obj').load();

            Ext.getCmp('b_segment_sub').getComponent(0).setPressed(true);
            Ext.getCmp('b_segment_sub').getComponent(0).show();
            Ext.getCmp('b_segment_sub').getComponent(1).show();
            Ext.getCmp('b_segment_sub').getComponent(2).show();
            Ext.getCmp('b_segment_sub').getComponent(3).show();
            Ext.getCmp('b_segment_sub').getComponent(4).hide();
            Ext.getCmp('b_segment_sub').getComponent(5).hide();
            Ext.getCmp('b_segment_sub').getComponent(6).hide();
        }


        var target = "";

        if(mode==="svc"){
            target = "store_tmp_svc";
            var data = [{value:'port', text:__zen('service_port'), pid:'win_service_port',store:'store_svc_obj'},
                        {value:'port_group', text:__zen('service_group'), pid:'win_portgroup',store:'store_svc_obj'}];
        }else{
            target = (mode==="src")?"store_tmp_src":"store_tmp_dest";
            var data = [{value:'ipv4', text:__zen('ip_addr'), pid:'win_ipv4',store:'store_ip_obj'},
                        {value:'ipv4_group', text:__zen('ip_group'), pid:'win_ipv4_group',store:'store_ip_obj'}
                       ];
        }


        Ext.getCmp('add_obj_inlist').removeAll();

        for (var i = 0; i < data.length; ++i){

            var items =  new Ext.menu.Item({
                text: data[i].text,
                value:data[i].value,
                pid:data[i].pid,
                store:data[i].store,
                handler: function(items){
                    var win = Ext.create('NFW2.view.'+items.pid,{
                        modal : true,
                        loadmode: items.store,
                        target:target
                    });
                    win.show();
                }
            });

            Ext.getCmp('add_obj_inlist').add(items);
        }
    },

    get_obj_info: function(cid, otype, grid, rowIndex, name, flag) {
                if(otype==="env"){return false;}

        //console.log(name);

        var basename = "";
        var uctrl = "getObject";

        switch(otype){
                case "v4" : basename = "object_ip_address";break;
                case "v4_group" : basename = "object_ip_group"; uctrl = "getObjectMembers";break;
                case "port" : basename = "object_service_port";break;
                case "group" : basename = "object_service_group"; uctrl = "getObjectMembers";break;
                case "country" : basename = "object_country";break;
                case "domain" : basename = "object_domain";break;
        }


        if(otype === "v4_group" || otype === "group"){

             var _params = {
                    basename: Ext.encode(basename),
                   key_info: Ext.encode({'group_cid':cid})
                };
        }else{
             var _params = {
                    basename: Ext.encode(basename),
                    key: Ext.encode({ '@cid': cid })
                };


        }






        		 var grid = Ext.getCmp(grid);
                    var store = grid.getStore();

        if(!flag){

             store.data.items[rowIndex].data["name"] = name;

                    var tmpx = store.data.items[rowIndex];
                    store.removeAt(rowIndex);
                    store.insert(rowIndex,tmpx);

            return false;
        }

        		 var disp = '<ul class="disp_obj">';

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    uctrl,
                    _params,
                    function(response){

                     // console.log(response);


                       disp += name;


                        if(otype === "v4"){

                                                                 for(var j in response.ip){
                                                                     disp += '<li class="inlist_s">'+response.ip[j]["#text"] + '</li>';
                                                                 }

        				}else if(otype === "country" || otype === "domain"){
        /*
                            for(var j in response.list[i].detail){
                            disp += '<li class="inlist_s">'+response.list[i].detail[j] + '</li>';
                            }
        */

                        }else if(otype === "port"){


                                                                 for(var j in response.protocol){
                                                                     disp += '<li class="inlist_s">'+response.protocol[j]["@type"] + '</li>';
                                                                     if(response.protocol[j]["@type"] === "tcp" || response.protocol[j]["@type"]==="udp"){
                                                                         disp += '<li class="inlist_s">'+response.protocol[j].source.start +'~'+ response.protocol[j].source.end+'</li>';
                                                                         disp += '<li class="inlist_s">'+response.protocol[j].dest.start +'~'+ response.protocol[j].dest.end+'</li>';
                                                                     }else{
                                                                         if(response.protocol[j].kind===undefined){continue;}
                                                                         disp += '<li class="inlist_s">'+response.protocol[j].kind + '</li>';
                                                                     }
                                                                 }


                        }else if(otype == "v4_group"){

                                                                 for(var j in response.list){
                                                                     disp += '<li class="inlist">'+response.list[j].name + '</li>';
                                                                     for(var k in response.list[j].detail){
                                                                         disp += '<li class="inlist_s">'+response.list[j].detail[k]["#text"] + '</li>';
                                                                     }
                                                                 }

                                                             }else if(otype == "group"){


                                                                 for(var j in response.list){
                                                                     disp += '<li class="inlist">'+response.list[j].name + '</li>';
                                                                     for(var k in response.list[j].detail){
                                                                         disp += '<li class="inlist_s">'+response.list[j].detail[k]["@type"] + '</li>';
                                                                         if(response.list[j].detail[k]["@type"] === "tcp" || response.list[j].detail[k]["@type"]==="udp"){
                                                                             disp += '<li class="inlist_s">'+response.list[j].detail[k].source.start +'~'+ response.list[j].detail[k].source.end+'</li>';
                                                                             disp += '<li class="inlist_s">'+response.list[j].detail[k].dest.start +'~'+ response.list[j].detail[k].dest.end+'</li>';
                                                                         }else{
                                                                             disp += '<li class="inlist_s">'+response.list[j].detail[k].kind + '</li>';
                                                                         }

                                                                     }
                                                                 }

                                                             }

        				store.data.items[rowIndex].data["name"] = disp + '</ul>';
                        store.data.items[rowIndex].data["xname"] = name;


        				var tmpx = store.data.items[rowIndex];


                                                         store.removeAt(rowIndex);
                                                         store.insert(rowIndex,tmpx);
                    }
                );
    }

});