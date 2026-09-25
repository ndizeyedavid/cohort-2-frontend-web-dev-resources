# Contributing to This Repository

Thanks for helping out. This repository is a shared learning resource for our class, and it only stays useful when classmates contribute fixes, clearer explanations, and new practice material.

This guide explains what a useful contribution looks like, how to submit one, and what we ask you to avoid.

---

## Table of Contents

- [Who This Is For](#who-this-is-for)
- [What This Repository Is](#what-this-repository-is)
- [Ways to Contribute](#ways-to-contribute)
- [Before You Start](#before-you-start)
- [Setting Up the Repository](#setting-up-the-repository)
- [Contribution Workflow](#contribution-workflow)
- [Documentation Guidelines](#documentation-guidelines)
- [Code Guidelines](#code-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Folder and File Naming](#folder-and-file-naming)
- [Reporting Problems Instead of Contributing](#reporting-problems-instead-of-contributing)
- [Review Process](#review-process)
- [What We Will Not Accept](#what-we-will-not-accept)
- [Code of Conduct](#code-of-conduct)
- [Questions](#questions)

---

## Who This Is For

Anyone in our class can contribute. You do not need to be the most advanced developer in the room. Fixing a broken link or clarifying one sentence is a real contribution.

If you are learning on your own and found something helpful or incorrect, you are also welcome to contribute.

---

## What This Repository Is

This is a teaching resource. Every file exists to help a classmate understand a concept.

Three things matter most:

1. **Clarity.** A reader should understand what a file demonstrates without extra context from class.
2. **Correctness.** Code should run, and explanations should be accurate.
3. **Consistency.** New material should look like the material already here.

When those three goals conflict, clarity for the student wins.

---

## Ways to Contribute

Here are contributions that are genuinely useful, roughly ordered by how much help they give.

**Fixing something wrong**

- A broken link in a guide
- A code example that does not run
- An explanation that is inaccurate or outdated
- A typo or a spelling mistake
- A missing closing tag or incorrect attribute

**Improving an explanation**

- Adding a plain-language summary before technical detail
- Adding a hint where students commonly get stuck
- Adding a common mistake to an existing section
- Replacing a vague explanation with a concrete example
- Adding a "try this" exercise to a concept folder

**Adding small practice material**

- A short extra exercise for an existing concept
- A worked example that shows a step many students skip
- A before-and-after comparison showing a weak and a strong approach

**Adding a full activity**

- Only when it covers a concept already in the course outline
- Only when it is something you have actually completed yourself

---

## Before You Start

Please do these three things first. They save everyone time.

**1. Check that the problem is real.**

Open the file and confirm the issue. Sometimes a link works in a local editor but not on GitHub, or a path looks wrong but resolves correctly.

**2. Search the repository.**

The same fix may already exist in another week folder or on another branch.

**3. Open an issue first for anything large.**

If you plan to add a new week, a new activity, or a large restructure, discuss it before writing the code. A ten-minute conversation saves a wasted afternoon.

---

## Setting Up the Repository

**Requirements**

| Tool | Needed for |
|------|-----------|
| Git | Cloning and committing |
| Node.js 18 or newer | Running Week 4 and Week 5 scripts |
| A code editor | Editing files |
| A modern browser | Viewing the HTML and CSS activities |

Confirm your tools:

```bash
git --version
node --version
npm --version
```

**Fork and clone**

1. Open the repository on GitHub.
2. Click **Fork**.
3. Clone your fork to your computer:

```bash
git clone https://github.com/your-username/cohort-2-frontend-web-dev-resources.git
cd cohort-2-frontend-web-dev-resources
```

**Keep your fork updated**

```bash
git remote add upstream https://github.com/ndizeyedavid/cohort-2-frontend-web-dev-resources.git
git fetch upstream
git checkout main
git merge upstream/main
```

**Create a branch**

Never work directly on `main`. Create a focused branch:

```bash
git checkout -b fix-week-02-broken-link
git checkout -b docs-explain-box-model
git checkout -b add-grid-practice-example
```

Use a short branch name that describes the change.

---

## Contribution Workflow

**Step 1: Make your change.**

Edit the smallest set of files that solves the problem. A focused change is easier to review and easier to revert.

**Step 2: Verify it works.**

Run the examples you touched:

```bash
# Week 4 Node examples
node week-04-javascript/01-variables-and-scopes/01-var-let-const.js

# Week 5 scraping examples
cd week-05-web-scraping-jquery/web-scraping
node 01-simple-scraping/simple-scraper.js
node 03-blog-scraping-example/scrape-blog.js
```

For HTML and CSS changes, open the file in a browser and confirm it still renders as expected.

**Step 3: Check your own diff.**

```bash
git status
git diff
```

Read your own changes carefully. This is the last chance to catch an accidental deletion, a leftover debug statement, or a stray file.

**Step 4: Commit.**

```bash
git add path/to/files/you/changed
git commit -m "docs: fix broken link in week 2 guide"
```

**Step 5: Push your branch.**

```bash
git push -u origin your-branch-name
```

**Step 6: Open a pull request.**

Go to your fork on GitHub, click **Compare and pull request**. GitHub fills in the template from [`.github/PULL_REQUEST_TEMPLATE.md`](.github/PULL_REQUEST_TEMPLATE.md) automatically. Keep the headings and delete any section that does not apply, then write a sentence or two under each one.

**Step 7: Respond to review.**

If someone suggests a change, push new commits to the same branch. The pull request updates automatically.

---

## Pull Request Template

The template lives at [`.github/PULL_REQUEST_TEMPLATE.md`](.github/PULL_REQUEST_TEMPLATE.md) and appears automatically when you open a pull request. It asks for:

- **What I changed** and **Why**
- **Type of change** and **Files touched**
- **How I verified it**, as a checklist
- **Week and concept** this belongs to
- A **Checklist** confirming the contribution follows the rules below
- **Related issue**, if there is one

Keep each answer short. Reviewers want to know what changed and how you confirmed it works.

---

## Documentation Guidelines

Most contributions here are documentation, so these rules matter most.

**Structure**

- Start with a one-paragraph summary of what the file or section covers.
- Add a table of contents to any guide longer than roughly one screen.
- Use headings in order without skipping levels.
- Group related content under clear headings instead of one long list.

**Writing style**

- Use short sentences. Long sentences hide mistakes.
- Use the second person for instructions: "Open the file" rather than "one should open the file".
- Prefer "the file reads the HTML" over "the file is reading HTML".
- Name things by what they mean, not by what they are called internally.
- Avoid em dashes in documentation. Use a full stop or a colon instead.
- Avoid "simply", "just", and "obviously". If it were simple, nobody would need the guide.

**Explaining code**

- Explain why a decision was made, not only what the code does.
- Show the expected output when a script prints something.
- Call out the mistake a student is most likely to make.
- Do not paste large blocks of external documentation. Link to it instead.

**Keeping guides accurate**

- When you change code, update the explanation in the same commit.
- When you move a file, update every link that pointed to it.
- When you add a file, add it to the folder's contents table.

---

## Code Guidelines

**HTML**

- Use semantic elements such as `header`, `nav`, `main`, `section`, `article`, and `footer`.
- Include `lang`, `charset`, and the viewport meta tag in every page.
- Pair every `label` with the `for` attribute matching the input `id`.
- Add `alt` text to images, or an empty `alt` if the image is decorative.

**CSS**

- Use CSS custom properties for colors, spacing, and radii instead of repeating values.
- Use `box-sizing: border-box` in the reset.
- Name classes after purpose, such as `.form-field`, not appearance, such as `.box-2`.
- Use Flexbox for one-dimensional layout and Grid for two-dimensional layout.
- Keep animations on `transform` and `opacity` for smooth performance.
- Include a responsive breakpoint for anything that must work on a phone.

**JavaScript**

- Use `const` by default and `let` only when reassignment is needed.
- Prefer `const` over `var` in new code.
- Name functions and variables after their purpose.
- Build paths with `path.join` and `__dirname` so scripts run from any working directory.
- Add comments that explain reasoning, not a restatement of the code.
- Check the response status before using fetched data.
- Prefer a built-in method over a long manual loop when the intent is clear.

**Dependencies**

- Add a dependency only when it clearly removes meaningful complexity.
- Record the dependency in the folder's `package.json`.
- Commit `package-lock.json` alongside `package.json`.
- Never commit `node_modules`.
- Do not add a large framework to a concept folder that only needs a small library.

---

## Commit Message Guidelines

Keep commit messages short and factual. A subject line is enough. Avoid long descriptions unless the change genuinely needs context.

Use a simple prefix:

| Prefix | Use it for |
|--------|-----------|
| `docs:` | Guides, explanations, links, and typos |
| `fix:` | Broken code, incorrect logic, or wrong paths |
| `feat:` | A new activity, exercise, or example |
| `chore:` | Repository upkeep, ignore rules, and renaming |

Good examples:

```text
docs: explain flexbox main axis with a diagram
fix: correct week 2 email regex length limit
feat: add grid practice challenge
chore: rename week 4 files for consistent ordering
```

Avoid vague messages such as `update`, `fix stuff`, or `changes`.

---

## Folder and File Naming

Consistency makes the repository easy to navigate.

**Folders**

- Use `kebab-case`, such as `03-method-chaining`
- Prefix activity folders with a number to show the intended order
- Prefix week folders with the week number, such as `week-04-javascript`

**Files**

- Prefix JavaScript files with a number so the reading order is obvious, such as `02-block-scope.js`
- Name files after the concept, not after a number only, such as `02-block-scope.js` and not `02.js`
- Use `index.html`, `style.css`, and `main.css` for the standard page files
- Name guides `README.md`
- When linking to a path with spaces, use URL encoding, so `HTML - Activities` becomes `HTML%20-%20Activities`

---

## Reporting Problems Instead of Contributing

Some issues are better reported than fixed by a classmate who does not have context.

Open an issue when:

- A link is broken and you are not sure what it should point to
- An example does not run and the cause is unclear
- The content contradicts the slides or the course outline
- A file is missing entirely
- You are unsure whether a change fits the course

When reporting, include the file path, what you expected, and what happened instead. Add a screenshot when a visual issue is involved.

---

## Review Process

Every contribution is reviewed before it is merged. A classmate or the class representative reads it and checks three things:

1. **Does it work?** Does the example run and the link resolve?
2. **Is it clear?** Will a student understand it without attending class?
3. **Does it belong?** Is it within the course scope and repository style?

You will usually get one of three responses:

- **Merged.** Thank you, the change is in.
- **Changes requested.** Specific edits are listed, usually small.
- **Discussion.** A different approach is proposed, and you decide together.

Review is about the contribution, never about the person. Disagreement is normal, and explaining your reasoning well is a good sign, not a problem.

---

## What We Will Not Accept

- Graded assessments or anything that reveals an exam question
- Personal data, real names, or contact details of students
- Content copied from another website, course, or paid source
- Scrapers that target a live site without permission
- Large dependencies added without a clear reason
- Files that duplicate existing material instead of improving it
- Minified library files other than the local jQuery copy in `shared/`
- Reformatting unrelated files inside a content change

---

## Code of Conduct

This is a shared learning space. Be kind and assume good intent.

Expected behavior:

- Welcome questions from beginners
- Explain reasoning instead of declaring that something is wrong
- Respect different approaches to the same problem
- Critique the code, never the person who wrote it

Unacceptable behavior:

- Harassment, insults, or personal attacks
- Dismissing questions because they seem basic
- Sharing grades, assessments, or private information
- Repeatedly submitting unrelated or low-effort changes

If something goes wrong, report it to the class representative.

---

## Questions

Not sure whether your change fits? Ask before writing it. Open an issue and describe your idea in a few sentences.

Useful things to include:

- What you want to change
- Which folder it belongs to
- Which course concept it supports
- Why it would help other students

A question asked early is cheaper than a pull request that gets rejected.
