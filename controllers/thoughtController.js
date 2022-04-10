const {User, Thought} = require('../models');

module.exports = {
    //Will get all thoughts
    getAllThoughts(req, res){
        Thought.find()
        .then((thoughtData) => {
            res.json(thoughtData)})
        .catch((err) => {
            res.status(500).json(err)
        });
    },
    // will get a sigle thought by id 
    getSingleThought(req, res){
        Thought.findOne({_id: req.params.thoughtId})
        .then((thoughtData) => {
            if(!thoughtData) {
                res.status(404).json({message: "No thought data found"})}
                res.json(thoughtData);
        })
        .catch((err) => {
            res.status(500).json(err)
        });
    },
    // will post a new thought 
    postNewThought(req,res){
        Thought.create(req.body)
        .then((thought) => {
                console.log(req.body.userName)
                return User.findOneAndUpdate(
                    { userName: req.body.userName },
                    { $push: { thoughts: thought.id } },
                    { new: true }
                )
            })
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'No user found with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // will update a single thought 
    updateSingleThought(req,res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true})
        .then((thoughtData) => {
            if(!thoughtData){
                res.status(404).json({message: "No thought found"})
            }
            res.json(thoughtData)
        })
        .catch((err) => res.status(500).json(err));
    },
    // will deleet a single thought 
    deleteSingleThought(req,res){
        console.log(req.params.thoughtId)
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        // .then((thoughtData) => {console.log(thoughtData)})
            .then((thoughtData) =>
                !thoughtData
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json({message: "deleted thought"})
            )
            // .then((user) =>
            //     !user
            //         ? res.status(404).json({
            //             message: 'No user with this id!',
            //         })
            //         : res.json({ message: 'Thought successfully deleted!' })
            // )
            .catch((err) => res.status(500).json(err));
    },
    // will post a new reaction 
    postNewReaction(req,res){
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $push: { reactions: req.body } }, { new: true })
            .then((thought) =>
                res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // will delete a single reaction 
    deleteSigleReaction(req,res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with this id!'})
                : res.json("Reaction deleted")
            )
            .catch((err) => res.status(500).json(err));
    }}