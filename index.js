const express = require("express")
const mongoose = require("mongoose")
const keys = require("./config/keys")
const cookieSession = require("cookie-session")
const passport = require("passport")
const bodyParser = require("body-parser")
require("./models/User")
require("./models/Trip")
require("./services/passport")

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })

const app = express()

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
		keys: [keys.cookieKey]
	})
)
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require("./routes/authRoutes")(app)
require("./routes/tripRoutes")(app)
require('./routes/googleMapsRoutes')(app)

const PORT = process.env.PORT || 3001
app.listen(PORT)
