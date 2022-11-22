package Mr_Daebak.dinnerservice.src.cart;

import Mr_Daebak.dinnerservice.config.BaseException;
import Mr_Daebak.dinnerservice.config.BaseResponse;
import Mr_Daebak.dinnerservice.src.cart.model.*;
import Mr_Daebak.dinnerservice.src.cart.*;
import Mr_Daebak.dinnerservice.src.order.model.GetOrderRes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public BaseResponse<PostCartRes> saveCart(@RequestBody PostCartReq postCartReq) {
        try {
            System.out.println("controller 시작");
            PostCartRes postCartRes = cartService.saveCart(postCartReq);

            System.out.println("orderService 끝");
            return new BaseResponse<>(postCartRes);
        } catch (BaseException exception) {
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @ResponseBody
    @GetMapping("/{userIdx}")
    @Transactional
    public BaseResponse<List<GetCartRes>> getCarts(@PathVariable Integer userIdx) {
        try {
            System.out.println("controller 시작");
            List<GetCartRes> getCartsRes= cartProvider.getCarts(userIdx);
            System.out.println("controller 끝");
            return new BaseResponse<>(getCartsRes);
        } catch (BaseException baseException) {
            return new BaseResponse<>(baseException.getStatus());
        }
    }

    @ResponseBody
    @DeleteMapping("/delete/{cartIdx}")
    @Transactional
    public BaseResponse<String> deleteCart(@PathVariable Integer cartIdx) {
        try {
            cartService.deleteCart(cartIdx);
            String result = "장바구니에서 삭제되었습니다.";
            return new BaseResponse<>(result);
        } catch (BaseException baseException) {
            return new BaseResponse<>(baseException.getStatus());
        }
    }
}
