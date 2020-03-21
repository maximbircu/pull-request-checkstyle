const StringBuilder = require('string-builder');
const CommitMessageFormatChecker = require('./checkers/commit-message-format-checker');
const CommitMessageLengthChecker = require('./checkers/commit-message-length-checker');

module.exports = function(commits, config) {
  const checks = [
    new CommitMessageFormatChecker(config),
    new CommitMessageLengthChecker(config),
  ]

  const checkCommit = (commit) => {
    const errors = []
    checks.forEach((check) => {
      const error = check.run(commit)
      if (error) errors.push(error)
    })
    return errors
  }

  const checkCommits = () => {
    const errorMessageBuilder = new StringBuilder()
    commits.forEach((commit) => {
      const commitStyleErrors = checkCommit(commit)
      if (commitStyleErrors.length !== 0) {
        errorMessageBuilder.appendLine(`"${commit.message}":`)
        commitStyleErrors.forEach((error) => {
          errorMessageBuilder.appendLine(` - ${error}`)
        })
        errorMessageBuilder.appendLine()
      }
    })
    return errorMessageBuilder.toString()
  }

  this.run = () => {
    const errorBuilder = new StringBuilder()
    const errorMessage = checkCommits()
    if (errorMessage.length !== 0) {
      errorBuilder.appendLine('Commit style violations found!').appendLine(errorMessage)
    }
    return errorBuilder.toString()
  }
}
