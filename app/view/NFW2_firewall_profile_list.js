
Ext.define('NFW2.view.NFW2_firewall_profile_list', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_firewall_profile_list',

    requires: [
        'Ext.button.Button',
        'Ext.form.FieldSet',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.XTemplate',
        'Ext.view.Table',
        'Ext.toolbar.Paging'
    ],

    cls: 'zen_body',
    id: 'NFW2_applist',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onPanelAfterRender'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            cls: 'zen_toolbar',
            items: [
                {
                    xtype: 'button',
                    iconCls: 'ic_add',
                    listeners: {
                        click: 'onButtonClick',
                        beforerender: 'onButtonBeforeRender'
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'ic_del',
                    listeners: {
                        click: 'onButtonClick1',
                        beforerender: 'onButtonBeforeRender1'
                    }
                },
                {
                    xtype: 'button',
                    componentCls: 'btn_auth',
                    listeners: {
                        click: 'onButtonClick2',
                        beforerender: 'onButtonBeforeRender2'
                    }
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'fieldset',
            margin: 5,
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
                            flex: 1,
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
                    margin: '5 0 0 0',
                    layout: 'column',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'search_name',
                            labelSeparator: ' ',
                            labelWidth: 130,
                            enableKeyEvents: true,
                            listeners: {
                                keyup: 'onSearch_nameKeyup',
                                beforerender: 'onSearch_nameBeforeRender'
                            }
                        },
                        {
                            xtype: 'button',
                            cls: 'btn_b',
                            margin: '0 0 0 5',
                            iconCls: 'icb_ser',
                            listeners: {
                                click: 'onButtonClick3'
                            }
                        },
                        {
                            xtype: 'button',
                            cls: 'btn_b',
                            hidden: true,
                            id: 'btn_reset',
                            margin: '0 0 0 5',
                            iconCls: 'icb_reset',
                            listeners: {
                                click: 'onButtonClick4'
                            }
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'chk_app',
                            style: 'float: right',
                            listeners: {
                                change: 'onCheckboxfieldChange',
                                beforerender: 'onChk_appBeforeRender'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'gridpanel',
            margin: '5 0 0 0',
            columnLines: true,
            store: 'store_profile_ref_list',
            columns: [
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(value !== 'user'){ return ''; }
                        return '<input type="checkbox" name="_chk[]" value="'+record.data.rid+'" />';
                    },
                    resizable: false,
                    width: 50,
                    sortable: false,
                    align: 'center',
                    dataIndex: '_type',
                    hideable: false,
                    menuDisabled: true,
                    renderTpl: [
                        '<div id="{id}-titleEl" data-ref="titleEl" {tipMarkup}class="x-column-header-inner">',
                        '<span id="{id}-textEl" data-ref="titleEl" class="x-column-header-text{childElCls}">',
                        '<input type="checkbox" name="allcheckbox" id="all_chk" onclick="all_checkbox(this.checked)"/>',
                        '</span>',
                        '<tpl if="!menuDisabled">',
                        '<div id="{id}-triggerEl" data-ref="titleEl" class="x-column-header-trigger{childElCls}"></div>',
                        '</tpl>',
                        '</div>',
                        '{%this.renderContainer(out,values)%}'
                    ],
                    tdCls: 'x-grid-cell-special x-grid-cell-row-checker'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'name',
                    flex: 1,
                    listeners: {
                        beforerender: 'onGridcolumnBeforeRender'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'category',
                    flex: 1,
                    listeners: {
                        beforerender: 'onGridcolumnBeforeRender1'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'technology',
                    flex: 1,
                    listeners: {
                        beforerender: 'onGridcolumnBeforeRender2'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'purpose',
                    flex: 1,
                    listeners: {
                        beforerender: 'onGridcolumnBeforeRender3'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return '<button class="ic_star_'+value+'" />';
                    },
                    width: 100,
                    dataIndex: 'popularity',
                    listeners: {
                        beforerender: 'onGridcolumnBeforeRender4'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'content_type',
                    flex: 1,
                    listeners: {
                        beforerender: 'onGridcolumnBeforeRender5'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'released_date',
                    flex: 1,
                    listeners: {
                        beforerender: 'onGridcolumnBeforeRender6'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'vendor',
                    flex: 1,
                    listeners: {
                        beforerender: 'onGridcolumnBeforeRender7'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'protocols',
                    flex: 1,
                    listeners: {
                        beforerender: 'onGridcolumnBeforeRender8'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return '<button class="icf_Accept" style="border:none"/>';
                    },
                    align: 'center',
                    dataIndex: 'protocols',
                    flex: 0.5,
                    listeners: {
                        beforerender: 'onGridcolumnBeforeRender9'
                    }
                }
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: 360,
                    displayInfo: true,
                    store: 'store_profile_ref_list'
                }
            ],
            listeners: {
                celldblclick: 'onGridpanelCellDblClick',
                cellclick: 'onGridpanelCellClick',
                headerclick: 'onGridpanelHeaderClick'
            }
        }
    ],

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

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
        _store.getProxy().url = '/api/ftuctrl/findAppList';
        _store.getProxy().setExtraParam('filter_type',Ext.encode('filter_based'));
        _store.getProxy().setExtraParam('search_info',Ext.encode(search));
        _store.getProxy().setExtraParam('data_type',Ext.encode('all'));
        _store.getProxy().setExtraParam('limit',Ext.encode(100));
        _store.pageSize = 100;
        _store.currentPage = 1;
        _store.load(function(){
            hideLoadMask();
            setTimeout(function(){ me.setWidth('100%'); },100);
        });

        var _param = {
            'filename': Ext.encode('/proc/ferret/datasheet/app_user_def')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getFileContent',
            _param,
            function(response){
                me.count = response[0];
            }
        );

        me.update_cnt();

        var _params = {
            basename : Ext.encode('mgt_app_filter_list')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){

                if(!response){ return false; }

                var l_list = ['category','technology','purpose','popularity','content_type','protocol','vendor','released'];

                for(var i=0; i<l_list.length; i++){
                    eval('var name = response.'+l_list[i]+';');
                    var j=0;
                    var record = [{ val: 'All' }];
                    for(var l in name){
                        record.push({ val: name[l] });
                        j++;
                    }
                    var _store = (l_list[i]==='content_type')?'content':l_list[i];
                    Ext.data.StoreManager.lookup("store_profile_"+_store).loadData(record);
                }
            }
        );
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        var _params = {
            'basename': Ext.encode('app_user_ref_list')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObjects',
            _params,
            function(response){

                if(response){
                    if(me.count < response.total-1){
                        Ext.Msg.alert(__weguardia,ValidMaxCnt(me.count));
                        return false;
                    }
                }

                var win = Ext.create('NFW2.view.win_applist');
                win.show();
            }
        );
    },

    onButtonBeforeRender: function(component, eOpts) {
        component.text = __zen('add');
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;
        var chk = document.getElementsByName("_chk[]");
        var del = [];

        for(var i=0; i<chk.length; i++){
            if(chk[i].checked === true)
                del.push(Number(chk[i].value));
        }

        if(del.length === 0){
            Ext.Msg.alert(__weguardia,get_msg("sel_del"));
        }else{
            Ext.MessageBox.confirm(__weguardia,get_msg("conf_del"),function(btn){
                if(btn === "yes"){

                    var _param = {
                        basename: Ext.encode("app_user_ref_list"),
                        ids: Ext.encode(del)
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'delListTypeObj',
                        _param,
                        function(response){

                            if(response.fail_total > 0){

                                var ar_use = [];
                                for(var i in response.fail_list){
                                    if(response.fail_list[i].reason === "in_use")
                                        ar_use.push(response.fail_list[i].name);
                                }
                                var in_use = ar_use.join(" , ");
                                Ext.Msg.alert(__weguardia,get_msg('err_prodel')+in_use);
                            }
                            me.update_cnt();
                            Ext.data.StoreManager.lookup('store_profile_ref_list').loadPage(1);
                            document.getElementById("all_chk").checked = false;
                        }
                    );
                }
            });
        }
    },

    onButtonBeforeRender1: function(component, eOpts) {
        component.text = __zen('del');
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = this;
        var chk = document.getElementsByName("_chk[]");
        var copy = [];

        for(var i=0; i<chk.length; i++){
            if(chk[i].checked === true)
                copy.push(Number(chk[i].value));
        }

        if(copy.length === 0){
            Ext.Msg.alert(__weguardia,get_msg("sel_copy"));
        }else{
            Ext.MessageBox.confirm(__weguardia,get_msg("conf_copy"),function(btn){
                if(btn === "yes"){

                    var _param = {
                        basename: Ext.encode("app_user_ref_list"),
                        id_info: Ext.encode({'fieldname':'rid','values':copy})
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'copyListTypeObj',
                        _param,
                        function(response){

                            me.update_cnt();
                            Ext.data.StoreManager.lookup('store_profile_ref_list').loadPage(1);
                            document.getElementById("all_chk").checked = false;
                        }
                    );
                }
            });
        }
    },

    onButtonBeforeRender2: function(component, eOpts) {
        component.text = __zen('copy');
    },

    onField_categoryRender: function(component, eOpts) {
        var tbutton = {
            xtype: 'container',
            margin: '3 0 0 0',
            style: 'float:left',
            html: '<input type="checkbox" id="all_category" class="chk_category" checked onclick=chk_toggle("NFW2_applist",this) />'
        };

        component.setTitle(__zen('categorys'));
        component.legend.add(tbutton);
    },

    onField_technologyRender: function(component, eOpts) {
        var tbutton = {
            xtype: 'container',
            margin: '3 0 0 0',
            style: 'float:left',
            html: '<input type="checkbox" id="all_technology" class="chk_technology" checked onclick=chk_toggle("NFW2_applist",this) />'
        };

        component.setTitle(__zen('technology'));
        component.legend.add(tbutton);
    },

    onField_purposeRender: function(component, eOpts) {
        var tbutton = {
            xtype: 'container',
            margin: '3 0 0 0',
            style: 'float:left',
            html: '<input type="checkbox" id="all_purpose" class="chk_purpose" checked onclick=chk_toggle("NFW2_applist",this) />'
        };

        component.setTitle(__zen('purpose'));
        component.legend.add(tbutton);
    },

    onField_popularityRender: function(component, eOpts) {
        var tbutton = {
            xtype: 'container',
            margin: '3 0 0 0',
            style: 'float:left',
            html: '<input type="checkbox" id="all_popularity" class="chk_popularity" checked onclick=chk_toggle("NFW2_applist",this) />'
        };

        component.setTitle(__zen('awareness'));
        component.legend.add(tbutton);
    },

    onSearch_nameKeyup: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(code === 13){
            this.findAppList();
        }
    },

    onSearch_nameBeforeRender: function(component, eOpts) {
        component.fieldLabel = __zen('application_name');
    },

    onButtonClick3: function(button, e, eOpts) {
        this.findAppList();
        Ext.getCmp("btn_reset").show();
    },

    onButtonClick4: function(button, e, eOpts) {
        Ext.getCmp("search_name").reset();
        this.findAppList();
        button.hide();
    },

    onCheckboxfieldChange: function(field, newValue, oldValue, eOpts) {
        this.findAppList();
    },

    onChk_appBeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('application_msg2');
    },

    onGridcolumnBeforeRender: function(component, eOpts) {
        component.text = __zen('application_name');
    },

    onGridcolumnBeforeRender1: function(component, eOpts) {
        component.text = __zen('categorys');
    },

    onGridcolumnBeforeRender2: function(component, eOpts) {
        component.text = __zen('technology');
    },

    onGridcolumnBeforeRender3: function(component, eOpts) {
        component.text = __zen('purpose');
    },

    onGridcolumnBeforeRender4: function(component, eOpts) {
        component.text = __zen('awareness');
    },

    onGridcolumnBeforeRender5: function(component, eOpts) {
        component.text = __zen('content_type');
    },

    onGridcolumnBeforeRender6: function(component, eOpts) {
        component.text = __zen('renewal_date');
    },

    onGridcolumnBeforeRender7: function(component, eOpts) {
        component.text = __zen('company');
    },

    onGridcolumnBeforeRender8: function(component, eOpts) {
        component.text = __zen('protocol');
    },

    onGridcolumnBeforeRender9: function(component, eOpts) {
        component.text = __zen('action');
    },

    onGridpanelCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0){ return false; }

        if(cellIndex === 1){

            var win = Ext.create('NFW2.view.win_application_more',{
                num: record.data.rid,
                name: record.data.name,
                type: record.data._type
            });

            win.show();
        }else if(record.data._type === 'user'){

            var _params = {
                basename: Ext.encode('app_user_sig_list'),
                cond: Ext.encode({'rid':record.data.rid})
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getObjects',
                _params,
                function(response){

                    var sig = [];
                    for(var i=0; i<response.total; i++){
                        sig.push(response.list[i].sig);
                    }

                    var win = Ext.create('NFW2.view.win_applist',{
                        edit : "edit",
                        name : record.data.name,
                        record: record.data,
                        sig: sig.join('\n')
                    });
                    win.show();
                }
            );
        }
    },

    onGridpanelCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0){
            var chk = document.getElementsByName("_chk[]");

            var _num = 0;
            for(var i=0; i<chk.length; i++){
                if(chk[i].checked === true){
                    _num++;
                }
            }
            if(chk.length === _num){
                document.getElementById("all_chk").checked = true;
            }else{
                document.getElementById("all_chk").checked = false;
            }
        }
    },

    onGridpanelHeaderClick: function(ct, column, e, t, eOpts) {
        if(column.dataIndex === "_type"){
            var a_chk = document.getElementById("all_chk");
            var state = a_chk.checked;

            if(state === false){
                a_chk.checked = true;
                all_checkbox(true);
            }else{
                a_chk.checked = false;
                all_checkbox(false);
            }
        }
    },

    findAppList: function() {
        var me = this;

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
            'name': (Ext.getCmp("search_name").getValue()!=='')?Ext.getCmp("search_name").getValue():''
        };

        var d_type = (Ext.getCmp("chk_app").getValue())?'uapps':'all';

        var _store = Ext.data.StoreManager.lookup("store_profile_ref_list");
        _store.getProxy().url = '/api/ftuctrl/findAppList';
        _store.getProxy().setExtraParam('filter_type',Ext.encode('specify_app'));
        _store.getProxy().setExtraParam('search_info',Ext.encode(search));
        _store.getProxy().setExtraParam('data_type',Ext.encode(d_type));
        _store.pageSize = 100;
        _store.currentPage = 1;
        _store.load(function(){
            setTimeout(function(){me.setWidth('100%');},100);
        });
    },

    update_cnt: function() {
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
                    var record = [{ val: 'All' }];

                    if(r_list[i]==='popularity'){ name.reverse(); }

                    for(var l in name){
                        var list = '';
                        if(j%n === 0){ list += '<tr>'; }
                        var text = (r_list[i]!=='popularity')?name[j].text+'('+name[j].count+')':'<div style="float:left" class="ic_star_'+name[j].text+'" />'+'<label style="margin-left:75px">('+name[j].count+')</label>';
                        list += '<td width="'+p+'%"><label style="font-size:8pt;"><input type="checkbox" checked name="chk[]" class="chk_'+r_list[i]+'" value="'+name[j].text+'" onclick=chk_toggle("NFW2_applist",this) style="float:left" />'+text+'</label></td>';
                        if((j+1)%n === 0 || j === name.length){
                            if((j+1)%n===1){ list += '<td width="'+p+'%"></td>'; }
                            list += '</tr>';
                        }
                        ar_list.push(list);
                        record.push({ val: name[j] });
                        j++;
                    }
                    ar_list.push('</table>');
                    Ext.getCmp("field_"+r_list[i]).update(ar_list.join(''));
                }
            }
        );
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

        Ext.getCmp("NFW2_applist").findAppList();
    }

});