import api from '../../index.api';

$(document).ready(function() {
    var employess = [];
    $('#sueldo_minimo').val(828116);
    $('#aux_transp').val(97032);

    function getPayroolls() {
        api.getEmployees(function(emp) {
            employess = emp;
            $.each(employess, function(i, item){
                 $("#empleado_id").append('<option value="'+item.id+'">'+item.nombres + ' '+ item.apellidos+'</option>');
            });
        })
        var tr_payrolls = '';
        api.getPayroolls(function(res) {

            res.map(elemt => {
                var eployee_find = buscarInArray(employess, 'id', elemt.empleado_id);
                if (eployee_find.length> 0) {
                    elemt.employee = eployee_find[0].nombres + ' ' + eployee_find[0].apellidos;
                }
            });
            console.log(res);
            $.each(res, function(i, item){
                tr_payrolls += '<tr>' 
                + '<td>' + item.employee + '</td>' 
                + '<td>' + item.dias_laborados + '</td>' 
                + '<td>' + item.sueldo + '</td>' 
                + '<td>' + item.auxlio_transporte + '</td>' 
                + '<td>' + item.total_devengado + '</td>' 
                + '<td>' + item.salud + '</td>' 
                + '<td>' + item.pension + '</td>' 
                + '<td>' + item.fsp + '</td>' 
                + '<td>' + item.total_deducido + '</td>' 
                + '<td>' + item.neto_pagar + '</td>' 
                + '<tr>';
            });
            $('#table_payrolls').append(tr_payrolls);
        })
    }

    getPayroolls();

    function storePayroll() {
        var data = {
            empleado_id: $('#empleado_id').val(),
            dias_laborados: $('#dias_laborados').val(),
            sueldo: $('#sueldo').val(),
            auxlio_transporte: $('#auxlio_transporte').val(),
            total_devengado: $('#total_devengado').val(),
            salud: $('#salud').val(),
            pension: $('#pension').val(),
            fsp: $('#fsp').val(),
            total_deducido: $('#total_deducido').val(),
            neto_pagar: $('#neto_pagar').val()
        };
        api.storePayroll(data, function(res) {
        });
    }

    function calcular() {
        console.log('Calculando');
        var salario = !$("#salario").val() ? 0 : $("#salario").val() 
        var sueldo_minimo = !$('#sueldo_minimo').val() ? 0 : $("#sueldo_minimo").val();
        var aux_transp = !$('#aux_transp').val() ? 0 : $("#aux_transp").val();
        var campos = {
            dias_laborados: !$('#dias_laborados').val() ? 0 : $('#dias_laborados').val(),
            sueldo: !$('#sueldo').val() ? 0 : $('#sueldo').val(),
            auxlio_transporte: !$('#auxlio_transporte').val() ? 0 : $('#auxlio_transporte').val(),
            total_devengado: !$('#total_devengado').val() ? 0 : $('#total_devengado').val(),
            salud: !$('#salud').val() ? 0 : $('#salud').val(),
            pension: !$('#pension').val() ? 0 : $('#pension').val(),
            fsp: !$('#fsp').val() ? 0 : $('#fsp').val(),
            total_deducido: !$('#total_deducido').val() ? 0 : $('#total_deducido').val(),
            neto_pagar: !$('#neto_pagar').val() ? 0 : $('#neto_pagar').val()
        };
        var sueldo =  !salario || !campos.dias_laborados  ? 0 : (salario / 30) * campos.dias_laborados;
        $('#sueldo').val(sueldo.toFixed(2) )

        var auxlio_transporte = (salario > (sueldo_minimo * 2)) ? 0 : (aux_transp/30)*campos.dias_laborados;
        $('#auxlio_transporte').val(auxlio_transporte.toFixed(2) );

        var total_devengado = parseFloat(sueldo + auxlio_transporte);
        $('#total_devengado').val(total_devengado.toFixed(2));

        var salud = !sueldo ? 0 : parseFloat(sueldo * 0.04);
        $('#salud').val(salud.toFixed(2));

        var pension = !sueldo ? 0 : parseFloat(sueldo * 0.04);
        $('#pension').val(pension.toFixed(2));

        var fsp = (salario < (sueldo_minimo * 4)) ? 0 : (sueldo * 0.01);
        $('#fsp').val(fsp.toFixed(2));

        var total_deducido = parseFloat(salud + pension + fsp);
        $('#total_deducido').val(total_deducido.toFixed(2));

        var neto_pagar = parseFloat(total_devengado - total_deducido);
        $('#neto_pagar').val(neto_pagar.toFixed(2));
    }

    
    $("#mensaje").hide();
    $("#registrer_payrolls").on('submit', function(e) {
        storePayroll();
        $("#mensaje").show();       
    });

    $( "#empleado_id").change(function(elem) {
        var empleado_id = $("#empleado_id").val();
        console.log(empleado_id);
        var empleado_encontrado = buscarInArray(employess, 'id',empleado_id);

        if(empleado_encontrado.length > 0) {
            $("#salario").val(empleado_encontrado[0].salario);
        }
    });

    function buscarInArray(array, property, value) {
        var filtro = jQuery.grep(array, function( obj ) {
          return obj[property] == value;
        });
        return filtro;
    }

    $("#salario, #empleado_id, #sueldo_minimo, #dias_laborados, #sueldo, #auxlio_transporte, #total_devengado, #salud, #pension, #fsp, #total_deducido, #neto_pagar" )
    .change(function() {
        calcular();
    });

    /*$('#btn_registrar').click(function(){
        storeEmployee();       
    });*/
});