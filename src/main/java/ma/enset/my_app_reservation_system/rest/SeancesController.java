package ma.enset.my_app_reservation_system.rest;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import ma.enset.my_app_reservation_system.dto.SeancesDTO;
import ma.enset.my_app_reservation_system.service.SeancesService;
import ma.enset.my_app_reservation_system.util.ReferencedException;
import ma.enset.my_app_reservation_system.util.ReferencedWarning;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("*")
@RequestMapping(value = "/api/seances")
public class SeancesController {

    private final SeancesService seancesService;

    public SeancesController(final SeancesService seancesService) {
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
