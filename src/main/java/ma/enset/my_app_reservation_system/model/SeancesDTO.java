package ma.enset.my_app_reservation_system.model;

import java.time.LocalDate;


public class SeancesDTO {

    private Long id;
    private LocalDate date;
    private Integer heure;
    private Integer maxParticipants;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(final LocalDate date) {
        this.date = date;
    }

    public Integer getHeure() {
        return heure;
    }

    public void setHeure(final Integer heure) {
        this.heure = heure;
    }

    public Integer getMaxParticipants() {
        return maxParticipants;
    }

    public void setMaxParticipants(final Integer maxParticipants) {
        this.maxParticipants = maxParticipants;
    }

}
