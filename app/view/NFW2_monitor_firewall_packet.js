
Ext.define('NFW2.view.NFW2_monitor_firewall_packet', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_firewall_packet',

    requires: [
        'NFW2.view.NFW2_monitor_firewall_packetViewModel',
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.button.Segmented'
    ],

    viewModel: {
        type: 'nfw2_monitor_firewall_packet'
    },
    cls: 'zen_body',
    id: 'monitor_packet',
    minWidth: 1400,
    scrollable: true,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            minWidth: 1400,
            items: [
                {
                    xtype: 'container',
                    id: 'con_top',
                    items: [
                        {
                            xtype: 'container',
                            cls: 'dv_monitor',
                            items: [
                                {
                                    xtype: 'toggleslide',
                                    resizeHandle: false,
                                    state: false,
                                    cls: 'custem-color-monitor',
                                    id: 'chk_btn',
                                    text: 'MyButton',
                                    listeners: {
                                        change: 'onChk_btnChange'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'con_input',
                            margin: '5 0 0 0',
                            listeners: {
                                afterrender: 'onCon_inputAfterRender',
                                render: 'onCon_inputRender'
                            }
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    margin: '5 0 0 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 5',
                                            bind: {
                                                text: '{searchable_list}'
                                            },
                                            listeners: {
                                                render: 'onButtonRender',
                                                click: 'onButtonClick2'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 5',
                                            bind: {
                                                text: '{session_block}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick5'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 5',
                                            iconCls: 'icb_del',
                                            bind: {
                                                text: '{del_session}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick4'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    margin: '5 0 0 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        pack: 'end'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: 'errorBox',
                                            hidden: true,
                                            id: 'err_msg',
                                            itemId: 'err_msg'
                                        },
                                        {
                                            xtype: 'segmentedbutton',
                                            cls: 'zen_seg',
                                            id: 'show_mode',
                                            margin: '0 0 0 5',
                                            items: [
                                                {
                                                    enableToggle: true,
                                                    iconCls: 'icg_s_view',
                                                    pressed: true,
                                                    value: 1,
                                                    bind: {
                                                        tooltip: '{simple_view}'
                                                    }
                                                },
                                                {
                                                    allowDepress: false,
                                                    enableToggle: true,
                                                    iconCls: 'icg_a_view',
                                                    value: 2,
                                                    bind: {
                                                        tooltip: '{all_view}'
                                                    }
                                                }
                                            ],
                                            listeners: {
                                                toggle: 'onShow_modeToggle'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 10',
                                            iconCls: 'icb_export',
                                            listeners: {
                                                click: 'onButtonClick1'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 10',
                                            iconCls: 'icb_filter',
                                            text: '',
                                            listeners: {
                                                click: 'onButtonClick',
                                                beforerender: 'onButtonBeforeRender'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 10',
                                            iconCls: 'icb_filter_x',
                                            bind: {
                                                text: '{filter_reset}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick3'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    id: 'con_grid',
                    margin: '10 0 0 0',
                    width: '100%'
                },
                {
                    xtype: 'container',
                    id: 'con_body',
                    scrollable: true,
                    width: '100%'
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPanelAfterRender',
        beforedestroy: 'onNFW2_logBeforeDestroy'
    },

    onChk_btnChange: function(button, mode) {
        var me = this;
        var mode = Ext.getCmp("show_mode").getValue();
        me.set_height();

        if(button.state === true){

            var s_list = [];
            var listelement = $(".tagedit-listelement-old");
            for(var i=0; i<listelement.length; i++){
                s_list.push($(listelement[i]).find(':hidden').val());
            }

            var id_type = '0', id = '0', b_sip = '0.0.0.0', m_sip = '255.255.255.255', b_dip = '0.0.0.0', m_dip = '255.255.255.255',
                proto = '0', b_sport = '0', m_sport = '65535', b_dport = '0', m_dport = '65535', action = '-1';

            if(me.apply_filter === true){
                var _se = log_query(s_list)[0];
                for(var i=0; i<_se.length; i++){
                    for(var l in _se[i]){
                        if(l === 'id_type'){
                            id_type = _se[i][l];
                        }else if(l === 'id'){
                            id = _se[i][l];
                        }else if(l === 'sip'){
                            var _sip = _se[i][l].split('-');
                            b_sip = (_sip.length===2)?_sip[0]:_se[i][l];
                            m_sip = (_sip.length===2)?_sip[1]:_se[i][l];
                        }else if(l === 'dip'){
                            var _dip = _se[i][l].split('-');
                            b_dip = (_dip.length===2)?_dip[0]:_se[i][l];
                            m_dip = (_dip.length===2)?_dip[1]:_se[i][l];
                        }else if(l === 'protocol'){
                            proto = _se[i][l];
                        }else if(l === 'sport'){
                            var _sport = _se[i][l].split('-');
                            var b_sport = (_sport.length===2)?_sport[0]:_se[i][l];
                            var m_sport = (_sport.length===2)?_sport[1]:_se[i][l];
                        }else if(l === 'dport'){
                            var _dport = _se[i][l].split('-');
                            var b_dport = (_dport.length===2)?_dport[0]:_se[i][l];
                            var m_dport = (_dport.length===2)?_dport[1]:_se[i][l];
                        }else if(l === 'action'){
                            action = _se[i][l];
                        }
                    }
                }
            }

            var _params = {
                func_name: Ext.encode('set_rpm_info'),
                args: Ext.encode({
                    'id_type': id_type,
                    'id': id,
                    'b_sip': b_sip,
                    'm_sip': m_sip,
                    'b_dip': b_dip,
                    'm_dip': m_dip,
                    'proto': proto,
                    'b_sport': b_sport,
                    'm_sport': m_sport,
                    'b_dport': b_dport,
                    'm_dport': m_dport,
                    'action': action,
                })
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'execKctrlFunc',
                _params,
                function(response){

                    if(mode === 1){
                        $("._dis").hide();
                        $("._in").html(__zen('rule_id'));
                    }else{
                        $("._dis").show();
                        $("._in").html(__zen('nat_policy_id'));
                    }
                    me._re = [];
                    me._update = true;
                    me.get_monitor_packet();
                }
            );

        }else{
            clearTimeout(me.interval);
            me._update = false;
            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'execKctrlFunc',
                {
                    func_name: Ext.encode('unset_rpm_info'),
                    args: Ext.encode({})
                },
                function(response){

                }
            );
        }
    },

    onCon_inputAfterRender: function(component, eOpts) {
        component.update('<table width="100%" cellpadding="0" cellspacing="0" class="x-grid-item"><tr><td width="125" class="x-field x-form-item-label x-form-item-label-default">'+__zen('search_word')+'</td><td><input type="text" name="_tag[]" id="ty" value="" class="_tag"/></td></tr></table>');
    },

    onCon_inputRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            setTimeout(function(){
                Ext.getCmp("monitor_packet").set_height();
            },100);
        }, component);
    },

    onButtonRender: function(component, eOpts) {
        component.tooltip = Ext.create('Ext.tip.ToolTip', {
            target: component.getEl(),
            autoHide: false,
            anchor:'left',
            id: '_tooltip',
            cls : 'left_light_box',
            shadow: false,
            border : 0,
            items : [
                {
                    xtype : 'container',
                    width : 150,
                    cls:'tip_box',
                    html : '<div class="title">'+__zen('searchable_list')+'</div>'+
                    '<div class="list" onclick=log_help(this)>'+__zen('src')+'</div>'+
                    '<div class="list" onclick=log_help(this)>'+__zen('src_port')+'</div>'+
                    '<div class="list" onclick=log_help(this)>'+__zen('dest')+'</div>'+
                    '<div class="list" onclick=log_help(this)>'+__zen('dest_port')+'</div>'+
                    '<div class="list" onclick=log_help(this)>'+__zen('protocol')+'</div>'+
                    '<div class="list" onclick=log_help(this)>'+__zen('id_type')+'</div>'+
                    '<div class="list" onclick=log_help(this)>'+__zen('rule_id')+'</div>'+
                    '<div class="list" onclick=log_help(this)>'+__zen('action')+'</div>'
                }
            ]
        });
    },

    onButtonClick2: function(button, e, eOpts) {
        Ext.getCmp('_tooltip').show();
    },

    onButtonClick5: function(button, e, eOpts) {
        var me = Ext.getCmp("monitor_packet");

        var chk = $(".cell_check_true");

        if(Ext.getCmp("chk_btn").state){
            Ext.getCmp("chk_btn").toggle();
        }

        if(chk.length === 0){
            Ext.Msg.alert(__weguardia,ValidSelect(__zen('log'),1));
        }else{
            if(chk.length > 1){
                var _num = [];
                for(var i=0; i<chk.length; i++){
                    _num.push($(chk[0])[0].parentNode.nextSibling.textContent);
                }
                Ext.MessageBox.alert(__weguardia,get_msg('err_packet_sel')+'('+_num.join(',')+')');
            }else{
                Ext.MessageBox.confirm(__weguardia,get_msg("conf_block"),function(btn){
                    if(btn === "yes"){
                        var _val = $(chk[0])[0].previousSibling.value;
                        var a_val = _val.split(',');

                        var list = {
                            'proto':getProtocolNametoCode(a_val[4]),
                            'sip':a_val[0],
                            'dip':a_val[2],
                            'sport':a_val[5],
                            'dport':a_val[7]
                        };

                        var _params = {
                            func_name: Ext.encode('block_session'),
                            args: Ext.encode(list)
                        };

                        request_helper.xmlrpc_call_JsonP(
                            'ftuctrl',
                            'execKctrlFunc',
                            _params,
                            function(response){
                                Ext.Msg.alert(__weguardia,get_msg('msg_log_block'));
                            }
                        );

                    }
                });
            }
        }
    },

    onButtonClick4: function(button, e, eOpts) {
        var me = Ext.getCmp("monitor_packet");

        var chk = $(".cell_check_true");

        if(Ext.getCmp("chk_btn").state){
            Ext.getCmp("chk_btn").toggle();
        }

        if(chk.length === 0){
            Ext.Msg.alert(__weguardia,ValidSelect(__zen('log'),1));
        }else{
            if(chk.length > 1){
                var _num = [];
                for(var i=0; i<chk.length; i++){
                    _num.push($(chk[0])[0].parentNode.nextSibling.textContent);
                }
                Ext.MessageBox.alert(__weguardia,get_msg('err_packet_sel')+'('+_num.join(',')+')');
            }else{
                Ext.MessageBox.confirm(__weguardia,get_msg("conf_del"),function(btn){
                    if(btn === "yes"){
                        var _val = $(chk[0])[0].previousSibling.value;
                        var a_val = _val.split(',');

                        var list = [{
                            'protocol_num':getProtocolNametoCode(a_val[4]),
                            'src':a_val[0],
                            'dst':a_val[2],
                            'sport':a_val[5],
                            'dport':a_val[7]
                        }];

                        var obj = {
                            'family_proto': 'ipv4',
                            'del_sesslist': list
                        };

                        var _params = {
                            func_name: Ext.encode('drop_session_list'),
                            args: Ext.encode(obj)
                        };

                        request_helper.xmlrpc_call_JsonP(
                            'ftuctrl',
                            'execKctrlFunc',
                            _params,
                            function(response){
                                Ext.Msg.alert(__weguardia,get_msg('msg_log_del'));
                            }
                        );

                    }
                });
            }
        }
    },

    onShow_modeToggle: function(segmentedbutton, button, isPressed, eOpts) {
        var me = this;

        var _re = me._re;
        var mode = Ext.getCmp("show_mode").getValue();
        var _dis = (mode===1)?"display:none":"";
        var cmax = 20000;

        var w_interface = (mode===1)?'10%':'6%';
        var w_length = (mode===1)?'10%':'3%';
        var w_src = (mode===1)?'15%':'11%';
        var w_dest = (mode===1)?'15%':'11%';
        var w_protocol = (mode===1)?'10%':'5%';
        var w_xsrc = (mode===1)?'10%':'11%';
        var w_xdest = (mode===1)?'10%':'11%';
        var w_action = (mode===1)?'10%':'4%';
        var w_rule_id = (mode===1)?'10%':'5%';
        var w_timeout = (mode===1)?'10%':'5%';
        var w_data = (mode===1)?'10%':'11%';

        var _n = 0;

        var list =	'<table cellspacing="0" cellpadding="3" style="height:30px;width:100%">'+
            '<tr><td class="x-column-header" width="30px" style="position:static;border-bottom:1px solid #ced9e3;"></td>'+
            '<td class="x-column-header" style="width:70px;position:static;border-bottom:1px solid #ced9e3;">N</td>'+
            '<td class="x-column-header" style="width:'+w_interface+';position:static;border-bottom:1px solid #ced9e3;">'+__zen('inter')+'</td>'+
            '<td class="x-column-header" style="width:'+w_length+';position:static;border-bottom:1px solid #ced9e3;">'+__zen('length')+'</td>'+
            '<td class="x-column-header" style="width:'+w_src+';position:static;border-bottom:1px solid #ced9e3;">'+__zen('src_ports')+'</td>'+
            '<td class="x-column-header _dis" style="width:'+w_xsrc+';position:static;'+_dis+';border-bottom:1px solid #ced9e3;">'+__zen('xsrc_ports')+'</td>'+
            '<td class="x-column-header" style="width:'+w_dest+';position:static;border-bottom:1px solid #ced9e3;">'+__zen('dest_ports')+'</td>'+
            '<td class="x-column-header _dis" style="width:'+w_xdest+';position:static;'+_dis+';border-bottom:1px solid #ced9e3;">'+__zen('xdest_ports')+'</td>'+
            '<td class="x-column-header" style="width:'+w_protocol+';position:static;border-bottom:1px solid #ced9e3;">'+__zen('protocol')+'</td>'+
            '<td class="x-column-header" style="width:'+w_action+';position:static;border-bottom:1px solid #ced9e3;">'+__zen('action')+'</td>'+
            '<td class="x-column-header _in" style="width:'+w_rule_id+';position:static;'+_dis+';border-bottom:1px solid #ced9e3;">'+__zen('rule_id')+'</td>'+
            '<td class="x-column-header _dis" style="width:'+w_timeout+';position:static;'+_dis+';border-bottom:1px solid #ced9e3;">'+__zen('timeout')+'</td>'+
            '<td class="x-column-header" id="c_etc" style="position:static;border-bottom:1px solid #ced9e3;">'+__zen('etc')+'</td>'+
            '<td class="x-column-header _dis" style="width:'+w_data+';position:static;'+_dis+';border-bottom:1px solid #ced9e3;">'+__zen('data')+'</td></tr>'+
            '</table>';

        Ext.getCmp("con_grid").update(list);
        var _wid = $("#c_etc").width()-5;
        _dis = (mode===1)?"none":"inline-block";

        var classID,i,ar_str,si,di,sp,dp,rule = '';
        var cnt = 0;
        var f_cnt = 0;
        var r_cnt = _re.length;
        var d_cnt = 1000;
        var string = [];

        if(r_cnt > d_cnt){
            var adiv = r_cnt/d_cnt;
            var _o = 0;

            if(String(parseInt(adiv)) === String(adiv)){
                f_cnt = parseInt(adiv-0.1)*d_cnt;
                _o = 1;
            }else{
                f_cnt = parseInt(adiv)*d_cnt;
            }
            for(i=0; i<parseInt(adiv); i++){
                if((i+1)*d_cnt === cmax || ((i+1)*d_cnt) == r_cnt){ break; }
                string.push('<div id="span" onclick=init_function("monitor_packet",1,this)>'+(i*d_cnt+1)+'~'+(i+1)*d_cnt+'</div>');
            }
        }
        cnt = f_cnt+1;

        for(i=f_cnt; i<r_cnt; i++){
            if(cnt > cmax){ break; }
            si = sin_ran(_re[i].src).split('/');
            di = sin_ran(_re[i].dst).split('/');
            sp = sin_ran(_re[i].src_port).split('/');
            dp = sin_ran(_re[i].dst_port).split('/');
            rule = sin_ran(_re[i].p_id).split('/');
            if(_re[i].src_port === ""){_re[i].src_port = '&nbsp;';}
            if(_re[i].dst_port === ""){_re[i].dst_port = '&nbsp;';}
            if(_re[i].p_id === ""){_re[i].p_id = '&nbsp;';}
            var sip = (sp[0])?si[0]+' ('+sp[0]+')':si[0];
            var xsip = (sp[1])?si[1]+' ('+sp[1]+')':si[1];
            var dip = (dp[0])?di[0]+' ('+dp[0]+')':di[0];
            var xdip = (dp[1])?di[1]+' ('+dp[1]+')':di[1];

            xsip = (xsip==="")?'&nbsp;':xsip;
            xdip = (xdip==="")?'&nbsp;':xdip;
            _re[i].data = (_re[i].data==="")?'&nbsp;':_re[i].data;

            if(_re[i].action == "Drop"){
                classID = 'stDeny';
            }else if(_re[i].action == "IPSec"){
                classID = 'stIPSec';
            }else{
                classID = '';
            }

            string.push('<div class="'+classID+'">');
            string.push('<label style="width:30px"><input type="hidden" value="'+si[0]+","+si[1]+","+di[0]+","+di[1]+","+_re[i].proto+","+sp[0]+","+sp[1]+","+dp[0]+","+dp[1]+","+_re[i].action+","+rule[0]+'" /><input type="button" style="border:none;width:15px;height:15px" class="cell_check_false" onclick=init_function("monitor_packet",2,this) /></label>');
            string.push('<label class="cnt" style="width:70px;text-align:center">'+cnt+'</label>');
            string.push('<label style="width:'+w_interface+'" ondblclick=init_function(\"monitor_packet\",3,this,\"all\")>'+_re[i].interface+'</label>');
            string.push('<label style="width:'+w_length+';text-align:right" ondblclick=init_function(\"monitor_packet\",3,this,\"all\")>'+commify(_re[i].length)+'</label>');
            string.push('<label style="width:'+w_src+'" ondblclick=init_function(\"monitor_packet\",3,this,\"sip\")>'+sip+'</label>');
            string.push('<label style="width:'+w_xsrc+';display:'+_dis+'" ondblclick=init_function(\"monitor_packet\",3,this,\"all\")>'+xsip+'</label>');
            string.push('<label style="width:'+w_dest+'" ondblclick=init_function(\"monitor_packet\",3,this,\"dip\")>'+dip+'</label>');
            string.push('<label style="width:'+w_xdest+';display:'+_dis+'" ondblclick=init_function(\"monitor_packet\",3,this,\"all\")>'+xdip+'</label>');
            string.push('<label style="width:'+w_protocol+'" ondblclick=init_function(\"monitor_packet\",3,this,\"protocol\")>'+_re[i].proto+'</label>');
            string.push('<label style="width:'+w_action+'" ondblclick=init_function(\"monitor_packet\",3,this,\"action\")>'+_re[i].action+'</label>');
            string.push('<label style="width:'+w_rule_id+';display:'+_dis+';text-align:right" ondblclick=init_function(\"monitor_packet\",3,this,\"rule_id\")>'+_re[i].p_id+'</label>');
            string.push('<label style="width:'+w_timeout+';display:'+_dis+';text-align:right" ondblclick=init_function(\"monitor_packet\",3,this,\"all\")>'+_re[i].timeout+'</label>');
            string.push('<label style="width:'+_wid+'px" ondblclick=init_function(\"monitor_packet\",3,this,\"all\")>'+_re[i].etc+'</label>');
            string.push('<label style="width:'+w_data+';display:'+_dis+'" ondblclick=init_function(\"monitor_packet\",3,this,\"all\")>'+_re[i].data+'</label></div>');
            cnt++;
        }
        var w_string = string.join('');
        document.getElementById('tdiv').innerHTML = w_string;

        function sin_ran(ip){
            var i = ip.indexOf("(");
            var e = ip.indexOf(")");
            if(i != -1){
                var ip1 = ip.substring(0,i);
                var ip2 = ip.substring((i+1),e);
            }else{
                var ip1 = ip;
                var ip2 = '';
            }
            return ip1+"/"+ip2;
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        Ext.getCmp("monitor_packet").mask("Loading...");

        var fileName = Ext.Date.format(new Date(), 'Ymd_His')+"_RPM.xlsx";
        var path = '/mnt/ramdisk/do/F3view/nodeapps/deploy/public/javascripts/attachments/';

        var _params = {
            pagename: Ext.encode('packet_monitor'),
            filename: Ext.encode(path+fileName),
            data_list: Ext.encode(me._re)
        };

        request_helper.xmlrpc_call_Ajax_Post(
            'ftuctrl',
            'make_xlsx_list',
            _params,
            function(retval){

                Ext.getCmp("monitor_packet").unmask();
                document.location.href = '/fileDownloadCommon?filePath='+ Ext.encode(path)+"&fileName="+Ext.encode(fileName)+"&filePathFlag="+Ext.encode('true');

            }
        );
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;
        me.apply_filter = true;
        clearTimeout(me.interval);

        Ext.getCmp("chk_btn").state = false;
        Ext.getCmp("chk_btn").toggle(Ext.getCmp("chk_btn"));
    },

    onButtonBeforeRender: function(component, eOpts) {
        component.setText(__zen('filter_apply'));
    },

    onButtonClick3: function(button, e, eOpts) {
        var me = this;
        me.apply_filter = false;

        var nsg_tag = $('.tagedit-listelement-old');
        if(nsg_tag.length > 0){
            nsg_tag.remove();
        }
        this.set_height();

        if(Ext.getCmp("chk_btn").state){
            clearTimeout(me.interval);

            Ext.getCmp("chk_btn").state = false;
            Ext.getCmp("chk_btn").toggle(Ext.getCmp("chk_btn"));
        }
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        me._re = [];
        me.apply_filter = false;
        me._update = false;

        hideLoadMask();

        tag_search('monitor_packet');
        var input = document.getElementById('tagedit-input');

        me.set_height('mode');

        var list =	'<table cellspacing="0" cellpadding="3" style="height:30px;width:100%">'+
            '<tr><td class="x-column-header" width="30px" style="position:static"></td>'+
            '<td class="x-column-header" width="70px" style="position:static">N</td>'+
            '<td class="x-column-header" style="width:10%;position:static">'+__zen('inter')+'</td>'+
            '<td class="x-column-header" style="width:10%;position:static">'+__zen('length')+'</td>'+
            '<td class="x-column-header" style="width:15%;position:static">'+__zen('src_ports')+'</td>'+
            '<td class="x-column-header" style="width:15%;position:static">'+__zen('dest_ports')+'</td>'+
            '<td class="x-column-header" style="width:10%;position:static">'+__zen('protocol')+'</td>'+
            '<td class="x-column-header" style="width:10%;position:static">'+__zen('action')+'</td>'+
            '<td class="x-column-header" style="position:static">'+__zen('etc')+'</td>'+
            '</table>';

        Ext.getCmp("con_grid").update(list);

        Ext.getCmp("con_body").update('<div id="tdiv" style="width:100%"></div>');
    },

    onNFW2_logBeforeDestroy: function(component, eOpts) {
        var me = this;
        me._update = false;
        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'execKctrlFunc',
            {
                func_name: Ext.encode('unset_rpm_info'),
                args: Ext.encode({})
            },
            function(response){

            }
        );
        Ext.getCmp("_tooltip").destroy();
    },

    set_height: function(mode, time) {
        var me_w = (Ext.getCmp("pnl_cont")!==undefined)?$("#pnl_cont-body").width():$("html").width();
        var _w = (me_w < 1400)?65:50;
        var _m = (mode)?33:0;

        var top_hei = Ext.getCmp("con_top").getHeight()+_m+_w;
        var _hei = (Ext.getCmp("pnl_cont")!==undefined)?$("#pnl_cont-body").height()-top_hei:$("html").height()-top_hei;

        Ext.getCmp("con_body").setHeight(_hei);
        Ext.getCmp("con_body").setMaxHeight(_hei);

        if(!time){
            this.set_height(mode,'time');
        }
    },

    get_monitor_packet: function() {
        var me = this;

        if(!me._update){ return false; }

        var _params = {
            func_name: Ext.encode('get_rpm_log'),
            args: Ext.encode({})
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'execKctrlFunc',
            _params,
            function(response){
                var _re = me._re;
                var mode = Ext.getCmp("show_mode").getValue();
                var _dis = (mode===1)?"display:none":"";
                var cmax = 20000;

                var w_interface = (mode===1)?'10%':'6%';
                var w_length = (mode===1)?'10%':'3%';
                var w_src = (mode===1)?'15%':'11%';
                var w_dest = (mode===1)?'15%':'11%';
                var w_protocol = (mode===1)?'10%':'5%';
                var w_xsrc = (mode===1)?'10%':'11%';
                var w_xdest = (mode===1)?'10%':'11%';
                var w_action = (mode===1)?'10%':'4%';
                var w_rule_id = (mode===1)?'10%':'5%';
                var w_timeout = (mode===1)?'10%':'5%';
                var w_data = (mode===1)?'10%':'11%';

                if(response){
                    for(var i=0; i<response.length; i++){
                        _re.push(response[i]);
                        if(_re.length >= cmax){ break; }
                    }
                }

                var _n = 0;

                me._re = _re;

                var list =	'<table id="m_packet" cellspacing="0" cellpadding="3" style="height:30px;width:100%;">'+
                    '<tr><td class="x-column-header" width="30px" style="position:static;border-bottom:1px solid #ced9e3;"></td>'+
                    '<td class="x-column-header" style="width:70px;position:static;border-bottom:1px solid #ced9e3;">N</td>'+
                    '<td class="x-column-header" style="width:'+w_interface+';position:static;border-bottom:1px solid #ced9e3;">'+__zen('inter')+'</td>'+
                    '<td class="x-column-header" style="width:'+w_length+';position:static;border-bottom:1px solid #ced9e3;">'+__zen('length')+'</td>'+
                    '<td class="x-column-header" style="width:'+w_src+';position:static;border-bottom:1px solid #ced9e3;">'+__zen('src_ports')+'</td>'+
                    '<td class="x-column-header _dis" style="width:'+w_xsrc+';position:static;'+_dis+';border-bottom:1px solid #ced9e3;">'+__zen('xsrc_ports')+'</td>'+
                    '<td class="x-column-header" style="width:'+w_dest+';position:static;border-bottom:1px solid #ced9e3;">'+__zen('dest_ports')+'</td>'+
                    '<td class="x-column-header _dis" style="width:'+w_xdest+';position:static;'+_dis+';border-bottom:1px solid #ced9e3;">'+__zen('xdest_ports')+'</td>'+
                    '<td class="x-column-header" style="width:'+w_protocol+';position:static;border-bottom:1px solid #ced9e3;">'+__zen('protocol')+'</td>'+
                    '<td class="x-column-header" style="width:'+w_action+';position:static;border-bottom:1px solid #ced9e3;">'+__zen('action')+'</td>'+
                    '<td class="x-column-header _in" style="width:'+w_rule_id+';position:static;'+_dis+';border-bottom:1px solid #ced9e3;">'+__zen('rule_id')+'</td>'+
                    '<td class="x-column-header _dis" style="width:'+w_timeout+';position:static;'+_dis+';border-bottom:1px solid #ced9e3;">'+__zen('timeout')+'</td>'+
                    '<td class="x-column-header" id="c_etc" style="position:static;border-bottom:1px solid #ced9e3;">'+__zen('etc')+'</td>'+
                    '<td class="x-column-header _dis" style="width:'+w_data+';position:static;'+_dis+';border-bottom:1px solid #ced9e3;">'+__zen('data')+'</td>'+
                    '<td class="x-column-header" style="width:17px;position:static;border-bottom:1px solid #ced9e3;">&nbsp;</td></tr>'+
                    '</table>';

                Ext.getCmp("con_grid").update(list);
                var _wid = $("#c_etc").width()-5;
                _dis = (mode===1)?"none":"inline-block";

                var classID,i,ar_str,si,di,sp,dp,rule = '';
                var cnt = 0;
                var f_cnt = 0;
                var r_cnt = _re.length;
                var d_cnt = 1000;
                var string = [];

                if(r_cnt > d_cnt){
                    var adiv = r_cnt/d_cnt;
                    var _o = 0;

                    if(String(parseInt(adiv)) === String(adiv)){
                        f_cnt = parseInt(adiv-0.1)*d_cnt;
                        _o = 1;
                    }else{
                        f_cnt = parseInt(adiv)*d_cnt;
                    }
                    for(i=0; i<parseInt(adiv); i++){
                        if((i+1)*d_cnt === cmax || ((i+1)*d_cnt) == r_cnt){ break; }
                        string.push('<div id="span" onclick=init_function("monitor_packet",1,this)>'+(i*d_cnt+1)+'~'+(i+1)*d_cnt+'</div>');
                    }
                }
                cnt = f_cnt+1;

                for(i=f_cnt; i<r_cnt; i++){
                    if(cnt > cmax){ break; }
                    si = sin_ran(_re[i].src).split('/');
                    di = sin_ran(_re[i].dst).split('/');
                    sp = sin_ran(_re[i].src_port).split('/');
                    dp = sin_ran(_re[i].dst_port).split('/');
                    rule = sin_ran(_re[i].p_id).split('/');
                    if(_re[i].src_port === ""){_re[i].src_port = '&nbsp;';}
                    if(_re[i].dst_port === ""){_re[i].dst_port = '&nbsp;';}
                    if(_re[i].p_id === ""){_re[i].p_id = '&nbsp;';}
                    var sip = (sp[0])?si[0]+' ('+sp[0]+')':si[0];
                    var xsip = (sp[1])?si[1]+' ('+sp[1]+')':si[1];
                    var dip = (dp[0])?di[0]+' ('+dp[0]+')':di[0];
                    var xdip = (dp[1])?di[1]+' ('+dp[1]+')':di[1];

                    xsip = (xsip==="")?'&nbsp;':xsip;
                    xdip = (xdip==="")?'&nbsp;':xdip;
                    _re[i].data = (_re[i].data==="")?'&nbsp;':_re[i].data;

                    if(_re[i].action == "Drop"){
                        classID = 'stDeny';
                    }else if(_re[i].action == "IPSec"){
                        classID = 'stIPSec';
                    }else{
                        classID = '';
                    }

                    string.push('<div class="'+classID+'">');
                    string.push('<label style="width:30px"><input type="hidden" value="'+si[0]+","+si[1]+","+di[0]+","+di[1]+","+_re[i].proto+","+sp[0]+","+sp[1]+","+dp[0]+","+dp[1]+","+_re[i].action+","+rule[0]+'" /><input type="button" style="border:none;width:15px;height:15px" class="cell_check_false" onclick=init_function("monitor_packet",2,this) /></label>');
                    string.push('<label class="cnt" style="width:70px;text-align:center">'+cnt+'</label>');
                    string.push('<label style="width:'+w_interface+'" ondblclick=init_function(\"monitor_packet\",3,this,\"all\")>'+_re[i].interface+'</label>');
                    string.push('<label style="width:'+w_length+';text-align:right" ondblclick=init_function(\"monitor_packet\",3,this,\"all\")>'+commify(_re[i].length)+'</label>');
                    string.push('<label style="width:'+w_src+'" ondblclick=init_function(\"monitor_packet\",3,this,\"sip\")>'+sip+'</label>');
                    string.push('<label style="width:'+w_xsrc+';display:'+_dis+'" ondblclick=init_function(\"monitor_packet\",3,this,\"all\")>'+xsip+'</label>');
                    string.push('<label style="width:'+w_dest+'" ondblclick=init_function(\"monitor_packet\",3,this,\"dip\")>'+dip+'</label>');
                    string.push('<label style="width:'+w_xdest+';display:'+_dis+'" ondblclick=init_function(\"monitor_packet\",3,this,\"all\")>'+xdip+'</label>');
                    string.push('<label style="width:'+w_protocol+'" ondblclick=init_function(\"monitor_packet\",3,this,\"protocol\")>'+_re[i].proto+'</label>');
                    string.push('<label style="width:'+w_action+'" ondblclick=init_function(\"monitor_packet\",3,this,\"action\")>'+_re[i].action+'</label>');
                    string.push('<label style="width:'+w_rule_id+';display:'+_dis+';text-align:right" ondblclick=init_function(\"monitor_packet\",3,this,\"rule_id\")>'+_re[i].p_id+'</label>');
                    string.push('<label style="width:'+w_timeout+';display:'+_dis+';text-align:right" ondblclick=init_function(\"monitor_packet\",3,this,\"all\")>'+_re[i].timeout+'</label>');
                    string.push('<label style="width:'+_wid+'px" ondblclick=init_function(\"monitor_packet\",3,this,\"all\")>'+_re[i].etc+'</label>');
                    string.push('<label style="width:'+w_data+';display:'+_dis+'" ondblclick=init_function(\"monitor_packet\",3,this,\"all\")>'+_re[i].data+'</label></div>');
                    cnt++;
                }
                var w_string = string.join('');
                document.getElementById('tdiv').innerHTML = w_string;

                if(cnt > cmax){
                    Ext.getCmp("chk_btn").toggle();
                }else{
                    if(me._update){
                        me.interval = setTimeout(function(){
                            me.get_monitor_packet();
                        },500);
                    }
                }

                Ext.getCmp("con_body").getEl().scroll('b', $("#tdiv").height());
            }
        );

        function sin_ran(ip){
            var i = ip.indexOf("(");
            var e = ip.indexOf(")");
            if(i != -1){
                var ip1 = ip.substring(0,i);
                var ip2 = ip.substring((i+1),e);
            }else{
                var ip1 = ip;
                var ip2 = '';
            }
            return ip1+"/"+ip2;
        }
    },

    basic_function: function(mode, param, type) {
        if(mode === 1){
            var me = this;
            var _re = me._re;
            var mode = Ext.getCmp("show_mode").getValue();
            var _dis = (mode===1)?"none":"inline-block";
            var _wid = $("#c_etc").width()-10;

            var w_interface = (mode===1)?'10%':'6%';
            var w_length = (mode===1)?'10%':'3%';
            var w_src = (mode===1)?'15%':'11%';
            var w_dest = (mode===1)?'15%':'11%';
            var w_protocol = (mode===1)?'10%':'5%';
            var w_xsrc = (mode===1)?'10%':'11%';
            var w_xdest = (mode===1)?'10%':'11%';
            var w_action = (mode===1)?'10%':'4%';
            var w_rule_id = (mode===1)?'10%':'5%';
            var w_timeout = (mode===1)?'10%':'5%';
            var w_data = (mode===1)?'10%':'11%';

            var list_n = $(param).html().split('~');
            var tdiv = $("#tdiv");
            var f_cnt = Number(list_n[0]);
            var l_cnt = Number(list_n[1]);
            var string = [];
            var i, adiv, fcnt;
            var cnt = f_cnt;
            var r_cnt = _re.length;
            var d_cnt = 1000;
            var string = [];
            var cmax = 20000;

            if(r_cnt > d_cnt){
                adiv = r_cnt/d_cnt;
                for(i=0; i<parseInt(adiv); i++){
                    if((i*d_cnt+1) >= f_cnt){ break; }
                    string.push('<div id="span" onclick=init_function("monitor_packet",1,this)>'+(i*d_cnt+1)+'~'+(i+1)*d_cnt+'</div>');
                }
            }
            for(i=f_cnt-1; i<l_cnt; i++){
                si = sin_ran(_re[i].src).split('/');
                di = sin_ran(_re[i].dst).split('/');
                sp = sin_ran(_re[i].src_port).split('/');
                dp = sin_ran(_re[i].dst_port).split('/');
                rule = sin_ran(_re[i].p_id).split('/');
                if(_re[i].src_port === ""){_re[i].src_port = '&nbsp;';}
                if(_re[i].dst_port === ""){_re[i].dst_port = '&nbsp;';}
                if(_re[i].p_id === ""){_re[i].p_id = '&nbsp;';}
                var sip = (sp[0])?si[0]+' ('+sp[0]+')':si[0];
                var xsip = (sp[1])?si[1]+' ('+sp[1]+')':si[1];
                var dip = (dp[0])?di[0]+' ('+dp[0]+')':di[0];
                var xdip = (dp[1])?di[1]+' ('+dp[1]+')':di[1];

                xsip = (xsip==="")?'&nbsp;':xsip;
                xdip = (xdip==="")?'&nbsp;':xdip;
                _re[i].data = (_re[i].data==="")?'&nbsp;':_re[i].data;

                if(_re[i].action == "Drop"){
                    classID = 'stDeny';
                }else if(_re[i].action == "IPSec"){
                    classID = 'stIPSec';
                }else{
                    classID = '';
                }

                string.push('<div class="'+classID+'">');
                string.push('<label style="width:30px"><input type="hidden" value="'+si[0]+","+si[1]+","+di[0]+","+di[1]+","+_re[i].proto+","+sp[0]+","+sp[1]+","+dp[0]+","+dp[1]+","+_re[i].action+","+rule[0]+'" /><input type="button" style="border:none;width:15px;height:15px" class="cell_check_false" onclick=init_function("monitor_packet",2,this) /></label>');
                string.push('<label class="cnt" style="width:70px;text-align:center">'+cnt+'</label>');
                string.push('<label style="width:'+w_interface+'" ondblclick=init_function(\"monitor_packet\",3,this,\"all\")>'+_re[i].interface+'</label>');
                string.push('<label style="width:'+w_length+';text-align:right" ondblclick=init_function(\"monitor_packet\",3,this,\"all\")>'+commify(_re[i].length)+'</label>');
                string.push('<label style="width:'+w_src+'" ondblclick=init_function(\"monitor_packet\",3,this,\"sip\")>'+sip+'</label>');
                string.push('<label style="width:'+w_xsrc+';display:'+_dis+'" ondblclick=init_function(\"monitor_packet\",3,this,\"all\")>'+xsip+'</label>');
                string.push('<label style="width:'+w_dest+'" ondblclick=init_function(\"monitor_packet\",3,this,\"dip\")>'+dip+'</label>');
                string.push('<label style="width:'+w_xdest+';display:'+_dis+'" ondblclick=init_function(\"monitor_packet\",3,this,\"all\")>'+xdip+'</label>');
                string.push('<label style="width:'+w_protocol+'" ondblclick=init_function(\"monitor_packet\",3,this,\"protocol\")>'+_re[i].proto+'</label>');
                string.push('<label style="width:'+w_action+'" ondblclick=init_function(\"monitor_packet\",3,this,\"action\")>'+_re[i].action+'</label>');
                string.push('<label style="width:'+w_rule_id+';display:'+_dis+';text-align:right" ondblclick=init_function(\"monitor_packet\",3,this,\"rule_id\")>'+_re[i].p_id+'</label>');
                string.push('<label style="width:'+w_timeout+';display:'+_dis+';text-align:right" ondblclick=init_function(\"monitor_packet\",3,this,\"all\")>'+_re[i].timeout+'</label>');
                string.push('<label style="width:'+_wid+'px" ondblclick=init_function(\"monitor_packet\",3,this,\"all\")>'+_re[i].etc+'</label>');
                string.push('<label style="width:'+w_data+';display:'+_dis+'" ondblclick=init_function(\"monitor_packet\",3,this,\"all\")>'+_re[i].data+'</label></div>');
                cnt++;
            }

            if(r_cnt >= cnt){
                adiv = r_cnt/d_cnt;
                fcnt = parseInt(cnt/d_cnt);
                for(i=fcnt; i<parseInt(adiv); i++){
                    string.push('<div id="span" onclick=init_function("monitor_packet",1,this)>'+(i*d_cnt+1)+'~'+(i+1)*d_cnt+'</div>');
                }
                if((i*d_cnt+1) < cmax){
                    if(String(adiv) != String(parseInt(adiv)))
                        string.push('<div id="span" onclick=init_function("monitor_packet",1,this)>'+(i*d_cnt+1)+'~'+r_cnt+'</div>');
                }
            }
            var w_string = string.join('');
            document.getElementById('tdiv').innerHTML = w_string;

            function sin_ran(ip){
                var i = ip.indexOf("(");
                var e = ip.indexOf(")");
                if(i != -1){
                    var ip1 = ip.substring(0,i);
                    var ip2 = ip.substring((i+1),e);
                }else{
                    var ip1 = ip;
                    var ip2 = '';
                }
                return ip1+"/"+ip2;
            }
        }else if(mode === 2){
            var _this = $(param);
            var _cls = _this[0].className;

            if(_cls === 'cell_check_false'){
                _this.removeClass('cell_check_false').addClass('cell_check_true');
            }else{
                _this.removeClass('cell_check_true').addClass('cell_check_false');
            }
        }else if(mode === 3){
            var val = param.innerHTML;
            if(type === "all"){
                var _val = $(param)[0].parentNode.children[0].children[0].value;
                var a_val = _val.split(',');

                Ext.getCmp("monitor_packet").query_detail('sip',a_val[0]+' ('+a_val[5]+')');
                Ext.getCmp("monitor_packet").query_detail('dip',a_val[2]+' ('+a_val[7]+')');
                Ext.getCmp("monitor_packet").query_detail('protocol',a_val[4]);
                Ext.getCmp("monitor_packet").query_detail('action',a_val[9]);
                Ext.getCmp("monitor_packet").query_detail('rule_id',a_val[10]);
            }else{
                Ext.getCmp("monitor_packet").query_detail(type,val);
            }
        }
    },

    tag_validate: function(value) {
        var val = value.split("=");
        val[0] = val[0].toLowerCase();

        if(value === 'and' || value === 'or'){ return false; }
        if(val.length === 1 || value === "" || val[1] === ""){
            if(value !== "and" && value !== "or"){ return false; }
        }else if(val[0] === __zen('src').toLowerCase() || val[0] === __zen('dest').toLowerCase()){

            if(val[1].indexOf(":") === -1){
                if(val[1].indexOf('-')!==-1){
                    var _val = val[1].split('-');
                    if(_val.length > 2){ prt_errMsg_label(get_msg('err_ip'),"err_msg"); return false; }
                    for(var i=0; i<_val.length; i++){
                        if(!ValidIPAddress(_val[i])){ prt_errMsg_label(get_msg('err_ip'),"err_msg"); return false; }
                    }
                }else{
                    if(ValidIPAddress(val[1])===false){
                        prt_errMsg_label(get_msg("err_ip"),"err_msg");
                        return false;
                    }
                }
            }else{
                if(validIPv6Form(val[1])===false){
                    prt_errMsg_label(get_msg("err_ip"),"err_msg");
                    return false;
                }
            }
        }else if(val[0] === __zen('src_port').toLowerCase() || val[0] === __zen('dest_port').toLowerCase()){
            if(val[1].indexOf('-')!==-1){
                var _val = val[1].split('-');
                if(_val.length > 2){ prt_errMsg_label(get_msg('err_form'),"err_msg"); return false; }
                for(var i=0; i<_val.length; i++){
                    if(!ValidNum(Number(_val[i]))){ prt_errMsg_label(get_msg('err_form'),"err_msg"); return false; }
                    if(!LengthCheck(_val[i], 0, 65535)){ prt_errMsg_label(ValidLimit(0, 65535),"err_msg"); return false; }
                }
                if(Number(_val[0]) > Number(_val[1])){ prt_errMsg_label(get_msg('err_than'),"err_msg"); return false; }
            }else{
                if(!ValidNum(Number(val[1]))){ prt_errMsg_label(get_msg('err_form'),"err_msg"); return false; }
                if(!LengthCheck(val[1], 0, 65535)){ prt_errMsg_label(ValidLimit(0, 65535),"err_msg"); return false; }
            }
        }else if(val[0] === __zen('protocol').toLowerCase()){
            if(ValidNum(Number(val[1]))){
                if(!LengthCheck(val[1], 0, 255)){ prt_errMsg_label(ValidLimit(0, 255),"err_msg"); return false; }
            }
        }else if(val[0] === __zen('id_type').toLowerCase()){
            var _id = val[1].toLowerCase();
            if(_id !== 'any' && _id !== __zen('rule_id').toLowerCase() && _id !== __zen('nat_policy_id').toLowerCase()){ prt_errMsg_label(get_msg('err_form'),"err_msg"); return false; }
        }else if(val[0] === __zen('rule_id').toLowerCase()){
            if(!ValidNum(Number(val[1]))){ prt_errMsg_label(get_msg('err_form'),"err_msg"); return false; }
        }else if(val[0] === __zen('action').toLowerCase()){
            var _act = val[1].toLowerCase();
            if(_act !== 'accept' && _act !== 'drop' && _act !== 'ipsec'){
                prt_errMsg_label(get_msg('err_form'),"err_msg"); return false;
            }
        }else{
            return false;
        }
        Ext.getCmp("err_msg").hide();
        return true;
    },

    query_detail: function(type, val) {
        var me = Ext.getCmp("monitor_packet");
        if(val === ""){ return false; }

        if(type === "sip" || type === "dip"){

            var text = (type==="sip")?__zen('src'):__zen('dest');
            if(val.indexOf("(") !== -1){
                var av = val.split(" (");
                if(av[0] !== "0.0.0.0"){
                    $("#tagedit-input").val(text+"="+av[0]);
                    $("#tagedit-input").trigger('transformToTag');
                }
                if(av[1] !== "0)"){

                    var _port = (type==="sip")?__zen('src_port'):__zen('dest_port');
                    $("#tagedit-input").val(_port+"="+av[1].substring(0,av[1].length-1));
                    $("#tagedit-input").trigger('transformToTag');
                }
                return false;
            }
        }else if(type === 'rule_id'){

            if(val.indexOf("(") !== -1){
                var ar = val.split("(");
                val = ar[0];
            }
        }
        var text = (type==='protocol')?__zen('protocol'):(type==='id_type')?__zen('id_type'):(type==='rule_id')?__zen('rule_id'):(type==="action")?__zen('action'):"";

        if(text === ""){ return false; }
        $("#tagedit-input").val(text+"="+val);
        $("#tagedit-input").trigger('transformToTag');

        me.set_height();
    }

});