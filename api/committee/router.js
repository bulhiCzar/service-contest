const {Router} = require('express')
const { check, validationResult } = require('express-validator')
const normalizeUrl = require('normalize-url')
const rusToLatin = require('../../utils/rusToLatin')

const router = Router()

router.get(
    '/',
    async (req, res) => {
        try {
            const committee = await models.Committee.find().sort({ _id: -1 })

            res.json(committee)
        } catch (e) {
            res.status(203).json('Ошибка, зовите программиста')
        }
    }
)

router.post(
    '/',
    [
        check('link').isURL()
    ],
    async (req, res) => {
        const validation = validationResult(req)
        if (!validation.isEmpty()) {
            return res.status(203).json('Не корректная ссылка')
        }

        try {
            const {country, name, typeLink, link} = req.body
            const normalizeLink = normalizeUrl(link)

            const committeeCandidate = await models.Committee.findOne({
                $or:[
                    {link: normalizeLink},
                    {name},
                    {photo: String(name).replace(/ /g, '')},
                ]
            })
            if (committeeCandidate) {
                return res.status(203).json('Такой пользователь уже существует')
            }

            const committee = new models.Committee({
                name,
                link: normalizeLink,
                typeLink,
                photo: String(rusToLatin(name)).replace(/ /g, ''),
                country: String(country).toLowerCase()
            })

            await committee.save()

            res.json(committee)
        } catch (e) {
            console.log(e)
            res.status(203).json('Ошибка, зовите программиста')
        }
    }
)

router.get(
    '/:id',
    async (req, res) => {
        try {
            const {id} = req.params

            const committee = await models.Committee.findById(id)

            const doc = {
                name: committee.name,
                position: '',
                img: committee.photo,
                [committee.typeLink]: committee.link,
                country: committee.country
            }

            res.json(doc)
        } catch (e) {
            res.status(203).json('Ошибка, зовите программиста')
        }
    }
)


router.delete(
    '/:id',
    async (req, res) => {
        try {
            const {id} = req.params
            await models.Committee.findByIdAndDelete(id)

            res.json('ok')
        } catch (e) {
            res.status(203).json('Ошибка, зовите программиста')
        }
    }
)


router.put(
    '/:id',
    async (req, res) => {
        try {
            const {id} = req.params
            const {status} = req.body
            const updateObj = {
                status
            }
            await models.Committee.findByIdAndUpdate(id, updateObj)

            res.json('ok')
        } catch (e) {
            res.status(203).json('Ошибка, зовите программиста')
        }
    }
)



module.exports = router