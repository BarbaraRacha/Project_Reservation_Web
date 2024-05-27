package ma.enset.my_app_reservation_system.dto;

import jakarta.validation.constraints.Size;


public class UtilisateursDTO {

    private Long id;

    @Size(max = 255)
    private String nom;

    @Size(max = 255)
    private String email;

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

    public String getEmail() {
        return email;
    }

    public void setEmail(final String email) {
        this.email = email;
    }

}
