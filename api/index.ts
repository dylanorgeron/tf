import Koa from 'koa'
import Router from 'koa-router'

const app = new Koa()
const router = new Router({
  prefix: '/api'
})

router.get('/', (ctx) => {
  ctx.body = 'Hello, World!'
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(8081)