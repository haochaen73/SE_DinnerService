package Mr_Daebak.dinnerservice.src.order.model;

import lombok.*;

import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
public class Order {
    private int orderIdx;
    private ArrayList<Dinner> dinnerList;
    private String deliveredAt;
    private String address;
    private String cardNum;
    private String createdAt;
    private int totalPrice;
}
