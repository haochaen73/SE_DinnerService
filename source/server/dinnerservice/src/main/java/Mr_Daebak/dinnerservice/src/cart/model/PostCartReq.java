package Mr_Daebak.dinnerservice.src.cart.model;
import Mr_Daebak.dinnerservice.src.cart.model.PostCartGetDinner;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostCartReq {
    private int userIdx;
    private List<PostCartGetDinner> cartList;
}
