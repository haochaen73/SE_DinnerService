package Mr_Daebak.dinnerservice.src.order;

import Mr_Daebak.dinnerservice.config.BaseException;
import Mr_Daebak.dinnerservice.config.BaseResponse;
import Mr_Daebak.dinnerservice.src.order.*;
import Mr_Daebak.dinnerservice.src.order.model.*;
import Mr_Daebak.dinnerservice.src.user.model.PostUserRes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
    final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private final OrderProvider orderProvider;
    @Autowired
    private final OrderService orderService;

    public OrderController(OrderProvider orderProvider, OrderService orderService) {
        this.orderProvider = orderProvider;
        this.orderService = orderService;
    }

    @ResponseBody
    @PostMapping("/order")
    @Transactional
    public BaseResponse<PostOrderRes> createOrder(@RequestBody PostOrderReq postOrderReq) {
        try {
            System.out.println("controller 시작");
            int orderIdx = orderService.createOrder(postOrderReq);
            orderService.createDinner(postOrderReq);

            PostOrderRes postOrderRes = new PostOrderRes(orderIdx);
            System.out.println("orderService 끝");
            return new BaseResponse<>(postOrderRes);
        } catch (BaseException exception) {
            return new BaseResponse<>((exception.getStatus()));
        }
    }

//    @ResponseBody
//    @PostMapping("/dinner")
//    @Transactional
//    public BaseResponse<PostDinnerRes> createDinner(@RequestBody PostDinnerReq postDinnerReq) {
//        try {
//            PostDinnerRes postDinnerRes = orderService.creatDinner(postDinnerReq);
//            return new BaseResponse<>(postDinnerRes);
//        } catch (BaseException baseException) {
//            return new BaseResponse<>(exception.getStatus());
//        }
//    }

}
