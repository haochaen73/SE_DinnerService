package Mr_Daebak.dinnerservice.src.cart;

import Mr_Daebak.dinnerservice.config.BaseException;
import Mr_Daebak.dinnerservice.config.BaseResponse;
import Mr_Daebak.dinnerservice.src.cart.model.*;
import Mr_Daebak.dinnerservice.src.cart.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carts")
public class CartController {
    final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private final CartProvider cartProvider;
    @Autowired
    private final CartService cartService;

    public CartController(CartProvider cartProvider, CartService cartService) {
        this.cartProvider = cartProvider;
        this.cartService = cartService;
    }

    @ResponseBody
    @PostMapping("/save")
    @Transactional
    public BaseResponse<String> createOrder(@RequestBody PostCartReq postCartReq) {
        try {
            System.out.println("controller 시작");
            cartService.saveCart(postCartReq);

            String result = "장바구니에 추가되었습니다.";
            System.out.println("orderService 끝");
            return new BaseResponse<>(result);
        } catch (BaseException exception) {
            return new BaseResponse<>((exception.getStatus()));
        }
    }
}
