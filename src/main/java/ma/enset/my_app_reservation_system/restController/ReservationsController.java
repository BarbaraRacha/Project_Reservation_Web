package ma.enset.my_app_reservation_system.restController;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

import ma.enset.my_app_reservation_system.entities.Reservations;
import ma.enset.my_app_reservation_system.entities.Seances;
import ma.enset.my_app_reservation_system.entities.Utilisateurs;
import ma.enset.my_app_reservation_system.dto.ReservationsDTO;
import ma.enset.my_app_reservation_system.repos.ReservationsRepository;
import ma.enset.my_app_reservation_system.repos.SeancesRepository;
import ma.enset.my_app_reservation_system.repos.UtilisateursRepository;
import ma.enset.my_app_reservation_system.service.ReservationsService;
import ma.enset.my_app_reservation_system.util.CustomCollectors;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("*")
@RequestMapping(value = "/api/reservations")

public class ReservationsController {

    private final ReservationsService reservationsService;
    private final ReservationsRepository reservationsRepo;
    private final UtilisateursRepository utilisateursRepository;
    private final SeancesRepository seancesRepository;

    public ReservationsController(final ReservationsService reservationsService,
                                  ReservationsRepository reservationsRepo, final UtilisateursRepository utilisateursRepository,
                                  final SeancesRepository seancesRepository) {
        this.reservationsService = reservationsService;
        this.reservationsRepo = reservationsRepo;
        this.utilisateursRepository = utilisateursRepository;
        this.seancesRepository = seancesRepository;
    }

    @GetMapping
    public ResponseEntity<List<ReservationsDTO>> getAllReservationss() {
        return ResponseEntity.ok(reservationsService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationsDTO> getReservations(
            @PathVariable(name = "id") final Long id) {
        return ResponseEntity.ok(reservationsService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Long> createReservations(
            @RequestBody @Valid final ReservationsDTO reservationsDTO) {
        final Long createdId = reservationsService.create(reservationsDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Long> updateReservations(@PathVariable(name = "id") final Long id,
            @RequestBody @Valid final ReservationsDTO reservationsDTO) {
        reservationsService.update(id, reservationsDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteReservations(@PathVariable(name = "id") final Long id) {
        reservationsService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/utilisateurValues")
    public ResponseEntity<Map<Long, Long>> getUtilisateurValues() {
        return ResponseEntity.ok(utilisateursRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Utilisateurs::getId, Utilisateurs::getId)));
    }
    @GetMapping("/{userId}/utilisateur")
    public List<Reservations> getReservationsByUtilisateur(@PathVariable Long userId) {
        return reservationsRepo.findByUtilisateurId(userId);
    }

    @GetMapping("/{userId}/seance")
    public List<Reservations> getReservationsBySeance(@PathVariable Long userId) {
        return reservationsRepo.findBySeanceId(userId);
    }

    @GetMapping("/seanceValues")
    public ResponseEntity<Map<Long, Long>> getSeanceValues() {
        return ResponseEntity.ok(seancesRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Seances::getId, Seances::getId)));
    }

}
