require "rails_helper"

RSpec.configure do |config|
  config.include Devise::Test::ControllerHelpers, type: :controller
  config.include Warden::Test::Helpers, type: :system
  config.include Warden::Test::Helpers, type: :request
  config.include Devise::Test::IntegrationHelpers, type: :system
  config.include Devise::Test::IntegrationHelpers, type: :request

  include ActionDispatch::TestProcess
end

RSpec.describe Api::V1::DestinationsController, type: :controller do
  let!(:san_fran) { Destination.create(city_name: "SAN FRANCISCO", state: "CA", country: "UNITED STATES OF AMERICA", amadeus_api_id: "CSFO") }

  let!(:karen) { User.create(
    first_name: "Karen", 
    last_name: "Wong", 
    iata_code: "BOS", 
    email: "karen@launch.com", 
    password: "launchAcademy"
  )}

  describe "GET#index" do
    it "should return a list of the user's destinations" do
      sign_in karen

      get :index, params: {city_name: san_fran.city_name}
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      
      expect(returned_json[0]["name"]).to eq "SAN FRANCISCO"
    end
  end
end