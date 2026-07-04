const createError = require("http-errors");

//404 not found handler
function notFoundHandler(req, res, next) {
  //res.status(404).json({ message: "Route not found" });
  next(createError(404, "Route not found"));
}

//default error handler
// function errorHandler(err, req, res, next) {
//   res.render("error", {
//     title: "Error Page",
//     message: err.message,
//   });
// }

function errorHandler(err, req, res, next) {
  res.locals.error =
    process.env.NODE_ENV === "development"
      ? err
      : { message: "Internal Server Error" };

  res.status(err.status || 500);

  if (res.locals.html) {
    res.render("error", {
      title: "Error Page",
      message: err.message,
    });
  } else {
    res.json(res.locals.error);
  }
}

module.exports = { notFoundHandler, errorHandler };
