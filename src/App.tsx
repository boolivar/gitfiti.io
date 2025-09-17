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
      <div className="header">
        <h1>Gitfiti</h1>
        <div className="links">
          <a
            href="https://github.com/boolivar/gitfiti.io"
            target="_blank"
            rel="noopener noreferrer"
            className="link-btn github-link"
            title="GitHub"
          >
            <svg viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
          <a
            href="https://replit.com/@boolivar/Gitfiti"
            target="_blank"
            rel="noopener noreferrer"
            className="link-btn replit-link"
            title="Replit"
          >
            <svg viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </a>
        </div>
      </div>

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
