# Go For Events Website

A complete responsive Event Management Service Website built utilizing HTML, CSS, and pure JavaScript.

## Features

- **Home Page**: Modern layout highlighting testimonials and galleries with scroll-reveal transitions.
- **Dynamic Theming**: Integrated Dark mode and Light mode matching OS variables dynamically.
- **Gallery**: Dynamic image grids filtering categories with lightbox implementation powered by local storage tracking.
- **Booking Interface**: Form validation capturing data offline successfully towards LocalStorage.
- **Admin Setup**: Secured panel simulating dashboard viewing for active events matching and pushing media directly into existing gallery datasets.
- **Contact Handling**: Integrated Fetch API handling direct integration payloads asynchronously natively.

## Setup Requirements

Designed purely in standard frontend conventions avoiding server reliance requirements. For origin isolation context when running locally due to modern web form validations logic involving storage contexts, start an http server against the primary path. 

**Running Local Server:**
Navigate your terminal against this root repository and initialize:
```bash
python3 -m http.server 8000
```
Then navigate using your browser towards `http://localhost:8000`.
