const CommitStyleConfig = require('../../../src/commit/commit-style-config')
const CommitMessageFormatChecker = require('../../../src/commit/checkers/commit-message-format-checker')

test('returns undefined in case the commit message matches the regexp', () => {
  const config = new CommitStyleConfig('^[A-Z].*', 2, 2)
  const checker = new CommitMessageFormatChecker(config)

  const error = checker.run({message: 'Correct commit message format'})

  expect(error).toBeUndefined()
})

test('returns an error message in case the commit message doesn\'t match the regexp', () => {
  const config = new CommitStyleConfig('^[A-Z].*', 2, 2)
  const checker = new CommitMessageFormatChecker(config)

  const error = checker.run({message: 'wrong commit message format'})

  expect(error).toEqual('Commit message doesn\'t match the regex - /^[A-Z].*/')
})


