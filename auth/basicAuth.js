let basicAuth = (req, res, next) => {
    let authHeader = req.headers["authorization"];

    if (!authHeader) {
        res.setHeader("WWW-Authenticate", "Basic");
        return res.status(401).send("Authentication Required");
    }

    // Decode base64 -> username:password
    let base64Credentials = authHeader.split(" ")[1];
    let credentials = Buffer.from(base64Credentials, "base64").toString(
        "utf-8"
    );
    let [username, password] = credentials.split(":");

    // check hardcoded user
    if (username === "admin" && password === "admin") {
        return next();
    }

    res.setHeader("WWW-Authenticate", "Basic");
    return res.status(401).send("Invalid credentials");
};

export default basicAuth;
