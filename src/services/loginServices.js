const { isEmpty } = require("lodash");
const { findOneScript } = require("../DaoHelper/daoHelper");

const loginService = async (userName, password) => {
  try {
    const response = await findOneScript("users", { userName, password });
    if (isEmpty(response)) {
      throw new Error("Login Credentials not matches");
    } else if (!isEmpty(response)) {
      return { flag: "success" };
    }
  } catch (error) {
    throw new Error("Failed to validate User Credentials =>", error);
  }
};

module.exports = {
  loginService,
};
