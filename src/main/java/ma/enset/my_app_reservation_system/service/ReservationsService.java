package ma.enset.my_app_reservation_system.service;

import java.util.List;
import ma.enset.my_app_reservation_system.entities.Reservations;
import ma.enset.my_app_reservation_system.entities.Seances;
import ma.enset.my_app_reservation_system.entities.Utilisateurs;
import ma.enset.my_app_reservation_system.dto.ReservationsDTO;
import ma.enset.my_app_reservation_system.repos.ReservationsRepository;
import ma.enset.my_app_reservation_system.repos.SeancesRepository;
import ma.enset.my_app_reservation_system.repos.UtilisateursRepository;
import ma.enset.my_app_reservation_system.util.NotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class ReservationsService {

    private final ReservationsRepository reservationsRepository;
    private final UtilisateursRepository utilisateursRepository;
    private final SeancesRepository seancesRepository;

    public ReservationsService(final ReservationsRepository reservationsRepository,
            final UtilisateursRepository utilisateursRepository,
            final SeancesRepository seancesRepository) {
        this.reservationsRepository = reservationsRepository;
        this.utilisateursRepository = utilisateursRepository;
        this.seancesRepository = seancesRepository;
    }

    public List<ReservationsDTO> findAll() {
        final List<Reservations> reservationses = reservationsRepository.findAll(Sort.by("id"));
        return reservationses.stream()
                .map(reservations -> mapToDTO(reservations, new ReservationsDTO()))
                .toList();
    }

    public ReservationsDTO get(final Long id) {
        return reservationsRepository.findById(id)
                .map(reservations -> mapToDTO(reservations, new ReservationsDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final ReservationsDTO reservationsDTO) {
        final Reservations reservations = new Reservations();
        mapToEntity(reservationsDTO, reservations);
        return reservationsRepository.save(reservations).getId();
    }

    public void update(final Long id, final ReservationsDTO reservationsDTO) {
        final Reservations reservations = reservationsRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(reservationsDTO, reservations);
        reservationsRepository.save(reservations);
    }

    public void delete(final Long id) {
        reservationsRepository.deleteById(id);
    }

    private ReservationsDTO mapToDTO(final Reservations reservations,
            final ReservationsDTO reservationsDTO) {
        reservationsDTO.setId(reservations.getId());
        reservationsDTO.setStatut(reservations.getStatut());
        reservationsDTO.setUtilisateur(reservations.getUtilisateur() == null ? null : reservations.getUtilisateur().getId());
        reservationsDTO.setSeance(reservations.getSeance() == null ? null : reservations.getSeance().getId());
        return reservationsDTO;
    }

    private Reservations mapToEntity(final ReservationsDTO reservationsDTO,
            final Reservations reservations) {
        reservations.setStatut(reservationsDTO.getStatut());
        final Utilisateurs utilisateur = reservationsDTO.getUtilisateur() == null ? null : utilisateursRepository.findById(reservationsDTO.getUtilisateur())
                .orElseThrow(() -> new NotFoundException("utilisateur not found"));
        reservations.setUtilisateur(utilisateur);
        final Seances seance = reservationsDTO.getSeance() == null ? null : seancesRepository.findById(reservationsDTO.getSeance())
                .orElseThrow(() -> new NotFoundException("seance not found"));
        reservations.setSeance(seance);
        return reservations;
    }

}
