import * as Koa from 'koa'
import * as Router from '@koa/router'
import * as cors from '@koa/cors'
import { koaBody } from 'koa-body'

const app = new Koa()

app.use(require('koa-compress')())

app.use(
  koaBody({
    multipart: true,
  })
)

const router = new Router()

router.get('/', async (ctx: Koa.Context) => {
  ctx.body = 'Hello world'
})

app.use(cors())
app.use(router.routes()).use(router.allowedMethods())

const port = 3000
app.listen(port, () => {
  console.log(`server running http://localhost:${port}`)
})
