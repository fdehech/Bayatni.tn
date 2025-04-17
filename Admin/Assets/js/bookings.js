document.addEventListener('DOMContentLoaded', function() {

    const selectAllCheckbox = document.getElementById('select-all');
    const bookingCheckboxes = document.querySelectorAll('.booking-select');
    
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            bookingCheckboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
    }
    

    bookingCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {

            const allChecked = Array.from(bookingCheckboxes).every(cb => cb.checked);
            const anyChecked = Array.from(bookingCheckboxes).some(cb => cb.checked);
            
            if (selectAllCheckbox) {
                selectAllCheckbox.checked = allChecked;
                selectAllCheckbox.indeterminate = anyChecked && !allChecked;
            }
        });
    });
    

    const bulkActionSelect = document.getElementById('bulk-action');
    const applyBtn = document.querySelector('.apply-btn');
    
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            const selectedAction = bulkActionSelect.value;
            if (!selectedAction) {
                alert('Please select an action to apply.');
                return;
            }
            
            const selectedBookings = Array.from(bookingCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.closest('tr').querySelector('td:nth-child(2)').textContent);
            
            if (selectedBookings.length === 0) {
                alert('Please select at least one booking.');
                return;
            }
            
            console.log(`Applying ${selectedAction} to bookings:`, selectedBookings);
            
            switch (selectedAction) {
                case 'confirm':
                    alert(`Confirming ${selectedBookings.length} bookings.`);
                    break;
                case 'cancel':
                    if (confirm(`Are you sure you want to cancel ${selectedBookings.length} bookings?`)) {
                        alert(`Cancelled ${selectedBookings.length} bookings.`);
                    }
                    break;
                case 'delete':
                    if (confirm(`Are you sure you want to delete ${selectedBookings.length} bookings? This action cannot be undone.`)) {
                        alert(`Deleted ${selectedBookings.length} bookings.`);
                    }
                    break;
                case 'export':
                    alert(`Exporting ${selectedBookings.length} bookings.`);
                    break;
            }
        });
    }
    

    const filterBtn = document.querySelector('.filter-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {

            console.log('Filtering bookings...');
            
            const dateRange = document.getElementById('date-range').value;
            const hotelFilter = document.getElementById('hotel-filter').value;
            const statusFilter = document.getElementById('status-filter').value;
            
            console.log('Filters applied:', {
                dateRange: dateRange,
                hotel: hotelFilter,
                status: statusFilter
            });
            
            filterBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Applying...';
            setTimeout(() => {
                filterBtn.innerHTML = '<i class="fas fa-filter"></i> Apply Filters';
                alert('Filters applied successfully!');
            }, 1000);
        });
    }
    
    const actionButtons = document.querySelectorAll('.action-buttons .action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookingId = this.closest('tr').querySelector('td:nth-child(2)').textContent;
            
            if (this.classList.contains('edit-btn')) {
                console.log(`Editing booking: ${bookingId}`);
            } else if (this.classList.contains('delete-btn')) {
                console.log(`Deleting booking: ${bookingId}`);
                if (confirm(`Are you sure you want to delete booking ${bookingId}?`)) {
                    alert(`Booking ${bookingId} has been deleted.`);
                }
            }
        });
    });
    
});