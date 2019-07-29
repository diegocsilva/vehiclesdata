package br.com.vehiclesdata.util;

import br.com.vehiclesdata.model.Body;

public class ResponseUtil {

    public static Body responseByMessage(String message){
        Body<String> body = new Body<>();
        body.setData(message);
        return body;
    }
}
