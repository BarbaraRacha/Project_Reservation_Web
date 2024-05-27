package ma.enset.my_app_reservation_system.model;


public class ReservationsDTO {

    private Long id;
    private ReservationStatus statut;
    private Long utilisateur;
    private Long seance;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public ReservationStatus getStatut() {
        return statut;
    }

    public void setStatut(final ReservationStatus statut) {
        this.statut = statut;
    }

    public Long getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(final Long utilisateur) {
        this.utilisateur = utilisateur;
    }

    public Long getSeance() {
        return seance;
    }

    public void setSeance(final Long seance) {
        this.seance = seance;
    }

}
