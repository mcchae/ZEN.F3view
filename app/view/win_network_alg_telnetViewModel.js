
Ext.define('NFW2.view.win_network_alg_telnetViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_network_alg_telnet',

    data: {
        port_num: __zen('port_num'),
        time_over: __zen('time_over'),
        max_connect: __zen('max_connect'),
        upload: __zen('upload'),
        download: __zen('download'),
        operating_method: __zen('operating_method'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        nomal_gate: __zen('nomal_gate'),
        blank_gate: __zen('blank_gate'),
        add_alg_telnet: __zen('add_alg_telnet'),
        edit_alg_telnet: __zen('edit_alg_telnet'),
        deny: __zen('deny'),
        accept: __zen('allow')
    }

});