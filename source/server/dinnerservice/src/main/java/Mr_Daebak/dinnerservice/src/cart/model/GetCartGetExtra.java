package Mr_Daebak.dinnerservice.src.cart.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GetCartGetExtra {
    private String extraName;
    private int amount;
}