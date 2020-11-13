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

app.use((req, res, next) => {
  const err = new Error('Sory, Page not found');
  err.status = 404;
  next(err)
});

app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
  app.listen(port, () => {
    console.log("App running on port http://localhost:" + port);
  })
}

module.exports = app;

