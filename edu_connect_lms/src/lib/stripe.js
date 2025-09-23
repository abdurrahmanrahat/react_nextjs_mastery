import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",

    appInfo: {
        name: "Edu Connect"
    }
})

/**
import "server-only";

- the file can only be executed on the server
- If you accidentally import this file from a client component, Next.js will throw a build-time error.
- This helps prevent security risks like exposing secret keys, database queries, or private APIs to the browser.
*/