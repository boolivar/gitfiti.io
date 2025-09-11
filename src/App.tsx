import "./App.css";
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
    gitfiti: new Gitfiti(GitfitiImage["OCTOCAT"]),
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

  const onCellClick = (week: number, day: number) => {
    var offset = formData.offset;
    if (formData.combobox !== "CUSTOM" || formData.offset !== 0) {
      var copy = GitfitiImage.CUSTOM.map((row) => [...row]);
      for (var x = 0; x < 53; ++x) {
        for (var y = 0; y < 7; ++y) {
          copy[y][x] = formData.gitfiti.imageValue(x, y);
        }
      }
      GitfitiImage.CUSTOM = copy;
      offset = 0;
    }

    GitfitiImage.CUSTOM[day][week] = (GitfitiImage.CUSTOM[day][week] + 1) % 5;

    setFormData((prev) =>
      generateGitfiti({
        ...prev,
        combobox: "CUSTOM",
        offset,
      }),
    );
  };

  const generateGitfiti = (state: State): State => {
    return {
      ...state,
      gitfiti: new Gitfiti(
        GitfitiImage[state.combobox as keyof typeof GitfitiImage],
        state.offset,
      ),
    };
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
          <ContributionCalendar
            gitfiti={formData.gitfiti}
            onCellClick={onCellClick}
          />
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
