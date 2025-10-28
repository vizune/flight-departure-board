const { getFlights } = require('../flights')

describe('getFlights', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('fetches flight data successfully', async () => {
    const mockData = [{ id: '1', flightNumber: 'BA001' }]

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

    const result = await getFlights()

    expect(fetch).toHaveBeenCalledWith(
      'https://6315ae3e5b85ba9b11e4cb85.mockapi.io/departures/Flightdata',
      expect.objectContaining({ method: 'GET' })
    )
    expect(result).toEqual(mockData)
  })

  it('returns [] if response is not an array', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'not an array' }),
    })

    const result = await getFlights()
    expect(result).toEqual([])
  })

  it('throws if the response is not ok', async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 500 })
    await expect(getFlights()).rejects.toThrow('Request failed with status 500')
  })

  it('throws if fetch itself fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'))
    await expect(getFlights()).rejects.toThrow('Network error')
  })
})
