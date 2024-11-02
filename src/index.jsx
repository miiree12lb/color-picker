import React from "react";
import { createRoot } from "react-dom/client";
// @ts-ignore
import './css/root.css';

function Root() {
    return (
        <div>
            <h1>Hello, World!</h1>
            <p>This is a React application.</p>
        </div>
    );
}

const rootElement = document.getElementById("root");
if (rootElement) {
    createRoot(rootElement).render(<Root />);
}