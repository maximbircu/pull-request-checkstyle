![CI](https://github.com/maximbircu/pull-request-checkstyle/workflows/CI/badge.svg?branch=master)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/maximbircu/github-action-pull-request-checkstyle/blob/master/LICENSE.md)

# Pull Request Checkstyle

Pull Request Checkstyle is a simple Github action that helps to set up some styling rules for the PR commit messages and branch names and identify their violation during CI runtime.

# Usage
```yaml
on: [pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      GITHUB_TOKEN: ${{ secrets.SOME_TOKEN }}
    steps:
    - name: "Check branch name and commit messages style"
      uses: maximbircu/github-action-pull-request-checkstyle@v1.0.0
      with:
        commit-message-title-regex: ".*"     # Commit message title regex (Note that it validates just the first line of the commit message)
        commit-message-title-min-length: 20  # Commit message title min length (Note that it validates just the first line of the commit message)
        commit-message-title-max-length: 72  # Commit message title max length (Note that it validates just the first line of the commit message)

        branch-name-regex: ".*"        # Branch name regex
        branch-name-min-length: 20     # Branch name min length
        branch-name-max-length: 72     # Branch name max length
```

# Contribution rules:
1. Make sure there is a GitHub issue describing the changes you want to contribute with. (Add one if needed)
2. Submit a PR just in case you:
- Fixed the bug or implement the new feature properly;
- Covered all code with unit tests;
- Updated the changelog file;
- Updated the documentation (If needed);
  
License
-------

    Copyright 2020 Maxim Bîrcu

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
