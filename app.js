$(document).ready(function() {
  var employeeList = [],
      $employeeTable = $('#employeeTable'),
      $employeeForm = $('#employeeForm'),
      $monthlyPayroll = $('#monthlyPayroll'),
      $firstInput = $employeeForm.find('input').first(),
      monthlyPayroll,
      employeeCounter = 0;

  // Focus on first input after DOM ready
  $firstInput.focus();


  // Add employee to DOM and employeeList
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
    employee.employeeCounter = 'e' + employeeCounter;
    employeeCounter++;

    // Add employee object to employeeList
    employeeList.push(employee);

    // Add a new row to table with employee data
    addEmployeeRow(employee, $employeeTable);

    adjustMonthlyPayroll(employeeList, $monthlyPayroll);
  });


  // Remove employee from DOM and employeeList
  $employeeTable.on('click', '.delete', function () {
    var $row = $(this).closest('tr');

    employeeList = employeeList.filter(function (employee) {
      return employee.employeeCounter !== $row.data('employeeCounter');
    });

    $row.remove();

    adjustMonthlyPayroll(employeeList, $monthlyPayroll);
  });
});

// Object, jQuery Table -> void
// Append tr with cells of supplied employee to supplied table
function addEmployeeRow(employee, $table) {
  var $tr = $('<tr></tr>').data('employeeCounter', employee.employeeCounter);
  addCell(employee.firstName, $tr);
  addCell(employee.lastName, $tr);
  addCell(employee.idNumber, $tr);
  addCell(employee.jobTitle, $tr);
  addCell(employee.annualSalary, $tr);
  $tr.append('<td><button class="delete">Delete</button></td>');
  $table.append($tr);
}

// Variable, jQuery Table Row -> void
// Append new td with given data to given tr
function addCell(data, $row) {
  $row.append($('<td>' + data + '</td>'));
}

// Array of Employee objects -> Number
// Calculate the monthly payroll expense for the given list of employees
function calculateMonthlyPayroll(employees) {
  return employees.reduce(function (total, employee) {
    return total += employee.annualSalary / 12;
  }, 0);
}

// Array of Employee Objects, jQuery HTMLElement -> void
// Change the monthly payroll total according to the given list of employees
function adjustMonthlyPayroll(employees, $total) {
    // Calculate the monthly payroll total for all employees
    monthlyPayroll = calculateMonthlyPayroll(employees);

    // Change monthly salary expenditures total on page
    $total.text(monthlyPayroll.toLocaleString('en-US', {style: 'currency', currency: 'USD'}));
}
