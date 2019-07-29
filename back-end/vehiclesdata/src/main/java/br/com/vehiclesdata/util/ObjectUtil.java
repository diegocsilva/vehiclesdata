package br.com.vehiclesdata.util;

import java.util.List;

public class ObjectUtil {

    public static boolean isNullOrEmpty(Object obj) {
        if (obj == null) {
            return true;
        }
        if (obj instanceof String && ((String) obj).isEmpty()) {
            return true;
        }
        if (obj instanceof List && ((List) obj).isEmpty()) {
            return true;
        }
        return false;
    }
}
