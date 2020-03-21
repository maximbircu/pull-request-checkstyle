module.exports = function(config) {
  const regex = RegExp(config.nameRegex)

  /**
   * Checks weather the branch name matches the given regex.
   *
   * @param {*} branch to be checked
   * @return {string} error message in case the branch doesn't pass the styling
   */
  this.run = (branch) => {
    if (!regex.test(branch.name)) {
      return `Branch name doesn't match the regexp - ${regex}`
    }
  }
}
