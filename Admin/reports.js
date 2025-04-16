document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    initRevenueOverviewChart();
    initBookingsByHotelChart();
    initOccupancyRateChart();
    initBookingSourcesChart();
    initRoomTypesChart();
    
    // Date preset buttons
    const datePresetBtns = document.querySelectorAll('.date-preset-btn');
    datePresetBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            datePresetBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show/hide custom date range inputs
            const customDateRange = document.querySelector('.custom-date-range');
            if (this.textContent.trim() === 'Custom') {
                customDateRange.style.display = 'flex';
            } else {
                customDateRange.style.display = 'none';
                
                // In a real application, this would update the report data based on the selected date range
                console.log(`Date range changed to: ${this.textContent.trim()}`);
                updateAllCharts(this.textContent.trim());
            }
        });
    });
    
    // Apply custom date range
    const applyDateBtn = document.querySelector('.apply-date-btn');
    if (applyDateBtn) {
        applyDateBtn.addEventListener('click', function() {
            const startDate = document.getElementById('start-date').value;
            const endDate = document.getElementById('end-date').value;
            
            if (!startDate || !endDate) {
                alert('Please select both start and end dates.');
                return;
            }
            
            if (new Date(startDate) > new Date(endDate)) {
                alert('Start date must be before end date.');
                return;
            }
            
            // In a real application, this would update the report data based on the selected date range
            console.log(`Custom date range applied: ${startDate} to ${endDate}`);
            updateAllCharts(`${startDate} to ${endDate}`);
        });
    }
    
    // Export Data button
    const exportDataBtn = document.querySelector('.secondary-btn');
    if (exportDataBtn) {
        exportDataBtn.addEventListener('click', function() {
            console.log('Exporting data...');
            alert('Data export started. The file will be downloaded shortly.');
        });
    }
    
    // Print Report button
    const printReportBtn = document.querySelector('.primary-btn');
    if (printReportBtn) {
        printReportBtn.addEventListener('click', function() {
            console.log('Printing report...');
            window.print();
        });
    }
    
    // Chart action buttons
    const chartActions = document.querySelectorAll('.chart-action');
    chartActions.forEach(action => {
        action.addEventListener('click', function() {
            // Remove active class from all buttons in the same group
            const buttons = this.parentElement.querySelectorAll('.chart-action');
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // In a real application, this would update the chart data
            const chartTitle = this.closest('.chart-header').querySelector('h3').textContent;
            console.log(`Chart view changed for ${chartTitle} to: ${this.textContent.trim()}`);
            
            // Update the corresponding chart
            const chartContainer = this.closest('.chart-container');
            const chartId = chartContainer.querySelector('.chart').id;
            updateChart(chartId, this.textContent.trim());
        });
    });
    
    // Table action buttons
    const tableActions = document.querySelectorAll('.table-action');
    tableActions.forEach(action => {
        action.addEventListener('click', function() {
            // Remove active class from all buttons in the same group
            const buttons = this.parentElement.querySelectorAll('.table-action');
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // In a real application, this would update the table data
            console.log(`Table view changed to: ${this.textContent.trim()}`);
            
            // Simulate loading
            const tableBody = document.querySelector('.data-table tbody');
            tableBody.innerHTML = '<tr><td colspan="8" class="loading-data">Loading data...</td></tr>';
            
            setTimeout(() => {
                // Restore original data (in a real app, this would load new data)
                tableBody.innerHTML = document.querySelector('.data-table tbody').innerHTML;
                alert(`Table updated to show hotels by ${this.textContent.trim()}`);
            }, 1000);
        });
    });
});

// Initialize Revenue Overview Chart
function initRevenueOverviewChart() {
    const ctx = document.getElementById('revenue-overview-chart').getContext('2d');
    
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Revenue',
            data: [5800, 7500, 6200, 8900, 7600, 10500, 9200],
            backgroundColor: 'rgba(74, 108, 247, 0.2)',
            borderColor: '#4a6cf7',
            borderWidth: 2,
            tension: 0.4,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#4a6cf7',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
        }]
    };
    
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return `Revenue: $${context.raw.toLocaleString()}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Initialize Bookings by Hotel Chart
function initBookingsByHotelChart() {
    const ctx = document.getElementById('bookings-by-hotel-chart').getContext('2d');
    
    const data = {
        labels: ['Grand Plaza', 'Seaside Resort', 'Mountain View', 'City Center', 'Luxury Suites'],
        datasets: [{
            label: 'Bookings',
            data: [124, 98, 86, 102, 86],
            backgroundColor: [
                'rgba(74, 108, 247, 0.7)',
                'rgba(40, 167, 69, 0.7)',
                'rgba(255, 193, 7, 0.7)',
                'rgba(23, 162, 184, 0.7)',
                'rgba(220, 53, 69, 0.7)'
            ],
            borderColor: [
                '#4a6cf7',
                '#28a745',
                '#ffc107',
                '#17a2b8',
                '#dc3545'
            ],
            borderWidth: 1
        }]
    };
    
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Initialize Occupancy Rate Chart
function initOccupancyRateChart() {
    const ctx = document.getElementById('occupancy-rate-chart').getContext('2d');
    
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Occupancy Rate',
            data: [65, 72, 68, 75, 82, 95, 88],
            backgroundColor: 'rgba(40, 167, 69, 0.2)',
            borderColor: '#28a745',
            borderWidth: 2,
            tension: 0.4,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#28a745',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: true
        }]
    };
    
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Occupancy: ${context.raw}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Initialize Booking Sources Chart
function initBookingSourcesChart() {
    const ctx = document.getElementById('booking-sources-chart').getContext('2d');
    
    const data = {
        labels: ['Direct Website', 'Online Travel Agencies', 'Phone Reservations', 'Walk-ins', 'Travel Agents'],
        datasets: [{
            label: 'Booking Sources',
            data: [35, 40, 10, 5, 10],
            backgroundColor: [
                'rgba(74, 108, 247, 0.7)',
                'rgba(40, 167, 69, 0.7)',
                'rgba(255, 193, 7, 0.7)',
                'rgba(23, 162, 184, 0.7)',
                'rgba(220, 53, 69, 0.7)'
            ],
            borderColor: [
                '#4a6cf7',
                '#28a745',
                '#ffc107',
                '#17a2b8',
                '#dc3545'
            ],
            borderWidth: 1
        }]
    };
    
    new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    });
}

// Initialize Room Types Chart
function initRoomTypesChart() {
    const ctx = document.getElementById('room-types-chart').getContext('2d');
    
    const data = {
        labels: ['Standard Room', 'Deluxe Room', 'Suite', 'Family Room', 'Presidential Suite'],
        datasets: [{
            label: 'Room Types',
            data: [45, 30, 15, 8, 2],
            backgroundColor: [
                'rgba(74, 108, 247, 0.7)',
                'rgba(40, 167, 69, 0.7)',
                'rgba(255, 193, 7, 0.7)',
                'rgba(23, 162, 184, 0.7)',
                'rgba(220, 53, 69, 0.7)'
            ],
            borderColor: [
                '#4a6cf7',
                '#28a745',
                '#ffc107',
                '#17a2b8',
                '#dc3545'
            ],
            borderWidth: 1
        }]
    };
    
    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    });
}

// Update chart based on selected view
function updateChart(chartId, view) {
    // In a real application, this would fetch new data and update the chart
    console.log(`Updating chart ${chartId} with view: ${view}`);
    
    // Simulate chart update
    const chartElement = document.getElementById(chartId);
    chartElement.style.opacity = '0.5';
    
    setTimeout(() => {
        chartElement.style.opacity = '1';
    }, 500);
}

// Update all charts based on date range
function updateAllCharts(dateRange) {
    console.log(`Updating all charts for date range: ${dateRange}`);
    
    // Simulate loading state for all charts
    const charts = document.querySelectorAll('.chart');
    charts.forEach(chart => {
        chart.style.opacity = '0.5';
    });
    
    setTimeout(() => {
        charts.forEach(chart => {
            chart.style.opacity = '1';
        });
        alert(`Reports updated for date range: ${dateRange}`);
    }, 1000);
}