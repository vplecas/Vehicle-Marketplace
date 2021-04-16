package marketplace.backend.dto.responseDTO;

import java.util.Date;

public class VehicleResponseDTO {

    private Long id;
    
    private Date firstRegistration;

    private int kilometer;

    private int power;

    private int cubicCapacity;

    private int numberOfDoors;

    private Long makeId;

    public VehicleResponseDTO(Long id, Date firstRegistration, int kilometer, int power, int cubicCapacity, int numberOfDoors, Long makeId) {
        this.id = id;
        this.firstRegistration = firstRegistration;
        this.kilometer = kilometer;
        this.power = power;
        this.cubicCapacity = cubicCapacity;
        this.numberOfDoors = numberOfDoors;
        this.makeId = makeId;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getFirstRegistration() {
        return this.firstRegistration;
    }

    public void setFirstRegistration(Date firstRegistration) {
        this.firstRegistration = firstRegistration;
    }

    public int getKilometer() {
        return this.kilometer;
    }

    public void setKilometer(int kilometer) {
        this.kilometer = kilometer;
    }

    public int getPower() {
        return this.power;
    }

    public void setPower(int power) {
        this.power = power;
    }

    public int getCubicCapacity() {
        return this.cubicCapacity;
    }

    public void setCubicCapacity(int cubicCapacity) {
        this.cubicCapacity = cubicCapacity;
    }

    public int getNumberOfDoors() {
        return this.numberOfDoors;
    }

    public void setNumberOfDoors(int numberOfDoors) {
        this.numberOfDoors = numberOfDoors;
    }

    public Long getMakeId() {
        return this.makeId;
    }

    public void setMakeId(Long makeId) {
        this.makeId = makeId;
    }
    
}
