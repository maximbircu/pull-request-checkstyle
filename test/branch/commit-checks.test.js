const BranchStyleConfig = require('../../src/branch/branch-style-config')
const BranchStyleChecker = require('../../src/branch/branch-style-checker')

test('returns empty string if all checks passed', () => {
  const config = new BranchStyleConfig('\\d+(-([a-z])+)+', 20, 72)
  const checker = new BranchStyleChecker({name: '1-correct-branch-name'}, config)

  const errorsMessage = checker.run()

  expect(errorsMessage).toEqual('')
})

test('returns proper error message if branch checks failed', () => {
  const config = new BranchStyleConfig('\\d+(-([a-z])+)+', 20, 72)
  const checker = new BranchStyleChecker({name: 'Wrong branch name'}, config)

  const errorsMessage = checker.run()

  expect(errorsMessage).toEqual(
      '\nBranch style violations found!\n\n' +
    '"Wrong branch name"\n' +
    '- Branch name doesn\'t match the regexp - /\\d+(-([a-z])+)+/\n' +
    '- Branch name is shorter than 20',
  )
})
