import './App.css'
import { useState } from "react";
import { Gitfiti, GitfitiImage } from "./Gitfiti";
import ContributionCalendar from "./ContributionCalendar";

type State = {
  combobox: string;
  offset: number;
  gitfiti: Gitfiti;
};

export default function App() {
  const [formData, setFormData] = useState({
    combobox: "OCTOCAT",
    offset: 0,
    gitfiti: new Gitfiti(GitfitiImage["OCTOCAT"])
  });

  const handleInputChange = (name: string, value: string | number) => {
    setFormData((prev) =>
      generateGitfiti({
        ...prev,
        [name]: value,
      }),
    );
  };

  const generateGitfiti = (state: State): State => {
    return {
      ...state,
      gitfiti: new Gitfiti(
        GitfitiImage[state.combobox],
        state.offset,
      ),
    };
  };

  return (
    <main>
      <h1>Gitfiti</h1>

      <div className="inputs">
        <div className="input-group">
          <label htmlFor="combobox">Select Option:</label>
          <select
              id="combobox"
              name="combobox"
              value={formData.combobox}
              onChange={(e) => handleInputChange("combobox", e.target.value)}
            >
              <option value="OCTOCAT">OCTOCAT</option>
              <option value="OCTOCAT2">OCTOCAT2</option>
              <option value="KITTY">KITTY</option>
              <option value="ONEUP">ONEUP</option>
              <option value="ONEUP2">ONEUP2</option>
              <option value="HACKERSCHOOL">HACKERSCHOOL</option>
              <option value="HELLO">HELLO</option>
              <option value="HEART1">HEART1</option>
              <option value="HEART2">HEART2</option>
              <option value="HIREME">HIREME</option>
              <option value="BEER">BEER</option>
              <option value="GLIDERS">GLIDERS</option>
              <option value="HEART">HEART</option>
              <option value="HEART_SHINY">HEART_SHINY</option>
          </select>
          <label htmlFor="offset">Week Offset:</label>
          <input type="number" value={formData.offset} onChange={(e) =>
            handleInputChange("offset", e.target.value)}>
          </input>
        </div>
      </div>

      <ContributionCalendar { ...formData }/>

      <div className="script">
        <div className="script-actions">
          <button
            onClick={() => {
              navigator.clipboard
                .writeText(formData.text)
                .then(() => {
                  alert("Text copied to clipboard");
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
              const blob = new Blob([formData.text], { type: "text/plain" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
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
          <pre>
          {
            formData.gitfiti.generateScript()
          }
          </pre>
        </div>
      </div>
    </main>
  );
}
