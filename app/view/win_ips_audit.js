
Ext.define('NFW2.view.win_ips_audit', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_ips_audit',

    requires: [
        'NFW2.view.win_ips_auditViewModel',
        'Ext.form.Panel',
        'Ext.form.Label'
    ],

    viewModel: {
        type: 'win_ips_audit'
    },
    cls: 'zen_win',
    height: 650,
    id: 'win_ips_audit',
    width: 650,
    modal: true,
    defaultListenerScope: true,

    bind: {
        title: '{inspect_info}'
    },
    items: [
        {
            xtype: 'form',
            maxHeight: 610,
            scrollable: true,
            bodyPadding: 20,
            items: [
                {
                    xtype: 'label',
                    style: 'color:#2c6ed5',
                    bind: {
                        text: '{sig_info}'
                    }
                },
                {
                    xtype: 'container',
                    id: 'con_sig_info'
                },
                {
                    xtype: 'label',
                    style: 'color:#2c6ed5',
                    bind: {
                        text: '{packet_info}'
                    }
                },
                {
                    xtype: 'container',
                    id: 'con_eth_head'
                },
                {
                    xtype: 'container',
                    id: 'con_inter_ver'
                },
                {
                    xtype: 'container',
                    id: 'con_trans'
                },
                {
                    xtype: 'container',
                    id: 'con_matching'
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWin_ips_auditAfterRender'
    },

    onWin_ips_auditAfterRender: function(component, eOpts) {
        var me = this;

        var _data = me._data;

        var eth = '', inter = '', inter_v6 = '', trans = '', trans_udp = '', trans_icmp = '', _hex = '', hex = '', ascii = '';

        var sig = '<table width="100%" class="log_audit" cellpadding="3" cellspacing="1">'+
            '<thead><th>FSID</th><th width="60%">'+__zen('sig_name')+'</th><th>'+__zen('hazard')+'</th></thead>'+
            '<tbody><td align="center">'+_data.fsid+'</td><td>'+_data.sig_name+'</td><td align="center"><img src="../images/level_'+_data.hazard+'.png" style="width:24px;height:18px;" title="'+_data.hazard+'" /></td></tbody>'+
            '</table>';

        for(var i in _data){
            if(i === 'eth'){

                eth = '<table width="100%" class="log_audit" cellpadding="3" cellspacing="1"><td class="tit" style="background-color:#4f81bc">Ethernet Header</td></table>'+
                    '<table width="100%" class="log_audit" cellpadding="3" cellspacing="1">'+
                    '<thead><th width="60%">Destination Mac</th><th>Type</th></thead>'+
                    '<tbody><td align="center">'+_data[i][0]+'</td><td align="center"></td></tbody>'+
                    '</table>'+
                    '<table width="100%" class="log_audit" cellpadding="3" cellspacing="1">'+
                    '<thead><th width="60%">Source Mac</th><th>Type</th></thead>'+
                    '<tbody><td align="center">'+_data[i][1]+'</td><td align="center">'+_data[i][2]+'</td></tbody>'+
                    '</table>';
            }else if(i === 'ipv4'){

                inter = '<table width="100%" class="log_audit" cellpadding="3" cellspacing="1"><td class="tit" style="background-color:#99bc54">Internet Protocol Version 4</td></table>'+
                    '<table width="100%" class="log_audit" cellpadding="3" cellspacing="1">'+
                    '<thead><th>Version</th><th>Header length</th><th>Type of Service(TOS)</th><th width="50%">Total length</th></thead>'+
                    '<tbody><td align="center">'+_data[i][0]+'</td><td align="center">'+_data[i][1]+' bytes</td><td align="center">'+_data[i][2]+'</td><td align="center">'+_data[i][3]+' bytes</td></tbody>'+
                    '</table>'+
                    '<table width="100%" class="log_audit" cellpadding="3" cellspacing="1">'+
                    '<thead><th width="26%">Identification</th><th width="24.5%">Fragment offset</th><th>TTL</th><th>Protocol</th><th>Header checksum</th></thead>'+
                    '<tbody><td align="center">'+_data[i][4]+'</td><td align="center">'+_data[i][5]+'</td><td align="center">'+_data[i][6]+'</td><td align="center">'+_data[i][7]+'</td><td align="center">'+_data[i][8]+'</td></tbody>'+
                    '</table>'+
                    '<table width="100%" class="log_audit" cellpadding="3" cellspacing="1">'+
                    '<thead><th width="50%">Source Address</th><th width="50%">Destination Address</th></thead>'+
                    '<tbody><td align="center">'+_data[i][9]+'</td><td align="center">'+_data[i][10]+'</td></tbody>'+
                    '</table>';
            }else if(i === 'ipv6'){

                inter_v6 = '<table width="100%" class="log_audit" cellpadding="3" cellspacing="1"><td class="tit" style="background-color:#99bc54">Internet Protocol Version 6</td></table>'+
                    '<table width="100%" class="log_audit" cellpadding="3" cellspacing="1">'+
                    '<thead><th width="12.5%">Version</th><th width="12.5%">Traffic Class</th><th width="25%">Flow Label</th><th width="25%">Payload Length</th><th width="12.5%">Next header</th><th width="12.5%">Hop limit</th></thead>'+
                    '<tbody><td align="center">'+_data[i][0]+'</td><td align="center">'+_data[i][1]+'</td><td align="center">'+_data[i][2]+'</td><td align="center">'+_data[i][3]+'</td><td align="center">'+_data[i][4]+'</td><td align="center">'+_data[i][5]+'</td></tbody>'+
                    '</table>'+
                    '<table width="100%" class="log_audit" cellpadding="3" cellspacing="1">'+
                    '<thead><th>Source Address</th></thead>'+
                    '<tbody><td align="center">'+_data[i][6]+'</td></tbody>'+
                    '</table>'+
                    '<table width="100%" class="log_audit" cellpadding="3" cellspacing="1">'+
                    '<thead><th>Destination Address</th></thead>'+
                    '<tbody><td align="center">'+_data[i][7]+'</td></tbody>'+
                    '</table>';
            }else if(i === 'tcp'){

                trans = '<table width="100%" class="log_audit" cellpadding="3" cellspacing="1"><td class="tit" style="background-color:#f79647">Transmission Control Protocol</td></table>'+
                    '<table width="100%" class="log_audit" cellpadding="3" cellspacing="1">'+
                    '<thead><th>Source Port</th><th>Destination Port</th><th width="50.5%">Sequence Number</th></thead>'+
                    '<tbody><td align="center">'+_data[i][0]+'</td><td align="center">'+_data[i][1]+'</td><td align="center">'+_data[i][2]+'</td></tbody>'+
                    '</table>'+
                    '<table width="100%" class="log_audit" cellpadding="3" cellspacing="1">'+
                    '<thead><th width="50%">Acknowledgement number</th><th>Header Length</th><th width="20%">Flags</th><th width="19.9%">Window size</th></thead>'+
                    '<tbody><td align="center">'+_data[i][3]+'</td><td align="center">'+_data[i][4]+' Bytes</td><td align="center">'+_data[i][5]+'</td><td align="center">'+_data[i][6]+'</td></tbody>'+
                    '</table>';
            }else if(i === 'udp'){

                trans_udp = '<table width="100%" class="log_audit" cellpadding="3" cellspacing="1"><td class="tit" style="background-color:#f79647">User Datagram Protocol</td></table>'+
                    '<table width="100%" class="log_audit" cellpadding="3" cellspacing="1">'+
                    '<thead><th width="30%">Source Port</th><th width="30%">Destination Port</th><th width="30%">Length</th></thead>'+
                    '<tbody><td align="center">'+_data[i][0]+'</td><td align="center">'+_data[i][1]+'</td><td align="center">'+_data[i][2]+' Bytes</td></tbody>'+
                    '</table>';
            }else if(i === 'icmp'){

                trans_icmp = '<table width="100%" class="log_audit" cellpadding="3" cellspacing="1"><td class="tit" style="background-color:#f79647">Internet Control Message Protocol</td></table>'+
                    '<table width="100%" class="log_audit" cellpadding="3" cellspacing="1">'+
                    '<thead><th width="50%">Type</th><th width="50%">Code</th></thead>'+
                    '<tbody><td align="center">'+_data[i][0]+'</td><td align="center">'+_data[i][1]+'</td></tbody>'+
                    '</table>';
            }else if(i === 'hexdata'){

                var match = (_data.match)?_data.match:[];
                var _h = 0;
                _hex = '<table width="100%" class="log_audit" cellpadding="3" cellspacing="0">';
                hex = '<table width="100%" class="log_audit" cellpadding="3" cellspacing="0">';
                for(var l=0; l<_data[i].length; l++){
                    var style = 'background:#fff';
                    for(var m=0; m<match.length; m++){
                        var _min = match[m][0];
                        var _max = match[m][1];
                        if(l > Number(_min) && l <= Number(_max)){ style = 'background:#7fd6a7'; }
                    }
                    if(l%16 === 0){ hex += '<tr>'; var _h_16 = _h.toString(16); _h_16 = (_h_16.length===1)?'00'+_h_16:'0'+_h_16; _hex += '<tr><td style="background:#fff">'+_h_16+'0</td></tr>'; _h++; }
                    if(l!==0 && l%8 === 0 && l%16 !== 0){ hex += '<td style="background:#fff">&nbsp;</td>'; }
                    hex += '<td align="center" style="'+style+'">'+_data[i][l]+'</td>';
                    if(l!==0 && (l+1)%16 === 0 || l+1 === _data[i].length){ hex += '</tr>'; }
                }
                _hex += '</table>';
                hex += '</table>';
            }else if(i === 'asciidata'){

                var match = (_data.match)?_data.match:[];
                ascii = '<table width="100%" class="log_audit" cellpadding="1" cellspacing="0">';
                for(var l=0; l<_data[i].length; l++){
                    var style = 'background:#fff';
                    for(var m=0; m<match.length; m++){
                        var _min = match[m][0];
                        var _max = match[m][1];
                        if(l > Number(_min) && l <= Number(_max)){ style = 'background:#7fd6a7'; }
                    }
                    if(l%16 === 0){ ascii += '<tr>'; }
                    if(l!==0 && l%8 === 0 && l%16 !== 0){ ascii += '<td style="background:#fff">&nbsp;</td>'; }
                    ascii += '<td align="center" style="'+style+'">'+_data[i][l]+'</td>';
                    if(l!==0 && (l+1)%16 === 0 || l+1 === _data[i].length){ ascii += '</tr>'; }
                }
                ascii += '</table>';
            }
            Ext.getCmp("con_sig_info").update(sig);
            Ext.getCmp("con_eth_head").update(eth);
            Ext.getCmp("con_inter_ver").update(inter+inter_v6);
            Ext.getCmp("con_trans").update(trans+trans_udp+trans_icmp);
            Ext.getCmp("con_matching").update('<table width="100%"><tr><td width="10%">'+_hex+'</td><td width="5%">&nbsp;</td><td width="60%">'+hex+'</td><td width="5%">&nbsp;</td><td width="20%">'+ascii+'</td></tr></table>');
        }
    }

});