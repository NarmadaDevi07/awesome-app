

// Sample data for available rooms with their booking status
const availableRooms = [
    { id: 1, name: "Room A", isBooked: false, bookedSlots: [] },
    { id: 2, name: "Room B", isBooked: false, bookedSlots: [] },
    { id: 3, name: "Room C", isBooked: false, bookedSlots: [] },
    { id: 4, name: "Room D", isBooked: false, bookedSlots: [] },
    { id: 5, name: "Room E", isBooked: false, bookedSlots: [] },
    // Add more rooms as needed
];

// Currently selected room and time slot
let selectedRoom = null;
let selectedTimeSlots = [];

// Function to display available rooms
function displayAvailableRooms() {
    const roomList = document.getElementById("room-list");
    roomList.innerHTML = "";

    availableRooms.forEach(room => {
        const roomCard = document.createElement("div");
        roomCard.classList.add("room-card");

        // Display room name and booking status
        roomCard.innerHTML = `
            <h2>${room.name}</h2>
            <p>Status: ${room.isBooked ? "Booked" : "Available"}</p>
        `;

        // Add a click event listener to the room card
        roomCard.addEventListener("click", () => {
            showBookingForm(room);
        });

        roomList.appendChild(roomCard);
    });
}

// Function to display time slots for booking
function displayTimeSlots(room) {
    const timeSlotsDiv = document.getElementById("time-slots");
    timeSlotsDiv.innerHTML = "";

    // Create time slots in increments of 30 minutes
    for (let i = 9; i < 17; i++) {
        for (let j = 0; j < 60; j += 30) {
            const startTime = `${i.toString().padStart(2, "0")}:${j.toString().padStart(2, "0")}`;
            const endTime = `${i.toString().padStart(2, "0")}:${(j + 30).toString().padStart(2, "0")}`;
            const timeSlotId = `${startTime}-${endTime}`;

            const timeSlot = document.createElement("div");
            timeSlot.classList.add("booking-time-slot");

            // Check if the time slot is already booked for this room
            if (room.bookedSlots.includes(timeSlotId)) {
                timeSlot.classList.add("unavailable-time-slot");
            } else {
                timeSlot.addEventListener("click", () => {
                    if (!selectedRoom.isBooked) {
                        if (!selectedTimeSlots.includes(timeSlotId)) {
                            selectedTimeSlots.push(timeSlotId); // Add the selected time slot
                            toggleTimeSlot(room, timeSlotId);
                        } else {
                            const index = selectedTimeSlots.indexOf(timeSlotId);
                            if (index !== -1) {
                                selectedTimeSlots.splice(index, 1); // Remove the selected time slot
                                toggleTimeSlot(room, timeSlotId);
                            }
                        }
                    } else {
                        alert("Cannot book a time slot in a fully booked room.");
                    }
                });
            }

            timeSlot.textContent = `${startTime} - ${endTime}`;
            timeSlotsDiv.appendChild(timeSlot);
        }
    }
}

// Function to show the booking form
function showBookingForm(room) {
    selectedRoom = room;
    const bookingForm = document.getElementById("booking-form");
    bookingForm.style.display = "block";

    const roomSelect = document.getElementById("room-select");
    roomSelect.innerHTML = `<option value="${room.id}">${room.name}</option>`;

    const bookingDate = document.getElementById("booking-date");
    const selectedDateValue = document.getElementById("selected-date-value");

    // Event listener for date input
    bookingDate.addEventListener("change", () => {
        const selectedDate = bookingDate.value;
        selectedDateValue.textContent = selectedDate;
        selectedDateValue.style.display = "block";
        // Display time slots based on the selected room and date
        displayTimeSlots(room);
    });

    // Check if the user has any bookings for the selected room
    if (selectedRoom.bookedSlots.length > 0) {
        document.getElementById("return-home-button").style.display = "inline-block";
        document.getElementById("cancel-booking-button").style.display = "inline-block";
    } else {
        document.getElementById("return-home-button").style.display = "inline-block";
        document.getElementById("cancel-booking-button").style.display = "none";
    }

    // Display the currently selected date if available
    if (bookingDate.value) {
        selectedDateValue.textContent = bookingDate.value;
        selectedDateValue.style.display = "block";
        // Display time slots based on the selected room and date
        displayTimeSlots(room);
    } else {
        selectedDateValue.style.display = "none";
    }

    // Show the "View Your Bookings" button when a room is selected
    const viewBookingsButton = document.getElementById("view-bookings");
    viewBookingsButton.style.display = "block";
}

// Function to toggle a time slot's availability
function toggleTimeSlot(room, timeSlot) {
    const index = room.bookedSlots.indexOf(timeSlot);
    if (index !== -1) {
        // Time slot is booked, so unbook it
        room.bookedSlots.splice(index, 1);

        if (room.bookedSlots.length === 8 * 2) {
            room.isBooked = true;
        } else {
            room.isBooked = false;
        }

        displayTimeSlots(room);
        displayAvailableRooms();
        updateViewBookingsButton();
        showBookingForm(selectedRoom);
    } else {
        // Time slot is available, so book it
        room.bookedSlots.push(timeSlot);

        if (room.bookedSlots.length === 8 * 2) {
            room.isBooked = true;
        } else {
            room.isBooked = false;
        }

        displayTimeSlots(room);
        displayAvailableRooms();
        updateViewBookingsButton();
        showBookingForm(selectedRoom);
    }
}

// Function to hide the booking form
function hideBookingForm() {
    const bookingForm = document.getElementById("booking-form");
    bookingForm.style.display = "none";
}

// Function to display user's bookings
function displayUserBookings() {
    const userBookingsDiv = document.getElementById("user-bookings");
    userBookingsDiv.style.display = "block";
    
    const bookingList = document.getElementById("booking-list");
    bookingList.innerHTML = "";

    if (selectedRoom && selectedRoom.bookedSlots.length > 0) {
        const userBookings = selectedRoom.bookedSlots.map(slot => {
            const [date, timeSlot] = slot.split('-');
            return { room: selectedRoom.name, date, timeSlot };
        });

        userBookings.forEach(booking => {
            const bookingItem = document.createElement("li");
            bookingItem.textContent = `Room: ${booking.room}, Date: ${booking.date}, Time Slot: ${booking.timeSlot}`;
            bookingList.appendChild(bookingItem);
        });

        document.getElementById("no-bookings-message").style.display = "none";
    } else {
        document.getElementById("no-bookings-message").style.display = "block";
    }
}

// Function to close the user's bookings section
function closeUserBookings() {
    const userBookingsDiv = document.getElementById("user-bookings");
    userBookingsDiv.style.display = "none";
    
    // Show the "View Your Bookings" button when the user closes the bookings section
    const viewBookingsButton = document.getElementById("view-bookings");
    viewBookingsButton.style.display = "block";
}

// Function to update the visibility of the "View Your Bookings" button
function updateViewBookingsButton() {
    const viewBookingsButton = document.getElementById("view-bookings");
    if (selectedRoom && selectedRoom.bookedSlots.length > 0) {
        viewBookingsButton.style.display = "block";
    } else {
        viewBookingsButton.style.display = "none";
    }
}

// Event listener for the "View Bookings" button
const viewBookingsButton = document.getElementById("view-bookings");
viewBookingsButton.addEventListener("click", () => {
    displayUserBookings();
    viewBookingsButton.style.display = "none";
});

// Event listener for the "Close" button in the user's bookings section
const closeBookingsButton = document.getElementById("close-bookings");
closeBookingsButton.addEventListener("click", () => {
    closeUserBookings();
});

// Event listener for the "Cancel Booking" button
const cancelBookingButton = document.getElementById("cancel-booking-button");
cancelBookingButton.addEventListener("click", () => {
    if (selectedRoom && selectedRoom.bookedSlots.length > 0) {
        showCancelPopup();
    }
});

// Event listener for the "Cancel Popup" button
const cancelPopupButton = document.getElementById("cancel-popup-button");
cancelPopupButton.addEventListener("click", () => {
    const selectedTimeSlotsToCancel = document.querySelectorAll('input[name="cancel-time-slot"]:checked');
    if (selectedTimeSlotsToCancel.length > 0) {
        selectedTimeSlotsToCancel.forEach(selectedTimeSlotToCancel => {
            const timeSlotToCancel = selectedTimeSlotToCancel.value;
            toggleTimeSlot(selectedRoom, timeSlotToCancel);
        });
        hideCancelPopup();
        displayUserBookings();
    }
});

// Function to show the cancel popup
function showCancelPopup() {
    const cancelPopup = document.getElementById("cancel-popup");
    const cancelList = document.getElementById("cancel-list");
    cancelList.innerHTML = "";

    selectedRoom.bookedSlots.forEach(timeSlot => {
        const listItem = document.createElement("label");
        listItem.innerHTML = `
            <input type="checkbox" name="cancel-time-slot" value="${timeSlot}">
            ${timeSlot}<br>
        `;
        cancelList.appendChild(listItem);
    });

    cancelPopup.style.display = "block";
}

// Function to hide the cancel popup
function hideCancelPopup() {
    const cancelPopup = document.getElementById("cancel-popup");
    cancelPopup.style.display = "none";
}

// Event listener for the "Cancel" button
const cancelButton = document.getElementById("cancel-button");
cancelButton.addEventListener("click", () => {
    hideBookingForm();
    displayAvailableRooms();
    updateViewBookingsButton();
    selectedTimeSlots = [];
});

// Event listener for the "Return to Home" button
const returnHomeButton = document.getElementById("return-home-button");
returnHomeButton.addEventListener("click", () => {
    // Hide the booking form and return to the home page
    hideBookingForm();
    displayAvailableRooms();
    updateViewBookingsButton();
});

// Initial display of available rooms
displayAvailableRooms();
