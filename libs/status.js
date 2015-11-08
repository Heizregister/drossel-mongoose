module.exports = {
  SUCCESS: {
    code: 200,
    message: 'success.'
  },
  SUCCESS_NO_CONTENT: {
    code: 204,
    message: 'no content.'
  },
  FAILURE_VALIDATION: {
    code: 400,
    message: 'failure: validation failed.'
  },
  FAILURE_CAST: {
    code: 400,
    message: 'failure: cast failed.'
  },
  FAILURE_REQUIRE_PARAMETER: {
    code: 400,
    message: 'failure: require parameter.'
  },
  FAILURE_NOT_FOUND: {
    code: 404,
    message: 'failure: not found.'
  },
  FAILURE_TEAPOT: {
    code: 418,
    message: "failure: I'm a teapot."
  },
  FAILURE_GATLING: {
    code: 500,
    message: 'failure: gatling not complete.'
  },
  FAILURE: {
    code: 500,
    message: 'failure: internal error.'
  }
};
