let response;

function test(req, res) {
  try {
    throw new Error("Sentry error");
  } catch (error) {
    response = {
      status: false,
      code: 500,
      message: "Internal server error",
    };
  }

  res.status(response.code).json(response);
}

module.exports = {
  test,
};
