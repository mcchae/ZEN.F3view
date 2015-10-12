
Ext.define('NFW2.view.win_portgroupViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_portgroup',

    data: {
        obj_name: __zen('obj_name'),
        desc: __zen('desc'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        group_member: __zen('group_member')
    }

});