package Mr_Daebak.dinnerservice.src.order.model;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class GetOrderStateRes {
    private int orderIdx;
    private int userIdx;
    private String phoneNum;
    private String address;
    private String deliveredAt;
    private String createdAt;
    private int state;
    private List<GetOrderGetDinner> dinnerList;
}
