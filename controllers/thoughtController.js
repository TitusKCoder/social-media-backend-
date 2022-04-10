const {User, Thought} = require('../models');

module.exports = {
    //Will get all thoughts
    getAllThoughts(req, res){
        Thought.find()
        .populate({path: 'reactions ', select: "-__v"})
        .select('-__v')
        .then((thoughtData) => {
            res.json(thoughtData)})
        .catch((err) => {
            res.status(500).json(err)
        });
    },
    // will get a sigle thought by id 
    getSingleThought(req, res){
        Thought.findOne({_id: req.params.id})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then((thoughtData) => {
            if(!thoughtData) {
                res.status(404).json({message: "No thought data found"});}
                res.json(thoughtData);
        })
        .catch((err) => {
            res.status(500).json(err)
        });
    },
    // will post a new thought 
    postNewThought(req,res){
        Thought.create(req.body)
        .then((thoughtData) => {
            User.findByIdAndUpdate(
                {_id: req.body.userId},
                {$push: {thoughts: thoughtData._id}},
                {new: true}
            )
        })
        .then((userData) => {
            if(!userData){
                res.status(404).json({message: 'no user found'});
            }
            res.json(userData);
        })
        .catch((err) => {
            res.status(500).json(err);
        });

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
        Thought.findOneAndRemove({_id: req.params.thoughtId})
        .then((thoughtData) => {
            if(!thoughtData){
                res.status(404).json({message: 'No thought found'})
            }
            User.findOneAndUpdate(
                {thoughts: req.params.thoughtId},
                {$pull: {thoughts: req.params.thoughtId}},
                {new: true}
            )
        })
        .then((userData) => {
            if(!userData) {
                res.status(404).json({message: 'no user found'})
            } res.json({message: 'thought deleted'})
        })
        .catch((err) => {
            res.status(500).json(err)
        });
    },
    // will post a new reaction 
    postNewReaction(req,res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtid },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thoughtData) =>{
            if(!thoughtData){
                res.status(404).json({message: 'No thought found'})
            }
            res.json(thoughtData)
        })
    .catch((err) => res.status(500).json(err));
    },
    // will delete a single reaction 
    deleteSigleReaction(req,res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionid: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
        .then((thoughtData) => {
            if(!thoughtData){
                res.status(404).json({message: 'No thought found'})
            }
            res.json(thoughtData)
        })
        .catch((err) => res.status(500).json(err));
    }}