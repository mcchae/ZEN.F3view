
Ext.define('NFW2.view.win_awareness_ele', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_awareness_ele',

    requires: [
        'NFW2.view.win_awareness_eleViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.button.Segmented',
        'Ext.button.Button',
        'Ext.form.field.ComboBox',
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.toolbar.Paging'
    ],

    viewModel: {
        type: 'win_awareness_ele'
    },
    cls: 'zen_win',
    id: 'win_awareness_ele',
    scrollable: true,
    width: 820,
    title: '엘리먼트 추가',
    modal: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            scrollable: true,
            bodyPadding: 20,
            title: '',
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            width: 775,
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: 'x-field x-form-item-label x-form-item-label-default',
                                            width: 120,
                                            text: '타입'
                                        },
                                        {
                                            xtype: 'segmentedbutton',
                                            cls: 'zen_seg',
                                            id: 'f_type',
                                            items: [
                                                {
                                                    enableToggle: true,
                                                    pressed: true,
                                                    text: '필터기반',
                                                    value: 'filter_based'
                                                },
                                                {
                                                    text: '직접선택',
                                                    value: 'specify_app'
                                                }
                                            ],
                                            listeners: {
                                                toggle: 'onSegmentedbuttonToggle'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '5 0 0 0',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: 'x-field x-form-item-label x-form-item-label-default lb_req',
                                            width: 120,
                                            text: '행위'
                                        },
                                        {
                                            xtype: 'segmentedbutton',
                                            cls: 'zen_seg',
                                            id: 'f_action',
                                            items: [
                                                {
                                                    enableToggle: true,
                                                    pressed: true,
                                                    text: '탐지',
                                                    value: 'detect'
                                                },
                                                {
                                                    text: '차단',
                                                    value: 'block'
                                                },
                                                {
                                                    text: 'QoS',
                                                    value: 'qos'
                                                }
                                            ],
                                            listeners: {
                                                toggle: 'onSegmentedbuttonToggle1'
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            id: 'action_qos',
                                            fieldLabel: '',
                                            editable: false,
                                            emptyText: 'Select',
                                            displayField: 'name',
                                            queryMode: 'local',
                                            store: 'store_profile_qos',
                                            valueField: 'cid',
                                            listeners: {
                                                afterrender: 'onAction_qosAfterRender'
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
                                                            id: 'category',
                                                            fieldLabel: '범주',
                                                            labelSeparator: ' ',
                                                            labelWidth: 80,
                                                            value: [
                                                                'All'
                                                            ],
                                                            editable: false,
                                                            matchFieldWidth: false,
                                                            displayField: 'val',
                                                            queryMode: 'local',
                                                            store: 'store_profile_category',
                                                            valueField: 'val',
                                                            multiSelect: true,
                                                            listeners: {
                                                                blur: 'onCategoryBlur',
                                                                change: 'onCategoryChange'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            id: 'technology',
                                                            margin: '0 0 0 5',
                                                            fieldLabel: '기술',
                                                            labelSeparator: ' ',
                                                            labelWidth: 80,
                                                            value: [
                                                                'All'
                                                            ],
                                                            editable: false,
                                                            displayField: 'val',
                                                            queryMode: 'local',
                                                            store: 'store_profile_technology',
                                                            valueField: 'val',
                                                            multiSelect: true,
                                                            listeners: {
                                                                change: 'onTechnologyChange',
                                                                blur: 'onTechnologyBlur'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            id: 'purpose',
                                                            margin: '0 0 0 5',
                                                            fieldLabel: '목적',
                                                            labelSeparator: ' ',
                                                            labelWidth: 80,
                                                            value: [
                                                                'All'
                                                            ],
                                                            editable: false,
                                                            matchFieldWidth: false,
                                                            displayField: 'val',
                                                            queryMode: 'local',
                                                            store: 'store_profile_purpose',
                                                            valueField: 'val',
                                                            multiSelect: true,
                                                            listeners: {
                                                                change: 'onPurposeChange',
                                                                blur: 'onPurposeBlur'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            id: 'popularity',
                                                            margin: '0 0 0 5',
                                                            fieldLabel: '인지도',
                                                            labelSeparator: ' ',
                                                            labelWidth: 80,
                                                            value: [
                                                                'All'
                                                            ],
                                                            editable: false,
                                                            displayField: 'val',
                                                            queryMode: 'local',
                                                            store: 'store_profile_popularity',
                                                            valueField: 'val',
                                                            multiSelect: true,
                                                            listeners: {
                                                                change: 'onPopularityChange',
                                                                blur: 'onPopularityBlur'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    hidden: true,
                                                    id: 'con_filtering',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch',
                                                        padding: '5 0 0 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            id: 'content',
                                                            fieldLabel: '컨텐츠 타입',
                                                            labelSeparator: ' ',
                                                            labelWidth: 80,
                                                            value: [
                                                                'All'
                                                            ],
                                                            editable: false,
                                                            displayField: 'val',
                                                            queryMode: 'local',
                                                            store: 'store_profile_content',
                                                            valueField: 'val',
                                                            multiSelect: true,
                                                            listeners: {
                                                                change: 'onContentChange',
                                                                blur: 'onContentBlur'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            id: 'released',
                                                            margin: '0 0 0 5',
                                                            fieldLabel: '갱신 일자',
                                                            labelSeparator: ' ',
                                                            labelWidth: 80,
                                                            value: [
                                                                'All'
                                                            ],
                                                            editable: false,
                                                            displayField: 'val',
                                                            queryMode: 'local',
                                                            store: 'store_profile_released',
                                                            valueField: 'val',
                                                            multiSelect: true,
                                                            listeners: {
                                                                change: 'onReleasedChange',
                                                                blur: 'onReleasedBlur'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            id: 'vendor',
                                                            margin: '0 0 0 5',
                                                            fieldLabel: '업체',
                                                            labelSeparator: ' ',
                                                            labelWidth: 80,
                                                            value: [
                                                                'All'
                                                            ],
                                                            editable: false,
                                                            displayField: 'val',
                                                            queryMode: 'local',
                                                            store: 'store_profile_vendor',
                                                            valueField: 'val',
                                                            multiSelect: true,
                                                            listeners: {
                                                                change: 'onVendorChange',
                                                                blur: 'onVendorBlur'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            id: 'protocol',
                                                            margin: '0 0 0 5',
                                                            fieldLabel: '프로토콜',
                                                            labelSeparator: ' ',
                                                            labelWidth: 80,
                                                            value: [
                                                                'All'
                                                            ],
                                                            editable: false,
                                                            displayField: 'val',
                                                            queryMode: 'local',
                                                            store: 'store_profile_protocol',
                                                            valueField: 'val',
                                                            multiSelect: true,
                                                            listeners: {
                                                                change: 'onProtocolChange',
                                                                blur: 'onProtocolBlur'
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
                                                            xtype: 'checkboxfield',
                                                            id: 'chk_user',
                                                            margin: '0 5 0 0 ',
                                                            boxLabel: '사용자 정의 애플리케이션만 보기',
                                                            listeners: {
                                                                change: 'onCheckboxfieldChange'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            toggleHandler: function(button, state) {
                                                                var filtering = Ext.getCmp("con_filtering");
                                                                var type = Ext.getCmp("col_type");
                                                                var date = Ext.getCmp("col_date");
                                                                var vendor = Ext.getCmp("col_vendor");
                                                                var protocol = Ext.getCmp("col_protocol");

                                                                if(state === true){
                                                                    this.setText("필터 축소");
                                                                    filtering.show();
                                                                    type.show();
                                                                    date.show();
                                                                    vendor.show();
                                                                    protocol.show();

                                                                    Ext.getCmp("content").setValue("All");
                                                                    Ext.getCmp("released").setValue("All");
                                                                    Ext.getCmp("vendor").setValue("All");
                                                                    Ext.getCmp("protocol").setValue("All");
                                                                }else{
                                                                    this.setText("필터 확장");
                                                                    filtering.hide();
                                                                    type.hide();
                                                                    date.hide();
                                                                    vendor.hide();
                                                                    protocol.hide();
                                                                }
                                                            },
                                                            cls: 'btn_b',
                                                            id: 'b_filter',
                                                            enableToggle: true,
                                                            text: '필터 확장'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'column',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            hidden: true,
                                            id: 'search_name',
                                            fieldLabel: '',
                                            emptyText: '애플리케이션 이름 검색',
                                            enableKeyEvents: true,
                                            listeners: {
                                                keyup: 'onSearch_nameKeyup'
                                            }
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            hidden: true,
                                            id: 'chk_app',
                                            style: 'float:right',
                                            fieldLabel: '',
                                            boxLabel: '선택한 애플리케이션만 보기',
                                            listeners: {
                                                change: 'onChk_appChange'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    height: 365,
                                    margin: '5 0 0 0',
                                    minWidth: 770,
                                    scrollable: true,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'gridpanel',
                                            id: 'grid_element',
                                            scrollable: true,
                                            title: '',
                                            columnLines: true,
                                            store: 'store_profile_ref_list',
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        var me = Ext.getCmp("win_awareness_ele");
                                                        var type = Ext.getCmp("f_type").getValue();

                                                        var chk = '';

                                                        if(type === "specify_app"){

                                                            var re = me.record;

                                                            if(re[record.data.rid]){
                                                                chk = 'checked="checked"';
                                                            }
                                                        }

                                                        return '<input type="checkbox" id="chk_'+rowIndex+'" '+chk+' />';
                                                    },
                                                    hidden: true,
                                                    id: 'col_chk',
                                                    width: 50,
                                                    enableColumnHide: false,
                                                    sortable: false,
                                                    dataIndex: 'rid',
                                                    hideable: false,
                                                    menuDisabled: true,
                                                    text: ''
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        var type = Ext.getCmp("f_type").getValue().f_type;
                                                        var search = Ext.getCmp("search_name").getValue().toLowerCase();

                                                        if(type === "specify_app" && search !== ""){

                                                            var name = value.toLowerCase();

                                                            var index = name.indexOf(search);
                                                            if(index !== -1){

                                                                var sub0 = '';
                                                                var sub = value.substring(index,index+search.length);
                                                                if(index !== 0){
                                                                    sub0 = value.substring(0,index);
                                                                }
                                                                var sub1 = value.substring(sub0.length+sub.length);

                                                                return sub0+'<font style="color:red">'+sub+'</font>'+sub1;
                                                            }
                                                        }

                                                        return value;
                                                    },
                                                    dataIndex: 'name',
                                                    text: '애플리케이션 이름',
                                                    flex: 1.5
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'category',
                                                    text: '범주',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'technology',
                                                    text: '기술',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'purpose',
                                                    text: '목적',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        return '<button class="ic_star_'+value+'" />';
                                                    },
                                                    width: 95,
                                                    dataIndex: 'popularity',
                                                    text: '인지도'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    hidden: true,
                                                    id: 'col_type',
                                                    dataIndex: 'content_type',
                                                    text: '컨텐츠 타입',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    hidden: true,
                                                    id: 'col_date',
                                                    dataIndex: 'released_date',
                                                    text: '갱신 일자',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    hidden: true,
                                                    id: 'col_vendor',
                                                    dataIndex: 'vendor',
                                                    text: '업체',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    hidden: true,
                                                    id: 'col_protocol',
                                                    dataIndex: 'protocols',
                                                    text: '프로토콜',
                                                    flex: 1
                                                }
                                            ],
                                            listeners: {
                                                cellclick: 'onGrid_elementCellClick',
                                                celldblclick: 'onGrid_elementCellDblClick'
                                            },
                                            dockedItems: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    dock: 'bottom',
                                                    width: 360,
                                                    displayInfo: true,
                                                    store: 'store_profile_ref_list'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'gridpanel',
                                            flex: 1,
                                            hidden: true,
                                            id: 'grid_element_chk',
                                            title: '',
                                            columnLines: true,
                                            store: 'store_profile_ref_chk_list',
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        var me = Ext.getCmp("win_awareness_ele");
                                                        var type = Ext.getCmp("f_type").getValue();

                                                        var chk = '';

                                                        if(type === "specify_app"){

                                                            var re = me.record;

                                                            if(re[record.data.rid]){
                                                                chk = 'checked="checked"';
                                                            }
                                                        }

                                                        return '<input type="checkbox" id="chk_e_'+rowIndex+'" '+chk+' />';
                                                    },
                                                    resizable: false,
                                                    width: 50,
                                                    enableColumnHide: false,
                                                    sortable: false,
                                                    align: 'center',
                                                    hideable: false,
                                                    menuDisabled: true
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'name',
                                                    text: '애플리케이션 이름',
                                                    flex: 1.5
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'category',
                                                    text: '범주',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'technology',
                                                    text: '기술',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'purpose',
                                                    text: '목적',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        return '<button class="ic_star_'+value+'" />';
                                                    },
                                                    width: 95,
                                                    dataIndex: 'popularity',
                                                    text: '인지도'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    hidden: true,
                                                    id: 'col_type2',
                                                    dataIndex: 'content_type',
                                                    text: '컨텐츠 타입',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    hidden: true,
                                                    id: 'col_date2',
                                                    dataIndex: 'released_date',
                                                    text: '갱신 일자',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    hidden: true,
                                                    id: 'col_vendor2',
                                                    dataIndex: 'vendor',
                                                    text: '업체',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    hidden: true,
                                                    id: 'col_protocol2',
                                                    dataIndex: 'protocol',
                                                    text: '프로토콜',
                                                    flex: 1
                                                }
                                            ],
                                            listeners: {
                                                cellclick: 'onGrid_element_chkCellClick'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: 'mt_info',
                                            id: 'info_name'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    id: 'info_val'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWin_awareness_eleAfterRender',
        close: 'onWin_awareness_eleClose',
        beforerender: 'onWin_awareness_eleBeforeRender'
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
                    itemId: 'fld_msg2'
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    iconCls: 'ft_confirm_icl',
                    text: '확인',
                    listeners: {
                        click: 'onButtonClick1'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    text: '취소',
                    listeners: {
                        click: 'onButtonClick'
                    }
                }
            ]
        }
    ],

    onSegmentedbuttonToggle: function(segmentedbutton, button, isPressed, eOpts) {
        var me = this;

        var search = Ext.getCmp("search_name");
        var chk_app = Ext.getCmp("chk_app");
        var chk = Ext.getCmp("col_chk");
        var grid = Ext.getCmp("grid_element");
        var grid_chk = Ext.getCmp("grid_element_chk");

        if(segmentedbutton.getValue() === "filter_based"){
            search.hide();
            chk_app.hide();
            chk.hide();
        }else{
            search.show();
            chk_app.show();
            chk.show();
        }

        grid.show();
        grid_chk.hide();
    },

    onSegmentedbuttonToggle1: function(segmentedbutton, button, isPressed, eOpts) {
        var qos = Ext.getCmp("action_qos");

        if(segmentedbutton.getValue() === "qos"){
            qos.show();
        }else{
            qos.hide();
        }
    },

    onAction_qosAfterRender: function(component, eOpts) {
        component.hide();
    },

    onCategoryBlur: function(component, event, eOpts) {
        if(component.value.length === 0){
            Ext.getCmp("category").setValue("All");
        }

        if(component.value.length > 0){
            Ext.getCmp("win_awareness_ele").findAppList();
        }
    },

    onCategoryChange: function(field, newValue, oldValue, eOpts) {
        var chk = this.chk_filter(newValue,oldValue);

        if(chk!==false){

            if(chk === true){
                Ext.getCmp('category').setValue("All");
            }else{
                Ext.getCmp("category").setValue(chk);
            }
        }
    },

    onTechnologyChange: function(field, newValue, oldValue, eOpts) {
        var chk = this.chk_filter(newValue,oldValue);

        if(chk!==false){

            if(chk === true){
                Ext.getCmp('technology').setValue("All");
            }else{
                Ext.getCmp("technology").setValue(chk);
            }
        }
    },

    onTechnologyBlur: function(component, event, eOpts) {
        if(component.value.length === 0){
            Ext.getCmp("technology").setValue("All");
        }

        if(component.value.length > 0){
            Ext.getCmp("win_awareness_ele").findAppList();
        }
    },

    onPurposeChange: function(field, newValue, oldValue, eOpts) {
        var chk = this.chk_filter(newValue,oldValue);

        if(chk!==false){

            if(chk === true){
                Ext.getCmp('purpose').setValue("All");
            }else{
                Ext.getCmp("purpose").setValue(chk);
            }
        }
    },

    onPurposeBlur: function(component, event, eOpts) {
        if(component.value.length === 0){
            Ext.getCmp("purpose").setValue("All");
        }

        if(component.value.length > 0){
            Ext.getCmp("win_awareness_ele").findAppList();
        }
    },

    onPopularityChange: function(field, newValue, oldValue, eOpts) {
        var chk = this.chk_filter(newValue,oldValue);

        if(chk!==false){

            if(chk === true){
                Ext.getCmp('popularity').setValue("All");
            }else{
                Ext.getCmp("popularity").setValue(chk);
            }
        }
    },

    onPopularityBlur: function(component, event, eOpts) {
        if(component.value.length === 0){
            Ext.getCmp("popularity").setValue("All");
        }

        if(component.value.length > 0){
            Ext.getCmp("win_awareness_ele").findAppList();
        }
    },

    onContentChange: function(field, newValue, oldValue, eOpts) {
        var chk = this.chk_filter(newValue,oldValue);

        if(chk!==false){

            if(chk === true){
                Ext.getCmp('content').setValue("All");
            }else{
                Ext.getCmp("content").setValue(chk);
            }
        }
    },

    onContentBlur: function(component, event, eOpts) {
        if(component.value.length === 0){
            Ext.getCmp("content").setValue("All");
        }

        if(component.value.length > 0){
            Ext.getCmp("win_awareness_ele").findAppList();
        }
    },

    onReleasedChange: function(field, newValue, oldValue, eOpts) {
        var chk = this.chk_filter(newValue,oldValue);

        if(chk!==false){

            if(chk === true){
                Ext.getCmp('released').setValue("All");
            }else{
                Ext.getCmp("released").setValue(chk);
            }
        }
    },

    onReleasedBlur: function(component, event, eOpts) {
        if(component.value.length === 0){
            Ext.getCmp("released").setValue("All");
        }

        if(component.value.length > 0){
            Ext.getCmp("win_awareness_ele").findAppList();
        }
    },

    onVendorChange: function(field, newValue, oldValue, eOpts) {
        var chk = this.chk_filter(newValue,oldValue);

        if(chk!==false){

            if(chk === true){
                Ext.getCmp('vendor').setValue("All");
            }else{
                Ext.getCmp("vendor").setValue(chk);
            }
        }
    },

    onVendorBlur: function(component, event, eOpts) {
        if(component.value.length === 0){
            Ext.getCmp("vendor").setValue("All");
        }

        if(component.value.length > 0){
            Ext.getCmp("win_awareness_ele").findAppList();
        }
    },

    onProtocolChange: function(field, newValue, oldValue, eOpts) {
        var chk = this.chk_filter(newValue,oldValue);

        if(chk!==false){

            if(chk === true){
                Ext.getCmp('protocol').setValue("All");
            }else{
                Ext.getCmp("protocol").setValue(chk);
            }
        }
    },

    onProtocolBlur: function(component, event, eOpts) {
        if(component.value.length === 0){
            Ext.getCmp("protocol").setValue("All");
        }

        if(component.value.length > 0){
            Ext.getCmp("win_awareness_ele").findAppList();
        }
    },

    onCheckboxfieldChange: function(field, newValue, oldValue, eOpts) {
        var _store = Ext.data.StoreManager.lookup("store_profile_ref_list");

        if(Ext.getCmp("chk_app").getValue()){
            this.onChk_appChange();
        }else{

            var d_type = (newValue)?'uapps':'all';

            var search = {
                'category': Ext.getCmp('category').getValue(),
                'technology': Ext.getCmp('technology').getValue(),
                'purpose': Ext.getCmp('purpose').getValue(),
                'popularity': Ext.getCmp('popularity').getValue(),
                'content_type': Ext.getCmp('content').getValue(),
                'released_date': Ext.getCmp('released').getValue(),
                'vendor': Ext.getCmp('vendor').getValue(),
                'protocols': Ext.getCmp('protocol').getValue(),
                'name': (Ext.getCmp("search_name").getValue()!=='')?Ext.getCmp("search_name").getValue():''
            };

            _store.getProxy().url = '/api/ftuctrl/findAppList';
            _store.getProxy().setExtraParam('filter_type',Ext.encode('specify_app'));
            _store.getProxy().setExtraParam('search_info',Ext.encode(search));
            _store.getProxy().setExtraParam('data_type',Ext.encode(d_type));
            _store.loadPage(1);
        }
    },

    onSearch_nameKeyup: function(textfield, e, eOpts) {
        this.findAppList();
    },

    onChk_appChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        var chk_user = Ext.getCmp("chk_user").getValue();
        var chk_app = Ext.getCmp("chk_app").getValue();
        var re = me.record;

        if(chk_app === true){

            var _store = Ext.data.StoreManager.lookup("store_profile_ref_chk_list");

            Ext.getCmp("grid_element_chk").show();
            Ext.getCmp("grid_element").hide();

            if(chk_user){
                var record = [];
                for(var i in me.r_data){
                    var item = me.r_data[i];

                    if(item._type === 'user' && re[item.rid]){
                        record.push(item);
                    }
                }
                _store.loadData(record);
            }else{

                _store.loadData(me.r_data);
            }
        }else{

            var _store = Ext.data.StoreManager.lookup("store_profile_ref_list");
            Ext.getCmp("grid_element_chk").hide();
            Ext.getCmp("grid_element").show();
            _store.load();
        }
    },

    onGrid_elementCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;
        var type = Ext.getCmp("f_type").getValue();

        if(type === "specify_app" && cellIndex === 0){

            var chk = document.getElementById("chk_"+rowIndex);

            var _store = Ext.data.StoreManager.lookup("store_profile_ref_chk_list");
            var _list = Ext.data.StoreManager.lookup("store_profile_ref_list");

            var record = me.record;
            var r_data = me.r_data;

            if(chk.checked === true){

                if(!record[_list.data.items[rowIndex].data.rid]){
                    r_data.push(_list.data.items[rowIndex].data);
                }
                record[_list.data.items[rowIndex].data.rid] = _list.data.items[rowIndex].data.name;

                me.r_data = r_data;
            }else if(chk.checked === false){

                var rid = _list.data.items[rowIndex].data.rid;

                delete record[_list.data.items[rowIndex].data.rid];
                store_del(rid);
            }

            me.record = record;
        }

        function store_del(rid){

            var r_data = me.r_data;

            for(var i=0; i<r_data.length; i++){

                if(r_data[i].rid === rid){
                    r_data.splice(i,1);
                    break;
                }
            }

            me.r_data = r_data;
        }
    },

    onGrid_elementCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;
        var type = Ext.getCmp("f_type").getValue();

        if(type === "filter_based"){

            if(cellIndex === 1){

                var win = Ext.create('NFW2.view.win_application_more',{
                    num: record.data.rid,
                    name: record.data.name,
                    type: record.data._type
                });

                win.show();

                /*this.setTitle(this.name);

                var base = (this.type === 'user')?'app_user_ref_list':'mgt_app_ref_list';

                var _params = {
                    basename: Ext.encode(base),
                    key: Ext.encode({'rid':this.num})
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'getObject',
                    _params,
                    function(re){

                        Ext.getCmp("l_category").setValue(re.category);
                        if(re.technology){
                            Ext.getCmp("l_technology").setValue(re.technology);
                        }else{
                            Ext.getCmp("l_technology").hide();
                        }
                        if(re.purpose){
                            Ext.getCmp("l_purpose").setValue(re.purpose.join(','));
                        }else{
                            Ext.getCmp("l_purpose").hide();
                        }
                        Ext.getCmp("l_content").setValue(re.content_type.join(','));
                        Ext.getCmp("l_popularity").setValue('<input type="button" class="ic_star_'+re.popularity+'" />');
                        Ext.getCmp("l_released").setValue(re.released_date);
                        Ext.getCmp("l_vendor").setValue(re.vendor);
                        Ext.getCmp("l_protocols").setValue(re.protocols.join(','));
                        if(re.descriptions.join(',')!==''){
                            Ext.getCmp("l_desc").setValue(re.descriptions.join(','));
                        }else{
                            Ext.getCmp("l_desc").hide();
                        }
                        if(re.revision){
                            Ext.getCmp("l_version").setValue(re.revision);
                        }else{
                            Ext.getCmp("l_version").hide();
                        }
                        Ext.getCmp("l_references").setValue(re.references);
                    }
                );*/
            }
        }else{

            if(cellIndex === 1){

                var win = Ext.create('NFW2.view.win_application_more',{
                    num: record.data.rid,
                    name: record.data.name,
                    type: record.data._type
                });

                win.show();
            }
        }
    },

    onGrid_element_chkCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var type = Ext.getCmp("f_type").getValue().f_type;

        if(type === "specify_app" && cellIndex === 0){
            var me = this;

            var chk = document.getElementById("chk_e_"+rowIndex);
            var _store = Ext.data.StoreManager.lookup("store_profile_ref_chk_list");

            var record = me.record;
            var r_data = me.r_data;

            if(chk.checked === false){

                delete record[_store.data.items[rowIndex].data.rid];

                for(var i=0; i<r_data.length; i++){

                    if(r_data[i].rid === _store.data.items[rowIndex].data.rid){
                        r_data.splice(i,1);
                        break;
                    }
                }
            }

            me.record = record;
            me.r_data = r_data;

            _store.loadData(r_data);
        }
    },

    onWin_awareness_eleAfterRender: function(component, eOpts) {
        var me = this;

        var record = [];
        me.record = record;

        var r_data = [];
        me.r_data = r_data;

        if(me.edit === "edit"){
            me.init_application();
        }else{

            var search = {
                'category': ['All'],
                'technology': ['All'],
                'purpose': ['All'],
                'content_type': ['All'],
                'popularity': ['All'],
                'released_date': ['All'],
                'vendor': ['All'],
                'protocols': ['All']
            };

            var _store = Ext.data.StoreManager.lookup("store_profile_ref_list");
            _store.getProxy().setExtraParam('filter_type',Ext.encode('filter_based'));
            _store.getProxy().setExtraParam('search_info',Ext.encode(search));
            _store.pageSize = 10;
            _store.load();
        }
    },

    onWin_awareness_eleClose: function(panel, eOpts) {
        var search = {
            'category': ['All'],
            'technology': ['All'],
            'purpose': ['All'],
            'content_type': ['All'],
            'popularity': ['All'],
            'released_date': ['All'],
            'vendor': ['All'],
            'protocols': ['All']
        };

        var _store = Ext.data.StoreManager.lookup("store_profile_ref_list");
        _store.getProxy().setExtraParam('filter_type',Ext.encode('filter_based'));
        _store.getProxy().setExtraParam('search_info',Ext.encode(search));
        _store.getProxy().setExtraParam('data_type',Ext.encode('all'));
        _store.currentPage = 1;
        _store.load();

        var _list = Ext.data.StoreManager.lookup("store_profile_ref_full_list");
        _list.getProxy().setExtraParam('filter_type',Ext.encode('filter_based'));
        _list.getProxy().setExtraParam('search_info',Ext.encode(search));
        _list.getProxy().setExtraParam('data_type',Ext.encode('all'));
        _list.load();

        Ext.getCmp("grid_element_chk").getStore().data.removeAll();
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        var type = Ext.getCmp("f_type");
        var action = Ext.getCmp("f_action");
        var qos = Ext.getCmp("action_qos");

        var category = Ext.getCmp("category");
        var technology = Ext.getCmp("technology");
        var purpose = Ext.getCmp("purpose");
        var popularity = Ext.getCmp("popularity");

        var content = Ext.getCmp("content");
        var released = Ext.getCmp("released");
        var vendor = Ext.getCmp("vendor");
        var protocol = Ext.getCmp("protocol");

        var data = {};

        data.type = type.getValue();
        data.action = action.getValue();

        if(action.getValue() === "qos"){

            if(qos.getValue() === null){
                prt_errMsg(get_msg('err_null'),'fld_msg2');
                qos.focus();
                return false;
            }
            data.qos = {
                '@cid': qos.getValue(),
                '#name': qos.getRawValue()
            };
        }

        var f_type = type.getValue();

        if(type.getValue() === "filter_based"){

            var _store_ref = Ext.data.StoreManager.lookup("store_profile_ref_full_list");
        }else{

            var _store_ref = Ext.data.StoreManager.lookup("store_profile_ref_chk_list");
            var r_data = me.r_data;

            if(r_data.length === 0){
                prt_errMsg("엘리먼트를 선택해주세요.","fld_msg2");
                return false;
            }
            _store_ref.loadData(r_data);
        }
        prt_errMsg(null,'fld_msg2');

        data.category = (f_type==="filter_based")?category.getValue():"All";
        data.technology = (f_type==="filter_based")?technology.getValue():"All";
        data.purpose = (f_type==="filter_based")?purpose.getValue():"All";
        data.popularity = (f_type==="filter_based")?popularity.getValue().sort():"All";

        data.content_type = (f_type==="filter_based")?content.getValue():"All";
        data.released_date = (f_type==="filter_based")?released.getValue():"All";
        data.vendor = (f_type==="filter_based")?vendor.getValue():"All";
        data.protocols = (f_type==="filter_based")?protocol.getValue():"All";

        var grid = _store_ref.data;
        var ar_app = [];

        var _store_app = Ext.data.StoreManager.lookup("store_profile_app_list");

        if(me.edit === "edit"){

            var n = Number(me.num)-1;

            for(var j=0; j<_store_app.data.length; j++){
                var s_app = _store_app.data.items[j].data.applications;

                if(j !== n){
                    for(var l=0; l<s_app.length; l++){
                        for(var i=0; i<grid.length; i++){

                            if(s_app[l].rid === grid.items[i].data.rid){
                                Ext.MessageBox.alert("",s_app[l].name+" "+get_msg('err_appdob'));
                                return false;
                            }
                        }
                    }
                }
            }

        }else{

            for(var j=0; j<_store_app.data.length; j++){
                var s_app = _store_app.data.items[j].data.applications;

                for(var l=0; l<s_app.length; l++){
                    for(var i=0; i<grid.length; i++){

                        if(s_app[l].rid === grid.items[i].data.rid){
                            Ext.MessageBox.alert("WeGuardia™ ZEN",s_app[l].name+" "+get_msg('err_appdob'));
                            return false;
                        }
                    }
                }
            }
        }

        for(var i=0; i<grid.length; i++){
            ar_app.push({
                'name': grid.items[i].data.name,
                'rid': grid.items[i].data.rid
            });
        }

        data.applications = ar_app;

        var _store = Ext.data.StoreManager.lookup("store_profile_app_list");

        if(me.edit === "edit"){

            data.num = me.num;
            _store.removeAt(me.num-1);
            _store.insert(me.num-1,data);
        }else{

            data.num = _store.getCount()+1;
            _store.add(data);

        }

        me.close();
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    },

    onWin_awareness_eleBeforeRender: function(component, eOpts) {
        Ext.define('Ext.overrides.form.field.ComboBox', {
            override: 'Ext.form.field.ComboBox',


            // OVERRIDE (Bug in ExtJS 5.1.0)
            checkChangeEvents : Ext.isIE ?
            ['change', 'propertychange', 'keyup'] : ['change', 'input', 'textInput', 'keyup', 'dragdrop']
        });
    },

    findAppList: function() {
        var me = this;
        var filter_type = Ext.getCmp("f_type").getValue();

        var search = {
            'category': Ext.getCmp('category').getValue(),
            'technology': Ext.getCmp('technology').getValue(),
            'purpose': Ext.getCmp('purpose').getValue(),
            'popularity': Ext.getCmp('popularity').getValue(),
            'content_type': Ext.getCmp('content').getValue(),
            'released_date': Ext.getCmp('released').getValue(),
            'vendor': Ext.getCmp('vendor').getValue(),
            'protocols': Ext.getCmp('protocol').getValue(),
            'name': (filter_type==="specify_app")?Ext.getCmp("search_name").getValue():null
        };

        Ext.getCmp("grid_element_chk").getStore().data.removeAll();

        var _store = Ext.data.StoreManager.lookup("store_profile_ref_list");
        _store.getProxy().setExtraParam('filter_type',Ext.encode(filter_type));
        _store.getProxy().setExtraParam('search_info',Ext.encode(search));
        _store.loadPage(1);

        var _list = Ext.data.StoreManager.lookup("store_profile_ref_full_list");
        _list.getProxy().setExtraParam('filter_type',Ext.encode(filter_type));
        _list.getProxy().setExtraParam('search_info',Ext.encode(search));
        _list.load();

    },

    chk_filter: function(newValue, oldValue) {
        var value = newValue.join(",");

        var o_value = oldValue.join(",");

        if(o_value.indexOf("All") === -1){

            if(value.indexOf("All") !== -1){
                return true;
            }
        }else{

            if(newValue.length < 2){ return false; }
            var val = [];

            for(var i=0; i<newValue.length; i++){
                if(newValue[i] !== "All"){
                    val.push(newValue[i]);
                }
            }
            return val;
        }
        return false;
    },

    init_application: function() {
        var me = this;

        me.setTitle("엘리먼트 수정 - "+me.num);

        Ext.getCmp("f_type").setValue(me.type);
        if(me.type === "specify_app"){
            var search = Ext.getCmp("search_name");
            var chk_app = Ext.getCmp("chk_app");
            var chk = Ext.getCmp("col_chk");
            var grid = Ext.getCmp("grid_element");
            var grid_chk = Ext.getCmp("grid_element_chk");

            me.record = {};
            search.show();
            chk_app.show();
            chk.show();
            me.findAppList();

            grid.show();
            grid_chk.hide();
        }

        Ext.getCmp("f_action").setValue(me.action);
        if(me.action === "qos"){
            Ext.getCmp("action_qos").setValue(me.qos['@cid']);
        }

        Ext.getCmp("category").setValue(me.category);
        Ext.getCmp("technology").setValue(me.technology);
        Ext.getCmp("purpose").setValue(me.purpose);
        Ext.getCmp("popularity").setValue(me.popularity);

        if(me.content[0] !== "All" || me.released[0] !== "All" || me.vendor[0] !== "All" || me.protocol[0] !== "All"){
            Ext.getCmp('b_filter').toggle(true);

            Ext.getCmp("content").setValue(me.content);
            Ext.getCmp("released").setValue(me.released);
            Ext.getCmp("vendor").setValue(me.vendor);
            Ext.getCmp("protocol").setValue(me.protocol);
        }

        if(me.type === "specify_app"){

            Ext.getCmp('b_filter').toggle(false);

            var record = me.record;
            var r_data = me.r_data;

            for(var i=0; i<me.applications.length; i++){
                record[me.applications[i].rid] = me.applications[i].name;
            }

            me.record = record;

            var _f_store = Ext.data.StoreManager.lookup("store_profile_ref_full_list");
            var _store = Ext.data.StoreManager.lookup("store_profile_ref_chk_list");

            for(var i=0; i<_f_store.getCount(); i++){

                var rid = _f_store.data.items[i].data.rid;
                if(record[rid]){
                    r_data.push(_f_store.data.items[i].data);
                }
            }

            me.r_data = r_data;
        }else{

            this.findAppList();
        }
    }

});