package marketplace.backend.exception.exceptions.global;

public class MyEntityNotFoundException extends RuntimeException {

    private static final long serialVersionUID = -6579532878684474405L;

    private String entityName;

    private Long id;

    public MyEntityNotFoundException(String entityName, Long id) {
        this.entityName = entityName;
        this.id = id;
    }

    public String getEntityName() {
        return this.entityName;
    }

    public Long getId() {
        return this.id;
    }
    
}
