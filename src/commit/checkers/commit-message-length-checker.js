module.exports = function(config) {
  /**
   * Checks whether the commit messages length fits properly between the min-max bounds defined in
   * the checkstyle config.
   *
   * @param {*} commit to be checked
   * @return {string} Error message in case the commit doesn't pass the styling
   */
  this.run = (commit) => {
    const commitMessageTitle = commit.message.split('\n')[0]
    if (commitMessageTitle.length > config.messageTitleMaxLength) {
      return `Commit message title is longer than ${config.messageTitleMaxLength}`
    } else if (commitMessageTitle.length < config.messageTitleMinLength) {
      return `Commit message title is shorter than ${config.messageTitleMinLength}`
    }
  }
}
