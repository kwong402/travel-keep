class HomesController < ApplicationController
  before_action :authenticate_user!, only: :authenticated

  def index
  end

  def authenticated 
  end
end
