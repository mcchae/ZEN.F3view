
Ext.define('NFW2.view.NFW2_dboardViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.nfw2_dboard',

    set_go_zen_license: function(license) {
        Ext.getCmp('pnl_navi').show();
        Ext.getCmp('pnl_menu').expand();

        go_zen_license(license,"dboard");
    },

    chg_lang_cls: function() {
        var _me = Ext.getCmp('NFW2_client');
        var lang = _me.lang;

        if(lang==="en"){
        Ext.getCmp('d_license_fw').addCls('d_license_fw_en');
        Ext.getCmp('d_license_av').addCls('d_license_av_en');
        Ext.getCmp('d_license_as').addCls('d_license_as_en');
        Ext.getCmp('d_license_tracker').addCls('d_license_tracker_en');


        Ext.getCmp('btn_license_re').addCls('btn_license_re_en');
        }else if(lang ==="jp"){

        Ext.getCmp('d_license_fw').addCls('d_license_fw_jp');
        Ext.getCmp('d_license_av').addCls('d_license_av_jp');
        Ext.getCmp('d_license_as').addCls('d_license_as_jp');
        Ext.getCmp('d_license_tracker').addCls('d_license_tracker_jp');

        Ext.getCmp('btn_license_re').addCls('btn_license_re_jp');
        }
        Ext.getCmp('tbl_sum_header').update({now:__zen('current'),max:__zen('max')});


    },

    temp_set_license: function() {
        var me = Ext.getCmp('NFW2_client');
        var _me = this;


        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_license_info',
            {},
            function(response){

                console.log("New license (main view set_zenlicense) mj",response);

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


                _me.get_license_period();
                _me.get_license_status(0);


                me.get_combo_map();
                me.set_sitemap();
                hideLicenseBtn();

                adminAlarmRefresh();



                console.log("mj",me.zenLicense);

        });

    },

    get_license_status: function(mode) {
        var client = Ext.getCmp('NFW2_client');
        var zenLicense = client.zenLicense;
        var auth = client.clientInfo.perspectiveInfo;



        console.log("All setting ",auth,zenLicense.flag,zenLicense);



        if(zenLicense.flag === '1' || zenLicense.flag === '4'){

            load_license_state("fw");
            load_license_state("ips");
            load_license_state("ipsec");
            load_license_state("ssl");
            load_license_state("av");
            load_license_state("as");
            load_license_state("tracker");

        }else{

            load_license_state_off("fw");
            load_license_state_off("ips");
            load_license_state_off("ipsec");
            load_license_state_off("ssl");
            load_license_state_off("av");
            load_license_state_off("as");
            load_license_state_off("tracker");

        }


        var state = (auth < 5)?true:false;


        if(zenLicense.flag==='15'){
            Ext.ComponentQuery.query('toggleslide[cls="custom-color"]').forEach(function(e){ e.setDisabled(true); });
            Ext.ComponentQuery.query('button[itemId="confirm_license"]').forEach(function(e){ e.setDisabled(state); });
            Ext.getCmp('btn_license_temp').setDisabled(state);


        }else{

            load_license_set_off(state,"fw");
            load_license_set_off(state,"ips");
            load_license_set_off(state,"ipsec");
            load_license_set_off(state,"ssl");
            load_license_set_off(state,"av");
            load_license_set_off(state,"as");
            load_license_set_off(state,"tracker");

            Ext.ComponentQuery.query('button[itemId="confirm_license"]').forEach(function(e){ e.setDisabled(state); });
            Ext.getCmp('btn_license_temp').setDisabled(state);
        }



        if(auth===2){
            Ext.getCmp('pnl_dboard_block').disable();
        }


        function load_license_state(id){

            if(zenLicense[id] !== "none"){

                if(zenLicense[id] !== "on"){
                    Ext.getCmp('btn_dboard_lic_'+id).state = false;
                    Ext.getCmp('btn_dboard_lic_'+id).moveHandle(false);
                    if(id!=="fw"){
                        Ext.getCmp('d_license_'+id).disable();
                    }
                }else{
                     Ext.getCmp('d_license_'+id).setDisabled(false);
                }

            }else{

                Ext.getCmp('lb_dboard_lic_'+id).setText("None");
                Ext.getCmp('btn_dboard_lic_'+id).state = false;
                Ext.getCmp('btn_dboard_lic_'+id).moveHandle(false);
                Ext.getCmp('btn_dboard_lic_'+id).disable();
                Ext.getCmp('d_license_'+id).disable();
                Ext.getCmp('lb_dboard_lic_'+id).addCls("lb_license_off");
            }
        }


        function load_license_state_off(id){

            Ext.getCmp('btn_dboard_lic_'+id).disable();
            Ext.getCmp('d_license_'+id).disable();

        }

        function load_license_set_off(_state, id){

             if(zenLicense[id] !== "none"){
                Ext.getCmp('btn_dboard_lic_'+id).setDisabled(_state);
            }else{
                Ext.getCmp('btn_dboard_lic_'+id).disable();
            }

        }


    },

    get_license_period: function() {
        var client = Ext.getCmp('NFW2_client');
        var zenLicense = client.zenLicense;


        var today_unixTime = getTodayUnixTime();

        var str_status = __zen('status') + " : ";

        var lb_info_msg = "";

        if(zenLicense.flag === "0"){

            lb_info_msg = str_status+'None';

        }else if(zenLicense.flag === "1"){

            lb_info_msg = str_status+ __zen('form');

        }else if(zenLicense.flag === "2"){

            lb_info_msg = str_status+ __zen('expire');

        }else if(zenLicense.flag === "4"){

            lb_info_msg = str_status+ __zen('demo');

        }else if(zenLicense.flag === "15"){

            lb_info_msg = str_status+'None';

            Ext.getCmp('btn_license_temp').show();

        }

        Ext.getCmp('lb_license_info').setText(lb_info_msg);

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_license_info',
            {},
            function(response){

                if(zenLicense.flag === '1' || zenLicense.flag === '4'){
                    load_period_set("fw",response.period.fw);
                    load_period_set("ips",response.period.ips);
                    load_period_set("ipsec",response.period.ipsec);
                    load_period_set("ssl",response.period.ssl);
                    load_period_set("av",response.period.av);
                    load_period_set("as",response.period.as);
                    load_period_set("tracker",response.period.tracker);
                }



            }

        );
        function load_period_set(id,period){


             Ext.getCmp('lb_dboard_lic_'+id).setText(unixTimeConvert(period[0],'YMD')+"~"+unixTimeConvert(period[1],'YMD'));

                //유효기간 마지막 날보다 오늘이 클 경우 disable
                if(period[1] < today_unixTime){
                    Ext.getCmp('btn_dboard_lic_'+id).disable();
                    Ext.getCmp('d_license_'+id).disable();
                }

        }

    },

    get_hardwarekey: function() {
        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_system_hardware_initkey',
            {},
            function(response){

                Ext.getCmp('fd_hardware_license').setValue(response);

            }
        );

    },

    set_license_info: function(id, state) {


        var me = Ext.getCmp('NFW2_client');

        var _data = {};

        var modules = {
            'fw':(me.zenLicense['fw']==="on")?"on":"off",
            'ipsec':(me.zenLicense['ipsec']==="on")?"on":"off",
            'ssl':(me.zenLicense['ssl']==="on")?"on":"off",
            'ips':(me.zenLicense['ips']==="on")?"on":"off",
            'ddos':(me.zenLicense['ddos']==="on")?"on":"off",
            'as':(me.zenLicense['as']==="on")?"on":"off",
            'av':(me.zenLicense['av']==="on")?"on":"off",
            'tracker':(me.zenLicense['tracker']==="on")?"on":"off"
        };

        switch(id){
            case "fw":
                modules.fw = (state === true)?"on":"off";
                me.zenLicense['fw'] = (state === true)?"on":"off";
                break;
            case "ips":
                modules.ips = (state === true)?"on":"off";
                me.zenLicense['ips'] = (state === true)?"on":"off";
                Ext.getCmp('d_license_ips').setDisabled((state !== true));
                break;
            case "ipsec":
                modules.ipsec = (state === true)?"on":"off";
                me.zenLicense['ipsec'] = (state === true)?"on":"off";
                Ext.getCmp('d_license_ipsec').setDisabled((state !== true));
                break;
            case "ssl":
                modules.ssl = (state === true)?"on":"off";
                me.zenLicense['ssl'] = (state === true)?"on":"off";
                Ext.getCmp('d_license_ssl').setDisabled((state !== true));
                break;
            case "ddos":
                modules.ddos = (state === true)?"on":"off";
                me.zenLicense['ddos'] = (state === true)?"on":"off";
                break;
            case "av":
                modules.av = (state === true)?"on":"off";
                me.zenLicense['av'] = (state === true)?"on":"off";
                Ext.getCmp('d_license_av').setDisabled((state !== true));
                break;
            case "as":
                modules.as = (state === true)?"on":"off";
                me.zenLicense['as'] = (state === true)?"on":"off";
                Ext.getCmp('d_license_as').setDisabled((state !== true));
                break;
            case "tracker":
                modules.tracker = (state === true)?"on":"off";
                me.zenLicense['tracker'] = (state === true)?"on":"off";
                Ext.getCmp('d_license_tracker').setDisabled((state !== true));
                break;


        }


        _data.modules = modules;

        console.log(_data);

        var _params = {
            basename : Ext.encode('system_modules'),
            obj : Ext.encode(_data)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObject',
            _params,
            function(response){

                console.log(response);

            }
        );



        hideLicenseBtn();
        me.get_combo_map();
        Ext.getCmp('btn_sitemap').tooltip.destroy();
        me.set_sitemap();

    },

    onButtonClick111: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_dboard_set');
        win.show();
    },

    onButtonClick3: function(button, e, eOpts) {
        this.set_go_zen_license('fw');
        //this.setPnlLicense('fw');
    },

    onButtonClick2: function(button, e, eOpts) {
        //this.chg_dboard('fw');
        this.set_go_zen_license('fw');
    },

    onButtonChange: function(button, state) {
        this.set_license_info('fw',state);
    },

    onBtn_dboard_lic_fwBeforeChange: function(button) {
        return confirm(get_msg("conf_license"));
    },

    onButtonClick25: function(button, e, eOpts) {
        //this.chg_dboard('ips');
        this.set_go_zen_license('ips');
    },

    onButtonChange1: function(button, state) {
        this.set_license_info('ips',state);
    },

    onBtn_dboard_lic_ipsBeforeChange: function(button) {
        return confirm(get_msg("conf_license"));
    },

    onButtonClick23: function(button, e, eOpts) {
        //this.chg_dboard('ipsec');
        this.set_go_zen_license('ipsec');
    },

    onButtonChange111: function(button, state) {
        this.set_license_info('ipsec',state);
    },

    onBtn_dboard_lic_ipsecBeforeChange: function(button) {
        return confirm(get_msg("conf_license"));
    },

    onButtonClick22: function(button, e, eOpts) {
        //this.chg_dboard('ssl');
        this.set_go_zen_license('ssl');
    },

    onButtonChange1111: function(button, state) {
        this.set_license_info('ssl',state);
    },

    onBtn_dboard_lic_sslBeforeChange: function(button) {
        return confirm(get_msg("conf_license"));
    },

    onButtonClick21: function(button, e, eOpts) {
        //this.chg_dboard('av');
        this.set_go_zen_license('av');
    },

    onButtonChange11111: function(button, state) {
        this.set_license_info('av',state);
    },

    onBtn_dboard_lic_avBeforeChange: function(button) {
        return confirm(get_msg("conf_license"));
    },

    onButtonClick211: function(button, e, eOpts) {
        //this.chg_dboard('as');
        this.set_go_zen_license('as');
    },

    onButtonChange111111: function(button, state) {
        console.log(state);

        this.set_license_info('as',state);
    },

    onBtn_dboard_lic_asBeforeChange: function(button) {
        return confirm(get_msg("conf_license"));
    },

    onButtonClick2111: function(button, e, eOpts) {
        //this.chg_dboard('as');
        this.set_go_zen_license('tracker');
    },

    onButtonChange1111111: function(button, state) {
        this.set_license_info('tracker',state);
    },

    onBtn_dboard_lic_trackerBeforeChange: function(button, state) {
        return confirm(get_msg("conf_license"));
        /* Ext.MessageBox.confirm(__weguardia,get_msg("conf_license"),function(btn){
        if(btn === "yes"){
        return true;
        }  else{
        return false;
        }
        });*/
    },

    onButtonClick10: function(button, e, eOpts) {
        Ext.getCmp('cont_license_re').show();
    },

    onBtn_license_tempClick: function(button, e, eOpts) {
        var me = this;

        var loadingText = get_msg('licenseMsg');

        Ext.getBody().mask(loadingText);

        var str_status = __zen('status') + " : ";





        request_helper.xmlrpc_call_JsonP(
        'ftuctrl',
        'mod_init_temp_license',
        {},
        function(response){

            Ext.getBody().unmask();

            if(response){



                Ext.getCmp('btn_license_temp').hide();

                me.temp_set_license();

                /*
                request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'get_license_info',
                {},
                function(response){



                //상태
                if(response.flag === "0"){

                    Ext.getCmp('lb_license_info').setText(str_status+'None');

                }else if(response.flag === "1"){

                    Ext.getCmp('lb_license_info').setText(str_status+ __zen('form'));

                }else if(response.flag === "2"){

                    Ext.getCmp('lb_license_info').setText(str_status+ __zen('expire'));

                }else if(response.flag === "4"){

                    Ext.getCmp('lb_license_info').setText(str_status+ __zen('demo'));

                }else if(response.flag === "15"){

                    Ext.getCmp('lb_license_info').setText(str_status+'None');

                    Ext.getCmp('btn_license_temp').show();

                }

                //상태가 정식 || 만료 일 경우에만 화면에 표시
                if(response.flag === '1' || response.flag === '4'){

                    //    Ext.suspendLayouts();


                    if(response.module.fw !== null){
                        if(response.module.fw!=="on"){
                            Ext.getCmp('btn_dboard_lic_fw').toggle();
                        }

                        Ext.getCmp('lb_dboard_lic_fw').setText(unixTimeConvert(response.period.fw[0],'YMD')+"~"+unixTimeConvert(response.period.fw[1],'YMD'));

                        Ext.getCmp('d_fw').show();
                    }

                    if(response.module.ipsec !== null){

                        if(response.module.ipsec!=="on"){
                            Ext.getCmp('btn_dboard_lic_ipsec').toggle();
                        }

                        Ext.getCmp('lb_dboard_lic_ipsec').setText(unixTimeConvert(response.period.ipsec[0],'YMD')+"~"+unixTimeConvert(response.period.ipsec[1],'YMD'));

                        Ext.getCmp('d_ipsec').show();
                    }

                    if(response.module.ssl !== null){

                        if(response.module.ssl!=="on"){
                            Ext.getCmp('btn_dboard_lic_ssl').toggle();
                        }


                        Ext.getCmp('lb_dboard_lic_ssl').setText(unixTimeConvert(response.period.ssl[0],'YMD')+"~"+unixTimeConvert(response.period.ssl[1],'YMD'));

                        Ext.getCmp('d_ssl').show();
                    }

                    if(response.module.ips !== null){

                        if(response.module.ips!=="on"){
                            Ext.getCmp('btn_dboard_lic_ips').toggle();
                        }

                        Ext.getCmp('lb_dboard_lic_ips').setText(unixTimeConvert(response.period.ips[0],'YMD')+"~"+unixTimeConvert(response.period.ips[1],'YMD'));

                        Ext.getCmp('d_ips').show();
                    }

                    if(response.module.av !== null){

                        if(response.module.av!=="on"){
                            Ext.getCmp('btn_dboard_lic_av').toggle();
                        }

                        Ext.getCmp('lb_dboard_lic_av').setText(unixTimeConvert(response.period.av[0],'YMD')+"~"+unixTimeConvert(response.period.av[1],'YMD'));

                        Ext.getCmp('d_av').show();
                    }

                    if(response.module.as !== null){

                        if(response.module.as!=="on"){
                            Ext.getCmp('btn_dboard_lic_as').toggle();
                        }

                        Ext.getCmp('lb_dboard_lic_as').setText(unixTimeConvert(response.period.as[0],'YMD')+"~"+unixTimeConvert(response.period.as[1],'YMD'));

                        Ext.getCmp('d_as').show();
                    }


                }



            }

            );

            */

        }else{

            var _msg = response;

            Ext.getCmp('lb_license_info').setText(_msg.toString());

        }

    }
    );


    },

    onButtonClick9: function(button, e, eOpts) {
        var me = this;

        var loadingText = get_msg('licenseInitMsg');

        Ext.getBody().mask(loadingText);


        if(Ext.getCmp('ft_license_key').getValue() !== ""){

            var _params = {
                init_key : Ext.encode(Ext.getCmp('ft_license_key').getValue())
            };

        }else{

            var _params = {};
        }

        var str_status = __zen('status') + " : ";

        request_helper.xmlrpc_call_JsonP(
        'ftuctrl',
        'mod_init_license',
        _params,
        function(response){

            Ext.MessageBox.alert(__weguardia,get_msg('msg_license_ok'));

            Ext.getBody().unmask();
            Ext.getCmp('btn_license_temp').hide();


            if(response){

                me.temp_set_license();
                /*
                request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'get_license_info',
                {},
                function(response){

                //상태
                if(response.flag === "0"){

                    Ext.getCmp('lb_license_info').setText(str_status+'None');

                }else if(response.flag === "1"){

                    Ext.getCmp('lb_license_info').setText(str_status+ __zen('form'));

                }else if(response.flag === "2"){

                    Ext.getCmp('lb_license_info').setText(str_status+ __zen('expire'));

                }else if(response.flag === "4"){

                    Ext.getCmp('lb_license_info').setText(str_status+ __zen('demo'));

                }else if(response.flag === "15"){

                    Ext.getCmp('lb_license_info').setText(str_status+'None');
                }

                Ext.getCmp('cont_license_re').hide();

                //상태가 정식 || 만료 일 경우에만 화면에 표시
                if(response.flag === '1' || response.flag === '4'){

                    // Ext.suspendLayouts();


                    if(response.module.fw !== null){

                        if(response.module.fw!=="on"){
                            Ext.getCmp('btn_dboard_lic_fw').toggle();
                        }

                        Ext.getCmp('lb_dboard_lic_fw').setText(unixTimeConvert(response.period.fw[0],'YMD')+"~"+unixTimeConvert(response.period.fw[1],'YMD'));

                        Ext.getCmp('d_fw').show();
                    }

                    if(response.module.ipsec !== null){

                        if(response.module.ipsec!=="on"){
                            Ext.getCmp('btn_dboard_lic_ipsec').toggle();
                        }

                        Ext.getCmp('lb_dboard_lic_ipsec').setText(unixTimeConvert(response.period.ipsec[0],'YMD')+"~"+unixTimeConvert(response.period.ipsec[1],'YMD'));

                        Ext.getCmp('d_ipsec').show();
                    }

                    if(response.module.ssl !== null){

                        if(response.module.ssl!=="on"){
                            Ext.getCmp('btn_dboard_lic_ssl').toggle();
                        }

                        Ext.getCmp('lb_dboard_lic_ssl').setText(unixTimeConvert(response.period.ssl[0],'YMD')+"~"+unixTimeConvert(response.period.ssl[1],'YMD'));

                        Ext.getCmp('d_ssl').show();
                    }

                    if(response.module.ips !== null){

                        if(response.module.ips!=="on"){
                            Ext.getCmp('btn_dboard_lic_ips').toggle();
                        }

                        Ext.getCmp('lb_dboard_lic_ips').setText(unixTimeConvert(response.period.ips[0],'YMD')+"~"+unixTimeConvert(response.period.ips[1],'YMD'));

                        Ext.getCmp('d_ips').show();
                    }

                    if(response.module.av !== null){

                        if(response.module.av!=="on"){
                            Ext.getCmp('btn_dboard_lic_av').toggle();
                        }
                        Ext.getCmp('lb_dboard_lic_av').setText(unixTimeConvert(response.period.av[0],'YMD')+"~"+unixTimeConvert(response.period.av[1],'YMD'));

                        Ext.getCmp('d_av').show();
                    }

                    if(response.module.as !== null){

                        if(response.module.as!=="on"){
                            Ext.getCmp('btn_dboard_lic_as').toggle();
                        }

                        Ext.getCmp('lb_dboard_lic_as').setText(unixTimeConvert(response.period.as[0],'YMD')+"~"+unixTimeConvert(response.period.as[1],'YMD'));

                        Ext.getCmp('d_as').show();
                    }

                    //   Ext.resumeLayouts(true);

                }else{

                    //  Ext.suspendLayouts();

                    Ext.getCmp('d_fw').hide();


                    Ext.getCmp('d_ipsec').hide();


                    Ext.getCmp('d_ssl').hide();


                    Ext.getCmp('d_ips').hide();


                    Ext.getCmp('d_av').hide();


                    Ext.getCmp('d_as').hide();


                    //  Ext.getCmp('cont_tracker').hide();

                    //  Ext.resumeLayouts(true);
                }
            }

            );*/


        }else{

            var _msg = response;

            Ext.getCmp('lb_license_info').setText(_msg.toString());

            Ext.getCmp('cont_license_re').hide();
        }

    }
    );


    },

    onButtonClick8: function(button, e, eOpts) {
        Ext.getCmp('cont_license_re').hide();
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        Ext.getCmp('NFW2_dboard').get_quickdata();

        me.chg_lang_cls();
        me.get_hardwarekey();
        me.get_license_period();
        me.get_license_status(0);

        me.getViewModel().setData({
            status: __zen('status'),
            form: __zen('form'),
            demo: __zen('demo_license'),
            key_hardware: __zen('key_hardware'),
            key_license: __zen('key_license'),
            confirm: __zen('confirm'),
            cancel: __zen('cancel'),

        });

    },

    onNFW2_dboardBeforeDestroy: function(component, eOpts) {
        clearInterval(Ext.getCmp('alarm_timeout').interval);
        clearInterval(Ext.getCmp('summary_timeout').interval);
    }

});
