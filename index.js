const express = require("express");
const data = require("./data.json");
const cors = require("cors");

const app = express();
const port = 8080; // default port to listen

app.use(cors());
app.use(express.json());
let plugins = data;

// Create a router instance for the API namespace
const apiRouter = express.Router();

// Define routes within the API namespace
apiRouter.get("/plugins", (req, res) => {
  res.send(plugins);
});

apiRouter.put("/plugins", (req, res) => {
  const { tabKey, field, pluginKey, fieldStatus } = req.body;

  if (field === "active") {
    const tabdata = plugins.data.tabdata[tabKey];

    if (!fieldStatus) {
      tabdata.active = tabdata.active.filter((plugin) => plugin !== pluginKey);

      tabdata.inactive.push(pluginKey);
    } else {
      tabdata.inactive = tabdata.inactive.filter(
        (plugin) => plugin !== pluginKey
      );

      tabdata.active.push(pluginKey);
    }
  }
  if (field === "disabled") {
    plugins.data.disabled = fieldStatus;
  }

  res.send("Suceessfully updated the plugins");
});

// Mount the API router under the '/api' namespace
app.use("/api", apiRouter);

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
