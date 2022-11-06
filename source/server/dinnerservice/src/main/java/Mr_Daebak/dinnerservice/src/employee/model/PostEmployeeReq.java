package Mr_Daebak.dinnerservice.src.employee.model;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostEmployeeReq {
    private String name;
    private String id;
    private String password1;
    private String password2;
    private String code;
}
