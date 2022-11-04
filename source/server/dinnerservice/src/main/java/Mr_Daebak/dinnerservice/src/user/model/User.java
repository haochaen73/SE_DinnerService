package Mr_Daebak.dinnerservice.src.user.model;

import lombok.*;

import java.util.Date;


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
    private String cardNum;
    private String birthDate;
}
