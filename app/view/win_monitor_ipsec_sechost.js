
Ext.define('NFW2.view.win_monitor_ipsec_sechost', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.Panel',
        'Ext.form.Label'
    ],

    height: 350,
    width: 600,
    autoScroll: true,
    title: '네트워크',
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    flex: 1,
                    autoScroll: true,
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'container',
                            minWidth: 500,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    cls: 'mt_info',
                                                    text: 'Local'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            id: 'c_local'
                                        }
                                    ]
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
                                            xtype: 'container',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    cls: 'mt_info',
                                                    text: 'Remote'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            id: 'c_remote'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWindowAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;

        me.setTitle("네트워크 인덱스 - "+me.index);

        Ext.getCmp("c_local").update(me.local.join("<br>"));
        Ext.getCmp("c_remote").update(me.remote.join("<br>"));
    }

});