package Mr_Daebak.dinnerservice.src.user.model;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostPasswordEqualReq {
    private int userIdx;
    private String password;
}
