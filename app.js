
// @require @packageOverrides
Ext.Loader.setConfig({
    enabled: true
});


Ext.application({
    views: [
        'MainView',
        'MyPanel1'
    ],
    controllers: [
        'DataController'
    ],
    name: 'NFW2',

    launch: function() {
        Ext.create('NFW2.view.MainView');
    }

});
