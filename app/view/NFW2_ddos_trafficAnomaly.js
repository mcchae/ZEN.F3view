
Ext.define('NFW2.view.NFW2_ddos_trafficAnomaly', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_ddos_trafficanomaly',

    requires: [
        'NFW2.view.NFW2_ddos_trafficAnomalyViewModel',
        'Ext.form.Panel',
        'Ext.panel.Tool',
        'Ext.form.Label',
        'Ext.button.Segmented',
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.XTemplate',
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.grid.Panel',
        'Ext.grid.plugin.CellEditing',
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.toolbar.Toolbar'
    ],

    config: {
        obj_d: {
            data: ''
        }
    },

    viewModel: {
        type: 'nfw2_ddos_trafficanomaly'
    },
    cls: 'zen_body',
    id: 'NFW2_ddos_trafficAnomaly',
    width: 900,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'panel',
            items: [
                {
                    xtype: 'form',
                    id: 'form_dos_trafficAnomaly',
                    bind: {
                        title: '{ta_dos}'
                    },
                    tools: [
                        {
                            xtype: 'toggleslide',
                            onText: {
                                txt: __zen('toggle_on')
                            },
                            offText: {
                                txt: __zen('toggle_off')
                            },
                            resizeHandle: false,
                            state: true,
                            id: 'chk_dos_trafficAnomaly',
                            listeners: {
                                change: 'onToolChange'
                            }
                        }
                    ],
                    items: [
                        {
                            xtype: 'container',
                            cls: 'fld_info_box',
                            margin: '0 0 5 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    margin: '0 20 0 0',
                                    bind: {
                                        text: '{action}'
                                    }
                                },
                                {
                                    xtype: 'segmentedbutton',
                                    cls: 'zen_seg',
                                    id: 'cb_dos_action',
                                    margin: '0 30 0 0',
                                    items: [
                                        {
                                            enableToggle: true,
                                            pressed: true,
                                            bind: {
                                                text: '{detect}'
                                            },
                                            listeners: {
                                                toggle: 'onButtonToggle'
                                            }
                                        },
                                        {
                                            bind: {
                                                text: '{deny}'
                                            },
                                            listeners: {
                                                toggle: 'onButtonToggle1'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var _value = removeComma(value);
                                        if(!LengthCheck(_value, 1, 2592000)){ return ValidLimit(1, '2,592,000'); }

                                        return true;
                                    },
                                    fieldInfo: {
                                        txt: msg_tip_length(1,
                                        2592000,
                                        null)
                                    },
                                    cls: 'inp_unit',
                                    disabled: true,
                                    id: 'ft_dos_block_time',
                                    margin: '0 3 0 0',
                                    width: 220,
                                    afterBodyEl: [
                                        '<div class="inp_after">{[__zen("sec")]}</div>'
                                    ],
                                    labelSeparator: ' ',
                                    labelWidth: 70,
                                    msgTarget: 'none',
                                    value: 600,
                                    enableKeyEvents: true,
                                    bind: {
                                        fieldLabel: '{detect_time}'
                                    },
                                    listeners: {
                                        change: 'onFt_dos_block_timeChange',
                                        keydown: 'onFt_dos_block_timeKeydown',
                                        blur: 'onFt_dos_block_timeBlur',
                                        focus: 'onFt_dos_block_timeFocus',
                                        errorchange: 'onFt_dos_block_timeErrorChange'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '0 0 0 20',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    margin: '0 20 0 0',
                                    padding: '5 5 10 5',
                                    width: 650,
                                    title: 'TCP',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '0 10 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 100000)){ return ValidLimit(0, '100,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        100000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_dos_tcp_syn',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">pps</div>'
                                                    ],
                                                    fieldLabel: 'SYN',
                                                    labelAlign: 'top',
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange1',
                                                        keydown: 'onFt_dos_block_timeKeydown1',
                                                        blur: 'onFt_dos_block_timeBlur1',
                                                        focus: 'onFt_dos_block_timeFocus1',
                                                        errorchange: 'onFt_dos_block_timeErrorChange1'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '0 10 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 100000)){ return ValidLimit(0, '100,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        100000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_dos_tcp_syn_ack',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">pps</div>'
                                                    ],
                                                    fieldLabel: 'SYN+ACK',
                                                    labelAlign: 'top',
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange11',
                                                        keydown: 'onFt_dos_block_timeKeydown11',
                                                        blur: 'onFt_dos_block_timeBlur11',
                                                        focus: 'onFt_dos_block_timeFocus11',
                                                        errorchange: 'onFt_dos_block_timeErrorChange11'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '0 10 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 100000)){ return ValidLimit(0, '100,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        100000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_dos_tcp_ack',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">pps</div>'
                                                    ],
                                                    fieldLabel: 'ACK',
                                                    labelAlign: 'top',
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange111',
                                                        keydown: 'onFt_dos_block_timeKeydown111',
                                                        blur: 'onFt_dos_block_timeBlur111',
                                                        focus: 'onFt_dos_block_timeFocus111',
                                                        errorchange: 'onFt_dos_block_timeErrorChange111'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 100000)){ return ValidLimit(0, '100,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        100000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_dos_tcp_fin',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">pps</div>'
                                                    ],
                                                    fieldLabel: 'FIN',
                                                    labelAlign: 'top',
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange1111',
                                                        keydown: 'onFt_dos_block_timeKeydown1111',
                                                        blur: 'onFt_dos_block_timeBlur1111',
                                                        focus: 'onFt_dos_block_timeFocus1111',
                                                        errorchange: 'onFt_dos_block_timeErrorChange1111'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    padding: '5 5 10 5',
                                    width: 200,
                                    title: 'HTTP',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '0 5 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 500000)){ return ValidLimit(0, '500,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        500000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_dos_http_get',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">pps</div>'
                                                    ],
                                                    fieldLabel: 'GET',
                                                    labelAlign: 'top',
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange12',
                                                        keydown: 'onFt_dos_block_timeKeydown12',
                                                        blur: 'onFt_dos_block_timeBlur12',
                                                        focus: 'onFt_dos_block_timeFocus12',
                                                        errorchange: 'onFt_dos_block_timeErrorChange12'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '0 0 0 20',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    margin: '0 20 0 0',
                                    padding: '5 5 10 5',
                                    width: 350,
                                    title: 'UDP',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '0 10 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 100000)){ return ValidLimit(0, '100,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        100000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_dos_udp_pps',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">pps</div>'
                                                    ],
                                                    fieldLabel: '&nbsp; ',
                                                    labelAlign: 'top',
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange13',
                                                        keydown: 'onFt_dos_block_timeKeydown13',
                                                        blur: 'onFt_dos_block_timeBlur13',
                                                        focus: 'onFt_dos_block_timeFocus13',
                                                        errorchange: 'onFt_dos_block_timeErrorChange13'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '0 10 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 20000)){ return ValidLimit(0, '20,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        20000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_dos_udp_mbps',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">Mbps</div>'
                                                    ],
                                                    fieldLabel: '&nbsp; ',
                                                    labelAlign: 'top',
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange112',
                                                        keydown: 'onFt_dos_block_timeKeydown112',
                                                        blur: 'onFt_dos_block_timeBlur112',
                                                        focus: 'onFt_dos_block_timeFocus112',
                                                        errorchange: 'onFt_dos_block_timeErrorChange112'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    margin: '0 20 0 0',
                                    padding: '5 5 10 5',
                                    width: 500,
                                    title: 'ICMP',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '0 10 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 100000)){ return ValidLimit(0, '100,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        100000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_dos_icmp_pps',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">pps</div>'
                                                    ],
                                                    fieldLabel: '&nbsp; ',
                                                    labelAlign: 'top',
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange131',
                                                        keydown: 'onFt_dos_block_timeKeydown131',
                                                        blur: 'onFt_dos_block_timeBlur131',
                                                        focus: 'onFt_dos_block_timeFocus131',
                                                        errorchange: 'onFt_dos_block_timeErrorChange131'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '0 10 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 20000)){ return ValidLimit(0, '20,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        20000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_dos_icmp_mbps',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">Mbps</div>'
                                                    ],
                                                    fieldLabel: '&nbsp; ',
                                                    labelAlign: 'top',
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange1121',
                                                        keydown: 'onFt_dos_block_timeKeydown1121',
                                                        blur: 'onFt_dos_block_timeBlur1121',
                                                        focus: 'onFt_dos_block_timeFocus1121',
                                                        errorchange: 'onFt_dos_block_timeErrorChange1121'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '0 10 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 65500)){ return ValidLimit(0, '65,500'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        65500,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_dos_icmp_limit',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">byte</div>'
                                                    ],
                                                    labelAlign: 'top',
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    bind: {
                                                        fieldLabel: '{packet_size}'
                                                    },
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange11211',
                                                        keydown: 'onFt_dos_block_timeKeydown11211',
                                                        blur: 'onFt_dos_block_timeBlur11211',
                                                        focus: 'onFt_dos_block_timeFocus11211',
                                                        errorchange: 'onFt_dos_block_timeErrorChange11211'
                                                    }
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
                    xtype: 'form',
                    id: 'form_ddos_trafficAnomaly',
                    bind: {
                        title: '{ta_ddos}'
                    },
                    tools: [
                        {
                            xtype: 'toggleslide',
                            onText: {
                                txt: __zen('toggle_on')
                            },
                            offText: {
                                txt: __zen('toggle_off')
                            },
                            resizeHandle: false,
                            state: true,
                            id: 'chk_ddos_trafficAnomaly',
                            listeners: {
                                change: 'onToolChange1'
                            }
                        }
                    ],
                    items: [
                        {
                            xtype: 'container',
                            cls: 'fld_info_box',
                            margin: '0 0 5 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    margin: '0 20 0 0',
                                    bind: {
                                        text: '{action}'
                                    }
                                },
                                {
                                    xtype: 'segmentedbutton',
                                    cls: 'zen_seg',
                                    id: 'cb_ddos_action',
                                    margin: '0 30 0 0',
                                    items: [
                                        {
                                            enableToggle: true,
                                            pressed: true,
                                            bind: {
                                                text: '{detect}'
                                            },
                                            listeners: {
                                                toggle: 'onButtonToggle2'
                                            }
                                        },
                                        {
                                            bind: {
                                                text: '{deny}'
                                            },
                                            listeners: {
                                                toggle: 'onButtonToggle11'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var _value = removeComma(value);
                                        if(!LengthCheck(_value, 1, 2592000)){ return ValidLimit(1, '2,592,000'); }

                                        return true;
                                    },
                                    fieldInfo: {
                                        txt: msg_tip_length(1,
                                        2592000,
                                        null)
                                    },
                                    cls: 'inp_unit',
                                    disabled: true,
                                    id: 'ft_ddos_block_time',
                                    margin: '0 3 0 0',
                                    width: 220,
                                    afterBodyEl: [
                                        '<div class="inp_after">{[__zen("sec")]}</div>'
                                    ],
                                    labelSeparator: ' ',
                                    labelWidth: 70,
                                    msgTarget: 'none',
                                    value: 600,
                                    enableKeyEvents: true,
                                    bind: {
                                        fieldLabel: '{detect_time}'
                                    },
                                    listeners: {
                                        change: 'onFt_dos_block_timeChange2',
                                        keydown: 'onFt_dos_block_timeKeydown2',
                                        blur: 'onFt_dos_block_timeBlur2',
                                        focus: 'onFt_dos_block_timeFocus2',
                                        errorchange: 'onFt_dos_block_timeErrorChange2'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '0 0 0 20',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    margin: '0 20 0 0',
                                    padding: '5 5 10 5',
                                    width: 650,
                                    title: 'TCP',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '0 10 0 0',
                                            layout: {
                                                type: 'vbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 60000)){ return ValidLimit(0, '60,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        60000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_ddos_tcp_syn_dod',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">{[__zen("ta_loadbl")]}</div>'
                                                    ],
                                                    fieldLabel: 'SYN',
                                                    labelAlign: 'top',
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange14',
                                                        keydown: 'onFt_dos_block_timeKeydown14',
                                                        blur: 'onFt_dos_block_timeBlur14',
                                                        focus: 'onFt_dos_block_timeFocus14',
                                                        errorchange: 'onFt_dos_block_timeErrorChange14'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 60000)){ return ValidLimit(0, '60,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        60000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_ddos_tcp_syn_pps',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">pps</div>'
                                                    ],
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange141',
                                                        keydown: 'onFt_dos_block_timeKeydown141',
                                                        blur: 'onFt_dos_block_timeBlur141',
                                                        focus: 'onFt_dos_block_timeFocus141',
                                                        errorchange: 'onFt_dos_block_timeErrorChange141'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '0 10 0 0',
                                            layout: {
                                                type: 'vbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 60000)){ return ValidLimit(0, '60,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        60000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_ddos_tcp_sa_dod',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">{[__zen("ta_loadbl")]}</div>'
                                                    ],
                                                    fieldLabel: 'SYN+ACK',
                                                    labelAlign: 'top',
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange142',
                                                        keydown: 'onFt_dos_block_timeKeydown142',
                                                        blur: 'onFt_dos_block_timeBlur142',
                                                        focus: 'onFt_dos_block_timeFocus142',
                                                        errorchange: 'onFt_dos_block_timeErrorChange142'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 60000)){ return ValidLimit(0, '60,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        60000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_ddos_tcp_sa_pps',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">pps</div>'
                                                    ],
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange1411',
                                                        keydown: 'onFt_dos_block_timeKeydown1411',
                                                        blur: 'onFt_dos_block_timeBlur1411',
                                                        focus: 'onFt_dos_block_timeFocus1411',
                                                        errorchange: 'onFt_dos_block_timeErrorChange1411'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '0 10 0 0',
                                            layout: {
                                                type: 'vbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 60000)){ return ValidLimit(0, '60,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        60000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_ddos_tcp_ack_dod',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">{[__zen("ta_loadbl")]}</div>'
                                                    ],
                                                    fieldLabel: 'ACK',
                                                    labelAlign: 'top',
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange1421',
                                                        keydown: 'onFt_dos_block_timeKeydown1421',
                                                        blur: 'onFt_dos_block_timeBlur1421',
                                                        focus: 'onFt_dos_block_timeFocus1421',
                                                        errorchange: 'onFt_dos_block_timeErrorChange1421'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 60000)){ return ValidLimit(0, '60,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        60000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_ddos_tcp_ack_pps',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">pps</div>'
                                                    ],
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange14111',
                                                        keydown: 'onFt_dos_block_timeKeydown14111',
                                                        blur: 'onFt_dos_block_timeBlur14111',
                                                        focus: 'onFt_dos_block_timeFocus14111',
                                                        errorchange: 'onFt_dos_block_timeErrorChange14111'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '0 10 0 0',
                                            layout: {
                                                type: 'vbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 60000)){ return ValidLimit(0, '60,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        60000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_ddos_tcp_fin_dod',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">{[__zen("ta_loadbl")]}</div>'
                                                    ],
                                                    fieldLabel: 'FIN',
                                                    labelAlign: 'top',
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange14211',
                                                        keydown: 'onFt_dos_block_timeKeydown14211',
                                                        blur: 'onFt_dos_block_timeBlur14211',
                                                        focus: 'onFt_dos_block_timeFocus14211',
                                                        errorchange: 'onFt_dos_block_timeErrorChange14211'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 60000)){ return ValidLimit(0, '60,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        60000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_ddos_tcp_fin_pps',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">pps</div>'
                                                    ],
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange141111',
                                                        keydown: 'onFt_dos_block_timeKeydown141111',
                                                        blur: 'onFt_dos_block_timeBlur141111',
                                                        focus: 'onFt_dos_block_timeFocus141111',
                                                        errorchange: 'onFt_dos_block_timeErrorChange141111'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    padding: '5 5 10 5',
                                    width: 200,
                                    title: 'HTTP',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '0 5 0 0',
                                            layout: {
                                                type: 'vbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 30000)){ return ValidLimit(0, '30,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        30000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_ddos_http_dod',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">{[__zen("ta_loadbl")]}</div>'
                                                    ],
                                                    fieldLabel: 'GET',
                                                    labelAlign: 'top',
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange142111',
                                                        keydown: 'onFt_dos_block_timeKeydown142111',
                                                        blur: 'onFt_dos_block_timeBlur142111',
                                                        focus: 'onFt_dos_block_timeFocus142111',
                                                        errorchange: 'onFt_dos_block_timeErrorChange142111'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 30000)){ return ValidLimit(0, '30,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        30000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_ddos_http_pps',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">pps</div>'
                                                    ],
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange1411111',
                                                        keydown: 'onFt_dos_block_timeKeydown1411111',
                                                        blur: 'onFt_dos_block_timeBlur1411111',
                                                        focus: 'onFt_dos_block_timeFocus1411111',
                                                        errorchange: 'onFt_dos_block_timeErrorChange1411111'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '0 0 0 20',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    margin: '0 20 0 0',
                                    padding: '5 5 10 5',
                                    width: 420,
                                    title: 'UDP',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '0 5 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 60000)){ return ValidLimit(0, '60,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        60000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_ddos_udp_dod',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">{[__zen("ta_loadbl")]}</div>'
                                                    ],
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange1321',
                                                        keydown: 'onFt_dos_block_timeKeydown1321',
                                                        blur: 'onFt_dos_block_timeBlur1321',
                                                        focus: 'onFt_dos_block_timeFocus1321',
                                                        errorchange: 'onFt_dos_block_timeErrorChange1321'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '0 5 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 60000)){ return ValidLimit(0, '60,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        60000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_ddos_udp_pps',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">pps</div>'
                                                    ],
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange132',
                                                        keydown: 'onFt_dos_block_timeKeydown132',
                                                        blur: 'onFt_dos_block_timeBlur132',
                                                        focus: 'onFt_dos_block_timeFocus132',
                                                        errorchange: 'onFt_dos_block_timeErrorChange132'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '0 5 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 10000)){ return ValidLimit(0, '10,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        10000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_ddos_udp_mbps',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">Mbps</div>'
                                                    ],
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange1122',
                                                        keydown: 'onFt_dos_block_timeKeydown1122',
                                                        blur: 'onFt_dos_block_timeBlur1122',
                                                        focus: 'onFt_dos_block_timeFocus1122',
                                                        errorchange: 'onFt_dos_block_timeErrorChange1122'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    margin: '0 20 0 0',
                                    padding: '5 5 10 5',
                                    width: 430,
                                    title: 'ICMP',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '0 5 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 60000)){ return ValidLimit(0, '60,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        60000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_ddos_icmp_dod',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">{[__zen("ta_loadbl")]}</div>'
                                                    ],
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange1311',
                                                        keydown: 'onFt_dos_block_timeKeydown1311',
                                                        blur: 'onFt_dos_block_timeBlur1311',
                                                        focus: 'onFt_dos_block_timeFocus1311',
                                                        errorchange: 'onFt_dos_block_timeErrorChange1311'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '0 5 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 60000)){ return ValidLimit(0, '60,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        60000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_ddos_icmp_pps',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">pps</div>'
                                                    ],
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange11212',
                                                        keydown: 'onFt_dos_block_timeKeydown11212',
                                                        blur: 'onFt_dos_block_timeBlur11212',
                                                        focus: 'onFt_dos_block_timeFocus11212',
                                                        errorchange: 'onFt_dos_block_timeErrorChange11212'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '0 5 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 100000)){ return ValidLimit(0, '100,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        100000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_ddos_icmp_mbps',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">Mbps</div>'
                                                    ],
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange112111',
                                                        keydown: 'onFt_dos_block_timeKeydown112111',
                                                        blur: 'onFt_dos_block_timeBlur112111',
                                                        focus: 'onFt_dos_block_timeFocus112111',
                                                        errorchange: 'onFt_dos_block_timeErrorChange112111'
                                                    }
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
                    xtype: 'form',
                    id: 'form_http_trafficAnomaly',
                    bind: {
                        title: '{ta_http}'
                    },
                    tools: [
                        {
                            xtype: 'toggleslide',
                            onText: {
                                txt: __zen('toggle_on')
                            },
                            offText: {
                                txt: __zen('toggle_off')
                            },
                            resizeHandle: false,
                            state: true,
                            id: 'chk_http_trafficAnomaly',
                            listeners: {
                                change: 'onToolChange11'
                            }
                        }
                    ],
                    items: [
                        {
                            xtype: 'container',
                            cls: 'fld_info_box',
                            margin: '0 0 5 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    margin: '0 20 0 0',
                                    bind: {
                                        text: '{action}'
                                    }
                                },
                                {
                                    xtype: 'segmentedbutton',
                                    cls: 'zen_seg',
                                    id: 'cb_http_action',
                                    margin: '0 30 0 0',
                                    items: [
                                        {
                                            enableToggle: true,
                                            pressed: true,
                                            bind: {
                                                text: '{detect}'
                                            },
                                            listeners: {
                                                toggle: 'onButtonToggle21'
                                            }
                                        },
                                        {
                                            bind: {
                                                text: '{deny}'
                                            },
                                            listeners: {
                                                toggle: 'onButtonToggle111'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var _value = removeComma(value);
                                        if(!LengthCheck(_value, 1, 2592000)){ return ValidLimit(1, '2,592,000'); }

                                        return true;
                                    },
                                    fieldInfo: {
                                        txt: msg_tip_length(1,
                                        2592000,
                                        null)
                                    },
                                    cls: 'inp_unit',
                                    disabled: true,
                                    id: 'ft_http_block_time',
                                    margin: '0 3 0 0',
                                    width: 220,
                                    afterBodyEl: [
                                        '<div class="inp_after">{[__zen("sec")]}</div>'
                                    ],
                                    labelSeparator: ' ',
                                    labelWidth: 70,
                                    msgTarget: 'none',
                                    value: 600,
                                    enableKeyEvents: true,
                                    bind: {
                                        fieldLabel: '{detect_time}'
                                    },
                                    listeners: {
                                        change: 'onFt_dos_block_timeChange21',
                                        keydown: 'onFt_dos_block_timeKeydown21',
                                        blur: 'onFt_dos_block_timeBlur21',
                                        focus: 'onFt_dos_block_timeFocus21',
                                        errorchange: 'onFt_dos_block_timeErrorChange21'
                                    }
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: 'chk_server_rst_use',
                                    margin: '0 0 0 20',
                                    labelSeparator: ' ',
                                    boxLabel: '서버 세션 최적화'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '0 0 0 20',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            padding: '10 0 0 0',
                                            width: 460,
                                            title: 'Packet Anomaly 검사',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            margin: '0 0 5 0 ',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        var _value = removeComma(value);
                                                                        if(!LengthCheck(_value, 0, 1500)){ return ValidLimit(0, '1,500'); }

                                                                        return true;
                                                                    },
                                                                    fieldInfo: {
                                                                        txt: msg_tip_length(0,
                                                                        1500,
                                                                        0)
                                                                    },
                                                                    cls: 'inp_unit',
                                                                    id: 'ft_pkt_size',
                                                                    width: 310,
                                                                    afterBodyEl: [
                                                                        '<div class="inp_after">byte</div>'
                                                                    ],
                                                                    labelSeparator: ' ',
                                                                    labelWidth: 200,
                                                                    msgTarget: 'none',
                                                                    value: 0,
                                                                    enableKeyEvents: true,
                                                                    bind: {
                                                                        fieldLabel: '{ta_annormal}'
                                                                    },
                                                                    listeners: {
                                                                        change: 'onTextfieldChange',
                                                                        keydown: 'onTextfieldKeydown',
                                                                        blur: 'onTextfieldBlur',
                                                                        focus: 'onTextfieldFocus',
                                                                        errorchange: 'onTextfieldErrorChange'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        var _value = removeComma(value);
                                                                        if(!LengthCheck(_value, 0, 50000)){ return ValidLimit(0, '50,000'); }

                                                                        return true;
                                                                    },
                                                                    fieldInfo: {
                                                                        txt: msg_tip_length(0,
                                                                        50000,
                                                                        0)
                                                                    },
                                                                    cls: 'inp_unit',
                                                                    id: 'ft_pkt_count',
                                                                    width: 110,
                                                                    afterBodyEl: [
                                                                        '<div class="inp_after">{[__zen("count")]}</div>'
                                                                    ],
                                                                    labelSeparator: ' ',
                                                                    msgTarget: 'none',
                                                                    value: 0,
                                                                    enableKeyEvents: true,
                                                                    listeners: {
                                                                        change: 'onTextfieldChange1',
                                                                        keydown: 'onTextfieldKeydown1',
                                                                        blur: 'onTextfieldBlur1',
                                                                        focus: 'onTextfieldFocus1',
                                                                        errorchange: 'onTextfieldErrorChange1'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                var _value = removeComma(value);
                                                                if(!LengthCheck(_value, 0, 600)){ return ValidLimit(0, '600'); }

                                                                return true;
                                                            },
                                                            fieldInfo: '입력범위 : 0 ~ 600 (0은 사용 안함)',
                                                            cls: 'inp_unit',
                                                            hidden: true,
                                                            id: 'ft_pkt_interval',
                                                            width: 310,
                                                            afterBodyEl: [
                                                                '<div class="inp_after">초</div>'
                                                            ],
                                                            fieldLabel: 'Packet Interval 제한',
                                                            labelSeparator: ' ',
                                                            labelWidth: 200,
                                                            msgTarget: 'none',
                                                            value: 2,
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maxLength: 3,
                                                            listeners: {
                                                                keydown: 'onTextfieldKeydown2',
                                                                blur: 'onTextfieldBlur2',
                                                                focus: 'onTextfieldFocus2',
                                                                errorchange: 'onTextfieldErrorChange2'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                var _value = removeComma(value);
                                                                if(!LengthCheck(_value, 0, 6000)){ return ValidLimit(0, '6,000'); }

                                                                return true;
                                                            },
                                                            fieldInfo: {
                                                                txt: msg_tip_length(0,
                                                                6000,
                                                                0)
                                                            },
                                                            cls: 'inp_unit',
                                                            id: 'ft_request_timeout',
                                                            width: 310,
                                                            afterBodyEl: [
                                                                '<div class="inp_after">{[__zen("sec")]}</div>'
                                                            ],
                                                            labelSeparator: ' ',
                                                            labelWidth: 200,
                                                            msgTarget: 'none',
                                                            value: 50,
                                                            enableKeyEvents: true,
                                                            bind: {
                                                                fieldLabel: '{ta_user_ses}'
                                                            },
                                                            listeners: {
                                                                change: 'onTextfieldChange2',
                                                                keydown: 'onTextfieldKeydown3',
                                                                blur: 'onTextfieldBlur3',
                                                                focus: 'onTextfieldFocus3',
                                                                errorchange: 'onTextfieldErrorChange3'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                render: 'onFieldsetRender'
                                            }
                                        },
                                        {
                                            xtype: 'fieldset',
                                            padding: '10 0 0 0',
                                            width: 460,
                                            title: 'TCP Window 검사',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                var _value = removeComma(value);
                                                                if(!LengthCheck(_value, 0, 65535)){ return ValidLimit(0, '65,535'); }

                                                                return true;
                                                            },
                                                            fieldInfo: {
                                                                txt: msg_tip_length(0,
                                                                65535,
                                                                0)
                                                            },
                                                            cls: 'inp_unit',
                                                            id: 'ft_win_size',
                                                            width: 310,
                                                            afterBodyEl: [
                                                                '<div class="inp_after">byte</div>'
                                                            ],
                                                            labelSeparator: ' ',
                                                            labelWidth: 200,
                                                            msgTarget: 'none',
                                                            value: 1100,
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            bind: {
                                                                fieldLabel: '{ta_limit_win}'
                                                            },
                                                            listeners: {
                                                                keydown: 'onTextfieldKeydown21',
                                                                blur: 'onTextfieldBlur21',
                                                                focus: 'onTextfieldFocus21',
                                                                errorchange: 'onTextfieldErrorChange21',
                                                                change: 'onFt_win_sizeChange'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                var _value = removeComma(value);
                                                                if(!LengthCheck(_value, 0, 50000)){ return ValidLimit(0, '50,000'); }

                                                                return true;
                                                            },
                                                            fieldInfo: {
                                                                txt: msg_tip_length(0,
                                                                50000,
                                                                0)
                                                            },
                                                            cls: 'inp_unit',
                                                            id: 'ft_zero_win_cnt',
                                                            width: 310,
                                                            afterBodyEl: [
                                                                '<div class="inp_after">{[__zen("count")]}</div>'
                                                            ],
                                                            labelSeparator: ' ',
                                                            labelWidth: 200,
                                                            msgTarget: 'none',
                                                            value: 5,
                                                            enableKeyEvents: true,
                                                            bind: {
                                                                fieldLabel: '{ta_limit_zero}'
                                                            },
                                                            listeners: {
                                                                change: 'onTextfieldChange21',
                                                                keydown: 'onTextfieldKeydown31',
                                                                blur: 'onTextfieldBlur31',
                                                                focus: 'onTextfieldFocus31',
                                                                errorchange: 'onTextfieldErrorChange31'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                render: 'onFieldsetRender1'
                                            }
                                        },
                                        {
                                            xtype: 'fieldset',
                                            padding: '10 0 0 0',
                                            width: 460,
                                            title: 'HTTP POST Header 검사',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                var _value = removeComma(value);
                                                                if(!LengthCheck(_value, 0, 200000000)){ return ValidLimit(0, '200,000,000'); }

                                                                return true;
                                                            },
                                                            fieldInfo: {
                                                                txt: msg_tip_length(0,
                                                                200000000,
                                                                0)
                                                            },
                                                            cls: 'inp_unit',
                                                            id: 'ft_content_len',
                                                            width: 350,
                                                            afterBodyEl: [
                                                                '<div class="inp_after">byte</div>'
                                                            ],
                                                            labelSeparator: ' ',
                                                            labelWidth: 200,
                                                            msgTarget: 'none',
                                                            value: 0,
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            bind: {
                                                                fieldLabel: '{ta_limit_cont}'
                                                            },
                                                            listeners: {
                                                                keydown: 'onTextfieldKeydown211',
                                                                blur: 'onTextfieldBlur211',
                                                                focus: 'onTextfieldFocus211',
                                                                errorchange: 'onTextfieldErrorChange211',
                                                                change: 'onFt_win_sizeChange1'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                var _value = removeComma(value);
                                                                if(!LengthCheck(_value, 0, 50000)){ return ValidLimit(0, '50,000'); }

                                                                return true;
                                                            },
                                                            fieldInfo: {
                                                                txt: msg_tip_length(0,
                                                                50000,
                                                                0)
                                                            },
                                                            cls: 'inp_unit',
                                                            id: 'ft_post_param_cnt',
                                                            width: 310,
                                                            afterBodyEl: [
                                                                '<div class="inp_after">{[__zen("count")]}</div>'
                                                            ],
                                                            labelSeparator: ' ',
                                                            labelWidth: 200,
                                                            msgTarget: 'none',
                                                            value: 0,
                                                            enableKeyEvents: true,
                                                            bind: {
                                                                fieldLabel: '{ta_limit_post}'
                                                            },
                                                            listeners: {
                                                                change: 'onTextfieldChange211',
                                                                keydown: 'onTextfieldKeydown311',
                                                                blur: 'onTextfieldBlur311',
                                                                focus: 'onTextfieldFocus311',
                                                                errorchange: 'onTextfieldErrorChange311'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                render: 'onFieldsetRender11'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '0 0 0 20',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            padding: '10 0 0 0',
                                            width: 400,
                                            title: 'HTTP Cache Control 검사',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                var _value = removeComma(value);
                                                                if(!LengthCheck(_value, 0, 50000)){ return ValidLimit(0, '50,000'); }

                                                                return true;
                                                            },
                                                            fieldInfo: {
                                                                txt: msg_tip_length(0,
                                                                50000,
                                                                0)
                                                            },
                                                            cls: 'inp_unit',
                                                            id: 'ft_detect_cnt',
                                                            width: 310,
                                                            afterBodyEl: [
                                                                '<div class="inp_after">{[__zen("count")]}</div>'
                                                            ],
                                                            labelSeparator: ' ',
                                                            labelWidth: 200,
                                                            msgTarget: 'none',
                                                            value: 3,
                                                            enableKeyEvents: true,
                                                            bind: {
                                                                fieldLabel: '{ta_limit_count}'
                                                            },
                                                            listeners: {
                                                                change: 'onTextfieldChange212',
                                                                keydown: 'onTextfieldKeydown312',
                                                                blur: 'onTextfieldBlur312',
                                                                focus: 'onTextfieldFocus312',
                                                                errorchange: 'onTextfieldErrorChange312'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                var _value = removeComma(value);
                                                                if(!LengthCheck(_value, 0, 600)){ return ValidLimit(0, '600'); }

                                                                return true;
                                                            },
                                                            fieldInfo: {
                                                                txt: msg_tip_length(0,
                                                                600,
                                                                0)
                                                            },
                                                            cls: 'inp_unit',
                                                            id: 'ft_detect_interval',
                                                            width: 310,
                                                            afterBodyEl: [
                                                                '<div class="inp_after">{[__zen("sec")]}</div>'
                                                            ],
                                                            labelSeparator: ' ',
                                                            labelWidth: 200,
                                                            msgTarget: 'none',
                                                            value: 10,
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maxLength: 3,
                                                            bind: {
                                                                fieldLabel: '{ta_limit_interval}'
                                                            },
                                                            listeners: {
                                                                keydown: 'onTextfieldKeydown212',
                                                                blur: 'onTextfieldBlur212',
                                                                focus: 'onTextfieldFocus212',
                                                                errorchange: 'onTextfieldErrorChange212',
                                                                change: 'onFt_win_sizeChange2'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                render: 'onFieldsetRender12'
                                            }
                                        },
                                        {
                                            xtype: 'fieldset',
                                            padding: '10 0 0 0',
                                            width: 400,
                                            title: 'HTTP 검사',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    id: 'ctn_use_port',
                                                    padding: '0 10 10 10 ',
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            cls: 'btn_b',
                                                            iconCls: 'icb_add',
                                                            bind: {
                                                                text: '{ta_http_port_add}'
                                                            },
                                                            listeners: {
                                                                click: 'onButtonClick'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'gridpanel',
                                                            cls: 'in_grid',
                                                            height: 180,
                                                            id: 'grid_port_list',
                                                            allowDeselect: true,
                                                            columnLines: false,
                                                            disableSelection: true,
                                                            hideHeaders: true,
                                                            rowLines: false,
                                                            store: 'store_trafficAnomaly_portList',
                                                            columns: [
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {


                                                                        metaData.tdCls = 'cell_text';
                                                                        return value;
                                                                    },
                                                                    dataIndex: 'port',
                                                                    flex: 1,
                                                                    editor: {
                                                                        xtype: 'textfield',
                                                                        fieldInfo: {
                                                                            txt: msg_tip_length(0,
                                                                            65535,
                                                                            null)
                                                                        },
                                                                        baseCls: 'cell_text',
                                                                        maxLength: 5,
                                                                        listeners: {
                                                                            blur: 'onTextfieldBlur4',
                                                                            focus: 'onTextfieldFocus4'
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'actioncolumn',
                                                                    width: 30,
                                                                    items: [
                                                                        {
                                                                            getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                                                return "icr_del";
                                                                            },
                                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {

                                                                                if(record.data.port === 80 || record.data.port === '80'){
                                                                                    Ext.Msg.alert(__weguardia, err_port_delete(80));
                                                                                    return false;
                                                                                }


                                                                                Ext.getCmp("grid_port_list").getStore().removeAt(rowIndex);
                                                                                Ext.getCmp('grid_port_list').getPlugin().completeEdit();
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            plugins: [
                                                                {
                                                                    ptype: 'cellediting',
                                                                    clicksToEdit: 1,
                                                                    listeners: {
                                                                        beforeedit: 'onCellEditingBeforeEdit',
                                                                        validateedit: 'onCellEditingValidateedit'
                                                                    }
                                                                }
                                                            ],
                                                            viewConfig: {
                                                                markDirty: false
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                render: 'onFieldsetRender111'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'form',
                            id: 'form_dns_query',
                            margin: '0 20 0 0',
                            width: 440,
                            bind: {
                                title: '{ta_dns}'
                            },
                            tools: [
                                {
                                    xtype: 'toggleslide',
                                    onText: {
                                        txt: __zen('toggle_on')
                                    },
                                    offText: {
                                        txt: __zen('toggle_off')
                                    },
                                    resizeHandle: false,
                                    state: true,
                                    id: 'chk_dns_query',
                                    listeners: {
                                        change: 'onToolChange12'
                                    }
                                }
                            ],
                            items: [
                                {
                                    xtype: 'container',
                                    cls: 'fld_info_box',
                                    margin: '0 0 5 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '0 20 0 0',
                                            bind: {
                                                text: '{action}'
                                            }
                                        },
                                        {
                                            xtype: 'segmentedbutton',
                                            cls: 'zen_seg',
                                            id: 'cb_dns_action',
                                            margin: '0 30 0 0',
                                            items: [
                                                {
                                                    enableToggle: true,
                                                    pressed: true,
                                                    bind: {
                                                        text: '{detect}'
                                                    },
                                                    listeners: {
                                                        toggle: 'onButtonToggle22'
                                                    }
                                                },
                                                {
                                                    bind: {
                                                        text: '{deny}'
                                                    },
                                                    listeners: {
                                                        toggle: 'onButtonToggle112'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                var _value = removeComma(value);
                                                if(!LengthCheck(_value, 1, 2592000)){ return ValidLimit(1, '2,592,000'); }

                                                return true;
                                            },
                                            fieldInfo: {
                                                txt: msg_tip_length(1,
                                                2592000,
                                                null)
                                            },
                                            cls: 'inp_unit',
                                            disabled: true,
                                            id: 'ft_dns_block_time',
                                            margin: '0 3 0 0',
                                            width: 220,
                                            afterBodyEl: [
                                                '<div class="inp_after">{[__zen("sec")]}</div>'
                                            ],
                                            labelSeparator: ' ',
                                            labelWidth: 70,
                                            msgTarget: 'none',
                                            value: 600,
                                            enableKeyEvents: true,
                                            bind: {
                                                fieldLabel: '{detect_time}'
                                            },
                                            listeners: {
                                                change: 'onFt_dos_block_timeChange22',
                                                keydown: 'onFt_dos_block_timeKeydown22',
                                                blur: 'onFt_dos_block_timeBlur22',
                                                focus: 'onFt_dos_block_timeFocus22',
                                                errorchange: 'onFt_dos_block_timeErrorChange22'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '0 0 0 10',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '0 5 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 60000)){ return ValidLimit(0, '60,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        60000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_dns_dod',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">{[__zen("ta_loadbl")]}</div>'
                                                    ],
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange13211',
                                                        keydown: 'onFt_dos_block_timeKeydown13211',
                                                        blur: 'onFt_dos_block_timeBlur13211',
                                                        focus: 'onFt_dos_block_timeFocus13211',
                                                        errorchange: 'onFt_dos_block_timeErrorChange13211'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            margin: '0 5 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 60000)){ return ValidLimit(0, '60,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        60000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_dns_pps',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">pps</div>'
                                                    ],
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange1322',
                                                        keydown: 'onFt_dos_block_timeKeydown1322',
                                                        blur: 'onFt_dos_block_timeBlur1322',
                                                        focus: 'onFt_dos_block_timeFocus1322',
                                                        errorchange: 'onFt_dos_block_timeErrorChange1322'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '5 0 5 20',
                                            iconCls: 'icb_add',
                                            bind: {
                                                text: '{ta_dns_port_add}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick1'
                                            }
                                        },
                                        {
                                            xtype: 'gridpanel',
                                            cls: 'in_grid',
                                            height: 180,
                                            id: 'grid_dns_port_list',
                                            margin: '0 0 0 20',
                                            allowDeselect: true,
                                            columnLines: false,
                                            disableSelection: true,
                                            hideHeaders: true,
                                            rowLines: false,
                                            store: 'store_trafficAnomaly_dns_portList',
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {


                                                        metaData.tdCls = 'cell_text';
                                                        return value;
                                                    },
                                                    dataIndex: 'port',
                                                    flex: 1,
                                                    editor: {
                                                        xtype: 'textfield',
                                                        fieldInfo: {
                                                            txt: msg_tip_length(0,
                                                            65535,
                                                            null)
                                                        },
                                                        baseCls: 'cell_text',
                                                        maxLength: 5,
                                                        listeners: {
                                                            blur: 'onTextfieldBlur41',
                                                            focus: 'onTextfieldFocus41'
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'actioncolumn',
                                                    width: 30,
                                                    items: [
                                                        {
                                                            getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                                return "icr_del";
                                                            },
                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {

                                                                if(record.data.port === 53 || record.data.port === '53'){
                                                                    Ext.Msg.alert(__weguardia, err_port_delete(53));
                                                                    return false;
                                                                }


                                                                Ext.getCmp("grid_dns_port_list").getStore().removeAt(rowIndex);
                                                                Ext.getCmp('grid_dns_port_list').getPlugin().completeEdit();
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            plugins: [
                                                {
                                                    ptype: 'cellediting',
                                                    clicksToEdit: 1,
                                                    listeners: {
                                                        beforeedit: 'onCellEditingBeforeEdit1',
                                                        validateedit: 'onCellEditingValidateedit1'
                                                    }
                                                }
                                            ],
                                            viewConfig: {
                                                markDirty: false
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    height: 180,
                                    hidden: true,
                                    html: '<table id="tbl_dns_port" width="100%" class="light_tbl"><tbody></tbody>\n</table>',
                                    id: 'cont_dns_port',
                                    margin: '0 0 0 20',
                                    overflowY: 'auto'
                                }
                            ]
                        },
                        {
                            xtype: 'form',
                            id: 'form_sql_query',
                            width: 440,
                            bind: {
                                title: '{ta_sql}'
                            },
                            tools: [
                                {
                                    xtype: 'toggleslide',
                                    onText: {
                                        txt: __zen('toggle_on')
                                    },
                                    offText: {
                                        txt: __zen('toggle_off')
                                    },
                                    resizeHandle: false,
                                    state: true,
                                    id: 'chk_sql_query',
                                    listeners: {
                                        change: 'onToolChange121'
                                    }
                                }
                            ],
                            items: [
                                {
                                    xtype: 'container',
                                    cls: 'fld_info_box',
                                    margin: '0 0 5 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '0 20 0 0',
                                            bind: {
                                                text: '{action}'
                                            }
                                        },
                                        {
                                            xtype: 'segmentedbutton',
                                            cls: 'zen_seg',
                                            id: 'cb_sql_action',
                                            margin: '0 30 0 0',
                                            items: [
                                                {
                                                    enableToggle: true,
                                                    pressed: true,
                                                    bind: {
                                                        text: '{detect}'
                                                    },
                                                    listeners: {
                                                        toggle: 'onButtonToggle221'
                                                    }
                                                },
                                                {
                                                    bind: {
                                                        text: '{deny}'
                                                    },
                                                    listeners: {
                                                        toggle: 'onButtonToggle1121'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                var _value = removeComma(value);
                                                if(!LengthCheck(_value, 1, 2592000)){ return ValidLimit(1, '2,592,000'); }

                                                return true;
                                            },
                                            fieldInfo: {
                                                txt: msg_tip_length(1,
                                                2592000,
                                                null)
                                            },
                                            cls: 'inp_unit',
                                            disabled: true,
                                            id: 'ft_sql_block_time',
                                            margin: '0 3 0 0',
                                            width: 220,
                                            afterBodyEl: [
                                                '<div class="inp_after">{[__zen("sec")]}</div>'
                                            ],
                                            labelSeparator: ' ',
                                            labelWidth: 70,
                                            msgTarget: 'none',
                                            value: 600,
                                            enableKeyEvents: true,
                                            bind: {
                                                fieldLabel: '{detect_time}'
                                            },
                                            listeners: {
                                                change: 'onFt_dos_block_timeChange221',
                                                keydown: 'onFt_dos_block_timeKeydown221',
                                                blur: 'onFt_dos_block_timeBlur221',
                                                focus: 'onFt_dos_block_timeFocus221',
                                                errorchange: 'onFt_dos_block_timeErrorChange221'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '0 0 0 10',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '0 5 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 60000)){ return ValidLimit(0, '60,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        60000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_sql_dod',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">{[__zen("ta_loadbl")]}</div>'
                                                    ],
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange132111',
                                                        keydown: 'onFt_dos_block_timeKeydown132111',
                                                        blur: 'onFt_dos_block_timeBlur132111',
                                                        focus: 'onFt_dos_block_timeFocus132111',
                                                        errorchange: 'onFt_dos_block_timeErrorChange132111'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            margin: '0 5 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var _value = removeComma(value);
                                                        if(!LengthCheck(_value, 0, 60000)){ return ValidLimit(0, '60,000'); }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        60000,
                                                        0)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'ft_sql_pps',
                                                    width: 130,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">pps</div>'
                                                    ],
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        change: 'onFt_dos_block_timeChange13221',
                                                        keydown: 'onFt_dos_block_timeKeydown13221',
                                                        blur: 'onFt_dos_block_timeBlur13221',
                                                        focus: 'onFt_dos_block_timeFocus13221',
                                                        errorchange: 'onFt_dos_block_timeErrorChange13221'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '5 0 5 20',
                                            iconCls: 'icb_add',
                                            bind: {
                                                text: '{ta_sql_port_add}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick11'
                                            }
                                        },
                                        {
                                            xtype: 'gridpanel',
                                            cls: 'in_grid',
                                            height: 180,
                                            id: 'grid_sql_port_list',
                                            margin: '0 0 0 20',
                                            allowDeselect: true,
                                            columnLines: false,
                                            disableSelection: true,
                                            hideHeaders: true,
                                            rowLines: false,
                                            store: 'store_trafficAnomaly_sql_portList',
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {


                                                        metaData.tdCls = 'cell_text';
                                                        return value;
                                                    },
                                                    dataIndex: 'port',
                                                    flex: 1,
                                                    editor: {
                                                        xtype: 'textfield',
                                                        fieldInfo: {
                                                            txt: msg_tip_length(0,
                                                            65535,
                                                            null)
                                                        },
                                                        baseCls: 'cell_text',
                                                        maxLength: 5,
                                                        listeners: {
                                                            blur: 'onTextfieldBlur411',
                                                            focus: 'onTextfieldFocus411'
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'actioncolumn',
                                                    width: 30,
                                                    items: [
                                                        {
                                                            getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                                return "icr_del";
                                                            },
                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {


                                                                Ext.getCmp("grid_sql_port_list").getStore().removeAt(rowIndex);
                                                                Ext.getCmp('grid_sql_port_list').getPlugin().completeEdit();
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            plugins: [
                                                {
                                                    ptype: 'cellediting',
                                                    clicksToEdit: 1,
                                                    listeners: {
                                                        validateedit: 'onCellEditingValidateedit11'
                                                    }
                                                }
                                            ],
                                            viewConfig: {
                                                markDirty: false
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
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
                            itemId: 'fld_msg'
                        },
                        {
                            xtype: 'button',
                            cls: 'ft_confirm',
                            iconCls: 'ft_confirm_icl',
                            bind: {
                                text: '{confirm}'
                            },
                            listeners: {
                                click: 'on_btn_confirm'
                            }
                        },
                        {
                            xtype: 'button',
                            cls: 'ft_cancel',
                            bind: {
                                text: '{cancel}'
                            },
                            listeners: {
                                click: 'on_btn_cancel'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onNFW2_monitor_basicAfterRender'
    },

    onToolChange: function(tool, state) {

        var _panel = tool.up('panel');
        var _state = (state===true)?false:true;

        _panel.query('container:not(header)').forEach(function(c){ c.setDisabled(_state);});


    },

    onButtonToggle: function(button, pressed, eOpts) {
        if(pressed === true){Ext.getCmp('ft_dos_block_time').disable();}
    },

    onButtonToggle1: function(button, pressed, eOpts) {
        if(pressed === true){Ext.getCmp('ft_dos_block_time').enable();}
    },

    onFt_dos_block_timeChange: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(600);
        }
    },

    onFt_dos_block_timeFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onFt_dos_block_timeErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange1: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown1: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur1: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus1: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange1: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange11: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown11: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur11: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus11: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange11: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange111: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown111: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur111: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus111: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange111: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange1111: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown1111: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur1111: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus1111: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange1111: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange12: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown12: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur12: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus12: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange12: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange13: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown13: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur13: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus13: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange13: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange112: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown112: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur112: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus112: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange112: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange131: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown131: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur131: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus131: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange131: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange1121: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown1121: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur1121: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus1121: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange1121: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange11211: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown11211: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur11211: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus11211: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange11211: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onToolChange1: function(tool, state) {

        var _panel = tool.up('panel');
        var _state = (state===true)?false:true;

        _panel.query('container:not(header)').forEach(function(c){ c.setDisabled(_state);});


    },

    onButtonToggle2: function(button, pressed, eOpts) {
        if(pressed === true){Ext.getCmp('ft_ddos_block_time').disable();}
    },

    onButtonToggle11: function(button, pressed, eOpts) {
        if(pressed === true){Ext.getCmp('ft_ddos_block_time').enable();}
    },

    onFt_dos_block_timeChange2: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown2: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur2: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(600);
        }
    },

    onFt_dos_block_timeFocus2: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onFt_dos_block_timeErrorChange2: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange14: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown14: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur14: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus14: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange14: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange141: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown141: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur141: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus141: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange141: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange142: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown142: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur142: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus142: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange142: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange1411: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown1411: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur1411: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus1411: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange1411: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange1421: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown1421: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur1421: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus1421: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange1421: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange14111: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown14111: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur14111: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus14111: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange14111: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange14211: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown14211: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur14211: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus14211: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange14211: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange141111: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown141111: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur141111: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus141111: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange141111: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange142111: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown142111: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur142111: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus142111: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange142111: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange1411111: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown1411111: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur1411111: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus1411111: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange1411111: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange1321: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown1321: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur1321: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus1321: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange1321: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange132: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown132: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur132: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus132: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange132: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange1122: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown1122: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur1122: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus1122: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange1122: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange1311: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown1311: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur1311: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus1311: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange1311: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange11212: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown11212: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur11212: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus11212: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange11212: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange112111: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown112111: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur112111: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus112111: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange112111: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onToolChange11: function(tool, state) {

        var _panel = tool.up('panel');
        var _state = (state===true)?false:true;

        console.log(_panel.query('fieldset'));

        if(state === true){


             _panel.query('container:not(header)').forEach(function(c){ c.setDisabled(false);});

        this.http_toggleslide(Ext.getCmp('chk_pkt_anomaly_use'));
        this.http_toggleslide(Ext.getCmp('chk_tcp_window_use'));
        this.http_toggleslide(Ext.getCmp('chk_post_hdr_use'));
        this.http_toggleslide(Ext.getCmp('chk_cc_attack_use'));
        this.http_toggleslide(Ext.getCmp('chk_http_port_use'));
        }else{
          _panel.query('container:not(header)').forEach(function(c){ c.setDisabled(true);});
        }

        //_panel.query('container:not(header)').forEach(function(c){ c.setDisabled(_state);});


    },

    onButtonToggle21: function(button, pressed, eOpts) {
        if(pressed === true){Ext.getCmp('ft_http_block_time').disable();}
    },

    onButtonToggle111: function(button, pressed, eOpts) {
        if(pressed === true){Ext.getCmp('ft_http_block_time').enable();}
    },

    onFt_dos_block_timeChange21: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown21: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur21: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(600);
        }
    },

    onFt_dos_block_timeFocus21: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onFt_dos_block_timeErrorChange21: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTextfieldChange: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onTextfieldKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onTextfieldBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onTextfieldFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onTextfieldErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTextfieldChange1: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onTextfieldKeydown1: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onTextfieldBlur1: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onTextfieldFocus1: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onTextfieldErrorChange1: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTextfieldKeydown2: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onTextfieldBlur2: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(2);
        }
    },

    onTextfieldFocus2: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onTextfieldErrorChange2: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTextfieldChange2: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onTextfieldKeydown3: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onTextfieldBlur3: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(50);
        }
    },

    onTextfieldFocus3: function(component, event, eOpts) {
        setTipFocus(this,component);
        /*
        if(component.getValue()==="0"){
            component.setValue("");
        }*/
    },

    onTextfieldErrorChange3: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFieldsetRender: function(component, eOpts) {
        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'chk_pkt_anomaly_use',
            style:'margin-left:350px',
            resizeHandle: false,
            state: true,
            listeners: {
                change: 'http_toggleslide'
            }
        });

        component.legend.add(tbutton);
    },

    onTextfieldKeydown21: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onTextfieldBlur21: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(1100);
        }
    },

    onTextfieldFocus21: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onTextfieldErrorChange21: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_win_sizeChange: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onTextfieldChange21: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onTextfieldKeydown31: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onTextfieldBlur31: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(5);
        }
    },

    onTextfieldFocus31: function(component, event, eOpts) {
        setTipFocus(this,component);

    },

    onTextfieldErrorChange31: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFieldsetRender1: function(component, eOpts) {
        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
                  onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'chk_tcp_window_use',
            style:'margin-left:350px',
                                    resizeHandle: false,
                                    state: true,
                                    listeners: {
                                        change: 'http_toggleslide'
                                    }
                });

        component.legend.add(tbutton);

    },

    onTextfieldKeydown211: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onTextfieldBlur211: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onTextfieldFocus211: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onTextfieldErrorChange211: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_win_sizeChange1: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onTextfieldChange211: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onTextfieldKeydown311: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onTextfieldBlur311: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onTextfieldFocus311: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onTextfieldErrorChange311: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFieldsetRender11: function(component, eOpts) {
        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
                  onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'chk_post_hdr_use',
            style:'margin-left:350px',
                                    resizeHandle: false,
                                    state: true,
                                    listeners: {
                                        change: 'http_toggleslide'
                                    }
                });

        component.legend.add(tbutton);
    },

    onTextfieldChange212: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onTextfieldKeydown312: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onTextfieldBlur312: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(3);
        }
    },

    onTextfieldFocus312: function(component, event, eOpts) {
        setTipFocus(this,component);

    },

    onTextfieldErrorChange312: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTextfieldKeydown212: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onTextfieldBlur212: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(10);
        }
    },

    onTextfieldFocus212: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onTextfieldErrorChange212: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_win_sizeChange2: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFieldsetRender12: function(component, eOpts) {
        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
                  onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'chk_cc_attack_use',
            style:'margin-left:300px',
                                    resizeHandle: false,
                                    state: true,
                                    listeners: {
                                        change: 'http_toggleslide'
                                    }
                });

        component.legend.add(tbutton);
    },

    onButtonClick: function(button, e, eOpts) {
        var store = Ext.getCmp('grid_port_list').getStore();
        var obj = {
                        'port' : ''
                    };
        store.add(obj);
    },

    onTextfieldBlur4: function(component, event, eOpts) {
        setTipBlur(this,component);

    },

    onTextfieldFocus4: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onCellEditingBeforeEdit: function(editor, context, eOpts) {
        if(context.value === 80 || context.value === '80'){ return false;}
    },

    onCellEditingValidateedit: function(editor, context, eOpts) {
        var val = context.value;

        if(val === ""){return false;}



        for(var i = 0 ; i < Ext.getCmp('grid_port_list').getStore().data.length ; i++){

            if(context.rowIdx === i){continue;}

                        if(Ext.getCmp('grid_port_list').getStore().data.items[i].data.port === val){

                          Ext.Msg.alert(__weguardia, get_msg('err_dob_port'));



                            return false;



                        }

                    }
    },

    onFieldsetRender111: function(component, eOpts) {
        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
                  onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'chk_http_port_use',
            style:'margin-left:300px',
                                    resizeHandle: false,
                                    state: true,
                                    listeners: {
                                        change: 'http_toggleslide'
                                    }
                });

        component.legend.add(tbutton);
    },

    onToolChange12: function(tool, state) {

        var _panel = tool.up('panel');
        var _state = (state===true)?false:true;

        _panel.query('container:not(header)').forEach(function(c){ c.setDisabled(_state);});


    },

    onButtonToggle22: function(button, pressed, eOpts) {
        if(pressed === true){Ext.getCmp('ft_dns_block_time').disable();}
    },

    onButtonToggle112: function(button, pressed, eOpts) {
        if(pressed === true){Ext.getCmp('ft_dns_block_time').enable();}
    },

    onFt_dos_block_timeChange22: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown22: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur22: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(600);
        }
    },

    onFt_dos_block_timeFocus22: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onFt_dos_block_timeErrorChange22: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange13211: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown13211: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur13211: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus13211: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange13211: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange1322: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown1322: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur1322: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus1322: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange1322: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onButtonClick1: function(button, e, eOpts) {

        var store = Ext.getCmp('grid_dns_port_list').getStore();
        var obj = {
                        'port' : ''
                    };
        store.add(obj);



        /*


           var tpl = new Ext.Template(
                '<tr>',
                    '<td><input type="text" value="{0}"/><button class="btn_s" >x</button></td>',
                '</tr>'
            );

        var tableBody = Ext.get('tbl_dns_port').first('tbody');

                    // Append the generated template to the table body
                    tpl.append(tableBody, [Ext.id()]);*/
    },

    onTextfieldBlur41: function(component, event, eOpts) {
        setTipBlur(this,component);

    },

    onTextfieldFocus41: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onCellEditingBeforeEdit1: function(editor, context, eOpts) {
        if(context.value === 53 || context.value === '53'){ return false;}
    },

    onCellEditingValidateedit1: function(editor, context, eOpts) {
        var val = context.value;

        if(val === ""){return false;}



        for(var i = 0 ; i < Ext.getCmp('grid_dns_port_list').getStore().data.length ; i++){

            if(context.rowIdx === i){continue;}

                        if(Ext.getCmp('grid_dns_port_list').getStore().data.items[i].data.port === val){

                          Ext.Msg.alert(__weguardia, get_msg('err_dob_port'));



                            return false;



                        }

                    }
    },

    onToolChange121: function(tool, state) {

        var _panel = tool.up('panel');
        var _state = (state===true)?false:true;

        _panel.query('container:not(header)').forEach(function(c){ c.setDisabled(_state);});


    },

    onButtonToggle221: function(button, pressed, eOpts) {
        if(pressed === true){Ext.getCmp('ft_sql_block_time').disable();}
    },

    onButtonToggle1121: function(button, pressed, eOpts) {
        if(pressed === true){Ext.getCmp('ft_sql_block_time').enable();}
    },

    onFt_dos_block_timeChange221: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown221: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur221: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(600);
        }
    },

    onFt_dos_block_timeFocus221: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onFt_dos_block_timeErrorChange221: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange132111: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown132111: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur132111: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus132111: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange132111: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dos_block_timeChange13221: function(field, newValue, oldValue, eOpts) {
         var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_dos_block_timeKeydown13221: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                if(ValidNumKeydown(code)===false){
                    e.stopEvent();
                }
    },

    onFt_dos_block_timeBlur13221: function(component, event, eOpts) {
        setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
    },

    onFt_dos_block_timeFocus13221: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onFt_dos_block_timeErrorChange13221: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onButtonClick11: function(button, e, eOpts) {

        var store = Ext.getCmp('grid_sql_port_list').getStore();
        var obj = {
                        'port' : ''
                    };
        store.add(obj);



        /*


           var tpl = new Ext.Template(
                '<tr>',
                    '<td><input type="text" value="{0}"/><button class="btn_s" >x</button></td>',
                '</tr>'
            );

        var tableBody = Ext.get('tbl_dns_port').first('tbody');

                    // Append the generated template to the table body
                    tpl.append(tableBody, [Ext.id()]);*/
    },

    onTextfieldBlur411: function(component, event, eOpts) {
        setTipBlur(this,component);

    },

    onTextfieldFocus411: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onCellEditingValidateedit11: function(editor, context, eOpts) {
        var val = context.value;

        if(val === ""){return false;}



        for(var i = 0 ; i < Ext.getCmp('grid_sql_port_list').getStore().data.length ; i++){

            if(context.rowIdx === i){continue;}

                        if(Ext.getCmp('grid_sql_port_list').getStore().data.items[i].data.port === val){

                          Ext.Msg.alert(__weguardia, get_msg('err_dob_port'));



                            return false;



                        }

                    }
    },

    on_btn_confirm: function(button, e, eOpts) {
        this.setObject();
    },

    on_btn_cancel: function(button, e, eOpts) {
        this.getObject();
    },

    onNFW2_monitor_basicAfterRender: function(component, eOpts) {
        hideLoadMask();
        this.getLicense();
        this.getObject();
        this.fieldInfo = makeZenTip();
    },

    setObject: function() {





                                        var me = this;

                                        if(Ext.getCmp('form_dos_trafficAnomaly').getForm().isValid() && Ext.getCmp('form_ddos_trafficAnomaly').getForm().isValid() &&
                                          Ext.getCmp('form_http_trafficAnomaly').getForm().isValid() && Ext.getCmp('form_dns_query').getForm().isValid() &&
                                          Ext.getCmp('form_sql_query').getForm().isValid())
                                        {
                                            //'0' check

                                            var dos_flag =false;	//dos 설정된 모든값이 '0' 이면 true

                                            var ddos_flag = false;	//ddos 설정된 모든값이 '0' 이면 true

                                            var http_flag = false;

                                            var pkt_anomaly_flag = false;

                                            var tcp_window_flag = false;

                                            var post_hdr_flag = false;

                                            var cc_attack_flag = false;

                                            var dns_flag = false;

                                            var sql_flag = false;

                                            var chk_dos_use = Ext.getCmp('chk_dos_trafficAnomaly').state;
                                            var dos_tcp_syn = Ext.getCmp('ft_dos_tcp_syn').getValue() === '0' ? true:false;
                                            var dos_tcp_syn_ack = Ext.getCmp('ft_dos_tcp_syn_ack').getValue() === '0' ? true:false;
                                            var dos_tcp_ack = Ext.getCmp('ft_dos_tcp_ack').getValue() === '0' ? true:false;
                                            var dos_tcp_fin = Ext.getCmp('ft_dos_tcp_fin').getValue() === '0' ? true:false;
                                            var dos_http_get = Ext.getCmp('ft_dos_http_get').getValue() === '0' ? true:false;
                                            var dos_udp_pps = Ext.getCmp('ft_dos_udp_pps').getValue() === '0' ? true:false;
                                            var dos_udp_mbps = Ext.getCmp('ft_dos_udp_mbps').getValue() === '0' ? true:false;
                                            var dos_icmp_pps = Ext.getCmp('ft_dos_icmp_pps').getValue() === '0' ? true:false;
                                            var dos_icmp_mbps = Ext.getCmp('ft_dos_icmp_mbps').getValue() === '0' ? true:false;
                                            var dos_icmp_limit = Ext.getCmp('ft_dos_icmp_limit').getValue()=== '0' ? true:false ;

                                            //DoS 항목의 값이 모두 0일 경우 WeGuardia™ DMC창 표시
                                            if(chk_dos_use && dos_tcp_syn && dos_tcp_syn_ack && dos_tcp_ack && dos_tcp_fin && dos_http_get && dos_udp_pps && dos_udp_mbps && dos_icmp_pps && dos_icmp_mbps && dos_icmp_limit){

                                                dos_flag =true;

                                            }

                                            var chk_ddos_use = Ext.getCmp('chk_ddos_trafficAnomaly').state;
                                            var ddos_tcp_syn_dod = Ext.getCmp('ft_ddos_tcp_syn_dod').getValue() === '0' ? true:false;
                                            var ddos_tcp_syn_pps = Ext.getCmp('ft_ddos_tcp_syn_pps').getValue() === '0' ? true:false;
                                            var ddos_tcp_sa_dod = Ext.getCmp('ft_ddos_tcp_sa_dod').getValue() === '0' ? true:false;
                                            var ddos_tcp_sa_pps = Ext.getCmp('ft_ddos_tcp_sa_pps').getValue() === '0' ? true:false;
                                            var ddos_tcp_ack_dod = Ext.getCmp('ft_ddos_tcp_ack_dod').getValue() === '0' ? true:false;
                                            var ddos_tcp_ack_pps = Ext.getCmp('ft_ddos_tcp_ack_pps').getValue() === '0' ? true:false;
                                            var ddos_tcp_fin_dod = Ext.getCmp('ft_ddos_tcp_fin_dod').getValue() === '0' ? true:false;
                                            var ddos_tcp_fin_pps = Ext.getCmp('ft_ddos_tcp_fin_pps').getValue() === '0' ? true:false;
                                            var ddos_http_dod = Ext.getCmp('ft_ddos_http_dod').getValue() === '0' ? true:false;
                                            var ddos_http_pps = Ext.getCmp('ft_ddos_http_pps').getValue() === '0' ? true:false;
                                            var ddos_udp_dod = Ext.getCmp('ft_ddos_udp_dod').getValue() === '0' ? true:false;
                                            var ddos_udp_pps = Ext.getCmp('ft_ddos_udp_pps').getValue() === '0' ? true:false;
                                            var ddos_udp_mbps = Ext.getCmp('ft_ddos_udp_mbps').getValue() === '0' ? true:false;
                                            var ddos_icmp_dod = Ext.getCmp('ft_ddos_icmp_dod').getValue() === '0' ? true:false;
                                            var ddos_icmp_pps = Ext.getCmp('ft_ddos_icmp_pps').getValue() === '0' ? true:false;
                                            var ddos_icmp_mbps = Ext.getCmp('ft_ddos_icmp_mbps').getValue() === '0' ? true:false;


                                            //DDoS 항목의 값이 모두 0일 경우 WeGuardia™ DMC창 표시
                                            if(chk_ddos_use && ddos_tcp_syn_dod && ddos_tcp_syn_pps && ddos_tcp_sa_dod && ddos_tcp_sa_pps && ddos_tcp_ack_dod && ddos_tcp_ack_pps && ddos_tcp_fin_dod && ddos_tcp_fin_pps &&

                                              ddos_http_dod && ddos_http_pps && ddos_udp_dod && ddos_udp_pps && ddos_udp_mbps && ddos_icmp_dod && ddos_icmp_pps && ddos_icmp_mbps){

                                                ddos_flag =true;

                                            }

                                            //HTTP Packet Anomaly, TCP Window, HTTP POST Header 체크한 상태에서 값이 모두 0

                                            var chk_http_use =Ext.getCmp('chk_http_trafficAnomaly').state;

                                            var chk_pkt_anomaly_use = Ext.getCmp('chk_pkt_anomaly_use').getValue() === true ? true:false;

                                            var ft_pkt_size = Ext.getCmp('ft_pkt_size').getValue() === '0' ? true:false;

                                            //var ft_pkt_interval = Ext.getCmp('ft_pkt_interval').getValue() === '0' ? true:false;

                                            var ft_request_timeout = Ext.getCmp('ft_request_timeout').getValue() === '0' ? true:false;

                                            var ft_pkt_count = Ext.getCmp('ft_pkt_count').getValue() === '0' ? true:false;

                                            var chk_tcp_window_use = Ext.getCmp('chk_tcp_window_use').getValue() === true ? true:false;

                                            var ft_win_size = Ext.getCmp('ft_win_size').getValue() === '0' ? true:false;

                                            var ft_zero_win_cnt = Ext.getCmp('ft_zero_win_cnt').getValue() === '0' ? true:false;

                                            var chk_post_hdr_use = Ext.getCmp('chk_post_hdr_use').getValue() === true ? true:false;

                                            var ft_content_len = Ext.getCmp('ft_content_len').getValue() === '0' ? true:false;

                                            var ft_post_param_cnt = Ext.getCmp('ft_post_param_cnt').getValue() === '0' ? true:false;

                                            var chk_cc_attack_use = Ext.getCmp('chk_cc_attack_use').getValue() === true ? true:false;

                                            var ft_detect_cnt = Ext.getCmp('ft_detect_cnt').getValue() === '0' ? true:false;

                                            var ft_detect_interval = Ext.getCmp('ft_detect_interval').getValue() === '0' ? true:false;

                                            var chk_http_port_use = Ext.getCmp('chk_http_port_use').getValue() === false ? true:false;

                                            //HTTP 공격 검사 사용 체크 && packet anomaly 체크 && 설정값은 모두 0인 경우
                                            if(chk_http_use && chk_pkt_anomaly_use && ft_pkt_size && ft_request_timeout && ft_pkt_count){

                                                pkt_anomaly_flag = true;

                                            }

                                            //HTTP 공격 검사 사용 체크 && TCP Window 체크 && 설정값은 모두 0인 경우
                                            if(chk_http_use && chk_tcp_window_use && ft_win_size && ft_zero_win_cnt){

                                                tcp_window_flag = true;

                                            }

                                            //HTTP 공격 검사 사용 체크 && HTTP POST Header 체크 && 설정값은 모두 0인 경우
                                            if(chk_http_use && chk_post_hdr_use && ft_content_len && ft_post_param_cnt){

                                                post_hdr_flag = true;

                                            }

                                            //HTTP 공격 검사 사용 체크 && HTTP Cache Control 검사 체크 && 설정값은 모두 0인 경우
                                            if(chk_http_use && chk_cc_attack_use && ft_detect_cnt && ft_detect_interval){

                                                cc_attack_flag = true;

                                            }

                                            //HTTP 공격 검사 사용 체크 && packet anomaly 체크(모든설정값'0') && TCP Window 체크(모든설정값'0') && HTTP POST Header 체크(모든설정값'0')
                                            // && HTTP Cache Control, HTTP 검사 사용 체크 해제인 경우
                                            if(chk_http_use && pkt_anomaly_flag && tcp_window_flag && post_hdr_flag && cc_attack_flag && chk_http_port_use){

                                                http_flag =true;
                                            }

                                            //HTTP 모든 체크 해제인 경우
                                            if(chk_http_use && !chk_pkt_anomaly_use && !chk_tcp_window_use && !chk_post_hdr_use && !chk_cc_attack_use && chk_http_port_use){

                                                http_flag =true;
                                            }

                                            //DNS Query Flooding 검사 체크한 상태에서 값이 모두 0

                                            var chk_dns_use = Ext.getCmp('chk_dns_query').state;

                                            var ft_dns_dod = Ext.getCmp('ft_dns_dod').getValue() === '0' ? true:false;

                                            var ft_dns_pps = Ext.getCmp('ft_dns_pps').getValue() === '0' ? true:false;

                                            if(chk_dns_use && ft_dns_dod && ft_dns_pps){

                                                dns_flag = true;
                                            }

                                            //SQL Query Flooding 검사 체크한 상태에서 값이 모두 0

                                            var chk_sql_use = Ext.getCmp('chk_sql_query').state;

                                            var ft_sql_dod = Ext.getCmp('ft_sql_dod').getValue() === '0' ? true:false;

                                            var ft_sql_pps = Ext.getCmp('ft_sql_pps').getValue() === '0' ? true:false;

                                            if(chk_sql_use && ft_sql_dod && ft_sql_pps){

                                                sql_flag = true;
                                            }

                                            var dos = {};

                                            if(Ext.getCmp('chk_dos_trafficAnomaly').state){

                                                dos.chk_use = 'on';

                                            }else{

                                                dos.chk_use = 'off';
                                            }


                                            dos.action = (Ext.getCmp('cb_dos_action').getComponent(0).pressed===true)?"alert":"drop";

                                            dos.block_time = removeComma(Ext.getCmp('ft_dos_block_time').getValue());

                                            dos.tcp = {

                                                syn : removeComma(Ext.getCmp('ft_dos_tcp_syn').getValue()),
                                                syn_ack : removeComma(Ext.getCmp('ft_dos_tcp_syn_ack').getValue()),
                                                ack : removeComma(Ext.getCmp('ft_dos_tcp_ack').getValue()),
                                                fin : removeComma(Ext.getCmp('ft_dos_tcp_fin').getValue())

                                            };

                                            dos.http = {

                                                get : removeComma(Ext.getCmp('ft_dos_http_get').getValue())

                                            };

                                            dos.udp = {

                                                pps : removeComma(Ext.getCmp('ft_dos_udp_pps').getValue()),

                                                mbps : removeComma(Ext.getCmp('ft_dos_udp_mbps').getValue())

                                            };

                                            dos.icmp = {

                                                pps : removeComma(Ext.getCmp('ft_dos_icmp_pps').getValue()),

                                                mbps : removeComma(Ext.getCmp('ft_dos_icmp_mbps').getValue())

                                            };

                                            dos.icmp_limit = removeComma(Ext.getCmp('ft_dos_icmp_limit').getValue());


                                            var ddos = {};

                                            if(Ext.getCmp('chk_ddos_trafficAnomaly').state){

                                                ddos.chk_use = 'on';

                                            }else{

                                                ddos.chk_use = 'off';
                                            }


                                            ddos.action = (Ext.getCmp('cb_ddos_action').getComponent(0).pressed===true)?"alert":"drop";

                                            ddos.block_time = removeComma(Ext.getCmp('ft_ddos_block_time').getValue());


                                            ddos.tcp = {

                                                syn_dod : removeComma(Ext.getCmp('ft_ddos_tcp_syn_dod').getValue()),
                                                syn_pps : removeComma(Ext.getCmp('ft_ddos_tcp_syn_pps').getValue()),
                                                sa_dod : removeComma(Ext.getCmp('ft_ddos_tcp_sa_dod').getValue()),
                                                sa_pps : removeComma(Ext.getCmp('ft_ddos_tcp_sa_pps').getValue()),
                                                ack_dod : removeComma(Ext.getCmp('ft_ddos_tcp_ack_dod').getValue()),
                                                ack_pps : removeComma(Ext.getCmp('ft_ddos_tcp_ack_pps').getValue()),
                                                fin_dod : removeComma(Ext.getCmp('ft_ddos_tcp_fin_dod').getValue()),
                                                fin_pps : removeComma(Ext.getCmp('ft_ddos_tcp_fin_pps').getValue())

                                            };

                                            ddos.http = {

                                                dod : removeComma(Ext.getCmp('ft_ddos_http_dod').getValue()),
                                                pps : removeComma(Ext.getCmp('ft_ddos_http_pps').getValue())
                                            };

                                            ddos.udp = {

                                                dod : removeComma(Ext.getCmp('ft_ddos_udp_dod').getValue()),

                                                pps : removeComma(Ext.getCmp('ft_ddos_udp_pps').getValue()),

                                                mbps : removeComma(Ext.getCmp('ft_ddos_udp_mbps').getValue())

                                            };

                                            ddos.icmp = {

                                                dod : removeComma(Ext.getCmp('ft_ddos_icmp_dod').getValue()),

                                                pps : removeComma(Ext.getCmp('ft_ddos_icmp_pps').getValue()),

                                                mbps : removeComma(Ext.getCmp('ft_ddos_icmp_mbps').getValue())

                                            };

                                            var http = {};

                                            if(Ext.getCmp('chk_http_trafficAnomaly').state){

                                                http.chk_use = 'on';

                                            }else{

                                                http.chk_use = 'off';
                                            }


                                            http.action = (Ext.getCmp('cb_http_action').getComponent(0).pressed===true)?"alert":"drop";

                                            http.block_time = removeComma(Ext.getCmp('ft_http_block_time').getValue());

                                            if(Ext.getCmp('chk_server_rst_use').getValue() === true)
                                            {
                                                http.server_rst_use = "on";
                                            }
                                            else
                                            {
                                                http.server_rst_use = "off";
                                            }

                                            if(Ext.getCmp('chk_pkt_anomaly_use').getValue()){

                                                //'0'으로 설정된 경우 사용체크해제
                                                if(Ext.getCmp('ft_pkt_size').getValue() === '0' &&
                                                  Ext.getCmp('ft_request_timeout').getValue() === '0' && Ext.getCmp('ft_pkt_count').getValue() === '0'){

                                                    http.pkt_anomaly = {

                                                        chk_use : 'off',
                                                        pkt_size : Ext.getCmp('ft_pkt_size').getValue(),
                                                        pkt_count : Ext.getCmp('ft_pkt_count').getValue(),
                                                     //   pkt_interval : Ext.getCmp('ft_pkt_interval').getValue(),
                                                        pkt_interval : '',
                                                        request_timeout : Ext.getCmp('ft_request_timeout').getValue()
                                                    };

                                                }else{

                                                    http.pkt_anomaly = {

                                                        chk_use : 'on',
                                                        pkt_size : removeComma(Ext.getCmp('ft_pkt_size').getValue()),
                                                        pkt_count : removeComma(Ext.getCmp('ft_pkt_count').getValue()),
                                                        pkt_interval : Ext.getCmp('ft_pkt_interval').getValue(),
                                                        request_timeout : removeComma(Ext.getCmp('ft_request_timeout').getValue())
                                                    };
                                                }



                                            }else{

                                                http.pkt_anomaly = {

                                                    chk_use : 'off',
                                                    pkt_size : removeComma(Ext.getCmp('ft_pkt_size').getValue()),
                                                    pkt_count : removeComma(Ext.getCmp('ft_pkt_count').getValue()),
                                                    pkt_interval : Ext.getCmp('ft_pkt_interval').getValue(),
                                                    request_timeout : removeComma(Ext.getCmp('ft_request_timeout').getValue())

                                                };

                                            }


                                            if(Ext.getCmp('chk_tcp_window_use').getValue()){

                                                if(Ext.getCmp('ft_win_size').getValue() === '0' && Ext.getCmp('ft_zero_win_cnt').getValue() === '0'){

                                                    http.tcp_window = {

                                                        chk_use : 'off',
                                                        win_size : Ext.getCmp('ft_win_size').getValue(),
                                                        zero_win_cnt : Ext.getCmp('ft_zero_win_cnt').getValue()

                                                    };

                                                }else{

                                                    http.tcp_window = {

                                                        chk_use : 'on',
                                                        win_size : removeComma(Ext.getCmp('ft_win_size').getValue()),
                                                        zero_win_cnt : removeComma(Ext.getCmp('ft_zero_win_cnt').getValue())

                                                    };
                                                }



                                            }else{

                                                http.tcp_window = {

                                                    chk_use : 'off',
                                                    win_size : removeComma(Ext.getCmp('ft_win_size').getValue()),
                                                    zero_win_cnt : removeComma(Ext.getCmp('ft_zero_win_cnt').getValue())

                                                };
                                            }



                                            if(Ext.getCmp('chk_post_hdr_use').getValue()){

                                                if(Ext.getCmp('ft_content_len').getValue() === '0' && Ext.getCmp('ft_post_param_cnt').getValue() === '0'){

                                                    http.post_hdr = {

                                                        chk_use : 'off',
                                                        content_len : Ext.getCmp('ft_content_len').getValue(),
                                                        post_param_cnt : Ext.getCmp('ft_post_param_cnt').getValue()

                                                    };

                                                }else{

                                                    http.post_hdr = {

                                                        chk_use : 'on',
                                                        content_len : removeComma(Ext.getCmp('ft_content_len').getValue()),
                                                        post_param_cnt : removeComma(Ext.getCmp('ft_post_param_cnt').getValue())

                                                    };

                                                }


                                            }else{

                                                http.post_hdr = {

                                                    chk_use : 'off',
                                                    content_len : removeComma(Ext.getCmp('ft_content_len').getValue()),
                                                    post_param_cnt : removeComma(Ext.getCmp('ft_post_param_cnt').getValue())

                                                };

                                            }


                                            if(Ext.getCmp('chk_cc_attack_use').getValue()){

                                                if(Ext.getCmp('ft_detect_cnt').getValue() === '0' && Ext.getCmp('ft_detect_interval').getValue() === '0'){

                                                    http.cc_attack = {

                                                        chk_use : 'off',
                                                        detect_cnt : Ext.getCmp('ft_detect_cnt').getValue(),
                                                        detect_interval : Ext.getCmp('ft_detect_interval').getValue()

                                                    };

                                                }else{

                                                    http.cc_attack = {

                                                        chk_use : 'on',
                                                        detect_cnt : removeComma(Ext.getCmp('ft_detect_cnt').getValue()),
                                                        detect_interval : Ext.getCmp('ft_detect_interval').getValue()

                                                    };

                                                }

                                            }else{

                                                http.cc_attack = {

                                                    chk_use : 'off',
                                                    detect_cnt : removeComma(Ext.getCmp('ft_detect_cnt').getValue()),
                                                    detect_interval : Ext.getCmp('ft_detect_interval').getValue()

                                                };
                                            }

                                            var portList = [];

        									var http_data_items = Ext.getCmp('grid_port_list').getStore().data.items;

                                            for(var i in http_data_items){

        										if(http_data_items[i].data.port === ""){	continue;}


        										if(!LengthCheck(http_data_items[i].data.port, 0, 65535)){
        											prt_errMsg(ValidLimit(0, 65535), null);
        											Ext.getCmp('grid_port_list').getPlugin().startEdit(parseInt(i),0);
        											return false;
        										}
        										if(!ValidNum(http_data_items[i].data.port)){
        											prt_errMsg(get_msg('err_form'), null);
        											Ext.getCmp('grid_port_list').getPlugin().startEdit(parseInt(i),0);
        											return false;
        										}

                                                portList[i] = http_data_items[i].data.port;
                                            }


                                            if(Ext.getCmp('chk_http_port_use').getValue()){

                                                http.http_port = {

                                                    chk_use : 'on',
                                                    use_port : portList

                                                };

                                            }else{

                                                http.http_port = {

                                                    chk_use : 'off',
                                                    use_port : portList

                                                };
                                            }

                                            var dns_query = {};

                                            if(Ext.getCmp('chk_dns_query').state){

                                                dns_query.chk_use = 'on';

                                            }else{

                                                dns_query.chk_use = 'off';
                                            }


                                            dns_query.action = (Ext.getCmp('cb_dns_action').getComponent(0).pressed===true)?"alert":"drop";

                                            dns_query.block_time = removeComma(Ext.getCmp('ft_dns_block_time').getValue());

                                            dns_query.dns = {

                                                pps : removeComma(Ext.getCmp('ft_dns_pps').getValue()),
                                                dod : removeComma(Ext.getCmp('ft_dns_dod').getValue())

                                            };

                                            var dns_portList = [];

        									var dns_data_items = Ext.getCmp('grid_dns_port_list').getStore().data.items;

                                            for(var i in dns_data_items){

        										if(dns_data_items[i].data.port === ""){	continue;}


        										if(!LengthCheck(dns_data_items[i].data.port, 0, 65535)){
        											prt_errMsg(ValidLimit(0, 65535), null);
        											Ext.getCmp('grid_dns_port_list').getPlugin().startEdit(parseInt(i),0);
        											return false;
        										}
        										if(!ValidNum(dns_data_items[i].data.port)){
        											prt_errMsg(get_msg('err_form'), null);
        											Ext.getCmp('grid_dns_port_list').getPlugin().startEdit(parseInt(i),0);
        											return false;
        										}

                                                dns_portList[i] = dns_data_items[i].data.port;
                                            }

                                            dns_query.use_port = dns_portList;


                                            var sql_query = {};

                                            if(Ext.getCmp('chk_sql_query').state){

                                                sql_query.chk_use = 'on';

                                            }else{

                                                sql_query.chk_use = 'off';
                                            }


                                             sql_query.action = (Ext.getCmp('cb_sql_action').getComponent(0).pressed===true)?"alert":"drop";

                                            sql_query.block_time = removeComma(Ext.getCmp('ft_sql_block_time').getValue());

                                            sql_query.sql = {

                                                pps : removeComma(Ext.getCmp('ft_sql_pps').getValue()),
                                                dod : removeComma(Ext.getCmp('ft_sql_dod').getValue())

                                            };

                                            var sql_portList = [];

        									var sql_data_items = Ext.getCmp('grid_sql_port_list').getStore().data.items;

                                            for(var i in sql_data_items){

        										if(sql_data_items[i].data.port === ""){	continue;}


        										if(!LengthCheck(sql_data_items[i].data.port, 0, 65535)){
        											prt_errMsg(ValidLimit(0, 65535), null);
        											Ext.getCmp('grid_sql_port_list').getPlugin().startEdit(parseInt(i),0);
        											return false;
        										}
        										if(!ValidNum(sql_data_items[i].data.port)){
        											prt_errMsg(get_msg('err_form'), null);
        											Ext.getCmp('grid_sql_port_list').getPlugin().startEdit(parseInt(i),0);
        											return false;
        										}

                                                sql_portList[i] = sql_data_items[i].data.port;
                                            }

                                            sql_query.use_port = sql_portList;

                                            if(sql_query.chk_use === "on" && sql_query.use_port.length < 1)
                                            {
                                                Ext.MessageBox.alert(__weguardia,get_msg('err_ta_sql'));
                                                return false;
                                            }

                                            //로컬 저장소에 저장되어 있는 obj_d.data 에 변경된 사항 추가

                                            var obj_d = {
                										'dos' : dos,
                										'ddos' : ddos,
                                                'http' : http,
                                                'dns_query' : dns_query,
                                                'sql_query' : sql_query


                									};
                /*
                                            me.obj_d.data.dos = dos;

                                            me.obj_d.data.ddos = ddos;

                                            me.obj_d.data.http = http;

                                            me.obj_d.data.dns_query = dns_query;

                                            me.obj_d.data.sql_query = sql_query;
                */
                                            // var pkt_anomaly_flag = false;

                                            // var tcp_window_flag = false;

                                            // var post_hdr_flag = false;


                                            if(ddos_flag && dos_flag && http_flag && dns_flag && sql_flag){

                                                Ext.MessageBox.confirm(__weguardia,get_msg('err_ta_zero'),function(btn){

                                                    if(btn == 'yes'){

                                                        dos.chk_use = 'off';

                                                        ddos.chk_use = 'off';

                                                        http.chk_use = 'off';

                                                        dns_query.chk_use = 'off';

                                                        sql_query.chk_use = 'off';

                                                        //me.setObject();
                                                    }
                                                });

                                            }else if(ddos_flag || dos_flag || http_flag || dns_flag || sql_flag || pkt_anomaly_flag || tcp_window_flag || post_hdr_flag || cc_attack_flag){

                                                var flag_array = [dos_flag, ddos_flag, http_flag, dns_flag, sql_flag];

                                                var msg_array = [];

                                                var flag_msg = '';

                                                for(var i=0; i<flag_array.length; i++)
                                                {
                                                    if(flag_array[i])
                                                    {
                                                        switch(i)
                                                        {
                                                            case 0:
                                                                msg_array.push("Dos");
                                                                break;
                                                            case 1:
                                                                msg_array.push("DDos");
                                                                break;
                                                            case 2:
                                                                msg_array.push("HTTP");
                                                                break;
                                                            case 3:
                                                                msg_array.push("DNS Query Flooding");
                                                                break;
                                                            case 4:
                                                                msg_array.push("SQL Query Flooding");
                                                                break;
                                                        }

                                                    }

                                                }

                                                for(var i=0; i<msg_array.length; i++)
                                                {
                                                    if(i === msg_array.length -1)
                                                    {
                                                        flag_msg += msg_array[i] + ' 의 값이 모두';
                                                    }
                                                    else
                                                    {
                                                        flag_msg += msg_array[i] + ', ';
                                                    }
                                                }

                                                if(!http_flag)
                                                {
                                                    if(pkt_anomaly_flag || tcp_window_flag || post_hdr_flag || cc_attack_flag){

                                                        if(flag_msg.length > 1)
                                                        {
                                                            flag_msg += ' 0 으로 되어 있고 HTTP 공격 검사 항목의 값이';
                                                        }
                                                        else
                                                        {
                                                            flag_msg += 'HTTP 공격 검사 항목의 값이';
                                                        }
                                                    }
                                                }

                                                Ext.MessageBox.confirm(__weguardia,flag_msg + ' 0 으로 되어 있습니다. <br/>사용은 미사용으로 변경되어 적용 됩니다.',function(btn){

                                                    if(btn == 'yes'){
                                                        for(var i=0; i<flag_array.length; i++)
                                                        {
                                                            if(flag_array[i])
                                                            {
                                                                switch(i)
                                                                {
                                                                    case 0:
                                                                        dos.chk_use = 'off';
                                                                        break;
                                                                    case 1:
                                                                        ddos.chk_use = 'off';
                                                                        break;
                                                                    case 2:
                                                                        http.chk_use = 'off';
                                                                        break;
                                                                    case 3:
                                                                        dns_query.chk_use = 'off';
                                                                        break;
                                                                    case 4:
                                                                        sql_query.chk_use = 'off';
                                                                        break;
                                                                }
                                                            }
                                                        }

                                                         var _params = {
                                    basename : Ext.encode('traffic_anomaly'),
                                    obj : Ext.encode(obj_d)
                                };

                                request_helper.xmlrpc_call_JsonP(
                                    'ftuctrl',
                                    'setObject',
                                    _params,
                                    function(response){

                                        Ext.Msg.show({
                                           title: __weguardia,
                                            msg: get_msg('msg_ok_add'),
                                            width: 300,
                                            buttons: Ext.Msg.OK,
                                            icon: Ext.window.MessageBox.INFO
                                        });

                                        me.getObject();

                                    }
                                );


                                                    }
                                                });

                                            }else{

                                                var _params = {
                                    basename : Ext.encode('traffic_anomaly'),
                                    obj : Ext.encode(obj_d)
                                };

                                request_helper.xmlrpc_call_JsonP(
                                    'ftuctrl',
                                    'setObject',
                                    _params,
                                    function(response){

                                        Ext.Msg.show({
                                            title: __weguardia,
                                            msg: get_msg('msg_ok_add'),
                                            width: 300,
                                            buttons: Ext.Msg.OK,
                                            icon: Ext.window.MessageBox.INFO
                                        });

                                        me.getObject();

                                    }
                                );


                                            }
                                        }





    },

    getObject: function() {




                                        var me = this;

                                        var _params = {
                                            basename : Ext.encode('traffic_anomaly')
                                        };



                                        request_helper.xmlrpc_call_JsonP(
                                            'ftuctrl',
                                            'getObject',
                                            _params,
                                            function(response){

                                                //me.obj_d.data = response;

                                                  var port = [];

                                                        for(var i in response.http.http_port.use_port){

                                                            port[i] = {'port' : response.http.http_port.use_port[i]};

                                                        }

                                                        Ext.getCmp('grid_port_list').getStore().removeAll();

                                                        Ext.getCmp('grid_port_list').getStore().add(port);


                        					//console.log(response.dos);


                                                if(response.dos.chk_use === "on"){

                        							if(Ext.getCmp('chk_dos_trafficAnomaly').state===false){
                        								Ext.getCmp('chk_dos_trafficAnomaly').toggle();
                        							}

                        							Ext.getCmp('chk_dos_trafficAnomaly').state = true;

                                                    if(response.dos.action === "alert"){

                        								Ext.getCmp('cb_dos_action').getComponent(0).setPressed(true);

                                                       // Ext.getCmp('cb_dos_action').setValue('alert');
                                                      //  Ext.getCmp('cb_dos_action').setRawValue('탐지');

                                                    }else{

                        								Ext.getCmp('cb_dos_action').getComponent(1).setPressed(true);

                                                       // Ext.getCmp('cb_dos_action').setValue('drop');
                                                       // Ext.getCmp('cb_dos_action').setRawValue('차단');
                                                    }

                                                }else{

                        							if(Ext.getCmp('chk_dos_trafficAnomaly').state===true){
                        								Ext.getCmp('chk_dos_trafficAnomaly').toggle();
                        							}

                                                   // Ext.getCmp('cb_dos_action').setValue('alert');
                                                  //  Ext.getCmp('cb_dos_action').setRawValue('탐지');

                        							Ext.getCmp('cb_dos_action').getComponent(0).setPressed(true);

                                                  //  Ext.getCmp('ctn_dos_action').disable();
                                                 //   Ext.getCmp('ctn_dos_tcp_http').disable();
                                                  //  Ext.getCmp('ctn_dos_udp_icmp').disable();

                                                }


                                                Ext.getCmp('ft_dos_block_time').setValue(addComma(response.dos.block_time));
                                                Ext.getCmp('ft_dos_tcp_syn').setValue(addComma(response.dos.tcp.syn));
                                                Ext.getCmp('ft_dos_tcp_syn_ack').setValue(addComma(response.dos.tcp.syn_ack));
                                                Ext.getCmp('ft_dos_tcp_ack').setValue(addComma(response.dos.tcp.ack));
                                                Ext.getCmp('ft_dos_tcp_fin').setValue(addComma(response.dos.tcp.fin));
                                                Ext.getCmp('ft_dos_http_get').setValue(addComma(response.dos.http.get));
                                                Ext.getCmp('ft_dos_udp_pps').setValue(addComma(response.dos.udp.pps));
                                                Ext.getCmp('ft_dos_udp_mbps').setValue(addComma(response.dos.udp.mbps));
                                                Ext.getCmp('ft_dos_icmp_pps').setValue(addComma(response.dos.icmp.pps));
                                                Ext.getCmp('ft_dos_icmp_mbps').setValue(addComma(response.dos.icmp.mbps));
                                                Ext.getCmp('ft_dos_icmp_limit').setValue(addComma(response.dos.icmp_limit));


                                                if(response.ddos.chk_use === "on"){

                									if(Ext.getCmp('chk_ddos_trafficAnomaly').state===false){
                        								Ext.getCmp('chk_ddos_trafficAnomaly').toggle();
                        							}


                                                    if(response.ddos.action === "alert"){

                										Ext.getCmp('cb_ddos_action').getComponent(0).setPressed(true);

                                                       // Ext.getCmp('cb_ddos_action').setValue('alert');
                                                       // Ext.getCmp('cb_ddos_action').setRawValue('탐지');

                                                    }else{

                										Ext.getCmp('cb_ddos_action').getComponent(1).setPressed(true);

                                                       // Ext.getCmp('cb_ddos_action').setValue('drop');
                                                      //  Ext.getCmp('cb_ddos_action').setRawValue('차단');
                                                    }
                                                }else{

                									if(Ext.getCmp('chk_ddos_trafficAnomaly').state===true){
                        								Ext.getCmp('chk_ddos_trafficAnomaly').toggle();
                        							}

                									Ext.getCmp('cb_ddos_action').getComponent(0).setPressed(true);


                                                   // Ext.getCmp('cb_ddos_action').setValue('alert');
                                                   // Ext.getCmp('cb_ddos_action').setRawValue('탐지');

                                                  //  Ext.getCmp('ctn_ddos_action').disable();
                                                  //  Ext.getCmp('ctn_ddos_tcp_http').disable();
                                                 //   Ext.getCmp('ctn_ddos_udp_icmp').disable();

                                                }

                                                Ext.getCmp('ft_ddos_block_time').setValue(addComma(response.ddos.block_time));

                                                Ext.getCmp('ft_ddos_tcp_syn_dod').setValue(addComma(response.ddos.tcp.syn_dod));
                                                Ext.getCmp('ft_ddos_tcp_syn_pps').setValue(addComma(response.ddos.tcp.syn_pps));
                                                Ext.getCmp('ft_ddos_tcp_sa_dod').setValue(addComma(response.ddos.tcp.sa_dod));
                                                Ext.getCmp('ft_ddos_tcp_sa_pps').setValue(addComma(response.ddos.tcp.sa_pps));
                                                Ext.getCmp('ft_ddos_tcp_ack_dod').setValue(addComma(response.ddos.tcp.ack_dod));
                                                Ext.getCmp('ft_ddos_tcp_ack_pps').setValue(addComma(response.ddos.tcp.ack_pps));
                                                Ext.getCmp('ft_ddos_tcp_fin_dod').setValue(addComma(response.ddos.tcp.fin_dod));
                                                Ext.getCmp('ft_ddos_tcp_fin_pps').setValue(addComma(response.ddos.tcp.fin_pps));
                                                Ext.getCmp('ft_ddos_http_dod').setValue(addComma(response.ddos.http.dod));
                                                Ext.getCmp('ft_ddos_http_pps').setValue(addComma(response.ddos.http.pps));
                                                Ext.getCmp('ft_ddos_udp_dod').setValue(addComma(response.ddos.udp.dod));
                                                Ext.getCmp('ft_ddos_udp_pps').setValue(addComma(response.ddos.udp.pps));
                                                Ext.getCmp('ft_ddos_udp_mbps').setValue(addComma(response.ddos.udp.mbps));
                                                Ext.getCmp('ft_ddos_icmp_dod').setValue(addComma(response.ddos.icmp.dod));
                                                Ext.getCmp('ft_ddos_icmp_pps').setValue(addComma(response.ddos.icmp.pps));
                                                Ext.getCmp('ft_ddos_icmp_mbps').setValue(addComma(response.ddos.icmp.mbps));

        										//console.log(response.http);

                                                if(response.http.chk_use === "on"){

                									if(Ext.getCmp('chk_http_trafficAnomaly').state===false){
                        								Ext.getCmp('chk_http_trafficAnomaly').toggle();
                        							}


                                                    if(response.http.action === "alert"){

                										Ext.getCmp('cb_http_action').getComponent(0).setPressed(true);

                                                    }else{

                                                       Ext.getCmp('cb_http_action').getComponent(1).setPressed(true);
                                                    }
                                                }else{

                									if(Ext.getCmp('chk_http_trafficAnomaly').state===true){
                        								Ext.getCmp('chk_http_trafficAnomaly').toggle();
                        							}

                                                   Ext.getCmp('cb_http_action').getComponent(0).setPressed(true);

                                                   // Ext.getCmp('ctn_http_action').disable();
                                                   // Ext.getCmp('ctn_pkt_anomaly').disable();
                                                   // Ext.getCmp('ctn_tcp_window').disable();
                                                   // Ext.getCmp('ctn_post_hdr').disable();
                                                  //  Ext.getCmp('ctn_cc_attack').disable();
                                                  //  Ext.getCmp('ctn_http_port').disable();
                                                }

                                                Ext.getCmp('ft_http_block_time').setValue(addComma(response.http.block_time));

                                                if(response.http.pkt_anomaly.chk_use === "on"){

                									if(Ext.getCmp('chk_pkt_anomaly_use').state===false){
                        								Ext.getCmp('chk_pkt_anomaly_use').toggle();
                        							}


                                                }else{

                									if(Ext.getCmp('chk_pkt_anomaly_use').state===true){
                        								Ext.getCmp('chk_pkt_anomaly_use').toggle();
                        							}


                                                   // Ext.getCmp('ctn_pkt_size').disable();
                                                   // Ext.getCmp('ctn_pkt_interval').disable();
                                                   // Ext.getCmp('ctn_pkt_request_timeout').disable();
                                                }

                                                if(response.http.tcp_window.chk_use === "on"){

                									if(Ext.getCmp('chk_tcp_window_use').state===false){
                        								Ext.getCmp('chk_tcp_window_use').toggle();
                        							}


                                                }else{

                									if(Ext.getCmp('chk_tcp_window_use').state===true){
                        								Ext.getCmp('chk_tcp_window_use').toggle();
                        							}

                                                   // Ext.getCmp('ctn_win_size').disable();
                                                   // Ext.getCmp('ctn_zero_win_cnt').disable();
                                                }

                                                if(response.http.post_hdr.chk_use === "on"){

                									if(Ext.getCmp('chk_post_hdr_use').state===false){
                        								Ext.getCmp('chk_post_hdr_use').toggle();
                        							}



                                                }else{

                									if(Ext.getCmp('chk_post_hdr_use').state===true){
                        								Ext.getCmp('chk_post_hdr_use').toggle();
                        							}

                                                   // Ext.getCmp('ctn_content_len').disable();
                                                   // Ext.getCmp('ctn_post_param_cnt').disable();
                                                }

                                                if(response.http.cc_attack.chk_use === "on"){

                									if(Ext.getCmp('chk_cc_attack_use').state===false){
                        								Ext.getCmp('chk_cc_attack_use').toggle();
                        							}

                                                }else{

                									if(Ext.getCmp('chk_cc_attack_use').state===true){
                        								Ext.getCmp('chk_cc_attack_use').toggle();
                        							}

                                                   // Ext.getCmp('ctn_detect_cnt').disable();
                                                   // Ext.getCmp('ctn_detect_interval').disable();
                                                }

                                                if(response.http.http_port.chk_use === "on"){

                									if(Ext.getCmp('chk_http_port_use').state===false){
                        								Ext.getCmp('chk_http_port_use').toggle();
                        							}




                                                }else{

                									if(Ext.getCmp('chk_http_port_use').state===true){
                        								Ext.getCmp('chk_http_port_use').toggle();
                        							}

                                                   // Ext.getCmp('ctn_use_port').disable();
                                                   // Ext.getCmp('grid_port_list').disable();
                                                }



                                                Ext.getCmp('ft_pkt_size').setValue(addComma(response.http.pkt_anomaly.pkt_size));
                                                //Ext.getCmp('ft_pkt_interval').setValue(addComma(response.http.pkt_anomaly.pkt_interval));

                                                Ext.getCmp('ft_win_size').setValue(addComma(response.http.tcp_window.win_size));
                                                Ext.getCmp('ft_zero_win_cnt').setValue(addComma(response.http.tcp_window.zero_win_cnt));


                                                Ext.getCmp('ft_content_len').setValue(addComma(response.http.post_hdr.content_len));
                                                Ext.getCmp('ft_post_param_cnt').setValue(addComma(response.http.post_hdr.post_param_cnt));

                                                Ext.getCmp('ft_detect_cnt').setValue(addComma(response.http.cc_attack.detect_cnt));
                                                Ext.getCmp('ft_detect_interval').setValue(addComma(response.http.cc_attack.detect_interval));

                                                var port = [];

                                                for(var i in response.http.http_port.use_port){

                                                    port[i] = {'port' : response.http.http_port.use_port[i]};

                                                }

                                                Ext.getCmp('grid_port_list').getStore().removeAll();

                                                Ext.getCmp('grid_port_list').getStore().add(port);

                								if(response.http.server_rst_use === "on")
                                                    {
                										if(Ext.getCmp('chk_server_rst_use').state===false){
                        								Ext.getCmp('chk_server_rst_use').toggle();
                        							}

                                                    }
                                                    else
                                                    {
                										if(Ext.getCmp('chk_server_rst_use').state===true){
                        								Ext.getCmp('chk_server_rst_use').toggle();
                        								}

                                                    }

                /*
                                                if(response.http.server_rst_use)
                                                {
                                                    if(response.http.server_rst_use === "on")
                                                    {
                										if(Ext.getCmp('chk_server_rst_use').state===false){
                        								Ext.getCmp('chk_server_rst_use').toggle();
                        							}

                                                    }
                                                    else
                                                    {
                										if(Ext.getCmp('chk_server_rst_use').state===true){
                        								Ext.getCmp('chk_server_rst_use').toggle();
                        								}

                                                    }
                                                }
                                                else
                                                {
                                                    response.http.server_rst_use = "off";
                                                    Ext.getCmp('chk_server_rst_use').setValue(false);
                                                }
                */
                                                if(response.http.pkt_anomaly.request_timeout)
                                                {
                                                    Ext.getCmp('ft_request_timeout').setValue(addComma(response.http.pkt_anomaly.request_timeout));
                                                }
                                                else
                                                {
                                                   response.http.pkt_anomaly.request_timeout = 50;
                                                    Ext.getCmp('ft_request_timeout').setValue(50);
                                                }

                                                if(response.http.pkt_anomaly.pkt_count)
                                                {
                                                    Ext.getCmp('ft_pkt_count').setValue(addComma(response.http.pkt_anomaly.pkt_count));
                                                }
                                                else
                                                {
                                                    response.http.pkt_anomaly.pkt_count = 0;
                                                    Ext.getCmp('ft_pkt_count').setValue(0);
                                                }

                                                if(response.dns_query.chk_use === "on")
                                                {
                									if(Ext.getCmp('chk_dns_query').state===false){
                        								Ext.getCmp('chk_dns_query').toggle();
                        							}


                                                    if(response.dns_query.action === "alert")
                                                    {

                										Ext.getCmp('cb_dns_action').getComponent(0).setPressed(true);

                                                    }
                                                    else
                                                    {
                										Ext.getCmp('cb_dns_action').getComponent(1).setPressed(true);

                                                    }
                                                }
                                                else
                                                {

                									if(Ext.getCmp('chk_dns_query').state===true){
                        								Ext.getCmp('chk_dns_query').toggle();
                        							}

                                                   Ext.getCmp('cb_dns_action').getComponent(0).setPressed(true);

                                                  //  Ext.getCmp('ctn_dns_query').disable();
                                                }

                                                Ext.getCmp('ft_dns_block_time').setValue(addComma(response.dns_query.block_time));
                                                Ext.getCmp('ft_dns_dod').setValue(addComma(response.dns_query.dns.dod));
                                                Ext.getCmp('ft_dns_pps').setValue(addComma(response.dns_query.dns.pps));

                                                var dns_port = [];

                                                for(var j in response.dns_query.use_port){

                                                    dns_port[j] = {'port' : response.dns_query.use_port[j]};

                                                }

                                                Ext.getCmp('grid_dns_port_list').getStore().removeAll();

                                                Ext.getCmp('grid_dns_port_list').getStore().add(dns_port);

                                                if(response.sql_query.chk_use === "on")
                                                {

                									if(Ext.getCmp('chk_sql_query').state===false){
                        								Ext.getCmp('chk_sql_query').toggle();
                        							}


                                                    if(response.sql_query.action === "alert")
                                                    {
                										Ext.getCmp('cb_sql_action').getComponent(0).setPressed(true);

                                                    }
                                                    else
                                                    {
                                                        Ext.getCmp('cb_sql_action').getComponent(1).setPressed(true);
                                                    }
                                                }
                                                else
                                                {
                									if(Ext.getCmp('chk_sql_query').state===true){
                        								Ext.getCmp('chk_sql_query').toggle();
                        							}


                                                    Ext.getCmp('cb_sql_action').getComponent(0).setPressed(true);

                                                   // Ext.getCmp('ctn_sql_query').disable();
                                                }

                                                Ext.getCmp('ft_sql_block_time').setValue(addComma(response.sql_query.block_time));
                                                Ext.getCmp('ft_sql_dod').setValue(addComma(response.sql_query.sql.dod));
                                                Ext.getCmp('ft_sql_pps').setValue(addComma(response.sql_query.sql.pps));

                                                var sql_port = [];

                                                for(var k in response.sql_query.use_port){

                                                    sql_port[k] = {'port' : response.sql_query.use_port[k]};

                                                }

                                                Ext.getCmp('grid_sql_port_list').getStore().removeAll();

                                                Ext.getCmp('grid_sql_port_list').getStore().add(sql_port);

                                            }
                                        );



                prt_errMsg("", null);

    },

    getLicense: function() {

        var me = this;

        var _params = {
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_license_info',
            _params,
            function(response){

                if(response.module)
                {
                    if(response.system_module.ips !== "on")
                    {

                        Ext.getCmp('form_http_trafficAnomaly').hide();
                        Ext.getCmp('form_sql_query').hide();
                        Ext.getCmp('form_dns_query').hide();

                    }
                    else
                    {
                        Ext.getCmp('form_http_trafficAnomaly').show();
                        Ext.getCmp('form_sql_query').show();
                        Ext.getCmp('form_dns_query').show();
                    }
                }
            }
        );

    },

    http_toggleslide: function(el) {
        var _panel = el.up('fieldset');
        var _state = (el.state===true)?false:true;

        _panel.query('container')[1].setDisabled(_state);

    }

});