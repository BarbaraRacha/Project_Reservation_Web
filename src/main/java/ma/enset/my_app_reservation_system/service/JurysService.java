package ma.enset.my_app_reservation_system.service;

import jakarta.transaction.Transactional;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import ma.enset.my_app_reservation_system.domain.Jurys;
import ma.enset.my_app_reservation_system.domain.Seances;
import ma.enset.my_app_reservation_system.model.JurysDTO;
import ma.enset.my_app_reservation_system.repos.JurysRepository;
import ma.enset.my_app_reservation_system.repos.SeancesRepository;
import ma.enset.my_app_reservation_system.util.NotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class JurysService {

    private final JurysRepository jurysRepository;
    private final SeancesRepository seancesRepository;

    public JurysService(final JurysRepository jurysRepository,
            final SeancesRepository seancesRepository) {
        this.jurysRepository = jurysRepository;
        this.seancesRepository = seancesRepository;
    }

    public List<JurysDTO> findAll() {
        final List<Jurys> juryses = jurysRepository.findAll(Sort.by("id"));
        return juryses.stream()
                .map(jurys -> mapToDTO(jurys, new JurysDTO()))
                .toList();
    }

    public JurysDTO get(final Long id) {
        return jurysRepository.findById(id)
                .map(jurys -> mapToDTO(jurys, new JurysDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final JurysDTO jurysDTO) {
        final Jurys jurys = new Jurys();
        mapToEntity(jurysDTO, jurys);
        return jurysRepository.save(jurys).getId();
    }

    public void update(final Long id, final JurysDTO jurysDTO) {
        final Jurys jurys = jurysRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(jurysDTO, jurys);
        jurysRepository.save(jurys);
    }

    public void delete(final Long id) {
        jurysRepository.deleteById(id);
    }

    private JurysDTO mapToDTO(final Jurys jurys, final JurysDTO jurysDTO) {
        jurysDTO.setId(jurys.getId());
        jurysDTO.setNom(jurys.getNom());
        jurysDTO.setSeances(jurys.getSeances().stream()
                .map(seances -> seances.getId())
                .toList());
        return jurysDTO;
    }

    private Jurys mapToEntity(final JurysDTO jurysDTO, final Jurys jurys) {
        jurys.setNom(jurysDTO.getNom());
        final List<Seances> seances = seancesRepository.findAllById(
                jurysDTO.getSeances() == null ? Collections.emptyList() : jurysDTO.getSeances());
        if (seances.size() != (jurysDTO.getSeances() == null ? 0 : jurysDTO.getSeances().size())) {
            throw new NotFoundException("one of seances not found");
        }
        jurys.setSeances(new HashSet<>(seances));
        return jurys;
    }

}
