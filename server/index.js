const sql = require('mysql')
let notes = []
let userID = -1
const conn = sql.createConnection({
   host: '',
   user: '',
   database: '',
   password: ''
})

conn.connect((err, res) => {
   if (err) {
      console.log(err)
   } else {
      console.log('OK')
   }
})

const express = require('express')

const app = express()
const PORT = 0


app.use(express.json())
app.use(express.urlencoded())


app.post('/register', (req, res) => {
   console.log('/register')
   const values = [req.body.login, req.body.password]
   const request = `INSERT INTO users (login, password) VALUES (?, ?)`
   conn.query(request, values, (err, data) => {
      if (!err) {
         userID = data.insertId
         res.json(userID)
         userID = -1
         return
      }
      res.json({ err: err })
   })
})

app.get('/login', (req, res) => {
   console.log('/login')
   const values = [req.query.login, req.query.password]
   const request = `SELECT * FROM users WHERE login=? AND password = ?`
   conn.query(request, values, (err, data) => {
      if (data.length) {
         userID = JSON.parse(JSON.stringify(data[0]))
         res.json(userID)
         userID = -1
         return
      }
      res.json({ err: 'Username or password entered incorrectly. User not found.' })
   })
})

app.delete('/api', (req, res) => {
   console.log('/delete')
   let temp = notes[req.body.index].id
   const request = 'DELETE FROM note WHERE id = ?'
   conn.query(request, temp)
   conn.query('SELECT * FROM note', (err, data) => {
      if (!err) {
         notes = []
         data.map(item => {
            notes.push(JSON.parse(JSON.stringify(item)))
         })
         res.send(notes)
         return
      }
      res.json({ err: err })
   })
})



app.post('/api', (req, res) => {
   console.log('/post')
   const values = [req.body.login, req.body.password, req.body.id]
   const request = `INSERT INTO note (login,password, user_id) VALUES (?, ?, ?)`
   conn.query(request, values)
   res.sendStatus(201)
})



app.get('/api', async (req, res) => {
   console.log('/get')
   const value = [req.query.id]
   const request = 'SELECT * FROM note WHERE user_id = ?'
   conn.query(request, value, (err, data) => {
      if (!err) {
         notes = []
         data.map(item => {
            notes.push(JSON.parse(JSON.stringify(item)))
         })
         res.json(notes)
         return
      }
      res.json({ err: err })
   })
})



app.listen(PORT, () => {
   console.log(`http://localhost:${PORT}`)
})