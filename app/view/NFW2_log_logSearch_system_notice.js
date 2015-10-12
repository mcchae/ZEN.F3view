
Ext.define('NFW2.view.NFW2_log_logSearch_system_notice', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_log_logsearch_system_notice',

    requires: [
        'NFW2.view.NFW2_log_logSearch_system_noticeViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.button.Button',
        'Ext.form.field.Date',
        'Ext.button.Segmented'
    ],

    viewModel: {
        type: 'nfw2_log_logsearch_system_notice'
    },
    cls: 'NFW2_log',
    id: 'NFW2_log',
    minHeight: 300,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            minHeight: 300,
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
                            width: 120,
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'x-field x-form-item-label x-form-item-label-default',
                                    bind: {
                                        text: '{date}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'container',
                                    padding: '5 5 5 0',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            id: 'btn_today',
                                            margin: '0 0 0 5',
                                            allowDepress: false,
                                            bind: {
                                                text: '{today}'
                                            },
                                            listeners: {
                                                click: 'onBtn_todayClick'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 5',
                                            allowDepress: false,
                                            bind: {
                                                text: '{yesterday}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick3'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 5',
                                            allowDepress: false,
                                            bind: {
                                                text: '7{day}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick4'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 5',
                                            allowDepress: false,
                                            bind: {
                                                text: '10{day}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick5'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 5',
                                            allowDepress: false,
                                            bind: {
                                                text: '15{day}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick6'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 5',
                                            allowDepress: false,
                                            bind: {
                                                text: '{one_month}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick7'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 5',
                                            allowDepress: false,
                                            bind: {
                                                text: '3{month}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick8'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 5',
                                            allowDepress: false,
                                            bind: {
                                                text: '6{month}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick9'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    padding: 5,
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            id: 'search_start',
                                            msgTarget: 'none',
                                            editable: false,
                                            format: 'Y-m-d'
                                        },
                                        {
                                            xtype: 'label',
                                            padding: '0 5 0 5',
                                            text: '~'
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: 'search_end',
                                            fieldLabel: '',
                                            msgTarget: 'none',
                                            editable: false,
                                            format: 'Y-m-d'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    id: 'con_input',
                    listeners: {
                        afterrender: 'onCon_inputAfterRender'
                    }
                },
                {
                    xtype: 'container',
                    margin: '5 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'button',
                            cls: 'btn_b',
                            id: 'btn_dep',
                            enableToggle: true,
                            iconCls: 'icg_set',
                            bind: {
                                text: '{detail_search}'
                            },
                            listeners: {
                                afterrender: 'onButtonAfterRender',
                                toggle: 'onButtonToggle'
                            }
                        },
                        {
                            xtype: 'button',
                            cls: 'btn_b',
                            margin: '0 0 0 5',
                            iconCls: 'icb_reset',
                            bind: {
                                text: '{reset_search_word}'
                            },
                            listeners: {
                                click: 'onButtonClick1'
                            }
                        },
                        {
                            xtype: 'button',
                            cls: 'btn_b',
                            margin: '0 0 0 5',
                            bind: {
                                text: '{searchable_list}'
                            },
                            listeners: {
                                render: 'onButtonRender',
                                click: 'onButtonClick2'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    listeners: {
                        beforerender: 'onContainerBeforeRender'
                    }
                },
                {
                    xtype: 'container',
                    margin: '5 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'label',
                            cls: 'errorBox',
                            hidden: true,
                            id: 'err_msg',
                            itemId: 'err_msg'
                        },
                        {
                            xtype: 'segmentedbutton',
                            cls: 'zen_seg',
                            id: 'show_mode',
                            margin: '0 0 0 5',
                            items: [
                                {
                                    enableToggle: true,
                                    iconCls: 'icg_s_view',
                                    pressed: true,
                                    value: 1,
                                    bind: {
                                        tooltip: '{simple_view}'
                                    }
                                },
                                {
                                    allowDepress: false,
                                    enableToggle: true,
                                    iconCls: 'icg_a_view',
                                    value: 2,
                                    bind: {
                                        tooltip: '{all_view}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'segmentedbutton',
                            cls: 'zen_seg',
                            id: 'dis_mode',
                            margin: '0 5 0 5',
                            items: [
                                {
                                    enableToggle: true,
                                    iconCls: 'icg_display',
                                    pressed: true,
                                    value: 'display',
                                    bind: {
                                        tooltip: '{print_page}'
                                    }
                                },
                                {
                                    allowDepress: false,
                                    enableToggle: true,
                                    iconCls: 'icg_export',
                                    value: 'excel',
                                    bind: {
                                        tooltip: '{print_file}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            cls: 'btn_b',
                            iconCls: 'icb_ser',
                            bind: {
                                text: '{search}'
                            },
                            listeners: {
                                click: 'onButtonClick'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    id: 'cont_log_grid',
                    margin: '5 0 0 0'
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPanelAfterRender',
        beforedestroy: 'onNFW2_logBeforeDestroy'
    },

    onBtn_todayClick: function(button, e, eOpts) {
        var date = new Date();

        Ext.getCmp("search_start").setValue(date);
        Ext.getCmp("search_end").setValue(date);
    },

    onButtonClick3: function(button, e, eOpts) {
        var less = Ext.Date.add(Ext.getCmp("search_start").getValue(),Ext.Date.DAY,-1);

        Ext.getCmp("search_start").setValue(less);
        Ext.getCmp("search_end").setValue(less);
    },

    onButtonClick4: function(button, e, eOpts) {
        var less = Ext.Date.add(Ext.getCmp("search_start").getValue(),Ext.Date.DAY,-7);
        var less_e = Ext.getCmp("search_start").getValue();

        Ext.getCmp("search_start").setValue(less);
        Ext.getCmp("search_end").setValue(less_e);
    },

    onButtonClick5: function(button, e, eOpts) {
        var less = Ext.Date.add(Ext.getCmp("search_start").getValue(),Ext.Date.DAY,-10);
        var less_e = Ext.getCmp("search_start").getValue();

        Ext.getCmp("search_start").setValue(less);
        Ext.getCmp("search_end").setValue(less_e);
    },

    onButtonClick6: function(button, e, eOpts) {
        var less = Ext.Date.add(Ext.getCmp("search_start").getValue(),Ext.Date.DAY,-15);
        var less_e = Ext.getCmp("search_start").getValue();

        Ext.getCmp("search_start").setValue(less);
        Ext.getCmp("search_end").setValue(less_e);
    },

    onButtonClick7: function(button, e, eOpts) {
        var less = Ext.Date.add(Ext.getCmp("search_start").getValue(),Ext.Date.MONTH,-1);
        var less_e = Ext.getCmp("search_start").getValue();

        Ext.getCmp("search_start").setValue(less);
        Ext.getCmp("search_end").setValue(less_e);
    },

    onButtonClick8: function(button, e, eOpts) {
        var less = Ext.Date.add(Ext.getCmp("search_start").getValue(),Ext.Date.MONTH,-3);
        var less_e = Ext.getCmp("search_start").getValue();

        Ext.getCmp("search_start").setValue(less);
        Ext.getCmp("search_end").setValue(less_e);
    },

    onButtonClick9: function(button, e, eOpts) {
        var less = Ext.Date.add(Ext.getCmp("search_start").getValue(),Ext.Date.MONTH,-6);
        var less_e = Ext.getCmp("search_start").getValue();

        Ext.getCmp("search_start").setValue(less);
        Ext.getCmp("search_end").setValue(less_e);
    },

    onCon_inputAfterRender: function(component, eOpts) {
        component.update('<table width="100%" cellpadding="0" cellspacing="0" class="x-grid-item"><tr><td width="125" class="x-field x-form-item-label x-form-item-label-default">'+__zen('search_word')+'</td><td><input type="text" name="_tag[]" id="ty" value="" class="_tag"/></td></tr></table>');
    },

    onButtonAfterRender: function(component, eOpts) {
        /*component.tooltip = Ext.create('Ext.tip.ToolTip', {
            target: component.getEl(),
            autoHide: false,
            anchor:'left',
            shadow: false,
            border : 0,
            id: 'dep_tooltip',
            minWidth:810,
            items : [
                {
                    xtype: 'container',
                    flex: 1,
                    maxHeight: 500,
                    padding: 10,
                    width:800,
                    scrollable: true,
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'count',
                            fieldLabel: '출력 개수',
                            labelSeparator: ' ',
                            value: 100,
                            editable: false,
                            displayField: 'val',
                            store: 'store_logsearch_count',
                            valueField: 'val'
                        },
                        {
                            xtype: 'combobox',
                            id: 'sort',
                            fieldLabel: '정렬 방식',
                            labelSeparator: ' ',
                            value: 'desc',
                            editable: false,
                            displayField: 'name',
                            store: 'store_logsearch_sort',
                            valueField: 'val'
                        },
                        {
                            xtype: 'container',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'timefield',
                                    id: 'time_start_st',
                                    width: 160,
                                    fieldLabel: '특정 시간',
                                    labelSeparator: ' ',
                                    value: '00',
                                    editable: false,
                                    format: 'H',
                                    increment: 60,
                                    submitFormat: 'H'
                                },
                                {
                                    xtype: 'label',
                                    padding: '0 5 0 5',
                                    text: '~'
                                },
                                {
                                    xtype: 'combobox',
                                    id: 'time_start_ed',
                                    width: 55,
                                    value: '00',
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    valueField: 'val'
                                },
                                {
                                    xtype: 'label',
                                    padding: '0 5 0 5',
                                    text: '-'
                                },
                                {
                                    xtype: 'timefield',
                                    id: 'time_end_st',
                                    width: 55,
                                    value: '23',
                                    editable: false,
                                    format: 'H',
                                    increment: 60,
                                    submitFormat: 'H'
                                },
                                {
                                    xtype: 'label',
                                    padding: '0 5 0 5',
                                    text: '~'
                                },
                                {
                                    xtype: 'combobox',
                                    id: 'time_end_ed',
                                    width: 55,
                                    value: '59',
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    valueField: 'val'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'machin_name',
                                    fieldLabel: '장비 이름',
                                    labelSeparator: ' ',
                                    editable: false,
                                    emptyText: '전체',
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'store_logsearch_name',
                                    valueField: 'val'
                                },
                                {
                                    xtype: 'label',
                                    cls: 'lb_info',
                                    hidden: true,
                                    id: 'info_name',
                                    text: 'A.B.C.D장비로 로그를 동기화 중입니다. 동기화중에는 Slave 장비로 로그가 저장되지 않습니다.'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'con_event'
                        }
                    ]
                }
            ]
        });*/
    },

    onButtonToggle: function(button, pressed, eOpts) {
        if(pressed){
            Ext.getCmp("dep_tooltip").show();
        }else{
            Ext.getCmp("dep_tooltip").hide();
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        var nsg_tag = $('.tagedit-listelement-old');
        if(nsg_tag.length > 0){
            nsg_tag.remove();
        }
    },

    onButtonRender: function(component, eOpts) {
        component.tooltip = Ext.create('Ext.tip.ToolTip', {
            target: component.getEl(),
            autoHide: false,
            anchor:'left',
            id: '_tooltip',
            cls : 'left_light_box',
            shadow: false,
            border : 0,
            items : [
                {
                    xtype : 'container',
                    width : 150,
                    cls:'tip_box',
                    html : '<div class="title">'+__zen('searchable_list')+'</div>'+
                    '<div class="list" onclick=log_help(this)>'+__zen('src')+'</div>'+
                    '<div class="list" onclick=log_help(this)>'+__zen('src_port')+'</div>'+
                    '<div class="list" onclick=log_help(this)>'+__zen('dest')+'</div>'+
                    '<div class="list" onclick=log_help(this)>'+__zen('dest_port')+'</div>'+
                    '<div class="list" onclick=log_help(this)>'+__zen('protocol')+'</div>'+
                    '<div class="list" onclick=log_help(this)>'+__zen('desc')+'</div>'+
                    '<div class="list" onclick=log_help(this)>'+__zen('summary')+'</div>'
                }
            ]
        });
    },

    onButtonClick2: function(button, e, eOpts) {

        Ext.getCmp('_tooltip').show();
    },

    onContainerBeforeRender: function(component, eOpts) {
        var me = this;

        var c_store = Ext.create('Ext.data.Store',{
            data: [{'val':100},{'val':200}],
            fields: ['val']
        });

        var s_store = Ext.create('Ext.data.Store',{
            data: [{'name':__zen('desc_ord'),'val':'desc'},{'name':__zen('ase'),'val':'asc'}],
            fields: ['name','val']
        });

        var _param = {
            basename: Ext.encode('network_ha_sync')
        };

        var n_store = Ext.create('Ext.data.Store',{
            data: [],
            fields: ['name']
        });

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _param,
            function(response){

                if(!response){ Ext.getCmp("machin_name").hide(); return false; }

                me.log_use = response.log.use;
                me.log = response.log;

                if(me.log_use === "1"){

                    var record = [];

                    if(response.log.mode != "s"){
                        record.push({ 'name': response.log.mname },{ 'name': response.log.sname });
                    }else{
                        Ext.getCmp("machin_name").disable();
                        Ext.getCmp("info_name").show();
                    }

                    n_store.loadData(record);
                }else{
                    Ext.getCmp("machin_name").hide();
                }
            }
        );

        component.add({
            xtype: 'container',
            hidden: true,
            id: 'dep_tooltip',
            padding: 10,
            scrollable: true,
            style: 'border:1px solid #ccc',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
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
                            id: 'count',
                            fieldLabel: __zen('output_count'),
                            labelSeparator: ' ',
                            queryMode: 'local',
                            value: 100,
                            editable: false,
                            displayField: 'val',
                            store: c_store,
                            valueField: 'val'
                        },
                        {
                            xtype: 'combobox',
                            id: 'sort',
                            margin: '0 0 0 10',
                            fieldLabel: __zen('alignment_method'),
                            labelSeparator: ' ',
                            queryMode: 'local',
                            value: 'desc',
                            editable: false,
                            displayField: 'name',
                            labelWidth: 120,
                            store: s_store,
                            valueField: 'val'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '10 0 0 0',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'timefield',
                            id: 'time_start_st',
                            width: 160,
                            fieldLabel: __zen('specific_period'),
                            labelSeparator: ' ',
                            value: '00',
                            editable: false,
                            format: 'H',
                            increment: 60,
                            submitFormat: 'H'
                        },
                        {
                            xtype: 'label',
                            padding: '0 5 0 5',
                            text: '~'
                        },
                        {
                            xtype: 'combobox',
                            id: 'time_start_ed',
                            width: 55,
                            value: '00',
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            valueField: 'val'
                        },
                        {
                            xtype: 'label',
                            padding: '0 5 0 5',
                            text: '-'
                        },
                        {
                            xtype: 'timefield',
                            id: 'time_end_st',
                            width: 55,
                            value: '23',
                            editable: false,
                            format: 'H',
                            increment: 60,
                            submitFormat: 'H'
                        },
                        {
                            xtype: 'label',
                            padding: '0 5 0 5',
                            text: '~'
                        },
                        {
                            xtype: 'combobox',
                            id: 'time_end_ed',
                            width: 55,
                            value: '59',
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            valueField: 'val'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '5 0 0 0',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'machin_name',
                            fieldLabel: __zen('device_name'),
                            labelSeparator: ' ',
                            editable: false,
                            emptyText: __zen('all'),
                            displayField: 'name',
                            queryMode: 'local',
                            store: n_store,
                            valueField: 'name'
                        },
                        {
                            xtype: 'label',
                            cls: 'lb_info',
                            hidden: true,
                            id: 'info_name',
                            text: __zen('log_msg2')
                        }
                    ]
                },
                {
                    xtype: 'container',
                    id: 'con_event'
                }
            ]
        });
    },

    onButtonClick: function(button, e, eOpts) {
        var date_s = Ext.getCmp("search_start");
        var date_e = Ext.getCmp("search_end");

        if(date_s.getSubmitValue() > date_e.getSubmitValue()){
            prt_errMsg_label(get_msg('err_than'), "err_msg");
            date_s.focus();
            return false;
        }

        var time_start_st = Ext.getCmp("time_start_st").getSubmitValue();
        var time_start_ed = Ext.getCmp("time_start_ed").getValue();
        var time_end_st = Ext.getCmp("time_end_st").getSubmitValue();
        var time_end_ed = Ext.getCmp("time_end_ed").getValue();

        if(time_start_st+time_start_ed > time_end_st+time_end_ed){
            prt_errMsg_label(get_msg('err_than'), "err_msg");
            Ext.getCmp("btn_dep").toggle(true);
            Ext.getCmp("time_start_st").focus();
            return false;
        }

        Ext.getCmp("err_msg").hide();

        var store = Ext.data.StoreManager.lookup('store_log_system_notice');
        var _start = Ext.Date.format(Ext.getCmp('search_start').getValue(), 'Y-m-d')+' '+time_start_st+':'+time_start_ed+':00';
        var _end = Ext.Date.format(Ext.getCmp('search_end').getValue(), 'Y-m-d')+' '+time_end_st+':'+time_end_ed+':00';
        var _sort = Ext.getCmp('sort').getValue() === 'asc' ? 1 : -1;
        var _limit = Ext.getCmp("count").getValue();
        var name = Ext.getCmp("machin_name").getValue();

        Ext.getCmp("btn_dep").toggle(false);

        var s_list = [];
        var listelement = $(".tagedit-listelement-old");
        for(var i=0; i<listelement.length; i++){
            s_list.push($(listelement[i]).find(':hidden').val());
        }

        var q_ao = log_query(s_list);
        var _andSearch = q_ao[0];
        var _orSearch = q_ao[1];
        var _eventSearch = [];

        var _and = {};
        var _or = {};

        var tbl_log = document.getElementById('tbl_log');
        var chk = document.getElementsByName('chk[]');
        for(var i=0; i<chk.length; i++){
            if(chk[i].checked){
                _eventSearch.push({ 'event': parseInt('0x'+chk[i].value) });
            }
        }

        if(_andSearch.length !== 0){

            if(_orSearch.length !== 0){
                _andSearch.push({
                    'or': _orSearch
                });
                _orSearch = [];
            }
        }

        if(name !== null){
            _orSearch.push({ 'name': name });
        }

        //검색 조건 매개변수
        var _search_params = {};

        _search_params['schema_name'] = Ext.encode('ALERT');
        _search_params['start_ts'] = Ext.encode(_start);
        _search_params['end_ts'] = Ext.encode(_end);
        _search_params['orderby'] = Ext.encode(_sort);
        _search_params['locale'] = Ext.encode(__zen_locale);
        _search_params['limit'] = Ext.encode(Number(_limit));

        var criteria = {};
        if(_andSearch.length > 0){
            criteria.and = _andSearch;
        }
        if(_orSearch.length > 0){
            criteria.or = _orSearch;
        }
        if(_eventSearch.length > 0){
            criteria.eventlist = _eventSearch;
        }
        if(_andSearch.length > 0 || _orSearch.length > 0 || _eventSearch.length > 0){
            _search_params['criteria'] = Ext.encode(criteria);
        }

        Ext.getCmp("NFW2_log").mask("Loading...");

        if(Ext.getCmp("dis_mode").getValue() === "display"){

            var _grid = DMC_LOG_VIEW.make_log_search_grid_tpl(_search_params, store);

            Ext.getCmp('cont_log_grid').removeAll();
            Ext.getCmp('cont_log_grid').add({
                items: [_grid],
                layout: 'fit',
                border: false
            });


        }else{

            var fileName = Ext.Date.format(new Date(), 'Ymd')+"_SYSTEM_NOTICE.xlsx";
            var path = '/mnt/ramdisk/do/F3view/nodeapps/deploy/public/javascripts/attachments/';

            var _condition = {
                schema_name: Ext.encode('ALERT'),
                criteria: (_search_params.criteria)?_search_params.criteria:{},
                start_ts: Ext.encode(_start),
                end_ts: Ext.encode(_end),
                orderby: Ext.encode(_sort),
                excelfile: Ext.encode(path+fileName),
                locale: Ext.encode(__zen_locale),
                limit: Ext.encode(Number(_limit))
            };

            request_helper.xmlrpc_call_Ajax_Post(
                'FtDBMgr',
                'searchExcel',
                _condition,
                function(retval){

                    Ext.getCmp("NFW2_log").unmask();
                    document.location.href = '/fileDownloadCommon?filePath='+ Ext.encode(path)+"&fileName="+Ext.encode(fileName)+"&filePathFlag="+Ext.encode('true');

                }
            );
        }
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        var a_min = [];
        for(var i=0; i<60; i++){
            var min = (i<10)?'0'+i:i;
            a_min.push({'name':min, 'val':i});
        }

        var t_record = Ext.create('Ext.data.Store',{
            data: a_min,
            fields: ['name','val']
        });
        Ext.getCmp("time_start_ed").bindStore(t_record);
        Ext.getCmp("time_end_ed").bindStore(t_record);

        var date = new Date();
        Ext.getCmp("search_start").setValue(date);
        Ext.getCmp("search_end").setValue(date);

        var _params = {
            basename: Ext.encode('log_detail_setting'),
            limit: Ext.encode(0)
        };

        var list = [];

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObjects',
            _params,
            function(response){

                hideLoadMask();
                if(!response){ return false; }

                response = response.list;

                var r_list = {};
                for(var i in response){
                    r_list[response[i].define] = response[i];
                }

                var ar_list = ["시스템","네트워크","안티바이러스","안티스팸"];
                var ar = ['sys','network','av','as'];

                var ar_sys_list = ['시스템','관리자','정책 전송','데몬 관리','백업/복원','업데이트','로그','외부서버','설정','인증서','센터관리','HA','LLCF'];
                var ar_sys = ['sys','admin','send','daemon','backup','update','log','radius','set','cert','center','ha','llcf'];
                var ar_network_list = ["인터페이스","Multipath","L2TP","Checker","VRRP"];
                var ar_network = ['inter','multi','l2','checker','vrrp'];
                var ar_av_list = ["안티바이러스"];
                var ar_av = ['av'];
                var ar_as_list = ["안티스팸"];
                var ar_as = ['as'];

                for(var i=0; i<ar.length; i++){
                    eval('var _arl = ar_'+ar[i]+';');
                    for(var l=0; l<_arl.length; l++){
                        eval('var _ar_'+ar[i]+'_'+_arl[l]+' = [];');
                    }
                }

                for(var i in r_list){
                    for(var l=0; l<ar_list.length; l++){
                        if(r_list[i].category[0].trim() === ar_list[l]){

                            eval('var _ar = ar_'+ar[l]+'_list;');

                            for(var j=0; j<_ar.length; j++){
                                if(r_list[i].subcategory[0].trim() === _ar[j]){
                                    eval('var _ar_sub = ar_'+ar[l]+';');
                                    eval('_ar_'+ar[l]+'_'+_ar_sub[j]+'.push(r_list[i]);');
                                }
                            }
                        }
                    }
                }

                var r_event = [];
                for(var i=0; i<ar.length; i++){
                    eval('var _ar = ar_'+ar[i]+';');
                    for(var j=0; j<_ar.length; j++){
                        eval('var _event = _ar_'+ar[i]+'_'+_ar[j]+';');

                        var s_event = [];
                        var sub_len = _event.length-1;
                        for(var l=0; l<_event.length; l++){
                            var list = '';
                            if(l === 0){ list = '<table width="100%">'; }
                            if(l%3 === 0){ list += '<tr>'; }

                            var _subcategory = _event[l].subclassfication;
                            _sub = (__zen_locale==='ko')?_subcategory[0]:(__zen_locale==='en')?_subcategory[1]:(__zen_locale==='jp')?_subcategory[2]:'';
                            list += '<td width="33%"><label><input type="checkbox" name="chk[]" value="'+_event[l].event+'" class="code_'+_ar[j]+'" onclick="chk_log_event(this)" />'+
                                _sub.trim()+'</label></td>';

                            if((l+1)%3 === 0 || l === sub_len){ if((l+1)%3===2){ list+='<td width="33%"></td>'; }list += '</tr>'; }
                            if(l === sub_len){ list += '</table>'; }
                            s_event.push(list);
                        }
                        var _category = _event[0].subcategory;
                        _category = (__zen_locale==='ko')?_category[0]:(__zen_locale==='en')?_category[1]:(__zen_locale==='jp')?_category[2]:'';
                        var t_event = '<tr><td width="20%" style="border:1px solid #ccc;background:#f5f5f7"><label>'+
                            '<input type="checkbox" id="all_'+_ar[j]+'" class="code_'+_ar[j]+'" onclick="chk_log_event(this)" />'+_category+'</label></td>'+
                            '<td style="border:1px solid #ccc">'+s_event.join('')+'</td></tr>';
                        r_event.push(t_event);
                    }
                }

                var e_list = r_event.join('');
                Ext.getCmp("con_event").update('<table width="100%" cellpadding="0" cellspacing="0" border="1" id="sorttable" style="border:1px solid #ccc">'+e_list+'</table>');
            }
        );

        tag_search('NFW2_log');
        /*var input = document.getElementById('ty');
        var awe = new Awesomplete(input, {
            list: ['출발지','출발지 포트','목적지','목적지 포트','프로토콜','정보','프로토콜=IP','프로토콜=ICMP',
                   '프로토콜=IGMP','프로토콜=IPIP','프로토콜=TCP','프로토콜=EGP','프로토콜=IGRP','프로토콜=PUP','프로토콜=UDP',
                   '프로토콜=IDP','프로토콜=TP','프로토콜=IPV6','프로토콜=ROUTING','프로토콜=FRAGMENT','프로토콜=RSVP',
                   '프로토콜=GRE','프로토콜=ESP','프로토콜=AH','프로토콜=SKIP','프로토콜=ICMPV6','프로토콜=NONE','프로토콜=DSTOPTS',
                   '프로토콜=EIGRP','프로토콜=OSPF','프로토콜=MTP','프로토콜=PIM','프로토콜=COMP','프로토콜=L2TP','프로토콜=ISIS']
        });*/
    },

    onNFW2_logBeforeDestroy: function(component, eOpts) {
        Ext.getCmp("_tooltip").destroy();
    },

    tag_validate: function(value) {
        var val = value.split("=");
        val[0] = val[0].toLowerCase();

        if(val.length === 1 || value === "" || val[1] === ""){
            if(value !== "and" && value !== "or"){ return false; }
        }else if(val[0] === __zen('src').toLowerCase() || val[0] === __zen('dest').toLowerCase()){

            if(val[1].indexOf(":") === -1){
                if(validIPForm(val[1])===false){
                    prt_errMsg_label(get_msg("err_ip"),"err_msg");
                    return false;
                }
            }else{
                if(validIPv6Form(val[1])===false){
                    prt_errMsg_label(get_msg("err_ip"),"err_msg");
                    return false;
                }
            }
        }else if(val[0] === __zen('src_port').toLowerCase() || val[0] === __zen('dest_port').toLowerCase()){
            if(!ValidNum(Number(val[1]))){ prt_errMsg_label(get_msg('err_form'),"err_msg"); return false; }
            if(!LengthCheck(val[1], 1, 65535)){ prt_errMsg_label(ValidLimit(1, 65535),"err_msg"); return false; }
        }else if(val[0] === __zen('protocol').toLowerCase()){
            if(ValidNum(Number(val[1]))){
                if(!LengthCheck(val[1], 0, 255)){ prt_errMsg_label(ValidLimit(0, 255),"err_msg"); return false; }
            }
        }else if(val[0] !== __zen('desc').toLowerCase() && val[0] !== __zen('summary').toLowerCase()){
            return false;
        }
        Ext.getCmp("err_msg").hide();
        return true;
    },

    query_detail: function(type, val) {
        var me = Ext.getCmp("NFW2_log");
        if(val === ""){ return false; }
        var _val = '';

        if(type === "sip" || type === "dip"){

            var text = (type==="sip")?__zen('src'):__zen('dest');
            if(val.indexOf("(") !== -1){
                var av = val.split("(");
                if(av[0] !== "0.0.0.0"){
                    $("#tagedit-input").val(text+"="+av[0]);
                    $("#tagedit-input").trigger('transformToTag');
                }
                if(av[1] !== "0)"){
                    var _port = (type==="sip")?__zen('src_port'):__zen('dest_port');
                    $("#tagedit-input").val(_port+"="+av[1].substring(0,av[1].length-1));
                    $("#tagedit-input").trigger('transformToTag');
                }
                return false;
            }
        }
        var text = (type==='protocol')?__zen('protocol'):(type==="desc")?__zen('desc'):(type==='summary')?__zen('summary'):"";

        _val = text+"="+val;
        $("#tagedit-input").val(text+"="+val);
        $("#tagedit-input").trigger('transformToTag');
    },

    log_celldbclick: function(cellIndex, record) {
        var show_mode = Ext.getCmp("show_mode").getValue();
        var _val = '';

        if(show_mode === 1){
            if(cellIndex === 3){
                var sip = record.data.sip;
                var sport = record.data.sport;

                if(sip !== "0.0.0.0"){
                    $("#tagedit-input").val(__zen('src')+"="+sip);
                    $("#tagedit-input").trigger('transformToTag');
                }
                if(sport !== 0){
                    $("#tagedit-input").val(__zen('src_port')+"="+sport);
                    $("#tagedit-input").trigger('transformToTag');
                }
                return false;
            }else if(cellIndex === 5){
                var dip = record.data.dip;
                var dport = record.data.dport;

                if(dip !== "0.0.0.0"){
                    $("#tagedit-input").val(__zen('dest')+"="+dip);
                    $("#tagedit-input").trigger('transformToTag');
                }
                if(dport !== 0){
                    $("#tagedit-input").val(__zen('dest_port')+"="+dport);
                    $("#tagedit-input").trigger('transformToTag');
                }
                return false;
            }else if(cellIndex === 10){
                _val = __zen('summary')+"="+record.data.description;
            }
        }else{
            if(cellIndex === 2){
                var sip = record.data.sip;

                if(sip === "0.0.0.0"){ return false; }
                _val = __zen('src')+"="+sip;
            }else if(cellIndex === 3){
                var sport = record.data.sport;

                if(sport === 0){ return false; }
                _val = __zen('src_port')+"="+sport;
            }else if(cellIndex === 4){
                var dip = record.data.dip;

                if(dip === "0.0.0.0"){ return false; }
                _val = __zen('dest')+"="+dip;
            }else if(cellIndex === 5){
                var dport = record.data.dport;

                if(dport === 0){ return false; }
                _val = __zen('dest_port')+"="+dport;
            }else if(cellIndex === 8){
                _val = __zen('protocol')+"="+getProtocol(record.data.protocol);
            }else if(cellIndex === 9){
                _val = __zen('summary')+"="+record.data.description;
            }
        }
        if(_val === ""){ return false; }
        $("#tagedit-input").val(_val);
        $("#tagedit-input").trigger('transformToTag');
    }

});