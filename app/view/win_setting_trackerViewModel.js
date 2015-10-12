
Ext.define('NFW2.view.win_setting_trackerViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_setting_tracker',

    data: {
        tracker_desc: __zen('tracker_desc'),
        basic_setting: __zen('basic_setting'),
        hours: __zen('hours'),
        output_count: __zen('output_count'),
        type: __zen('type'),
        action: __zen('action'),
        task_section: __zen('task_section'),
        align_criteria: __zen('align_criteria'),
        alignment_method: __zen('alignment_method'),
        bound_section: __zen('bound_section'),
        detail_setting: __zen('detail_setting'),
        graph: __zen('graph'),
        chart_previous: __zen('chart_previous'),
        chart_daily: __zen('chart_daily'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        zone: __zen('zone'),
        chart_today: __zen('chart_today')
    }

});