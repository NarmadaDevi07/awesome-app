# Meeting Room Booking System

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
4. [Usage](#usage)
   - [Displaying Available Rooms](#displaying-available-rooms)
   - [Booking a Room](#booking-a-room)
   - [Viewing Bookings](#viewing-bookings)
   - [Editing and Canceling Bookings](#editing-and-canceling-bookings)
   - [Conflict Handling](#conflict-handling)

## Introduction

This web application efficiently manages and books meeting rooms. It enables users to view available rooms, make bookings, check their bookings, and make modifications or cancellations. The system prevents double-booking, ensuring a smooth experience for all users.

## Features

### Display Available Rooms

- Lists all available meeting rooms.
- Displays the current booking status for each room.

### Booking a Room

- Users can select a room.
- Choose a time slot in 30-minute increments (e.g., 9:00-9:30, 9:30-10:00).
- Once booked, the time slot becomes unavailable for that specific room.

### Viewing Bookings

- Users can view all of their current bookings.
- Displays room names and booked time slots.

### Editing and Canceling Bookings

- Users have the option to modify the booking time or cancel their booking.
- Canceled bookings free up the time slot for others.

### Conflict Handling

- The system prevents double-booking of rooms.
- Users receive alerts if they try to book a room already reserved for a specific time slot.

## Getting Started

### Prerequisites

- Visual Studio Code (or any code editor of your choice) installed on your system.

## Usage

1. Run the code in Visual Studio Code; it will open in Chrome where your application will start.
2. On the homepage, you will see five Meeting Rooms, each with multiple time slots.
3. If you wish to cancel a booking, you have the option to do so. All bookings for a particular room will be displayed in "View Your Bookings."

### Displaying Available Rooms

- To view available rooms, click on the "Room A," "Room B," "Room C," "Room D," or "Room E" tab.
- Select the date for which you want to book a time slot.
- The available time slots for each room will be displayed.

### Booking a Room

1. Choose a time slot in 30-minute increments.

### Viewing Bookings

- To view your bookings, click on the "View your bookings" tab.
- You will see a list of your current bookings, including the room name and booked time slot with the date.

### Cancel Bookings

- To cancel a booking, follow these steps:
   1. Press the cancel booking button.
   2. Choose the time slot which you want to cancel and press Cancel Booking button

### Conflict Handling

- If you attempt to book a room that is already reserved for a specific time slot, you will receive an alert, and the booking will not be processed.
