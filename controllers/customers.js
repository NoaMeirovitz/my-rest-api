const database = require("./database");
const joi = require("joi");
const bcrypt = require("bcrypt");

module.exports = {
  addCustomer: async function (req, res, next) {
    const reqBody = req.body;

    const schema = joi.object({
      name: joi.string().required().min(2).max(50),
      email: joi
        .string()
        .required()
        .regex(/^[^@]+@[^@]+$/),
      password: joi.string().required().min(6).max(200),
      client_type: joi.required(),
    });

    const { error, value } = schema.validate(reqBody);

    if (error) {
      res.status(400).send(`add failed:${error}`);
      return;
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const password_hash = bcrypt.hashSync(reqBody.password, salt);

    const sql =
      "INSERT INTO customers (name, email ,password_hash, client_type) VALUES (?,?,?,?)";

    try {
      const result = await database.query(sql, [
        reqBody.name,
        reqBody.email,
        password_hash,
        reqBody.client_type,
      ]);
    } catch (err) {
      throw err;
    }
    res.status(200).send("You filled your details correctly.");
  },
};
