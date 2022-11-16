karen = User.create(first_name: "Test", last_name: "Test", iata_code: "BOS", email: "test@test.com", password: "password")

boston = Destination.create(city_name: "Boston", state: "MA", country: "USA")

travel = Travel.create(body: "To see fall foliage!", user: karen, destination: boston)