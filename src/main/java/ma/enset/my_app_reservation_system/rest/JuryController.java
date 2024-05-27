package ma.enset.my_app_reservation_system.rest;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import ma.enset.my_app_reservation_system.entities.Seances;
import ma.enset.my_app_reservation_system.dto.JurysDTO;
import ma.enset.my_app_reservation_system.repos.SeancesRepository;
import ma.enset.my_app_reservation_system.service.JurysService;
import ma.enset.my_app_reservation_system.util.CustomCollectors;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
//autoriser ts les dommaines d acceder au backend
@CrossOrigin("*")
@RequestMapping("/api")
public class JuryController {

    private final JurysService jurysService;
    private final SeancesRepository seancesRepository;

    public JuryController(JurysService jurysService, SeancesRepository seancesRepository) {
        this.jurysService = jurysService;
        this.seancesRepository = seancesRepository;
    }

    @GetMapping("/jurys")
    public ResponseEntity<List<JurysDTO>> getAllJurys() {
        return ResponseEntity.ok(jurysService.findAll());
    }

    @GetMapping("/jurys/{id}")
    public ResponseEntity<JurysDTO> getJury(@PathVariable(name = "id") final Long id) {
        return ResponseEntity.ok(jurysService.get(id));
    }

    @PostMapping("/jurys")
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Long> createJury(@RequestBody @Valid final JurysDTO jurysDTO) {
        final Long createdId = jurysService.create(jurysDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/jurys/{id}")
    public ResponseEntity<Long> updateJury(@PathVariable(name = "id") final Long id,
                                           @RequestBody @Valid final JurysDTO jurysDTO) {
        jurysService.update(id, jurysDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/jurys/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteJury(@PathVariable(name = "id") final Long id) {
        jurysService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/seances/values")
    public ResponseEntity<Map<Long, Long>> getSeancesValues() {
        return ResponseEntity.ok(
            seancesRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Seances::getId, Seances::getId))
        );
    }
}
