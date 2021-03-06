const {Router} = require('express')
const router = Router()


router.get(
    '/',
    async (req, res) => {
        try {
            const data = await models.Contest.find().sort({ _id: -1 })

            res.json(data)
        } catch (e) {
            res.json('Ошибка, зовите программиста')
        }
    }
)

router.get(
    '/all/:contestId',
    async (req, res) => {
        try {
            const {contestId} = req.params

            const contest = await models.Contest.findById(contestId)
            const prizes = await models.Prize.find({contestId: contest.id})
            const infos = await models.Info.find({contestId: contest.id})

            const send = []


            for (const info of infos) {
                const prize = (prizes.filter((item)=>String(item._id) === String(info.prizeId)))[0]

                switch (info.type) {
                    case 'any':
                        break;
                    case 'phone':
                    case 'login':
                        send.push({
                            contestId: info.contestId,
                            infoId: info._id,
                            typePrize:  prize.type,
                            amount: prize.amount,
                            type: info.type,
                            info: info.data,
                            status: info.status,
                        })
                }
            }

            res.json(send)
        } catch (e) {
            res.json('Ошибка, зовите программиста')
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
            res.json('Ошибка, зовите программиста')
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

            const infos = await models.Info.find({contestId: contest.id}).sort({ _id: -1 })

            contest.prizes = prizes
            contest.infos = infos

            res.json(contest)
        } catch (e) {
            res.json('Ошибка, зовите программиста')
        }
    }
)

router.post(
    '/:id',
    async (req, res) => {
        try {
            const {id} = req.params
            const {data, type, prizeId} = req.body

            const checkDub = await models.Info.findOne({
                data,
                contestId: id,
            })
            if (checkDub){
                return res.status(202).json('Такая запись уже существует!')
            }

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
            res.json('Ошибка, зовите программиста')
        }
    }
)

router.delete(
    '/:contestId/:infoId',
    async (req, res) => {
        try {
            const {contestId, infoId} = req.params

            const info = await models.Info.findById(infoId)
            if (info.status === 'done') return res.json('Невозможно удалить')

            await info.delete()

            res.json('ok')
        } catch (e) {
            res.json('Ошибка, зовите программиста')
        }
    }
)

router.put(
    '/:contestId/:infoId',
    async (req, res) => {
        try {
            const {contestId, infoId} = req.params
            const { status } = req.body
            const info = await models.Info.findById(infoId)
            if (!info) throw new Error()

            await models.Info.findByIdAndUpdate(info._id, {
                status: status
            })

            res.json('ok')
        } catch (e) {
            res.json('Ошибка, зовите программиста')
        }
    }
)

module.exports = router