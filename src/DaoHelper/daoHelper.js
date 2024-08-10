const { MongoClient } = require("mongodb");
const mongoURI = "mongodb://localhost:27017";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = client.db("testDatbase");
let db;
const dbName = "testDatbase";
const createOne = async (collectionName, data) => {
  await db.collection(collectionName).insertOne(data);
};

const findAllScript = async (collectionName, query, projection) => {
  return await db
    .collection(collectionName)
    .find(query)
    .project(projection)
    .toArray();
};

const findOneScript = async (collectionName, query, project) => {
  return await db
    .collection(collectionName)
    .find(query)
    .project(project)
    .toArray();
};

let client;

const connectToDatabase = async () => {
  try {
    client = new MongoClient(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db(dbName);
    return client.db(dbName);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

function getDatabase() {
  if (!client) {
    throw new Error("Database not initialized");
  }
  db = client.db(dbName);
}

module.exports = {
  connectToDatabase,
  getDatabase,
  client,
  createOne,
  findAllScript,
  findOneScript,
};
