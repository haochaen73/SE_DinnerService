package Mr_Daebak.dinnerservice.src.cart.model;

import Mr_Daebak.dinnerservice.src.cart.model.PostCartGetExtra;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostCartGetDinner {
    private String dinnerName;
    private String style;
    private int amount;
    private List<PostCartGetExtra> extraList;
}
