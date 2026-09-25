# Week 01 - Regular Expressions

**Prerequisites:** None - this is our starting week.
**Assessment:** Non-graded practice - this week is about building intuition for pattern matching.

Regular expressions (regex) are search patterns used to match, validate, and extract text. You will use them in Week 01's Intranet Project, Class Activity (Extraction with `modified_sms_v2.xml`), and again in every future week for form validation.

> **A note on notation:** This README ignores the `/.../` delimiters you see in JavaScript (e.g., `/[a-z]/g`). Each file contains the raw pattern only - e.g., `[a-zA-Z0-9]` not `/[a-zA-Z0-9]/`. That is intentional.
>
> **A note on file names:** Each pattern lives in its own `.regex` file with a number prefix so the intended study order is obvious. Files are named after what the pattern does, not what it matches.

---

## 📦 What's Included

| File                                   | Topic                           | Pattern                                                                |
| -------------------------------------- | ------------------------------- | ---------------------------------------------------------------------- |
| [01-character-classes.regex](01-character-classes.regex)                 | Character classes               | `[a-zA-Z0-9]`                                                          |
| [02-word-boundaries.regex](02-word-boundaries.regex)                 | Word boundaries                 | `\borange\b`                                                           |
| [03-email-validation.regex](03-email-validation.regex)             | Email validation                | `^[a-zA-Z0-9._\-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`                      |
| [04-password-strength.regex](04-password-strength.regex)       | Strong password (lookaheads)    | `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$` |
| [05-url-validation.regex](05-url-validation.regex)                 | URL validation (**fixed**)      | `https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:[^\s]*)?`                   |
| [06-card-numbers.regex](06-card-numbers.regex) | Credit card - Visa & Mastercard | `4[0-9]{12}(?:[0-9]{3})?` + Mastercard pattern                         |

---

## 📝 File-by-File Breakdown

### 1) `01-character-classes.regex` - Character Classes: `[a-zA-Z0-9]`

**What it does:** Matches **one** alphanumeric character. To match a whole string of them, you would add a quantifier like `+` → `[a-zA-Z0-9]+`.

**Concept:**

- `[...]` = "match any _one_ character inside the brackets"
- `a-z` = lowercase letters, `A-Z` = uppercase, `0-9` = digits

**Try it:**

- ✅ `a` → match
- ✅ `5` → match
- ❌ `!` → no match
- `[a-zA-Z0-9]` on `hello!` → matches `h` (the first alphanumeric char)

**Hint:** Think of the brackets as a menu - the engine picks one item from the menu per position.

---

### 2) `02-word-boundaries.regex` - Word Boundaries: `\borange\b`

**What it does:** Matches the word `orange` only when it stands alone.

**Concept:**

- `\b` = word boundary (transition between `\w` `[a-zA-Z0-9_]` and non-`\w` or string start/end)
- Without `\b`, `/orange/` would also match inside `orangutan` or `myorangejuice`

**Try it:**

- ✅ `I like orange juice` → match (`orange`)
- ❌ `orangutan` → no match
- ❌ `myorange` → no match

**Hint:** Use `\b` whenever the task says "whole word" or "standalone". A common exam trap is to forget it and get false positives.

---

### 3) `03-email-validation.regex` - `^[a-zA-Z0-9._\-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`

**What it validates:** A basic email address: `local@domain.tld`

| Part               | Meaning                                                |
| ------------------ | ------------------------------------------------------ |
| `^`                | Start of string                                        |
| `[a-zA-Z0-9._\-]+` | Local part: one or more letters, digits, `.`, `_`, `-` |
| `@`                | Literal `@`                                            |
| `[a-zA-Z0-9.-]+`   | Domain: letters, digits, `.`, `-`                      |
| `\.`               | Literal dot before TLD                                 |
| `[a-zA-Z]{2,}`     | TLD: at least 2 letters (e.g., `com`, `rw`, `co`)      |
| `$`                | End of string                                          |

**Try it:**

- ✅ `test@example.com`
- ✅ `first.last@alu.edu.rw`
- ❌ `bad@.com` (nothing between `@` and `.`)
- ❌ `no-at.com`

**Hints & pitfalls:**

- `.` inside `[...]` is literal - you do **not** need to escape it inside brackets, but `\.` outside brackets must be escaped.
- This is a _simplified_ email regex. Real-world email validation is far more complex - for class purposes this pattern is sufficient and expected.
- The `-` at the end of `[a-zA-Z0-9.-]` is literal. If you put `-` in the middle without escaping (e.g., `[a-z-0-9]`) it creates an unintended range.

---

### 4) `04-password-strength.regex` - `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$`

**What it validates:** A strong password with at least 8 characters, containing at least one lowercase, one uppercase, one digit, and one special character from `@$!%*?&`.

| Part                    | Meaning                                                           |
| ----------------------- | ----------------------------------------------------------------- |
| `^` / `$`               | Anchors - whole string must match                                 |
| `(?=.*[a-z])`           | Positive lookahead: "somewhere ahead there is a lowercase letter" |
| `(?=.*[A-Z])`           | Lookahead: at least one uppercase                                 |
| `(?=.*\d)`              | Lookahead: at least one digit                                     |
| `(?=.*[@$!%*?&])`       | Lookahead: at least one special char                              |
| `[A-Za-z\d@$!%*?&]{8,}` | Allowed chars, minimum 8 long                                     |

**Try it:**

- ✅ `StrongPass1@`
- ✅ `Password1!`
- ❌ `weak` (too short, missing upper/digit/special)
- ❌ `NoNumber!A` (missing digit)

**Hints:**

- Lookaheads `(?=...)` check a condition **without moving** the cursor. All four lookaheads check from the same starting position - that is how we enforce "must contain all of these".
- Order of lookaheads does not matter.
- The final `[...]{8,}` defines _what_ is allowed and _how long_. Without it, `@` would pass the lookaheads but the engine would not know what to actually consume.
- Common mistake: forgetting `^` and `$` - without them, `abc` would pass because `abcStrongPass1@` contains a valid substring.

---

### 5) `05-url-validation.regex` - `https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:[^\s]*)?` ✅ Fixed

> **Previous version had a bug:** `(https,http):\/\/[a-zA-Z0-9.?#]\.[a-zA-Z]*`

**What was wrong:**

| Bug                                 | Why it fails                                                                                                                                                                                               |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `(https,http)`                      | `,` is literal. `(a,b)` means "match `a` or `,` or `b`" as characters, not "a or b". The correct alternation operator is `\|` → `(https\|http)` or the shorthand `https?` (`s` optional).                  |
| `[a-zA-Z0-9.?#]` with no quantifier | A character class without `+`/`*` matches **exactly one** character. So `[a-zA-Z0-9.?#]` would only match one char before the dot (e.g., `https://a.com` would match but `https://example.com` would not). |
| `\.[a-zA-Z]*`                       | `*` allows zero letters after the dot, so `https://example.` would incorrectly pass.                                                                                                                       |

**Fixed version:** `https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:[^\s]*)?`

| Part             | Meaning                                                                    |
| ---------------- | -------------------------------------------------------------------------- |
| `https?`         | `http` + optional `s` → matches `http` or `https`                          |
| `:\/\/`          | Literal `://` (`\/` is escaped `/` - you can also write `://`)             |
| `[a-zA-Z0-9.-]+` | Domain name: one or more letters/digits/`.`/`-`                            |
| `\.`             | Literal dot                                                                |
| `[a-zA-Z]{2,}`   | TLD: at least 2 letters                                                    |
| `(?:[^\s]*)?`    | Optionally, any non-space characters after (path, query `?`, fragment `#`) |

**Try it:**

- ✅ `https://example.com`
- ✅ `http://sub.domain.org/path?q=1#frag`
- ✅ `https://alu.edu.rw/students?id=5`
- ❌ `ftp://example.com` (only http/https allowed)
- ❌ `example.com` (missing protocol)
- ❌ `https://a` (no TLD)

**Hint:** If you prefer explicit alternation, `(https|http):\/\/...` is also correct. `https?` is just shorter.

---

### 6) `06-card-numbers.regex` - Visa & Mastercard

This file contains **two** patterns separated by comments:

#### Visa - `4[0-9]{12}(?:[0-9]{3})?`

| Part            | Meaning                                                                               |
| --------------- | ------------------------------------------------------------------------------------- |
| `4`             | Visa cards always start with `4`                                                      |
| `[0-9]{12}`     | Next 12 digits                                                                        |
| `(?:[0-9]{3})?` | Optionally, 3 more digits → supports both 13-digit (old) and 16-digit (standard) Visa |

- ✅ `4111111111111111` (16 digits)
- ✅ `4222222222222` (13 digits)
- ❌ `5111111111111111` (starts with 5 → Mastercard, not Visa)

#### Mastercard - `(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}`

This covers the two Mastercard ranges:

- **Legacy:** `51` to `55` → `5[1-5]...`
- **New (2017+):** `2221` to `2720` → the `222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720` branches

All Mastercard numbers are 16 digits → the prefix (4 digits) + `[0-9]{12}` = 16.

- ✅ `5555555555554444` (legacy)
- ✅ `2223000048400011` (new range)
- ❌ `4111111111111111` (Visa)

**Hint:** Use `^` and `$` (or `\b`) when testing, otherwise `4111111111111111` would match inside `x4111111111111111y`. In the file the anchors are omitted because the pattern may be used with word boundaries or full-match checks - just be aware.

---

## 🔍 How to Test These Patterns

**Option 1 - regex101.com (recommended)**

1. Paste the pattern (without `/.../`)
2. Paste test strings in the "Test String" box
3. Read the right-side explanation panel

**Option 2 - Browser console (JavaScript)**

```js
/^[a-zA-Z0-9._\-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test("test@alu.edu.rw") // true
/\borange\b/.test("orangutan") // false
```

**Option 3 - Python**

```python
import re
re.search(r"\borange\b", "I like orange juice")
re.fullmatch(r"4[0-9]{12}(?:[0-9]{3})?", "4111111111111111")
```

---

## 🎯 Learning Objectives

By the end of Week 01 you should be able to:

1. Read and write character classes `[...]` and know when to escape `-` and `]`
2. Use anchors `^`/`$` and word boundaries `\b` to control _where_ a match occurs
3. Apply quantifiers `+` `*` `?` `{n}` `{n,m}` correctly (especially not forgetting `+` on character classes)
4. Use alternation `|` and grouping `(...)` / `(?:...)`
5. Explain what a lookahead `(?=...)` does and why password validation needs it
6. Debug a broken regex (like the original `05-url-validation.regex`) by isolating each bug

---

## 🔗 References

- [MDN - Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [MDN - Regex Cheatsheet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet)
- [regex101.com](https://regex101.com) - interactive tester with step-by-step explanation
- [RegExr](https://regexr.com) - visual regex builder
- [Regexle](https://regexle.com) - Crazy Regex Puzzle
---

## Progress Checklist

Tick a box when you can do the task without looking at the file.

- [ ] I can explain what a character class such as `[a-zA-Z0-9]` matches
- [ ] I can use `\b` to match a whole word only
- [ ] I know when to anchor a pattern with `^` and `$`
- [ ] I can choose the right quantifier (`+`, `*`, `?`, `{n,m}`)
- [ ] I can write a pattern that validates an email address
- [ ] I can explain what a positive lookahead such as `(?=...)` does
- [ ] I can debug a broken pattern by isolating one small part at a time
- [ ] I can test a pattern in regex101 before using it in code
