var express = require("express");
var router = express.Router();
const database = require("../controllers/database");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//localhost:3000/users/hjasgdjhasdgf
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log({ userId });
  const sql = `SELECT * FROM customers WHERE id='${userId}'`;
  console.log({ sql });

  try {
    const [rows, fields] = await database.query(sql);
    console.log({ rows });
    if (rows.length === 0) {
      res.status(400).send({ message: "Id does not exist" });
      return;
    }

    const user = rows[0];
    delete user.password_hash;

    res.json(user);
  } catch (err) {
    throw err;
  }
});

module.exports = router;
