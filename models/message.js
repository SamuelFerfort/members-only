const queries = require("../db/queries");

class Message {
  static create(message) {
    return queries.createMessage(message);
  }

  static findByIdAndDelete(id) {
    return queries.deleteMessageById(id);
  }

  static getAllMessages() {
    return queries.getAllMessagesAndTheirAuthors()
  }
}

module.exports = Message;
