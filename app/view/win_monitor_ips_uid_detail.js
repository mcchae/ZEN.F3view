
Ext.define('NFW2.view.win_monitor_ips_uid_detail', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_monitor_ips_uid_detail',

    requires: [
        'NFW2.view.win_monitor_ips_uid_detailViewModel',
        'Ext.container.Container'
    ],

    viewModel: {
        type: 'win_monitor_ips_uid_detail'
    },
    height: 300,
    id: 'win_monitor_ips_uid_detail',
    resizable: false,
    scrollable: true,
    style: {
        border: '1px solid rgba(0, 0, 0, 0.1)'
    },
    header: false,
    title: 'My Window',
    titleCollapse: false,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'container',
            id: 'win_monitor_ips_uid_detail_con',
            layout: {
                type: 'hbox',
                align: 'stretch'
            }
        }
    ],
    listeners: {
        afterrender: 'onWin_monitor_ips_uid_detailAfterRender'
    },

    onWin_monitor_ips_uid_detailAfterRender: function(component, eOpts) {
        var me = this;

        me.set_detail();
    },

    set_detail: function() {
        var me = Ext.getCmp('win_monitor_ips_uid_detail');
        var win = Ext.create('NFW2.view.win_monitor_ips_uid_details',{
            me : me,
            mode : "monitor",
            record : me.record,
            flex : 1
        });

        Ext.getCmp('win_monitor_ips_uid_detail_con').remove(Ext.getCmp('win_monitor_ips_uid_detail_con').items.items[Ext.getCmp('win_monitor_ips_uid_detail_con').items.items.length-1]);

        Ext.getCmp('win_monitor_ips_uid_detail_con').add(win);
    }

});