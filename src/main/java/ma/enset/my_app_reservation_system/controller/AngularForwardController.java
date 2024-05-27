package ma.enset.my_app_reservation_system.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


/**
 * Serve Angulars index.html for all requests that are not relevant for the server.
 */
@Controller
public class AngularForwardController {

    @GetMapping("{path:^(?!api|assets|public|swagger)[^\\.]*}/**")
    public String handleForward() {
        return "forward:/";
    }

}
