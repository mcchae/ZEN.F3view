
Ext.define('NFW2.view.NFW2_dboardViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_dboard',

    data: {
        status: __zen('status'),
        form: __zen('form'),
        demo: __zen('demo_license'),
        key_hardware: __zen('key_hardware'),
        key_license: __zen('key_license'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        
    }

});