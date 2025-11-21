const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getAllTeamMembers,
  getActiveTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
} = require('../controllers/team.controller');

router.get('/', getActiveTeamMembers);
router.get('/all', protect, authorize('admin'), getAllTeamMembers);
router.post('/', protect, authorize('admin'), createTeamMember);
router.put('/:id', protect, authorize('admin'), updateTeamMember);
router.delete('/:id', protect, authorize('admin'), deleteTeamMember);

module.exports = router;
