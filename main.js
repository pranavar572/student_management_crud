
let students = [];

if (sessionStorage.getItem("students")) {
    students = JSON.parse(sessionStorage.getItem("students"));
}

displayStudents();

studentsForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const student = {
        studentid: studentid.value.trim(),
        studentName: studentName.value.trim(),
        course: course.value,
        department: department.value,
        marks: marks.value
    };

    const editIndex = editStatus.value;

    if (editIndex === "") {
        students.push(student);
    } else {
        students[Number(editIndex)] = student;
        editStatus.value = "";
    }

    sessionStorage.setItem("students", JSON.stringify(students));

    studentsForm.reset();
    displayStudents();
});

function displayStudents(studentList = students) {
    tableBody.innerHTML = "";

    studentList.forEach((item) => {
        const index = students.indexOf(item);

        tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.studentid}</td>
                <td>${item.studentName}</td>
                <td>${item.course}</td>
                <td>${item.department}</td>
                <td>${item.marks}</td>
                <td class="text-center">
                    <button onclick="editStudent(${index})"
                        class="btn btn-warning btn-sm">
                        Edit
                    </button>

                    <button onclick="deleteStudent(${index})"
                        class="btn btn-danger btn-sm">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

function editStudent(index) {
    const student = students[index];

    studentid.value = student.studentid;
    studentName.value = student.studentName;
    course.value = student.course;
    department.value = student.department;
    marks.value = student.marks;

    editStatus.value = index;
}

function deleteStudent(index) {
    students.splice(index, 1);

    sessionStorage.setItem("students", JSON.stringify(students));

    applyFilters();
}

function applyFilters() {
    const search = searchStudent.value.toLowerCase().trim();
    const selectedCourse = filterCourse.value;

    const filteredStudents = students.filter((item) => {
        const matchesName = item.studentName
            .toLowerCase()
            .includes(search);

        const matchesCourse =
            selectedCourse === "all" ||
            item.course === selectedCourse;

        return matchesName && matchesCourse;
    });

    displayStudents(filteredStudents);
}

searchStudent.addEventListener("input", applyFilters);

filterCourse.addEventListener("change", applyFilters);
