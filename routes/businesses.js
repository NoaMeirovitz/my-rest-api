var express = require("express");
var router = express.Router();
const database = require("../controllers/database");

router.post("/", async (req, res) => {
  const form = req.body;
  console.log(form);
  try {
    let sql = `INSERT INTO businesses (business_name, description, address, phone, img_url, customer_id) VALUES ('${form.business_name}',`;
    sql += `'${form.desc}','${form.address}','${form.phone}','${form.img_url}',${form.customer_id})`;

    console.log({ sql });
    await database.query(sql);
    res.redirect("create-business.html");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:businessId", async (req, res) => {
  const { businessId } = req.params;
  const form = req.body;
  console.log({ businessId });
  console.log({ form });
  try {
    let sql = `UPDATE businesses 
    SET business_name='${form.business_name}', description='${form.description}', address='${form.address}', phone='${form.phone}', img_url='${form.img_url}' WHERE id='${businessId}'`;

    console.log({ sql });
    await database.query(sql);
    res.status(200).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/delete/:businessId", async (req, res) => {
  try {
    //const { businessId } = req.params;
    const businessId = req.params.businessId;
    const sql = `DELETE FROM businesses WHERE id='${businessId}'`;
    await database.query(sql);
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

//localhost:3000/businesses/hjasgdjhasdgf
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  const sql = `SELECT * FROM businesses WHERE customer_id='${userId}'`;
  console.log({ sql });

  try {
    const [business] = await database.query(sql);
    if (business.length === 0) {
      res
        .status(400)
        .send({ message: "Business not found for this customer id" });
      return;
    }

    res.json(business);
  } catch (err) {
    throw err;
  }
});

router.get("/:businessId", async (req, res) => {
  const { businessId } = req.params;
  const sql = `SELECT * FROM businesses WHERE id='${businessId}'`;
  console.log({ sql });

  try {
    const [rows] = await database.query(sql);
    if (rows.length === 0) {
      res.status(400).send({ message: "Id does not exist" });
      return;
    }

    const business = rows[0];

    res.json(business);
  } catch (err) {
    throw err;
  }
});

module.exports = router;
