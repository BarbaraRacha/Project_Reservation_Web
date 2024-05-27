package ma.enset.my_app_reservation_system.rest;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import ma.enset.my_app_reservation_system.model.UtilisateursDTO;
import ma.enset.my_app_reservation_system.service.UtilisateursService;
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
@RequestMapping(value = "/api/utilisateurss", produces = MediaType.APPLICATION_JSON_VALUE)
public class UtilisateursResource {

    private final UtilisateursService utilisateursService;

    public UtilisateursResource(final UtilisateursService utilisateursService) {
        this.utilisateursService = utilisateursService;
    }

    @GetMapping
    public ResponseEntity<List<UtilisateursDTO>> getAllUtilisateurss() {
        return ResponseEntity.ok(utilisateursService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UtilisateursDTO> getUtilisateurs(
            @PathVariable(name = "id") final Long id) {
        return ResponseEntity.ok(utilisateursService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Long> createUtilisateurs(
            @RequestBody @Valid final UtilisateursDTO utilisateursDTO) {
        final Long createdId = utilisateursService.create(utilisateursDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Long> updateUtilisateurs(@PathVariable(name = "id") final Long id,
            @RequestBody @Valid final UtilisateursDTO utilisateursDTO) {
        utilisateursService.update(id, utilisateursDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteUtilisateurs(@PathVariable(name = "id") final Long id) {
        final ReferencedWarning referencedWarning = utilisateursService.getReferencedWarning(id);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        utilisateursService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
