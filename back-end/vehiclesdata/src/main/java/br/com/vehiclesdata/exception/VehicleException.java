package br.com.vehiclesdata.exception;

import br.com.vehiclesdata.domain.VehicleExceptionType;
import lombok.Getter;

@Getter
public class VehicleException extends RuntimeException{

    private VehicleExceptionType type;

    public VehicleException(VehicleExceptionType type) {
        this.type = type;
    }

    public VehicleException(String message) {
        super(message);
        this.type = VehicleExceptionType.CUSTOM_MESSAGE;
    }
}
