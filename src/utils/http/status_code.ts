 

/**
 * Enum representing various HTTP status codes and their meanings. Use for
 * increased type safety and readability.
 */
export enum StatusCode {
  /**
   * Indicates that a request has succeeded. A 200 OK response is cacheable by
   * default.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/200
   */
  OK = 200,
  /**
   * Indicates that the HTTP request has led to the creation of a resource. This
   * status code is commonly sent as the result of a POST request.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/201
   */
  Created = 201,
  /**
   * Indicates that a request has succeeded, but the client doesn't need to
   * navigate away from its current page. A 204 response is cacheable by
   * default, and an ETag header is included in such cases.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/204
   */
  NoContent = 204,
  /**
   * Indicates that the server would not process the request due to something
   * the server considered to be a client error. The reason for a 400 response
   * is typically due to malformed request syntax, invalid request message
   * framing, or deceptive request routing.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/400
   */
  BadRequest = 400,
  /**
   * Indicates that a request was not successful because it lacks valid
   * authentication credentials for the requested resource. This status code is
   * sent with an HTTP WWW-Authenticate response header that contains
   * information on the authentication scheme the server expects the client to
   * include to make the request successfully.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/401
   */
  Unauthorized = 401,
  /**
   * Indicates that the server cannot find the requested resource. Links that
   * lead to a 404 page are often called broken or dead links and can be subject
   * to link rot.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/404
   */
  NotFound = 404,
  /**
   * Indicates that the server encountered an unexpected condition that
   * prevented it from fulfilling the request. This error is a generic
   * "catch-all" response to server issues, indicating that the server cannot
   * find a more appropriate 5XX error to respond with.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/500
   */
  InternalServerError = 500,
}
