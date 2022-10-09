package Mr_Daebak.dinnerservice.src.user.model;

import lombok.*;


@Getter
@Setter
@AllArgsConstructor
public class User {
    private int userIdx;
    private String name;
    private String id;
    private String password1;
    private String password2;
    private String email;
    private String address;
    private String birthDate;
    private String phoneNum;
    private String cardNum;
}
