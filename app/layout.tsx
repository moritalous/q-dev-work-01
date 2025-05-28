import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TODOアプリ",
  description: "シンプルで使いやすいTODOアプリ",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEwLjk4NiAxNC4wMDFoLTRhMSAxIDAgMCAxIDAtMmg0YTEgMSAwIDAgMSAwIDJtLTQtNGExIDEgMCAwIDEgMC0yaDEyYTEgMSAwIDAgMSAwIDJtMTEgNmgtMTJhMSAxIDAgMCAxIDAtMmgxMmExIDEgMCAwIDEgMCAybS0xMi02aDhhMSAxIDAgMCAxIDAgMmgtOGExIDEgMCAwIDEgMC0yTTIxLjk4NiA4LjAwMXYxMWEyIDIgMCAwIDEtMiAyaC0xNmEyIDIgMCAwIDEtMi0ydi0xNmEyIDIgMCAwIDEgMi0yaDExbDctN3oiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==",
        sizes: "any",
        type: "image/svg+xml",
      }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getThemePreference() {
                  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
                    return localStorage.getItem('theme');
                  }
                  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                
                const theme = getThemePreference();
                document.documentElement.classList.add(theme);
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
