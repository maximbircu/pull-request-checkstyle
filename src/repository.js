const github = require('@actions/github')
const core = require('@actions/core')
const GithubEvents = require('./github-events.js')

const {GITHUB_TOKEN, GITHUB_EVENT_NAME} = process.env
const {context: eventContext} = github

const octokit = new github.GitHub(GITHUB_TOKEN)

module.exports = function() {
  const StyleConfig = require('./style-config.js')

  /**
   * Fetches the commits list of the PR.
   *
   * @return {Promise<Octokit.PullsListCommitsResponseItemCommit[]>} commits list promise
   */
  this.getCommits = async () => {
    const {owner, repo, number} = eventContext.issue
    const {data: commits} = await octokit.pulls.listCommits({
      owner,
      repo,
      pull_number: number,
    })
    return commits.map((commitWrapper) => commitWrapper.commit)
  }

  /**
   * Fetches the PR source branch name.
   *
   * @return {Promise<void|string|*>} branch name promise
   */
  this.getBranchName = async () => {
    switch (GITHUB_EVENT_NAME) {
      case GithubEvents.PUSH:
        return eventContext.payload.ref.replace('refs/heads/', '');
      case GithubEvents.PULL_REQUEST:
        return eventContext.payload.pull_request.head.ref;
      default:
        throw new Error(`Invalid event name: ${GITHUB_EVENT_NAME}`);
    }
  }

    /**
   * Fetches the Pull Request Obbject.
   *
   * @return {Promise<void|string|*>} pull request promis
   */
    this.getPullRequest = async () => {
      switch (GITHUB_EVENT_NAME) {
        case GithubEvents.PUSH:
          return null
        case GithubEvents.PULL_REQUEST:
          return eventContext.payload.pull_request;
        default:
          throw new Error(`Invalid event name: ${GITHUB_EVENT_NAME}`);
      }
    }

  /**
   * Fetches the checkstyle config from the user action yml configuration.
   *
   * @return {Promise<exports>} style config promise
   */
  this.getStyleConfig = async () => new StyleConfig((name) => core.getInput(name))
}
