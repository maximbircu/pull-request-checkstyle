const StringBuilder = require('string-builder');
const BranchNameFormatChecker = require('./checkers/branch-name-format-checker.js')
const BranchNameLengthChecker = require('./checkers/branch-name-length-checker.js')

module.exports = function(branch, config) {
  const checks = [
    new BranchNameFormatChecker(config),
    new BranchNameLengthChecker(config),
  ]

  const checkBranch = (branch) => {
    const errorMessageBuilder = new StringBuilder()
    checks.forEach((check) => {
      const error = check.run(branch)
      if (error) errorMessageBuilder.appendLine(`- ${error}`)
    })
    return errorMessageBuilder.toString()
  }

  this.run = () => {
    const errorBuilder = new StringBuilder()
    const errorMessage = checkBranch(branch)
    if (errorMessage.length !== 0) {
      errorBuilder.appendLine('Branch style violations found!\n')
          .appendLine(`"${branch.name}"`)
          .append(errorMessage)
    }
    return errorBuilder.toString()
  }
}
