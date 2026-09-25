name: Question or idea
description: Ask about the material, share a study tip, or suggest an improvement
title: "[Question] "
labels: ["question", "needs triage"]
body:
  - type: markdown
    attributes:
      value: |
        No question is too basic. If something in a guide confused you, that is a bug in the guide, and fixing it helps everyone who reads it after you.

  - type: dropdown
    id: kind
    attributes:
      label: What kind of post is this?
      options:
        - I am stuck on an activity
        - I do not understand a concept
        - I found a confusing or unclear explanation
        - I have a study tip to share
        - I have an idea for improving the material
        - Something else
    validations:
      required: true

  - type: dropdown
    id: week
    attributes:
      label: Which week is this about?
      options:
        - Week 01 - Regular Expressions
        - Week 02 - Basic HTML and CSS
        - Week 03 - Advanced HTML and CSS
        - Week 04 - JavaScript Deep Dive
        - Week 05 - jQuery and Web Scraping
        - The repository itself (README, checks, contributing)
        - Not specific to a week
    validations:
      required: true

  - type: input
    id: location
    attributes:
      label: File, folder, or section
      description: Where did you get stuck? A path or heading name is perfect.
      placeholder: week-04-javascript/06-es6-classes/README.md, the inheritance section
    validations:
      required: false

  - type: textarea
    id: question
    attributes:
      label: Your question or idea
      description: Describe what you expected, and what happened instead if you already tried something.
      placeholder: |
        I expected super() to run automatically, but I had to call it myself.
        The guide says to call it, but I do not understand why it is not automatic.
    validations:
      required: true

  - type: textarea
    id: attempted
    attributes:
      label: What have you already tried?
      description: Showing your attempt helps someone answer faster.
      placeholder: Read the week guide, searched the folder, and tried a small test file.

  - type: checkboxes
    id: scope
    attributes:
      label: Scope check
      options:
        - label: This does not ask for graded assessment content or answer keys
          required: true
        - label: This does not ask me to scrape a live website
          required: true

  - type: checkboxes
    id: checks
    attributes:
      label: Before posting
      options:
        - label: I searched the existing issues and my question has not been answered
          required: true
        - label: I read the relevant week guide before asking
          required: false
