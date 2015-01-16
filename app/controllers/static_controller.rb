class StaticController < ApplicationController

	def index
	end

  	def home
  		if user_signed_in?
  			redirect_to current_user
  		else
  			redirect_to new_user_session_path
  		end
  	end


end
