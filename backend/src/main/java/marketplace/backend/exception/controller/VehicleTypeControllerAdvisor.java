package marketplace.backend.exception.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import marketplace.backend.exception.Error;
import marketplace.backend.exception.exceptions.vehicleType.ModelReferenceTypeConstraintViolationException;
import marketplace.backend.exception.exceptions.vehicleType.VehicleTypeNotFoundException;

@ControllerAdvice
public class VehicleTypeControllerAdvisor {

    @ExceptionHandler(VehicleTypeNotFoundException.class)
    public ResponseEntity<Error> userNotFound(VehicleTypeNotFoundException e) {

        Long id = e.getId();

        Error error = new Error(404, "Vehicle type with id '" + id + "' not found.");

        return new ResponseEntity<Error>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ModelReferenceTypeConstraintViolationException.class)
    public ResponseEntity<Error> modelReferenceTypeConstraintViolation(ModelReferenceTypeConstraintViolationException e) {

        Long id = e.getId();

        Error error = new Error(400, "Vehicle type with id '" + id + "' is still referenced from model.");

        return new ResponseEntity<Error>(error, HttpStatus.BAD_REQUEST);
    }
    
}
