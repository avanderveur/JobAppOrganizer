// Load applications from local storage
document.addEventListener('DOMContentLoaded', loadApplications);

// Add event listener for form submission
document.getElementById('job-application-form').addEventListener('submit', addApplication);

// Add event listener for search
document.getElementById('search').addEventListener('input', searchApplications);

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
    
    const applications = JSON.parse(localStorage.getItem('jobApplications')) || [];
    applications.push(application);
    localStorage.setItem('jobApplications', JSON.stringify(applications));

    displayApplication(application);
    document.getElementById('job-application-form').reset();
}

function displayApplication(application) {
    const list = document.getElementById('application-list');
    const listItem = document.createElement('li');

    listItem.innerHTML = `
        <div>
            <strong>${application.jobTitle}</strong> at <em>${application.company}</em> 
            <br> Deadline: ${application.deadline}
            <br> Notes: ${application.notes}
            <span class="status applied">${application.status}</span>
        </div>
        <button onclick="deleteApplication(this)">Delete</button>
    `;

    list.appendChild(listItem);
}

function deleteApplication(button) {
    const listItem = button.parentElement;
    const jobTitle = listItem.children[0].children[0].textContent; // Extract job title to identify
    let applications = JSON.parse(localStorage.getItem('jobApplications'));
    applications = applications.filter(app => app.jobTitle !== jobTitle);
    localStorage.setItem('jobApplications', JSON.stringify(applications));
    listItem.remove();
}

function searchApplications() {
    const query = document.getElementById('search').value.toLowerCase();
    const applications = JSON.parse(localStorage.getItem('jobApplications')) || [];
    const filtered = applications.filter(app => app.jobTitle.toLowerCase().includes(query));
    document.getElementById('application-list').innerHTML = '';
    filtered.forEach(displayApplication);
}
