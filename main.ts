interface Student {
    firstName: string;
    lastName: string;
    address: string;
    birthDate: string;
    position: string;
    typePosition: string;
    salary: number;
    isMarried: boolean;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('studentForm') as HTMLFormElement;
    const tableBody = document.getElementById('studentTableBody') as HTMLTableSectionElement;
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const formData = new FormData(form);
        console.log('FormData:', formData); // Log formData to see if it's capturing the correct values
        
        const studentData: Student = {
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            address: formData.get('address') as string,
            birthDate: formData.get('birthDate') as string,
            position: formData.get('position') as string,
            typePosition: formData.get('typePosition') as string,
            salary: parseFloat(formData.get('salary') as string),
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

    function displayStudentData(student: Student) {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.address}</td>
            <td>${student.birthDate}</td>
            <td>${student.position}</td>
            <td>${student.typePosition}</td>
            <td>${student.salary}</td>
            <td>${student.isMarried ? 'Yes' : 'No'}</td>
        `;
    }

    function saveStudentData(student: Student) {
        let students: Student[] = JSON.parse(localStorage.getItem('students') || '[]');
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
    }

    function loadStudentData() {
        const studentsJSON = localStorage.getItem('students');
        if (studentsJSON) {
            const students: Student[] = JSON.parse(studentsJSON);
            students.forEach(student => displayStudentData(student));
        }
    }
});
