import api from '../../index.api';

$(document).ready(function() {

    function getEmployees() {
        $( ".table_employees" ).remove();
        var tr_employee = '';
        api.getEmployees(function(res) {            $.each(res, function(i, item){
                tr_employee += '<tr>' 
                + '<td>' + item.numero_identificacion + '</td>' 
                + '<td>' + item.nombres + ' ' + item.apellidos + '</td>' 
                + '<td>' + item.cargo + '</td>' 
                + '<td>' + item.salario + '</td>' 
                + '<tr>';
            });
            $('#table_employees').append(tr_employee);
        })
    }

    getEmployees();

    function storeEmployee() {
        var data = {
            numero_identificacion: $('#numero_identificacion').val(),
            nombres: $('#nombres').val(),
            apellidos: $('#apellidos').val(),
            cargo: $('#cargo').val(),
            salario: $('#salario').val()
        };
        api.storeEmployee(data, function(res) {
            $('#table_employees').append(
                 '<tr><td>' + data.numero_identificacion + '</td>' 
                + '<td>' + data.nombres + ' ' + data.apellidos + '</td>' 
                + '<td>' + data.cargo + '</td>' 
                + '<td>' + data.salario + '</td><tr>'
            );
        });
    }

    
    $("#mensaje").hide();
    $("#registrer_employee").on('submit', function(e) {
        storeEmployee();
        $("#mensaje").show();       
    });

    /*$('#btn_registrar').click(function(){
        storeEmployee();       
    });*/
});