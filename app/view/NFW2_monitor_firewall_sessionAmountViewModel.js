
Ext.define('NFW2.view.NFW2_monitor_firewall_sessionAmountViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_monitor_firewall_sessionamount',

    data: {
        min_30: __zen('min_30'),
        hour_1: __zen('hour_1'),
        hour_12: __zen('hour_12'),
        hour_24: __zen('hour_24'),
        session: __zen('session'),
        maximum: __zen('maximum'),
        average: __zen('average'),
        minimum: __zen('minimum')
    }

});