export class DataSurvey {
    name: string
    ts: string
    gps: { lat: number, lng: number }
    acc: number
    conn: boolean
    eventStatus: boolean
    event: { name: string }
}