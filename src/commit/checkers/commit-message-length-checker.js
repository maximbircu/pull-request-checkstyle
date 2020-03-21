module.exports = function(config) {
  /**
   * Checks whether the commit messages length fits properly between the min-max bounds defined in
   * the checkstyle config.
   *
   * @param {*} commit to be checked
   * @return {string} Error message in case the commit doesn't pass the styling
   */
  this.run = (commit) => {
    if (commit.message.length > config.messageMaxLength) {
      return `Commit message is longer than ${config.messageMaxLength}`
    } else if (commit.message.length < config.messageMinLength) {
      return `Commit message is shorter than ${config.messageMinLength}`
    }
  }
}
