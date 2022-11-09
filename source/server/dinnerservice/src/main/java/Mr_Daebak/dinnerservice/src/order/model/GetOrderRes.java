package Mr_Daebak.dinnerservice.src.order.model;

import lombok.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class GetOrderRes {
    private List<Order> OrderList;
}
