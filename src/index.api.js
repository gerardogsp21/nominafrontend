var Client = require('node-rest-client').Client;

let cliente = new Client();

const url_base = 'http://127.0.0.1:8000/api/';
var args = {
    data: { test: "hello" },
    headers: { "Content-Type": "application/json" }
};

function getEmployees(callback) {
   return cliente.get(url_base + "employees/", function(data, response) {
       callback(data);
   });
}

function storeEmployee(data, callback) {
	args.data = data;
   return cliente.post(url_base + "employees/", args, function(data, response) {
       callback(data);
   });
}

function getPayroolls(callback) {
   return cliente.get(url_base + "payrolls/", function(data, response) {
       callback(data);
   });
}

function storePayroll(data, callback) {
  args.data = data;
   return cliente.post(url_base + "payrolls/", args, function(data, response) {
       callback(data);
   });
}

module.exports = {
    getEmployees: getEmployees,
    storeEmployee: storeEmployee,
    getPayroolls: getPayroolls,
    storePayroll: storePayroll
}