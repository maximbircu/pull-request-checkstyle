module.exports = function(config) {
  const regex = RegExp(config.messageTitleRegex)

  /**
   * Checks weather the commit message title matches the given regex
   *
   * @param {*} commit to be checked.
   * @return {string} Error message in case the commit doesn't pass the styling
   */
  this.run = (commit) => {
    const commitMessageTitle = commit.message.split('\n')[0]
    if (!regex.test(commitMessageTitle)) {
      return `Commit message title doesn't match the regex - ${regex}`
    }
  }
}
