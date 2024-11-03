import React from 'react';
// @ts-ignore
import './css/root.css';

const ColorPicker = ({ baseColors, setBaseColors }) => {
  	const handleChange = (index, newColor) => {
    	const updatedColors = [...baseColors];
    	updatedColors[index] = newColor;
    	setBaseColors(updatedColors);
  	};

  	const addColorInput = () => {
		if (baseColors.length < 3)
    		setBaseColors([...baseColors, '#000000']);
  	};

  	const removeLastColor = () => {
    	if (baseColors.length > 1) {
      		setBaseColors(baseColors.slice(0, -1)); // Remove the last color
    	}
  	};

  	return (
    	<>
			<p>Select up to 3 colors:</p>
        	<div>
            	{baseColors.map((color, index) => (
                	<input
                    	key={index}
                    	type="color"
                    	value={color}
                    	onChange={(e) => handleChange(index, e.target.value)}
            		/>
            	))}
      		</div>
      	
			<div id="buttons">
				<button onClick={addColorInput} disabled={baseColors.length >= 3}>Add Color</button>
				<button onClick={removeLastColor} disabled={baseColors.length === 1}>Remove Color</button>
			</div>
		</>
    
  	);
};

export default ColorPicker;