
Ext.define('NFW2.view.win_object_qosViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_object_qos',

    data: {
        obj_name: __zen('obj_name'),
        desc: __zen('desc'),
        guarant_band: __zen('guarant_band'),
        limit_band: __zen('limit_band'),
        queue_method: __zen('queue_method'),
        queue_length: __zen('queue_length'),
        speed: __zen('speed'),
        high: __zen('high'),
        middle: __zen('middle'),
        low: __zen('low'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});