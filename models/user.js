const queries = require("../db/queries");

class User {
  static async findOne({ username }) {
    return queries.getUserByUsername(username);
  }

  static async create(data) {
    return queries.createUser(data);
  }

  static async updateMembership(id) {
    return queries.findByIdAndUpdateMembership(id);
  }
}

module.exports = User;
