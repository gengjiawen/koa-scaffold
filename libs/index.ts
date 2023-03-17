import * as Koa from 'koa'
import * as Router from '@koa/router'
import * as cors from '@koa/cors'
import { koaBody } from 'koa-body'
import * as path from 'path'

export const app = new Koa()

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

// serve frontend project for dev, this needs to be in cdn in production mode
const fe = path.join(__dirname, '../fe', 'dist')
const serve = require('koa-static')
const mount = require('koa-mount')
app.use(mount('/public', serve(fe)))

app.use(cors())
app.use(router.routes()).use(router.allowedMethods())

const port = 3000
if (process.env?.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`)
  })
}
