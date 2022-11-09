package Mr_Daebak.dinnerservice.src.order.model;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostOrderReq {
    private int userIdx;
    private String deliveredAt;
    private int totalPrice;
}
