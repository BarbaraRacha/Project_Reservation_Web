package ma.enset.my_app_reservation_system;

import ma.enset.my_app_reservation_system.dto.*;
import ma.enset.my_app_reservation_system.entities.ReservationStatus;
import ma.enset.my_app_reservation_system.service.JurysService;
import ma.enset.my_app_reservation_system.service.ReservationsService;
import ma.enset.my_app_reservation_system.service.SeancesService;
import ma.enset.my_app_reservation_system.service.UtilisateursService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.List;


@SpringBootApplication

@EntityScan("ma.enset.my_app_reservation_system.entities")

public class MyAppReservationSystemApplication {

    public static void main(final String[] args) {
        SpringApplication.run(MyAppReservationSystemApplication.class, args);
    }

   // @Bean
    CommandLineRunner initDatabase(JurysService jurysService,
                                   UtilisateursService utilisateursService,
                                   SeancesService seancesService,
                                   ReservationsService reservationsService) {
        return args -> {
            // Ajouter des utilisateurs
            UtilisateursDTO utilisateur1 = new UtilisateursDTO();
            utilisateur1.setNom("John Doe");
            utilisateur1.setEmail("john.doe@example.com");
            Long utilisateur1Id = utilisateursService.create(utilisateur1);

            UtilisateursDTO utilisateur2 = new UtilisateursDTO();
            utilisateur2.setNom("Jane Smith");
            utilisateur2.setEmail("jane.smith@example.com");
            Long utilisateur2Id = utilisateursService.create(utilisateur2);

            UtilisateursDTO utilisateur3 = new UtilisateursDTO();
            utilisateur3.setNom("Alice Johnson");
            utilisateur3.setEmail("alice.johnson@example.com");
            Long utilisateur3Id = utilisateursService.create(utilisateur3);

            UtilisateursDTO utilisateur4 = new UtilisateursDTO();
            utilisateur4.setNom("Bob Brown");
            utilisateur4.setEmail("bob.brown@example.com");
            Long utilisateur4Id = utilisateursService.create(utilisateur4);

            // Ajouter des séances
            SeancesDTO seance1 = new SeancesDTO();
            seance1.setDate(LocalDate.of(2023, 6, 15));
            seance1.setHeure(10);
            seance1.setMaxParticipants(20);
            Long seance1Id = seancesService.create(seance1);

            SeancesDTO seance2 = new SeancesDTO();
            seance2.setDate(LocalDate.of(2023, 6, 16));
            seance2.setHeure(14);
            seance2.setMaxParticipants(15);
            Long seance2Id = seancesService.create(seance2);

            SeancesDTO seance3 = new SeancesDTO();
            seance3.setDate(LocalDate.of(2023, 6, 17));
            seance3.setHeure(9);
            seance3.setMaxParticipants(25);
            Long seance3Id = seancesService.create(seance3);

            SeancesDTO seance4 = new SeancesDTO();
            seance4.setDate(LocalDate.of(2023, 6, 18));
            seance4.setHeure(13);
            seance4.setMaxParticipants(10);
            Long seance4Id = seancesService.create(seance4);

            // Ajouter des jurys
            JurysDTO jury1 = new JurysDTO();
            jury1.setNom("Jury A");
            jury1.setSeances(List.of(seance1Id, seance2Id));
            jurysService.create(jury1);

            JurysDTO jury2 = new JurysDTO();
            jury2.setNom("Jury B");
            jury2.setSeances(List.of(seance2Id, seance3Id));
            jurysService.create(jury2);

            JurysDTO jury3 = new JurysDTO();
            jury3.setNom("Jury C");
            jury3.setSeances(List.of(seance3Id, seance4Id));
            jurysService.create(jury3);

            // Ajouter des réservations
            ReservationsDTO reservation1 = new ReservationsDTO();
            reservation1.setStatut(ReservationStatus.CONFIRMED);
            reservation1.setUtilisateur(utilisateur1Id);
            reservation1.setSeance(seance1Id);
            reservationsService.create(reservation1);

            ReservationsDTO reservation2 = new ReservationsDTO();
            reservation2.setStatut(ReservationStatus.PENDING);
            reservation2.setUtilisateur(utilisateur2Id);
            reservation2.setSeance(seance2Id);
            reservationsService.create(reservation2);

            ReservationsDTO reservation3 = new ReservationsDTO();
            reservation3.setStatut(ReservationStatus.CONFIRMED);
            reservation3.setUtilisateur(utilisateur3Id);
            reservation3.setSeance(seance3Id);
            reservationsService.create(reservation3);

            ReservationsDTO reservation4 = new ReservationsDTO();
            reservation4.setStatut(ReservationStatus.CANCELLED);
            reservation4.setUtilisateur(utilisateur4Id);
            reservation4.setSeance(seance4Id);
            reservationsService.create(reservation4);

            ReservationsDTO reservation5 = new ReservationsDTO();
            reservation5.setStatut(ReservationStatus.CONFIRMED);
            reservation5.setUtilisateur(utilisateur1Id);
            reservation5.setSeance(seance3Id);
            reservationsService.create(reservation5);
        };
    }

}
