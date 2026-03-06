# Environment Variables Setup

## Google Analytics 4

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a GA4 property
3. Get your Measurement ID (format: `G-XXXXXXXXXX`)
4. Create a file `.env.local` in the project root with:

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual measurement ID.

**Note:** `.env.local` is gitignored and won't be committed to version control.
