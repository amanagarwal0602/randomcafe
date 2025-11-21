const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    required: true,
    default: 'Lumière Café'
  },
  logo: {
    type: String,
    default: ''
  },
  favicon: {
    type: String,
    default: ''
  },
  primaryColor: {
    type: String,
    default: '#8B4513'
  },
  secondaryColor: {
    type: String,
    default: '#D2691E'
  },
  accentColor: {
    type: String,
    default: '#CD853F'
  },
  footerText: {
    type: String,
    default: '© 2024 Lumière Café. All rights reserved.'
  },
  announcementBar: {
    enabled: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: 'Special offer: Get 20% off on all breakfast items!'
    },
    backgroundColor: {
      type: String,
      default: '#FFA500'
    },
    textColor: {
      type: String,
      default: '#FFFFFF'
    }
  },
  maintenanceMode: {
    enabled: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: 'We are currently undergoing maintenance. Please check back soon!'
    }
  },
  googleAnalyticsId: {
    type: String,
    default: ''
  },
  facebookPixelId: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
