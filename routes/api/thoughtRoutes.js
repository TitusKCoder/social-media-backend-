const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    postNewThought,
    updateSingleThought,
    deleteSingleThought,
    postNewReaction,
    deleteSigleReaction,

} = require('../../controllers/thoughtController.js');

router.route('/').get(getAllThoughts).post(postNewThought);

router.route('/:thoughtId').get(getSingleThought).put(updateSingleThought).delete(deleteSingleThought);

router.route('/:thoughtId/reactions').post(postNewReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteSigleReaction);

module.exports = router;