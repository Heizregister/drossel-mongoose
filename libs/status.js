module.exports = {
  CONTINUE: {
    code: 100,
    message: 'Informational: 100 Continue'
  },
  SUCCESS: {
    code: 200,
    message: 'Success: 200 OK'
  },
  SUCCESS_NO_CONTENT: {
    code: 204,
    message: 'Success: 204 No Content'
  },
  FAILURE_BAD_REQUEST: {
    code: 400,
    message: 'Failure: 400 Bad Request'
  },
  FAILURE_UNAUTHORIZED: {
    code: 401,
    message: 'Failure: 401 Unauthorized'
  },
  FAILURE_FORBIDDEN: {
    code: 403,
    message: 'Failure: 403 Forbidden'
  },
  FAILURE_NOT_FOUND: {
    code: 404,
    message: 'Failure: 404 Not Found'
  },
  FAILURE_CONFLICT: {
    code: 409,
    message: 'Failure: 409 Conflict'
  },
  FAILURE_TEAPOT: {
    code: 418,
    message: "Failure: 418 I'm a teapot"
  },
  FAILURE_INTERNAL: {
    code: 500,
    message: 'Failure: 500 Internal Server Error'
  }
};
