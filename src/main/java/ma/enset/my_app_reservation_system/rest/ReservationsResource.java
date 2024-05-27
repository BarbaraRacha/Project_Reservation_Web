package ma.enset.my_app_reservation_system.rest;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import ma.enset.my_app_reservation_system.domain.Seances;
import ma.enset.my_app_reservation_system.domain.Utilisateurs;
import ma.enset.my_app_reservation_system.model.ReservationsDTO;
import ma.enset.my_app_reservation_system.repos.SeancesRepository;
import ma.enset.my_app_reservation_system.repos.UtilisateursRepository;
import ma.enset.my_app_reservation_system.service.ReservationsService;
import ma.enset.my_app_reservation_system.util.CustomCollectors;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api/reservationss", produces = MediaType.APPLICATION_JSON_VALUE)
public class ReservationsResource {

    private final ReservationsService reservationsService;
    private final UtilisateursRepository utilisateursRepository;
    private final SeancesRepository seancesRepository;

    public ReservationsResource(final ReservationsService reservationsService,
            final UtilisateursRepository utilisateursRepository,
            final SeancesRepository seancesRepository) {
        this.reservationsService = reservationsService;
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

    @GetMapping("/seanceValues")
    public ResponseEntity<Map<Long, Long>> getSeanceValues() {
        return ResponseEntity.ok(seancesRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Seances::getId, Seances::getId)));
    }

}
