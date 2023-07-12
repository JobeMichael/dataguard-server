var express = require("express");
var data = require("./data.json");

const app = express();
const port = 8080; // default port to listen

app.use(express.json());
let plugins = data;

// Create a router instance for the API namespace
const apiRouter = express.Router();

// Define routes within the API namespace
apiRouter.get("/plugins", (req, res) => {
  res.send(plugins);
});

apiRouter.post("/plugins", (req, res) => {
  plugins = null;
  console.log(plugins);
  res.send("This is the data endpoint");
});

// Mount the API router under the '/api' namespace
app.use("/api", apiRouter);

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
