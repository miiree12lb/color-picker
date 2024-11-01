import React, { useState } from "react";
import { createRoot } from "react-dom/client";
// @ts-ignore
import './css/style.css';

function Root() {

    return (
        <>
            
        </>
    );
}

const rootElement = document.getElementById("root");
if (rootElement) {
    createRoot(rootElement).render(<Root />);
}
