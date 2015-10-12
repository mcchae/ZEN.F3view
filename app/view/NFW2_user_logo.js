
Ext.define('NFW2.view.NFW2_user_logo', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_user_logo',

    requires: [
        'NFW2.view.NFW2_user_logoViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.File',
        'Ext.form.field.FileButton'
    ],

    viewModel: {
        type: 'nfw2_user_logo'
    },
    cls: 'zen_body',
    height: 500,
    id: 'NFW2_user_logo',
    width: 700,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            id: 'upform',
            bodyPadding: 5,
            items: [
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    height: 30,
                    width: 150,
                    text: '초기상태로 복원',
                    listeners: {
                        click: 'onButtonClick1'
                    }
                },
                {
                    xtype: 'container',
                    cls: 'top_area',
                    height: 100,
                    margin: '5 0',
                    width: 350,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            cls: 'top_logo',
                            height: 50
                        },
                        {
                            xtype: 'container',
                            margin: '0 0 0 70',
                            items: [
                                {
                                    xtype: 'label',
                                    style: 'color:fff;text-align:center',
                                    text: '250*35 png'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    height: 100,
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'filefield',
                            id: 'upfile',
                            width: 300,
                            name: 'uploadFile',
                            buttonConfig: {
                                xtype: 'filebutton',
                                cls: 'btn_b',
                                margin: '0 10 0 10',
                                bind: {
                                    text: '{file_find}'
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            cls: 'ft_confirm',
                            height: 26,
                            width: 50,
                            bind: {
                                text: '{confirm}'
                            },
                            listeners: {
                                click: 'onButtonClick'
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

    onButtonClick1: function(button, e, eOpts) {
        Ext.Ajax.request({
                url : '/imageFileCopy',
                method : 'POST',
                params : {'imageName': Ext.encode('top_logo.png')},
                success : function(response, opts){
                        console.log(Ext.decode(response.responseText));
                    Ext.Msg.alert(__weguardia, get_msg('msg_ok_add')+"변경된 로고는 재 접속시 적용됩니다.");
                },
                failure : function(fb, o) {

                            Ext.Msg.alert(__weguardia, get_msg('msg_file_fail'));
                }
        });
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;
        var form = Ext.getCmp('upform').getForm();

        if(Ext.getCmp('upfile').getValue() === '') return false;
        var path = '/mnt/ramdisk/do/F3view/nodeapps/deploy/public/javascripts/images/';

        var __img = 'top_logo.png';

        var _file = Ext.getCmp('upfile').getValue().split('.');
        _file = '.'+_file[_file.length-1];

        if(_file !== '.png'){
            Ext.Msg.alert(__weguardia,get_msg('err_filenameext'));
            return false;
        }


        if(form.isValid()){

            Ext.getBody().mask("Uploading ..");

            form.submit({
                url: '/imageFileUpload',
                params: {
                    imageName : Ext.encode('top_logo.png')
                },
                waitMsg: 'Uploading...',
                success: function(fp, o) {

                    Ext.getBody().unmask();

                    Ext.Msg.alert(__weguardia, get_msg('msg_ok_add')+"변경된 로고는 재 접속시 적용됩니다.");

                    Ext.getCmp('NFW2_user_logo').doLayout();


                },
                failure : function(fb, o) {
                    Ext.getBody().unmask();
                    Ext.Msg.alert(__weguardia, get_msg('msg_file_fail'));
                }
            });
        }
    },

    onNFW2_monitor_basicAfterRender: function(component, eOpts) {
        hideLoadMask();
        chk_zenauth(null);
    }

});