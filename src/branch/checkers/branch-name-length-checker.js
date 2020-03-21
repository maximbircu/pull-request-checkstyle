module.exports = function(config) {
  /**
   * Checks whether the branch name length fits properly between the min-max bounds defined in
   * the checkstyle config.
   *
   * @param {*} branch to be checked
   * @return {string} error message in case the branch doesn't pass the styling
   */
  this.run = (branch) => {
    if (branch.name.length > config.nameMaxLength) {
      return `Branch name is longer than ${config.nameMaxLength}`
    } else if (branch.name.length < config.nameMinLength) {
      return `Branch name is shorter than ${config.nameMinLength}`
    }
  }
}
