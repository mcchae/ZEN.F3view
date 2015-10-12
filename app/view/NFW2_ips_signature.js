
Ext.define('NFW2.view.NFW2_ips_signature', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_ips_signature',

    requires: [
        'NFW2.view.NFW2_ips_signatureViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.form.FieldSet',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.column.Number',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Paging',
        'Ext.form.Label'
    ],

    viewModel: {
        type: 'nfw2_ips_signature'
    },
    cls: 'zen_body',
    id: 'NFW2_ips_signature',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        beforerender: 'onNFW2_ips_signatureBeforeRender',
        afterrender: 'onNFW2_ips_signatureAfterRender'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        flex: 1,
                        border: false,
                        id: 'fm_list',
                        titleCollapse: true,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'container',
                                id: 'topArea',
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
                                                xtype: 'combobox',
                                                hidden: true,
                                                id: 'group_list',
                                                margin: '0 5 0 0',
                                                width: 200,
                                                hideLabel: true,
                                                labelSeparator: ' ',
                                                editable: false,
                                                displayField: 'totalcnt',
                                                queryMode: 'local',
                                                store: 'store_ips_group',
                                                valueField: '@id',
                                                multiSelect: true,
                                                listeners: {
                                                    select: 'onGroup_listSelect'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                id: 'btn_user_group_list',
                                                bind: {
                                                    text: '{manage_user_group}'
                                                },
                                                listeners: {
                                                    click: 'onBtn_user_group_listClick'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                id: 'btn_all_edit',
                                                bind: {
                                                    text: '{edit2}'
                                                },
                                                listeners: {
                                                    click: 'onBtn_all_editClick'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                id: 'btn_add_user',
                                                iconCls: 'ic_add',
                                                bind: {
                                                    text: '{add_user_define}'
                                                },
                                                listeners: {
                                                    click: 'onBtn_add_userClick'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                componentCls: 'btn_auth',
                                                id: 'btn_copy',
                                                bind: {
                                                    text: '{copy_signature}'
                                                },
                                                listeners: {
                                                    click: 'onBtn_copyClick'
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
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                id: 'ips_check_fieldset',
                                margin: '8 0 0 0',
                                scrollable: {
                                    x: true,
                                    y: false
                                },
                                title: ' ',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'container',
                                        height: 50,
                                        html: '<div id="signature_search"></div>',
                                        id: 'ips_checkgroup',
                                        scrollable: true,
                                        layout: {
                                            type: 'vbox',
                                            align: 'stretch'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                flex: 1,
                                layout: 'fit',
                                items: [
                                    {
                                        xtype: 'gridpanel',
                                        id: 'ips_signature_list',
                                        margin: '5 0 0 0',
                                        scrollable: false,
                                        header: false,
                                        title: 'My Grid Panel',
                                        forceFit: true,
                                        store: 'store_ips_signature_list',
                                        columns: [
                                            {
                                                xtype: 'rownumberer',
                                                width: 60,
                                                align: 'center',
                                                dataIndex: 'string',
                                                text: 'N'
                                            },
                                            {
                                                xtype: 'numbercolumn',
                                                items: {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    id: 'search_fsid',
                                                    margin: '16 1 0 -9',
                                                    enableKeyEvents: true,
                                                    maxHeight: 24,
                                                    listeners: {
                                                        
                                                    }
                                                },
                                                style: 'padding-top:13;',
                                                width: 100,
                                                align: 'center',
                                                dataIndex: '@fsid',
                                                format: '0',
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
                                                    var me = Ext.getCmp('NFW2_ips_signature');
                                                    var _store = Ext.data.StoreManager.lookup('store_ips_group');

                                                    var cnt = me.group_records.length;

                                                    for(var i=0; i<=cnt; i++){
                                                        if(value === me.group_records[i].id){

                                                            var str = me.group_records[i].group_name;

                                                            return (record.data['@fsid'] >= 9000000)? '<div style="float:left">' + str + '(사용자 정의)</div>': '<div style="float:left">' + str + '</div>';

                                                        }
                                                    }
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
                                                    store: 'store_ips_group_add',
                                                    emptyText: 'select'
                                                },
                                                minWidth: 100,
                                                style: 'padding-top:13;',
                                                sortable: false,
                                                align: 'center',
                                                dataIndex: 'group_id',
                                                lockable: false,
                                                flex: 0.07,
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
                                                flex: 0.12,
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
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    // var d_data = (record.data['direction'] === '->')? '<img src="../images/arrow_01.png">' : '<img src="../images/arrow_02.png">';
                                                    // var protocol;
                                                    // var src_addr;
                                                    // var src_port;
                                                    // var dst_addr;
                                                    // var dst_port;
                                                    // var src_width;
                                                    // var src_pwidth;
                                                    // var dst_width;
                                                    // var dst_pwidth;
                                                    // if(record.data['protocol'] === "tcp" || record.data['protocol'] === "TCP"){ protocol = "TCP"; }
                                                    // else if(record.data['protocol'] === "udp" || record.data['protocol'] === "UDP"){ protocol = "UDP"; }
                                                    // else if(record.data['protocol'] === "ip" || record.data['protocol'] === "IP"){ protocol = "IP"; }
                                                    // else if(record.data['protocol'] === "icmp" || record.data['protocol'] === "ICMP"){ protocol = "ICMP"; }

                                                    // if(record.data['src_addr'] === "any" || record.data['src_addr'] === "Any"){ src_addr = "Any"; }
                                                    // else{ src_addr = record.data['src_addr']; }
                                                    // if(record.data['src_port'] === "any" || record.data['src_port'] === "Any"){ src_port = "Any"; }
                                                    // else{ src_port = record.data['src_port']; }
                                                    // if(record.data['dest_addr'] === "any" || record.data['dest_addr'] === "Any"){ dst_addr = "Any"; }
                                                    // else{ dst_addr = record.data['dest_addr']; }
                                                    // if(record.data['dest_port'] === "any" || record.data['dest_port'] === "Any"){ dst_port = "Any"; }
                                                    // else{ dst_port = record.data['dest_port']; }

                                                    // var init_table = '<table align="center"><tr>';
                                                    //     init_table += '<td style="min-width:50px;font-size:13px">' + protocol + '</td>';
                                                    //     init_table += '<td style="min-width:115px;font-size:13px">' + src_addr + '</td>';
                                                    //     init_table += '<td style="min-width:115px;font-size:13px">' + src_port + '</td>';
                                                    //     init_table += '<td style="min-width:40px;font-size:13px">' + d_data + '</td>';
                                                    //     init_table += '<td style="min-width:115px;font-size:13px">' + dst_addr + '</td>';
                                                    //     init_table += '<td style="min-width:115px;font-size:13px">' + dst_port + '</td>';
                                                    //     init_table += '</tr></table>';

                                                    // return init_table;
                                                },
                                                draggable: false,
                                                minWidth: 150,
                                                align: 'center',
                                                flex: 0.35,
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
                                                            emptyText: 'select'
                                                        },
                                                        width: 65,
                                                        align: 'center',
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
                                                            setTipFocus(Ext.getCmp('NFW2_ips_signature'), component);
                                                            },
                                                                blur: function(component, event, eOpts){
                                                            setTipBlur(Ext.getCmp('NFW2_ips_signature'), component);
                                                            }
                                                            }
                                                        },
                                                        width: 105,
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
                                                            setTipFocus(Ext.getCmp('NFW2_ips_signature'), component);
                                                            },
                                                                blur: function(component, event, eOpts){
                                                            setTipBlur(Ext.getCmp('NFW2_ips_signature'), component);
                                                            }
                                                            }
                                                        },
                                                        width: 80,
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
                                                            emptyText: 'seclect'
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
                                                            setTipFocus(Ext.getCmp('NFW2_ips_signature'), component);
                                                            },
                                                                blur: function(component, event, eOpts){
                                                            setTipBlur(Ext.getCmp('NFW2_ips_signature'), component);
                                                            }
                                                            }
                                                        },
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
                                                            setTipFocus(Ext.getCmp('NFW2_ips_signature'), component);
                                                            },
                                                                blur: function(component, event, eOpts){
                                                            setTipBlur(Ext.getCmp('NFW2_ips_signature'), component);
                                                            }
                                                            }
                                                        },
                                                        width: 80,
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
                                                    if(value === "high" || value === "critical" || value === "normal" || value === "low"){
                                                        return disp = (value !== '')? '<img src="../images/level_'+ value +'.png" height="16" border="0"/>':'';
                                                    }
                                                    else{
                                                        return '<img src="../images/level_low.png" height="16" border="0"/>';
                                                    }
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
                                                    emptyText: 'select'
                                                },
                                                style: 'padding-top:13;',
                                                width: 70,
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
                                                draggable: false,
                                                width: 130,
                                                align: 'center',
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
                                                        width: 80,
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
                                                draggable: false,
                                                width: 130,
                                                align: 'center',
                                                bind: {
                                                    text: '{deby_info}'
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
                                                        width: 80,
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
                                                            switch(record.data['block_type']){

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
                                                            emptyText: 'seclect'
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
                                                    return (record.data['action'] === 'alert')? __zen("detect"):__zen("deny");
                                                },
                                                items: {
                                                    xtype: 'combobox',
                                                    flex: 1,
                                                    id: 'search_action',
                                                    margin: '16 1 0 -9',
                                                    editable: false,
                                                    displayField: 'text',
                                                    maxHeight: 24,
                                                    valueField: 'value',
                                                    queryMode: 'local',
                                                    store: 'store_action',
                                                    emptyText: 'select'
                                                },
                                                style: 'padding-top:13;',
                                                width: 70,
                                                align: 'center',
                                                dataIndex: 'action',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{action}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if(record.raw['@fsid'] < 9000000){ return '<img class="over_mouse" src="../images/b_layer_help.gif" border="0"/>'; }
                                                    else{ return '<img class="over_mouse" src="../images/b_help.png" border="0"/>'; }
                                                },
                                                items: {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            cls: 'btn_b',
                                                            iconCls: 'icb_ser',
                                                            flex: 1,
                                                            margin: '18 1 0 1',
                                                            listeners: {
                                                                click: function(){
                                                            var me = Ext.getCmp('NFW2_ips_signature');
                                                            Ext.getCmp('tbl_chk').setText("0 "+ __zen('check_count'));
                                                            me.filter_flag = 1;
                                                            me.filter_func();
                                                            }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            cls: 'btn_b',
                                                            iconCls: 'icb_reset',
                                                            flex: 1,
                                                            margin: '18 1 0 5',
                                                            listeners: {
                                                                click: function(){
                                                            var me = Ext.getCmp('NFW2_ips_signature');
                                                            Ext.getCmp('ips_check_fieldset').legend.items.items[1].setValue(true);
                                                            Ext.getCmp('tbl_chk').setText("0 "+ __zen('check_count'));
                                                            me.filter_flag = 0;
                                                            me.btn_click();
                                                            }
                                                            }
                                                        }
                                                    ]
                                                },
                                                style: 'padding-top:13;',
                                                width: 60,
                                                align: 'center',
                                                bind: {
                                                    text: '{desc}'
                                                }
                                            }
                                        ],
                                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                                            selType: 'checkboxmodel',
                                            mode: 'SIMPLE',
                                            listeners: {
                                                selectionchange: 'onCheckboxModelSelectionChange',
                                                select: 'onCheckboxModelSelect',
                                                beforeselect: 'onCheckboxModelSelect1',
                                                deselect: 'onCheckboxModelDeselect',
                                                beforedeselect: 'onCheckboxModelBeforeDeselect'
                                            }
                                        }),
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

                                                    // Ext.suspendLayouts();
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
                                                    // Ext.resumeLayouts(true);

                                                    if (!me.calledInternal) {
                                                        var main = Ext.getCmp('NFW2_ips_signature');

                                                        var grid = Ext.getCmp('ips_signature_list').getStore();
                                                        var _store = Ext.data.StoreManager.lookup('store_ips_signature_list');

                                                        for(var k=0; k<grid.data.items.length; k++){
                                                            for(var i in main.tbl_fsid){
                                                                if(main.tbl_fsid[i]['@fsid'] === grid.data.items[k].data['@fsid']){
                                                                    Ext.getCmp('ips_signature_list').getSelectionModel().select(k, true);
                                                                }
                                                            }
                                                        }
                                                        //     Ext.getCmp('ips_signature_list').setHeight((count*28.03)+130);
                                                        me.fireEvent('change', me, pageData || me.emptyPageData);
                                                    }
                                                },
                                                dock: 'bottom',
                                                id: 'page_toolbar1',
                                                width: 360,
                                                displayInfo: true,
                                                store: 'store_ips_signature_list',
                                                items: [
                                                    {
                                                        xtype: 'label',
                                                        id: 'tbl_chk'
                                                    }
                                                ],
                                                listeners: {
                                                    render: 'onPagingtoolbarRender',
                                                    beforechange: 'onPage_toolbar1BeforeChange',
                                                    change: 'onPage_toolbar1Change'
                                                }
                                            }
                                        ],
                                        listeners: {
                                            celldblclick: 'onIps_signature_listCellDblClick',
                                            beforecellclick: 'onIps_signature_listBeforeCellClick',
                                            cellclick: 'onIps_signature_listCellClick'
                                        }
                                    }
                                ]
                            }
                        ],
                        listeners: {
                            afterrender: 'onFrm_listAfterRender'
                        }
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    onGroup_listSelect: function(combo, record, eOpts) {
        var _store = Ext.data.StoreManager.lookup('store_ips_signature_list');
        var _selectList = [];
        var chk_total = false;
        var me = this;

        if(record.length === 1){
            Ext.getCmp('group_list').clearValue();
            Ext.getCmp('group_list').setValue(_store.data.totalcnt);

            _store.getProxy().setExtraParam('cond',Ext.encode({}));
        }
        else{
            var record_total = [];
            for(var i=0; i <record.length; i++){
                if(record[i].data.id === 0){
                    Ext.getCmp('group_list').clearValue();
                    Ext.getCmp('group_list').setValue(record[0].data.totalcnt);

                    _store.getProxy().setExtraParam('cond',Ext.encode({}));
                    chk_total = true;

                }else{
                    _selectList.push({'group_id':record[i].data.id});

                    var _cond = {"$or":_selectList};

                    _store.getProxy().setExtraParam('cond',Ext.encode(_cond));

                }
            }
        }

        me.btn_click();
        // if(!chk_total){
        //     Ext.getCmp('group_list').clearValue();
        //     Ext.getCmp('group_list').setValue(["DoS/DDOS (121)", "웹 (555)"]);
        // }
        // else{chk_total = false;}
        _store.currentPage = 1;
        _store.load();

        //console.log(_cond);
    },

    onBtn_user_group_listClick: function(button, e, eOpts) {
        // 사용자 정의 그룹 관리
        /*var _store = Ext.data.StoreManager.lookup('store_ips_user_group');
        _store.load();*/
        var store_cnt;
        showLoadMask();
        var _params = {
            basename : Ext.encode('ips_group')
        };

        request_helper.xmlrpc_call_JsonP(

            'ftuctrl',
            'getIPSGroup',
            _params,

            function(response){
                hideLoadMask();
                var records = [];
                for(var i = 8;i<response.list.length;i++){
                    records.push({
                        "@id" : response.list[i]['@id'],
                        "group_name" : response.list[i].group_name
                    });
                }

                var _store = Ext.data.StoreManager.lookup('store_ips_user_group');
                _store.loadData(records);
                store_cnt = records.length;
                var win = Ext.create('NFW2.view.win_ips_user_group',{
                    modal : true,
                    store_cnt : store_cnt
                });

                win.show();
            }
        );



    },

    onBtn_all_editClick: function(button, e, eOpts) {
        var me = this;

        var tbl = Ext.getCmp("ips_signature_list");
        var tbl_sel = tbl.getSelectionModel().getSelection();
        var splice_chk = 0;
        var _store = Ext.data.StoreManager.lookup('store_ips_signature_list');

        if(_store.totalCount > me.page_num*100){
            for(var i = 0;i<100;i++){
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
                me.tbl_fsid.push({
                    '@fsid' : tbl_sel[j].data['@fsid'],
                    'group_id' : tbl_sel[j].data['group_id'],
                    'audit' : tbl_sel[j].data['audit'],
                    'use' : tbl_sel[j].data['use']
                });
            }
        }

        var win = Ext.create('NFW2.view.win_ips_all_edit',{
            tbl : me.tbl_fsid,
            modal : true
        });

        win.show();
    },

    onBtn_add_userClick: function(button, e, eOpts) {
        var me = this;

        showLoadMask();
        var _params = {

            filename: Ext.encode('/proc/ferret/datasheet/ips_signature_num')
        };

        request_helper.xmlrpc_call_JsonP(

            'ftuctrl',
            'getFileContent',
            _params,

            function(response){
                hideLoadMask();
                var cnt = Ext.data.StoreManager.lookup('store_ips_signature_list').getTotalCount();

                var Maxcnt = (cnt >= response[0])? false:true;

                //console.log(response[0] +', '+ cnt +', '+ Maxcnt);

                if(Maxcnt === false){

                    Ext.Msg.alert("",ValidMaxCnt(response[0]));
                    return false;

                }else{
                    var win = Ext.create('NFW2.view.win_ips_signature_user',{
                        searcher : me.searcher,
                        modal : true
                    });

                    win.show();
                }

            }
        );
    },

    onBtn_copyClick: function(button, e, eOpts) {
        var me = this;

        var tbl = Ext.getCmp("ips_signature_list");
        var tbl_sel = tbl.getSelectionModel().getSelection();

        var _store = Ext.data.StoreManager.lookup('store_ips_signature_list');

        if(tbl_sel.length === 0){

            Ext.Msg.alert("",get_msg("sel_copy"));
            return false;

        }else{
            for(var i in tbl_sel){
                if(tbl_sel[i].data['@fsid'] < 9000000){
                    Ext.Msg.show({
                        title: '',
                        msg: get_msg("err_signcopy"),
                        width: 350,
                        buttons: Ext.Msg.OK
                    });
                    return false;
                }
            }

            Ext.MessageBox.confirm("",get_msg("conf_copy"),function(btn){
                if(btn === "yes"){
                    var _store = Ext.data.StoreManager.lookup('store_ips_signature_list');
                    //             _store.getProxy().setExtraParam('cond',Ext.encode({}));

                    var records = [];

                    for(var j in tbl_sel){
                        records.push(tbl_sel[j].data);
                    }

                    var _params = {
                        basename : Ext.encode('signature_list'),
                        obj : Ext.encode(records)
                    };
                    showLoadMask();
                    request_helper.xmlrpc_call_JsonP(

                        'ftuctrl',
                        'copySignatureList',
                        _params,

                        function(response){
                            hideLoadMask();
                            Ext.getCmp('tab_con1').destroy();
                            Ext.getCmp('tab_con2').destroy();
                            Ext.getCmp('NFW2_ips_signature').make_group_filter();

                            Ext.getCmp('tbl_chk').setText("0 "+ __zen('check_count'));
                            _store.load();
                            me.init_ips_group();
                        }
                    );
                }
            });
        }
    },

    onBtn_delClick: function(button, e, eOpts) {
        var me = this;

        var tbl = Ext.getCmp("ips_signature_list");
        var tbl_sel = tbl.getSelectionModel().getSelection();

        if(tbl_sel.length === 0){
            Ext.Msg.alert("",get_msg("sel_del"));
            return false;
        }else{

            Ext.MessageBox.confirm("",get_msg("conf_del"),function(btn){

                if(btn === "yes"){

                    var _delList = [];

                    for(var i=0; i<tbl_sel.length; i++){

                        _delList.push(tbl_sel[i].data['@fsid']);
                    }

                    showLoadMask();
                    var _params = {

                        basename : Ext.encode('signature_list'),
                        ids : Ext.encode(_delList)
                    };

                    request_helper.xmlrpc_call_JsonP(

                        'ftuctrl',
                        'delListTypeObj',
                        _params,

                        function(response){

                            hideLoadMask();
                            var store = Ext.data.StoreManager.lookup('store_ips_signature_list');

                            if(response.fail_total > 0){
                                var ar_use = [];
                                for(var i in response.fail_list){
                                    if(response.fail_list[i].reason === "in_use"){
                                        for(var j in store.data.items){
                                            if(store.data.items[j].data['@fsid'] === response.fail_list[i]['@fsid']){ar_use.push(store.data.items[j].data.signature_name);}
                                        }
                                    }
                                    else if(response.fail_list[i].reason === "basic_group"){
                                        //Ext.Msg.alert("",get_msg('err_signaturedel'));
                                        Ext.Msg.show({
                                            msg: get_msg("err_signaturedel"),
                                            width: 350,
                                            buttons: Ext.Msg.OK,
                                            icon: Ext.window.MessageBox.INFO
                                        });
                                        return false;
                                    }
                                }
                                var in_use = ar_use.join(" </br> ");
                                //Ext.Msg.alert("",get_msg('err_objdel')+in_use);
                                Ext.Msg.show({
                                    msg: get_msg('err_prodel')+in_use,
                                    width: 350,
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.window.MessageBox.INFO
                                });
                            }
                            Ext.getCmp('tbl_chk').setText("0 "+ __zen('check_count'));
                            Ext.getCmp('tab_con1').destroy();
                            Ext.getCmp('tab_con2').destroy();
                            Ext.getCmp('NFW2_ips_signature').make_group_filter();
                            store.currentPage = me.page;
                            store.load();
                            me.init_ips_group();
                        }
                    );

                }
            });

        }
    },

    onCheckboxModelSelectionChange: function(model, selected, eOpts) {
        var me = this;
        var total = 0;
        Ext.suspendLayouts();
        for(var i = 1;i <= me.page;i++){
            if(me.page_num === i){ me.sel[i-1] = selected.length; }
        }

        for(var j in me.sel){
            total = total + me.sel[j];
        }

        Ext.getCmp('tbl_chk').setText(total +" "+ __zen('check_count'));
        Ext.resumeLayouts();
    },

    onCheckboxModelSelect: function(rowmodel, record, index, eOpts) {
        var me = this;
        me.tbl_fsid.push(record.data['@fsid']);
    },

    onCheckboxModelSelect1: function(rowmodel, record, index, eOpts) {
        var me = this;
        if(me.cell_index === 17){  me.cell_index = 0; return false; }
    },

    onCheckboxModelDeselect: function(rowmodel, record, index, eOpts) {
        var me = this;

        for(var i in me.tbl_fsid){
            if(me.tbl_fsid[i] === record.data['@fsid'] ){ me.tbl_fsid.splice(i,1); }
        }
    },

    onCheckboxModelBeforeDeselect: function(rowmodel, record, index, eOpts) {
        var me = this;
        if(me.cell_index === 17){  me.cell_index = 0; return false; }
    },

    onPagingtoolbarRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            var me = Ext.getCmp('NFW2_ips_signature');
            me.flag = 1;
            var tbl = Ext.getCmp("ips_signature_list");
            var tbl_sel = tbl.getSelectionModel().getSelection();
            var splice_chk = 0;
            var _store = Ext.data.StoreManager.lookup('store_ips_signature_list');

            if(_store.totalCount > me.page_num*100){
                for(var i = 0;i<_store.getCount();i++){
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
                    me.tbl_fsid.push({
                        '@fsid' : tbl_sel[j].data['@fsid'],
                        'group_id' : tbl_sel[j].data['group_id'],
                        'audit' : tbl_sel[j].data['audit'],
                        'use' : tbl_sel[j].data['use']
                    });
                }
            }

            me.page_num = Ext.getCmp('page_toolbar1').store.currentPage;

        }, component);
    },

    onPage_toolbar1BeforeChange: function(pagingtoolbar, page, eOpts) {
        pagingtoolbar.getStore().getProxy().setExtraParam('start',Ext.encode((page*100)-100));
    },

    onPage_toolbar1Change: function(pagingtoolbar, pageData, eOpts) {
        var me = this;

        me.now_page = pageData.currentPage;
    },

    onIps_signature_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;
        var rec = tableview.getStore().getAt(rowIndex);

        if(cellIndex !== 17 && cellIndex !== 0){
            var win = Ext.create('NFW2.view.win_ips_signature_user',{
                searcher : me.searcher,
                edit : "edit",
                fsid : rec.get("@fsid"),
                obj_id : rec.get("_id"),
                modal : true
            });

            if(rec.get("@fsid") > 9000000){ win.show(); }
            else{
                Ext.Msg.show({
                    title: __weguardia,
                    msg: get_msg("err_signedit"),
                    width: 300,
                    buttons: Ext.Msg.OK,
                    icon: Ext.window.MessageBox.INFO
                });
            }
        }
    },

    onIps_signature_listBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = Ext.getCmp('NFW2_ips_signature');
        me.cell_index = cellIndex;
    },

    onIps_signature_listCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = Ext.getCmp('NFW2_ips_signature');
        // var rec = tableview.getStore().getAt(rowIndex);

        if(cellIndex === 17){
            if(record.data['@fsid'] >= 9000000){
                Ext.Msg.alert("",get_msg("err_signinfo"));
                return false;
            }
            else{
                var fsid_num = parseInt(record.data['@fsid']/1000000, 10);

                var _params = {
                    filename: Ext.encode('/ferret/ips/info/0'+fsid_num+'/0'+record.data['@fsid']+'_kr.txt')
                };

                Ext.data.JsonP.request({
                    url : "/api/ftuctrl/getFileContent",
                    params : _params,
                    success : function(response){
                        if(!response.retcode){
                            var _params = {
                                filename: Ext.encode('/ferret/ips/info/0'+fsid_num+'/0'+record.data['@fsid']+'_kr.TXT')
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
        }
    },

    onFrm_listAfterRender: function(component, eOpts) {
        var me = this;
        me.searcher = false;
        me.tbl_fsid = [];
        me.sel = [];
        me.page_num = 1;
        me.now_page = 1;
        me.filters = [];
        this.fieldInfo = makeZenTip();

        Ext.getCmp('tbl_chk').setText('0 '+__zen('check_count'));
    },

    onNFW2_ips_signatureBeforeRender: function(component, eOpts) {
        // Ext.define('Ext.overrides.form.field.ComboBox', {
        //     override: 'Ext.form.field.ComboBox',

        //     checkChangeEvents : Ext.isIE ?
        //     ['change', 'propertychange', 'keyup'] : ['change', 'input', 'textInput', 'keyup', 'dragdrop']
        // });

        var me = this;
        Ext.getCmp('page_toolbar1').items.items[4].editable = false;
        this.init_ips_group();

    },

    onNFW2_ips_signatureAfterRender: function(component, eOpts) {
        var me = this;
        me.chk_cnt = 0;
        me.cell_index = 0;
        me.flag = 0;
        me.filter_flag = 0;

        var _store = Ext.data.StoreManager.lookup('store_ips_group');
        _store.getProxy().setExtraParam('start_group_id',Ext.encode(0));
        // _store.load(
        //     function(response){
        me.chk_cnt = _store.getCount();
        me.make_group_filter();
        //     }
        // );
        me.fir_set = true;
    },

    init_ips_group: function() {
        var me = Ext.getCmp('NFW2_ips_signature');

        var _store2 = Ext.data.StoreManager.lookup('store_ips_signature_list');
        // _store2.getProxy().setExtraParam('cond',Ext.encode({}));
        _store2.pageSize = parseInt("100",10);
        showLoadMask();
        // 전체 그룹 리스트
        var _store = Ext.data.StoreManager.lookup('store_ips_group');
        var _store3 = Ext.data.StoreManager.lookup('store_ips_group_add');
        _store.load(
            function(response){
                me.chk_cnt = _store.getCount();
                if(response.retval !== null){
                    var total = 0;
                    for(var i=0; i<response.length; i++){
                        total = total+response[i].raw.count;
                    }
                    var records = [
                        {
                            id : 0,
                            group_name : __zen('all'),
                            totalcnt : __zen('all')+' (' + total + ')'
                        }
                    ];
                    var records2 = [];

                    for(var i=0; i<response.length; i++){

                        records.push({

                            id : response[i].data['@id'],
                            group_name : response[i].data.group_name,
                            totalcnt : response[i].data.group_name +' ('+ response[i].raw.count +')'
                        });
                        records2.push({

                            id : response[i].data['@id'],
                            group_name : response[i].data.group_name,
                            totalcnt : response[i].data.group_name +' ('+ response[i].raw.count +')'
                        });
                    }
                    _store3.loadData(records2);
                    _store.loadData(records);
                    me.group_records = records;
                    Ext.getCmp('group_list').setValue(__zen('all') +' (' + total + ')');

                    _store2.getProxy().setExtraParam('cond',Ext.encode());
                    if(_store2.currentPage === 1){ _store2.currentPage = 1; }
                    else{ _store2.currentPage = me.now_page; }
                    //             _store2.load(function(response){
                    //                 Ext.getCmp('signature_grid_view').setHeight(response.length*27.28);
                    //                                 me.totalcount = _store2.totalCount;
                    //                                 me.page = parseInt(_store2.totalCount/100,10)+1;
                    //             });
                }
                _store2.getProxy().setExtraParam('cond',Ext.encode());
                if(_store2.currentPage === 0){
                    _store2.getProxy().setExtraParam('start',Ext.encode(0));
                }
                else{
                    _store2.getProxy().setExtraParam('start',Ext.encode((_store2.currentPage*100)-100));
                }

                _store2.load(function(response){
                    //             Ext.getCmp('ips_signature_list').setHeight((response.length*28.03)+127);
                    me.page = parseInt(_store2.totalCount/100,10)+1;
                    hideLoadMask();
                    setTimeout(function(){ me.setWidth('100%'); },100);
                });
            }
        );

    },

    filter_func: function() {
        var me = Ext.getCmp('NFW2_ips_signature');
        me.filters = {};
        var _cond = [];
        var store = Ext.data.StoreManager.lookup('store_ips_signature_list');
        // store.clearFilter();
        var profile = [];
        var filter_inchk = false;
        var _selectList = [];
        var _store = Ext.data.StoreManager.lookup('store_ips_group');
        var cnt = _store.getCount();

        if(Ext.getCmp('search_profile').valueCollection.length !== 0){
            for(var l = 0;l < cnt;l++){
                if(Ext.getCmp('c_'+l)){
                    if(Ext.getCmp('c_'+l).getValue()){
                        _selectList.push({'group_id':Ext.getCmp('c_'+l).inputValue});
                    }
                }
            }

            for(var m in _selectList){
                if(_selectList[m].group_id === Ext.getCmp('search_profile').valueCollection.items[0].id){
                    var _selectList = [];
                    _selectList.push({'group_id':Ext.getCmp('search_profile').valueCollection.items[0].id});
                    me.filters['$or'] = _selectList;
                    filter_inchk = true;
                    break;
                }
                else{
                    filter_inchk = false;
                }
            }
        }
        else{
            for(var l = 0;l < cnt;l++){
                if(Ext.getCmp('c_'+l)){
                    if(Ext.getCmp('c_'+l).getValue()){
                        _selectList.push({'group_id':Ext.getCmp('c_'+l).inputValue});
                    }
                }
            }
            me.filters['$or'] = _selectList;
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

        if(Ext.getCmp('search_fsid').getValue() !== ''){ me.filters['@fsid'] = Number(fsid); filter_inchk = true; }
        if(Ext.getCmp('search_name').getValue() !== ''){ me.filters['signature_name'] =  {'$regex':'.*'+name+'.*','$options':'-i'}; filter_inchk = true; }
        if(Ext.getCmp('search_protocol').getValue() !== null){ me.filters['protocol'] = {'$regex':protocol.toLowerCase(),'$options':'-i'}; filter_inchk = true; }
        if(Ext.getCmp('search_src').getValue() !== ''){ me.filters['src_addr'] =  src_ip.toLowerCase(); filter_inchk = true; }
        if(Ext.getCmp('search_srcport').getValue() !== ''){ me.filters['src_port'] = String(src_port).toLowerCase(); filter_inchk = true; }
        if(Ext.getCmp('search_dst').getValue() !== ''){ me.filters['dest_addr'] = dst_ip.toLowerCase(); filter_inchk = true; }
        if(Ext.getCmp('search_dstport').getValue() !== ''){ me.filters['dest_port'] = String(dst_port).toLowerCase(); filter_inchk = true; }
        if(Ext.getCmp('search_hazard').getValue() !== null){ me.filters['hazard'] = hazard; filter_inchk = true; }
        if(Ext.getCmp('search_dt_time').getValue() !== ''){ me.filters['detection_time'] = Number(dt_time); filter_inchk = true; }
        if(Ext.getCmp('search_dt_num').getValue() !== ''){ me.filters['detection_num'] = Number(dt_num); filter_inchk = true; }
        if(Ext.getCmp('search_bl_time').getValue() !== ''){ me.filters['block_time'] = Number(bl_time); filter_inchk = true; }
        if(Ext.getCmp('search_bl_type').getValue() !== null){ me.filters['block_type'] = bl_type; filter_inchk = true; }
        if(Ext.getCmp('search_action').getValue() !== null){ me.filters['action'] = action; filter_inchk = true; }
        if(Ext.getCmp('search_direction').getValue() !== null){ me.filters['direction'] = direction; filter_inchk = true; }

        // me.searcher = true;
        store.getProxy().setExtraParam('group_id_list',Ext.encode(profile));
        if(filter_inchk === true){
            store.getProxy().setExtraParam('cond',Ext.encode(me.filters));
        }
        else{ store.getProxy().setExtraParam('cond',Ext.encode([])); }
        store.currentPage = 1;
        showLoadMask();
        store.load(function(response){
            hideLoadMask();
        });

        // if(store.getCount() === 0){ Ext.getCmp('page_toolbar1').moveNext(); }
        // Ext.getCmp('page_toolbar1').moveFirst();
    },

    btn_click: function() {
        var me = this;

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
        Ext.data.StoreManager.lookup('store_ips_signature_list').clearFilter();
        me.searcher = false;
        var _store = Ext.data.StoreManager.lookup('store_ips_signature_list');
        _store.getProxy().setExtraParam('group_id_list',Ext.encode([]));
        _store.currentPage = 1;
        //_store.load();
        var main = Ext.getCmp('NFW2_ips_signature');
        main.tbl_fsid = [];
        //main.me.sel = [0];
        _store.getProxy().setExtraParam('start',Ext.encode(0));

        me.init_ips_group();
    },

    make_group_filter: function() {
        var me = this;
        var response = [];

        var _store = Ext.data.StoreManager.lookup('store_ips_group');
        _store.getProxy().setExtraParam('start_group_id',Ext.encode(0));
        _store.load(
            function(response){
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

                var _store2 = Ext.data.StoreManager.lookup('store_ips_group_add');
                var groupChk = Ext.create('Ext.form.field.Checkbox', {
                    id : 'c_total',
                    style:'margin-top:2px;margin-left:-3px',
                    value : true,
                    inputValue : 0,
                    listeners: {
                        change: function(field, newValue, oldValue, eOpts){
                            var chk_num = 0;
                            if(newValue){
                                for(var i in _store2.data.items){
                                    Ext.getCmp('c_'+i).setValue(true);
                                }
                            }
                            else{
                                for(var j in _store2.data.items){
                                    if(Ext.getCmp('c_'+j).getValue()){ chk_num++; }
                                }

                                if(chk_num === 0){
                                    for(var k in _store2.data.items){
                                        Ext.getCmp('c_'+k).setValue(false);
                                    }
                                }
                                else if(chk_num === _store2.getCount()){
                                    for(var l in _store2.data.items){
                                        Ext.getCmp('c_'+l).setValue(false);
                                    }
                                }
                            }
                        },
                        render : function(component, eOpts){
                            component.getEl().on('click', function(eOpts) {
                                var me = Ext.getCmp('NFW2_ips_signature');
                                var store = Ext.data.StoreManager.lookup('store_ips_signature_list');
                                var _store2 = Ext.data.StoreManager.lookup('store_ips_group_add');
                                var _selectList = [];

                                var size = 0, key;
                                for (key in me.filters) {
                                    if (me.filters.hasOwnProperty(key)) size++;
                                }
                                me.filters = {};
                                if(size !== 0){
                                    for(var i in _store2.data.items){
                                        _selectList.push({'group_id':_store2.data.items[i].data.id});
                                    }
                                    me.filters['$or'] = _selectList;
                                    store.getProxy().setExtraParam('cond',Ext.encode(me.filters));
                                }
                                else{
                                    if(Ext.getCmp('ips_check_fieldset').legend.items.items[1].getValue()){
                                        for(var i in _store2.data.items){
                                            _selectList.push({'group_id':_store2.data.items[i].data.id});
                                        }
                                        me.filters['$or'] = _selectList;
                                        store.getProxy().setExtraParam('cond',Ext.encode(me.filters));
                                    }
                                    else{
                                        store.getProxy().setExtraParam('cond',Ext.encode([]));
                                    }
                                }

                                if(!Ext.getCmp('ips_check_fieldset').legend.items.items[1].getValue()){
                                    store.getProxy().setExtraParam('cond',Ext.encode([]));
                                }
                                Ext.getCmp('tbl_chk').setText("0 "+ __zen('check_count'));
                                store.currentPage = 1;
                                if(me.filter_flag === 1){
                                    me.filter_func();
                                }
                                else{
                                    showLoadMask();
                                    store.load(function(){
                                        hideLoadMask();
                                    });
                                }
                            }, component);
                        }
                    }
                });
                var title = Ext.create('Ext.form.Label', {
                    text : ""
                });

                var tlabel = Ext.create('Ext.form.Label', {
                    text : __zen('all')+"("+total_cnt+")",
                    id : 'c_total_lb',
                    style:'margin-left:5px;margin-right:10px;',
                    listeners: {
                        render : function(component, eOpts){
                            component.getEl().on('click', function(eOpts) {
                                var me = Ext.getCmp('NFW2_ips_signature');
                                var store = Ext.data.StoreManager.lookup('store_ips_signature_list');
                                var _store2 = Ext.data.StoreManager.lookup('store_ips_group_add');
                                var _selectList = [];

                                var size = 0, key;
                                for (key in me.filters) {
                                    if (me.filters.hasOwnProperty(key)) size++;
                                }
                                me.filters = {};
                                if(size !== 0){
                                    for(var i in _store2.data.items){
                                        _selectList.push({'group_id':_store2.data.items[i].data.id});
                                    }
                                    me.filters['$or'] = _selectList;
                                    store.getProxy().setExtraParam('cond',Ext.encode(me.filters));
                                }
                                else{
                                    if(Ext.getCmp('ips_check_fieldset').legend.items.items[1].getValue()){
                                        store.getProxy().setExtraParam('cond',Ext.encode([]));
                                        Ext.getCmp('ips_check_fieldset').legend.items.items[1].setValue(false);
                                    }
                                    else{
                                        for(var i in _store2.data.items){
                                            _selectList.push({'group_id':_store2.data.items[i].data.id});
                                        }
                                        me.filters['$or'] = _selectList;
                                        store.getProxy().setExtraParam('cond',Ext.encode(me.filters));
                                        Ext.getCmp('ips_check_fieldset').legend.items.items[1].setValue(true);
                                    }
                                }

                                if(Ext.getCmp('ips_check_fieldset').legend.items.items[1].getValue()){
                                    store.getProxy().setExtraParam('cond',Ext.encode([]));
                                    Ext.getCmp('ips_check_fieldset').legend.items.items[1].setValue(false);
                                }
                                else{
                                    for(var i in _store2.data.items){
                                        _selectList.push({'group_id':_store2.data.items[i].data.id});
                                    }
                                    me.filters['$or'] = _selectList;
                                    store.getProxy().setExtraParam('cond',Ext.encode(me.filters));
                                    Ext.getCmp('ips_check_fieldset').legend.items.items[1].setValue(true);

                                }
                                Ext.getCmp('tbl_chk').setText("0 "+ __zen('check_count'));
                                store.currentPage = 1;
                                if(me.filter_flag === 1){
                                    me.filter_func();
                                }
                                else{
                                    showLoadMask();
                                    store.load(function(){
                                        hideLoadMask();
                                    });
                                }
                            }, component);
                        }
                    }
                });

                if(me.fir_set){
                    Ext.getCmp('ips_check_fieldset').legend.add(groupChk);
                    Ext.getCmp('ips_check_fieldset').legend.add(tlabel);
                    me.fir_set = false;
                }
                else{
                    Ext.getCmp('ips_check_fieldset').legend.removeAll();
                    Ext.getCmp('ips_check_fieldset').legend.add(title);
                    Ext.getCmp('ips_check_fieldset').legend.add(groupChk);
                    Ext.getCmp('ips_check_fieldset').legend.add(tlabel);
                }
                //     });

                var cnt = _store.getCount();
                //         me.chk_cnt = cnt;
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

                    if(j === 2 || j === 3){
                        chk_width = 220;
                    }
                    else if(j === 1 || j === 4 || j === 6 || j === 7){
                        chk_width = 130;
                    }

                    var groupChk = Ext.create('Ext.form.field.Checkbox', {
                        width : chk_width,
                        id : 'c_' + j,
                        inputValue : _store.data.items[j].data.id,
                        boxLabel: '<span style="font-size:11;">'+_store.data.items[j].data.group_name + "(" + _store.data.items[j].data.count + ")" +'</span>',
                        value: true,
                        listeners: {
                            change: function(field, newValue, oldValue, eOpts){
                                if(newValue){
                                    me.chk_cnt++;
                                    if(me.chk_cnt === cnt){ Ext.getCmp('ips_check_fieldset').legend.items.items[1].setValue(true); }
                                }
                                else{
                                    me.chk_cnt--;
                                    if(me.chk_cnt !== cnt){ Ext.getCmp('ips_check_fieldset').legend.items.items[1].setValue(false); }
                                }
                            },
                            render : function(component, eOpts){
                                component.getEl().on('click', function(eOpts) {
                                    var me = Ext.getCmp('NFW2_ips_signature');
                                    var store = Ext.data.StoreManager.lookup('store_ips_signature_list');
                                    var _store2 = Ext.data.StoreManager.lookup('store_ips_group_add');
                                    var _selectList = [];

                                    //                             if(Ext.getCmp('c_'+(Number(component.inputValue)-1)).getValue()){ Ext.getCmp('c_'+(Number(component.inputValue)-1)).setValue(false); }
                                    //                             else{ Ext.getCmp('c_'+(Number(component.inputValue)-1)).setValue(true); }

                                    var size = 0, key;
                                    for (key in me.filters) {
                                        if (me.filters.hasOwnProperty(key)) size++;
                                    }
                                    me.filters = {};
                                    if(size !== 0){
                                        for(var l = 0;l < cnt;l++){
                                            if(Ext.getCmp('c_'+l).getValue()){
                                                _selectList.push({'group_id':Ext.getCmp('c_'+l).inputValue});
                                            }
                                        }

                                        me.filters['$or'] = _selectList;
                                        store.getProxy().setExtraParam('cond',Ext.encode(me.filters));
                                    }
                                    else{
                                        for(var l = 0;l < cnt;l++){
                                            if(Ext.getCmp('c_'+l).getValue()){
                                                _selectList.push({'group_id':Ext.getCmp('c_'+l).inputValue});
                                            }
                                        }

                                        me.filters['$or'] = _selectList;
                                        store.getProxy().setExtraParam('cond',Ext.encode(me.filters));
                                    }

                                    if(component.getValue()){
                                        me.chk_cnt++;
                                        if(me.chk_cnt === cnt){ Ext.getCmp('ips_check_fieldset').legend.items.items[1].setValue(true); }
                                    }
                                    else{
                                        me.chk_cnt--;
                                        if(me.chk_cnt !== cnt){ Ext.getCmp('ips_check_fieldset').legend.items.items[1].setValue(false); }
                                    }
                                    Ext.getCmp('tbl_chk').setText("0 "+ __zen('check_count'));
                                    store.currentPage = 1;
                                    if(me.filter_flag === 1){
                                        me.filter_func();
                                    }
                                    else{
                                        showLoadMask();
                                        store.load(function(){
                                            hideLoadMask();
                                        });
                                    }
                                }, component);
                            }
                        }
                    });

                    if(Ext.getCmp('tab_con'+tab_cnt)){
                        Ext.getCmp('tab_con'+tab_cnt).add(groupChk);
                    }

                }
                if(tab_cnt < 2){
                    var tab_con2 = Ext.create('Ext.container.Container', {
                        id : 'tab_con2',
                        layout: 'hbox'
                    });
                    tab_cnt++;
                }
                for(var k = 1;k <= tab_cnt; k++){
                    Ext.getCmp('ips_checkgroup').add(Ext.getCmp('tab_con'+k));
                }
                //         Ext.getCmp('ips_profile_tip').add(Ext.getCmp('ips_check_fieldset'));
            }
        );
    }

});