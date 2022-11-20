package Mr_Daebak.dinnerservice.src.user.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PatchUserReq {
    private int userIdx;
    private String name;
    private String email;
    private String phoneNum;
}
