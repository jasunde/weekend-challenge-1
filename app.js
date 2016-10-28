$(document).ready(function() {
  var employeeList = [];

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

    console.log(employeeList);
  });
});
