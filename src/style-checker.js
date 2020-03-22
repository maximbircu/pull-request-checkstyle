const CommitStyleChecker = require('./commit/commit-style-checker.js')
const BranchStyleChecker = require('./branch/branch-style-checker.js')

module.exports = function(data) {
  /**
   * Runes all existing style checks other commits and PR source branch and returns a list of error
   * messages which is empty in case the validation passed.
   *
   * @return {*} the collection of error messages which is empty in case the validation passed
   */
  this.check = () => {
    const commitsChecker = new CommitStyleChecker(data.commits, data.config.commit)
    const branchChecker = new BranchStyleChecker({name: data.branchName}, data.config.branch)
    return [branchChecker.run(), commitsChecker.run()]
  }
}
