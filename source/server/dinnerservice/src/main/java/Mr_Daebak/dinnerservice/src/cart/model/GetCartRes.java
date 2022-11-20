package Mr_Daebak.dinnerservice.src.cart.model;

import Mr_Daebak.dinnerservice.src.order.model.GetOrderGetDinner;
import Mr_Daebak.dinnerservice.src.order.model.GetOrderGetExtra;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class GetCartRes {
    private int cartIdx;
    private String dinnerName;
    private String style;
    private int amount;
    private int dinnerPrice;
    private List<GetCartGetExtra> extraList;
}
