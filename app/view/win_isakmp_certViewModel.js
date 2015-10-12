
Ext.define('NFW2.view.win_isakmp_certViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_isakmp_cert',

    data: {
        version: __zen('version'),
        con_number: __zen('con_number'),
        sig_algorithm: __zen('sig_algorithm'),
        vd_start: __zen('vd_start'),
        vd_end: __zen('vd_end'),
        subject: __zen('subject'),
        public_key: __zen('public_key'),
        key_usage_purpose: __zen('key_usage_purpose'),
        issuer: __zen('issuer')
    }

});