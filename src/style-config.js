const CommitStyleConfig = require('./commit/commit-style-config')

module.exports = function(readConfig) {
  this.commit = new CommitStyleConfig(
      readConfig('commit-message-regex'),
      readConfig('commit-message-max-length'),
      readConfig('commit-message-min-length'),
  )
}
