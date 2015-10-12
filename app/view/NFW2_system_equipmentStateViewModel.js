
Ext.define('NFW2.view.NFW2_system_equipmentStateViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_system_equipmentstate',

    data: {
        device_info: __zen('device_info'),
        device_name: __zen('device_name'),
        device_cpu: __zen('device_cpu'),
        memory: __zen('memory'),
        serial: __zen('serial'),
        ver_info: __zen('version_info'),
        firmware: __zen('firmware'),
        ramdisk: __zen('ramdisk'),
        image: __zen('image'),
        app_db: __zen('update_info6')+' DB',
        mal_db: __zen('update_info7'),
        web_db: __zen('update_info8'),
        code_db: __zen('update_info9'),
        sig_ips: __zen('update_info10'),
        sig_av_stream: __zen('update_info11'),
        sig_av_file: __zen('update_info12'),
        sig_as: __zen('update_info13'),
        eth_info: __zen('interface_info'),
        file_sys_info: __zen('file_sys_info'),
        confirm: __zen('confirm'),
        ha: __zen('ha_plus')
    }

});