
Ext.define('NFW2.view.win_application_more', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_application_more',

    requires: [
        'NFW2.view.win_application_moreViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Display'
    ],

    viewModel: {
        type: 'win_application_more'
    },
    cls: 'zen_win',
    height: 360,
    scrollable: true,
    width: 450,
    modal: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            flex: 1,
            scrollable: true,
            bodyPadding: 10,
            title: '',
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'l_category',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            bind: {
                                fieldLabel: '{categorys}'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            id: 'l_technology',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            bind: {
                                fieldLabel: '{technology}'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            id: 'l_purpose',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            bind: {
                                fieldLabel: '{purpose}'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            id: 'l_content',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            bind: {
                                fieldLabel: '{content_type}'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            id: 'l_popularity',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            bind: {
                                fieldLabel: '{awareness}'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            id: 'l_released',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            bind: {
                                fieldLabel: '{renewal_date}'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            id: 'l_vendor',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            bind: {
                                fieldLabel: '{company}'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            id: 'l_protocols',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            bind: {
                                fieldLabel: '{protocol}'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            id: 'l_desc',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            bind: {
                                fieldLabel: '{desc}'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            id: 'l_version',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            bind: {
                                fieldLabel: '{version}'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            id: 'l_references',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            bind: {
                                fieldLabel: '{references}'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWindowAfterRender'
    },

    onWindowAfterRender: function(component, eOpts) {
        this.setTitle(this.name);

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
        );
    }

});