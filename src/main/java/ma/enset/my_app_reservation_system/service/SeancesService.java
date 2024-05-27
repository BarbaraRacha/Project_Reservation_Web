package ma.enset.my_app_reservation_system.service;

import jakarta.transaction.Transactional;
import java.util.List;
import ma.enset.my_app_reservation_system.domain.Reservations;
import ma.enset.my_app_reservation_system.domain.Seances;
import ma.enset.my_app_reservation_system.model.SeancesDTO;
import ma.enset.my_app_reservation_system.repos.JurysRepository;
import ma.enset.my_app_reservation_system.repos.ReservationsRepository;
import ma.enset.my_app_reservation_system.repos.SeancesRepository;
import ma.enset.my_app_reservation_system.util.NotFoundException;
import ma.enset.my_app_reservation_system.util.ReferencedWarning;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class SeancesService {

    private final SeancesRepository seancesRepository;
    private final JurysRepository jurysRepository;
    private final ReservationsRepository reservationsRepository;

    public SeancesService(final SeancesRepository seancesRepository,
            final JurysRepository jurysRepository,
            final ReservationsRepository reservationsRepository) {
        this.seancesRepository = seancesRepository;
        this.jurysRepository = jurysRepository;
        this.reservationsRepository = reservationsRepository;
    }

    public List<SeancesDTO> findAll() {
        final List<Seances> seanceses = seancesRepository.findAll(Sort.by("id"));
        return seanceses.stream()
                .map(seances -> mapToDTO(seances, new SeancesDTO()))
                .toList();
    }

    public SeancesDTO get(final Long id) {
        return seancesRepository.findById(id)
                .map(seances -> mapToDTO(seances, new SeancesDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final SeancesDTO seancesDTO) {
        final Seances seances = new Seances();
        mapToEntity(seancesDTO, seances);
        return seancesRepository.save(seances).getId();
    }

    public void update(final Long id, final SeancesDTO seancesDTO) {
        final Seances seances = seancesRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(seancesDTO, seances);
        seancesRepository.save(seances);
    }

    public void delete(final Long id) {
        final Seances seances = seancesRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        // remove many-to-many relations at owning side
        jurysRepository.findAllBySeances(seances)
                .forEach(jurys -> jurys.getSeances().remove(seances));
        seancesRepository.delete(seances);
    }

    private SeancesDTO mapToDTO(final Seances seances, final SeancesDTO seancesDTO) {
        seancesDTO.setId(seances.getId());
        seancesDTO.setDate(seances.getDate());
        seancesDTO.setHeure(seances.getHeure());
        seancesDTO.setMaxParticipants(seances.getMaxParticipants());
        return seancesDTO;
    }

    private Seances mapToEntity(final SeancesDTO seancesDTO, final Seances seances) {
        seances.setDate(seancesDTO.getDate());
        seances.setHeure(seancesDTO.getHeure());
        seances.setMaxParticipants(seancesDTO.getMaxParticipants());
        return seances;
    }

    public ReferencedWarning getReferencedWarning(final Long id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Seances seances = seancesRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final Reservations seanceReservations = reservationsRepository.findFirstBySeance(seances);
        if (seanceReservations != null) {
            referencedWarning.setKey("seances.reservations.seance.referenced");
            referencedWarning.addParam(seanceReservations.getId());
            return referencedWarning;
        }
        return null;
    }

}
