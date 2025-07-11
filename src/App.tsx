import './App.css'
import { useState } from 'react'

export default function App() {
  const [formData, setFormData] = useState({
    input1: '',
    input2: '',
    combobox: '',
    range: 16
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
          <h2>Form Data</h2>
          <div className="data-display">
            <div className="data-item">
              <strong>First Input:</strong> {formData.input1 || 'Empty'}
            </div>
            <div className="data-item">
              <strong>Second Input:</strong> {formData.input2 || 'Empty'}
            </div>
            <div className="data-item">
              <strong>Selected Option:</strong> {formData.combobox || 'None selected'}
            </div>
            <div className="data-item">
              <strong>Range Value:</strong> {formData.range}
            </div>
          </div>
          
          <div className="json-display">
            <h3>JSON Data:</h3>
            <pre id="json-content">{JSON.stringify(formData, null, 2)}</pre>
            <button 
              className="copy-button"
              onClick={() => {
                const jsonContent = JSON.stringify(formData, null, 2);
                navigator.clipboard.writeText(jsonContent).then(() => {
                  alert('JSON data copied to clipboard!');
                }).catch(() => {
                  alert('Failed to copy to clipboard');
                });
              }}
            >
              Copy JSON
            </button>
          </div>
          
          <div className="summary-display">
            <h3>Summary Text:</h3>
            <div id="summary-content" className="summary-text">
              Form Summary:
              - First Input: {formData.input1 || 'not provided'}
              - Second Input: {formData.input2 || 'not provided'}
              - Selected Option: {formData.combobox || 'none'}
              - Range Value: {formData.range}
            </div>
            <button 
              className="copy-button"
              onClick={() => {
                const summaryText = `Form Summary:
- First Input: ${formData.input1 || 'not provided'}
- Second Input: ${formData.input2 || 'not provided'}
- Selected Option: ${formData.combobox || 'none'}
- Range Value: ${formData.range}`;
                navigator.clipboard.writeText(summaryText).then(() => {
                  alert('Summary copied to clipboard!');
                }).catch(() => {
                  alert('Failed to copy to clipboard');
                });
              }}
            >
              Copy Summary
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}