package ma.enset.my_app_reservation_system.rest;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import ma.enset.my_app_reservation_system.model.SeancesDTO;
import ma.enset.my_app_reservation_system.service.SeancesService;
import ma.enset.my_app_reservation_system.util.ReferencedException;
import ma.enset.my_app_reservation_system.util.ReferencedWarning;
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
@RequestMapping(value = "/api/seancess", produces = MediaType.APPLICATION_JSON_VALUE)
public class SeancesResource {

    private final SeancesService seancesService;

    public SeancesResource(final SeancesService seancesService) {
        this.seancesService = seancesService;
    }

    @GetMapping
    public ResponseEntity<List<SeancesDTO>> getAllSeancess() {
        return ResponseEntity.ok(seancesService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SeancesDTO> getSeances(@PathVariable(name = "id") final Long id) {
        return ResponseEntity.ok(seancesService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Long> createSeances(@RequestBody @Valid final SeancesDTO seancesDTO) {
        final Long createdId = seancesService.create(seancesDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Long> updateSeances(@PathVariable(name = "id") final Long id,
            @RequestBody @Valid final SeancesDTO seancesDTO) {
        seancesService.update(id, seancesDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteSeances(@PathVariable(name = "id") final Long id) {
        final ReferencedWarning referencedWarning = seancesService.getReferencedWarning(id);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        seancesService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
