package br.com.vehiclesdata.model;

import java.util.ArrayList;
import java.util.List;

public class Body<T> {

	private T data;
	private List<String> errors;

	public Body() {
		this.errors = new ArrayList<>();
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	public List<String> getErrors() {
		if (this.errors == null) {
			this.errors = new ArrayList<String>();
		}
		return errors;
	}

	public void setErrors(List<String> errors) {
		this.errors = errors;
	}

	public void addError(String error) {
		this.errors.add(error);
	}
}