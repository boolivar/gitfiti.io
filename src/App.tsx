import "./App.css";
import { useState } from "react";
import { Gitfiti, GitfitiImage } from "./Gitfiti";
import ContributionCalendar from "./ContributionCalendar";

type State = {
  combobox: string;
  offset: number;
  gitfiti: Gitfiti;
  customPattern: number[][];
};

export default function App() {
  const [formData, setFormData] = useState({
    combobox: "OCTOCAT",
    offset: 0,
    gitfiti: new Gitfiti(GitfitiImage["OCTOCAT"]),
    customPattern: Array(7).fill(null).map(() => Array(53).fill(0))
  });
  const [showCopyHint, setShowCopyHint] = useState(false);

  const handleInputChange = (name: string, value: string | number) => {
    setFormData((prev) =>
      generateGitfiti({
        ...prev,
        [name]: value,
      }),
    );
  };

  const generateGitfiti = (state: State): State => {
    const pattern = state.combobox === 'CUSTOM' && state.customPattern 
      ? state.customPattern 
      : GitfitiImage[state.combobox as keyof typeof GitfitiImage];
    
    return {
      ...state,
      gitfiti: new Gitfiti(pattern, state.offset),
    };
  };

  const handleCellClick = (week: number, day: number) => {
    setFormData((prev) => {
      // Switch to CUSTOM if not already
      const newCombobox = "CUSTOM";
      
      // Create new custom pattern with incremented cell value
      const newCustomPattern = prev.customPattern!.map((row, rowIndex) =>
        rowIndex === day
          ? row.map((cell, colIndex) =>
              colIndex === week ? Math.min(cell + 1, 4) : cell
            )
          : [...row]
      );
      
      return generateGitfiti({
        ...prev,
        combobox: newCombobox,
        customPattern: newCustomPattern,
      });
    });
  };

  return (
    <main>
      <h1>Gitfiti</h1>

      <div className="gitfiti-layout">
        <div>
          <div className="inputs">
            <div className="input-group">
              <label htmlFor="combobox">Select Option:</label>
              <select
                id="combobox"
                name="combobox"
                value={formData.combobox}
                onChange={(e) => handleInputChange("combobox", e.target.value)}
              >
                {Object.keys(GitfitiImage).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
              <label htmlFor="offset">Week Offset:</label>
              <input
                type="number"
                value={formData.offset}
                onChange={(e) =>
                  handleInputChange("offset", parseInt(e.target.value) || 0)
                }
              ></input>
            </div>
          </div>
          <ContributionCalendar {...formData} onCellClick={handleCellClick} />
        </div>
        <div className="script">
          <div className="script-actions">
            <button
              onClick={() => {
                navigator.clipboard
                  .writeText(formData.gitfiti.generateScript())
                  .then(() => {
                    setShowCopyHint(true);
                    setTimeout(() => setShowCopyHint(false), 2000);
                  })
                  .catch(() => {
                    alert("Failed to copy to clipboard");
                  });
              }}
            >
              Copy
            </button>
            <button
              onClick={() => {
                const blob = new Blob([formData.gitfiti.generateScript()], {
                  type: "text/plain",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "gitfiti-script.sh";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
            >
              Download
            </button>
          </div>
          <div className="script-text">
            <pre>{formData.gitfiti.generateScript()}</pre>
          </div>
        </div>
      </div>

      {showCopyHint && (
        <div className="copy-hint">✓ Script copied to clipboard!</div>
      )}
    </main>
  );
}
