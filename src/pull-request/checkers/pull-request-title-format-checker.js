module.exports = function(config) {
  const regex = RegExp(config.titleRegex)

  /**
     * Checks weather the commit message title matches the given regex
     *
     * @param {*} pullRequestTitle to be checked.
     * @return {string} Error message in case the commit doesn't pass the styling
     */
  this.run = (pullRequestTitle) => {
    if (!regex.test(pullRequestTitle)) {
      return `Pull request title doesn't match the regex - ${regex}`
    }
  }
}
