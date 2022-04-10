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
        User.findOne({_id: req.params.userId})
        .select('-__v') // The document version
        .populate('friends')
        .populate('thoughts')
        .then((user) => 
        !user   
            ? res.status(404).json({message: 'user not found'}): res.json(user))
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
        User.findOneAndDelete({_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},{ new: true })
        .then(() => res.json({message: 'User and associated thought data deleted'}))
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