// Toggle user dropdown
const userMenu = document.getElementById('userMenu');
const userDropdown = document.getElementById('userDropdown');

userMenu.addEventListener('click', () => {
  userDropdown.classList.toggle('hidden');
});

// Handle logout button
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', () => {
  // Add logout logic here (e.g., clear session, redirect to login page)
  window.location.href = '/login';
});

// Fetch live data from the backend
async function fetchDashboardData() {
  try {
    const response = await fetch('/api/dashboard');
    const data = await response.json();
    updateDashboard(data);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  }
}

// Update the dashboard with live data
function updateDashboard(data) {
  document.getElementById('totalUsers').textContent = data.totalUsers;
  document.getElementById('activeSessions').textContent = data.activeSessions;
  document.getElementById('totalRevenue').textContent = `$${data.totalRevenue}`;
  document.getElementById('activeTrainers').textContent = data.activeTrainers;

  // Update recent activity
  const recentActivity = document.getElementById('recentActivity');
  recentActivity.innerHTML = data.recentActivity
    .map(
      (activity) => `
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <img src="${activity.userImage}" alt="User" class="h-10 w-10 rounded-full">
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-900">${activity.userName}</p>
            <p class="text-sm text-gray-500">${activity.description}</p>
            <p class="text-xs text-gray-400 mt-1">${activity.time}</p>
          </div>
        </div>
      `
    )
    .join('');
}

// Fetch data on page load
fetchDashboardData();