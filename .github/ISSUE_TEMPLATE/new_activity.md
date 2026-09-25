<a id="top"></a>

name: New activity suggestion
description: Suggest a concept, exercise, or practice project
title: "[Activity] "
labels: ["enhancement", "needs triage"]
body:
  - type: markdown
    attributes:
      value: |
        Use this form to suggest new learning material. Please check the week guides first to avoid duplicating something that already exists.

  - type: dropdown
    id: week
    attributes:
      label: Which week does this belong to?
      options:
        - Week 01 - Regular Expressions
        - Week 02 - Basic HTML and CSS
        - Week 03 - Advanced HTML and CSS
        - Week 04 - JavaScript Deep Dive
        - Week 05 - jQuery and Web Scraping
        - A future week
        - Not week specific
    validations:
      required: true

  - type: input
    id: concept
    attributes:
      label: Concept
      description: The single skill this activity would teach.
      placeholder: Using CSS custom properties in a component
    validations:
      required: true

  - type: textarea
    id: description
    attributes:
      label: What should the student build?
      description: Describe the activity in a sentence or two.
      placeholder: A pricing card that changes colour when a switch is toggled.
    validations:
      required: true

  - type: dropdown
    id: level
    attributes:
      label: Difficulty
      options:
        - Beginner
        - Intermediate
        - Advanced
    validations:
      required: true

  - type: textarea
    id: skills
    attributes:
      label: Which existing concepts does it reuse?
      placeholder: CSS variables, `:checked`, transitions
    validations:
      required: true

  - type: checkboxes
    id: scope
    attributes:
      label: Scope check
      options:
        - label: This teaches something already in the course outline
          required: true
        - label: This does not include graded assessment content or answer keys
          required: true
        - label: This does not require scraping or downloading content from a live website
          required: true

  - type: textarea
    id: extra
    attributes:
      label: Anything else
      description: Reference material, difficulty notes, or ideas for hints.

---

[Back to top](#top)
