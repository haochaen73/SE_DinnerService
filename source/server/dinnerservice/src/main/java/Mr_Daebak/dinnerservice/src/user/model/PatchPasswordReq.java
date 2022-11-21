package Mr_Daebak.dinnerservice.src.user.model;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PatchPasswordReq {
    private int userIdx;
    private String password1;
    private String password2;
}
