package Mr_Daebak.dinnerservice.src.user.model;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor // 해당 클래스의 모든 멤버 변수(userIdx, jwt)를 받는 생성자를 생성
public class PostLoginRes {
    private int userIdx;
    private String name;
    // jwt
    private String jwt;
}
