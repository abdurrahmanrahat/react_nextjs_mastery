import { NextResponse } from "next/server"

const { match } = require("@formatjs/intl-localematcher")
const Negotiator = require("negotiator")

let locales = ['bn', 'en']
let defaultLocale = 'en'

function getLocate(request){
    const acceptedLanguage = request.headers.get('accept-language') ?? undefined

    let headers = {
        'accept-language': acceptedLanguage
    }

    let languages = new Negotiator({headers}).languages()

    // console.log("languages", languages)

    return match(languages, locales, defaultLocale)

}

export function middleware(request){
    const pathname = request.nextUrl.pathname;

    const isLocalMissingInPathname = locales.every(locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`)

    if(isLocalMissingInPathname){
        const locale = getLocate(request)

        return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url))
    }


}

export const config = {
      matcher: [
    // Skip all internal paths (_next)
    // '/((?!_next).*)',
    '/((?!api|assets|.*\\..*|_next).*)'
    // Optional: only run on root (/) URL
    // '/'
  ],
}