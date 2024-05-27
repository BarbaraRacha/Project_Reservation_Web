package ma.enset.my_app_reservation_system.rest;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import ma.enset.my_app_reservation_system.domain.Seances;
import ma.enset.my_app_reservation_system.model.JurysDTO;
import ma.enset.my_app_reservation_system.repos.SeancesRepository;
import ma.enset.my_app_reservation_system.service.JurysService;
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
@RequestMapping(value = "/api/juryss", produces = MediaType.APPLICATION_JSON_VALUE)
public class JurysResource {

    private final JurysService jurysService;
    private final SeancesRepository seancesRepository;

    public JurysResource(final JurysService jurysService,
            final SeancesRepository seancesRepository) {
        this.jurysService = jurysService;
        this.seancesRepository = seancesRepository;
    }

    @GetMapping
    public ResponseEntity<List<JurysDTO>> getAllJuryss() {
        return ResponseEntity.ok(jurysService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<JurysDTO> getJurys(@PathVariable(name = "id") final Long id) {
        return ResponseEntity.ok(jurysService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Long> createJurys(@RequestBody @Valid final JurysDTO jurysDTO) {
        final Long createdId = jurysService.create(jurysDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Long> updateJurys(@PathVariable(name = "id") final Long id,
            @RequestBody @Valid final JurysDTO jurysDTO) {
        jurysService.update(id, jurysDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteJurys(@PathVariable(name = "id") final Long id) {
        jurysService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/seancesValues")
    public ResponseEntity<Map<Long, Long>> getSeancesValues() {
        return ResponseEntity.ok(seancesRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Seances::getId, Seances::getId)));
    }

}
