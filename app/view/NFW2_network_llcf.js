
Ext.define('NFW2.view.NFW2_network_llcf', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_network_llcf',

    requires: [
        'NFW2.view.NFW2_network_llcfViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'nfw2_network_llcf'
    },
    cls: 'zen_body',
    id: 'NFW2_network_ha_physicalLink',
    width: 900,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            id: 'fm',
            layout: 'auto',
            bodyPadding: 10,
            items: [
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'label',
                            bind: {
                                text: '{link_pack}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    id: 'grid_link',
                    margin: '5 0 0 0',
                    title: '',
                    columnLines: true,
                    disableSelection: true,
                    enableColumnHide: false,
                    enableColumnMove: false,
                    enableColumnResize: false,
                    sortableColumns: false,
                    store: 'store_physical_link',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 100,
                            sortable: false,
                            dataIndex: 'name'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return '<input type="checkbox" id="link_eth0_'+rowIndex+'" />';
                            },
                            id: 'l_eth0',
                            width: 50,
                            sortable: false,
                            align: 'center',
                            dataIndex: 'number',
                            text: 'eth0'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return '<input type="checkbox" id="link_eth1_'+rowIndex+'" />';
                            },
                            id: 'l_eth1',
                            width: 50,
                            sortable: false,
                            align: 'center',
                            dataIndex: 'date',
                            text: 'eth1'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return '<input type="checkbox" id="link_eth2_'+rowIndex+'" />';
                            },
                            id: 'l_eth2',
                            width: 50,
                            sortable: false,
                            align: 'center',
                            dataIndex: 'bool',
                            text: 'eth2'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return '<input type="checkbox" id="link_eth3_'+rowIndex+'" />';
                            },
                            id: 'l_eth3',
                            width: 50,
                            sortable: false,
                            align: 'center',
                            text: 'eth3'
                        }
                    ],
                    listeners: {
                        cellclick: 'onGrid_linkCellClick'
                    }
                },
                {
                    xtype: 'container',
                    margin: '10 0 0 0',
                    items: [
                        {
                            xtype: 'label',
                            bind: {
                                text: '{bond_pack}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    id: 'grid_bond',
                    margin: '5 0 0 0',
                    title: '',
                    columnLines: true,
                    disableSelection: true,
                    enableColumnHide: false,
                    enableColumnMove: false,
                    enableColumnResize: false,
                    sortableColumns: false,
                    store: 'store_physical_bond',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 100,
                            sortable: false,
                            dataIndex: 'name'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return '<input type="checkbox" id="bond_eth0_'+rowIndex+'" />';
                            },
                            id: 'b_eth0',
                            width: 50,
                            sortable: false,
                            align: 'center',
                            dataIndex: 'number',
                            text: 'eth0'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return '<input type="checkbox" id="bond_eth1_'+rowIndex+'" />';
                            },
                            id: 'b_eth1',
                            width: 50,
                            sortable: false,
                            align: 'center',
                            dataIndex: 'date',
                            text: 'eth1'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return '<input type="checkbox" id="bond_eth2_'+rowIndex+'" />';
                            },
                            id: 'b_eth2',
                            width: 50,
                            sortable: false,
                            align: 'center',
                            dataIndex: 'bool',
                            text: 'eth2'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return '<input type="checkbox" id="bond_eth3_'+rowIndex+'" />';
                            },
                            id: 'b_eth3',
                            width: 50,
                            sortable: false,
                            align: 'center',
                            text: 'eth3'
                        }
                    ],
                    listeners: {
                        cellclick: 'onGrid_bondCellClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPanelAfterRender'
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
                        click: 'onButtonClick'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onButtonClick1'
                    }
                }
            ]
        }
    ],

    onGrid_linkCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0){ return false; }

        var grid_link = Ext.getCmp("grid_link");
        var grid_bond = Ext.getCmp("grid_bond");

        this.grid_chk_link(cellIndex,rowIndex);
    },

    onGrid_bondCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0){ return false; }

        var grid_link = Ext.getCmp("grid_link");
        var grid_bond = Ext.getCmp("grid_bond");

        this.grid_chk_bond(cellIndex,rowIndex);
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        var _params = {
            option: Ext.encode("all")
        };
        var grid = Ext.getCmp("grid_link");

        for(var v=4; v<31; v++){

            var column_link = Ext.create('Ext.grid.column.Column', {
                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                    return '<input type="checkbox" id="link_eth'+(colIndex-1)+'_'+rowIndex+'" />';
                },
                id: 'l_eth'+v,
                width: 50,
                hidden: true,
                align: 'center',
                text: "eth"+v,
                sortable: false
            });

            var column_bond = Ext.create('Ext.grid.column.Column', {
                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                    return '<input type="checkbox" id="bond_eth'+(colIndex-1)+'_'+rowIndex+'" />';
                },
                id: 'b_eth'+v,
                width: 50,
                hidden: true,
                align: 'center',
                text: "eth"+v,
                sortable: false
            });

            Ext.getCmp("grid_link").headerCt.insert(v+1,column_link);
            Ext.getCmp("grid_bond").headerCt.insert(v+1,column_bond);
        }

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_pname_list',
            _params,
            function(response){

                hideLoadMask();

                for(var i=0; i<response.length; i++){
                    Ext.getCmp("l_"+response[i].name).show();
                    Ext.getCmp("b_"+response[i].name).show();
                }

                var wid = response.length*50+100;
                wid = (wid > 880)?880:wid;

                Ext.getCmp("grid_link").setWidth(wid);
                Ext.getCmp("grid_bond").setWidth(wid);

                Ext.getCmp("NFW2_network_ha_physicalLink").setWidth(wid+20);

                me.eth_length = response.length;
                setTimeout(function(){ me.get_ha_physicalLink(); },1);
            }
        );
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        var grid_link = Ext.getCmp("grid_link");
        var grid_bond = Ext.getCmp("grid_bond");

        var group = 0;

        var obj = {
            'link_pack_script': {'link_pack':''},
            'bond_pack_script': {'bond_pack':''}
        };

        var link = [];
        var bond = [];

        for(var l=0; l<grid_link.getStore().getCount(); l++){

            var chk = 0;

            var eth_chk = [];

            for(var e=0; e<me.eth_length; e++){
                eval('var eth'+e+' = document.getElementById("link_eth'+e+'_'+l+'").checked;');
                eval('if(eth'+e+'){ eth_chk.push("eth'+e+'"); chk = 1; }');
            }

            if(chk === 1){

                var inter = {};
                for(var e=0; e<me.eth_length; e++){
                    eval('inter["chk_eth'+e+'"] = (eth'+e+')?"on":"off";');
                }

                link_pack = {
                    'name': "pack"+(l+1),
                    'interface': inter
                };

                link.push(link_pack);
            }
        }

        obj.link_pack_script.link_pack = link;

        for(var i=0; i<grid_bond.getStore().getCount(); i++){

            var chk = 0;

            for(var e=0; e<me.eth_length; e++){
                eval('var eth'+e+' = document.getElementById("bond_eth'+e+'_'+i+'").checked;');
                eval('if(eth'+e+'){ chk = 1; }');
            }

            if(chk === 1){

                var inter = {};
                for(var e=0; e<me.eth_length; e++){
                    eval('inter["chk_eth'+e+'"] = (eth'+e+')?"on":"off";');
                }

                bond_pack = {
                    'name': "pack"+(i+1),
                    'interface': inter
                };
                bond.push(bond_pack);
                group++;
            }
        }
        obj.bond_pack_script.bond_pack = bond;

        if(group > 0 && group < 2){

            prt_errMsg(get_msg('err_bond_chk'), null);
            return false;
        }

        prt_errMsg(null,null);

        var _params = {
            basename: Ext.encode("link_pack_script"),
            obj: Ext.encode(obj)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObject',
            _params,
            function(response){

                Ext.Msg.show({
                    title: __weguardia,
                    msg: get_msg('msg_ok_add'),
                    width: 300,
                    buttons: Ext.Msg.YES,
                    buttonText:{
                        yes: __zen('confirm')
                    }
                });
            }
        );
    },

    onButtonClick1: function(button, e, eOpts) {
        this.get_ha_physicalLink();
    },

    get_ha_physicalLink: function() {
        var me = this;

        var _store_link = Ext.data.StoreManager.lookup("store_physical_link");
        var _store_bond = Ext.data.StoreManager.lookup("store_physical_bond");

        var _params = {
            basename: Ext.encode("link_pack_script")
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){

                for(var k=0; k<_store_link.getCount(); k++){
                    for(var e=0; e<me.eth_length; e++){
                        document.getElementById('link_eth'+e+'_'+k).checked = false;
                        document.getElementById('link_eth'+e+'_'+k).disabled = false;

                    }
                }

                for(var d=0; d<_store_bond.getCount(); d++){
                    for(var e=0; e<me.eth_length; e++){
                        document.getElementById('bond_eth'+e+'_'+d).checked = false;
                        document.getElementById('bond_eth'+e+'_'+d).disabled = false;

                    }
                }

                if(!response){ return false; }

                var link = response.link_pack_script.link_pack;
                var bond = response.bond_pack_script.bond_pack;

                for(var i in link){
                    var n = Number(link[i].name.substring(4))-1;

                    for(var l=0; l<me.eth_length; l++){

                        if(link[i]['interface']['chk_eth'+l]==="on"){

                            document.getElementById('link_eth'+l+'_'+n).checked = true;
                            me.grid_chk_link(l+1,n);
                        }
                    }
                }

                for(var i in bond){
                    var n = Number(bond[i].name.substring(4))-1;

                    for(var l=0; l<me.eth_length; l++){

                        if(bond[i]['interface']['chk_eth'+l]==="on"){

                            document.getElementById('bond_eth'+l+'_'+n).checked = true;
                            me.grid_chk_bond(l+1,n);
                        }
                    }
                }
            }
        );


    },

    grid_chk_link: function(cellIndex, rowIndex) {
        var grid_link = Ext.getCmp("grid_link");
        var grid_bond = Ext.getCmp("grid_bond");

        var stop = '';

        for(var i=0; i<grid_link.getStore().getCount(); i++){

            if(i !== Number(rowIndex)){

                if(document.getElementById("link_eth"+(cellIndex-1)+"_"+i).checked === true){

                    stop = '1';
                    break;
                }
            }
        }

        for(var l=0; l<grid_bond.getStore().getCount(); l++){

            if(document.getElementById("bond_eth"+(cellIndex-1)+"_"+l).checked === true){
                stop = '1';
                break;
            }
        }

        if(stop === '1'){
            return false;
        }

        var chk = document.getElementById("link_eth"+(cellIndex-1)+"_"+rowIndex).checked;

        for(var i=0; i<grid_link.getStore().getCount(); i++){

            if(i !== Number(rowIndex)){

                document.getElementById("link_eth"+(cellIndex-1)+"_"+i).disabled = chk;
            }
        }

        for(var l=0; l<grid_bond.getStore().getCount(); l++){

            document.getElementById("bond_eth"+(cellIndex-1)+"_"+l).disabled = chk;
        }


    },

    grid_chk_bond: function(cellIndex, rowIndex) {
        var grid_link = Ext.getCmp("grid_link");
        var grid_bond = Ext.getCmp("grid_bond");

        var stop = '';

        for(var i=0; i<grid_link.getStore().getCount(); i++){

            if(document.getElementById("link_eth"+(cellIndex-1)+"_"+i).checked === true){
                stop = '1';
                break;
            }
        }

        for(var l=0; l<grid_bond.getStore().getCount(); l++){

            if(l !== Number(rowIndex)){

                if(document.getElementById("bond_eth"+(cellIndex-1)+"_"+l).checked === true){
                    stop = '1';
                    break;
                }
            }
        }

        if(stop === '1'){
            return false;
        }

        var chk = document.getElementById("bond_eth"+(cellIndex-1)+"_"+rowIndex).checked;

        for(var i=0; i<grid_bond.getStore().getCount(); i++){

            if(i !== Number(rowIndex)){

                document.getElementById("bond_eth"+(cellIndex-1)+"_"+i).disabled = chk;
            }
        }

        for(var l=0; l<grid_link.getStore().getCount(); l++){

            document.getElementById("link_eth"+(cellIndex-1)+"_"+l).disabled = chk;
        }
    }

});