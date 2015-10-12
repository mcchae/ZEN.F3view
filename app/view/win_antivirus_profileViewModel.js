
Ext.define('NFW2.view.win_antivirus_profileViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_antivirus_profile',

    data: {
        profile_name: __zen('profile_name'),
        smtp: __zen('smtp'),
        http: __zen('http'),
        ftp: __zen('ftp'),
        search_method: __zen('search_method'),
        inactive: __zen('inactive'),
        stream: __zen('stream'),
        file: __zen('file'),
        handling_method: __zen('handling_method'),
        deny_receive: __zen('deny_receive'),
        detect_head: __zen('detect_head'),
        file_setting: __zen('file_setting'),
        max_search_file: __zen('max_search_file'),
        deny: __zen('deny'),
        detect: __zen('detect'),
        allow: __zen('allow'),
        search_compress: __zen('search_compress'),
        search2: __zen('search2'),
        unsearch: __zen('unsearch'),
        add: __zen('add'),
        del: __zen('del'),
        rank: __zen('rank'),
        file: __zen('file'),
        action: __zen('action'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});