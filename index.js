const core = require('@actions/core')
const colors = require('colors/safe');

const {GITHUB_EVENT_NAME} = process.env

const Repository = require('./src/repository.js')
const StyleChecker = require('./src/style-checker.js')
const GithubEvents = require('./src/github-events.js')

/**
 * Runes a set of style checks other commit message and PR branches.
 * Should be rune just in case of `pull_request` events.
 */
function main() {
  try {
    const repository = new Repository()
    const styleConfigPromise = repository.getStyleConfig()
    const commitsPromise = repository.getCommits()
    const branchNamePromise = repository.getBranchName()
    const pullRequestPromise = repository.getPullRequest()

    const promises = [commitsPromise, branchNamePromise, pullRequestPromise, styleConfigPromise]
    Promise.all(promises).then((results) => {
      const checkStyleData = {
        commits: results[0],
        branchName: results[1],
        pullRequest: results[2],
        config: results[3],
      }
      const errorMessages = new StyleChecker(checkStyleData).check()
      errorMessages.forEach((errorMessage) => {
        if (errorMessage.length !== 0 && errorMessage.trim() !== '') {
          colors.enable()
          core.setFailed(colors.red(errorMessage));
        }
      })
    })
  } catch (error) {
    core.setFailed(`${error.message}\n${error.stack}`)
  }
}

if (GITHUB_EVENT_NAME === GithubEvents.PULL_REQUEST) {
  main()
}
