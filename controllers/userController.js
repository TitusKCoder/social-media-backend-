const {User, Thought }= require('../models');

module.exports = {
    //will get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Will get a single user
    getOneUser(req, res) {
        console.log(req.params.userId);
        User.findOne({_id: req.params.userId})
        .select('-__v') // The document version
        // .lean()
        // .populate({path: 'friends', select: "-__v"})
        // .populate({path: 'thoughts', select: "-__v"})
        .then(async (userData) => {
            console.log(userData);
            if(!userData) {
                res.status(404).json({message: 'userData not found'})    
            }
            res.json(userData)
        })
        .catch((err) => res.status(500).json(err));
    },
    //create a new user
    createUser(req, res){
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    //delete user 
    deleteUser(req, res){
        User.findOneAndDelete({_id: req.params.userId})
        .then((userData) => {
            if(!userData){
                return res.status(404).json({message: 'User not found'})

            }
            return Thought.deleteMany({_id: {$in: userData.thoughts}})
    })
        .then(() => res.json({message: 'User deleted '}))
        .catch((err) => res.status(500).json(err));
    }
    ,
    //Delete friend
    deleteFriend(req,res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            { new: true },
            )
        .then((friendData) => {
            if(!friendData){
                res.status(400).json({message: "no user found"})
            }
            User.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: {friends: req.params.userId}},
                {new:true},
            )
            .then((userData) => {
                if(!userData){
                    res.status(404).json({message: "no user found"})
                }
                res.json({message: "deleted friend"})
            })

        })
        .catch((err) => res.status(500).json(err));
    },
    // update user
    updateUser(req, res) {
        User.findOneAndUpdate({_id: req.params.userId},
            {$set: req.body
            },{runValidators: true, new: true})
        .then(userData => {
            if(!userData){
                res.status(404).json({message: 'user not found'})
            } 
            res.json(userData)
        })
        .catch((err) => res.status(500).json(err));
        
    },
    addFriend(req,res){
        User.findOneAndUpdate({_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},{ new: true })
            .then(userData => {
                if(!userData){
                    res.status(404).json({message: 'User not found'})
                }
                res.json(userData)
            })
            .catch((err) => res.status(500).json(err));

    }

}