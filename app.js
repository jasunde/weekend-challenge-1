$(document).ready(function() {
  var employeeList = [],
      $employeeTable = $('#employeeTable'),
      $employeeForm = $('#employeeForm'),
      $firstInput = $employeeForm.find('input').first(),
      monthlyPayroll;

  // Focus on first input after DOM ready
  $firstInput.focus();

  $employeeForm.on('submit', function (event) {
    event.preventDefault();

    var $this    = $(this),
        fields   = $this.serializeArray(),
        employee = {};

    // Reset the form to default settings
    this.reset();
    // Return focus to first input of form
    $firstInput.focus();

    fields.forEach(function (field){
      employee[field.name] = field.value;
    });

    employeeList.push(employee);

    addEmployeeRow(employee, $employeeTable);

    monthlyPayroll = calculateMonthlyPayroll(employeeList);
    $('#monthlyPayroll').text(monthlyPayroll.toLocaleString('en-US', {style: 'currency', currency: 'USD'}));
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

function calculateMonthlyPayroll(employees) {
  return employees.reduce(function (total, employee) {
    return total += employee.annualSalary / 12;
  }, 0);
}
