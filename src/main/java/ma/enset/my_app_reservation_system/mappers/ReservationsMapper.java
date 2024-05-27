package ma.enset.my_app_reservation_system.mappers;

import ma.enset.my_app_reservation_system.dto.ReservationsDTO;
import ma.enset.my_app_reservation_system.entities.Reservations;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

public interface ReservationsMapper {
    ReservationsMapper INSTANCE = Mappers.getMapper(ReservationsMapper.class);

    @Mapping(source = "utilisateur.id", target = "utilisateur")
    @Mapping(source = "seance.id", target = "seance")
    ReservationsDTO toDTO(Reservations reservations);

    @Mapping(source = "utilisateur", target = "utilisateur.id")
    @Mapping(source = "seance", target = "seance.id")
    Reservations toEntity(ReservationsDTO reservationsDTO);
}
