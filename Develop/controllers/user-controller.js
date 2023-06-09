const { User, Thought } = require('../models');

module.exports = {

// get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },


  // get single user by id
  async getSingleUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }
      res.json({ user });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },


  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },


  // update a user
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { username: req.body.username },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },


  // delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }
      // BONUS: Delete all thoughts associated with the user
      await Thought.deleteMany({ username: user.username });
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'Successfully removed user' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },


  // add a friend
  async addFriend(req, res) {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;
      const [user, friend] = await Promise.all([
        User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } }, { new: true }),
        User.findByIdAndUpdate(friendId, { $addToSet: { friends: userId } }, { new: true }),
      ]);
      if (!user || !friend) {
        return res.status(404).json({ message: 'No user or friend found with that ID' });
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },


  // delete a friend
  async deleteFriend(req, res) {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;
      const [user, friend] = await Promise.all([
        User.findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { new: true }),
        User.findByIdAndUpdate(friendId, { $pull: { friends: userId } }, { new: true }),
      ]);
      if (!user || !friend) {
        return res.status(404).json({ message: 'No user or friend found with that ID' });
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
