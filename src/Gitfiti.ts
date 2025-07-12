export class Gitfiti {
  image: number[][];
  scale: number;
  offset: number;

  constructor(image: number[][], scale: number, offset: number) {
    this.image = image;
    this.scale = scale;
    this.offset = offset;
  }

  generateScript(): string {
    var script = '';
    var date = this.fromDate();
    for (var col = 0; col < this.image[0].length; ++col) {
      for (var row = 0; row < this.image.length; ++row) {
        script += this.formatCommitLine(date).repeat(this.image[row][col] * this.scale);  
        date.setDate(date.getDate() + 1);
      }
    }
    return script;
  }

  formatCommitLine(timestamp: Date): string {
    var date = timestamp.toISOString().split('.')[0];
    return `GIT_AUTHOR_DATE=${date} GIT_COMMITTER_DATE=${date} git commit --allow-empty -m "gitfiti" > /dev/null\n`;
  }

  private fromDate(): Date {
    var date = this.nearestSunday();
    date.setDate(date.getDate() - 53 * 7 + this.offset);
    date.setHours(12, 0, 0, 0);
    return date;
  }

  private nearestSunday(): Date {
    var date = new Date();
    date.setDate(date.getDate() + ((7 - date.getDay()) % 7));
    return date;
  }
}