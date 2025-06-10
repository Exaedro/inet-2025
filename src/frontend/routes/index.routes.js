import { Router } from 'express'
const indexRouter = new Router()

indexRouter.get('/', (req, res) => {
    res.render('index', { title: 'Agencia de viajes' })
})

export default indexRouter