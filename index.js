const core = require('@actions/core')
const colors = require('colors/safe');

const {GITHUB_EVENT_NAME} = process.env

const Repository = require('./src/repository.js')
const StyleChecker = require('./src/style-checker.js')

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

    const promises = [commitsPromise, branchNamePromise, styleConfigPromise]
    Promise.all(promises).then((results) => {
      const checkStyleData = {
        commits: results[0],
        branchName: results[1],
        config: results[2],
      }
      const errors = new StyleChecker(checkStyleData).check()
      const errorMessage = errors.join('\n')
      if (errorMessage.length !== 0) {
        colors.enable()
        core.setFailed(colors.red(errorMessage));
      }
    })
  } catch (error) {
    core.setFailed(`${error.message}\n${error.stack}`)
  }
}

if (GITHUB_EVENT_NAME === GITHUB_EVENT_NAME.PULL_REQUEST) {
  main()
}
