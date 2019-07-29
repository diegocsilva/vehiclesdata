package br.com.vehiclesdata.controller.handler;

import br.com.vehiclesdata.model.Body;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class VehicleTypeControllerHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(DataIntegrityViolationException.class)
    protected ResponseEntity<Body<?>> handleDataIntegrityViolationException(DataIntegrityViolationException exception) {
        Body<String> body = new Body<>();
        body.addError("Tipo não pode ser deletado pois há Veículos referenciando o mesmo.");
        return ResponseEntity.badRequest().body(body);
    }
}
