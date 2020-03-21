module.exports = function(config) {
  const regex = RegExp(config.messageRegex)

  /**
   * Checks weather the commit message matches the given regex
   *
   * @param {PullsListCommitsResponseItemCommit} commit to be checked.
   * @return {string} Error message in case the commit doesn't pass the styling
   */
  this.run = (commit) => {
    if (!regex.test(commit.message)) {
      return `Commit message doesn't match the regex - ${regex}`
    }
  }
}
