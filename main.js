document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('studentForm');
    var tableBody = document.getElementById('studentTableBody');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var formData = new FormData(form);
        console.log('FormData:', formData); // Log formData to see if it's capturing the correct values
        var studentData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            address: formData.get('address'),
            birthDate: formData.get('birthDate'),
            position: formData.get('position'),
            typePosition: formData.get('typePosition'),
            salary: parseFloat(formData.get('salary')),
            isMarried: formData.get('isMarried') === 'on' ? true : false,
        };
        console.log('StudentData:', studentData); // Log studentData to check the values
        // Display student data in table
        displayStudentData(studentData);
        // Save student data to localStorage
        saveStudentData(studentData);
    });
    // Load existing student data from localStorage when page loads
    loadStudentData();
    function displayStudentData(student) {
        var row = tableBody.insertRow();
        row.innerHTML = "\n            <td>".concat(student.firstName, "</td>\n            <td>").concat(student.lastName, "</td>\n            <td>").concat(student.address, "</td>\n            <td>").concat(student.birthDate, "</td>\n            <td>").concat(student.position, "</td>\n            <td>").concat(student.typePosition, "</td>\n            <td>").concat(student.salary, "</td>\n            <td>").concat(student.isMarried ? 'Yes' : 'No', "</td>\n        ");
    }
    function saveStudentData(student) {
        var students = JSON.parse(localStorage.getItem('students') || '[]');
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
    }
    function loadStudentData() {
        var studentsJSON = localStorage.getItem('students');
        if (studentsJSON) {
            var students = JSON.parse(studentsJSON);
            students.forEach(function (student) { return displayStudentData(student); });
        }
    }
});
