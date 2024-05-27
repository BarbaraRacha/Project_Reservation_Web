package ma.enset.my_app_reservation_system.service;

import java.util.List;
import ma.enset.my_app_reservation_system.entities.Reservations;
import ma.enset.my_app_reservation_system.entities.Utilisateurs;
import ma.enset.my_app_reservation_system.dto.UtilisateursDTO;
import ma.enset.my_app_reservation_system.repos.ReservationsRepository;
import ma.enset.my_app_reservation_system.repos.UtilisateursRepository;
import ma.enset.my_app_reservation_system.util.NotFoundException;
import ma.enset.my_app_reservation_system.util.ReferencedWarning;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class UtilisateursService {

    private final UtilisateursRepository utilisateursRepository;
    private final ReservationsRepository reservationsRepository;

    public UtilisateursService(final UtilisateursRepository utilisateursRepository,
            final ReservationsRepository reservationsRepository) {
        this.utilisateursRepository = utilisateursRepository;
        this.reservationsRepository = reservationsRepository;
    }

    public List<UtilisateursDTO> findAll() {
        final List<Utilisateurs> utilisateurses = utilisateursRepository.findAll(Sort.by("id"));
        return utilisateurses.stream()
                .map(utilisateurs -> mapToDTO(utilisateurs, new UtilisateursDTO()))
                .toList();
    }

    public UtilisateursDTO get(final Long id) {
        return utilisateursRepository.findById(id)
                .map(utilisateurs -> mapToDTO(utilisateurs, new UtilisateursDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final UtilisateursDTO utilisateursDTO) {
        final Utilisateurs utilisateurs = new Utilisateurs();
        mapToEntity(utilisateursDTO, utilisateurs);
        return utilisateursRepository.save(utilisateurs).getId();
    }

    public void update(final Long id, final UtilisateursDTO utilisateursDTO) {
        final Utilisateurs utilisateurs = utilisateursRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(utilisateursDTO, utilisateurs);
        utilisateursRepository.save(utilisateurs);
    }

    public void delete(final Long id) {
        utilisateursRepository.deleteById(id);
    }

    private UtilisateursDTO mapToDTO(final Utilisateurs utilisateurs,
            final UtilisateursDTO utilisateursDTO) {
        utilisateursDTO.setId(utilisateurs.getId());
        utilisateursDTO.setNom(utilisateurs.getNom());
        utilisateursDTO.setEmail(utilisateurs.getEmail());
        return utilisateursDTO;
    }

    private Utilisateurs mapToEntity(final UtilisateursDTO utilisateursDTO,
            final Utilisateurs utilisateurs) {
        utilisateurs.setNom(utilisateursDTO.getNom());
        utilisateurs.setEmail(utilisateursDTO.getEmail());
        return utilisateurs;
    }

    public ReferencedWarning getReferencedWarning(final Long id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Utilisateurs utilisateurs = utilisateursRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final Reservations utilisateurReservations = reservationsRepository.findFirstByUtilisateur(utilisateurs);
        if (utilisateurReservations != null) {
            referencedWarning.setKey("utilisateurs.reservations.utilisateur.referenced");
            referencedWarning.addParam(utilisateurReservations.getId());
            return referencedWarning;
        }
        return null;
    }

}
