require "rails_helper"

RSpec.configure do |config|
  config.include Devise::Test::ControllerHelpers, type: :controller
  config.include Warden::Test::Helpers, type: :system
  config.include Warden::Test::Helpers, type: :request
  config.include Devise::Test::IntegrationHelpers, type: :system
  config.include Devise::Test::IntegrationHelpers, type: :request

  include ActionDispatch::TestProcess
end

RSpec.describe Api::V1::TravelsController, type: :controller do
  let!(:san_fran) { Destination.create(city_name: "SAN FRANCISCO", state: "CA", country: "UNITED STATES OF AMERICA", amadeus_api_id: "CSFO") }

  let!(:karen) { User.create(
    first_name: "Karen", 
    last_name: "Wong", 
    iata_code: "BOS", 
    email: "karen@launch.com", 
    password: "launchAcademy"
  )}

  describe "POST#create" do
    it "creates a new travel when provided destination and when user is signed in" do
      sign_in karen
      
      post_json = {
        body: "See the Golden Gate bridge!",
        destination: san_fran.id,
        user: karen.id
      }

      previous_count = Travel.count
      post :create, params: {
        travel: {
          body: "See the Golden Gate bridge!"
        },
        user_id: karen.id,
        destination_id: san_fran.amadeus_api_id
      }

      returned_json = JSON.parse(response.body)["travel"]

      expect(Travel.count).to eq(previous_count + 1)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["body"]).to eq "See the Golden Gate bridge!"
      expect(returned_json["user"]["id"]).to eq karen.id
      expect(returned_json["destination"]["id"]).to eq san_fran.id
    end
  end
end