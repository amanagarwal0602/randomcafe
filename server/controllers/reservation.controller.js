const Reservation = require('../models/Reservation');

// @desc    Create reservation
// @route   POST /api/reservations
// @access  Private
exports.createReservation = async (req, res) => {
  try {
    const {
      guestName,
      guestEmail,
      guestPhone,
      numberOfGuests,
      date,
      timeSlot,
      specialRequests,
      occasion
    } = req.body;

    // Check if date is in the future
    const reservationDate = new Date(date);
    if (reservationDate < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Reservation date must be in the future'
      });
    }

    // Check availability (simplified - you can add more complex logic)
    const existingReservations = await Reservation.countDocuments({
      date: {
        $gte: new Date(reservationDate.setHours(0, 0, 0, 0)),
        $lt: new Date(reservationDate.setHours(23, 59, 59, 999))
      },
      timeSlot,
      status: { $in: ['pending', 'confirmed', 'seated'] }
    });

    if (existingReservations >= 10) {
      return res.status(400).json({
        success: false,
        message: 'No tables available for this time slot'
      });
    }

    const reservation = await Reservation.create({
      user: req.user.id,
      guestName,
      guestEmail,
      guestPhone,
      numberOfGuests,
      date,
      timeSlot,
      specialRequests,
      occasion
    });

    res.status(201).json({
      success: true,
      message: 'Reservation created successfully',
      data: reservation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user reservations
// @route   GET /api/reservations
// @access  Private
exports.getMyReservations = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = { user: req.user.id };
    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;
    const reservations = await Reservation.find(query)
      .sort('-date')
      .skip(skip)
      .limit(Number(limit));

    const total = await Reservation.countDocuments(query);

    res.json({
      success: true,
      data: {
        reservations,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single reservation
// @route   GET /api/reservations/:id
// @access  Private
exports.getReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate('user', 'name email phone');

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found'
      });
    }

    // Check ownership or admin
    if (reservation.user._id.toString() !== req.user.id && 
        !['admin', 'staff'].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this reservation'
      });
    }

    res.json({
      success: true,
      data: reservation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update reservation
// @route   PUT /api/reservations/:id
// @access  Private
exports.updateReservation = async (req, res) => {
  try {
    let reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found'
      });
    }

    // Check ownership
    if (reservation.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this reservation'
      });
    }

    // Can only update pending reservations
    if (reservation.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update reservation in current status'
      });
    }

    const allowedUpdates = ['numberOfGuests', 'date', 'timeSlot', 'specialRequests'];
    const updates = {};
    
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Reservation updated successfully',
      data: reservation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Cancel reservation
// @route   PUT /api/reservations/:id/cancel
// @access  Private
exports.cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found'
      });
    }

    // Check ownership
    if (reservation.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this reservation'
      });
    }

    reservation.status = 'cancelled';
    reservation.cancelledAt = new Date();
    reservation.cancellationReason = req.body.reason || 'Cancelled by customer';
    
    await reservation.save();

    res.json({
      success: true,
      message: 'Reservation cancelled successfully',
      data: reservation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get available time slots
// @route   GET /api/reservations/available-slots/:date
// @access  Public
exports.getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.params;
    const reservationDate = new Date(date);

    // Define time slots
    const allSlots = [
      '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
      '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
      '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
      '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'
    ];

    // Get reservations for this date
    const reservations = await Reservation.find({
      date: {
        $gte: new Date(reservationDate.setHours(0, 0, 0, 0)),
        $lt: new Date(reservationDate.setHours(23, 59, 59, 999))
      },
      status: { $in: ['pending', 'confirmed', 'seated'] }
    });

    // Count reservations per slot
    const slotCounts = {};
    reservations.forEach(res => {
      slotCounts[res.timeSlot] = (slotCounts[res.timeSlot] || 0) + 1;
    });

    // Mark slots as available/unavailable (max 10 per slot)
    const availableSlots = allSlots.map(slot => ({
      time: slot,
      available: (slotCounts[slot] || 0) < 10,
      remaining: 10 - (slotCounts[slot] || 0)
    }));

    res.json({
      success: true,
      data: availableSlots
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
