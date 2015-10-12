
Ext.define('NFW2.view.NFW2_log_logSearch_waf', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_log_logsearch_waf',

    requires: [
        'NFW2.view.NFW2_log_logSearch_wafViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.button.Button',
        'Ext.form.field.Date',
        'Ext.form.field.Time',
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.form.field.Radio'
    ],

    viewModel: {
        type: 'nfw2_log_logsearch_waf'
    },
    id: 'NFW2_log',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
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
                                    text: '날짜'
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
                                            text: '당일',
                                            listeners: {
                                                click: 'onBtn_todayClick'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 5',
                                            allowDepress: false,
                                            text: '전일',
                                            listeners: {
                                                click: 'onButtonClick9'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 5',
                                            allowDepress: false,
                                            text: '7일',
                                            listeners: {
                                                click: 'onButtonClick8'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 5',
                                            allowDepress: false,
                                            text: '10일',
                                            listeners: {
                                                click: 'onButtonClick7'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 5',
                                            allowDepress: false,
                                            text: '15일',
                                            listeners: {
                                                click: 'onButtonClick6'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 5',
                                            allowDepress: false,
                                            text: '1개월',
                                            listeners: {
                                                click: 'onButtonClick5'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 5',
                                            allowDepress: false,
                                            text: '3개월',
                                            listeners: {
                                                click: 'onButtonClick4'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 5',
                                            allowDepress: false,
                                            text: '6개월',
                                            listeners: {
                                                click: 'onButtonClick3'
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
                                            fieldLabel: '',
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
                    layout: 'table',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'count',
                            fieldLabel: '출력개수',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            value: 100,
                            editable: false,
                            displayField: 'val',
                            store: 'store_logsearch_count',
                            valueField: 'val'
                        },
                        {
                            xtype: 'combobox',
                            id: 'sort',
                            padding: '0 0 0 20',
                            fieldLabel: '정렬방식',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            value: 'desc',
                            editable: false,
                            displayField: 'name',
                            store: 'store_logsearch_sort',
                            valueField: 'val'
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
                            id: 'btn_down',
                            enableToggle: true,
                            text: '상세검색',
                            listeners: {
                                toggle: 'onBtn_downToggle'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    hidden: true,
                    id: 'con_more',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'timefield',
                                    id: 'time_start',
                                    padding: '0 0 0 125',
                                    width: 200,
                                    fieldLabel: '특정시간',
                                    labelSeparator: ' ',
                                    value: '00:00',
                                    format: 'H:i',
                                    increment: 1,
                                    submitFormat: 'H:i'
                                },
                                {
                                    xtype: 'label',
                                    padding: '0 5 0 5',
                                    text: '~'
                                },
                                {
                                    xtype: 'timefield',
                                    id: 'time_end',
                                    width: 100,
                                    value: '23:59',
                                    format: 'H:i',
                                    increment: 1,
                                    submitFormat: 'H:i'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'machin_name',
                                    padding: '0 0 0 125',
                                    fieldLabel: '장비 이름',
                                    labelSeparator: ' ',
                                    emptyText: '전체',
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'store_logsearch_name',
                                    valueField: 'name'
                                },
                                {
                                    xtype: 'label',
                                    cls: 'lb_info',
                                    hidden: true,
                                    id: 'info_name',
                                    text: 'A.B.C.D 장비로 로그를 동기화 중입니다. 동기화중에는 Slave 장비로 로그가 저장되지 않습니다.'
                                }
                            ]
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
                                    xtype: 'container',
                                    flex: 1.2,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            width: 125,
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: '상세검색'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            style: '',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'treepanel',
                                                    flex: 1,
                                                    height: 190,
                                                    id: 'grid_event',
                                                    style: 'border:1px solid #ccc;',
                                                    title: '이벤트',
                                                    store: 'store_logsearch_system_event',
                                                    animate: true,
                                                    listeners: {
                                                        checkchange: 'onTreepanelCheckChange'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    margin: '0 0 0 10',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    height: 100,
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'gridpanel',
                                                            flex: 1,
                                                            id: 'grid_search',
                                                            style: 'border:1px solid #ccc;',
                                                            title: '',
                                                            hideHeaders: true,
                                                            store: 'store_logsearch_system_search_list',
                                                            columns: [
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    dataIndex: 'text',
                                                                    text: 'String',
                                                                    flex: 1
                                                                }
                                                            ]
                                                        }
                                                    ]
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
                                                            xtype: 'radiofield',
                                                            id: 'r_and',
                                                            width: 80,
                                                            fieldLabel: '',
                                                            name: 'r_ao',
                                                            boxLabel: 'AND',
                                                            checked: true
                                                        },
                                                        {
                                                            xtype: 'radiofield',
                                                            id: 'r_or',
                                                            width: 80,
                                                            fieldLabel: '',
                                                            name: 'r_ao',
                                                            boxLabel: 'OR'
                                                        },
                                                        {
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            id: 'com_type',
                                                            fieldLabel: '',
                                                            value: 'sip',
                                                            editable: false,
                                                            displayField: 'name',
                                                            store: 'store_logsearch_waf_search',
                                                            valueField: 'val',
                                                            listeners: {
                                                                change: 'onCom_moreChange'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            disabled: true,
                                                            id: 'com_protocol',
                                                            margin: '0 0 0 5',
                                                            fieldLabel: '',
                                                            editable: false,
                                                            emptyText: 'select',
                                                            displayField: 'name',
                                                            store: 'store_logsearch_system_protocol',
                                                            valueField: 'val'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    margin: '5 0 0 0',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            flex: 1,
                                                            id: 'val',
                                                            margin: '0 0 0 5',
                                                            fieldLabel: '',
                                                            emptyText: '검색 조건을 입력하세요.'
                                                        }
                                                    ]
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
                                                            xtype: 'button',
                                                            cls: 'btn_b',
                                                            margin: '0 0 0 5',
                                                            iconCls: 'icb_add',
                                                            text: '추가',
                                                            listeners: {
                                                                click: 'onButtonClick1'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            cls: 'btn_b',
                                                            margin: '0 0 0 5',
                                                            iconCls: 'icb_del',
                                                            text: '삭제',
                                                            listeners: {
                                                                click: 'onButtonClick2'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
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
                            id: 'err_msg'
                        },
                        {
                            xtype: 'radiofield',
                            id: 'display',
                            margin: '0 0 0 5',
                            fieldLabel: '',
                            name: 'display_type',
                            boxLabel: '화면에 출력',
                            checked: true
                        },
                        {
                            xtype: 'radiofield',
                            id: 'excel',
                            margin: '0 5 0 5',
                            fieldLabel: '',
                            name: 'display_type',
                            boxLabel: '파일에 출력'
                        },
                        {
                            xtype: 'button',
                            cls: 'btn_b',
                            iconCls: 'icb_ser',
                            text: '검색',
                            listeners: {
                                click: 'onButtonClick'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'container',
            id: 'cont_log_grid',
            margin: '5 0 0 0'
        }
    ],
    listeners: {
        afterrender: 'onPanelAfterRender',
        destroy: 'onNFW2_log_logSearch_wafDestroy'
    },

    onBtn_todayClick: function(button, e, eOpts) {
        var date = new Date();

        Ext.getCmp("search_start").setValue(date);
        Ext.getCmp("search_end").setValue(date);
    },

    onButtonClick9: function(button, e, eOpts) {
        var less = Ext.Date.add(Ext.getCmp("search_start").getValue(),Ext.Date.DAY,-1);

        Ext.getCmp("search_start").setValue(less);
    },

    onButtonClick8: function(button, e, eOpts) {
        var less = Ext.Date.add(Ext.getCmp("search_start").getValue(),Ext.Date.DAY,-7);

        Ext.getCmp("search_start").setValue(less);
    },

    onButtonClick7: function(button, e, eOpts) {
        var less = Ext.Date.add(Ext.getCmp("search_start").getValue(),Ext.Date.DAY,-10);

        Ext.getCmp("search_start").setValue(less);
    },

    onButtonClick6: function(button, e, eOpts) {
        var less = Ext.Date.add(Ext.getCmp("search_start").getValue(),Ext.Date.DAY,-15);

        Ext.getCmp("search_start").setValue(less);
    },

    onButtonClick5: function(button, e, eOpts) {
        var less = Ext.Date.add(Ext.getCmp("search_start").getValue(),Ext.Date.MONTH,-1);

        Ext.getCmp("search_start").setValue(less);
    },

    onButtonClick4: function(button, e, eOpts) {
        var less = Ext.Date.add(Ext.getCmp("search_start").getValue(),Ext.Date.MONTH,-3);

        Ext.getCmp("search_start").setValue(less);
    },

    onButtonClick3: function(button, e, eOpts) {
        var less = Ext.Date.add(Ext.getCmp("search_start").getValue(),Ext.Date.MONTH,-6);

        Ext.getCmp("search_start").setValue(less);
    },

    onBtn_downToggle: function(button, pressed, eOpts) {
        if(pressed){
            Ext.getCmp("con_more").show();
        }else{
            Ext.getCmp("con_more").hide();
        }
    },

    onTreepanelCheckChange: function(node, checked, eOpts) {
        if(node.childNodes){
            for(var i in node.childNodes){
                node.childNodes[i].set('checked',checked);

                if(node.childNodes[i].childNodes){
                    for(var l in node.childNodes[i].childNodes){
                        node.childNodes[i].childNodes[l].set('checked',checked);
                    }
                }
            }
        }
    },

    onCom_moreChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === 'protocol'){
            Ext.getCmp("com_protocol").enable().reset();
            Ext.getCmp("val").disable().reset();
        }else{
            Ext.getCmp("com_protocol").disable().reset();
            Ext.getCmp("val").enable().reset();
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        var mode = (Ext.getCmp("r_and").getValue())?"and":"or";
        var type = Ext.getCmp("com_type");
        var protocol = Ext.getCmp("com_protocol");
        var val = Ext.getCmp("val");
        var m_type = "";

        var _store = Ext.data.StoreManager.lookup("store_logsearch_system_search_list");

        if(type.getValue() !== "protocol" && val.getValue() === ""){

            prt_errMsg_label(get_msg("err_null"),"err_msg");
            val.focus();
            return false;
        }

        if(val.getValue().substring(0,1) !== "!"){

            if(me.m_type === "query"){ Ext.Msg.alert("WeGuardia™ ZEN","추가형식이 맞지않습니다."); return false; }

            if(type.getValue() === "sip" || type.getValue() === "dip" || type.getValue() === "xsip" || type.getValue() === "xdip"){

                if(val.getValue().indexOf(":") === -1){
                    if(validIPForm(val.getValue())===false){ prt_errMsg_label(get_msg("err_ip"),"err_msg"); val.focus(); return false; }
                }else{
                    if(validIPv6Form(val.getValue())===false){ prt_errMsg_label(get_msg("err_ip"),"err_msg"); val.focus(); return false; }
                }
            }else if(type.getValue() === "sport" || type.getValue() === "dport" || type.getValue() === "xsport" || type.getValue() === "xdport"){

                if(!ValidNum(val.getValue())){ prt_errMsg_label(get_msg('err_form'),"err_msg"); val.focus(); return false; }
                if(!LengthCheck(val.getValue(), 1, 65535)){ prt_errMsg_label(ValidLimit(1, 65535),"err_msg"); val.focus(); return false; }
            }else if(type.getValue() === "protocol"){

                if(protocol.getValue() === "" || protocol.getValue() === null){

                    prt_errMsg_label(ValidSelect("프로토콜"),"err_msg");
                    protocol.focus();
                    return false;
                }
            }else{

                if(!ValidNum(val.getValue())){ prt_errMsg_label(get_msg('err_form'),"err_msg"); val.focus(); return false; }
            }

            if(type.getValue() === "protocol"){
                var text = mode.toUpperCase()+" "+type.getRawValue()+" "+protocol.getRawValue();
            }else{
                var text = mode.toUpperCase()+" "+type.getRawValue()+" "+val.getValue();
            }
            m_type = "add";

        }else{

            if(me.m_type === "add"){ Ext.Msg.alert("WeGuardia™ ZEN","추가형식이 맞지않습니다."); return false; }

            text = val.getValue();
            m_type = "query";
        }

        Ext.getCmp("err_msg").hide();

        _store.add({
            'mode': mode,
            'type': type.getValue(),
            'text': text,
            'protocol': (type.getValue()==='protocol')?protocol.getValue():"",
            'val': val.getValue()
        });

        me.m_type = m_type;

        val.reset();
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = this;
        var grid = Ext.getCmp("grid_search");
        var store = Ext.data.StoreManager.lookup("store_logsearch_system_search_list");

        store.remove(grid.getSelectionModel().getSelection()[0]);

        if(store.data.length === 0){
            me.m_type = "";
        }
    },

    onButtonClick: function(button, e, eOpts) {
        var date_s = Ext.getCmp("search_start");
        var date_e = Ext.getCmp("search_end");

        if(date_s.getSubmitValue() > date_e.getSubmitValue()){
            prt_errMsg_label('날짜 '+get_msg('err_than'), "err_msg");
            date_s.focus();
            return false;
        }

        var time_s = Ext.getCmp("time_start");
        var time_e = Ext.getCmp("time_end");

        if(time_s.isValid()===false){
            prt_errMsg_label(get_msg('err_form'),'err_msg');
            time_s.focus();
            return false;
        }

        if(time_e.isValid()===false){
            prt_errMsg_label(get_msg('err_form'),'err_msg');
            time_e.focus();
            return false;
        }

        var st = time_s.getSubmitValue();
        var et = time_e.getSubmitValue();

        if(st !== null && et === null){

            prt_errMsg_label(get_msg('err_null'), "err_msg");
            time_e.focus();
            return false;
        }else if(st === null && et !== null){

            prt_errMsg_label(get_msg('err_null'), "err_msg");
            time_s.focus();
            return false;
        }

        if(st !== null && et !== null){

            if(st > et){

                prt_errMsg_label('시간 '+get_msg('err_than'), "err_msg");
                time_s.focus();
                return false;

            }
        }

        Ext.getCmp("err_msg").hide();

        var store = Ext.data.StoreManager.lookup('store_log_waf');

        var _start = Ext.Date.format(Ext.getCmp('search_start').getValue(), 'Y-m-d')+' '+st+':00';

        var _end = Ext.Date.format(Ext.getCmp('search_end').getValue(), 'Y-m-d')+' '+et+':00';

        var _sort = Ext.getCmp('sort').getValue() === 'asc' ? 1 : -1;

        var _limit = Ext.getCmp("count").getValue();

        var tree = Ext.getCmp("grid_event");

        var name = Ext.getCmp("machin_name").getValue();

        var _detailSearch = Ext.getCmp('grid_search').getStore().data;

        var _andSearch = [];
        var _orSearch = [];
        var _and = {};
        var _or = {};

        for(var i in _detailSearch.items){
            var _mode = _detailSearch.items[i].data.mode;
            var _type = _detailSearch.items[i].data.type;
            var _val = "";

            if(_type === "protocol"){
                _val = _detailSearch.items[i].data.protocol;
            }else{
                _val = _detailSearch.items[i].data.val;
            }

            if(_mode === 'and'){
                eval("_andSearch.push({ "+_type+" : _val });");
            }else{
                eval("_orSearch.push({ "+_type+" : _val });");
            }
        }

        for(var i=0; i<tree.getChecked().length; i++){
            var raw = tree.getChecked()[i].raw;

            if(raw.event){
                _orSearch.push({ 'event': parseInt('0x'+raw.event) });
            }
        }

        if(name !== null){
            _orSearch.push({ 'name': name });
        }

        if(_andSearch.length !== 0){

            if(_orSearch.length !== 0){
                _andSearch.push({
                    'or': _orSearch
                });
                _orSearch = [];
            }
        }

        //검색 조건 매개변수
        var _search_params = {};

        _search_params['schema_name'] = Ext.encode('WAF');
        _search_params['start_ts'] = Ext.encode(_start);
        _search_params['end_ts'] = Ext.encode(_end);
        _search_params['orderby'] = Ext.encode(_sort);

        _search_params['limit'] = Ext.encode(Number(_limit));

        if(_andSearch.length > 0 && _orSearch.length > 0){
            _search_params['criteria'] = Ext.encode({
                and : _andSearch,
                or : _orSearch
            });
        }else if(_andSearch.length > 0 && _orSearch.length === 0){
            _search_params['criteria'] = Ext.encode({
                and : _andSearch
            });
        }else if(_andSearch.length === 0 && _orSearch.length > 0){
            _search_params['criteria'] = Ext.encode({
                or : _orSearch
            });
        }

        if(Ext.getCmp("display").getValue()){

            //로그 검색 그리드 템플릿 생성 시작
            var _grid = DMC_LOG_VIEW.make_log_search_grid_tpl(_search_params, store);
            //로그 검색 그리드 템플릿 생성 끝

            // var grid = Ext.create(_grid_tpl, {
            //     id: 'id_grid_data',
            //     scroll : 'both',
            //     autoScroll : true,
            //     collapsible: true,
            //     animCollapse: false,
            //     plugins: [{
            //         ptype: 'rowexpander',
            //         rowBodyTpl : new Ext.XTemplate(
            //             '<p><b>Company:</b> 1</p>'
            //             )
            //     }]
            //     //dockedItems : [_toolbar]
            // });

            Ext.getCmp('cont_log_grid').removeAll();

            Ext.getCmp('cont_log_grid').add({

                items: [_grid],
                layout: 'fit',
                border: false

            });


        }else{

            var fileName = Ext.Date.format(new Date(), 'Ymd')+"_WAF.xlsx";
            var path = '/mnt/ramdisk/do/F3view/nodeapps/deploy/public/javascripts/attachments/';

            var _condition = {
                schema_name: Ext.encode('WAF'),
                cirteria: Ext.encode(_search_params.criteria),
                start_ts: Ext.encode(_start),
                end_ts: Ext.encode(_end),
                orderby: Ext.encode(_sort),
                excelfile: Ext.encode(path+fileName),
                limit: Ext.encode(Number(_limit))
            };

            showLoadMask();

            request_helper.xmlrpc_call_Ajax_Post(
                'FtDBMgr',
                'searchExcel',
                _condition,
                function(retval){

                    hideLoadMask();
                    document.location.href = '/fileDownloadCommon?filePath='+ Ext.encode(path)+"&fileName="+Ext.encode(fileName)+"&filePathFlag="+Ext.encode('true');

                }
            );
        }
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        Ext.getCmp("search_start").setValue(new Date());
        Ext.getCmp("search_end").setValue(new Date());

        var _params = {
            search_info: Ext.encode({'type':'mod_type','value':'waf'})
        };

        var list = [];

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'findLogEventInfo',
            _params,
            function(response){

                if(!response){ return false; }

                for(var i=0; i<response.length; i++){

                    var submenu = [];

                    for(var l=0; l<response[i].sublist.length; l++){

                        var sublist = response[i].sublist[l];

                        submenu.push({
                            text: sublist.subclass,
                            expanded: true,
                            leaf: true,
                            checked: false,
                            event: sublist.event_code
                        });
                    }

                    list.push({
                        text: response[i].log_type,
                        expanded: true,
                        leaf: false,
                        checked: false,
                        children: submenu
                    });
                }

                var root = {
                    text: '전체',
                    expanded: true,
                    checked:false,
                    children: list
                };

                var store = Ext.data.StoreManager.lookup("store_logsearch_system_event");
                store.setRootNode(root);
            }
        );

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'isCC',
            {},
            function(response){

                me.cc = response;

                if(response === true){
                    Ext.getCmp("machin_name").hide();
                }else{

                    var _param = {
                        basename: Ext.encode('network_ha_sync')
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'getObject',
                        _param,
                        function(response){

                            if(!response){ return false; }

                            me.log_use = response.log.use;

                            if(response.log.use === "1"){

                                var store = Ext.data.StoreManager.lookup("store_logsearch_name");

                                var record = [];

                                if(response.log.mode != "s"){
                                    record.push({ 'name': response.log.mname },{ 'name': response.log.sname });
                                }else{
                                    Ext.getCmp("machin_name").disable();
                                    Ext.getCmp("info_name").show();
                                }

                                store.loadData(record);
                            }else{
                                Ext.getCmp("machin_name").hide();
                            }
                        }
                    );
                }
            }
        );
    },

    onNFW2_log_logSearch_wafDestroy: function(component, eOpts) {
        Ext.data.StoreManager.lookup("store_logsearch_system_search_list").removeAll();
    }

});