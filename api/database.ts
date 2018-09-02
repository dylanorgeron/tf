import mysql from 'mysql'

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
})

con.connect((err) => {
    if(err) throw err
    console.log('MYSQL connection success')
})

export default con