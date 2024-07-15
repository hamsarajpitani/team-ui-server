const Member = require('../models/MemberModel');

exports.getAllMembers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || 'createdAt';
    const order = req.query.order === 'desc' ? -1 : 1;
    const search = req.query.search;

    let filter = {};
    if (search) {
      filter = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ]
      };
    }

    const count = await Member.countDocuments(filter);
    const members = await Member.find(filter)
      .sort({ [sortBy]: order })
      .skip(0)
      .limit(page * limit);

    res.status(200).json({
      items: members,
      count: count
    });
  } catch (err) {
    next(err);
  }
};

// GET /members/:id - Fetch a single member by ID
exports.getMemberById = async (req, res, next) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json(member);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// POST /members - Create a new member
exports.createMember = async (req, res, next) => {
  try {
    const { name, email, role, teams } = req.body;
    const newMember = await Member.create({ name, email, role, teams });
    res.status(201).json(newMember);
  } catch (err) {
    res.status(500).json({ err });

  };
}

// PUT /members/:id - Update a member by ID
exports.updateMemberById = async (req, res) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json(updatedMember);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// DELETE /members/:id - Delete a member by ID
exports.deleteMemberById = async (req, res) => {
  try {
    const deletedMember = await Member.findByIdAndDelete(req.params.id);
    if (!deletedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json(deletedMember);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// DELETE /members - Delete members by array of IDs
exports.deleteMembersByIds = async (req, res) => {
  try {
    const ids = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'IDs array is required and should not be empty' });
    }

    const deletedMembers = await Member.deleteMany({ _id: { $in: ids } });

    if (!deletedMembers) {
      return res.status(404).json({ message: 'No members found to delete' });
    }

    res.status(200).json({ message: `${deletedMembers.deletedCount} members deleted successfully` });
  } catch (err) {
    res.status(500).json({ err });
  }
}
