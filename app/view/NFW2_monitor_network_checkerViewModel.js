
Ext.define('NFW2.view.NFW2_monitor_network_checkerViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_monitor_network_checker',

    data: {
        filter_apply: __zen('filter_apply'),
        filter_reset: __zen('filter_reset'),
        checker_msg1: __zen('checker_msg1'),
        inter: __zen('inter'),
        link: __zen('link'),
        checker_info: __zen('checker_info'),
        status: __zen('status'),
        name: __zen('name'),
        dest: __zen('dest'),
        mode: __zen('mode'),
        bandwidth: __zen('bandwidth')
    }

});