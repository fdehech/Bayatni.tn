// Update price value display
const priceRange = document.getElementById("price")
const priceValue = document.getElementById("price-value")

if (priceRange && priceValue) {
  priceRange.addEventListener("input", function () {
    priceValue.textContent = this.value + " DT"
  })
}

// Booking modal functions
function showBookingModal() {
  document.getElementById("bookingModal").classList.remove("hidden")
  document.body.style.overflow = "hidden"
}

function closeBookingModal() {
  document.getElementById("bookingModal").classList.add("hidden")
  document.body.style.overflow = "auto"
}

// Show booking form modal
function showBookingForm(hotelId, hotelTitle, hotelPrice) {
  document.getElementById("modal-hotel-id").value = hotelId
  document.getElementById("modal-hotel-title").textContent = hotelTitle
  document.getElementById("modal-hotel-price").textContent = hotelPrice

  const checkInInput = document.getElementById("modal-check-in")
  const checkOutInput = document.getElementById("modal-check-out")

  if (!checkInInput.value) {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    checkInInput.value = tomorrow.toISOString().split("T")[0]
  }

  if (!checkOutInput.value) {
    const dayAfterTomorrow = new Date()
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 3)
    checkOutInput.value = dayAfterTomorrow.toISOString().split("T")[0]
  }

  updateBookingSummary()
  showBookingModal()
}

// Update booking summary when dates change
document.addEventListener("DOMContentLoaded", () => {
  const checkInInput = document.getElementById("modal-check-in")
  const checkOutInput = document.getElementById("modal-check-out")

  if (checkInInput && checkOutInput) {
    checkInInput.addEventListener("change", updateBookingSummary)
    checkOutInput.addEventListener("change", updateBookingSummary)
  }
})

function updateBookingSummary() {
  const checkIn = new Date(document.getElementById("modal-check-in").value)
  const checkOut = new Date(document.getElementById("modal-check-out").value)
  const pricePerNight = Number.parseFloat(document.getElementById("modal-hotel-price").textContent)

  if (checkIn && checkOut && !isNaN(checkIn) && !isNaN(checkOut)) {
    const nights = Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24))

    if (nights > 0) {
      const totalPrice = nights * pricePerNight

      document.getElementById("booking-dates").textContent = `Du ${formatDate(checkIn)} au ${formatDate(checkOut)}`
      document.getElementById("booking-nights").textContent = `${nights} nuit${nights > 1 ? "s" : ""}`
      document.getElementById("booking-total").textContent = `Total: ${totalPrice.toFixed(0)} DT`
    } else {
      document.getElementById("booking-dates").textContent = "Veuillez sélectionner des dates valides"
      document.getElementById("booking-nights").textContent = ""
      document.getElementById("booking-total").textContent = ""
    }
  }
}

function formatDate(date) {
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })
}

document.addEventListener('DOMContentLoaded', function () {
  var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
  var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
      return new bootstrap.Dropdown(dropdownToggleEl);
  });
});

document.querySelector('#menuButton').addEventListener('click', function (e) {
  console.log('Dropdown button clicked', e);
});