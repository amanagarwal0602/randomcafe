const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  reservationNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  guestName: {
    type: String,
    required: true
  },
  guestEmail: {
    type: String,
    required: true
  },
  guestPhone: {
    type: String,
    required: true
  },
  numberOfGuests: {
    type: Number,
    required: true,
    min: 1,
    max: 20
  },
  date: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  },
  tableNumber: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'seated', 'completed', 'cancelled', 'no-show'],
    default: 'pending'
  },
  specialRequests: {
    type: String,
    default: null
  },
  occasion: {
    type: String,
    enum: ['birthday', 'anniversary', 'business', 'date', 'family', 'other', null],
    default: null
  },
  confirmedAt: {
    type: Date
  },
  cancelledAt: {
    type: Date
  },
  cancellationReason: {
    type: String
  }
}, {
  timestamps: true
});

// Generate reservation number
reservationSchema.pre('save', async function(next) {
  if (!this.reservationNumber) {
    try {
      const date = new Date();
      const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
      
      // Count reservations created today
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));
      
      const count = await this.constructor.countDocuments({
        createdAt: {
          $gte: startOfDay,
          $lt: endOfDay
        }
      });
      
      this.reservationNumber = `RES-${dateStr}-${String(count + 1).padStart(4, '0')}`;
    } catch (error) {
      console.error('Error generating reservation number:', error);
      // Fallback: use timestamp
      this.reservationNumber = `RES-${Date.now()}`;
    }
  }
  next();
});

reservationSchema.index({ user: 1, date: -1 });
reservationSchema.index({ date: 1, status: 1 });
reservationSchema.index({ reservationNumber: 1 });

module.exports = mongoose.model('Reservation', reservationSchema);
