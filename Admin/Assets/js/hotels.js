document.addEventListener('DOMContentLoaded', function() {

    const filterBtn = document.querySelector('.filter-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {

            console.log('Filtering hotels...');
            
            const locationFilter = document.getElementById('location-filter').value;
            const statusFilter = document.getElementById('status-filter').value;
            const ratingFilter = document.getElementById('rating-filter').value;
            const sortBy = document.getElementById('sort-by').value;
            
            console.log('Filters applied:', {
                location: locationFilter,
                status: statusFilter,
                rating: ratingFilter,
                sortBy: sortBy
            });
            
            filterBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Applying...';
            setTimeout(() => {
                filterBtn.innerHTML = '<i class="fas fa-filter"></i> Apply Filters';
                alert('Filters applied successfully!');
            }, 1000);
        });
    }
    
    const actionButtons = document.querySelectorAll('.hotel-actions .action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const hotelName = this.closest('.hotel-item').querySelector('h3').textContent;
            
            if (this.classList.contains('view-btn')) {
                console.log(`Viewing hotel: ${hotelName}`);
                alert(`Viewing details for ${hotelName}`);
            } else if (this.classList.contains('edit-btn')) {
                console.log(`Editing hotel: ${hotelName}`);
                alert(`Editing ${hotelName}`);
            } else if (this.classList.contains('delete-btn')) {
                console.log(`Deleting hotel: ${hotelName}`);
                if (confirm(`Are you sure you want to delete ${hotelName}?`)) {

                    alert(`${hotelName} has been deleted.`);
                }
            }
        });
    });
    
    
});