package Mr_Daebak.dinnerservice.src.order.model;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class GetOrderGetExtra {
    private String extraName;
    private int amount;
}