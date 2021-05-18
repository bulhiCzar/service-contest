const {Router} = require('express')
const router = Router()


router.post(
    '/',
    async (req, res) => {
        try {
            const {image, size, type} = req.body

            const newImage = new models.Image({
                image,
                size,
                type
            })

            await newImage.save()

            res.json(newImage._id)
        } catch (e) {
            console.log(e)
            res.status(203).json('Ошибка, зовите программиста')
        }
    }
)

module.exports = router