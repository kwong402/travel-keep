Rails.application.routes.draw do
  root 'main#index'
  devise_for :users
  
  get '/destinations', to: 'homes#authenticated'
  get '/destinations/new', to: 'homes#index'
end
