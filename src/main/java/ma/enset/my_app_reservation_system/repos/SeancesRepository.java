package ma.enset.my_app_reservation_system.repos;

import ma.enset.my_app_reservation_system.domain.Seances;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SeancesRepository extends JpaRepository<Seances, Long> {
}
