package Mr_Daebak.dinnerservice.src.order.model;
import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostOrderReq {
    private int userIdx;
    private String deliveredAt;
    private int totalPrice;
    private String address;
    private String cardNum;
}
