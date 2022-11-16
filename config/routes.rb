Rails.application.routes.draw do
  root 'main#index'
  devise_for :users
  
  get '/destinations', to: 'homes#authenticated'

  namespace :api do
    namespace :v1 do
      get '/destinations/search' => 'destinations#search'
      resources :destinations, only: [:index, :create]
    end
  end

  namespace :api do
    namespace :v1 do
      resources :travels, only: [:index]
    end
  end
end