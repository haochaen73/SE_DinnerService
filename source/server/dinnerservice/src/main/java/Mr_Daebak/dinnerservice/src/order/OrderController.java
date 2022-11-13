package Mr_Daebak.dinnerservice.src.order;

import Mr_Daebak.dinnerservice.config.BaseException;
import Mr_Daebak.dinnerservice.config.BaseResponse;
import Mr_Daebak.dinnerservice.src.order.*;
import Mr_Daebak.dinnerservice.src.order.model.*;
import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import Mr_Daebak.dinnerservice.utils.JwtService;

import static Mr_Daebak.dinnerservice.config.BaseResponseStatus.INVALID_USER_JWT;


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

            PostOrderRes postOrderRes = new PostOrderRes(orderIdx);
            System.out.println("orderService 끝");
            return new BaseResponse<>(postOrderRes);
        } catch (BaseException exception) {
            return new BaseResponse<>((exception.getStatus()));
        }
    }

//    @ResponseBody
//    @GetMapping("/{userIdx}")
//    @Transactional
//    public BaseResponse<GetOrderRes> getOrder(@PathVariable Integer userIdx) {
//        try {
////            //jwt에서 idx 추출.
////            int userIdxByJwt = JwtService.getUserIdx();
////            //userIdx와 접근한 유저가 같은지 확인
////            if(userIdx != userIdxByJwt){
////                return new BaseResponse<>(INVALID_USER_JWT);
////            }
//            GetOrderRes getOrderRes= orderProvider.getOrder(userIdx);
//            return new BaseResponse<>(getOrderRes);
//        } catch (BaseException baseException) {
//            return new BaseResponse<>(baseException.getStatus());
//        }
//    }

    @ResponseBody
    @PatchMapping("/{orderIdx}/delete")
    public BaseResponse<String> changeStateDelete(@PathVariable("orderIdx") int orderIdx) {
        try {
            orderService.changeStateDelete(orderIdx);
            String result = "주문이 삭제되었습니다";
            return new BaseResponse<>(result);
        } catch (BaseException exception) {
            return new BaseResponse<>(exception.getStatus());
        }
    }


    @ResponseBody
    @PatchMapping("/{orderIdx}/start")
    public BaseResponse<String> changeStateStart(@PathVariable("orderIdx") int orderIdx) {
        try {
            orderService.changeStateStart(orderIdx);
            String result = "조리가 시작 되었습니다";
            return new BaseResponse<>(result);
        } catch (BaseException exception) {
            return new BaseResponse<>(exception.getStatus());
        }
    }

    @ResponseBody
    @PatchMapping("/{orderIdx}/complete")
    public BaseResponse<String> changeStateComplete(@PathVariable("orderIdx") int orderIdx) {
        try {
            orderService.changeStateComplete(orderIdx);
            String result = "조리가 완료 되었습니다";
            return new BaseResponse<>(result);
        } catch (BaseException exception) {
            return new BaseResponse<>(exception.getStatus());
        }
    }

    @ResponseBody
    @PatchMapping("/{orderIdx}/deliver")
    public BaseResponse<String> changeStateDeliver(@PathVariable("orderIdx") int orderIdx) {
        try {
            orderService.changeStateDeliver(orderIdx);
            String result = "배달이 완료 되었습니다";
            return new BaseResponse<>(result);
        } catch (BaseException exception) {
            return new BaseResponse<>(exception.getStatus());
        }
    }

//    @ResponseBody
//    @PatchMapping("/{orderIdx}/delete")
//    public BaseResponse<String> changeStateDelete(@PathVariable("userIdx") Integer userIdx) {
//        try {
//            orderService.changeStateAccept(userIdx);
//            String result = "주문이 승인되었습니다";
//            return new BaseResponse<>(result);
//        } catch (BaseException exception) {
//            return new BaseResponse<>(exception.getStatus());
//        }
//    }

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
