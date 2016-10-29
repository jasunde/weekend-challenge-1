$(document).ready(function() {
  var employeeList = [],
      $employeeTable = $('#employeeTable');

  $('#employeeForm').on('submit', function (event) {
    event.preventDefault();
    $this = $(this);

    var fields = $this.serializeArray(),
        employee = {};

    this.reset();

    fields.forEach(function (field){
      employee[field.name] = field.value;
    });

    employeeList.push(employee);

    addEmployeeRow(employee, $employeeTable);
  });
});

function addEmployeeRow(employee, $table) {
  var $tr = $('<tr></tr>').attr('id', 'e' + employee.idNumber);
  addCell(employee.firstName, $tr);
  addCell(employee.lastName, $tr);
  addCell(employee.idNumber, $tr);
  addCell(employee.jobTitle, $tr);
  addCell(employee.annualSalary, $tr);
  $table.append($tr);
}

function addCell(data, $row) {
  $row.append($('<td>' + data + '</td>'));
}
