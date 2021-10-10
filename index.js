const express = require("express");
const { rootRouter } = require("./routers/rootRouter");
const app = express();
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const PORT = process.env.PORT || 8000;
const pathPublic = path.join(__dirname, "./public");
const options = {
  definition: {
    swagger: "2.0",
    info: {
      title: "Phone API",
      version: "1.0",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
    components: {},
  },
  apis: ["./index.yaml"],
};

app.use(express.json());

app.use("/public", express.static(pathPublic));

app.use("/api", rootRouter);

const swaggerSpecs = swaggerJsDoc(options);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
