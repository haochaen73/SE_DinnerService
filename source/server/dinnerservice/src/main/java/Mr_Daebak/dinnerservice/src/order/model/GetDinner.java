package Mr_Daebak.dinnerservice.src.order.model;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetDinner {
    private int dinnerNo;
    private String style;
    private int amount;
    private List<GetExtra> extraList;
}
