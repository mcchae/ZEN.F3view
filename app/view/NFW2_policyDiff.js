
Ext.define('NFW2.view.NFW2_policyDiff', {
    extend: 'Ext.window.Window',
    alias: 'widget.nfw2_policydiff',

    requires: [
        'NFW2.view.NFW2_policyDiffViewModel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.panel.Panel'
    ],

    viewModel: {
        type: 'nfw2_policydiff'
    },
    autoScroll: true,
    cls: 'zen_win',
    height: 600,
    id: 'NFW2_policyDiff',
    width: 950,
    defaultListenerScope: true,

    bind: {
        title: '{tit_diff}'
    },
    listeners: {
        afterrender: 'onNFW2_policyDiffAfterRender'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            items: [
                {
                    xtype: 'container',
                    flex: 1
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onButtonClick'
                    }
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'container',
            items: [
                {
                    xtype: 'panel',
                    autoScroll: true,
                    id: 'pnl_differ',
                    margin: 10
                }
            ]
        }
    ],

    onNFW2_policyDiffAfterRender: function(component, eOpts) {

                var me = this;

                var _oldData = me.oldData;

                if(_oldData === undefined) _oldData = {};

                var _newData = me.newData;

                if(_newData === undefined) _newData = {};

                if(_oldData.md_passwd !== undefined){

                    var _tmp1 = _oldData.md_passwd.substring(0,32);
                    var _tmp2 = _oldData.md_passwd.substring(32,64);

                    _oldData.md_passwd = _tmp1+" "+_tmp2;
                }

                if(_newData.md_passwd !== undefined){

                    var _tmp1 = _newData.md_passwd.substring(0,32);
                    var _tmp2 = _newData.md_passwd.substring(32,64);

                    _newData.md_passwd = _tmp1+" "+_tmp2;
                }

                var base = difflib.stringAsLines(JSON.stringify(_oldData,null,4));

                var newtxt = difflib.stringAsLines(JSON.stringify(_newData,null,4));

                var sm = new difflib.SequenceMatcher(base, newtxt);

                var opcodes = sm.get_opcodes();

                var contextSize = null;

                // build the diff view and add it to the current DOM
                var _diff = diffview.buildView({
                    baseTextLines: base,
                    newTextLines: newtxt,
                    opcodes: opcodes,
                    // set the display titles for each resource
                    baseTextName: __zen('chg_before'),
                    newTextName: __zen('chg_after'),
                    contextSize: contextSize,
                    viewType: 0
                });

              //  console.log(_diff.outerHTML);

                Ext.getCmp('pnl_differ').update(_diff.outerHTML);

        me.getViewModel().setData({
                tit_diff: __zen('tit_diff_in'),
                confirm: __zen('confirm')
            });
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        me.close();
    }

});