
Ext.define('NFW2.view.win_whiteblack_result', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.Panel',
        'Ext.form.Label'
    ],

    height: 340,
    width: 450,
    autoScroll: true,
    title: 'Result',
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
                    bodyPadding: 10,
                    title: '',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    listeners: {
                        afterrender: {
                            fn: me.onFormAfterRender,
                            scope: me
                        }
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            minHeight: 100,
                            minWidth: 420,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    autoScroll: true,
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: 'lb_sq',
                                            text: 'Fail(Invalid)'
                                        },
                                        {
                                            xtype: 'container',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    cls: 'l_b',
                                                    id: 'l_invalid',
                                                    text: ''
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    autoScroll: true,
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: 'lb_sq',
                                            text: 'Fail(Duplicate)'
                                        },
                                        {
                                            xtype: 'container',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    cls: 'l_b',
                                                    id: 'l_duplicate',
                                                    text: ''
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
        });

        me.callParent(arguments);
    },

    onFormAfterRender: function(component, eOpts) {
        var me = this;
        var data = me.data;

        var ar_du = new Array();
        var ar_in = new Array();

        for(var i=0; i<data.length; i++){
            if(data[i].reason === "duplicate"){
                ar_du.push(data[i].ip);
            }else if(data[i].reason === "invalid"){
                ar_in.push(data[i].ip);
            }
        }

        Ext.getCmp("l_invalid").setText(ar_in.join("<br>"),false);

        Ext.getCmp("l_duplicate").setText(ar_du.join("<br>"),false);
    }

});