const CommitStyleConfig = require('../../../src/commit/commit-style-config')
const CommitMessageLengthChecker = require('../../../src/commit/checkers/commit-message-length-checker')

test('returns undefined in case the commit message is in between min and max', () => {
  const config = new CommitStyleConfig('^[A-Z].*', 10, 40)
  const checker = new CommitMessageLengthChecker(config)

  const error = checker.run({message: 'Correct commit message length'})

  expect(error).toBeUndefined()
})

test('returns undefined in case the commit message length equals to min admissible', () => {
  const config = new CommitStyleConfig('^[A-Z].*', 18, 40)
  const checker = new CommitMessageLengthChecker(config)

  const error = checker.run({message: 'Short valid commit'})

  expect(error).toBeUndefined()
})

test('returns undefined in case the commit message length equals to max admissible', () => {
  const config = new CommitStyleConfig('^[A-Z].*', 3, 17)
  const checker = new CommitMessageLengthChecker(config)

  const error = checker.run({message: 'Long valid commit'})

  expect(error).toBeUndefined()
})

test('returns an error message in case the commit message is too short', () => {
  const config = new CommitStyleConfig('^[A-Z].*', 20, 40)
  const checker = new CommitMessageLengthChecker(config)

  const error = checker.run({message: 'Too short commit'})

  expect(error).toEqual('Commit message is shorter than 20')
})

test('returns an error message in case the commit message is too long', () => {
  const config = new CommitStyleConfig('^[A-Z].*', 3, 10)
  const checker = new CommitMessageLengthChecker(config)

  const error = checker.run({message: 'Too long commit'})

  expect(error).toEqual('Commit message is longer than 10')
})
