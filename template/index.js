import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from 'kcors';

const app = new Koa();

app.user(bodyParser());

app.use((ctx, next) => {
  const start = new Date();
  return next().then(() => {
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });
});

const router = new Router();
router.get('/', async ctx => {
  ctx.body = 'Hello, dear';
});

app.use(cors());
app.use(router.routes())
  .use(router.allowedMethods());

const port = 3000;
app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
});