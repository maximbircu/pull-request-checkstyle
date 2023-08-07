const StringBuilder = require('string-builder');
const PullRequestFormatChecker = require('./checkers/pull-request-title-format-checker');
const PullRequestLengthChecker = require('./checkers/pull-request-title-length-checker');

module.exports = function(pullRequest, config) {
  const checks = [
    new PullRequestFormatChecker(config),
    new PullRequestLengthChecker(config),
  ]


  const checkPullRequestTtitle = (pullRequestTitle) => {
    const errorMessageBuilder = new StringBuilder()
    checks.forEach((check) => {
      const error = check.run(pullRequestTitle)
      if (error) errorMessageBuilder.appendLine(`- ${error}`)
    })
    return errorMessageBuilder.toString()
  }

  this.run = () => {
    const errorBuilder = new StringBuilder()
    const errorMessage = checkPullRequestTtitle(pullRequest.title)
    if (errorMessage.length !== 0) {
      errorBuilder.appendLine('Pull request style violations found!').appendLine(errorMessage)
    }
    return errorBuilder.toString()
  }
}
