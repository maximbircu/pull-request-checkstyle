const CommitStyleChecker = require('../../src/commit/commit-style-checker')
const CommitStyleConfig = require('../../src/commit/commit-style-config')

test('returns empty string if all checks passed', () => {
  const commits = [{message: 'Initial commit'}]
  const config = new CommitStyleConfig('^[A-Z].*', 10, 50)
  const checker = new CommitStyleChecker(commits, config)

  const errorsMessage = checker.run()

  expect(errorsMessage).toEqual('')
})

test('returns proper error message if commit checks failed', () => {
  const commits = [
    {message: 'initial commit'},
    {message: 'A commit which should pass the checks'},
    {message: 'another wrong commit which is too long to pass the style check'},
  ]
  const config = new CommitStyleConfig('^[A-Z].*', 20, 50)
  const checker = new CommitStyleChecker(commits, config)

  const errorsMessage = checker.run()

  expect(errorsMessage).toEqual(
      '\nCommit style violations found!\n\n' +
    '"initial commit":\n' +
    ' - Commit message doesn\'t match the regex - /^[A-Z].*/\n' +
    ' - Commit message is shorter then 20\n\n' +
    '"another wrong commit which is too long to pass the style check":\n' +
    ' - Commit message doesn\'t match the regex - /^[A-Z].*/\n' +
    ' - Commit message is longer then 50\n',
  )
})
