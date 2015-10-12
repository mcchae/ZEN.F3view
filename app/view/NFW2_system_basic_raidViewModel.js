
Ext.define('NFW2.view.NFW2_system_basic_raidViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_system_basic_raid',

    data: {
        operate_mode: __zen('operate_mode'),
        method: __zen('method'),
        raid_info1: __zen('raid_info1'),
        raid_info2: __zen('raid_info2'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});