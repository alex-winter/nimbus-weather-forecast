export class DayForecast
{
    constructor(
        public date: string,
        public description: string,
        public temperatureCHigh: number,
        public temperatureCLow: number,
        public windSpeedKph: number,
    )
    {
    }
}
