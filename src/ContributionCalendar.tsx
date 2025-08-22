
import React from 'react';
import './ContributionCalendar.css';

interface ContributionCalendarProps {
  image: number[][];
  scale: number;
}

const ContributionCalendar: React.FC<ContributionCalendarProps> = ({ image, scale }) => {
  // GitHub contribution levels and their corresponding colors
  const getContributionLevel = (value: number): string => {
    const scaledValue = value * scale;
    if (scaledValue === 0) return 'level-0';
    if (scaledValue <= 5) return 'level-1';
    if (scaledValue <= 10) return 'level-2';
    if (scaledValue <= 15) return 'level-3';
    return 'level-4';
  };

  const getContributionCount = (value: number): number => {
    return value * scale;
  };

  // Create weeks array (GitHub shows 53 weeks)
  const weeks = [];
  for (let col = 0; col < image[0].length; col++) {
    const week = [];
    for (let row = 0; row < image.length; row++) {
      week.push({
        level: getContributionLevel(image[row][col]),
        count: getContributionCount(image[row][col]),
        row,
        col
      });
    }
    weeks.push(week);
  }

  // Days of the week labels
  const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  return (
    <div className="contribution-calendar">
      <div className="calendar-header">
        <h3>Contribution Calendar Preview</h3>
      </div>
      
      <div className="calendar-container">
        <div className="day-labels">
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
      </div>
      
      <div className="calendar-legend">
        <span className="legend-text">Less</span>
        <div className="legend-squares">
          <div className="legend-square level-0" title="0 contributions"></div>
          <div className="legend-square level-1" title="1-5 contribution"></div>
          <div className="legend-square level-2" title="6-10 contributions"></div>
          <div className="legend-square level-3" title="11-15 contributions"></div>
          <div className="legend-square level-4" title="16+ contributions"></div>
        </div>
        <span className="legend-text">More</span>
      </div>
    </div>
  );
};

export default ContributionCalendar;
