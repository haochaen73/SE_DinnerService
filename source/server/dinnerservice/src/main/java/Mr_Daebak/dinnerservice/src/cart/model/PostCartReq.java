package Mr_Daebak.dinnerservice.src.cart.model;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostCartReq {
    private String dinnerName;
    private String style;
    private int amount;
    private int dinnerPrice;
    private List<PostCartGetExtra> extraList;
}
