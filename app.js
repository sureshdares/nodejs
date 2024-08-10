const express = require("express");
const {
  client,
  createOne,
  findAllScript,
  connectToDatabase,
} = require("./src/DaoHelper/daoHelper");
const { loginService } = require("./src/services/loginServices");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());

app.use(express.json());

connectToDatabase()
  .then(() => {
    app.listen(port, async () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
app.get("/users", async (req, res) => {
  try {
    const data = await findAllScript("users", {}, { _id: 0 });
    res.status(200).send({ data: data, flag: "success" });
  } catch (error) {
    res.status(500).send({ flag: "failure", error: error.message });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const result = await loginService(userName, password);
    res.status(200).send({ data: result.flag, flag: "success" });
  } catch (error) {
    res.status(500).send({ flag: "failure", error: error.message });
  }
});
app.post("/users", async (req, res) => {
  const { userName, password } = req.body;
  await createOne("users", { userName, password });
  res.sendStatus(200).json({ data: "", flag: "success" });
});
