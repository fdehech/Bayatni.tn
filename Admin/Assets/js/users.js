document.addEventListener('DOMContentLoaded', function() {

    const selectAllCheckbox = document.getElementById('select-all');
    const userCheckboxes = document.querySelectorAll('.user-select');
    
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            userCheckboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
    }
    

    userCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {

            const allChecked = Array.from(userCheckboxes).every(cb => cb.checked);
            const anyChecked = Array.from(userCheckboxes).some(cb => cb.checked);
            
            if (selectAllCheckbox) {
                selectAllCheckbox.checked = allChecked;
                selectAllCheckbox.indeterminate = anyChecked && !allChecked;
            }
        });
    });
    

    const filterBtn = document.querySelector('.filter-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {

            console.log('Filtering users...');
            
            const roleFilter = document.getElementById('role-filter').value;
            const statusFilter = document.getElementById('status-filter').value;
            const dateJoined = document.getElementById('date-joined').value;
            
            console.log('Filters applied:', {
                role: roleFilter,
                status: statusFilter,
                dateJoined: dateJoined
            });
            

            filterBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Applying...';
            setTimeout(() => {
                filterBtn.innerHTML = '<i class="fas fa-filter"></i> Apply Filters';
                alert('Filters applied successfully!');
            }, 1000);
        });
    }
    

});