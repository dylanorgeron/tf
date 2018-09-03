import Koa from 'koa'
import Router from 'koa-router'
import bodyparser from 'koa-bodyparser'
import con from './database'
import mysql from 'mysql'

const app = new Koa()
const router = new Router({
  prefix: '/api'
})

router.get('/home', (ctx) => {
  ctx.body = 'Connection Established'
})

router.post('/Account/Create', (ctx) => {
  console.log(ctx.request.body)
  const username = mysql.escape('')
  const email = mysql.escape('')
  const password = mysql.escape('')
  con.query(
    `call ${dbName}.MakeAccount('${email}', '${password}', '${username}');`, 
    (error, response, fields) => {
      console.log(response)
	})
})


app
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(8081)