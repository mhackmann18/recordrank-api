class ErrorResponse {
  constructor(message, statusCode){
    this.message = message;
    this.statusCode = statusCode;
  }
}

function errorHandler(err, req, res, next){
  if(res.headersSent)
    return next(err);

  let error = new ErrorResponse('Server Error', 500);

  // console.log(err);

  if(err.name === 'MongoError' && err.code === 11000){
    const dupFields = Object.values(err.keyValue);
    message = dupFields.length > 1 ? `The field values ${dupFields} already exist in the database` : `The field value ${dupFields} already exists in the database`;
    error = new ErrorResponse(message, 400);

  } else if(err.kind === 'ObjectId'){
    error = new ErrorResponse("The object id provided to the URL is incorrectly formatted", 400);

  } else if(err.kind === 'ObjectIdNotInDB'){
    error = new ErrorResponse("The object id provided to the url does not exist in the database", 400);
    
  } else if(err.name === 'ValidationError'){
    error = new ErrorResponse(err.message, 400);
  }

  res.status(error.statusCode).json({
    success: false,
    error: error.message
  });
}

module.exports = errorHandler;