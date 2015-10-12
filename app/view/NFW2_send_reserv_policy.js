
Ext.define('NFW2.view.NFW2_send_reserv_policy', {
    extend: 'Ext.window.Window',
    alias: 'widget.nfw2_send_reserv_policy',

    requires: [
        'NFW2.view.NFW2_send_reserv_policyViewModel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.form.field.Date',
        'Ext.form.field.Time'
    ],

    viewModel: {
        type: 'nfw2_send_reserv_policy'
    },
    cls: 'zen_win',
    height: 230,
    width: 450,
    bodyPadding: 20,
    modal: true,
    defaultListenerScope: true,

    bind: {
        title: '{tit_reserv}'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    cls: 'fld_msg',
                    itemId: 'fld_msg'
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onButtonClick1'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onButtonClick'
                    }
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'container',
            items: [
                {
                    xtype: 'toggleslide',
                    resizeHandle: false,
                    state: false,
                    id: 'chk_reserv',
                    listeners: {
                        change: 'onButtonChange'
                    }
                },
                {
                    xtype: 'datefield',
                    cls: 'lb_req',
                    disabled: true,
                    id: 'fd_date',
                    margin: '20 0 10 0',
                    labelSeparator: ' ',
                    editable: false,
                    format: 'Y-m-d',
                    bind: {
                        fieldLabel: '{date}'
                    }
                },
                {
                    xtype: 'timefield',
                    cls: 'lb_req',
                    disabled: true,
                    id: 'ft_time',
                    labelSeparator: ' ',
                    editable: false,
                    format: 'H:i',
                    increment: 10,
                    maxValue: '24:00',
                    minValue: '00:00',
                    bind: {
                        fieldLabel: '{time}'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWindowAfterRender'
    },

    onButtonClick1: function(button, e, eOpts) {


        var me = this;

        //var _data = me.obj_d.data;
        var _data = new Object();
        var reservation = {};

        if(Ext.getCmp('chk_reserv').getValue()){
            if(Ext.getCmp('fd_date').getValue()===null){prt_errMsg(get_msg('err_null'), null);return false;}
            if(Ext.getCmp('ft_time').getValue()===null){prt_errMsg(get_msg('err_null'), null);return false;}


            // UI에서 선택한 날짜 구함
            var year = Ext.getCmp('fd_date').getValue().getFullYear();

            var month = Ext.getCmp('fd_date').getValue().getMonth() +1;

            month = month < 10 ? '0'+month : month;

            var day = Ext.getCmp('fd_date').getValue().getDate();

            day = day < 10 ? '0'+day : day;

            var hours = Ext.getCmp('ft_time').getValue().getHours();

            hours = hours < 10 ? '0'+hours : hours;

            var minutes = Ext.getCmp('ft_time').getValue().getMinutes();

            minutes = minutes < 10 ? '0'+minutes : minutes;


            // 오늘 날짜 구함
            var today = new Date();

            var year2 = today.getFullYear();

            var month2 = today.getMonth() +1;

            month2 = month2 < 10 ? '0'+month2 : month2;

            var day2 = today.getDate();

            day2 = day2 < 10 ? '0'+day2 : day2;

            var hours2 = today.getHours();

            hours2 = hours2 < 10 ? '0'+hours2 : hours2;

            var minutes2 = today.getMinutes();

            minutes2 = minutes2 < 10 ? '0'+minutes2 : minutes2;

            reservation.year = year;

            reservation.month = month;

            reservation.day = day;

            reservation.hour = hours;

            reservation.time = minutes;

        }




        if(Ext.getCmp('chk_reserv').getValue()){

            reservation.use = 'on';

        }else{

            reservation.use = 'off';
        }

        if(reservation.use === 'on'){

            if(year.toString()+month.toString()+day.toString()+hours.toString()+minutes.toString() < year2.toString()+month2.toString()+day2.toString()+hours2.toString()+minutes2.toString()){

                prt_errMsg(get_msg('err_passed_day'), null); return false;

                return false;

            }
        }

        _data.reservation = reservation;

        var _msg = msg_send_reservation(reservation.year,reservation.month,reservation.day,reservation.hour,reservation.time);



        var _params = {
            basename : Ext.encode('system_reservation_policy'),
            obj : Ext.encode(_data)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObject',
            _params,
            function(response){

                var btn_ca = Ext.getCmp('btn_calendar');


                if(Ext.getCmp('chk_reserv').getValue()){

                    btn_ca.setBadgeText('on');

                    btn_ca.rev_msg = _msg;

                }else{
                    btn_ca.setBadgeText('');
                    btn_ca.rev_msg = get_msg('msg_rev_off');
                }

                Ext.Msg.show({
                    title: __weguardia,
                    msg: get_msg('msg_ok_add'),
                    width: 300,
                    buttons: Ext.Msg.OK,
                    icon: Ext.window.MessageBox.INFO
                });


                var _params = {
                    func_name: Ext.encode('reservation_send_policy')
                };

                request_helper.xmlrpc_call_JsonP(

                    'ftuctrl',
                    'execKctrlFunc',
                    _params,

                    function(response){
                    }

                );

                adminAlarmRefresh();

                me.close();

            }
        );


    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    },

    onButtonChange: function(button, state) {
        var _state = (state===true)?false:true;

        Ext.getCmp('fd_date').setDisabled(_state);
        Ext.getCmp('ft_time').setDisabled(_state);
    },

    onWindowAfterRender: function(component, eOpts) {

        var me = this;


        var _params = {
            basename : Ext.encode('system_reservation_policy')

        };

         var btn_ca = Ext.getCmp('btn_calendar');

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){

                console.log(response);

                if(response !== null){

                    var _obj =response;

                    if(_obj.reservation.use === "on"){

                        Ext.getCmp('chk_reserv').toggle();
                        Ext.getCmp('fd_date').setValue(_obj.reservation.year+'-'+_obj.reservation.month+'-'+_obj.reservation.day);
                        Ext.getCmp('ft_time').setValue(_obj.reservation.hour+':'+_obj.reservation.time);
                    }else{

                        btn_ca.setBadgeText('');
                        btn_ca.rev_msg = get_msg('msg_rev_off');

                    }

                }

            }
        );

        chk_zenauth(null);

        me.getViewModel().setData({
            tit_reserv: __zen('tit_reserv'),
            time: __zen('time'),
            date: __zen('date'),
            confirm: __zen('confirm'),
            cancel: __zen('cancel')
        });
    }

});