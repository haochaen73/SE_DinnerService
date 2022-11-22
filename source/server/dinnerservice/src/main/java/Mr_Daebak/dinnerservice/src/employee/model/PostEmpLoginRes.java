package Mr_Daebak.dinnerservice.src.employee.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PostEmpLoginRes {
    private int userIdx;
    private String name;
    // jwt
//    private String jwt;
}
