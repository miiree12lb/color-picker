import React from 'react';
import './css/root.css';

function PaletteDisplay({ title, colors }) {
    return (
        <div className="palette-display">
            <h3>{title}</h3>
            <div className="palette-colors">
                {colors.map((color, index) => (
                    <div
                        key={index}
                        className="color-swatch"
                        style={{ backgroundColor: color }}
                        title={color}
                    >
                        <span>{color}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PaletteDisplay;
