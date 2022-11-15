package Mr_Daebak.dinnerservice.src.order.model;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class GetOrderGetDinner {
    private String dinnerName;
    private String style;
    private int amount;
    private List<GetOrderGetExtra> extraList;
}
