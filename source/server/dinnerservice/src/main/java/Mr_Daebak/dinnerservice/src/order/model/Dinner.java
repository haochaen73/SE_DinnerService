package Mr_Daebak.dinnerservice.src.order.model;

import lombok.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class Dinner {
    private int dinnerIdx;
    private int orderIdx;
    private int dinnerno;
    private String dinnerName;
    private int styleNo;
    private String styleName;
    private int dinnerPrice;
    private List<Extra> extraList;
}
