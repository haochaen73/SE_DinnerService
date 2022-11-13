package Mr_Daebak.dinnerservice.src.order.model;

import lombok.*;
import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
public class Dinner {
    private int dinnerIdx;
    private int orderIdx;
    private String dinnerName;
    private String style;
    private int dinnerPrice;
    private int amount;
    private ArrayList<Extra> extraList;
}
