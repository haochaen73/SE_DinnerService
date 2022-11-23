package Mr_Daebak.dinnerservice.src.order.model;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PatchOrderReq {
    private int orderIdx;
    private int dinnerIdx;
    private int userIdx;
    private List<PostOrderGetDinner> dinnerList;
}
