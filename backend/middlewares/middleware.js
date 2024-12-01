import jwt from "jsonwebtoken";

function checkAuth(req, res, next) {
  if (
    req.headers.token == "" ||
    req.headers.token == null ||
    req.headers.oauth == "" ||
    req.headers.oauth == null ||
    req.headers.alivetoken == "" ||
    req.headers.alivetoken == null
  ) {
    res.json({ success: false, message: "Not Authenticated." });
  } else if (
    !req.headers.token ||
    !req.headers.oauth ||
    !req.headers.alivetoken
  ) {
    res.json({ success: false, message: "No Token" });
  } else {
    let jwt_token = req.headers.oauth;
    jwt.verify(jwt_token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return res.json({
          statusCode: 401,
          success: false,
          message: "Token Expired",
        });
      } else {
        req.data = decoded;
        next();
      }
    });
  }
}

export default checkAuth;
