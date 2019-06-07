const express = require("express")
const mongoose = require("mongoose")
const keys = require("./config/keys")
const cookieSession = require("cookie-session")
const passport = require("passport")
const bodyParser = require("body-parser")
const morgan = require('morgan')
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
app.use(morgan('dev'))

require("./routes/authRoutes")(app)
require("./routes/tripRoutes")(app)
require('./routes/googleMapsRoutes')(app)

if (process.env.NODE_ENV === "production") {
	// make sure express serves up production assets like main.js and main.css
	app.use(express.static('client/build'))

	// make sure express serves up index.html when it doesn't recognize a route
	const path = require('path')
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const PORT = process.env.PORT || 3001
app.listen(PORT)
