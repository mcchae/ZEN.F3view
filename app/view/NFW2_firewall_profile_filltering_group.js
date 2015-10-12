
Ext.define('NFW2.view.NFW2_firewall_profile_filltering_group', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    id: 'urlGroup',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    disabled: true,
                    id: 'fm',
                    bodyPadding: 10,
                    title: 'URL 그룹 리스트',
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    width: 200,
                                    items: [
                                        {
                                            xtype: 'container',
                                            style: 'border:5px solid #4b5471;',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    padding: '5 5 0 5',
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            layout: 'table',
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: 'search',
                                                                    fieldLabel: ''
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    margin: '0 0 0 5',
                                                                    text: '검색',
                                                                    listeners: {
                                                                        click: {
                                                                            fn: me.onButtonClick1,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            hidden: true,
                                                            id: 'con_next',
                                                            margin: '0 0 5 0',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch',
                                                                pack: 'end'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    text: 'Next',
                                                                    listeners: {
                                                                        click: {
                                                                            fn: me.onButtonClick2,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            id: 'menu',
                                            width: 200,
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    id: 'cate_1',
                                                    listeners: {
                                                        afterrender: {
                                                            fn: me.onContainerAfterRender,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    id: 'cate_2',
                                                    listeners: {
                                                        afterrender: {
                                                            fn: me.onCate_2AfterRender,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    id: 'cate_3',
                                                    listeners: {
                                                        afterrender: {
                                                            fn: me.onCate_3AfterRender,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    hidden: true,
                                                    id: 'cate_s3',
                                                    width: 200
                                                },
                                                {
                                                    xtype: 'container',
                                                    id: 'cate_4',
                                                    listeners: {
                                                        afterrender: {
                                                            fn: me.onCate_4AfterRender,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    hidden: true,
                                                    id: 'cate_s4',
                                                    width: 200
                                                },
                                                {
                                                    xtype: 'container',
                                                    id: 'cate_5',
                                                    listeners: {
                                                        afterrender: {
                                                            fn: me.onCate_5AfterRender,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    hidden: true,
                                                    id: 'cate_s5',
                                                    width: 200
                                                },
                                                {
                                                    xtype: 'container',
                                                    id: 'cate_6',
                                                    listeners: {
                                                        afterrender: {
                                                            fn: me.onCate_6AfterRender,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    hidden: true,
                                                    id: 'cate_s6',
                                                    width: 200
                                                },
                                                {
                                                    xtype: 'container',
                                                    id: 'cate_7',
                                                    listeners: {
                                                        afterrender: {
                                                            fn: me.onCate_7AfterRender,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    hidden: true,
                                                    id: 'cate_s7',
                                                    width: 200
                                                },
                                                {
                                                    xtype: 'container',
                                                    id: 'cate_8',
                                                    listeners: {
                                                        afterrender: {
                                                            fn: me.onCate_8AfterRender,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    hidden: true,
                                                    id: 'cate_s8',
                                                    width: 200
                                                },
                                                {
                                                    xtype: 'container',
                                                    id: 'cate_9',
                                                    listeners: {
                                                        afterrender: {
                                                            fn: me.onCate_9AfterRender,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    hidden: true,
                                                    id: 'cate_s9',
                                                    width: 200
                                                },
                                                {
                                                    xtype: 'container',
                                                    id: 'cate_10',
                                                    listeners: {
                                                        afterrender: {
                                                            fn: me.onCate_10AfterRender,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    hidden: true,
                                                    id: 'cate_s10',
                                                    width: 200
                                                },
                                                {
                                                    xtype: 'container',
                                                    id: 'cate_11',
                                                    listeners: {
                                                        afterrender: {
                                                            fn: me.onCate_11AfterRender,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    hidden: true,
                                                    id: 'cate_s11',
                                                    width: 200
                                                },
                                                {
                                                    xtype: 'container',
                                                    id: 'cate_12',
                                                    listeners: {
                                                        afterrender: {
                                                            fn: me.onCate_12AfterRender,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    hidden: true,
                                                    id: 'cate_s12',
                                                    width: 200
                                                },
                                                {
                                                    xtype: 'container',
                                                    id: 'cate_13',
                                                    listeners: {
                                                        afterrender: {
                                                            fn: me.onCate_13AfterRender,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    id: 'cate_14',
                                                    listeners: {
                                                        afterrender: {
                                                            fn: me.onCate_14AfterRender,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    hidden: true,
                                                    id: 'cate_s14',
                                                    width: 200
                                                },
                                                {
                                                    xtype: 'container',
                                                    id: 'cate_15',
                                                    listeners: {
                                                        afterrender: {
                                                            fn: me.onCate_15AfterRender,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    hidden: true,
                                                    id: 'cate_s15',
                                                    width: 200
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    id: 'con_title',
                                                    width: 640,
                                                    listeners: {
                                                        afterrender: {
                                                            fn: me.onCon_titleAfterRender,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    hidden: true,
                                                    id: 'btn_sub',
                                                    margin: '0 0 0 5',
                                                    text: 'DB 저장하기',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onButtonClick,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    listeners: {
                                                        afterrender: {
                                                            fn: me.onContainerAfterRender1,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                beforerender: {
                    fn: me.onPanelBeforeRender,
                    scope: me
                },
                afterrender: {
                    fn: me.onUrlGroupAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonClick1: function(button, e, eOpts) {
        var search = Ext.getCmp("search").getValue();
        var me = Ext.getCmp("urlGroup");

        Ext.getCmp("fm").disable();
        showLoadMask();

        var _params = {
            keyword: Ext.encode(search)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'findFwProfileCateDB',
            _params,
            function(response){

                if(response.list.length === 0){
                    Ext.MessageBox.alert("","");
                    return false;
                }

                var fir = response.list[0];
                var id = '';

                if(fir === 0 || fir === 1 || fir === 119){
                    id = (fir===0)?'1':(fir===1)?'2':'13';
                }else if(fir >= 2 && fir <= 21){
                    id = '3';
                }else if(fir >= 22 && fir <= 31){
                    id = '4';
                }else if(fir >= 32 && fir <= 50){
                    id = '5';
                }else if(fir >= 51 && fir <= 68){
                    id = '6';
                }else if(fir >= 69 && fir <= 76){
                    id = '7';
                }else if(fir >= 77 && fir <= 84){
                    id = '8';
                }else if(fir >= 85 && fir <= 93){
                    id = '9';
                }else if(fir >= 94 && fir <= 102){
                    id = '10';
                }else if(fir >= 103 && fir <= 105){
                    id = '11';
                }else if(fir >= 106 && fir <= 118){
                    id = '12';
                }else if(fir >= 120 && fir <= 139){
                    id = '14';
                }else if(fir >= 201 && fir <= 250){
                    id = '15';
                }

                me.ser_num = 0;
                me.ser_count = 0;
                me.search_str = search;
                clkmenu(id,fir,search);

                if(fir !== 0 && fir !== 1 && fir !== 119){

                    me.menu_sh(Ext.getCmp("cate_"+id),'search');
                }

                var ar_search = [];

                for(var i in response.list){
                    fir = response.list[i];

                    if(fir === 0 || fir === 1 || fir === 119){
                        id = (fir===0)?'1':(fir===1)?'2':'13';
                    }else if(fir >= 2 && fir <= 21){
                        id = '3';
                    }else if(fir >= 22 && fir <= 31){
                        id = '4';
                    }else if(fir >= 32 && fir <= 50){
                        id = '5';
                    }else if(fir >= 51 && fir <= 68){
                        id = '6';
                    }else if(fir >= 69 && fir <= 76){
                        id = '7';
                    }else if(fir >= 77 && fir <= 84){
                        id = '8';
                    }else if(fir >= 85 && fir <= 93){
                        id = '9';
                    }else if(fir >= 94 && fir <= 102){
                        id = '10';
                    }else if(fir >= 103 && fir <= 105){
                        id = '11';
                    }else if(fir >= 106 && fir <= 118){
                        id = '12';
                    }else if(fir >= 120 && fir <= 139){
                        id = '14';
                    }else if(fir >= 201 && fir <= 250){
                        id = '15';
                    }

                    ar_search.push({
                        'category': id,
                        'num': response.list[i]
                    });
                }

                me.ar_search = ar_search;

                Ext.getCmp("con_next").show();
            }
        );
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = Ext.getCmp("urlGroup");

        var num = me.ser_num;
        var search_str = me.search_str;
        var ser_category = me.ser_category;

        selectRangeStr(search_str,num);
    },

    onContainerAfterRender: function(component, eOpts) {
        component.update("<table border='0' cellspacing='0' cellpadding='0' class='blbox' width='200px' align='center'><tr><td class='bl_head'></td><td class='bl_close'>악성코드 배포지</td></tr></table>");

        component.getEl().on('click', function(eOpts) {
            clkmenu(1,0);
        }, component);
    },

    onCate_2AfterRender: function(component, eOpts) {
        component.update("<table border='0' cellspacing='0' cellpadding='0' class='blbox' width='200px' align='center'><tr><td class='bl_head'></td><td class='bl_close' click='clkmenu(2)'>게임</td></tr></table>");

        component.getEl().on('click', function(eOpts) {
            clkmenu(2,1);
        }, component);
    },

    onCate_3AfterRender: function(component, eOpts) {
        component.update("<table border='0' cellspacing='0' cellpadding='0' class='blbox' width='200px' align='center'><tr><td class='bl_head'></td><td class='bl_close'>경제</td></tr></table>");

        var me = this;

        component.getEl().on("click", function(eOpts){

            me.menu_sh(component);

        }, component);
    },

    onCate_4AfterRender: function(component, eOpts) {
        component.update("<table border='0' cellspacing='0' cellpadding='0' class='blbox' width='200px' align='center' id='cate_4'><tr><td class='bl_head'></td><td class='bl_close'>교육,학문</td></tr></table>");

        var me = this;

        component.getEl().on("click", function(eOpts){

            me.menu_sh(component);

        }, component);
    },

    onCate_5AfterRender: function(component, eOpts) {
        component.update("<table border='0' cellspacing='0' cellpadding='0' class='blbox' width='200px' align='center' id='cate_5'><tr><td class='bl_head'></td><td class='bl_close'>기업</td></tr></table>");

        var me = this;

        component.getEl().on("click", function(eOpts){

            me.menu_sh(component);

        }, component);
    },

    onCate_6AfterRender: function(component, eOpts) {
        component.update("<table border='0' cellspacing='0' cellpadding='0' class='blbox' width='200px' align='center'><tr><td class='bl_head'></td><td class='bl_close'>뉴스,미디어</td></tr></table>");

        var me = this;

        component.getEl().on("click", function(eOpts){

            me.menu_sh(component);

        }, component);
    },

    onCate_7AfterRender: function(component, eOpts) {
        component.update("<table border='0' cellspacing='0' cellpadding='0' class='blbox' width='200px' align='center'><tr><td class='bl_head'></td><td class='bl_close'>생활,건강</td></tr></table>");

        var me = this;

        component.getEl().on("click", function(eOpts){

            me.menu_sh(component);

        }, component);
    },

    onCate_8AfterRender: function(component, eOpts) {
        component.update("<table border='0' cellspacing='0' cellpadding='0' class='blbox' width='200px' align='center'><tr><td class='bl_head'></td><td class='bl_close'>레저,스포츠</td></tr></table>");

        var me = this;

        component.getEl().on("click", function(eOpts){

            me.menu_sh(component);

        }, component);
    },

    onCate_9AfterRender: function(component, eOpts) {
        component.update("<table border='0' cellspacing='0' cellpadding='0' class='blbox' width='200px' align='center'><tr><td class='bl_head'></td><td class='bl_close'>문화,예술</td></tr></table>");

        var me = this;

        component.getEl().on("click", function(eOpts){

            me.menu_sh(component);

        }, component);
    },

    onCate_10AfterRender: function(component, eOpts) {
        component.update("<table border='0' cellspacing='0' cellpadding='0' class='blbox' width='200px' align='center'><tr><td class='bl_head'></td><td class='bl_close'>사회,정치</td></tr></table>");

        var me = this;

        component.getEl().on("click", function(eOpts){

            me.menu_sh(component);

        }, component);
    },

    onCate_11AfterRender: function(component, eOpts) {
        component.update("<table border='0' cellspacing='0' cellpadding='0' class='blbox' width='200px' align='center'><tr><td class='bl_head'></td><td class='bl_close'>세계정보,여행</td></tr></table>");

        var me = this;

        component.getEl().on("click", function(eOpts){

            me.menu_sh(component);

        }, component);
    },

    onCate_12AfterRender: function(component, eOpts) {
        component.update("<table border='0' cellspacing='0' cellpadding='0' class='blbox' width='200px' align='center'><tr><td class='bl_head'></td><td class='bl_close'>엔터테인먼트</td></tr></table>");

        var me = this;

        component.getEl().on("click", function(eOpts){

            me.menu_sh(component);

        }, component);
    },

    onCate_13AfterRender: function(component, eOpts) {
        component.update("<table border='0' cellspacing='0' cellpadding='0' class='blbox' width='200px' align='center'><tr><td class='bl_head'></td><td class='bl_close' click='clkmenu(13)'>인물,사람들</td></tr></table>");

        component.getEl().on('click', function(eOpts) {
            clkmenu(13,119);
        }, component);
    },

    onCate_14AfterRender: function(component, eOpts) {
        component.update("<table border='0' cellspacing='0' cellpadding='0' class='blbox' width='200px' align='center'><tr><td class='bl_head'></td><td class='bl_close'>컴퓨터,인터넷</td></tr></table>");

        var me = this;

        component.getEl().on("click", function(eOpts){

            me.menu_sh(component);

        }, component);
    },

    onCate_15AfterRender: function(component, eOpts) {
        component.update("<table border='0' cellspacing='0' cellpadding='0' class='blbox' width='200px' align='center'><tr><td class='bl_head'></td><td class='bl_close'>사용자정의</td></tr></table>");

        var me = this;

        component.getEl().on("click", function(eOpts){

            me.menu_sh(component);

        }, component);
    },

    onCon_titleAfterRender: function(component, eOpts) {
        component.update('<table border="0" cellspacing="0" width="640px" cellpadding="0"><tr><td id="f_title" class="t_w_k">악성코드 배포지</td><td><input type="button" id="b_createdb" class="b_createdb" value="" onclick="set_FwProfile_URLDB()"/></td></tr></table>');
    },

    onButtonClick: function(button, e, eOpts) {
        var me = Ext.getCmp("urlGroup");

        var List = [];

        var urlList = document.getElementById("urlLists").value.split("\n");

        for(var i=0; i<urlList.length; i++){
            List.push(urlList[i]);
        }

        if(List.length === 1 && List[0] === ''){
            List[0] = ' ';
        }

        var _params = {
            category_num: Ext.encode(Number(me._id)),
            url_list: Ext.encode(List)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setFwProfileURL',
            _params,
            function(response){

                Ext.Msg.show({
                    title: 'System Message - SUCCESS',
                    msg: get_msg("msg_ok_add"),
                    width: 300,
                    buttons: Ext.Msg.YES,
                    icon: Ext.window.MessageBox.INFO
                });
            }
        );
    },

    onContainerAfterRender1: function(component, eOpts) {
        component.update("<textarea id='urlLists' wrap='off' spellcheck='false' style='width:640px; height:500px; ime-mode:disabled; overflow:auto; font:11px/18px verdana; background:url(../images/textarea_bg.gif); overflow:auto; border:1px solid #fff; ime-mode:disabled; color:#003366; padding-left:3px;' readonly></textarea>");
    },

    onPanelBeforeRender: function(component, eOpts) {
        var me = this;

        var menu = Ext.getCmp("menu");

        var _param = {
            name: Ext.encode('category_db')
        };

        showLoadMask();

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_fw_profile_web_db',
            _param,
            function(response){

                hideLoadMask();

                var List = "";

                me.web_db = response;

                clkmenu(1,0);

                for(var i in response){

                    if(i === "15"){ break; }

                    if(i === "1" || i === "2" || i === "13"){ continue; }

                    div = "<table border='0' cellspacing='0' cellpadding='0' class='tbl_sub'>";

                    for(var l in response[i].list){
                        div += "<tr><td class='subbox' id='uidx"+l+"' onclick='clkmenu("+i+","+l+")' >"+l+". "+response[i].list[l].name+"</td></tr>";
                    }

                    div += "</table>";

                    Ext.getCmp("cate_s"+i).update(div);
                }

                var div = "<table border='0' cellspacing='0' cellpadding='0' class='tbl_sub'>";
                for(var l in response[15].list){
                    var name = response[15].list[l].name;
                    div += '<tr><td class="subbox" id="uidx'+l+'" ondblclick="repHttpuser(this,'+l+')" onclick="clkmenu(15,'+l+')" >'+l+'. '+name+'</td></tr>';
                }
                div += "</table>";
                Ext.getCmp("cate_s15").update(div);

            }
        );
    },

    onUrlGroupAfterRender: function(component, eOpts) {
        var me = Ext.getCmp("urlGroup");
        var bro = navigator.userAgent;

        if(bro.indexOf("Trident") !== -1){
            me.bro = "ie";
        }
    },

    menu_sh: function(component, search) {
        var me = Ext.getCmp("urlGroup");
        var web_db = me.web_db;

        var id = component.id.split("_");
        var sh = "";
        var cate_s = Ext.getCmp("cate_s"+id[1]);

        if(cate_s.hidden === true || search){
            cate_s.show();
            sh = "bl_open";
        }else{
            cate_s.hide();
        }

        component.update("<table border='0' cellspacing='0' cellpadding='0' class='blbox' width='200px' align='center'><tr><td class='bl_head'></td><td class='bl_close "+sh+"'>"+web_db[id[1]].group_name+"</td></tr></table>");
    }

});