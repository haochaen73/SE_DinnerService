package Mr_Daebak.dinnerservice.src.user.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class User {
    private int userIdx;
    private String name;
    private String id;
    private String password;
    private String email;
    private String phoneNum;
    private String address;
    private int totalPrice;
}
