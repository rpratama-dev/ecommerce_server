

function errorHandler(err, req, res, next) {
  let status = err.status || 500;
  let error = { message: err.message } || { message: 'Internal Server Error' };
  error.status = status;

  if (err.name.includes('Sequelize')) {
    let errors;
    if (Array.isArray(err.errors)) {
      errors = err.errors.map(error => {
        status = err.status || 400;
        return { error: error.message, field: error.path };
      })
    } else {
      errors = err.message
    }

    error = { status, message: errors }
  }
  res.status(status).json(error)
} 

module.exports = {
  errorHandler
};