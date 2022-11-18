package Mr_Daebak.dinnerservice.src.order.model;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostOrderGetDinner {
    private String dinnerName;
    private String style;
    private int amount;
    private int dinnerPrice;
    private List<PostOrderGetExtra> extraList;
}
