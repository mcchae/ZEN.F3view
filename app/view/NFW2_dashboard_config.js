
Ext.define('NFW2.view.NFW2_dashboard_config', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.CheckboxGroup',
        'Ext.form.field.Checkbox',
        'Ext.button.Button'
    ],

    id: 'NFW2_dashboard_config',
    width: 400,
    autoScroll: true,
    bodyPadding: 10,
    title: '대시보드 설정',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dash_conf: {
                
            },
            items: [
                {
                    xtype: 'fieldset',
                    id: 'fs_system',
                    title: '시스템',
                    items: [
                        {
                            xtype: 'checkboxgroup',
                            columns: 2,
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    boxLabel: 'CPU',
                                    inputValue: 'cpu'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    boxLabel: '메모리',
                                    inputValue: 'memory'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    boxLabel: '디스크',
                                    inputValue: 'disk'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    boxLabel: '시스템 메시지',
                                    inputValue: 'message'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    id: 'fs_traffic',
                    title: '트래픽',
                    items: [
                        {
                            xtype: 'checkboxgroup',
                            columns: 2,
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    boxLabel: '트래픽',
                                    inputValue: 'interface'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    boxLabel: '프로토콜 별 트래픽',
                                    inputValue: 'protocol'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    boxLabel: '패킷 분포',
                                    inputValue: 'packet'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    id: 'fs_fw',
                    title: '방화벽',
                    items: [
                        {
                            xtype: 'checkboxgroup',
                            columns: 2,
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    boxLabel: '세션',
                                    inputValue: 'session'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    boxLabel: '정책 Top',
                                    inputValue: 'policy'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    hidden: true,
                    id: 'fs_ipsec',
                    title: 'IPSec VPN',
                    items: [
                        {
                            xtype: 'checkboxgroup',
                            columns: 2,
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    disabled: true,
                                    boxLabel: 'IPSec VPN 터널 정보',
                                    inputValue: 'vpn'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    hidden: true,
                    id: 'fs_ssl',
                    title: 'SSL VPN',
                    items: [
                        {
                            xtype: 'checkboxgroup',
                            columns: 2,
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    disabled: true,
                                    boxLabel: '로그인 사용자',
                                    inputValue: 'login'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    id: 'fs_ips',
                    title: 'IPS',
                    items: [
                        {
                            xtype: 'checkboxgroup',
                            columns: 2,
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    boxLabel: '공격 Top',
                                    inputValue: 'attack10'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    boxLabel: '차단 Top',
                                    inputValue: 'attack_port10'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    boxLabel: '탐지 Top',
                                    inputValue: 'block10'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    boxLabel: '공격 포트 Top',
                                    inputValue: 'detect10'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            flex: 1,
                            margin: 5,
                            maxWidth: 70,
                            text: '확인',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick11,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            flex: 1,
                            margin: 5,
                            maxWidth: 70,
                            text: '취소',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick2,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onButtonClick11: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_dashboard_config');

        me.setObject();
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = this;

        me.close();
    },

    getObject: function() {
        var me = this;

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            {
                basename : Ext.encode('monitor_dashboard')
            },
            function(response){

                if(response === null){

                    me.down('[inputValue="cpu"]').setValue(true);

                    me.down('[inputValue="memory"]').setValue(true);

                    me.down('[inputValue="disk"]').setValue(true);

                    me.down('[inputValue="message"]').setValue(true);

                    me.down('[inputValue="interface"]').setValue(true);

                    me.down('[inputValue="protocol"]').setValue(true);

                    me.down('[inputValue="packet"]').setValue(true);

                    me.down('[inputValue="session"]').setValue(true);

                    me.down('[inputValue="policy"]').setValue(true);

                    me.down('[inputValue="attack10"]').setValue(true);

                    me.down('[inputValue="attack_port10"]').setValue(true);

                    me.down('[inputValue="detect10"]').setValue(true);

                    me.down('[inputValue="block10"]').setValue(true);

                    me.down('[inputValue="message"]').setValue(true);

                }else{

                    me.dash_conf = response;

                    if(response.system.cpu === 'on')
                    {
                        me.down('[inputValue="cpu"]').setValue(true);
                    }
                    else
                    {
                        me.down('[inputValue="cpu"]').setValue(false);
                    }

                    if(response.system.memory === 'on')
                    {
                        me.down('[inputValue="memory"]').setValue(true);
                    }
                    else
                    {
                        me.down('[inputValue="memory"]').setValue(false);
                    }

                    if(response.system.disk === 'on')
                    {
                        me.down('[inputValue="disk"]').setValue(true);
                    }
                    else
                    {
                        me.down('[inputValue="disk"]').setValue(false);
                    }

                    if(response.system.message === 'on')
                    {
                        me.down('[inputValue="message"]').setValue(true);
                    }
                    else
                    {
                        me.down('[inputValue="message"]').setValue(false);
                    }

                    if(response.traffic['interface'] === 'on')
                    {
                        me.down('[inputValue="interface"]').setValue(true);
                    }
                    else
                    {
                        me.down('[inputValue="interface"]').setValue(false);
                    }

                    if(response.traffic.protocol === 'on')
                    {
                        me.down('[inputValue="protocol"]').setValue(true);
                    }
                    else
                    {
                        me.down('[inputValue="protocol"]').setValue(false);
                    }

                    if(response.traffic.packet === 'on')
                    {
                        me.down('[inputValue="packet"]').setValue(true);
                    }
                    else
                    {
                        me.down('[inputValue="packet"]').setValue(false);
                    }

                    if(response.firewall.session === 'on')
                    {
                        me.down('[inputValue="session"]').setValue(true);
                    }
                    else
                    {
                        me.down('[inputValue="session"]').setValue(false);
                    }

                    if(response.firewall.policy === 'on')
                    {
                        me.down('[inputValue="policy"]').setValue(true);
                    }
                    else
                    {
                        me.down('[inputValue="policy"]').setValue(false);
                    }

                    if(response.ips.attack10 === 'on')
                    {
                        me.down('[inputValue="attack10"]').setValue(true);
                    }
                    else
                    {
                        me.down('[inputValue="attack10"]').setValue(false);
                    }

                    if(response.ips.attack_port10 === 'on')
                    {
                        me.down('[inputValue="attack_port10"]').setValue(true);
                    }
                    else
                    {
                        me.down('[inputValue="attack_port10"]').setValue(false);
                    }

                    if(response.ips.detect10 === 'on')
                    {
                        me.down('[inputValue="detect10"]').setValue(true);
                    }
                    else
                    {
                        me.down('[inputValue="detect10"]').setValue(false);
                    }

                    if(response.ips.block10 === 'on')
                    {
                        me.down('[inputValue="block10"]').setValue(true);
                    }
                    else
                    {
                        me.down('[inputValue="block10"]').setValue(false);
                    }
                }

                me.show();

            }

        );
    },

    setObject: function() {
        var me = this;

        var checkboxes= me.query('[isCheckbox]');

        var _system = {};

        var _traffic = {};

        var _firewall = {};

        var _ips = {};

        Ext.each(checkboxes, function(checkbox, idx){

            switch(checkbox.inputValue)
            {
                case 'cpu':

                    if(checkbox.checked)
                    {
                        _system.cpu = "on";
                    }
                    else
                    {
                        _system.cpu = "off";
                    }

                    break;

                case 'memory':

                    if(checkbox.checked)
                    {
                        _system.memory = "on";
                    }
                    else
                    {
                        _system.memory = "off";
                    }

                    break;

                case 'disk':

                    if(checkbox.checked)
                    {
                        _system.disk = "on";
                    }
                    else
                    {
                        _system.disk = "off";
                    }

                    break;

                case 'message':

                    if(checkbox.checked)
                    {
                        _system.message = "on";
                    }
                    else
                    {
                        _system.message = "off";
                    }

                    break;

                case 'interface':

                    if(checkbox.checked)
                    {
                        _traffic['interface'] = "on";
                    }
                    else
                    {
                        _traffic['interface'] = "off";
                    }

                    break;

                case 'packet':

                    if(checkbox.checked)
                    {
                        _traffic.packet = "on";
                    }
                    else
                    {
                        _traffic.packet = "off";
                    }

                    break;

                case 'protocol':

                    if(checkbox.checked)
                    {
                        _traffic.protocol = "on";
                    }
                    else
                    {
                        _traffic.protocol = "off";
                    }

                    break;

                case 'session':

                    if(checkbox.checked)
                    {
                        _firewall.session = "on";
                    }
                    else
                    {
                        _firewall.session = "off";
                    }

                    break;

                case 'policy':

                    if(checkbox.checked)
                    {
                        _firewall.policy = "on";
                    }
                    else
                    {
                        _firewall.policy = "off";
                    }

                    break;

                case 'attack10':

                    if(checkbox.checked)
                    {
                        _ips.attack10 = "on";
                    }
                    else
                    {
                        _ips.attack10 = "off";
                    }

                    break;

                case 'attack_port10':

                    if(checkbox.checked)
                    {
                        _ips.attack_port10 = "on";
                    }
                    else
                    {
                        _ips.attack_port10 = "off";
                    }

                    break;

                case 'detect10':

                    if(checkbox.checked)
                    {
                        _ips.detect10 = "on";
                    }
                    else
                    {
                        _ips.detect10 = "off";
                    }

                    break;

                case 'block10':

                    if(checkbox.checked)
                    {
                        _ips.block10 = "on";
                    }
                    else
                    {
                        _ips.block10 = "off";
                    }

                    break;

            }

        });

        me.dash_conf.system = _system;

        me.dash_conf.traffic = _traffic;

        me.dash_conf.firewall = _firewall;

        me.dash_conf.ips = _ips;

        if(me.dash_conf)
        {
            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'setObject',
                {
                    basename : Ext.encode('monitor_dashboard'),
                    obj : Ext.encode(me.dash_conf)
                },
                function(response){

                    Ext.getCmp('pnl_dashboard').hide();
                    Ext.getCmp('pnl_dashboard').show();

                    me.destroy();
                }

            );
        }
    }

});