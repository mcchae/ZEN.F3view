
Ext.define('NFW2.view.NFW2_monitor_firewall_packetViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_monitor_firewall_packet',

    data: {
        date: __zen('date'),
        today: __zen('today'),
        yesterday: __zen('yesterday'),
        day: __zen('day'),
        one_month: __zen('one_month'),
        month: __zen('month'),
        search_word: __zen('search_word'),
        detail_search: __zen('detail_search'),
        reset_search_word: __zen('reset_search_word'),
        searchable_list: __zen('searchable_list'),
        search: __zen('search'),
        simple_view: __zen('simple_view'),
        all_view: __zen('all_view'),
        print_page: __zen('print_page'),
        print_file: __zen('print_file'),
        filter_apply: __zen('filter_apply'),
        filter_reset: __zen('filter_reset'),
        del_session: __zen('del_session'),
        session_block: __zen('session_block')
    }

});