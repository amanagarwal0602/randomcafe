const TeamMember = require('../models/TeamMember');

// Get all team members
exports.getAllTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ order: 1 });
    res.json(members);
  } catch (error) {
    console.error('Get team members error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get active team members
exports.getActiveTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find({ isActive: true }).sort({ order: 1 });
    res.json(members);
  } catch (error) {
    console.error('Get active team members error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create team member
exports.createTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.create(req.body);
    res.status(201).json(member);
  } catch (error) {
    console.error('Create team member error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update team member
exports.updateTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json(member);
  } catch (error) {
    console.error('Update team member error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete team member
exports.deleteTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Delete team member error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
