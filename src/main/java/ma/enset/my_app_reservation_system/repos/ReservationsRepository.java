package ma.enset.my_app_reservation_system.repos;

import ma.enset.my_app_reservation_system.entities.Reservations;
import ma.enset.my_app_reservation_system.entities.Seances;
import ma.enset.my_app_reservation_system.entities.Utilisateurs;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ReservationsRepository extends JpaRepository<Reservations, Long> {

    Reservations findFirstByUtilisateur(Utilisateurs utilisateurs);

    List<Reservations> findByUtilisateurId(Long id);
    List<Reservations> findBySeanceId(Long seanceId);

    Reservations findFirstBySeance(Seances seances);

}
