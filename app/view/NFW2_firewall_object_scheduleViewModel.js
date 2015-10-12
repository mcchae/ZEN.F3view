
Ext.define('NFW2.view.NFW2_firewall_object_scheduleViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_firewall_object_schedule',

    data: {
        add: __zen('add'),
        del: __zen('del'),
        obj_unrefer: __zen('obj_unrefer'),
        obj_unused: __zen('obj_unused'),
        obj_name: __zen('obj_name'),
        domain: __zen('domain'),
        last_hit: __zen('last_hit'),
        last_edit: __zen('last_edit'),
        desc: __zen('desc'),
        start_date: __zen('start_date'),
        end_date: __zen('end_date'),
        confirm: __zen('confirm'),
        period: __zen('period'),
        per_year: __zen('per_year'),
        per_month: __zen('per_month'),
        per_week: __zen('per_week'),
        per_day: __zen('per_day'),
        obj_count: __zen('obj_count')
    }

});