import './App.css'
import { useState } from 'react'

export default function App() {
  const [formData, setFormData] = useState({
    input1: '',
    input2: '',
    combobox: '',
    range: 16
  })

  // Global input change handler
  const handleInputChange = (name: string, value: string | number) => {
    console.log(`Input changed: ${name} = ${value}`)
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Add any additional global logic here
    // For example: validation, API calls, etc.
  }

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
            value={formData.input1}
            onChange={(e) => handleInputChange('input1', e.target.value)}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="input2">Second Input:</label>
          <input 
            type="text" 
            id="input2" 
            name="input2" 
            placeholder="Enter second value"
            value={formData.input2}
            onChange={(e) => handleInputChange('input2', e.target.value)}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="combobox">Select Option:</label>
          <select 
            id="combobox" 
            name="combobox"
            value={formData.combobox}
            onChange={(e) => handleInputChange('combobox', e.target.value)}
          >
            <option value="">Choose an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        
        <div className="input-group">
          <label htmlFor="range">Range Slider: {formData.range}</label>
          <input 
            type="range" 
            id="range" 
            name="range"
            min="4"
            max="16"
            value={formData.range}
            onChange={(e) => handleInputChange('range', Number(e.target.value))}
          />
        </div>
      </div>
    </main>
  )
}