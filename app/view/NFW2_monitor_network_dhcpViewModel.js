
Ext.define('NFW2.view.NFW2_monitor_network_dhcpViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_monitor_network_dhcp',

    data: {
        inter: __zen('inter'),
        assign_address: __zen('assign_address'),
        allocate_period: __zen('allocate_period'),
        end_time: __zen('end_time'),
        address: __zen('address'),
        host_name: __zen('host_name'),
        nodata_monitor_dhcp: __zen('nodata_monitor_dhcp')
    }

});