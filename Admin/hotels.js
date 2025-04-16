document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterBtn = document.querySelector('.filter-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            // In a real application, this would filter the hotels based on the selected criteria
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
            
            // Simulate loading
            filterBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Applying...';
            setTimeout(() => {
                filterBtn.innerHTML = '<i class="fas fa-filter"></i> Apply Filters';
                alert('Filters applied successfully!');
            }, 1000);
        });
    }
    
    // Hotel action buttons
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
                    // In a real application, this would delete the hotel
                    alert(`${hotelName} has been deleted.`);
                }
            }
        });
    });
    
    // Pagination
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('active') && !this.classList.contains('prev') && !this.classList.contains('next')) {
                document.querySelector('.pagination-btn.active').classList.remove('active');
                this.classList.add('active');
                
                // In a real application, this would load the corresponding page
                console.log(`Loading page ${this.textContent}`);
            } else if (this.classList.contains('prev')) {
                console.log('Loading previous page');
            } else if (this.classList.contains('next')) {
                console.log('Loading next page');
            }
        });
    });
    
    // Add New Hotel button
    const addHotelBtn = document.querySelector('.primary-btn');
    if (addHotelBtn) {
        addHotelBtn.addEventListener('click', function() {
            console.log('Adding new hotel...');
            alert('Add New Hotel form would open here.');
        });
    }
});