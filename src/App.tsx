import './App.css'
import { useState } from "react";
import { Gitfiti, GitfitiImage } from "./Gitfiti";
import ContributionCalendar from "./ContributionCalendar";

const SCALE = 4;

type State = {
  input1: string;
  input2: string;
  combobox: string;
  text: string;
};

export default function App() {
  const [formData, setFormData] = useState({
    input1: "",
    input2: "",
    combobox: "OCTOCAT",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean placerat lacus eu iaculis pretium. Donec venenatis vestibulum consequat. Suspendisse libero nisi, vestibulum in blandit ut, sollicitudin pharetra urna. Morbi euismod libero dolor, ac laoreet nunc scelerisque vel. Quisque fringilla nibh elementum sodales pulvinar. Aliquam sodales pellentesque ultrices. Pellentesque mauris elit, finibus nec mi eu, eleifend eleifend leo. Suspendisse venenatis in lacus in consequat.`,
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
      text: new Gitfiti(
        GitfitiImage[state.combobox],
        0,
        SCALE,
      ).generateScript(),
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
            </div>
      </div>

      <ContributionCalendar { ...new Gitfiti(GitfitiImage[formData.combobox]) }/>

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
            formData.text
          }
          </pre>
        </div>
      </div>
    </main>
  );
}
