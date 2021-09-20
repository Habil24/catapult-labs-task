const METER_SERVICE_URL = 'http://localhost:3000'

export const fetchMeterReadings = async () =>
  await fetch(`${METER_SERVICE_URL}/meterReadings`).then(response => response.json())
  