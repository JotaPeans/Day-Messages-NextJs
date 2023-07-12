"use client"

const Head = () => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

    return (
        <head>
            <link rel='apple-touch-icon' href='https://i.imgur.com/aGP4Njz.jpg' />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <link rel="apple-touch-startup-image" href="/launch.png" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            {darkThemeMq.matches ? <meta name="theme-color" content="#27272a" /> : <meta name="theme-color" content="#fff" />}
            
        </head>
    );
}
 
export default Head;