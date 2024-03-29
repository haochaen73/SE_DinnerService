package Mr_Daebak.dinnerservice.src.order;

import Mr_Daebak.dinnerservice.config.BaseException;
import Mr_Daebak.dinnerservice.config.BaseResponse;
import Mr_Daebak.dinnerservice.src.order.*;
import Mr_Daebak.dinnerservice.src.order.model.*;
import com.fasterxml.jackson.databind.ser.Serializers;
import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import Mr_Daebak.dinnerservice.utils.JwtService;

import javax.sound.midi.Patch;
import java.util.List;

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

    @ResponseBody
    @GetMapping("/{userIdx}")
    @Transactional
    public BaseResponse<List<GetOrderRes>> getOrders(@PathVariable Integer userIdx) {
        try {
            System.out.println("controller 시작");
            List<GetOrderRes> getOrdersRes= orderProvider.getOrders(userIdx);
            System.out.println("controller 끝");
            return new BaseResponse<>(getOrdersRes);
        } catch (BaseException baseException) {
            return new BaseResponse<>(baseException.getStatus());
        }
    }

    @ResponseBody
    @GetMapping("/accept")
    public BaseResponse<List<GetOrderStateRes>> getOrderAccept() {
        try {
            System.out.println("controller 시작");
            List<GetOrderStateRes> GetOrderAcceptRes = orderProvider.getOrderAccept();
            System.out.println("controller 끝");
            return new BaseResponse<>(GetOrderAcceptRes);
        } catch (BaseException baseException) {
            return new BaseResponse<>(baseException.getStatus());
        }
    }

    @ResponseBody
    @GetMapping("/prepare")
    public BaseResponse<List<GetOrderStateRes>> getOrderPrepare() {
        try {
            System.out.println("controller 시작");
            List<GetOrderStateRes> GetOrderPrepareRes = orderProvider.getOrderPrepare();
            System.out.println("controller 끝");
            return new BaseResponse<>(GetOrderPrepareRes);
        } catch (BaseException baseException) {
            return new BaseResponse<>(baseException.getStatus());
        }
    }

    @ResponseBody
    @GetMapping("/done")
    public BaseResponse<List<GetOrderStateRes>> getOrderDone() {
        try {
            System.out.println("controller 시작");
            List<GetOrderStateRes> GetOrderDoneRes = orderProvider.getOrderDone();
            System.out.println("controller 끝");
            return new BaseResponse<>(GetOrderDoneRes);
        } catch (BaseException baseException) {
            return new BaseResponse<>(baseException.getStatus());
        }
    }


    @ResponseBody
    @DeleteMapping("/{orderIdx}/delete")
    public BaseResponse<String> deleteOrder(@PathVariable("orderIdx") int orderIdx) {
        try {
            orderService.deleteOrder(orderIdx);
            String result = "주문이 삭제되었습니다.";
            return new BaseResponse<>(result);
        } catch (BaseException exception) {
            return new BaseResponse<>(exception.getStatus());
        }
    }


    @ResponseBody
    @PatchMapping("/{orderIdx}/cancel")
    public BaseResponse<String> changeStateDelete(@PathVariable("orderIdx") int orderIdx) {
        try {
            orderService.changeStateDelete(orderIdx);
            String result = "주문이 취소되었습니다";
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
            String result = "배달이 시작 되었습니다";
            return new BaseResponse<>(result);
        } catch (BaseException exception) {
            return new BaseResponse<>(exception.getStatus());
        }
    }

    @ResponseBody
    @PatchMapping("/{orderIdx}/done")
    public BaseResponse<String> changeStateDone(@PathVariable("orderIdx") int orderIdx) {
        try {
            orderService.changeStateDone(orderIdx);
            String result = "주문 및 배달이 완료 되었습니다";
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
//    public BaseResponse<List<PostDinnerRes>> createDinner(@RequestBody PostDinnerReq postDinnerReq) {
//        try {
//            PostDinnerRes postDinnerRes = orderService.creatDinner(postDinnerReq);
//            return new BaseResponse<>(postDinnerRes);
//        } catch (BaseException baseException) {
//            return new BaseResponse<>(exception.getStatus());
//        }
//    }

    @ResponseBody
    @DeleteMapping("/delete/dinner")
    @Transactional
    public BaseResponse<String> deleteDinner(@RequestBody PatchOrderReq patchOrderReq) {
        try {
            orderService.deleteStock(patchOrderReq);
            String result = "해당 dinner 삭제에 성공하였습니다.";
            return new BaseResponse<>(result);
        } catch (BaseException baseException) {
            return new BaseResponse<>(baseException.getStatus());
        }
    }

    @ResponseBody
    @PostMapping("/modify/dinner")
    @Transactional
    public BaseResponse<PatchOrderRes> modifyDinner(@RequestBody PatchOrderReq patchOrderReq) {
        try {
            int dinnerIdx = orderService.createNewDinner(patchOrderReq);
            PatchOrderRes patchOrderRes = new PatchOrderRes(dinnerIdx);
            return new BaseResponse<>(patchOrderRes);
        } catch (BaseException baseException) {
            return new BaseResponse<>(baseException.getStatus());
        }
    }



}
