
Ext.define('NFW2.view.NFW2_log_statistics_packetViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_log_statistics_packet',

    data: {
        date: __zen('date'),
        time: __zen('time'),
        search: __zen('search'),
        day: __zen('day'),
        yesterday: __zen('yesterday'),
        one_month: __zen('one_month'),
        month: __zen('month'),
        today: __zen('today')
    }

});