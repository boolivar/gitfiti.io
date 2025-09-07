import React from "react";
import "./ContributionCalendar.css";
import { Gitfiti } from "./Gitfiti";

interface ContributionCalendarProps {
  gitfiti: Gitfiti;
}

const ContributionCalendar: React.FC<ContributionCalendarProps> = ({
  gitfiti
}) => {
  const size = 53;
  // Days of the week labels
  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

  return (
    <div className="contribution-calendar">
      <div className="contribution-container">
        <div className="calendar-container">
          <div className="week-labels">
            {[...Array(7).keys()].map((day) => (
              <span key={day}>{dayLabels[day]}</span>
            ))}
          </div>
  
          <table className="calendar-table">
            <thead>
              <tr>
                {[...Array(size).keys()].map((i) => (
                  <th key={i} className={`th th-${i}`}></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(7).keys()].map((day) => (
                <tr key={day} className={`tr-${day}`}>
                  {[...Array(size).keys()].map((week) => (
                    <td
                      key={week}
                      className={`day tr-${week}-${day} ${gitfiti.contributionLevel(week, day)}`}
                      title={`${gitfiti.contributionCount(week, day)} contributions`}
                    ></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        <div className="calendar-legend">
          <span className="legend-text">Less</span>
          <div className="legend-squares">
            <div className="legend-square level-0" title="0 contributions"></div>
            <div className="legend-square level-1" title="1-5 contribution"></div>
            <div
              className="legend-square level-2"
              title="6-10 contributions"
            ></div>
            <div
              className="legend-square level-3"
              title="11-15 contributions"
            ></div>
            <div
              className="legend-square level-4"
              title="16+ contributions"
            ></div>
          </div>
          <span className="legend-text">More</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionCalendar;
