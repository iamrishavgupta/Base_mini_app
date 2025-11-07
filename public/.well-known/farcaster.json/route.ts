function withValidProperties(properties: Record<string, undefined | string | string[]>) {
return Object.fromEntries(
    Object.entries(properties).filter(([_, value]) => (Array.isArray(value) ? value.length > 0 : !!value))
);
}

export async function GET() {
const URL = process.env.NEXT_PUBLIC_URL as string;
return Response.json({
  "accountAssociation": {
    "header": "",
    "payload": "",
    "signature": ""
  },
  "baseBuilder": {
    "ownerAddress": "0x"
  },
  "miniapp": {
    "version": "1",
    "name": "Burger Flip",
    "homeUrl": "https://burgerflip-rishav.vercel.app",
    "iconUrl": "https://burgerflip-rishav.vercel.app/burger-icon.png",
    "splashImageUrl": "https://burgerflip-rishav.vercel.app/splash.png",
    "splashBackgroundColor": "#FFA500",
    "webhookUrl": "https://burgerflip-rishav.vercel.app/api/webhook",
    "subtitle": "Tap burgers before they burn!",
    "description": "A fun and fast-paced game where you tap burgers before they burn. Challenge yourself with increasing difficulty!",
    "screenshotUrls": [
      "https://burgerflip-rishav.vercel.app/screenshot1.png",
      "https://burgerflip-rishav.vercel.app/screenshot2.png",
      "https://burgerflip-rishav.vercel.app/screenshot3.png"
    ],
    "primaryCategory": "games",
    "tags": ["game", "casual", "burger", "tap", "miniapp"],
    "heroImageUrl": "https://burgerflip-rishav.vercel.app/hero.png",
    "tagline": "Flip burgers. Score points. Beat your best!",
    "ogTitle": "Burger Flip - Play on Base",
    "ogDescription": "A fast-paced burger flipping game built on Base. Tap burgers before they burn!",
    "ogImageUrl": "https://burgerflip-rishav.vercel.app/og-image.png",
    "noindex": false
  }
}
); // see the next step for the manifest_json_object
}