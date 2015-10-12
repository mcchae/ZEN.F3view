
Ext.define('NFW2.view.NFW2_firewall_profile_filtering_group', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_firewall_profile_filtering_group',

    requires: [
        'NFW2.view.NFW2_firewall_profile_filtering_groupViewModel',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.Text',
        'Ext.button.Button',
        'Ext.toolbar.Separator',
        'Ext.form.Panel',
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.tree.Column'
    ],

    viewModel: {
        type: 'nfw2_firewall_profile_filtering_group'
    },
    id: 'urlGroup',
    defaultListenerScope: true,

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            cls: 'zen_toolbar',
            items: [
                {
                    xtype: 'textfield',
                    id: 'search',
                    fieldLabel: '',
                    emptyText: 'URL',
                    enableKeyEvents: true,
                    listeners: {
                        keydown: 'onSearchKeydown'
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'ic_ser',
                    listeners: {
                        click: 'onButtonClick1'
                    }
                },
                {
                    xtype: 'button',
                    hidden: true,
                    id: 'btn_next',
                    text: 'Next',
                    listeners: {
                        click: 'onButtonClick2'
                    }
                },
                {
                    xtype: 'tbseparator'
                },
                {
                    xtype: 'button',
                    componentCls: 'btn_auth',
                    iconCls: 'ic_add',
                    bind: {
                        text: '{create_db}'
                    },
                    listeners: {
                        click: 'onButtonClick'
                    }
                },
                {
                    xtype: 'button',
                    componentCls: 'btn_auth',
                    hidden: true,
                    id: 'b_group',
                    bind: {
                        text: '{save_db}'
                    },
                    listeners: {
                        click: 'onB_groupClick'
                    }
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'form',
            id: 'fm_urlGroup',
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'treepanel',
                            height: 536,
                            id: 'tree_url',
                            width: 240,
                            hideHeaders: true,
                            store: 'store_profile_group',
                            viewConfig: {
                                rootVisible: false
                            },
                            columns: [
                                {
                                    xtype: 'treecolumn',
                                    dataIndex: 'text',
                                    flex: 1
                                }
                            ],
                            listeners: {
                                cellclick: 'onTree_urlCellClick',
                                celldblclick: 'onTree_urlCellDblClick'
                            }
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'panel',
                                    id: 'group_p',
                                    width: 640,
                                    items: [
                                        {
                                            xtype: 'container',
                                            listeners: {
                                                afterrender: 'onContainerAfterRender1'
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
    ],
    listeners: {
        afterrender: 'onUrlGroupAfterRender',
        beforerender: 'onUrlGroupBeforeRender'
    },

    onSearchKeydown: function(textfield, e, eOpts) {
        if(e.getCharCode() === 13){
            this.onButtonClick1();
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        var search = Ext.getCmp("search").getValue();
        var me = Ext.getCmp("urlGroup");

        showLoadMask();

        var _params = {
            keyword: Ext.encode(search)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'findFwProfileCateDB',
            _params,
            function(response){

                hideLoadMask();

                if(response.list.length === 0){
                    Ext.MessageBox.alert(__weguardia,get_msg('err_url'));
                    return false;
                }

                var _store = Ext.data.StoreManager.lookup("store_profile_group");
                var _grid = Ext.getCmp("tree_url");
                var fir = response.list[0];
                var id = '';

                if(fir === 0 || fir === 1 || fir === 119){
                    id = (fir===0)?'1':(fir===1)?'2':'13';
                }else if(fir >= 2 && fir <= 21){
                    id = '3';
                }else if(fir >= 22 && fir <= 31){
                    id = '4';
                }else if(fir >= 32 && fir <= 50){
                    id = '5';
                }else if(fir >= 51 && fir <= 68){
                    id = '6';
                }else if(fir >= 69 && fir <= 76){
                    id = '7';
                }else if(fir >= 77 && fir <= 84){
                    id = '8';
                }else if(fir >= 85 && fir <= 93){
                    id = '9';
                }else if(fir >= 94 && fir <= 102){
                    id = '10';
                }else if(fir >= 103 && fir <= 105){
                    id = '11';
                }else if(fir >= 106 && fir <= 118){
                    id = '12';
                }else if(fir >= 120 && fir <= 139){
                    id = '14';
                }else if(fir >= 201 && fir <= 250){
                    id = '15';
                }

                me.ser_num = 0;
                me.ser_count = 0;
                me.search_str = search;

                _store.root.childNodes[Number(id)-1].expand();
                var fin = _grid.getRootNode().findChild("idex",fir,true);
                _grid.getSelectionModel().select(fin);
                me.get_dburl(fin,search,fir);

                var ar_search = [];

                for(var i in response.list){
                    fir = response.list[i];

                    if(fir === 0 || fir === 1 || fir === 119){
                        id = (fir===0)?'1':(fir===1)?'2':'13';
                    }else if(fir >= 2 && fir <= 21){
                        id = '3';
                    }else if(fir >= 22 && fir <= 31){
                        id = '4';
                    }else if(fir >= 32 && fir <= 50){
                        id = '5';
                    }else if(fir >= 51 && fir <= 68){
                        id = '6';
                    }else if(fir >= 69 && fir <= 76){
                        id = '7';
                    }else if(fir >= 77 && fir <= 84){
                        id = '8';
                    }else if(fir >= 85 && fir <= 93){
                        id = '9';
                    }else if(fir >= 94 && fir <= 102){
                        id = '10';
                    }else if(fir >= 103 && fir <= 105){
                        id = '11';
                    }else if(fir >= 106 && fir <= 118){
                        id = '12';
                    }else if(fir >= 120 && fir <= 139){
                        id = '14';
                    }else if(fir >= 201 && fir <= 250){
                        id = '15';
                    }

                    ar_search.push({
                        'category': id,
                        'num': response.list[i]
                    });
                }

                me.ar_search = ar_search;

                if(response.list_total > 1){
                    Ext.getCmp("btn_next").show();
                }
            }
        );
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = Ext.getCmp("urlGroup");

        var num = me.ser_num;
        var search_str = me.search_str;
        var ser_category = me.ser_category;

        me.selectRangeStr(search_str,num,'next');
    },

    onButtonClick: function(button, e, eOpts) {
        showLoadMask();
        var _params = {};

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setFwProfileURLDB',
            _params,
            function(response){
                hideLoadMask();
                Ext.MessageBox.alert(__weguardia,get_msg('msg_url_db'));
            }
        );
    },

    onB_groupClick: function(button, e, eOpts) {
        var me = Ext.getCmp("urlGroup");

        var List = [];

        var urlList = document.getElementById("urlLists").value.split("\n");

        for(var i=0; i<urlList.length; i++){
            List.push(urlList[i]);
        }

        if(List.length === 1 && List[0] === ''){
            List[0] = ' ';
        }

        var _params = {
            category_num: Ext.encode(Number(me._id)),
            url_list: Ext.encode(List)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setFwProfileURL',
            _params,
            function(response){

                Ext.Msg.show({
                    title: __weguardia,
                    msg: get_msg("msg_ok_add"),
                    width: 300,
                    buttons: Ext.Msg.YES,
                    icon: Ext.window.MessageBox.INFO
                });
            }
        );
    },

    onTree_urlCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(record.data.idex){
            this.get_dburl(record);
        }
    },

    onTree_urlCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(record.data._id === 15){

            var win = Ext.create('NFW2.view.win_profile_group',{
                name: record.data.text,
                idex: record.data.idex,
                record: record
            });
            win.show();
        }
    },

    onContainerAfterRender1: function(component, eOpts) {
        component.update("<textarea id='urlLists' wrap='off' spellcheck='false' style='width:640px; height:500px; ime-mode:disabled; overflow:auto; font:11px/18px verdana; background:url(../images/textarea_bg.gif); overflow:auto; border:1px solid #fff; ime-mode:disabled; color:#003366; padding-left:3px;' readonly></textarea>");
    },

    onUrlGroupAfterRender: function(component, eOpts) {
        var me = Ext.getCmp("urlGroup");
        var bro = navigator.userAgent;

        if(bro.indexOf("Trident") !== -1){
            me.bro = "ie";
        }
    },

    onUrlGroupBeforeRender: function(component, eOpts) {
        var me = this;

        var menu = Ext.getCmp("menu");

        var _params = {
            category_num: Ext.encode(0)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getFwProfileURL',
            _params,
            function(response){

                var list = (response.list)?response.list:[];
                document.getElementById("urlLists").readOnly = true;
                Ext.getCmp("b_group").hide();

                document.getElementById("urlLists").value = list.join("\r\n");

            }
        );

        var _param = {
            name: Ext.encode('category_db')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_fw_profile_web_db',
            _param,
            function(response){

                hideLoadMask();

                var List = "";

                var menu = [];
                var id = 1;
                for(var i in response){

                    var submenu = [];
                    for(var l in response[i].list){
                        var _name = (__zen_locale==='ko')?response[i].list[l].name[0]:(__zen_locale==="en")?response[i].list[l].name[1]:(__zen_locale==="jp")?response[i].list[l].name[2]:'';

                        if(Number(l) === 0){

                            Ext.getCmp("group_p").setTitle(_name);
                        }
                        if(Number(l) > 200 && Number(l) <= 250){
                            _name = response[i].list[l].name;
                        }
                        submenu.push({
                            text: l+". "+_name,
                            idex: l,
                            _id: id,
                            leaf: true
                        });
                    }

                    var g_name = (__zen_locale==='ko')?response[i].group_name[0]:(__zen_locale==="en")?response[i].group_name[1]:(__zen_locale==="jp")?response[i].group_name[2]:'';
                    menu.push({
                        text: g_name,
                        children: submenu
                    });
                    id++;
                }

                var root = {
                    text: __zen('all'),
                    expanded: true,
                    children: menu
                };

                var _store = Ext.data.StoreManager.lookup("store_profile_group");
                _store.setRootNode(root);

            }
        );
    },

    get_dburl: function(record, search, idex) {
        var me = Ext.getCmp("urlGroup");
        me._id = record.data.idex;
        Ext.getCmp("group_p").setTitle(record.data.text);

        showLoadMask();

        var _params = {
            category_num: Ext.encode(Number(record.data.idex))
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getFwProfileURL',
            _params,
            function(response){

                hideLoadMask();

                var list = (response.list)?response.list:[];

                if(record.data._id === 15){
                    document.getElementById("urlLists").readOnly = false;
                    Ext.getCmp("b_group").show();
                }else{
                    document.getElementById("urlLists").readOnly = true;
                    Ext.getCmp("b_group").hide();
                }
                document.getElementById("urlLists").value = list.join("\r\n");

                if(search){
                    me.selectRangeStr(search,idex);
                }
            }
        );
    },

    selectRangeStr: function(strVal, idex, next) {
        var me = Ext.getCmp("urlGroup");
        var ar_search = me.ar_search;
        var ser_count = me.ser_count;

        var _grid = Ext.getCmp("tree_url");
        var _store = _grid.getStore();
        var rng = document.getElementById("urlLists");
        var index = rng.value.indexOf(strVal,idex);

        if(index !== -1){

            me.ser_num = index+strVal.length;

            if(me.bro === "ie"){
                var range = rng.createTextRange();
                range.collapse(true);

                range.moveStart('character', index);
                range.moveEnd('character', strVal.length);
                range.select();
            }else{
                rng.setSelectionRange(index,(index+strVal.length));
                rng.focus();
            }
        }else{
            if(next === 'next'){
                if(ar_search.length > ser_count+1){
                    var ser = ar_search[ser_count+1];

                    _store.root.childNodes[Number(ser.category)-1].expand();
                    var fin = _grid.getRootNode().findChild("idex",ser.num,true);
                    _grid.getSelectionModel().select(fin);
                    me.get_dburl(fin,strVal,idex);

                    me.ser_num = 0;
                    me.ser_count = ser_count+1;
                }else{
                    Ext.MessageBox.alert(__weguardia,get_msg('err_url'));
                    Ext.getCmp("con_next").hide();
                }
            }
        }
    }

});