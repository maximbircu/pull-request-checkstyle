module.exports = function(config) {
    /**
     * Checks whether the commit messages length fits properly between the min-max bounds defined in
     * the checkstyle config.
     *
     * @param {*} commit to be checked
     * @return {string} Error message in case the commit doesn't pass the styling
     */
    this.run = (pullRequestTitle) => {
      if (pullRequestTitle.length > config.messageTitleMaxLength) {
        return `Pull request title is longer than ${config.messageTitleMaxLength}`
      } else if (pullRequestTitle.length < config.messageTitleMinLength) {
        return `Pull request title is shorter than ${config.messageTitleMinLength}`
      }
    }
  }
