import express from 'express'
import 'dotenv/config'
import userRouter from './user/user.router'
import bodyParser from 'body-parser'
import postRouter from './post/post.routes'
import loginRouter from './login/login.routes'

const PORT = process.env.PORT || 3001
const app = express()

app.use(bodyParser.json())
app.use(userRouter)
app.use(postRouter)
app.use(loginRouter)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(PORT, () => console.log(`Server running in Port ${PORT}`))