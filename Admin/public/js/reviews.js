document.addEventListener("DOMContentLoaded", () => {
  // Select all functionality
  const selectAllCheckbox = document.getElementById("select-all")
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener("change", () => {
      const checkboxes = document.querySelectorAll(".review-checkbox")
      checkboxes.forEach((checkbox) => {
        checkbox.checked = selectAllCheckbox.checked
      })
    })
  }

  // Bulk actions
  const bulkActionSelect = document.getElementById("bulk-action")
  const applyBtn = document.querySelector(".apply-btn")

  if (applyBtn) {
    applyBtn.addEventListener("click", () => {
      const selectedAction = bulkActionSelect.value
      if (!selectedAction) {
        alert("Please select an action")
        return
      }

      const selectedReviews = Array.from(document.querySelectorAll(".review-checkbox:checked")).map((checkbox) =>
        checkbox.getAttribute("data-id"),
      )

      if (selectedReviews.length === 0) {
        alert("Please select at least one review")
        return
      }

      // Confirm before proceeding
      if (selectedAction === "delete") {
        if (!confirm(`Are you sure you want to delete ${selectedReviews.length} reviews?`)) {
          return
        }
      }

      // Process the action
      processReviewBulkAction(selectedAction, selectedReviews)
    })
  }

  function processReviewBulkAction(action, reviewIds) {
    // Here you would typically send an AJAX request to a server endpoint
    console.log(`Processing ${action} for reviews:`, reviewIds)

    // Example implementation
    const formData = new FormData()
    formData.append("action", action)
    formData.append("review_ids", JSON.stringify(reviewIds))

    fetch("process_review_bulk_action.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message)
          // Reload the page to reflect changes
          window.location.reload()
        } else {
          alert("Error: " + data.message)
        }
      })
      .catch((error) => {
        console.error("Error:", error)
        alert("An error occurred while processing your request")
      })
  }

  // Add CSS for review checkboxes
  const style = document.createElement("style")
  style.textContent = `
        .review-select {
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 10;
        }
        .review-select input {
            width: 20px;
            height: 20px;
            cursor: pointer;
        }
        .review-item {
            position: relative;
        }
        .bulk-actions {
            display: flex;
            margin-top: 20px;
            gap: 10px;
        }
        .bulk-actions select {
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .apply-btn {
            padding: 8px 16px;
            background-color: #4a6cf7;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .apply-btn:hover {
            background-color: #3a5bd9;
        }
    `
  document.head.appendChild(style)
})
document.addEventListener('DOMContentLoaded', function() {
    const filterBtn = document.querySelector('.filter-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            console.log('Filtering reviews...');
            
            const hotelFilter = document.getElementById('hotel-filter').value;
            const ratingFilter = document.getElementById('rating-filter').value;
            const statusFilter = document.getElementById('status-filter').value;
            const dateRange = document.getElementById('date-range').value;
            
            console.log('Filters applied:', {
                hotel: hotelFilter,
                rating: ratingFilter,
                status: statusFilter,
                dateRange: dateRange
            });
            
            filterBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Applying...';
            setTimeout(() => {
                filterBtn.innerHTML = '<i class="fas fa-filter"></i> Apply Filters';
            }, 1000);
        });
    }

    const reviewActions = document.querySelectorAll('.review-action');
    reviewActions.forEach(action => {
        action.addEventListener('click', function() {
            const reviewItem = this.closest('.review-item');
            const reviewer = reviewItem.querySelector('.reviewer-info h4').textContent;
            const hotel = reviewItem.querySelector('.reviewer-info p').textContent;
            
            if (this.textContent.includes('Reply')) {
                console.log(`Replying to review by ${reviewer} for ${hotel}`);
                const replyText = prompt(`Enter your reply to ${reviewer}'s review:`);

            } else if (this.textContent.includes('Flag')) {
                console.log(`Flagging review by ${reviewer} for ${hotel}`);
                const reason = prompt('Enter reason for flagging this review:');
                if (reason) {
                    reviewItem.querySelector('.review-status').textContent = 'Flagged';
                    reviewItem.querySelector('.review-status').className = 'review-status flagged';
                }
            } else if (this.textContent.includes('Delete')) {
                console.log(`Deleting review by ${reviewer} for ${hotel}`);
                if (confirm(`Are you sure you want to delete the review by ${reviewer}?`)) {

                    reviewItem.style.opacity = '0.5';
                    setTimeout(() => {
                        reviewItem.remove();
                    }, 500);

                }
            } else if (this.textContent.includes('Approve')) {
                console.log(`Approving review by ${reviewer} for ${hotel}`);
                reviewItem.querySelector('.review-status').textContent = 'Published';
                reviewItem.querySelector('.review-status').className = 'review-status published';
                

                const actionsContainer = reviewItem.querySelector('.review-actions');
                actionsContainer.innerHTML = `
                    <button class="review-action"><i class="fas fa-reply"></i> Reply</button>
                    <button class="review-action"><i class="fas fa-flag"></i> Flag</button>
                    <button class="review-action"><i class="fas fa-trash"></i> Delete</button>
                `;
                

                const newActions = actionsContainer.querySelectorAll('.review-action');
                newActions.forEach(newAction => {
                    newAction.addEventListener('click', arguments.callee);
                });
                
            }
        });
    });
    

});
