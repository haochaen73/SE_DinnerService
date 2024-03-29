package Mr_Daebak.dinnerservice.src.employee.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Employee {
    private int employeeIdx;
    private String name;
    private String id;
    private String password;
}
