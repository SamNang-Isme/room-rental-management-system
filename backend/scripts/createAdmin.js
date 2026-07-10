const bcrypt = require("bcrypt");
const db = require("../config/db");

async function createAdmin() {
    try {
        const username = "admin";
        const password = "admin123";
        const role = "admin";

        const passwordHash = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users (username, password_hash, role)
            VALUES (?, ?, ?)
        `;

        db.query(sql, [username, passwordHash, role], (err, result) => {
            if (err) {
                console.error(err);
                process.exit();
            }

            console.log("✅ Admin account created!");
            console.log("Username:", username);
            console.log("Password:", password);

            process.exit();
        });

    } catch (error) {
        console.error(error);
    }
}

createAdmin();