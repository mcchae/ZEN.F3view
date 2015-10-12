
Ext.define('NFW2.view.win_signature_info', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_signature_info',

    requires: [
        'NFW2.view.win_signature_infoViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.Img',
        'Ext.form.FieldSet',
        'Ext.form.field.TextArea'
    ],

    viewModel: {
        type: 'win_signature_info'
    },
    cls: 'zen_win',
    id: 'win_signature_info',
    maxHeight: 600,
    maxWidth: 495,
    scrollable: {
        x: false,
        y: true
    },
    width: 495,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            width: 490,
            layout: 'fit',
            bodyPadding: 10,
            header: false,
            title: 'My Form',
            items: [
                {
                    xtype: 'container',
                    id: 'signature_info_con',
                    width: 470,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            margin: '8 0 0 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    width: 120,
                                    bind: {
                                        text: '{fsid}'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    id: 'fsid_label'
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
                                    xtype: 'label',
                                    width: 120,
                                    bind: {
                                        text: '{sig_name}'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    id: 'name_label'
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
                                    xtype: 'label',
                                    width: 120,
                                    bind: {
                                        text: '{hazard}'
                                    }
                                },
                                {
                                    xtype: 'image',
                                    id: 'signature_info_img',
                                    maxHeight: 19,
                                    width: 24,
                                    src: '../images/level_high.png',
                                    listeners: {
                                        afterrender: 'onImageAfterRender'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'fieldset',
                                    id: 'sum_fieldset',
                                    margin: '5 0 0 0',
                                    width: 470,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textareafield',
                                            flex: 1,
                                            hidden: true,
                                            id: 'sum_textarea',
                                            margin: '0 0 5 -10',
                                            msgTarget: 'none',
                                            readOnly: true,
                                            listeners: {
                                                afterrender: 'onSum_textareaAfterRender'
                                            }
                                        }
                                    ],
                                    listeners: {
                                        afterrender: 'onSum_fieldsetAfterRender'
                                    }
                                },
                                {
                                    xtype: 'fieldset',
                                    id: 'aff_fieldset',
                                    margin: '5 0 0 0',
                                    width: 470,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textareafield',
                                            flex: 1,
                                            hidden: true,
                                            id: 'aff_textarea',
                                            margin: '0 0 5 -10',
                                            msgTarget: 'none',
                                            readOnly: true
                                        }
                                    ],
                                    listeners: {
                                        afterrender: 'onAff_fieldsetAfterRender'
                                    }
                                },
                                {
                                    xtype: 'fieldset',
                                    id: 'sys_fieldset',
                                    margin: '5 0 0 0',
                                    width: 470,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textareafield',
                                            flex: 1,
                                            hidden: true,
                                            id: 'sys_textarea',
                                            margin: '0 0 5 -10',
                                            msgTarget: 'none',
                                            readOnly: true
                                        }
                                    ],
                                    listeners: {
                                        afterrender: 'onSys_fieldsetAfterRender'
                                    }
                                },
                                {
                                    xtype: 'fieldset',
                                    id: 'sol_fieldset',
                                    margin: '5 0 0 0',
                                    width: 470,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textareafield',
                                            flex: 1,
                                            hidden: true,
                                            id: 'sol_textarea',
                                            margin: '0 0 5 -10',
                                            msgTarget: 'none',
                                            readOnly: true
                                        }
                                    ],
                                    listeners: {
                                        afterrender: 'onSol_fieldsetAfterRender'
                                    }
                                },
                                {
                                    xtype: 'fieldset',
                                    id: 'add_fieldset',
                                    margin: '5 0 0 0',
                                    width: 470,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'box',
                                            autoEl: {
                                                html: '<a href="'+'abc'+'" target="_blank">'+'abc'+'</a>'
                                            },
                                            flex: 1,
                                            hidden: true,
                                            id: 'add_textarea',
                                            msgTarget: 'none',
                                            readOnly: true
                                        }
                                    ],
                                    listeners: {
                                        afterrender: 'onAdd_fieldsetAfterRender'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWindowAfterRender'
    },

    onImageAfterRender: function(component, eOpts) {
        var me = Ext.getCmp('win_signature_info');

        if(me.record.data.hazard === "high" || me.record.data.hazard === "critical" || me.record.data.hazard === "normal" || me.record.data.hazard === "low"){
            Ext.getCmp('signature_info_img').setSrc("../images/level_"+ me.record.data.hazard +".png");
        }
        else{
            Ext.getCmp('signature_info_img').setSrc("../images/level_low.png");
        }
    },

    onSum_textareaAfterRender: function(component, eOpts) {
        var area = document.getElementById('sum_textarea');
        area.setAttribute('spellcheck', 'false');
    },

    onSum_fieldsetAfterRender: function(component, eOpts) {
        component.setTitle(__zen('summary_info'));
    },

    onAff_fieldsetAfterRender: function(component, eOpts) {
        component.setTitle(__zen('affect_soft'));
    },

    onSys_fieldsetAfterRender: function(component, eOpts) {
        component.setTitle(__zen('system_impact'));
    },

    onSol_fieldsetAfterRender: function(component, eOpts) {
        component.setTitle(__zen('solution'));
    },

    onAdd_fieldsetAfterRender: function(component, eOpts) {
        component.setTitle(__zen('reference_info'));
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;
        me.setTitle(__zen('sig_info'));

        Ext.getCmp('fsid_label').setText(me.record.data['@fsid']);
        Ext.getCmp('name_label').setText(me.record.data.signature_name);
        var chk_sum = false;
        var chk_aff = false;
        var chk_sys = false;
        var chk_sol = false;
        var chk_add = false;
        var chk_i = 0;
        var sum_info = "";
        var aff_info = "";
        var sys_info = "";
        var sol_info = "";
        var add_info = "";
        var href = {};
        var in_html = "";

        for(var i in me.info){
            var name = me.info[i].split(':');
            if(chk_sum === true){
                if(me.info[i] === "" || me.info[i] === "--"){
                    href = {
                        xtype: 'container',
                        margin : '8 0 10 0',
                        html : sum_info,
                        flex : 1
                    };
                    Ext.getCmp('sum_fieldset').insert(href);
                    chk_sum = false;
                    //             Ext.getCmp('sum_textarea').setValue(sum_info);
                }
                else{ sum_info = sum_info + '<p style="margin:0;">' + me.info[i] + '</p>'; }
            }
            if(chk_aff === true){
                if(me.info[i] === "" || me.info[i] === "--"){
                    href = {
                        xtype: 'container',
                        margin : '8 0 10 0',
                        html : aff_info,
                        flex : 1
                    };
                    Ext.getCmp('aff_fieldset').insert(href);
                    chk_aff = false;
                    //             Ext.getCmp('aff_textarea').setValue(aff_info);
                }
                else{ aff_info = aff_info + '<p style="margin:0;">' + me.info[i] + '</p>' + "\n"; }
            }
            if(chk_sys === true){
                if(me.info[i] === "" || me.info[i] === "--"){
                    href = {
                        xtype: 'container',
                        margin : '8 0 10 0',
                        html : sys_info,
                        flex : 1
                    };
                    Ext.getCmp('sys_fieldset').insert(href);
                    chk_sys = false;
                    //             Ext.getCmp('sys_textarea').setValue(sys_info);
                }
                else{ sys_info = sys_info + '<p style="margin:0;">' + me.info[i] + '</p>' + "\n"; }
            }
            if(chk_sol === true){
                if(me.info[i] === "" || me.info[i] === "--"){
                    href = {
                        xtype: 'container',
                        margin : '8 0 10 0',
                        html : sol_info,
                        flex : 1
                    };
                    Ext.getCmp('sol_fieldset').insert(href);
                    chk_sol = false;
                    //             Ext.getCmp('sol_textarea').setValue(sol_info);
                }
                else{ sol_info = sol_info + '<p style="margin:0;">' + me.info[i] + '</p>' + "\n"; }
            }
            if(chk_add === true){
                if(me.info[i] === "" || me.info[i] === "--"){
                    chk_add = false;
                    href = {
                        xtype: 'box',
                        margin: '0 0 5 0',
                        minHeight: 20,
                        autoEl: {
                            html: in_html + "\n"
                        },
                        id: 'add_textarea',
                        msgTarget: 'none',
                        readOnly: true
                    };
                    Ext.getCmp('add_fieldset').insert(href);
                }
                else{
                    in_html = in_html + '<a href="'+me.info[i]+'" target="_blank">'+me.info[i]+'</a>' + "\n";
                }
            }

            if(name[0] === "Summary"){
                chk_i = i;
                chk_sum = true;
            }
            else if(name[0] === "Affected Software"){
                chk_i = i;
                chk_aff = true;
            }
            else if(name[0] === "System Impact"){
                chk_i = i;
                chk_sys = true;
            }
            else if(name[0] === "Solution"){
                chk_i = i;
                chk_sol = true;
            }
            else if(name[0] === "Additional References"){
                chk_i = i;
                chk_add = true;
            }

        }
    }

});