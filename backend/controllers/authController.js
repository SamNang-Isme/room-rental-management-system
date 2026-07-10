const db = require("../config/db");
const bcrypt = require("bcrypt");

const login = (req, res) => {

    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username = ?";

    db.query(sql, [username], async (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        const user = results[0];

        const match = await bcrypt.compare(password, user.password_hash);

        if (!match) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        res.status(200).json({
            success: true,
            message: "Login Successful",
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });

    });

};

module.exports = {
    login
};