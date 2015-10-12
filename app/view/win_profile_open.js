
Ext.define('NFW2.view.win_profile_open', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_profile_open',

    requires: [
        'NFW2.view.win_profile_openViewModel',
        'Ext.form.Panel'
    ],

    viewModel: {
        type: 'win_profile_open'
    },
    cls: 'zen_win',
    height: 500,
    scrollable: true,
    width: 1000,
    title: '프로파일 펼쳐보기',
    maximizable: true,
    modal: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            flex: 1,
            scrollable: true,
            bodyPadding: 20,
            title: '',
            items: [
                {
                    xtype: 'container',
                    id: 'con',
                    minWidth: 770
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWindowAfterRender'
    },

    onWindowAfterRender: function(component, eOpts) {
        var _store = Ext.data.StoreManager.lookup("store_profile_application_list");

        var List = '<table width="100%" cellpadding="3px" cellspacing="0" border="1" id="sorttable" style="border-collapse:collapse"><tr>';
        List += '<th width="60px">N</th><th>프로파일 이름</th><th>설명</th><th>범주</th>';
        List += '<th>기술</th><th>목적</th><th>인지도</th><th>컨텐츠 타입</th><th>갱신 일자</th>';
        List += '<th>업체</th><th>프로토콜</th><th>타입</th><th>행위</th><th width="30%">애플리케이션 리스트</th></tr><tbody>';

        for(var i=0; i<_store.data.getCount(); i++){

            var record = _store.data.items[i].data;
            var app = record.elements;

            List += '<tr><td rowspan="'+app.length+'">'+record['@num']+'</td><td rowspan="'+app.length+'">'+record.name+'</td>';
            List += '<td rowspan="'+app.length+'">'+record.desc+'</td>';

            if(app.length === 0){

                List += '<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';

            }else{

                for(var l=0; l<app.length; l++){

                    if(l > 0){ List += '<tr>'; }

                    var act_type = '';
                    if(app[l].action.type === "detect"){
                        act_type = "탐지";
                    }else if(app[l].action.type === "block"){
                        act_type = "차단";
                    }else{
                        act_type = "Qos";
                    }

                    var type = (app[l].type==="filter_based")?"필터기반":"직접선택";

                    var ar_app = [];
                    for(var j=0; j<app[l].applications.length; j++){
                        ar_app.push(app[l].applications[j].name);
                    }

                    List += '<td>'+app[l].category+'</td><td>'+app[l].technology+'</td><td>'+app[l].purpose+'</td>';
                    List += '<td>'+app[l].popularity+'</td><td>'+app[l].content_type+'</td><td>'+app[l].released_date+'</td>';
                    List += '<td>'+app[l].vendor+'</td><td>'+app[l].protocols+'</td>';
                    List += '<td>'+type+'</td><td>'+act_type+'</td><td>'+ar_app.join(" , ")+'</td>';

                    if(l > 0){ List += '</tr>'; }
                }

            }
            List += '</tr>';
        }

        List += '</tbody></table>';


        Ext.getCmp("con").update(List);
    }

});