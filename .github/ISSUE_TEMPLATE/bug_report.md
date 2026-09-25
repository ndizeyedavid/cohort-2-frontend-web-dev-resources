name: Bug report
description: Something in the repository is broken or wrong
title: "[Bug] "
labels: ["bug", "needs triage"]
body:
  - type: markdown
    attributes:
      value: |
        Thanks for reporting a problem. Please check that it still happens before filing.

  - type: textarea
    id: what-happened
    attributes:
      label: What went wrong
      description: Describe the problem in plain language.
      placeholder: The example in Week 03 does not load its stylesheet.
    validations:
      required: true

  - type: textarea
    id: expected
    attributes:
      label: What you expected instead
      placeholder: The page should look like the screenshot in the guide.
    validations:
      required: true

  - type: input
    id: file-path
    attributes:
      label: File or folder
      description: The path of the file that has the problem.
      placeholder: week-03-html-css-ADVANCED/grid/main.css
    validations:
      required: true

  - type: dropdown
    id: category
    attributes:
      label: What kind of problem is this?
      options:
        - Broken link
        - Code does not run
        - Incorrect explanation or wrong code
        - Layout or styling issue
        - Accessibility issue
        - Missing file
        - Something else
    validations:
      required: true

  - type: textarea
    id: steps
    attributes:
      label: Steps to reproduce
      description: How can someone else see the same problem?
      placeholder: |
        1. Open the file
        2. Click the second button
        3. Nothing happens
    validations:
      required: true

  - type: textarea
    id: environment
    attributes:
      label: Environment
      description: Include these details when relevant.
      placeholder: |
        - Operating system: Windows 11
        - Browser: Chrome 120
        - Node version: v20.11.0
        - Command used: node main.js

  - type: checkboxes
    id: checks
    attributes:
      label: Before submitting
      options:
        - label: I searched the existing issues and this is not a duplicate
          required: true
        - label: I ran the checks in `scripts/` and they did not catch this problem
          required: false
        - label: I am not asking for graded assessment content to be added
          required: true
