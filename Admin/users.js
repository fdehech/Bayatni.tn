document.addEventListener('DOMContentLoaded', function() {
    // Select all checkbox functionality
    const selectAllCheckbox = document.getElementById('select-all');
    const userCheckboxes = document.querySelectorAll('.user-select');
    
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            userCheckboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
    }
    
    // Individual checkbox change event
    userCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Check if all checkboxes are checked
            const allChecked = Array.from(userCheckboxes).every(cb => cb.checked);
            const anyChecked = Array.from(userCheckboxes).some(cb => cb.checked);
            
            if (selectAllCheckbox) {
                selectAllCheckbox.checked = allChecked;
                selectAllCheckbox.indeterminate = anyChecked && !allChecked;
            }
        });
    });
    
    // Bulk actions
    const bulkActionSelect = document.getElementById('bulk-action');
    const applyBtn = document.querySelector('.apply-btn');
    
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            const selectedAction = bulkActionSelect.value;
            if (!selectedAction) {
                alert('Please select an action to apply.');
                return;
            }
            
            const selectedUsers = Array.from(userCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.closest('tr').querySelector('td:nth-child(3) .user-info-cell span').textContent);
            
            if (selectedUsers.length === 0) {
                alert('Please select at least one user.');
                return;
            }
            
            console.log(`Applying ${selectedAction} to users:`, selectedUsers);
            
            switch (selectedAction) {
                case 'activate':
                    alert(`Activating ${selectedUsers.length} users.`);
                    break;
                case 'deactivate':
                    if (confirm(`Are you sure you want to deactivate ${selectedUsers.length} users?`)) {
                        alert(`Deactivated ${selectedUsers.length} users.`);
                    }
                    break;
                case 'delete':
                    if (confirm(`Are you sure you want to delete ${selectedUsers.length} users? This action cannot be undone.`)) {
                        alert(`Deleted ${selectedUsers.length} users.`);
                    }
                    break;
                case 'export':
                    alert(`Exporting data for ${selectedUsers.length} users.`);
                    break;
            }
        });
    }
    
    // Filter functionality
    const filterBtn = document.querySelector('.filter-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            // In a real application, this would filter the users based on the selected criteria
            console.log('Filtering users...');
            
            const roleFilter = document.getElementById('role-filter').value;
            const statusFilter = document.getElementById('status-filter').value;
            const dateJoined = document.getElementById('date-joined').value;
            
            console.log('Filters applied:', {
                role: roleFilter,
                status: statusFilter,
                dateJoined: dateJoined
            });
            
            // Simulate loading
            filterBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Applying...';
            setTimeout(() => {
                filterBtn.innerHTML = '<i class="fas fa-filter"></i> Apply Filters';
                alert('Filters applied successfully!');
            }, 1000);
        });
    }
    
    // User action buttons
    const actionButtons = document.querySelectorAll('.action-buttons .action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.closest('tr').querySelector('td:nth-child(2)').textContent;
            const userName = this.closest('tr').querySelector('td:nth-child(3) .user-info-cell span').textContent;
            
            if (this.classList.contains('view-btn')) {
                console.log(`Viewing user: ${userName} (${userId})`);
                alert(`Viewing details for user ${userName}`);
            } else if (this.classList.contains('edit-btn')) {
                console.log(`Editing user: ${userName} (${userId})`);
                alert(`Editing user ${userName}`);
            } else if (this.classList.contains('delete-btn')) {
                console.log(`Deleting user: ${userName} (${userId})`);
                if (confirm(`Are you sure you want to delete user ${userName}?`)) {
                    // In a real application, this would delete the user
                    alert(`User ${userName} has been deleted.`);
                }
            }
        });
    });
    
    // Add New User button
    const addUserBtn = document.querySelector('.primary-btn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', function() {
            console.log('Adding new user...');
            alert('Add New User form would open here.');
        });
    }
});