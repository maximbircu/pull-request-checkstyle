const CommitStyleConfig = require('./commit/commit-style-config')
const BranchStyleConfig = require('./branch/branch-style-config')

module.exports = function(readConfig) {
  const readOrDefault = (name, defaultValue) => {
    const value = readConfig(name)
    return value !== undefined && value.trim() !== '' ? value : defaultValue
  }

  this.commit = new CommitStyleConfig(
      readOrDefault('commit-message-title-regex', '.*'),
      readOrDefault('commit-message-title-min-length', 10),
      readOrDefault('commit-message-title-max-length', 72),
  )

  this.branch = new BranchStyleConfig(
      readOrDefault('branch-name-regex', '.*'),
      readOrDefault('branch-name-min-length', 10),
      readOrDefault('branch-name-max-length', 72),
  )
}
