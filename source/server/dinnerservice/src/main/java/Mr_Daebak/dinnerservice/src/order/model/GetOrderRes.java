package Mr_Daebak.dinnerservice.src.order.model;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class GetOrderRes {
    private int orderIdx;
    private int totalPrice;
    private String deliveredAt;
    private String createdAt;
    private int state;
    private List<GetOrderGetDinner> dinnerList;
}
