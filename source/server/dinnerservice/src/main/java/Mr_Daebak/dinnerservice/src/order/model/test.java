package Mr_Daebak.dinnerservice.src.order.model;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class test {
    private int orderIdx;
    private String deliveredAt;
    private String createdAt;
    private int state;
    private List<test2> dinnerList;
}
