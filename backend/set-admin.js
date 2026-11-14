const bcrypt = require("bcryptjs");
const { db, initDatabase } = require("./database");

initDatabase();

const [,, username, password] = process.argv;

if (!username || !password) {
  console.log("Penggunaan: node set-admin.js <username> <password_baru>");
  process.exit(1);
}

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

// Check if user exists
const existing = db.prepare("SELECT id FROM admin_users WHERE username = ?").get(username);

if (existing) {
  db.prepare("UPDATE admin_users SET password_hash = ? WHERE id = ?").run(hash, existing.id);
  console.log(`✅ Password untuk user '${username}' berhasil diperbarui!`);
} else {
  // Update the primary admin account or insert new one
  const primaryAdmin = db.prepare("SELECT id FROM admin_users LIMIT 1").get();
  if (primaryAdmin) {
    db.prepare("UPDATE admin_users SET username = ?, password_hash = ? WHERE id = ?").run(username, hash, primaryAdmin.id);
    console.log(`✅ Akun admin utama berhasil diubah menjadi: '${username}'!`);
  } else {
    db.prepare("INSERT INTO admin_users (username, password_hash) VALUES (?, ?)").run(username, hash);
    console.log(`✅ Akun admin baru '${username}' berhasil dibuat!`);
  }
}

process.exit(0);

