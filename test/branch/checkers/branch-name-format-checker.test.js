const BranchStyleConfig = require('../../../src/branch/branch-style-config')
const BranchNameFormatChecker = require('../../../src/branch/checkers/branch-name-format-checker')

test('returns undefined in case the branch name matches the regexp', () => {
  const config = new BranchStyleConfig('\\d+(-([a-z])+)+', 2, 2)
  const checker = new BranchNameFormatChecker(config)

  const error = checker.run({name: '3-correct-branch-name'})

  expect(error).toBeUndefined()
})

test('returns an error message in case the branch name doesn\'t match the regexp', () => {
  const config = new BranchStyleConfig('\\d+(-([a-z])+)+', 2, 2)
  const checker = new BranchNameFormatChecker(config)

  const error = checker.run({name: 'Wrong branch name'})

  expect(error).toEqual('Branch name doesn\'t match the regexp - /\\d+(-([a-z])+)+/')
})


