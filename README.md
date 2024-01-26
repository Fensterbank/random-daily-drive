# Music+Podcast playlist generator

Generates and regenerates a playlist containing your daily podcasts from the original Daily Drive and your favorite songs mixed with recommendations from Spotify.  
Why this name? I was tired from having always the same or similiar songs in my Daily Drive while having lots of saved songs. So I wanted to have a better mix.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Development

First, run the development server:

```bash
export NODE_OPTIONS=--openssl-legacy-provider
CLIENT_ID=<your_client_id> REDIRECT_URI=http://localhost:3000 yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## License

MIT
