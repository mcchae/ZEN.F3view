
Ext.define('NFW2.view.win_alarm_settingViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_alarm_setting',

    data: {
        rule_id: __zen('rule_id'),
        hazard: __zen('hazard'),
        detect_count: __zen('detect_count'),
        block_count: __zen('block_count'),
        detect_byte: __zen('detect_byte'),
        block_bytes: __zen('block_bytes'),
        reset: __zen('reset'),
        apply: __zen('apply'),
        cancel: __zen('cancel')
    }

});