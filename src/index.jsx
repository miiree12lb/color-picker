import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import chroma from 'chroma-js';
import ColorPicker from './ColorPicker.jsx';
import PaletteDisplay from './PaletteDisplay.jsx';
import { BrowserRouter } from "react-router-dom";
// @ts-ignore
import './css/root.css';
import Footer from "./Footer.jsx";

function Root() {
    const [baseColors, setBaseColors] = useState(['#3498db']);
    const [combinationStyle, setCombinationStyle] = useState('all');

    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [monochromaticPalette, setMonochromaticPalette] = useState([]);
    const [anologousPalette, setAnologousPalette] = useState([]);
    const [complementaryPalette, setComplementaryPalette] = useState([]);
    const [triadicPalette, setTriadicPalette] = useState([]);

    function getUniqueColors(colors) {
        return [...new Set(colors)];
    }

    function generateMonochromaticPalette(colors) {
        let generatedPalette = [];
        colors.forEach(color => {
            const scale = chroma.scale([color, '#000']).mode('lab').colors(5);
            generatedPalette = generatedPalette.concat(scale);
        });
        setMonochromaticPalette(getUniqueColors(generatedPalette));
    }

    function generateAnologousPalette(colors) {
        let generatedPalette = [];
        colors.forEach(color => {
            for (let i = -60; i <= 60; i += 30) {
                if (i !== 0) {
                    const analogousColor = chroma(color).set('hsl.h', `+${i}`).hex();
                    generatedPalette.push(analogousColor);
                }
            }
        });
        setAnologousPalette(getUniqueColors(generatedPalette));
    }

    function generateComplementaryPalette(colors) {
        let generatedPalette = [];
        colors.forEach(color => {
            const complement = chroma(color).set('hsl.h', '+180').hex();
            generatedPalette.push(color, complement);
        });
        setComplementaryPalette(getUniqueColors(generatedPalette));
    }

    function generateTriadicPalette(colors) {
        let generatedPalette = [];
        baseColors.forEach(color => {
            const triad = chroma(color).set('hsl.h', '+120').hex();
            const triad2 = chroma(color).set('hsl.h', '-120').hex();
            generatedPalette.push(color, triad, triad2);
        });
        setTriadicPalette(getUniqueColors(generatedPalette));
    }

    function generateColorPalette() {
        const colorSet = new Set(baseColors);
        if (colorSet.size !== baseColors.length) {
            setErrorMessage('Please select unique colors');
            setShowAlert(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout( () => {setShowAlert(false)}, 8000);
            return;
        }


        if (combinationStyle === 'monochromatic') {
            generateMonochromaticPalette(baseColors);
            return;
        }
        if (combinationStyle === 'analogous'){
            generateAnologousPalette(baseColors);
            return;
        }
        if (combinationStyle === 'complementary') {
            generateComplementaryPalette(baseColors);
            return;
        }
        if (combinationStyle === 'triadic') {
            generateTriadicPalette(baseColors);
            return;
        }
        
        generateMonochromaticPalette(baseColors);
        generateAnologousPalette(baseColors);
        generateComplementaryPalette(baseColors);
        generateTriadicPalette(baseColors);
    }

    return (
        <BrowserRouter>
            {showAlert && (
                <div className="alert">
                    <span className="closebtn" onClick={() => setShowAlert(false)}>&times;</span> 
                    <strong>Error:</strong> {errorMessage}
                </div>
            )}

            <h1>Color Palette Generator</h1>

            <div id="view">
                <div id="input-area">
                    <div>
                        <div>
                            <label htmlFor="combination-style">Combination Style:</label>
                            <select id="combination-style" onChange={(e) => {setCombinationStyle(e.target.value)}}>
                                <option value="all">All</option>
                                <option value="monochromatic">Monochromatic</option>
                                <option value="analogous">Analogous</option>
                                <option value="complementary">Complementary</option>
                                <option value="triadic">Triadic</option>
                            </select>
                        </div>

                        <div id="colors-selection">
                            <ColorPicker baseColors={baseColors} setBaseColors={setBaseColors} setPalette />
                        </div>
                    </div>

                    <button id="generate" onClick={generateColorPalette}>Generate Color Palette</button>
                </div>
                
                <div id="output-area">
                    {combinationStyle === 'monochromatic' || combinationStyle === 'all' ? (
                        <PaletteDisplay title="Monochromatic Palette" colors={monochromaticPalette} />
                    ) : null}
                    {combinationStyle === 'analogous' || combinationStyle === 'all' ? (
                        <PaletteDisplay title="Analogous Palette" colors={anologousPalette} />
                    ) : null}
                    {combinationStyle === 'complementary' || combinationStyle === 'all' ? (
                        <PaletteDisplay title="Complementary Palette" colors={complementaryPalette} />
                    ) : null}
                    {combinationStyle === 'triadic' || combinationStyle === 'all' ? (
                        <PaletteDisplay title="Triadic Palette" colors={triadicPalette} />
                    ) : null}
                </div>
            </div>

            <div id="footer">
                <Footer />
            </div>
        </BrowserRouter>
    );
}

const rootElement = document.getElementById("root");
if (rootElement) {
    createRoot(rootElement).render(<Root />);
}
