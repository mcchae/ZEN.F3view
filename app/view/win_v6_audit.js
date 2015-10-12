
Ext.define('NFW2.view.win_v6_audit', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_v6_audit',

    requires: [
        'NFW2.view.win_v6_auditViewModel',
        'Ext.form.field.Date',
        'Ext.form.Label',
        'Ext.form.field.Display',
        'Ext.button.Segmented',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_v6_audit'
    },
    autoScroll: true,
    cls: 'zen_win',
    height: 700,
    width: 870,
    bodyPadding: 20,
    maximizable: true,
    defaultListenerScope: true,

    bind: {
        title: '{fw_audit}'
    },
    items: [
        {
            xtype: 'container',
            items: [
                {
                    xtype: 'container',
                    padding: '0 0 7 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'datefield',
                            height: 27,
                            id: 'audit_start',
                            labelSeparator: ' ',
                            editable: false,
                            format: 'Y-m-d',
                            submitFormat: 'Y-m-d',
                            bind: {
                                fieldLabel: '{date}'
                            },
                            listeners: {
                                render: 'onAudit_startRender'
                            }
                        },
                        {
                            xtype: 'label',
                            margin: '0 5',
                            text: '~'
                        },
                        {
                            xtype: 'datefield',
                            height: 27,
                            id: 'audit_end',
                            labelSeparator: ' ',
                            editable: false,
                            format: 'Y-m-d',
                            submitFormat: 'Y-m-d',
                            listeners: {
                                render: 'onAudit_startRender1'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'fld_uid',
                            labelSeparator: ' ',
                            bind: {
                                fieldLabel: '{rule_id}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'segmentedbutton',
                            cls: 'zen_seg',
                            id: 'audit_action',
                            margin: '0 5 10 100',
                            items: [
                                {
                                    enableToggle: true,
                                    pressed: true,
                                    bind: {
                                        text: '{integrated}'
                                    }
                                },
                                {
                                    bind: {
                                        text: '{individual}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'label',
                            cls: 'mt_info',
                            bind: {
                                text: '{fw_audit_info1}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    cls: 'fld_info',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'segmentedbutton',
                            cls: 'zen_seg',
                            id: 'audit_print',
                            items: [
                                {
                                    enableToggle: true,
                                    pressed: true,
                                    bind: {
                                        text: '{print_page}'
                                    }
                                },
                                {
                                    bind: {
                                        text: '{print_file}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            cls: 'btn_b',
                            margin: '0 0 0 10',
                            width: 70,
                            iconCls: 'ft_confirm_icl',
                            bind: {
                                text: '{confirm}'
                            },
                            listeners: {
                                click: 'onButtonClick'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'container',
            id: 'fld_cont',
            items: [
                {
                    xtype: 'container',
                    id: 'fld_num'
                },
                {
                    xtype: 'container',
                    id: 'fld_result'
                },
                {
                    xtype: 'container',
                    cls: 'dv_filter',
                    hidden: true,
                    id: 'fld_filter'
                },
                {
                    xtype: 'container',
                    hidden: true,
                    id: 'fld_btn',
                    padding: '5 0 5 700',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'button',
                            cls: 'ft_confirm',
                            height: 30,
                            margin: 3,
                            width: 50,
                            bind: {
                                text: '{add}'
                            },
                            listeners: {
                                click: 'onButtonClick1'
                            }
                        },
                        {
                            xtype: 'button',
                            cls: 'ft_confirm',
                            height: 30,
                            margin: 3,
                            width: 50,
                            bind: {
                                text: '{edit}'
                            },
                            listeners: {
                                click: 'onButtonClick2'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWindowAfterRender'
    },

    onAudit_startRender: function(component, eOpts) {
        Ext.getCmp("audit_start").setValue(new Date());
    },

    onAudit_startRender1: function(component, eOpts) {
        Ext.getCmp("audit_end").setValue(new Date());
    },

    onButtonClick: function(button, e, eOpts) {
        this.get_auditData();
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;
        Ext.getCmp("fld_uid").setValue(me.uid);
        chk_zenauth(null);
    },

    onButtonClick1: function(button, e, eOpts) {
        this.set_auditRule(true);
    },

    onButtonClick2: function(button, e, eOpts) {
        this.set_auditRule(false);
    },

    get_auditData: function() {
        var me = this;


        var mode = (Ext.getCmp('audit_action').getComponent(0).pressed===true)?1:2;
        var print = (Ext.getCmp('audit_print').getComponent(0).pressed===true)?1:2;

        var path = '/mnt/ramdisk/do/F3view/nodeapps/deploy/public/javascripts/attachments/';
        var fileName = 'PolicyAuditLogList.xlsx';
        var fileName_x = (print===2)?path+fileName:'';

        var _obj = {
            start_date : Ext.getCmp('audit_start').getSubmitValue(),
            end_date : Ext.getCmp('audit_end').getSubmitValue(),
            spd_id : me.uid,
            mode : mode,
            print : print,
            filename : fileName_x,
            ip_ver : 6
        };


        var _params = {option : Ext.encode(_obj)};

        Ext.getCmp("fld_num").removeAll(true);



        Ext.get('fld_cont').mask("Loading Data ..");

        var tmp_idx = "";





        request_helper.xmlrpc_call_JsonP('ftuctrl','getPolicyAuditLog',_params,
                                         function(response){

                                             Ext.get('fld_cont').unmask();

                                             if(print===2){
                                                 document.location.href = '/fileDownloadCommon?filePath='+ Ext.encode(path)+"&fileName="+Ext.encode(fileName)+"&filePathFlag="+Ext.encode('true');
                                                 return false;
                                             }


                                             for (var i=0; i<response.length; i++) {
                                                 if(mode===1){
                                                     if(!(response[i].sip.length && response[i].dip.length && response[i].service.length)){	continue;}
                                                 }else{
                                                     if(!response[i].list.length){	continue;}
                                                 }

                                                 tmp_idx = (tmp_idx==="")?response[i].spd_id:tmp_idx;


                                                 var button = {
                                                     xtype : 'button',
                                                     text : response[i].spd_id,
                                                     width: 50,
                                                     margin: '3',
                                                     listeners : {
                                                         click : function(){
                                                             if(mode===1){
                                                                 me.make_list(response,this.text);
                                                             }else{
                                                                 me.make_list_v(response,this.text);
                                                             }

                                                         }
                                                     }
                                                 };

                                                 Ext.getCmp("fld_num").add(button);
                                             }

                                             if(tmp_idx===""){Ext.getCmp("fld_result").update(get_msg('msg_result_null')); return false;}

                                             if(mode===1){
                                                 me.make_list(response,tmp_idx);
                                             }else{
                                                 me.make_list_v(response,tmp_idx);
                                             }

                                         });
    },

    make_list: function(obj_x, uid) {
        var me = this;
        me.nowuid = uid;

        for (var i=0; i<obj_x.length; i++) {

            if(parseInt(obj_x[i].spd_id) === parseInt(uid)){ var obj = obj_x[i];break;	}
        }


        var tbl= "<table id='tbl_audit'><thead><tr><td width='10%'>"+__zen('rule_id')+"</td><td width='25%'>"+__zen('src')+"</td><td width='25%'>"+__zen('dest')+"</td><td width='40%'>"+__zen('service')+","+__zen('port')+"</td></tr></thead>";
        var sip_li="",dip_li="",svc_li = "";
        var tmp_cls = "";

        var filter = "<table id='tbl_audit'><tr><td width='10%'>"+__zen('filter')+"</td><td id='td_sip' width='25%'></td><td id='td_dip' width='25%'></td><td id='td_svc' width='40%'></td></tr></table>";
        var btn_dv = "<table width='100%'><tr><td width='10%'></td><td width='25%'><input type='button' value='"+__zen('add')+"' onclick=\"addAuditRule('sip','v6')\" /></td><td width='25%'><input type='button' value='"+__zen('add')+"' onclick=\"addAuditRule('dip','v6')\" /></td><td width='40%'><input type='button' value='추가'  onclick=\"addAuditRule('svc','v6')\"/></td></tr></table>";
        var add_dv = "<table id='tbl_audit_x'><tr><td width='10%'></td><td width='25%' id='add_sip'><h1>"+__zen('src')+"</h1></td><td width='25%' id='add_dip'><h1>"+__zen('dest')+"</h1></td><td width='40%' id='add_svc'><h1>"+__zen('service')+"</h1></td></tr></table>";


        for (var k=0; k<obj.sip.length; k++) {
            tmp_cls = (k===0)?"selon":"";
            sip_li += "<li class='"+tmp_cls+"' onClick=\"get_audit_filter_v6('"+obj.sip[k]+"','sip',this)\">"+obj.sip[k]+"</li>";
        }

        for (var k=0; k<obj.dip.length; k++) {
            tmp_cls = (k===0)?"selon":"";
            dip_li += "<li class='"+tmp_cls+"' onClick=\"get_audit_filter_v6('"+obj.dip[k]+"','dip',this)\">"+obj.dip[k]+"</li>";
        }

        for (var k=0; k<obj.service.length; k++) {
            tmp_cls = (k===0)?"selon":"";
            svc_li += "<li class='"+tmp_cls+"' onClick=\"get_audit_filter_v6('"+obj.service[k]+"','svc',this)\">"+obj.service[k]+"</li>";
        }


        tbl += "<tbody><td>"+obj.spd_id+"</td><td><ul id='ul_sip'>"+sip_li+"</ul></td><td><ul id='ul_dip'>"+dip_li+"</ul></td><td><ul id='ul_svc'>"+svc_li+"</ul></td></tbody></table>";

        var sip_tmp =  obj.sip[0];
        var dip_tmp =  obj.dip[0];
        var svc_tmp =  obj.service[0];

        Ext.getCmp("fld_result").update(tbl);

        Ext.getCmp("fld_filter").show();
        Ext.getCmp("fld_filter").update(filter+btn_dv+add_dv);

        get_audit_filter_v6(sip_tmp,'sip',null);
        get_audit_filter_v6(dip_tmp,'dip',null);
        get_audit_filter_v6(svc_tmp,'svc',null);

        Ext.getCmp("fld_btn").show();
    },

    make_list_v: function(obj_x, uid) {
        var me = this;

        Ext.getCmp("fld_filter").removeAll(true);
        Ext.getCmp("fld_filter").hide();
        Ext.getCmp("fld_btn").hide();

        for (var i=0; i<obj_x.length; i++) {
            if(parseInt(obj_x[i].spd_id) === parseInt(uid)){	var obj = obj_x[i];	break;	}
        }

        var tbl= "<table id='tbl_audit'><thead><tr><td width='100px'>"+__zen('rule_id')+"</td><td width='200px'>"+__zen('src')+"</td><td width='200px'>"+__zen('dest')+"</td><td>"+__zen('service')+","+__zen('port')+"</td></tr></thead>";
        var list = "";

        for (var k=0; k<obj.list.length; k++) {

            list += "<table id='tbl_audit_v'><tr><td width='199px'>"+obj.list[k].sip+"</td><td >";

            for (var q=0; q<obj.list[k].list.length; q++) {

                list += "<table id='tbl_audit_in'><tr><td width='199px'>"+obj.list[k].list[q].dip+"</td><td>";

                for (var r=0; r<obj.list[k].list[q].list.length; r++) {

                    list += "<li>"+ obj.list[k].list[q].list[r] + "</li>";
                }
                list += "</td></tr></table>";
            }

            list += "</td></tr></table>";
        }


        tbl += "<tbody><td>"+obj.spd_id+"</td><td colspan='3' style='padding:0'>"+list+"</td></tbody></table>";


        Ext.getCmp("fld_result").update(tbl);
    },

    set_auditRule: function(mode) {
        var me = this;

        var h_org_sip = document.getElementsByName("h_org_sip[]");
        var h_fit_sip = document.getElementsByName("h_fit_sip[]");
        var h_org_dip = document.getElementsByName("h_org_dip[]");
        var h_fit_dip = document.getElementsByName("h_fit_dip[]");
        var h_org_svc = document.getElementsByName("h_org_svc[]");
        var h_fit_svc = document.getElementsByName("h_fit_svc[]");

        var in_obj = new Object();

        var src = [], dest=[], svc=[];
        var tmp_src = "",tmp_dest = "",tmp_svc = "";
        for(i=0; i< h_org_sip.length; i++){
            if(h_fit_sip[i].value==="Any"){	tmp_src = "any";	break;	}
            in_obj={
                'audit':h_org_sip[i].value,
                'filter':h_fit_sip[i].value
            };
            src.push(in_obj);
        }

        for(i=0; i< h_org_dip.length; i++){
            if(h_fit_dip[i].value==="Any"){	tmp_dest = "any";	break;	}
            in_obj={
                'audit':h_org_dip[i].value,
                'filter':h_fit_dip[i].value
            };
            dest.push(in_obj);
        }

        for(i=0; i< h_org_svc.length; i++){

            if(h_fit_svc[i].value==="Any"){	tmp_svc = "any";	break;	}

            var tmp_x = h_fit_svc[i].value;
            var filter = "";

            if (tmp_x.indexOf(",") === -1){	filter = {'type':tmp_x};	}
            else{
                var ar_tmp=tmp_x.split(",");
                if (tmp_x.indexOf(":") === -1){
                    filter = {'type':ar_tmp[0],'source':{'start':parseInt(ar_tmp[1]),'end':parseInt(ar_tmp[1])},'dest':{'start':parseInt(ar_tmp[1]),'end':parseInt(ar_tmp[1])}};
                }else{
                    var ar_x=ar_tmp[1].split(":");
                    if(ar_x[1]==="1"){
                        filter = {'type':ar_tmp[0],'source':{'start':1,'end':65535},'dest':{'start':parseInt(ar_x[0]),'end':parseInt(ar_x[0])}};
                    }else{
                        filter = {'type':ar_tmp[0],'source':{'start':1,'end':65535},'dest':{'start':1,'end':65535}};
                    }
                }
            }


            in_obj={
                'audit':h_org_svc[i].value,
                'filter':filter
            };
            svc.push(in_obj);
        }

        var null_data = {'audit':'', 'filter':'Any'};
        var null_data_svc = {'audit':'', 'filter':{'type':'Any'}};

        if(src.length===0){src.push(null_data);}
        if(dest.length===0){dest.push(null_data);}
        if(svc.length===0){svc.push(null_data_svc);}

        var _obj = {
            uid : parseInt(me.nowuid),
            num : parseInt(me.uid_key[me.nowuid]),
            src : (tmp_src==="any")?[null_data]:src,
            dest : (tmp_dest==="any")?[null_data]:dest,
            service : (tmp_svc==="any")?[null_data_svc]:svc,
        };

        var _params = {
            basename : Ext.encode('firewall_filter_ipv6'),
            obj : Ext.encode(_obj),
            add : Ext.encode(mode)

        };


        request_helper.xmlrpc_call_JsonP('ftuctrl','setPolicyByAudit',_params,
                                         function(response){

                                             console.log(response);

                                             var _store = Ext.data.StoreManager.lookup('store_spd_ipv6_list');
                                             _store.load();

                                             me.close();

                                             if(mode===false){
                                                 var win = Ext.create('NFW2.view.win_ipv6SPD',{
                                                     modal : true,
                                                     edit:"audit",
                                                     total : _store.getTotalCount(),
                                                     license : me.license,
                                                     auditData:response
                                                 });

                                                 win.show();

                                             }


                                         });
    }

});