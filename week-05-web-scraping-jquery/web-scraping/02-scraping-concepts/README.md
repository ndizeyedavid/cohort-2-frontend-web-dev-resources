# Scraping Concepts

The scraping pipeline split into four focused files: read a source, select and extract, clean the data, and behave responsibly.

## Files

| File | Purpose |
|------|---------|
| `01-read-source.js` | Loads a source and prints basic information about it. |
| `02-select-and-extract.js` | Shows that a selector finds a target and extraction reads the value. |
| `03-clean-and-normalize.js` | Trims, converts, creates slugs, and handles missing values. |
| `04-responsible-scraping.js` | A respectful request sequence that makes no network calls. |

## Key concepts

- Source, selection, extraction, cleaning, validation
- Raw page text is not ready for an application
- Check permissions, prefer an API, and add delays

## How to run

Run each file with Node from this folder.

## Try this

Add a function to file 03 that converts a date string such as `2026-09-24` into `2026/09/24`.

## Full explanation

The week guide covers this activity in detail, including hints and common mistakes:

- [Web Scraping Guide](../README.md)
