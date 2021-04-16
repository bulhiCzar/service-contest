const {Router} = require('express')
const router = Router()


router.get(
    '/',
    async (req, res) => {
        try {
            const data = await models.Contest.find()

            res.json(data)
        } catch (e) {
            res.json('bad')
        }
    }
)

router.post(
    '/',
    async (req, res) => {
        try {
            const {name, project, prizes} = req.body
            if (!name, !project, !prizes) return res.json('bad')

            const contest = new models.Contest({
                name, project, date: new Date()
            })
            await contest.save()

            const prizesId = []
            for (let item of prizes) {
                const prize = new models.Prize({
                    contestId: contest._id,
                    data: item
                })
                await prize.save()
                prizesId.push(prize._id)
            }


            for (let item of prizesId) {
                await models.Contest.findOneAndUpdate({_id: contest._id}, {
                    $push: {
                        prize: item
                    }
                })
            }

            const resData = await models.Contest.findById(contest._id)

            res.json(resData)
        } catch (e) {
            res.json('bad')
        }
    }
)

router.get(
    '/:id',
    async (req, res) => {
        try {
            const {id} = req.params

            const contest = await models.Contest.findById(id)

            const prizes = await models.Prize.find({contestId: contest.id})

            const infos = await models.Info.find({contestId: contest.id})

            contest.prizes = prizes
            contest.infos = infos

            res.json(contest)
        } catch (e) {
            res.json('bad')
        }
    }
)

router.post(
    '/:id',
    async (req, res) => {
        try {
            const {id} = req.params
            const {data, type, prizeId} = req.body

            const info = new models.Info({
                data,
                type,
                prizeId,
                contestId: id,
                date: new Date()
            })
            await info.save()

            await models.Contest.findByIdAndUpdate(id, {
                $push:{ info: info._id}
            })

            res.json(info)
        } catch (e) {
            console.log(e)
            res.json('bad')
        }
    }
)

module.exports = router