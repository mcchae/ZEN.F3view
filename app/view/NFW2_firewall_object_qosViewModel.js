
Ext.define('NFW2.view.NFW2_firewall_object_qosViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_firewall_object_qos',

    data: {
        add: __zen('add'),
        del: __zen('del'),
        obj_unrefer: __zen('obj_unrefer'),
        obj_unused: __zen('obj_unused'),
        start_date: __zen('start_date'),
        end_date: __zen('end_date'),
        confirm: __zen('confirm'),
        obj_name: __zen('obj_name'),
        guarant_band: __zen('guarant_band'),
        limit_band: __zen('limit_band'),
        queue_method: __zen('queue_method'),
        last_hit: __zen('last_hit'),
        last_edit: __zen('last_edit'),
        desc: __zen('desc'),
        obj_count: __zen('obj_count')
    }

});