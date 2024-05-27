package ma.enset.my_app_reservation_system.repos;

import java.util.List;
import ma.enset.my_app_reservation_system.domain.Jurys;
import ma.enset.my_app_reservation_system.domain.Seances;
import org.springframework.data.jpa.repository.JpaRepository;


public interface JurysRepository extends JpaRepository<Jurys, Long> {

    Jurys findFirstBySeances(Seances seances);

    List<Jurys> findAllBySeances(Seances seances);

}
