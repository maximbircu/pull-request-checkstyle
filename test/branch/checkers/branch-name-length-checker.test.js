const BranchStyleConfig = require('../../../src/branch/branch-style-config')
const BranchNameLengthChecker = require('../../../src/branch/checkers/branch-name-length-checker')

test('returns undefined in case the branch name is in between min and max', () => {
  const config = new BranchStyleConfig('.*', 10, 40)
  const checker = new BranchNameLengthChecker(config)

  const error = checker.run({name: 'correct-branch-name'})

  expect(error).toBeUndefined()
})

test('returns undefined in case the branch name length equals to min admissible', () => {
  const config = new BranchStyleConfig('^[A-Z].*', 27, 40)
  const checker = new BranchNameLengthChecker(config)

  const error = checker.run({name: 'short-but-valid-branch-name'})

  expect(error).toBeUndefined()
})

test('returns undefined in case the branch name length equals to max admissible', () => {
  const config = new BranchStyleConfig('^[A-Z].*', 3, 27)
  const checker = new BranchNameLengthChecker(config)

  const error = checker.run({name: 'long-but-valid-branch-name'})

  expect(error).toBeUndefined()
})

test('returns an error message in case the branch name is too short', () => {
  const config = new BranchStyleConfig('^[A-Z].*', 30, 40)
  const checker = new BranchNameLengthChecker(config)

  const error = checker.run({name: 'too-short-branch-name'})

  expect(error).toEqual('Branch name is shorter than 30')
})

test('returns an error message in case the branch name is too long', () => {
  const config = new BranchStyleConfig('^[A-Z].*', 3, 10)
  const checker = new BranchNameLengthChecker(config)

  const error = checker.run({name: 'too-long-branch-name'})

  expect(error).toEqual('Branch name is longer than 10')
})
