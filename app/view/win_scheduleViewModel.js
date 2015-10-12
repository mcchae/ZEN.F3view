
Ext.define('NFW2.view.win_scheduleViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_schedule',

    data: {
        add: __zen('add'),
        obj_name: __zen('obj_name'),
        desc: __zen('desc'),
        per_year: __zen('per_year'),
        per_month: __zen('per_month'),
        per_week: __zen('per_week'),
        per_day: __zen('per_day'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        start: __zen('start'),
        end: __zen('end'),
        sun: getWeek(0)
    }

});