
function authentication(req, res, next) {
  const { access_token } = req.headers;
  try {
    if (!access_token) {
      throw (createError(401, 'Authentication failed!'));
    } else {
      const decoded = verifyToken(access_token);
      User.findOne({
        where: { id: decoded.id }
      })
        .then((user) => {
          if (!user) {
            throw (createError(401, 'Authentication failed!'));
          } else {
            req.logedInUser = decoded;
            next();
          }
        }).catch((err) => {
          throw (createError(500, err.message));
        });
    }
  } catch (err) {
    next(err);
  }
}