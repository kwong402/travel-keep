class FetchTravels {
  static async updateTravel(travelId, updatedTravelRecord) {
    try {
      const response = await fetch(`api/v1/travels/${travelId}`, {
        method: "PATCH",
        credentials: "same-origin",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ travel: updatedTravelRecord })
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const responseBody = await response.json()
      return responseBody.travel
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
}

export default FetchTravels