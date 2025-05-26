# Netflix-Style Movie List App 🎬

A modern movie browsing application built with Next.js 13, TypeScript, and Tailwind CSS. This app provides a Netflix-like user interface for browsing and searching movies using the TMDB API.

## Features ✨

- 🎯 Netflix-style UI with smooth animations
- 🔍 Real-time movie search
- 🎨 Responsive design for all devices
- 🖼️ High-quality movie posters and backdrops
- ⭐ Movie ratings and details
- 🔄 Infinite scroll for movie list
- 🌙 Dark theme optimized
- ⚡ Fast page loads with Next.js 13

## Tech Stack 🛠️

- **Framework:** Next.js 13
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **API:** TMDB (The Movie Database)
- **State Management:** React Hooks
- **Image Optimization:** Next.js Image Component

## Getting Started 🚀

1. Clone the repository:

```bash
git clone https://github.com/vadikashyap/movie-list-nextjs.git
cd movie-list-nextjs
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your TMDB API key:

```
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure 📁

```
movie-list-nextjs/
├── app/
│   ├── components/     # Reusable UI components
│   ├── services/       # API and data services
│   ├── types/         # TypeScript type definitions
│   └── page.tsx       # Main page component
├── public/            # Static assets
└── styles/           # Global styles
```

## Features in Detail 📝

### Movie List

- Grid layout with responsive design
- Hover effects on movie cards
- Movie ratings and release year
- Infinite scroll for loading more movies

### Search Functionality

- Real-time movie search
- Netflix-style search bar
- Search results with smooth transitions

### Movie Details

- High-quality backdrop images
- Movie overview and information
- Release date and ratings
- Responsive layout

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- [TMDB](https://www.themoviedb.org/) for providing the movie data API
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## Contact 📧

Kashyap Vadi - [@vadikashyap](https://github.com/vadikashyap)

Project Link: [https://github.com/vadikashyap/movie-list-nextjs](https://github.com/vadikashyap/movie-list-nextjs)
