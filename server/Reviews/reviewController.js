const reviewSchema = require('./reviewSchema');

const addReview = (req, res) => {
    const Review = new reviewSchema({
        customerId: req.body.customerId,
        furnitureId: req.body.furnitureId,
        shopId: req.body.shopId,
        review: req.body.review,
        date: new Date()

    });

    Review.save()
        .then(data => {
            res.json({
                status: 200,
                message: " added  successfully",
                data: data,
            }
            )
        })
        .catch(err => {
            console.error(err);
            res.json({
                err: err,
                status: 500,
            });
        })

}

const viewAllreviewsByShopId = (req, res) => {
    reviewSchema.find({ shopId: req.params.id })
        .exec().
        then((data) => {
            res.status(200).json({
                status: 200,
                message: "reviews retrieved successfully",
                data: data,
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                status: 500,
                message: "Error retrieving reviews",
                error: err,
            });
        });
};

const viewAllreviewsByFurnitureId = (req, res) => {
    reviewSchema.find({ furnitureId: req.params.id })
        .exec().
        then((data) => {
            res.status(200).json({
                status: 200,
                message: "reviews retrieved successfully",
                data: data,
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                status: 500,
                message: "Error retrieving reviews",
                error: err,
            });
        });
};




module.exports = {
    addReview,
    viewAllreviewsByShopId,
    viewAllreviewsByFurnitureId
}
