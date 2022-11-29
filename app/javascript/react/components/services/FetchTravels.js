class FetchTravels {
  static async updateTravel(travelId, updatedTravelRecord) {
    try {
      const response = await fetch(`/api/v1/travels/${travelId}`, {
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

  static async getCheapestTravel(date) {
    try {
      const response = await fetch(`/api/v1/travels/search_airports?departure_date=${date.departure_date}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const responseBody = await response.json()
      return responseBody
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  static async deleteTravel(travelId) {
    try {
      const response = await fetch(`/api/v1/travels/${travelId}`, {
        method: "DELETE",
        credentials: "same-origin",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }) 
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const responseBody = await response.json()
      return responseBody.travels
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
}

export default FetchTravels