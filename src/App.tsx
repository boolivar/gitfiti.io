import './App.css'
import { useState } from 'react'

export default function App() {
  const [rangeValue, setRangeValue] = useState(50)

  return (
    <main>
      <h1>React ⚛️ + Vite ⚡ + Replit 🌀</h1>
      
      <div className="form-container">
        <div className="input-group">
          <label htmlFor="input1">First Input:</label>
          <input 
            type="text" 
            id="input1" 
            name="input1" 
            placeholder="Enter first value"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="input2">Second Input:</label>
          <input 
            type="text" 
            id="input2" 
            name="input2" 
            placeholder="Enter second value"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="combobox">Select Option:</label>
          <select id="combobox" name="combobox">
            <option value="">Choose an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        
        <div className="input-group">
          <label htmlFor="range">Range Slider: {rangeValue}</label>
          <input 
            type="range" 
            id="range" 
            name="range"
            min="0"
            max="100"
            value={rangeValue}
            onChange={(e) => setRangeValue(Number(e.target.value))}
          />
        </div>
      </div>
    </main>
  )
}