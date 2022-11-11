package Mr_Daebak.dinnerservice.src.order.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class Extra {
    private int extraIdx;
    private int extraNo;
    private String extraName;
    private int amount;
}
