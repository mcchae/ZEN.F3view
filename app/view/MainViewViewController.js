
Ext.define('NFW2.view.MainViewViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainview',

    set_favMenu: function() {

        var me = this;
        var _me = Ext.getCmp('NFW2_client');

        var _getparams = {
            basename : Ext.encode('manage_config')
        };

        request_helper.xmlrpc_call_JsonP('ftuctrl','getObject',_getparams,function(response){


            var userid = _me.clientInfo.userId;
            var menuid = _me.nowId;
            var menutext = _me.nowText;
            var lang = _me.lang;


            var fav_obj = {};
            var fav = [];
            var _fav = {};


            if(response !== null){ fav_obj = response.fav;  }

            if(fav_obj[userid]===undefined){

                _fav[menuid] = { text:menutext };

                fav_obj[userid]= _fav;

                var msg = get_msg("msg_fav_on");

            }else{

                if(fav_obj[userid][menuid] === undefined){

                    fav = {text: menutext };

                    fav_obj[userid][menuid]= fav;



                    var msg = get_msg("msg_fav_on");

                }else{

                    delete fav_obj[userid][menuid];
        			var msg = get_msg("msg_fav_off");

                }

            }


            var obj_d = {
                'fav' : fav_obj
            };

            var _params = {
                basename : Ext.encode('manage_config'),
                obj : Ext.encode(obj_d)
            };

            var mstore = Ext.data.StoreManager.lookup("ferretMenu");

            request_helper.xmlrpc_call_JsonP('ftuctrl','setObject',_params,

                                             function(response){

                                                 Ext.getCmp('menu_in_fav').removeAll();

                                                 var userobj = fav_obj[userid];

                                                 for (var key in userobj) {

                                                     var __text = mstore.getNodeById(key).data[lang];
                                                     var __parent = mstore.getNodeById(key).parentNode.data[lang];

                                                     var item =  new Ext.menu.Item({
                                                         // text: userobj[key].text,
                                                         text:__parent +" > " +  __text,
                                                         value:key,
                                                         cls: 'in_menu',
                                                         activeCls: 'in_menu_ov',
                                                         iconCls: 'ic_menu',
                                                         handler: function(item){
                                                             me.go_link(item.value);
                                                         }
                                                     });

                                                     Ext.getCmp('menu_in_fav').add(item);
                                                 }

                                                 Ext.Msg.alert(__weguardia,msg);
                                             }
                                            );
        }
                                        );
    },

    set_zenLicense: function() {
        var me = Ext.getCmp('NFW2_client');
        var _me = this;


        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_license_info',
            {},
            function(response){

                console.log("New license (main view set_zenlicense)",response);

                if(response.module.fw === null || response.module.fw === "off"){
                    me.zenLicense.fw = "none";
                }else if(response.module.fw === "on" && response.system_module.fw === "on"){
                    me.zenLicense.fw = "on";
                }else{
                    me.zenLicense.fw = "off";
                }

                if(response.module.ips === null || response.module.ips === "off"){
                    me.zenLicense.ips = "none";
                }else if(response.module.ips === "on" && response.system_module.ips === "on"){
                    me.zenLicense.ips = "on";
                }else{
                    me.zenLicense.ips = "off";
                }

                if(response.module.ipsec === null || response.module.ipsec === "off"){
                    me.zenLicense.ipsec = "none";
                }else if(response.module.ipsec === "on" && response.system_module.ipsec === "on"){
                    me.zenLicense.ipsec = "on";
                }else{
                    me.zenLicense.ipsec = "off";
                }

                if(response.module.ssl === null || response.module.ssl === "off"){
                    me.zenLicense.ssl = "none";
                }else if(response.module.ssl === "on" && response.system_module.ssl === "on"){
                    me.zenLicense.ssl = "on";
                }else{
                    me.zenLicense.ssl = "off";
                }



                if(response.module.as === null || response.module.as === "off"){
                    me.zenLicense.as = "none";
                }else if(response.module.as === "on" && response.system_module.as === "on"){
                    me.zenLicense.as = "on";
                }else{
                    me.zenLicense.as = "off";
                }


                if(response.module.av === null || response.module.av === "off"){
                    me.zenLicense.av = "none";
                }else if(response.module.av === "on" && response.system_module.av === "on"){
                    me.zenLicense.av = "on";
                }else{
                    me.zenLicense.av = "off";
                }

                if(response.module.ddos === null || response.module.ddos === "off"){
                    me.zenLicense.ddos = "none";
                }else if(response.module.ddos === "on" && response.system_module.ddos === "on"){
                    me.zenLicense.ddos = "on";
                }else{
                    me.zenLicense.ddos = "off";
                }

                if(response.module.tracker === null || response.module.tracker === "off"){
                    me.zenLicense.tracker = "none";
                }else if(response.module.tracker === "on" && response.system_module.tracker === "on"){
                    me.zenLicense.tracker = "on";
                }else{
                    me.zenLicense.tracker = "off";
                }

                if(response.module.waf === null || response.module.waf === "off"){
                    me.zenLicense.waf = "none";
                }else if(response.module.waf === "on" && response.system_module.waf === "on"){
                    me.zenLicense.waf = "on";
                }else{
                    me.zenLicense.waf = "off";
                }

                me.zenLicense.flag = response.flag;

            });


    },

    send_policy: function(chk_ipsec) {
        var me = Ext.getCmp('NFW2_client');
        var _me = this;



        Ext.getCmp('btn_sendpolicy').setDisabled(true);
        //Ext.getCmp('btn_sendpolicy').addCls("btn_sendpolicy_pr");
        //showLoadMask();
        Ext.getBody().mask(get_msg('msg_send_wait'));

        //IPSec 상태 저장
        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObjectOne',
            {basename : Ext.encode('vpn_etc'),key : Ext.encode('ipsec_reset'),value : Ext.encode(chk_ipsec),
            },
            function(response){
            });


        //필터링 정책 중복 검사 - 정책 적용시 설정되어 있는 경우 검사
        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getNewPolicyDupInfo',
            {},
            function(response){}
        );

        var flag_sync = false;
        var flag_pop = false;
        var flag_fast = false;/*전송이빨리되서 1을 안거치고 2로 갔을때*/

        //현재 정책전송 진행중인지 체크
        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'isDoingSendPolicy',
            {},
            function(response){

                if(response === false){

                    var _params = {

                        userid : Ext.encode(Ext.getCmp('NFW2_client').clientInfo.userId),
                        userip : Ext.encode(Ext.getCmp('NFW2_client').clientInfo.clientIp)
                    };


                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'startSendPolicy',
                        _params,
                        function(response){


                            var timer = setInterval(function(){

                                request_helper.xmlrpc_call_JsonP(
                                    'ftuctrl',
                                    'getSendPolicyMsg',
                                    {},
                                    function(response){

                                        console.log("mxxxxx",response.sendpolicy_rt,response);

                                        if(response.sendpolicy_rt===2){ /*정책전송 완료*/
                                            clearInterval(timer);
                                            Ext.getCmp('btn_sendpolicy').setDisabled(false);
                                            if(flag_fast !== true){
                                                Ext.MessageBox.alert(__weguardia,get_msg('msg_send_ok'));
                                                hideLoadMask();
                                            }

                                        }else if(response.sendpolicy_rt===-1){ /*정책전송 실패*/
                                            clearInterval(timer);
                                            Ext.getCmp('btn_sendpolicy').setDisabled(false);
                                            Ext.MessageBox.alert(__weguardia,get_msg('msg_send_error')+ "<p>"+response.errlog);
                                            hideLoadMask();

                                        }else if(response.sendpolicy_rt===1){ /*정책반영 완료*/
                                            if(flag_pop===false){
                                                flag_pop = true;
                                                flag_fast = true;
                                                Ext.MessageBox.alert(__weguardia,get_msg('msg_send_ok'));
                                                hideLoadMask();

                                            }

                                            //정책전송 성공
                                            if(response.sendPolicy===true){

                                                //정책 동기화 체크
                                                if(flag_sync===false){
                                                    flag_sync = true;
                                                    _me.send_policy_sync();

                                                }


                                            }


                                        }






                                    });

                            },2000);


                        });
                }

            });


    },

    send_policy_sync: function() {
        console.log("call_sync");

        request_helper.xmlrpc_call_JsonP(
                                            'ftuctrl',
                                            'getObject',
                                            {basename : Ext.encode('network_ha_sync')},
                                            function(response){

                                            // 동기화 라인이 설정되어 있고 설정 동기화 모드가 사용이고 master 일 경우
                                            if(response.line.use === "1" && response.config.use === '1' && response.config.mode === 'master'){


                                            var _params = {
                                                basename : Ext.encode('network_ha_sync'),
                                                mode : Ext.encode('master'),
                                                slave_timeout : Ext.encode('60')
                                            };

                                            request_helper.xmlrpc_call_JsonP(
                                            'ftuctrl',
                                            'execPolicySync',
                                            _params,
                                            function(response){});
                                            }
                                            });
    },

    go_link: function(id) {

        if(id.substr(0,3) !== "NFW"){return false;}

        if(id===""){return false;}

        var _me = Ext.getCmp('NFW2_client');
        var __auth = _me.clientInfo.perspectiveInfo;

        Ext.getCmp('pnl_navi').show();

        if(__auth!==2){
        Ext.getCmp('sel_zen_license').show();
        }

        make_navi_map(id);


    },

    get_reserv_policy: function() {

        /*

                @ description : 정책 예약 전송 여부 표시

                @ since : 2014.02.14

                @ author : EMS Team / youngmin shin (ymshin@future.co.kr)

                */


        var _params = {
            basename : Ext.encode('system_reservation_policy')

        };

        var me = this;

        var btn_ca = Ext.getCmp('btn_calendar');

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){

                console.log("reserve",response);

                if(response !== null){



                    if(response.reservation.use === "on"){


                        btn_ca.setBadgeText('on');

                        var _msg = msg_send_reservation(response.reservation.year,response.reservation.month,response.reservation.day,response.reservation.hour,response.reservation.time);

                        btn_ca.rev_msg = _msg;


                    }else{


                        btn_ca.setBadgeText('');
                        btn_ca.rev_msg = get_msg('msg_rev_off');

                    }
                }else{


                    btn_ca.setBadgeText('');
                    btn_ca.rev_msg = get_msg('msg_rev_off');
                }



            }

        );

    },

    makeMenu: function() {
        var me = this;
        var _me = Ext.getCmp('NFW2_client');

        Ext.getCmp('menu_in_ipsec').removeAll();
        Ext.getCmp('menu_in_ssl').removeAll();
        Ext.getCmp('menu_in_ips').removeAll();
        Ext.getCmp('menu_in_av').removeAll();
        Ext.getCmp('menu_in_as').removeAll();
        Ext.getCmp('menu_in_fw').removeAll();
        Ext.getCmp('menu_in_obj').removeAll();
        Ext.getCmp('menu_in_profile').removeAll();
        Ext.getCmp('menu_in_network').removeAll();
        Ext.getCmp('menu_in_system').removeAll();
        Ext.getCmp('menu_in_ddos').removeAll();
        Ext.getCmp('menu_in_log').removeAll();
        Ext.getCmp('menu_in_log_stat').removeAll();
        Ext.getCmp('menu_in_logset').removeAll();
        Ext.getCmp('menu_in_mon_net').removeAll();
        Ext.getCmp('menu_in_mon_sys').removeAll();
        Ext.getCmp('menu_in_mon_fw').removeAll();
        Ext.getCmp('menu_in_mon_ips').removeAll();
        Ext.getCmp('menu_in_mon_ddos').removeAll();
        Ext.getCmp('menu_in_mon_set').removeAll();





        var lang = _me.lang;
        var store = Ext.data.StoreManager.lookup("ferretMenu");
        var items = store.data.items;

        var raid = _me.isRaidShow;


        for (var i = 0; i < items.length; ++i){

            var menuid = items[i].raw.menuid;


            // if(g_menu.indexOf(menuid) === -1){continue;}/*라이센스별 메뉴 셋팅*/

            for (var j = 0; j < items[i].raw.children.length; ++j){

                var subs = items[i].raw.children[j].children;
                var subMenu_1 = "";

                if(subs !== null){

                    subMenu_1 = new Ext.menu.Menu({  shadow: 'drop', baseCls: 'menu_body', cls: 'menu_body'});

                    for (var k = 0; k < subs.length; ++k){




                        var subs_2 = items[i].raw.children[j].children[k].children;
                        var subMenu_2 = "";




                        if(subs_2 !== null){

                            subMenu_2 = new Ext.menu.Menu({  shadow: 'drop', baseCls: 'menu_body', cls: 'menu_body'});

                            for (var p = 0; p < subs_2.length; ++p){

                                console.log("depth3333333333333333333333333333333");

                                var subs_3 = items[i].raw.children[j].children[k].children[p].children;
                                var subMenu_3 = "";

                                if(subs_3 !== null){

                                    subMenu_3 = new Ext.menu.Menu({  shadow: 'drop', baseCls: 'menu_body', cls: 'menu_body'});


                                    for (var q = 0; q < subs_3.length; ++q){


                                        console.log("depth444444444444444444");



                                        var depth_4 =  new Ext.menu.Item({
                                            text: subs_3[q][lang],
                                            value:subs_3[q].id,
                                            cls: 'in_menu',
                                            activeCls: 'in_menu_ov',
                                            iconCls: 'ic_menu',
                                            handler: function(depth_4){
                                                // if(depth_4.menu===""){
                                                me.go_link(depth_4.value);
                                                //}
                                            }
                                        });


                                        subMenu_3.add(depth_4);
                                    }

                                }



                                var depth_3 =  new Ext.menu.Item({
                                    text: subs_2[p][lang],
                                    value:subs_2[p].id,
                                    cls: 'in_menu',
                                    activeCls: 'in_menu_ov',
                                    iconCls: 'ic_menu',
                                    handler: function(depth_3){
                                        if(depth_3.menu===""){
                                            me.go_link(depth_3.value);
                                        }
                                    },
                                    menu:subMenu_3
                                });



                                subMenu_2.add(depth_3);


                            }

                        }



                        var depth_2 =  new Ext.menu.Item({
                            text: subs[k][lang],
                            value:subs[k].id,
                            cls: 'in_menu',
                            activeCls: 'in_menu_ov',
                            iconCls: 'ic_menu',
                            handler: function(depth_2){
                                if(depth_2.menu===""){
                                    me.go_link(depth_2.value);
                                }
                            },
                            menu:subMenu_2
                        });



                        subMenu_1.add(depth_2);

                    }

                }


                if(!raid){ if(items[i].raw.children[j].id==="NFW2_system_basic_raid"){	continue;	}}//Raid menu hide.

                var depth_1 =  new Ext.menu.Item({
                    text: items[i].raw.children[j][lang],
                    value:items[i].raw.children[j].id,
                    cls: 'in_menu',
                    id:'in_menu_'+items[i].raw.children[j].id,
                    activeCls: 'in_menu_ov',
                    iconCls: 'ic_menu',
                    handler: function(depth_1){
                        if(depth_1.menu===""){
                            me.go_link(depth_1.value);
                        }
                    },
                    menu:subMenu_1
                });





                var _contain = Ext.getCmp('menu_in_'+menuid);
                if(_contain){
                    _contain.add(depth_1);

                }






            }

        }


    },

    onBtn_m_tk_fwClick: function(button, e, eOpts) {
        this.go_link("NFW2_trafficTracker_firewall");
    },

    onBtn_m_tk_httpClick: function(button, e, eOpts) {
        this.go_link("NFW2_trafficTracker_httpUrl");
    },

    onBtn_m_tk_appClick: function(button, e, eOpts) {
        this.go_link("NFW2_trafficTracker_ap");
    },

    onBtn_m_tk_ipsClick: function(button, e, eOpts) {
        this.go_link("NFW2_trafficTracker_ips");
    },

    onBtn_mn_alertRender1: function(component, eOpts) {
        var panel = component.up('panel');


        component.tooltip = Ext.create('Ext.tip.ToolTip', {
            target: component.getEl(),
            autoHide: false,
            anchor:'left',
            cls : 'left_light_box',
            shadow: false,
            border : 0,
            items : [
            {
                xtype : 'container',
                width : 300,
                height : 300,
                cls:'tip_box',
                html:'<div class="title">History<button class="icg_set" style="margin-left:210px" /></div><div class="cont">현재시간 : 2015-02-03 13:33:53</div><div class="list">12:30:35  IP object add (admin)</div><div class="list">12:30:35  IP object add (admin)</div>'
            }
            ]
        });


        component.setBadgeText('130');
    },

    onBtn_mn_alertClick1: function(button, e, eOpts) {
        button.tooltip.show();
    },

    go_dboard: function(button, e, eOpts) {
        Ext.getCmp('pnl_menu').collapse();
        Ext.getCmp('pnl_navi').hide();
        Ext.getCmp('sel_zen_license').hide();
        Ext.getCmp('pnl_cont').removeAll();


        Ext.getCmp('pnl_cont').add(Ext.create("NFW2.view.NFW2_dboard"));
    },

    onSel_zen_licenseChange: function(cycle, item, eOpts) {
        var me = this;

        if(item.hidden === true){
            var _idx = item.itemIndex+1;

            _idx = (_idx===7)?0:_idx;
            cycle.setActiveItem(_idx,true);
            return false;
        }

        go_zen_license(item.value,null);

    },

    onBtn_calendarClick1: function(button, e, eOpts) {


        button.tooltip.show();


    },

    onBtn_calendarRender11: function(component, eOpts) {
        //this.set_sitemap();

    },

    onBtn_sendpolicyClick: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_client');
        var _me = this;

        var btn_ca = Ext.getCmp('btn_calendar');

        //설정 권한이 없으면 정책 전송 안됨


        var vpn_param = {
            basename_list : Ext.encode(['vpn_ipsecsa','vpn_etc','ipsec_conf'])
        };

        if(me.clientInfo.perspectiveInfo === 5 ||  me.clientInfo.perspectiveInfo === 7){

            request_helper.xmlrpc_call_JsonP('ftuctrl',	'isChangedByList',vpn_param,
            function(response){

                var is_vpn = "";
                if(response === true){
                    is_vpn = '<br/><br/><input type="checkbox" id="chk_send_ipsec_init" checked /> IPSec VPN 초기화 수행';
                }else{
                    is_vpn = '<br/><br/><input type="checkbox" id="chk_send_ipsec_init" /> IPSec VPN 초기화 수행';
                }


                Ext.MessageBox.show({
                    title: __weguardia,
                    msg: get_msg("conf_send_policy")+is_vpn,
                    width:300,
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    fn: function(btn) {

                        if(btn === "yes"){

                            var is_vpn_checked = (document.getElementById('chk_send_ipsec_init').checked)?1:0;




                            if(Ext.getCmp('btn_calendar').plugins[0].text !== "on"){



                                _me.send_policy(is_vpn_checked);


                            }else{
                                request_helper.xmlrpc_call_JsonP('ftuctrl',	'getObject',{	basename : Ext.encode('system_reservation_policy')		},
                                function(response){
                                    if(response !== null){
                                        if(response.reservation.use === "on"){

                                            Ext.Msg.show({
                                                title: __weguardia,
                                                msg: '정책 전송이 예약되어 있습니다. <br /> 예약 전송을 취소하시면 정책 전송이 가능합니다.',
                                                width: 300,
                                                buttons: Ext.Msg.OK,
                                                icon: Ext.window.MessageBox.INFO
                                            });

                                            return false;

                                        }else{
                                            _me.send_policy(is_vpn_checked);

                                            btn_ca.setBadgeText('');
                                            btn_ca.rev_msg = '';

                                        }
                                    }
                                }
                                );
                            }
                        }
                    }

                });

            });


        }else{
            Ext.Msg.alert(__weguardia, '설정 권한이 없습니다.');
        }


    },

    onBtn_sendpolicyClick1: function(button, e, eOpts) {
        /*if(Ext.getCmp('NFW2_waitMsg') === undefined){

        Ext.Msg.alert(__weguardia, get_msg("msg_send_null"));
        }else{

        Ext.getCmp('NFW2_waitMsg').show();


        }*/

        var win = Ext.create('NFW2.view.NFW2_waitMsg');
        win.show();
    },

    onBtn_calendarClick: function(button, e, eOpts) {
        var msg = button.rev_msg;

        Ext.getCmp("cont_rev_tit").update(__zen('tit_reserv'));
        Ext.getCmp("cont_rev_msg").update(msg);

        button.tooltip.show();
    },

    onBtn_calendarRender1: function(component, eOpts) {
        var me = this;
        component.tooltip = Ext.create('Ext.tip.ToolTip', {
            target: component.getEl(),
            autoHide: false,
            anchor : 'bottom',
            cls : 'tip_box',
            shadow: false,
            border : 0,
            items : [
            {
                xtype: 'container',
                width : 200,
                height : 160,
                items: [

                {
                    xtype : 'container',
                    items: [
                    {
                        xtype: 'button',
                        cls: 'icg_set',
                        focusCls: 'btn_f',
                        style:'margin-left:170px',
                        handler: function(button, e) {
                            var win = Ext.create('NFW2.view.NFW2_send_reserv_policy');
                            win.show();

                        },
                    },
                    ]


                },


                {
                    xtype: 'label',
                    id:'cont_rev_tit',
                    cls:'title'
                },
                {
                    xtype : 'container',
                    id:'cont_rev_msg',
                    cls:'cont'

                }

                ]
            }
            ]
        });
    },

    onBtn_diffClick: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.NFW2_policy_change');
        win.show();
    },

    onBtn_m_logClick: function(button, e, eOpts) {
        var _me = Ext.getCmp('NFW2_client');
        var __auth = _me.clientInfo.perspectiveInfo;
        var stat = (__auth===2)?"dboard_log":"dboard";
        Ext.getCmp('pnl_navi').show();
        Ext.getCmp('pnl_menu').expand();
        go_zen_license('log',stat);
    },

    onBtn_m_monitorClick: function(button, e, eOpts) {
        Ext.getCmp('pnl_navi').show();
        Ext.getCmp('pnl_menu').expand();
        go_zen_license('monitor',"dboard");
    },

    onBtn_atozClick: function(button, e, eOpts) {
        Ext.getCmp('pnl_navi').show();
        Ext.getCmp('pnl_menu').expand();
        go_zen_license('atoz',"dboard");
    },

    onLog_buttonClick: function(button, e, eOpts) {

        Ext.MessageBox.confirm(__weguardia,get_msg("conf_logout"),function(btn){
            if(btn === "yes"){

                //  var me = this;
                var me = Ext.getCmp('NFW2_client');


                //   Ext.getCmp('pnl_dashboard').hide();

                //   Ext.getCmp('pnl_config').hide();

                var _params = {

                    session_id : Ext.encode(me.clientInfo.sessionInfo)
                };


                request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'logOut',
                _params,
                function(response){

                    console.log(response);

                    // Ext.getCmp('log_button').setText('로그인');

                    var _params = {

                        sid : Ext.encode(me.clientInfo.sessionInfo)
                    };

                    request_helper.xmlrpc_call_JsonP(
                    'FtDBMgr',
                    'session_ping',
                    _params,
                    function(response){

                    }
                    );


                }
                );



                clearInterval(Ext.getCmp('NFW2_client').session_interval);

                if(Ext.getCmp('alarm_timeout') !== undefined){
                    clearInterval(Ext.getCmp('alarm_timeout').interval);
                    clearInterval(Ext.getCmp('summary_timeout').interval);
                }

                window.location.reload();


                // Ext.state.Manager.clearAll();



            }
        });

    },

    onButtonClick1: function(button, e, eOpts) {
        this.set_favMenu();
    },

    onB_trg_monitorClick1: function(button, e, eOpts) {
        if(button.g_link === undefined){return false;}
        this.go_link(button.g_link);
    },

    onB_trg_logClick: function(button, e, eOpts) {
        if(button.g_link === undefined){return false;}
        this.go_link(button.g_link);
    },

    onB_trg_monitorClick: function(button, e, eOpts) {
        if(button.g_link === undefined){return false;}
        this.go_link(button.g_link);
    },

    onB_trg_logClick1: function(button, e, eOpts) {
        if(button.g_link === undefined){return false;}
        this.go_link(button.g_link);
    },

    onB_trg_logClick11: function(button, e, eOpts) {
        if(button.g_link === undefined){return false;}
        this.go_link(button.g_link);
    },

    onComboboxChange: function(field, newValue, oldValue, eOpts) {
        if(newValue===null) return false;
        field.setValue('');
        this.go_link(newValue);
    },

    onMainViewAfterRender: function(component, eOpts) {
        var _me = this;
        var me = Ext.getCmp('NFW2_client');

        Ext.getCmp('pnl_cont').removeAll();
        Ext.getCmp('sel_zen_license').hide();

        // CC확인
        request_helper.xmlrpc_call_JsonP(
        'ftuctrl',
        'isCC',
        {},
        function(response){

            if(response){
                me.isCC = true;
            }else{
                me.isCC = false;
            }
        }

        );

        // 접속 아이피 설정
        Ext.Ajax.request({
            url : '/getRemoteAddress',
            method : 'POST',
            success : function(response, opts){

                me.clientInfo.clientIp = Ext.decode(response.responseText).remoteAddress;

                me.clientInfo.hostIp = Ext.decode(response.responseText).hostAddress;

            }
        });



        // 개발 버전에서 세션 체크 용도로 사용됨 개발이 완료되면 세션 처리는 삭제되어야함
        // 배포 버전에서는 NFW2.util에 _do_request 함수에서 처리하도록 변경됨
        var _params = {

            sid : Ext.encode(me.clientInfo.sessionInfo)
        };

        request_helper.xmlrpc_call_JsonP(
        'FtDBMgr',
        'session_ping',
        _params,
        function(response){
            console.log('session_ping==',response);
        }
        );

    },

    onMainViewBeforeRender: function(component, eOpts) {
        var me = this;
        me.set_zenLicense();
    },

    onNFW2_clientResize: function(component, width, height, oldWidth, oldHeight, eOpts) {
        //console.log("resize",Ext.getCmp('NFW2_login'));
        if(Ext.getCmp('NFW2_login')!== undefined){
            Ext.getCmp('NFW2_login').setWidth('100%');
        }
    }

});
