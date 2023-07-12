"use client"

import { useState, useEffect } from "react";

const Head = () => {
    const [ dark, setDark ] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") setDark(window.matchMedia("(prefers-color-scheme: dark)").matches)
    }, []);

    return (
        <head>
            <link rel='apple-touch-icon' href='https://i.imgur.com/aGP4Njz.jpg' />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <link rel="apple-touch-startup-image" href="/launch.png" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            {dark ? <meta name="theme-color" content="#27272a" /> : <meta name="theme-color" content="#fff" />}
            
        </head>
    );
}
 
export default Head;