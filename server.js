if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}
const express = require('express');
const { errorHandler } = require('./middleware/errorHandler');
const routes = require('./routes');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", routes);
app.use(errorHandler);

// app.listen(port, () => {
//   console.log("App running on port http://localhost:" + port);
// })

// function createServerTest() {
//   const app = express();
//   app.use(express.json());
//   app.use("/api", routes);
//   app.use(errorHandler)
//   return app;
// }


module.exports = app;

