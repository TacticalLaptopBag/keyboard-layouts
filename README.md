# Keyboard Layouts

[Deployed GitHub Page][deployed-link]

This is a reimplementation of the [loboru.github.io][loboru] site.
This site is meant to teach visitors how to use one-handed Dvorak keyboard layouts.

However, this site depends on a third-party service, incorporating iframes from [10fastfingers].
This worked well, except then the iframe service went down sometime around 2026-04-13, and has not recovered since.

This minimal Angular web app reimplements the 10fastfingers iframes so that there's no third-party dependencies.
This site will remain running for as long as GitHub Pages exists.

Currently, the site is very minimal, but will be expanded upon soon.

## Setup

1. Install [NodeJS][nodejs]
2. Run these commands:
```bash
npm install --global @angular/cli
git clone https://github.com/TacticalLaptopBag/keyboard-layouts
cd keyboard-layouts
npm install
```
3. Run a local development server with this command:
```bash
npm run start
```

## Deploy

Simply run this command to deploy to GitHub Pages:
```bash
ng deploy --base-href=/keyboard-layouts/
```

## Attribution

Please note that the included license only applies to the code and page layout.
The images and wordlists have been ripped straight from [loboru's source code][loboru-src].
I did not create these images, nor did I create the wordlists.

<!-- links -->
[deployed-link]: https://tacticallaptopbag.github.io/keyboard-layouts/
[loboru]: https://loboru.github.io/index.html
[loboru-src]: https://github.com/loboru/loboru.github.io/
[10fastfingers]: https://10fastfingers.com/
[nodejs]: https://nodejs.org/en
