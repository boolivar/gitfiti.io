import React from "react";
import "./ContributionCalendar.css";

interface ContributionCalendarProps {
  contributionCount: (x: number, y: number) => number;
  contributionLevel: (x: number, y: number) => string;
}

const ContributionCalendar: React.FC<ContributionCalendarProps> = ({ contributionCount, contributionLevel }) => {
  const size = 53;
  // Days of the week labels
  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

  return (
    <div className="contribution-calendar">
      <div className="calendar-header">
        <h3>Contribution Calendar Preview</h3>
      </div>

      <div className="calendar-container">
        {/* <div className="day-labels">
          {dayLabels.map((day, index) => (
            <div key={index} className="day-label">
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-grid">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="week">
              {week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`day ${day.level}`}
                  title={`${day.count} contributions`}
                  data-count={day.count}
                  data-date={`Week ${weekIndex + 1}, Day ${dayIndex + 1}`}
                />
              ))}
            </div>
          ))}
        </div>
       */}
        <table className="calendar-table">
          <thead>
            <tr>
              <th scope="col" className="th rh"></th>
              {[...Array(size).keys()].map((i) => (
                <th className={`th th-${i}`}></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(7).keys()].map((day) => (
              <tr>
                <th scope="row" className={`rh rh-${day}`}>
                  {dayLabels[day]}
                </th>
                {[...Array(size).keys()].map((week) => (
                  <td
                    className={`day tr-${week}-${day} ${contributionLevel(week, day)}`}
                    title={`${contributionCount(week, day)} contributions`}
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
  );
};

export default ContributionCalendar;
