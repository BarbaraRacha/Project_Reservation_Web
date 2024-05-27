package ma.enset.my_app_reservation_system.model;

import jakarta.validation.constraints.Size;
import java.util.List;


public class JurysDTO {

    private Long id;

    @Size(max = 255)
    private String nom;

    private List<Long> seances;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(final String nom) {
        this.nom = nom;
    }

    public List<Long> getSeances() {
        return seances;
    }

    public void setSeances(final List<Long> seances) {
        this.seances = seances;
    }

}
