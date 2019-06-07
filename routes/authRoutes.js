const passport = require("passport")

module.exports = app => {
	app.get(
		"/auth/google",
		passport.authenticate("google", {
			scope: ["profile", "email"]
		})
	)

	app.get(
		"/auth/google/callback",
		passport.authenticate("google"),
		(req, res) => {
			res.redirect("/")
		}
	)

	app.get("/api/user", (req, res) => {
		if (!req.user) {
			res.send({
				_id: null,
				isSignedIn: false
			})
		} else {
			const { _id, firstName } = req.user

			res.send({
				_id,
				isSignedIn: true,
				firstName
			})
		}
	})

	app.get("/api/logout", (req, res) => {
		req.logout()
		res.redirect("/")
	})
}
