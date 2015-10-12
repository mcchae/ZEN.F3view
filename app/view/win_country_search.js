
Ext.define('NFW2.view.win_country_search', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_country_search',

    requires: [
        'NFW2.view.win_country_searchViewModel',
        'Ext.container.Container',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.form.field.ComboBox'
    ],

    viewModel: {
        type: 'win_country_search'
    },
    cls: 'zen_win',
    height: 600,
    width: 600,
    bodyPadding: 20,
    maximizable: true,
    defaultListenerScope: true,

    bind: {
        title: '{ctcode_search}'
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
                    xtype: 'textfield',
                    id: 'ser_ip',
                    width: 450,
                    labelSeparator: ' ',
                    bind: {
                        fieldLabel: '{target_addr}'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'btn_b',
                    margin: '0 0 0 10',
                    width: 100,
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
            xtype: 'label',
            cls: 'errorBox',
            hidden: true,
            id: 'err_msg1',
            margin: '5 0'
        },
        {
            xtype: 'container',
            margin: '5 0',
            items: [
                {
                    xtype: 'combobox',
                    id: 'ser_country',
                    width: 450,
                    labelSeparator: ' ',
                    editable: false,
                    displayField: 'country_desc',
                    store: 'store_country_item',
                    valueField: 'country_code',
                    bind: {
                        fieldLabel: '{country_code}'
                    },
                    listeners: {
                        change: 'onSer_countryChange'
                    }
                }
            ]
        },
        {
            xtype: 'container',
            height: 460,
            id: 'fld_list',
            overflowX: 'auto',
            overflowY: 'auto'
        }
    ],

    onButtonClick: function(button, e, eOpts) {
        var key = Ext.getCmp("ser_ip").getValue();
        if(key===""){return false;}
        if(ValidIPAddress(key)===false){ prt_errMsg_label(ValidIP("IP"),"err_msg1");Ext.getCmp("ser_ip").focus(); return false; }else{Ext.getCmp("err_msg1").hide();}

        var _EXTparams = {
            search_info : Ext.encode({'list_type' : 'country_ip','key_type' : "ip", "key" : key})
        };


        Ext.get('fld_list').mask("Loading Data ..");

        request_helper.xmlrpc_call_JsonP('ftuctrl','findCountryInfo',  _EXTparams,
                                         function(response){


                                             if(response.list_total === 0){
                                                 Ext.get('fld_list').unmask();
                                                 Ext.getCmp("ser_country").setValue(null);
                                                 Ext.get('fld_list').update(get_msg('msg_result_null'));
                                                 return false;
                                             }


                                             Ext.getCmp("ser_country").setValue(response.country_code);

                                             var len = response.list.length;
                                             var list = "";

                                             for(var i=0; i<len; i++){
                                                 list += "<li style='width:250px; float:left; line-height:20px'>"+response.list[i]+"</li>";
                                             }

                                             Ext.get('fld_list').unmask();
                                             Ext.get('fld_list').update(list);
                                         }
                                        );

    },

    onSer_countryChange: function(field, newValue, oldValue, eOpts) {

        if(newValue === null){return false;}

        var _EXTparams = {
            search_info : Ext.encode({'list_type' : 'country_ip','key_type' : "country_code", "key" : newValue})
        };


        Ext.get('fld_list').mask("Loading Data ..");

        request_helper.xmlrpc_call_JsonP('ftuctrl','findCountryInfo',  _EXTparams,
            function(response){

                var len = response.list.length;
                var list = "";

                for(var i=0; i<len; i++){
                    list += "<li style='width:250px; float:left; line-height:20px'>"+response.list[i]+"</li>";
                }

                Ext.get('fld_list').unmask();
                Ext.get('fld_list').update(list);
            }
        );

    }

});