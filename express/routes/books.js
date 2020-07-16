const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Models
const Books = require('../models/Books');

/* GET users listing. */
router.post('/new', function (req, res, next) {

    const book = new Books({
        title: 'aass',
        comments: [
            {message: 'Amazingsdasdasda book'},
            {message: 'a wonderful book'}
        ],
        year: 5987,
        meta: {
            votes: 12,
            favs: 43
        },
        published: true
    });

    book.save((err, data) => {
        if (err)
            console.log(err);

        res.json(data);
    });
});

router.get('/search', function (req, res, next) {
    Books.find({
        category: {
            $exists: true
        }
        }, 'title comments category'
        , (err, data) => {
            res.json(data);
        })
});

router.get('/getBooks', function (req, res, next) {
    Books.find({}, (err, data) => {
        res.json(data);
    })
});

router.get('/getBooksByOne', function (req, res, next) {
    Books.findOne({title: 'enes'}, (err, data) => {
        res.json(data);
    })
});

router.get('/getBooksById', function (req, res, next) {
    Books.findById('5f0ee3b8919e74287858e127', (err, data) => {
        res.json(data);
    })
});

router.put('/update', function (req, res, next) {
    Books.update({published: false}, {published: true}, {upsert: true}, (err, data) => {
        res.json(data);
    })
});

router.put('/updateById', function (req, res, next) {
    Books.findByIdAndUpdate(
        '5f0ee3a025a77e220ca0372f',
        {
            title: 'updated title',
            'meta.favs': 43,
            'meta.votes': 98
        },
        (err, data) => {
            res.json(data);
        })
});

/*
* findOne() -> remove()
* findOneAndRemove()
* remove()
* */

router.delete('/remove', (req, res) => {
    Books.remove({published: 'true'}, (err, data) => {
        res.json(data);
    });
});

router.get('/sort', (req, res) => {
    Books.find({}, (err, data) => {
        res.json(data);
    }).sort({'title': -1});
});

router.get('/limitandskip', (req, res) => {
    Books.find({}, (err, data) => {
        res.json(data);
    }).skip(1).limit(1);
});

router.get('/aggregate', (req, res) => {
    Books.aggregate([
        {
            $match:{
                published: true
            }
        },
        /*{
            $group: {
                _id: "$category",
                total: { $sum: 1 }
            }
        }*/
        {
            $project: {
                title: true,
                meta: true
            }
        },
        {
            $sort: {
                title: 1
            }
        },
        {
            $limit: 5
        },
        {
            $skip: 1
        }
    ], (err, result) => {
        res.json(result);
    });
});

router.get('/aggregate-lookup', (req, res) => {
    Books.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId('5f0ef84791037905841d95d5')
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: '$user'
        },
        {
            $project: {
                title: true,
                username: '$user.fullName'
            }
        }
    ], (err, result) => {
        res.json(result);
    })
});

module.exports = router;
