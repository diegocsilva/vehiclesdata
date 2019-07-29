package br.com.vehiclesdata.controller.handler;

import br.com.vehiclesdata.exception.VehicleException;
import br.com.vehiclesdata.exception.FormException;
import br.com.vehiclesdata.exception.VehicleTypeException;
import br.com.vehiclesdata.model.Body;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class VehicleControllerHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(VehicleException.class)
    protected ResponseEntity<?> handleVehicleException(VehicleException exception) {
        Body<Object> body = new Body<>();
        switch (exception.getType()) {
            case UNREGISTERED:
                body.addError("Veículo não registrado!");
                return ResponseEntity.badRequest().body(body);
            case NOT_FOUND_IN_SEARCH:
                body.addError("Veículo não encontrado!");
                return ResponseEntity.ok(body);
            case UNFILLED_TYPE:
                body.addError("Tipo do veículo não preenchido.");
                return ResponseEntity.ok(body);
            case CUSTOM_MESSAGE:
                body.addError(exception.getMessage());
                return ResponseEntity.ok(body);
            default:
                body.addError("Ops... Ocorreu um erro no sistema :( ");
                return ResponseEntity.badRequest().body(body);
        }
    }


    @ExceptionHandler(FormException.class)
    protected ResponseEntity<Body<?>> handleVehicleFormException(FormException exception) {
        Body<String> body = new Body<>();
        body.setErrors(exception.getErrors());
        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(VehicleTypeException.class)
    protected ResponseEntity<Body<?>> handleVehicleTypeException(VehicleTypeException exception) {
        Body<String> body = new Body<>();
        body.addError(exception.getMessage());
        return ResponseEntity.badRequest().body(body);
    }
}
