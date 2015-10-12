
Ext.define('NFW2.view.NFW2_upgradeWaitMsg', {
    extend: 'Ext.window.Window',
    alias: 'widget.nfw2_upgradewaitmsg',

    requires: [
        'NFW2.view.NFW2_upgradeWaitMsgViewModel',
        'Ext.container.Container',
        'Ext.form.Label'
    ],

    viewModel: {
        type: 'nfw2_upgradewaitmsg'
    },
    cls: 'zen_win',
    height: 150,
    width: 370,
    layout: 'fit',
    modal: true,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'label',
                    flex: 1,
                    cls: 'mt_info',
                    margin: '0 50',
                    bind: {
                        text: '{update_info15}'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWindowAfterRender'
    },

    onWindowAfterRender: function(component, eOpts) {
        this.setTitle(__weguardia);
    }

});