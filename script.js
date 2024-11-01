// Load applications from local storage
document.addEventListener('DOMContentLoaded', loadApplications);

// Add event listener for form submission
document.getElementById('job-application-form').addEventListener('submit', addApplication);

// Add event listener for search and filter
document.getElementById('search').addEventListener('input', filterApplications);
document.getElementById('filter-status').addEventListener('change', filterApplications);

let editIndex = -1; // Track the index of the application being edited

function loadApplications() {
    const applications = JSON.parse(localStorage.getItem('jobApplications')) || [];
    applications.forEach(displayApplication);
}

function addApplication(e) {
    e.preventDefault();

    const jobTitle = document.getElementById('job-title').value;
    const company = document.getElementById('company').value;
    const deadline = document.getElementById('deadline').value;
    const notes = document.getElementById('notes').value;

    const application = { jobTitle, company, deadline, notes, status: 'Applied' };

    let applications = JSON.parse(localStorage.getItem('jobApplications')) || [];
    
    if (editIndex > -1) {
        applications[editIndex] = application; // Update existing application
        editIndex = -1; // Reset index
    } else {
        applications.push(application); // Add new application
    }

    localStorage.setItem('jobApplications', JSON.stringify(applications));
    clearForm();
    displayApplications(applications);
}

function displayApplications(applications) {
    const list = document.getElementById('application-list');
    list.innerHTML = ''; // Clear current list

    applications.forEach((application, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <div>
                <strong>${application.jobTitle}</strong> at <em>${application.company}</em>
                <br> Deadline: ${application.deadline}
                <br> Notes: ${application.notes}
                <span class="status ${application.status.toLowerCase()}">${application.status}</span>
            </div>
            <button class="edit-button" onclick="editApplication(${index})">Edit</button>
            <button onclick="deleteApplication(${index})">Delete</button>
        `;

        list.appendChild(listItem);
    });
}

function editApplication(index) {
    const applications = JSON.parse(localStorage.getItem('jobApplications'));
    const application = applications[index];

    // Fill the form with the application data
    document.getElementById('job-title').value = application.jobTitle;
    document.getElementById('company').value = application.company;
    document.getElementById('deadline').value = application.deadline;
    document.getElementById('notes').value = application.notes;

    editIndex = index; // Set the index to edit
}

function deleteApplication(index) {
    let applications = JSON.parse(localStorage.getItem('jobApplications'));
    applications.splice(index, 1); // Remove application
    localStorage.setItem('jobApplications', JSON.stringify(applications));
    displayApplications(applications);
}

function filterApplications() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const statusFilter = document.getElementById('filter-status').value;

    let applications = JSON.parse(localStorage.getItem('jobApplications')) || [];
    
    // Filter by search and status
    const filtered = applications.filter(app => {
        const matchesSearch = app.jobTitle.toLowerCase().includes(searchQuery);
        const matchesStatus = statusFilter ? app.status === statusFilter : true;
        return matchesSearch && matchesStatus;
    });

    displayApplications(filtered);
}

function clearForm() {
    document.getElementById('job-application-form').reset(); // Reset form fields
}
