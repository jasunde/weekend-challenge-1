$(document).ready(function() {
  var employeeList = [],
      $employeeTable = $('#employeeTable'),
      $employeeForm = $('#employeeForm'),
      $firstInput = $employeeForm.find('input').first(),
      monthlyPayroll,
      employeeCounter = 0;

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

    // Convert form data to employee object
    fields.forEach(function (field){
      employee[field.name] = field.value;
    });

    // Add unique identifier to employee
    employee.employeeCounter = employeeCounter;
    employeeCounter++;

    // Add employee object to employeeList
    employeeList.push(employee);

    // Add a new row to table with employee data
    addEmployeeRow(employee, $employeeTable);

    // Calculate the monthly payroll total for all employees
    monthlyPayroll = calculateMonthlyPayroll(employeeList);

    // Change monthly salary expenditures total on page
    $('#monthlyPayroll').text(monthlyPayroll.toLocaleString('en-US', {style: 'currency', currency: 'USD'}));
  });

  $employeeTable.on('click', '.delete', function () {
    $(this).closest('tr').remove();
  })
});

function addEmployeeRow(employee, $table) {
  var $tr = $('<tr></tr>').attr('id', 'e' + employee.employeeCounter);
  addCell(employee.firstName, $tr);
  addCell(employee.lastName, $tr);
  addCell(employee.idNumber, $tr);
  addCell(employee.jobTitle, $tr);
  addCell(employee.annualSalary, $tr);
  $tr.append('<td><button class="delete">Delete</button></td>');
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
