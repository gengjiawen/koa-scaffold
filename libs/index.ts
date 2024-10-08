import * as Koa from 'koa'
import * as Router from '@koa/router'
import * as cors from '@koa/cors'
import { koaBody } from 'koa-body'
import * as path from 'path'

export const app = new Koa()

app.use(require('koa-compress')())

app.use(koaBody())

const router = new Router()

router.get('/', async (ctx: Koa.Context) => {
  ctx.body = 'Hello world'
})

router.post('/echo', async (ctx: Koa.Context) => {
  console.log(`headers`, ctx.request.headers)
  console.log(`body`, ctx.request.body)
  ctx.body = ctx.request.body
})

const multer = require('@koa/multer')
const upload = multer({ dest: 'uploads/' }) // Uploads will be stored in the 'uploads' directory

// testing using curl -X POST -F "file=@/path/to/your/file" http://localhost:3000/upload, like curl -X POST -F "file=@README.md" http://localhost:3000/upload
router.post('/upload', upload.single('file'), async (ctx) => {
  ctx.body = {
    filename: ctx.file.filename, // Return the filename to the client
  }
})

// serve frontend project for dev, this needs to be in cdn in production mode
// only use this if you are want to ship small things
const fe = path.join(__dirname, '../fe', 'dist')
const serve = require('koa-static')
const mount = require('koa-mount')
app.use(mount('/public', serve(fe)))
// Set up a catch-all route for the FE app
router.get(/.*/, async (ctx) => {
  ctx.type = 'html'
  ctx.body = require('fs').createReadStream(path.join(fe, 'index.html'))
})

app.use(cors())
app.use(router.routes()).use(router.allowedMethods())

const port = 3000
if (process.env?.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`)
  })
}
