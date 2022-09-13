package com.devsuperior.movieflix.controllers.exceptions;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OAuthCustomError {

	private String error;
	
	//Define a saída para o banco de dados no formato Snake-Cash "error-description"
	@JsonProperty("error-description")
	private String errorDescription;
	
	public OAuthCustomError() {
	}

	public OAuthCustomError(String error, String errorDescription) {
		this.error = error;
		this.errorDescription = errorDescription;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public String getErrorDescription() {
		return errorDescription;
	}

	public void setErrorDescription(String errorDescription) {
		this.errorDescription = errorDescription;
	}
	
}
