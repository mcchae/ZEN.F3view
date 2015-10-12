
Ext.define('NFW2.view.NFW2_log_config_dataManageViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_log_config_datamanage',

    data: {
        compression: __zen('compression'),
        disble_compression: __zen('disble_compression'),
        download: __zen('download'),
        del: __zen('del'),
        sftp_transfer: __zen('sftp_transfer'),
        compression_log: __zen('compression_log'),
        general_log: __zen('general_log'),
        file_name: __zen('file_name'),
        log_count: __zen('log_count'),
        file_size: __zen('file_size')
    }

});