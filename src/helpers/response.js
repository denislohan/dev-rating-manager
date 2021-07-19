/** Class representing response util. */
class Response {
  /**
     * Retuns a structured response
     * @param {object} res  details.
     * @param {string} status  details.
     * @param {string} message  details.
     * @param {object} data  details.
     * @returns {object}.
     */
  static customResponse(res, status, message = null, data = null) {
    return res.status(status).json({
      status,
      message,
      data,
    });
  }

  /**
     * Generates a new password.
     * @param {object} res  details.
     * @param {string} message  details.
     * @param {object} error  details.
     * @returns {object}.
     */
  static validationError(res, message) {
    return res.status(423).json({
      status: 423,
      message,
      error: 'Validation Error',
    });
  }

  /**
     * Retuns a authorization error response
     * @param {object} res  details.
     * @param {string} message  details.
     * @param {object} data  details.
     * @returns {object}.
     */
  static authenticationError(res, message) {
    return res.status(401).json({
      status: 401,
      message,
      error: 'Authentication Error',
    });
  }

  /**
     * Retuns a authorization error response
     * @param {object} res  details.
     * @param {string} message  details.
     * @param {object} data  details.
     * @returns {object}.
     */
  static authorizationError(res, message) {
    return res.status(403).json({
      status: 403,
      message,
      error: 'Authorization Error',
    });
  }

  /**
     * Retuns a not found error response
     * @param {object} res  details.
     * @param {string} message  details.
     * @param {object} data  details.
     * @returns {object}.
     */
  static notFoundError(res, message) {
    return res.status(404).json({
      status: 404,
      message,
      error: 'Not Found',
    });
  }

  /**
     * Retuns a conflict error response
     * @param {object} res  details.
     * @param {string} message  details.
     * @param {object} data  details.
     * @returns {object}.
     */
  static conflictError(res, message) {
    return res.status(409).json({
      status: 409,
      message,
      error: 'Conflict Error',
    });
  }

  /**
     * Retuns a bad error response
     * @param {object} res  details.
     * @param {string} message  details.
     * @param {object} data  details.
     * @returns {object}.
     */
  static badRequestError(res, message) {
    return res.status(400).json({
      status: 400,
      message,
      error: 'Bad Request',
    });
  }

  /**
     * Retuns a server error response
     * @param {object} res  details.
     * @param {string} message  details.
     * @param {object} data  details.
     * @returns {object}.
     */
  static serverError(res, message) {
    return res.status(500).json({
      status: 500,
      message,
      error: 'Server Error',
    });
  }
}

export default Response;
