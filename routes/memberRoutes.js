const express = require('express');
const router = express.Router();
const memberController = require('../controllers/MemberController');

// GET /members - Fetch all members with pagination, sorting, and searching
router.get('/', memberController.getAllMembers);

// GET /members/:id - Fetch a single member by ID
router.get('/:id', memberController.getMemberById);

// POST /members - Create a new member
router.post('/', memberController.createMember);

// PUT /members/:id - Update a member by ID
router.put('/:id', memberController.updateMemberById);

// DELETE /members/:id - Delete a member by ID
router.delete('/:id', memberController.deleteMemberById);

// DELETE /members - Delete members by array of IDs
router.delete('/', memberController.deleteMembersByIds);

module.exports = router;
