package Mr_Daebak.dinnerservice.src.user.model;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostUserReq {
    private String name;
    private String id;
    private String password1;
    private String password2;
    private String email;
    private String phoneNum;
    private String address;
}
