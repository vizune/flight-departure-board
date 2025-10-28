const BASE_URL = 'https://6315ae3e5b85ba9b11e4cb85.mockapi.io'

async function getFlights() {
  try {
    const response = await fetch(`${BASE_URL}/departures/Flightdata`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    const data = await response.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Error fetching flights:', error)
    throw error
  }
}

module.exports = { getFlights }
