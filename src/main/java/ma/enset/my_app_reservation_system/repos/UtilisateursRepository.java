package ma.enset.my_app_reservation_system.repos;

import ma.enset.my_app_reservation_system.entities.Utilisateurs;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UtilisateursRepository extends JpaRepository<Utilisateurs, Long> {
}
