const { User, Thought } = require('../models');

module.exports = {

// get all thoughts
  async getThoughts(req, res) {
      try {
        const thoughts = await Thought.find();
        res.json(thoughts);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },


    // get single thought
    async getSingleThought(req, res) {
      try {
        const thought = await Thought.findById(req.params.id);
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with that ID' });
        }
        res.json({ thought });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },


    // create a thought
    async createThought(req, res) {
      try {
        const thought = await Thought.create(req.body);
        const user = await User.findByIdAndUpdate(
          req.body.userId,
          { $push: { thoughts: thought._id } },
          { new: true }
        );
        res.json(user);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },


    // update a thought
    async updateThought(req, res) {
      try {
        const thought = await Thought.findByIdAndUpdate(
          req.params.id,
          { thoughtText: req.body.thoughtText },
          { new: true }
        );
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with that ID' });
        }
        res.json(thought);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },


    // delete a thought
    async deleteThought(req, res) {
      try {
        const thought = await Thought.findByIdAndDelete(req.params.id);
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with that ID' });
        }
        const user = await User.findByIdAndUpdate(
          thought.userId,
          { $pull: { thoughts: thought._id } },
          { new: true }
        );
        res.json({ message: 'Successfully removed thought' });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },


    // add a reaction to a thought
    async createReaction(req, res) {
      try {
        const thought = await Thought.findByIdAndUpdate(
          req.params.thoughtId,
          { $push: { reactions: req.body } },
          { new: true }
        );
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with that ID' });
        }
        res.json(thought);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },


    // remove a reaction from a thought
    async removeReaction(req, res) {
      try {
        const thought = await Thought.findByIdAndUpdate(
          req.params.thoughtId,
          { $pull: { reactions: { reactionId: req.body.reactionId } } },
          { new: true }
        );
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with that ID' });
        }
        res.json(thought);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
};
