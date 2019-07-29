package br.com.vehiclesdata.exception;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FormException extends RuntimeException {

    private List<String> errors;

    public FormException(List<String> errors){
        this.errors = errors;
    }
}
