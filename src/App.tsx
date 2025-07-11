import './App.css'
import { useState } from 'react'

export default function App() {
  const [formData, setFormData] = useState({
    input1: '',
    input2: '',
    combobox: '',
    range: 16,
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean placerat lacus eu iaculis pretium. Donec venenatis vestibulum consequat. Suspendisse libero nisi, vestibulum in blandit ut, sollicitudin pharetra urna. Morbi euismod libero dolor, ac laoreet nunc scelerisque vel. Quisque fringilla nibh elementum sodales pulvinar. Aliquam sodales pellentesque ultrices. Pellentesque mauris elit, finibus nec mi eu, eleifend eleifend leo. Suspendisse venenatis in lacus in consequat.`
  })

  const handleInputChange = (name: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <main>
      <h1>React ⚛️ + Vite ⚡ + Replit 🌀</h1>
      
      <div className="app-container">
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
        
        <div className="text-panel">
          {formData.text}
        </div>

        <button 
          className="copy-button"
          onClick={() => {
            navigator.clipboard.writeText(formData.text).then(() => {
              alert('Text copied to clipboard');
            }).catch(() => {
              alert('Failed to copy to clipboard');
            });
          }}
        >
          Copy
        </button>
      </div>
    </main>
  )
}