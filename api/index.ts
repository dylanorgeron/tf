import Koa from 'koa'
import Router from 'koa-router'
import con from './database'

const app = new Koa()
const router = new Router({
  prefix: '/api'
})

router.get('/home', (ctx) => {
  ctx.body = 'Connection Established'
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(8081)