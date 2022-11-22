package Mr_Daebak.dinnerservice.src.employee.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostEmpLoginReq {
    private String id;
    private String password;
}
