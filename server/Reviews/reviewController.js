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
        .populate('customerId')
        .populate('furnitureId')
        .populate('shopId')
        .exec()

        .then((data) => {
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
        .populate("customerId")
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

const viewReviewById = (req, res) => {
    reviewSchema.findById(req.params.id)
        .populate("customerId")
        .populate("furnitureId")
        .populate("shopId")
        .exec()
        .then((data) => {
            if (!data) {
                return res.status(404).json({
                    status: 404,
                    message: "Review not found",
                });
            }
            res.status(200).json({
                status: 200,
                message: "Review retrieved successfully",
                data: data,
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                status: 500,
                message: "Error retrieving review",
                error: err,
            });
        });
};





module.exports = {
    addReview,
    viewAllreviewsByShopId,
    viewAllreviewsByFurnitureId,
    viewReviewById
}
