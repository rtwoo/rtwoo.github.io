# rtwoo.github.io

Personal academic website for Ryan T. Woo, built with [Jekyll](https://jekyllrb.com/) and the [al-folio](https://github.com/alshedivat/al-folio) theme.

## Local development

Install Ruby dependencies:

```bash
bundle install
```

Run the site locally:

```bash
bundle exec jekyll serve
```

The site will be available at <http://localhost:4000>.

Or use Docker:

```bash
docker compose build
docker compose up
```

The Docker preview runs at <http://localhost:8080>.

## Content

- Homepage and navigation pages live in `_pages/`.
- Publications are managed in `_bibliography/papers.bib`.
- Presentations live in `_talks/`.
- Teaching entries live in `_teachings/`.
- Static PDFs and other public files remain in `files/`.
